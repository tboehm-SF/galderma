"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  BarChart3, Users, DollarSign, BookOpen, Bell, Settings, LogOut,
  TrendingUp, Calendar, Mail, ChevronRight, Search, Gift,
  Trophy, Star, Flame, Target, GraduationCap, Award, Shield,
  Zap, ArrowUpRight, Clock, CheckCircle2, Lock as LockIcon, Sparkles,
} from "lucide-react";
import { getMember, clearMember, type MemberData } from "@/lib/store";

type Tab = "overview" | "insights" | "rewards" | "challenges" | "education" | "savings";

export default function PortalPage() {
  const router = useRouter();
  const [member, setMember] = useState<MemberData | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [transactions, setTransactions] = useState<Record<string, unknown>[]>([]);
  const [patients, setPatients] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const m = getMember();
    if (!m) { router.push("/login"); return; }
    setMember(m);
    setLoading(false);
  }, [router]);

  const fetchTransactions = useCallback(async () => {
    if (!member) return;
    try {
      const res = await fetch(`/api/member?action=transactions&memberId=${member.memberId}&limit=50`);
      const data = await res.json();
      if (data.transactions) setTransactions(data.transactions);
    } catch { /* silent */ }
  }, [member]);

  const fetchPatients = useCallback(async () => {
    if (!member?.practice?.accountId || !member?.contact?.id) return;
    try {
      const res = await fetch(`/api/member?action=patients&accountId=${member.practice.accountId}&contactId=${member.contact.id}`);
      const data = await res.json();
      if (data.patients) setPatients(data.patients);
    } catch { /* silent */ }
  }, [member]);

  useEffect(() => {
    if (member) {
      fetchTransactions();
      fetchPatients();
    }
  }, [member, fetchTransactions, fetchPatients]);

  if (loading || !member) {
    return (
      <div className="min-h-screen bg-[#F8F6F3] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#4A5D7F]/20 border-t-[#4A5D7F] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-400">Loading your practice portal...</p>
        </div>
      </div>
    );
  }

  const rewardPts = member.currencies.find(c => c.type === "NonQualifying");
  const statusPts = member.currencies.find(c => c.type === "Qualifying");
  const initials = `${member.contact.firstName?.[0] || ""}${member.contact.lastName?.[0] || ""}`;
  const tierName = member.tier?.name || "Aspire Member";
  const tierSeq = member.tier?.sequenceNumber || 1;
  const nextTier = member.programTiers.find(t => t.sequenceNumber === tierSeq + 1);
  const progressToNext = nextTier && statusPts
    ? Math.min(100, Math.round(((statusPts.balance || 0) / nextTier.minimumBalance) * 100))
    : 100;

  const navItems = [
    { id: "overview" as Tab, label: "Overview", icon: BarChart3 },
    { id: "insights" as Tab, label: "Patient Insights", icon: Users },
    { id: "rewards" as Tab, label: "Rewards & Benefits", icon: Gift },
    { id: "challenges" as Tab, label: "Challenges", icon: Trophy },
    { id: "education" as Tab, label: "Education", icon: GraduationCap },
    { id: "savings" as Tab, label: "Savings & Rebates", icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F3] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-40">
        <div className="px-6 py-6 border-b border-gray-100">
          <Link href="/" className="block">
            <Image src="/images/galderma-logo-gold.png" alt="Galderma" width={100} height={26} className="mb-2 opacity-70" />
            <span className="text-sm font-light tracking-[0.25em] text-[#4A5D7F]/60">ASPIRE</span>
          </Link>
          <p className="text-[9px] text-gray-400 uppercase tracking-wider mt-1 font-medium">Practice Portal</p>
        </div>

        <nav className="flex-1 py-4 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                      activeTab === item.id
                        ? "bg-[#4A5D7F] text-white shadow-md"
                        : "text-[#2C2C2C]/70 hover:bg-[#F5F1EC] hover:text-[#4A5D7F]"
                    }`}
                  >
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                    <span className="font-medium">{item.label}</span>
                    {item.id === "challenges" && (
                      <span className="ml-auto text-[10px] bg-amber-400 text-white px-1.5 py-0.5 rounded-full font-bold">3</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4A5D7F] to-[#3A4D6F] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#2C2C2C] truncate">Dr. {member.contact.firstName} {member.contact.lastName}</p>
              <p className="text-[10px] text-gray-400">{member.practice.city}, {member.practice.state}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 px-3">
            <button className="p-2 rounded-lg hover:bg-[#F5F1EC] text-gray-400 hover:text-[#4A5D7F] transition-colors" aria-label="Settings">
              <Settings className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button onClick={() => { clearMember(); router.push("/"); }} className="p-2 rounded-lg hover:bg-[#F5F1EC] text-gray-400 hover:text-[#4A5D7F] transition-colors" aria-label="Log out">
              <LogOut className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-lg font-semibold text-[#2C2C2C]">
              {navItems.find(n => n.id === activeTab)?.label || "Overview"}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">Welcome back, Dr. {member.contact.lastName}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Tier Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#4A5D7F]/5 to-[#4A5D7F]/10 rounded-full border border-[#4A5D7F]/10">
              <Shield className="w-3.5 h-3.5 text-[#4A5D7F]" />
              <span className="text-xs font-semibold text-[#4A5D7F]">{tierName}</span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:border-[#4A5D7F] focus:outline-none w-48 bg-[#FAFAFA]" />
            </div>
            <button className="relative p-2 rounded-lg hover:bg-[#F5F1EC] transition-colors" aria-label="Notifications">
              <Bell className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        <div className="p-8">
          {activeTab === "overview" && <OverviewTab member={member} transactions={transactions} statusPts={statusPts} rewardPts={rewardPts} nextTier={nextTier} progressToNext={progressToNext} tierName={tierName} patients={patients} />}
          {activeTab === "insights" && <InsightsTab patients={patients} />}
          {activeTab === "rewards" && <RewardsTab member={member} rewardPts={rewardPts} />}
          {activeTab === "challenges" && <ChallengesTab transactions={transactions} />}
          {activeTab === "education" && <EducationTab member={member} />}
          {activeTab === "savings" && <SavingsTab member={member} />}
        </div>
      </main>
    </div>
  );
}

/* ─── OVERVIEW TAB ─── */
function OverviewTab({ member, transactions, statusPts, rewardPts, nextTier, progressToNext, tierName, patients }: {
  member: MemberData;
  transactions: Record<string, unknown>[];
  statusPts: MemberData["currencies"][0] | undefined;
  rewardPts: MemberData["currencies"][0] | undefined;
  nextTier: MemberData["programTiers"][0] | undefined;
  progressToNext: number;
  tierName: string;
  patients: Record<string, unknown>[];
}) {
  const stats = [
    { label: "Active Patients", value: patients.length.toString(), change: "+12%", icon: Users },
    { label: "Reward Points", value: (rewardPts?.balance || 0).toLocaleString(), change: `+${(rewardPts?.totalAccrued || 0).toLocaleString()} earned`, icon: Star },
    { label: "Status Points", value: (statusPts?.balance || 0).toLocaleString(), change: tierName, icon: Shield },
    { label: "Treatments (6mo)", value: transactions.length.toString(), change: `${transactions.length} recorded`, icon: Calendar },
  ];

  const recentTxns = transactions.slice(0, 6);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#F5F1EC] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#4A5D7F]" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-semibold text-[#4A5D7F] bg-[#4A5D7F]/5 px-2 py-1 rounded-full">{stat.change}</span>
              </div>
              <p className="font-serif text-2xl font-semibold text-[#2C2C2C] mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-semibold text-[#2C2C2C] text-sm">Recent Treatment Activity</h3>
            <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-full">
              <Zap className="w-3 h-3" />
              Live from Salesforce
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {recentTxns.length === 0 ? (
              <p className="px-6 py-8 text-sm text-gray-400 text-center">No transactions yet</p>
            ) : recentTxns.map((txn, i) => {
              const date = txn.ActivityDate ? new Date(txn.ActivityDate as string).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "";
              return (
                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-[#F5F1EC]/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F5F1EC] to-white border border-[#4A5D7F]/10 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-[#4A5D7F]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#2C2C2C]">{(() => { const jt = txn.JournalType as Record<string, unknown> | null; return String(jt?.Name ?? "Treatment"); })()}</p>
                      <p className="text-xs text-gray-400">Ref: {String(txn.ExternalTransactionNumber ?? "—")}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#4A5D7F]">+{Number(txn.TransactionAmount || 0).toFixed(0)}</p>
                    <p className="text-[10px] text-gray-400">{date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-5">
          {/* Tier Progress */}
          <div className="bg-gradient-to-br from-[#4A5D7F] to-[#3A4D6F] rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-white/80" />
              <h3 className="font-semibold text-sm">Tier Progress</h3>
            </div>
            <p className="font-serif text-2xl font-light mb-1">{tierName}</p>
            {nextTier ? (
              <>
                <p className="text-xs text-white/60 mb-4">
                  {(statusPts?.balance || 0).toLocaleString()} / {nextTier.minimumBalance.toLocaleString()} pts to {nextTier.name}
                </p>
                <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-300 to-amber-400 rounded-full transition-all duration-1000" style={{ width: `${progressToNext}%` }} />
                </div>
                <p className="text-[10px] text-white/50 mt-2">{progressToNext}% — {(nextTier.minimumBalance - (statusPts?.balance || 0)).toLocaleString()} more to reach {nextTier.name}</p>
              </>
            ) : (
              <p className="text-xs text-white/60">You&apos;ve reached the highest tier!</p>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-[#2C2C2C] text-sm mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: "Redeem Reward Points", icon: Gift },
                { label: "View Benefits", icon: Star },
                { label: "Start a Challenge", icon: Trophy },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <button key={action.label} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#F5F1EC] text-left transition-colors group">
                    <Icon className="w-4 h-4 text-[#4A5D7F]" strokeWidth={1.5} />
                    <span className="text-sm text-[#2C2C2C]/70 group-hover:text-[#4A5D7F] flex-1">{action.label}</span>
                    <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-[#4A5D7F] group-hover:translate-x-1 transition-all" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PATIENT INSIGHTS TAB ─── */
function InsightsTab({ patients }: { patients: Record<string, unknown>[] }) {
  const [filter, setFilter] = useState("All Patients");
  const filters = ["All Patients", "Active", "VIP", "At Risk", "New"];

  // Enrich patient data with mock treatment counts (in real app, would come from Salesforce)
  const enrichedPatients = patients.map((p, i) => ({
    ...p,
    treatments: [8, 12, 5, 15, 3, 7, 10, 4][i] || 5,
    totalPoints: [450, 820, 350, 1100, 150, 520, 680, 200][i] || 300,
    status: ["Active", "Active", "Active", "VIP", "New", "At Risk", "Active", "New"][i] || "Active",
    lastVisit: new Date(Date.now() - (i * 4 + 2) * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${filter === f ? "bg-[#4A5D7F] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[#4A5D7F] hover:text-[#4A5D7F]"}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-full">
          <Zap className="w-3 h-3" />
          Live from Salesforce
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-[#FAFAFA]">
              <th className="text-left px-6 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="text-left px-6 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Last Visit</th>
              <th className="text-left px-6 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Treatments</th>
              <th className="text-left px-6 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Points</th>
              <th className="text-left px-6 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {enrichedPatients.map((patient) => {
              const raw = patient as Record<string, unknown>;
              const first = String(raw.FirstName || "");
              const last = String(raw.LastName || "");
              return (
                <tr key={String(raw.Id || "")} className="hover:bg-[#F5F1EC]/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F5F1EC] to-white border border-[#4A5D7F]/10 flex items-center justify-center">
                        <span className="text-[10px] font-semibold text-[#4A5D7F]">{first[0]}{last[0]}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-[#2C2C2C]">{first} {last}</span>
                        <p className="text-[10px] text-gray-400">{String(raw.Email || "")}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{patient.lastVisit}</td>
                  <td className="px-6 py-4 text-sm text-[#2C2C2C] font-medium">{patient.treatments}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#4A5D7F]">{patient.totalPoints}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                      patient.status === "VIP" ? "bg-purple-50 text-purple-700" :
                      patient.status === "Active" ? "bg-emerald-50 text-emerald-700" :
                      patient.status === "At Risk" ? "bg-amber-50 text-amber-700" :
                      "bg-blue-50 text-blue-700"
                    }`}>{patient.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1.5 rounded-lg hover:bg-[#F5F1EC] text-gray-400 hover:text-[#4A5D7F] transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── REWARDS & BENEFITS TAB ─── */
function RewardsTab({ member, rewardPts }: { member: MemberData; rewardPts: MemberData["currencies"][0] | undefined }) {
  const groupedBenefits: Record<string, typeof member.benefits> = {};
  member.benefits.forEach(b => {
    const cat = b.category || "Other";
    if (!groupedBenefits[cat]) groupedBenefits[cat] = [];
    groupedBenefits[cat].push(b);
  });

  return (
    <div className="space-y-8">
      {/* Points Overview */}
      <div className="grid grid-cols-3 gap-5">
        <div className="bg-gradient-to-br from-[#4A5D7F] to-[#3A4D6F] rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-amber-300" />
            <p className="text-xs text-white/60 uppercase tracking-wider font-medium">Reward Points Balance</p>
          </div>
          <p className="font-serif text-4xl font-light">{(rewardPts?.balance || 0).toLocaleString()}</p>
          <p className="text-xs text-white/40 mt-2">Available for redemption</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Total Earned</p>
          <p className="font-serif text-3xl font-semibold text-[#4A5D7F]">{(rewardPts?.totalAccrued || 0).toLocaleString()}</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">Lifetime earnings</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Redeemed</p>
          <p className="font-serif text-3xl font-semibold text-[#4A5D7F]">{(rewardPts?.totalRedeemed || 0).toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">Points used</p>
        </div>
      </div>

      {/* Tier Benefits */}
      <div>
        <h2 className="text-lg font-semibold text-[#2C2C2C] mb-4">Your {member.tier?.name} Benefits</h2>
        <div className="grid grid-cols-2 gap-5">
          {Object.entries(groupedBenefits).map(([category, benefits]) => (
            <div key={category} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#F5F1EC] flex items-center justify-center">
                  {category === "Patient Insights" ? <Users className="w-4 h-4 text-[#4A5D7F]" /> :
                   category === "Financial Rewards" ? <DollarSign className="w-4 h-4 text-[#4A5D7F]" /> :
                   category === "Education" ? <GraduationCap className="w-4 h-4 text-[#4A5D7F]" /> :
                   category === "Patient Support" ? <Users className="w-4 h-4 text-[#4A5D7F]" /> :
                   <Gift className="w-4 h-4 text-[#4A5D7F]" />}
                </div>
                <h3 className="font-semibold text-sm text-[#2C2C2C]">{category}</h3>
              </div>
              <div className="space-y-3">
                {benefits.map(b => (
                  <div key={b.name} className="flex items-start gap-3 p-3 rounded-xl bg-[#F5F1EC]/30">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[#2C2C2C]">{b.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{b.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── CHALLENGES / GAMIFICATION TAB ─── */
function ChallengesTab({ transactions }: { transactions: Record<string, unknown>[] }) {
  const txnCount = transactions.length;
  const totalAmount = transactions.reduce((sum, t) => sum + ((t.TransactionAmount as number) || 0), 0);

  const challenges = [
    { name: "Treatment Pioneer", desc: "Complete 10 treatments", icon: Target, reward: 500, badge: "Pioneer", progress: Math.min(100, (txnCount / 10) * 100), current: txnCount, target: 10, unlocked: txnCount >= 10 },
    { name: "Dysport Champion", desc: "Complete 20 Dysport treatments in a quarter", icon: Zap, reward: 750, badge: "Dysport Master", progress: Math.min(100, (txnCount / 20) * 100), current: Math.min(txnCount, 18), target: 20, unlocked: false },
    { name: "Revenue Milestone", desc: "Reach $15,000 in treatment revenue", icon: DollarSign, reward: 1000, badge: "Revenue Star", progress: Math.min(100, (totalAmount / 15000) * 100), current: totalAmount, target: 15000, unlocked: totalAmount >= 15000 },
    { name: "CME Scholar", desc: "Complete 5 CME courses", icon: GraduationCap, reward: 400, badge: "Scholar", progress: 60, current: 3, target: 5, unlocked: false },
    { name: "Patient Growth", desc: "Refer 5 new patients this quarter", icon: Users, reward: 600, badge: "Growth Driver", progress: 40, current: 2, target: 5, unlocked: false },
    { name: "Monthly Streak", desc: "Perform treatments 20+ days in a month", icon: Flame, reward: 200, badge: "Streak Master", progress: 80, current: 16, target: 20, unlocked: false },
  ];

  const badges = [
    { name: "Pioneer", icon: Target, unlocked: txnCount >= 10 },
    { name: "Dysport Master", icon: Zap, unlocked: false },
    { name: "Revenue Star", icon: DollarSign, unlocked: totalAmount >= 15000 },
    { name: "Scholar", icon: GraduationCap, unlocked: false },
    { name: "Growth Driver", icon: Users, unlocked: false },
    { name: "Streak Master", icon: Flame, unlocked: false },
    { name: "Loyalty VIP", icon: Shield, unlocked: true },
    { name: "Early Adopter", icon: Sparkles, unlocked: true },
  ];

  return (
    <div className="space-y-8">
      {/* Active Challenges */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-[#2C2C2C]">Active Challenges</h2>
          <p className="text-xs text-gray-400">Complete challenges to earn bonus points & exclusive badges</p>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {challenges.map((ch) => {
            const Icon = ch.icon;
            return (
              <div key={ch.name} className={`bg-white rounded-2xl border shadow-sm p-6 transition-all duration-300 ${ch.unlocked ? "border-emerald-200 bg-emerald-50/30" : "border-gray-100 hover:shadow-md"}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${ch.unlocked ? "bg-emerald-100" : "bg-[#F5F1EC]"}`}>
                      <Icon className={`w-5 h-5 ${ch.unlocked ? "text-emerald-600" : "text-[#4A5D7F]"}`} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#2C2C2C]">{ch.name}</h4>
                      <p className="text-xs text-gray-400">{ch.desc}</p>
                    </div>
                  </div>
                  {ch.unlocked && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">{typeof ch.current === "number" && ch.current > 999 ? `$${ch.current.toLocaleString()}` : ch.current} / {typeof ch.target === "number" && ch.target > 999 ? `$${ch.target.toLocaleString()}` : ch.target}</span>
                    <span className="font-semibold text-[#4A5D7F]">{Math.round(ch.progress)}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ${ch.unlocked ? "bg-emerald-400" : "bg-gradient-to-r from-[#4A5D7F] to-[#6B7FA8]"}`} style={{ width: `${ch.progress}%` }} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-xs text-gray-500">+{ch.reward} bonus points</span>
                  <span className="text-xs text-[#4A5D7F] font-medium ml-auto">{ch.badge}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badge Collection */}
      <div>
        <h2 className="text-lg font-semibold text-[#2C2C2C] mb-5">Badge Collection</h2>
        <div className="grid grid-cols-4 gap-4">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.name} className={`bg-white rounded-2xl border p-5 text-center transition-all duration-300 ${badge.unlocked ? "border-[#4A5D7F]/20 shadow-sm" : "border-gray-100 opacity-40"}`}>
                <div className={`w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center ${badge.unlocked ? "bg-gradient-to-br from-amber-100 to-amber-50" : "bg-gray-100"}`}>
                  {badge.unlocked ? (
                    <Icon className="w-7 h-7 text-amber-600" strokeWidth={1.5} />
                  ) : (
                    <LockIcon className="w-5 h-5 text-gray-300" strokeWidth={1.5} />
                  )}
                </div>
                <p className="text-xs font-semibold text-[#2C2C2C]">{badge.name}</p>
                <p className="text-[10px] text-gray-400 mt-1">{badge.unlocked ? "Earned" : "Locked"}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── EDUCATION TAB ─── */
function EducationTab({ member }: { member: MemberData }) {
  const courses = [
    { title: "Dysport Advanced Injection Techniques", category: "Clinical", duration: "2.5 hrs", cme: 2.5, progress: 100, completed: true },
    { title: "Restylane Dermal Filler Masterclass", category: "Clinical", duration: "3 hrs", cme: 3, progress: 75, completed: false },
    { title: "Sculptra Collagen Biostimulator Deep Dive", category: "Clinical", duration: "2 hrs", cme: 2, progress: 30, completed: false },
    { title: "Patient Consultation Best Practices", category: "Practice Mgmt", duration: "1.5 hrs", cme: 1.5, progress: 100, completed: true },
    { title: "Practice Growth & Business Strategy", category: "Business", duration: "2 hrs", cme: 0, progress: 0, completed: false },
    { title: "Aesthetic Trends 2026", category: "Industry", duration: "1 hr", cme: 1, progress: 100, completed: true },
  ];

  const totalCME = courses.filter(c => c.completed).reduce((s, c) => s + c.cme, 0);
  const completedCount = courses.filter(c => c.completed).length;

  const tierAccess = member.tier?.sequenceNumber || 1;
  const hasExclusiveContent = tierAccess >= 3;

  return (
    <div className="space-y-8">
      {/* CME Stats */}
      <div className="grid grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">CME Credits Earned</p>
          <p className="font-serif text-3xl font-semibold text-[#4A5D7F]">{totalCME}</p>
          <p className="text-xs text-gray-400 mt-1">Continuing Medical Education</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Courses Completed</p>
          <p className="font-serif text-3xl font-semibold text-[#4A5D7F]">{completedCount} / {courses.length}</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">{Math.round((completedCount / courses.length) * 100)}% complete</p>
        </div>
        <div className="bg-gradient-to-br from-[#4A5D7F] to-[#3A4D6F] rounded-2xl p-6 text-white">
          <p className="text-xs text-white/60 uppercase tracking-wider mb-2">Points from Education</p>
          <p className="font-serif text-3xl font-light">{completedCount * 150}</p>
          <p className="text-xs text-white/40 mt-1">{150} pts per course</p>
        </div>
      </div>

      {/* Course Catalog */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#2C2C2C]">Course Library</h2>
          {hasExclusiveContent && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 rounded-full border border-purple-100">
              <Sparkles className="w-3 h-3 text-purple-600" />
              <span className="text-[10px] font-semibold text-purple-700">Exclusive Elite Content Unlocked</span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-5">
          {courses.map((course) => (
            <div key={course.title} className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#F5F1EC] flex items-center justify-center group-hover:bg-[#4A5D7F] transition-colors duration-300">
                  <BookOpen className="w-5 h-5 text-[#4A5D7F] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </div>
                {course.completed ? (
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">Completed</span>
                ) : course.progress > 0 ? (
                  <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-full">In Progress</span>
                ) : (
                  <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Not Started</span>
                )}
              </div>
              <h4 className="text-sm font-medium text-[#2C2C2C] mb-1 group-hover:text-[#4A5D7F] transition-colors">{course.title}</h4>
              <p className="text-xs text-gray-400 mb-3">{course.category} &bull; {course.duration}</p>
              {course.cme > 0 && (
                <div className="flex items-center gap-1.5 mb-3">
                  <Award className="w-3 h-3 text-[#4A5D7F]" />
                  <span className="text-[10px] font-medium text-[#4A5D7F]">{course.cme} CME Credits</span>
                </div>
              )}
              {course.progress > 0 && !course.completed && (
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#4A5D7F] rounded-full" style={{ width: `${course.progress}%` }} />
                </div>
              )}
              {course.completed && (
                <div className="flex items-center gap-1.5 text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-medium">+150 pts earned</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── SAVINGS & REBATES TAB ─── */
function SavingsTab({ member }: { member: MemberData }) {
  const rebates = [
    { product: "Dysport 300U", quantity: 24, rebate: "$720", period: "Q2 2026" },
    { product: "Restylane Family", quantity: 36, rebate: "$1,080", period: "Q2 2026" },
    { product: "Sculptra Aesthetic", quantity: 12, rebate: "$540", period: "Q2 2026" },
  ];

  const tierBenefitRebate = member.benefits.find(b => b.category === "Financial Rewards" && b.name.includes("Rebate"));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">This Quarter</p>
          <p className="font-serif text-3xl font-semibold text-[#4A5D7F]">$2,340</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">+8% vs last quarter</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">YTD Savings</p>
          <p className="font-serif text-3xl font-semibold text-[#4A5D7F]">$6,890</p>
          <p className="text-xs text-gray-400 mt-1">Across all products</p>
        </div>
        <div className="bg-gradient-to-br from-[#4A5D7F] to-[#3A4D6F] rounded-2xl p-6 text-white">
          <p className="text-xs text-white/60 uppercase tracking-wider mb-2">Your Rebate Tier</p>
          <p className="font-serif text-2xl font-light">{tierBenefitRebate?.name || "8% Elite Rebate"}</p>
          <p className="text-xs text-white/40 mt-2">{member.tier?.name} tier benefit</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-semibold text-[#2C2C2C] text-sm">Current Quarter Rebates</h3>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-400">Updated today</span>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-50 bg-[#FAFAFA]">
              <th className="text-left px-6 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Product</th>
              <th className="text-left px-6 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Units</th>
              <th className="text-left px-6 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Rebate</th>
              <th className="text-left px-6 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Period</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rebates.map((r) => (
              <tr key={r.product} className="hover:bg-[#F5F1EC]/20 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-[#2C2C2C]">{r.product}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{r.quantity}</td>
                <td className="px-6 py-4 text-sm font-semibold text-[#4A5D7F]">{r.rebate}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{r.period}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Patient Savings Extended */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-semibold text-[#2C2C2C] text-sm mb-4">Patient Savings You&apos;ve Extended</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#F5F1EC]/50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Patients Saved</p>
            <p className="text-xl font-semibold text-[#4A5D7F]">186</p>
          </div>
          <div className="bg-[#F5F1EC]/50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Total Extended</p>
            <p className="text-xl font-semibold text-[#4A5D7F]">$4,215</p>
          </div>
          <div className="bg-[#F5F1EC]/50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Avg. Per Patient</p>
            <p className="text-xl font-semibold text-[#4A5D7F]">$22.66</p>
          </div>
        </div>
      </div>
    </div>
  );
}
