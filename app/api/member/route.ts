import { NextRequest, NextResponse } from "next/server";
import {
  getTransactions,
  getPatients,
  getMemberCurrencies,
  getVoucherDefinitions,
  createTransaction,
} from "@/lib/salesforce";

export const dynamic = "force-dynamic";

// GET /api/member?action=transactions|patients|currencies|vouchers&memberId=...
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const action = params.get("action");
  const memberId = params.get("memberId");
  const accountId = params.get("accountId");
  const contactId = params.get("contactId");
  const programId = params.get("programId");

  try {
    switch (action) {
      case "transactions": {
        if (!memberId) return NextResponse.json({ error: "memberId required" }, { status: 400 });
        const limit = parseInt(params.get("limit") || "50");
        const txns = await getTransactions(memberId, limit);
        return NextResponse.json({ transactions: txns });
      }

      case "patients": {
        if (!accountId || !contactId)
          return NextResponse.json({ error: "accountId and contactId required" }, { status: 400 });
        const patients = await getPatients(accountId, contactId);
        return NextResponse.json({ patients });
      }

      case "currencies": {
        if (!memberId) return NextResponse.json({ error: "memberId required" }, { status: 400 });
        const currencies = await getMemberCurrencies(memberId);
        return NextResponse.json({
          currencies: currencies.map((c) => {
            const pc = c.LoyaltyProgramCurrency as Record<string, unknown>;
            return {
              name: pc?.Name,
              type: pc?.CurrencyType,
              balance: c.PointsBalance,
              totalAccrued: c.TotalPointsAccrued,
              totalRedeemed: c.TotalPointsRedeemed,
            };
          }),
        });
      }

      case "vouchers": {
        if (!programId) return NextResponse.json({ error: "programId required" }, { status: 400 });
        const vouchers = await getVoucherDefinitions(programId);
        return NextResponse.json({ vouchers });
      }

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (err: unknown) {
    console.error("Member API error:", err);
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/member — create transaction (earn/redeem points)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { memberId, journalTypeId, amount, referenceId } = body;

    if (!memberId || !journalTypeId || !amount) {
      return NextResponse.json(
        { error: "memberId, journalTypeId, and amount are required" },
        { status: 400 }
      );
    }

    const result = await createTransaction({
      memberId,
      journalTypeId,
      amount,
      referenceId: referenceId || `PORTAL-${Date.now()}`,
    });

    return NextResponse.json({ success: true, result });
  } catch (err: unknown) {
    console.error("Transaction error:", err);
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
