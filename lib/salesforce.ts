import jsforce from "jsforce";
import Connection from "jsforce/lib/connection";

let conn: Connection | null = null;
let tokenExpiry = 0;

async function getConnection(): Promise<Connection> {
  const now = Date.now();
  if (conn && now < tokenExpiry) return conn;

  // Option 1: Direct access token + instance URL (fastest for demo)
  if (process.env.SF_ACCESS_TOKEN && process.env.SF_INSTANCE_URL) {
    const c = new jsforce.Connection({
      instanceUrl: process.env.SF_INSTANCE_URL,
      accessToken: process.env.SF_ACCESS_TOKEN,
      version: "62.0",
    });
    conn = c;
    tokenExpiry = now + 110 * 60 * 1000;
    return c;
  }

  // Option 2: OAuth Client Credentials flow (Connected App)
  if (process.env.SF_CLIENT_ID && process.env.SF_CLIENT_SECRET && process.env.SF_INSTANCE_URL) {
    const tokenUrl = `${process.env.SF_INSTANCE_URL}/services/oauth2/token`;
    const params = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.SF_CLIENT_ID,
      client_secret: process.env.SF_CLIENT_SECRET,
    });
    const res = await fetch(tokenUrl, { method: "POST", body: params });
    if (!res.ok) throw new Error(`OAuth failed: ${await res.text()}`);
    const data = await res.json();
    const c = new jsforce.Connection({
      instanceUrl: data.instance_url,
      accessToken: data.access_token,
    });
    conn = c;
    tokenExpiry = now + 110 * 60 * 1000;
    return c;
  }

  // Option 3: Username-password login
  if (process.env.SF_USERNAME && process.env.SF_PASSWORD) {
    const loginUrl = process.env.SF_LOGIN_URL || "https://login.salesforce.com";
    const c = new jsforce.Connection({ loginUrl });
    await c.login(
      process.env.SF_USERNAME,
      process.env.SF_PASSWORD + (process.env.SF_SECURITY_TOKEN || "")
    );
    conn = c;
    tokenExpiry = now + 55 * 60 * 1000;
    return c;
  }

  throw new Error(
    "Missing Salesforce credentials. Set SF_ACCESS_TOKEN + SF_INSTANCE_URL, " +
    "or SF_CLIENT_ID + SF_CLIENT_SECRET + SF_INSTANCE_URL, " +
    "or SF_USERNAME + SF_PASSWORD + SF_LOGIN_URL."
  );
}

// ─── Member lookup by email ───
export async function getMemberByEmail(email: string) {
  const c = await getConnection();
  const result = await c.query(`
    SELECT Id, MembershipNumber, MemberStatus, MemberType, EnrollmentDate,
           ContactId, Contact.FirstName, Contact.LastName, Contact.Email,
           Contact.Title, Contact.Phone,
           Contact.Account.Name, Contact.Account.BillingCity, Contact.Account.BillingState,
           ProgramId, Program.Name
    FROM LoyaltyProgramMember
    WHERE Contact.Email = '${email.replace(/'/g, "\\'")}'
    AND MemberStatus = 'Active'
    LIMIT 1
  `);
  if (!result.records || result.records.length === 0) return null;
  return result.records[0] as Record<string, unknown>;
}

// ─── Member tier ───
export async function getMemberTier(memberId: string) {
  const c = await getConnection();
  const result = await c.query(`
    SELECT Id, LoyaltyTierId, LoyaltyTier.Name, LoyaltyTier.SequenceNumber,
           EffectiveDate
    FROM LoyaltyMemberTier
    WHERE LoyaltyMemberId = '${memberId}'
    ORDER BY EffectiveDate DESC, CreatedDate DESC
    LIMIT 1
  `);
  return result.records?.[0] as Record<string, unknown> | undefined;
}

// ─── Member currencies ───
export async function getMemberCurrencies(memberId: string) {
  const c = await getConnection();
  const result = await c.query(`
    SELECT Id, Name, PointsBalance, TotalPointsAccrued, TotalPointsRedeemed,
           TotalPointsExpired, LoyaltyMember.MembershipNumber,
           LoyaltyProgramCurrency.Name, LoyaltyProgramCurrency.CurrencyType
    FROM LoyaltyMemberCurrency
    WHERE LoyaltyMemberId = '${memberId}'
  `);
  return (result.records || []) as Record<string, unknown>[];
}

// ─── Tier benefits ───
export async function getTierBenefits(tierId: string) {
  const c = await getConnection();
  const result = await c.query(`
    SELECT Id, Name, Benefit.Name, Benefit.Description, Benefit.IsActive,
           Benefit.BenefitType.Name, Benefit.BenefitType.Category
    FROM LoyaltyTierBenefit
    WHERE LoyaltyTierId = '${tierId}'
  `);
  return (result.records || []) as Record<string, unknown>[];
}

// ─── Transaction history ───
export async function getTransactions(memberId: string, limit = 20) {
  const c = await getConnection();
  const result = await c.query(`
    SELECT Id, TransactionAmount, ActivityDate, Status,
           ExternalTransactionNumber, JournalType.Name
    FROM TransactionJournal
    WHERE MemberId = '${memberId}'
    ORDER BY ActivityDate DESC
    LIMIT ${limit}
  `);
  return (result.records || []) as Record<string, unknown>[];
}

// ─── Patients under same account ───
export async function getPatients(accountId: string, excludeContactId: string) {
  const c = await getConnection();
  const result = await c.query(`
    SELECT Id, FirstName, LastName, Email, Phone, CreatedDate
    FROM Contact
    WHERE AccountId = '${accountId}'
    AND Id != '${excludeContactId}'
    ORDER BY LastName
  `);
  return (result.records || []) as Record<string, unknown>[];
}

// ─── All tiers for the program ───
export async function getProgramTiers(programId: string) {
  const c = await getConnection();
  const result = await c.query(`
    SELECT Id, Name, SequenceNumber
    FROM LoyaltyTier
    WHERE LoyaltyTierGroup.LoyaltyProgramId = '${programId}'
    ORDER BY SequenceNumber
  `);
  return (result.records || []) as Record<string, unknown>[];
}

// ─── Voucher definitions ───
export async function getVoucherDefinitions(programId: string) {
  const c = await getConnection();
  const result = await c.query(`
    SELECT Id, Name, Type, DiscountPercent, FaceValue, IsActive,
           ExpirationPeriod, ExpirationPeriodUnit
    FROM VoucherDefinition
    WHERE LoyaltyProgramId = '${programId}'
    AND IsActive = true
  `);
  return (result.records || []) as Record<string, unknown>[];
}

// ─── Create a transaction (for point earning / redemption) ───
export async function createTransaction(data: {
  memberId: string;
  journalTypeId: string;
  amount: number;
  referenceId: string;
}) {
  const c = await getConnection();
  const result = await c.sobject("TransactionJournal").create({
    MemberId: data.memberId,
    JournalTypeId: data.journalTypeId,
    TransactionAmount: data.amount,
    ActivityDate: new Date().toISOString(),
    Status: "Processed",
    ExternalTransactionNumber: data.referenceId,
  });
  return result;
}

export { getConnection };
