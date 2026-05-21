import { NextRequest, NextResponse } from "next/server";
import {
  getMemberByEmail,
  getMemberTier,
  getMemberCurrencies,
  getTierBenefits,
  getProgramTiers,
} from "@/lib/salesforce";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const member = await getMemberByEmail(email);
    if (!member) {
      return NextResponse.json(
        { error: "No active ASPIRE membership found for this email" },
        { status: 404 }
      );
    }

    const memberId = member.Id as string;
    const programId = member.ProgramId as string;
    const contact = member.Contact as Record<string, unknown>;
    const account = contact?.Account as Record<string, unknown>;

    // Fetch tier, currencies, benefits, and program tiers in parallel
    const [tier, currencies, programTiers] = await Promise.all([
      getMemberTier(memberId),
      getMemberCurrencies(memberId),
      getProgramTiers(programId),
    ]);

    const tierId = (tier?.LoyaltyTierId as string) || "";
    const tierBenefits = tierId ? await getTierBenefits(tierId) : [];

    // Build response
    const response = {
      memberId,
      membershipNumber: member.MembershipNumber,
      enrollmentDate: member.EnrollmentDate,
      status: member.MemberStatus,
      contact: {
        id: member.ContactId,
        firstName: contact?.FirstName,
        lastName: contact?.LastName,
        email: contact?.Email,
        title: contact?.Title,
        phone: contact?.Phone,
      },
      practice: {
        name: account?.Name,
        city: account?.BillingCity,
        state: account?.BillingState,
        accountId: account
          ? (account as Record<string, unknown>).Id ||
            ((member as Record<string, unknown>).Contact as Record<string, unknown>)?.AccountId
          : null,
      },
      tier: tier
        ? {
            id: tier.LoyaltyTierId,
            name: (tier.LoyaltyTier as Record<string, unknown>)?.Name,
            sequenceNumber: (tier.LoyaltyTier as Record<string, unknown>)?.SequenceNumber,
          }
        : null,
      currencies: currencies.map((c) => {
        const pc = c.LoyaltyProgramCurrency as Record<string, unknown>;
        return {
          name: pc?.Name,
          type: pc?.CurrencyType,
          balance: c.PointsBalance,
          totalAccrued: c.TotalPointsAccrued,
          totalRedeemed: c.TotalPointsRedeemed,
          totalExpired: c.TotalPointsExpired,
        };
      }),
      benefits: tierBenefits.map((tb) => {
        const benefit = tb.Benefit as Record<string, unknown>;
        const benefitType = benefit?.BenefitType as Record<string, unknown>;
        return {
          name: benefit?.Name,
          description: benefit?.Description,
          category: benefitType?.Category,
          typeName: benefitType?.Name,
        };
      }),
      programTiers: programTiers.map((t) => ({
        id: t.Id,
        name: t.Name,
        sequenceNumber: t.SequenceNumber,
        minimumBalance: t.MinimumEligibleBalance,
      })),
    };

    return NextResponse.json(response);
  } catch (err: unknown) {
    console.error("Login error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
