// Client-side session store for member data
"use client";

export interface MemberData {
  memberId: string;
  membershipNumber: string;
  enrollmentDate: string;
  status: string;
  contact: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    title: string;
    phone: string;
  };
  practice: {
    name: string;
    city: string;
    state: string;
    accountId: string;
  };
  tier: {
    id: string;
    name: string;
    sequenceNumber: number;
  } | null;
  currencies: Array<{
    name: string;
    type: string;
    balance: number;
    totalAccrued: number;
    totalRedeemed: number;
    totalExpired: number;
  }>;
  benefits: Array<{
    name: string;
    description: string;
    category: string;
    typeName: string;
  }>;
  programTiers: Array<{
    id: string;
    name: string;
    sequenceNumber: number;
    minimumBalance: number;
  }>;
}

const STORAGE_KEY = "aspire_member";

export function saveMember(data: MemberData) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

export function getMember(): MemberData | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as MemberData;
  } catch {
    return null;
  }
}

export function clearMember() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(STORAGE_KEY);
  }
}
