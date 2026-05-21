"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Users,
  DollarSign,
  BookOpen,
  Bell,
  Settings,
  LogOut,
  TrendingUp,
  Calendar,
  Mail,
  ChevronRight,
  ArrowUpRight,
  Search,
  Plus,
} from "lucide-react";

type Tab = "overview" | "insights" | "communications" | "savings" | "resources";

export default function PortalPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const navItems = [
    { id: "overview" as Tab, label: "Overview", icon: BarChart3 },
    { id: "insights" as Tab, label: "Patient Insights", icon: Users },
    { id: "communications" as Tab, label: "Communications", icon: Mail },
    { id: "savings" as Tab, label: "Savings & Rebates", icon: DollarSign },
    { id: "resources" as Tab, label: "Resources", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F3] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-40">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-gray-100">
          <Link href="/">
            <span className="text-xl font-light tracking-[0.3em] text-[#4A5D7F]">
              ASPIRE
            </span>
          </Link>
          <p className="text-[9px] text-[#4A5D7F]/50 uppercase tracking-wider mt-1 font-semibold">
            Practice Portal
          </p>
        </div>

        {/* Navigation */}
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
              <span className="text-white text-xs font-semibold">CL</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#2C2C2C] truncate">Cosmetic Laser Derm.</p>
              <p className="text-[10px] text-gray-400">San Diego, CA</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 px-3">
            <button className="p-2 rounded-lg hover:bg-[#F5F1EC] text-gray-400 hover:text-[#4A5D7F] transition-colors" aria-label="Settings">
              <Settings className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <Link href="/" className="p-2 rounded-lg hover:bg-[#F5F1EC] text-gray-400 hover:text-[#4A5D7F] transition-colors" aria-label="Log out">
              <LogOut className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-lg font-semibold text-[#2C2C2C]">
              {navItems.find(n => n.id === activeTab)?.label || "Overview"}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">Welcome back, Cosmetic Laser Dermatology</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:border-[#4A5D7F] focus:outline-none w-48 bg-[#FAFAFA]"
              />
            </div>
            <button className="relative p-2 rounded-lg hover:bg-[#F5F1EC] transition-colors" aria-label="Notifications">
              <Bell className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          {activeTab === "overview" && <OverviewContent />}
          {activeTab === "insights" && <InsightsContent />}
          {activeTab === "communications" && <CommunicationsContent />}
          {activeTab === "savings" && <SavingsContent />}
          {activeTab === "resources" && <ResourcesContent />}
        </div>
      </main>
    </div>
  );
}

/* ─── Overview Dashboard ─── */
function OverviewContent() {
  const stats = [
    { label: "Active Patients", value: "1,247", change: "+12%", icon: Users, trend: "up" },
    { label: "Points Earned (Mo)", value: "8,450", change: "+23%", icon: TrendingUp, trend: "up" },
    { label: "Rebates This Quarter", value: "$2,340", change: "+8%", icon: DollarSign, trend: "up" },
    { label: "Appointments (Mo)", value: "186", change: "+5%", icon: Calendar, trend: "up" },
  ];

  const recentActivity = [
    { patient: "Sarah M.", treatment: "Dysport® — Glabellar Lines", points: 50, time: "2 hours ago" },
    { patient: "Jennifer K.", treatment: "Restylane® Lyft — Cheeks", points: 75, time: "4 hours ago" },
    { patient: "Michelle R.", treatment: "Sculptra® Aesthetic", points: 100, time: "Yesterday" },
    { patient: "Amanda T.", treatment: "Restylane® Kysse — Lips", points: 75, time: "Yesterday" },
    { patient: "Lisa B.", treatment: "Dysport® — Glabellar Lines", points: 50, time: "2 days ago" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#F5F1EC] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#4A5D7F]" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="font-serif text-2xl font-semibold text-[#2C2C2C] mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-semibold text-[#2C2C2C] text-sm">Recent Patient Activity</h3>
            <button className="text-xs text-[#4A5D7F] font-medium hover:underline underline-offset-4">View All</button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentActivity.map((activity, i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-[#F5F1EC]/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F5F1EC] to-white border border-[#4A5D7F]/10 flex items-center justify-center">
                    <span className="text-xs font-semibold text-[#4A5D7F]">{activity.patient.split(" ")[0][0]}{activity.patient.split(" ")[1][0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#2C2C2C]">{activity.patient}</p>
                    <p className="text-xs text-gray-400">{activity.treatment}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#4A5D7F]">+{activity.points} pts</p>
                  <p className="text-[10px] text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-5">
          <div className="bg-gradient-to-br from-[#4A5D7F] to-[#3A4D6F] rounded-2xl p-6 text-white">
            <h3 className="font-semibold text-sm mb-2">This Month&apos;s Goal</h3>
            <p className="font-serif text-3xl font-light mb-1">186 <span className="text-base text-white/60">/ 200</span></p>
            <p className="text-xs text-white/60 mb-4">Treatments completed</p>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white/80 rounded-full" style={{ width: "93%" }} />
            </div>
            <p className="text-[10px] text-white/50 mt-2">93% — 14 more to reach goal</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-[#2C2C2C] text-sm mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: "Send Patient Communication", icon: Mail },
                { label: "View Rebate Statement", icon: DollarSign },
                { label: "Browse Resources", icon: BookOpen },
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

/* ─── Patient Insights ─── */
function InsightsContent() {
  const patients = [
    { name: "Sarah Mitchell", lastVisit: "May 15, 2026", treatments: 8, totalPoints: 450, status: "Active", nextAppt: "Jun 2" },
    { name: "Jennifer Kim", lastVisit: "May 14, 2026", treatments: 12, totalPoints: 820, status: "Active", nextAppt: "Jun 8" },
    { name: "Michelle Roberts", lastVisit: "May 12, 2026", treatments: 5, totalPoints: 350, status: "Active", nextAppt: "Jul 1" },
    { name: "Amanda Torres", lastVisit: "May 10, 2026", treatments: 15, totalPoints: 1100, status: "VIP", nextAppt: "May 28" },
    { name: "Lisa Brown", lastVisit: "May 8, 2026", treatments: 3, totalPoints: 150, status: "New", nextAppt: "Jun 15" },
    { name: "Rachel Davis", lastVisit: "Apr 28, 2026", treatments: 7, totalPoints: 520, status: "At Risk", nextAppt: "—" },
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {["All Patients", "Active", "VIP", "At Risk", "New"].map((filter) => (
            <button key={filter} className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${filter === "All Patients" ? "bg-[#4A5D7F] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[#4A5D7F] hover:text-[#4A5D7F]"}`}>
              {filter}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#4A5D7F] text-white rounded-lg text-xs font-semibold hover:bg-[#3A4D6F] transition-colors">
          <Plus className="w-3 h-3" />
          Add Patient
        </button>
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-[#FAFAFA]">
              <th className="text-left px-6 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="text-left px-6 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Last Visit</th>
              <th className="text-left px-6 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Treatments</th>
              <th className="text-left px-6 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Points</th>
              <th className="text-left px-6 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Next Appt</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {patients.map((patient) => (
              <tr key={patient.name} className="hover:bg-[#F5F1EC]/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F5F1EC] to-white border border-[#4A5D7F]/10 flex items-center justify-center">
                      <span className="text-[10px] font-semibold text-[#4A5D7F]">{patient.name.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                    <span className="text-sm font-medium text-[#2C2C2C]">{patient.name}</span>
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
                  }`}>
                    {patient.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{patient.nextAppt}</td>
                <td className="px-6 py-4">
                  <button className="p-1.5 rounded-lg hover:bg-[#F5F1EC] text-gray-400 hover:text-[#4A5D7F] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Communications ─── */
function CommunicationsContent() {
  const campaigns = [
    { name: "Monthly Newsletter — May", status: "Sent", sent: 842, opened: 356, rate: "42%", date: "May 1" },
    { name: "Sculptra® Special Offer", status: "Sent", sent: 523, opened: 241, rate: "46%", date: "Apr 28" },
    { name: "Post-Treatment Follow Up", status: "Active", sent: 186, opened: 98, rate: "53%", date: "Ongoing" },
    { name: "Summer Refresh Campaign", status: "Draft", sent: 0, opened: 0, rate: "—", date: "Jun 1" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Send strategic, branded communications to encourage engagement.</p>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#4A5D7F] text-white rounded-lg text-xs font-semibold hover:bg-[#3A4D6F] transition-colors">
          <Plus className="w-3 h-3" />
          New Campaign
        </button>
      </div>

      {/* Campaign Cards */}
      <div className="grid grid-cols-2 gap-5">
        {campaigns.map((campaign) => (
          <div key={campaign.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-medium text-sm text-[#2C2C2C] mb-1">{campaign.name}</h4>
                <p className="text-xs text-gray-400">{campaign.date}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                campaign.status === "Sent" ? "bg-emerald-50 text-emerald-700" :
                campaign.status === "Active" ? "bg-blue-50 text-blue-700" :
                "bg-gray-100 text-gray-600"
              }`}>
                {campaign.status}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-lg font-semibold text-[#2C2C2C]">{campaign.sent || "—"}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Sent</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-[#2C2C2C]">{campaign.opened || "—"}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Opened</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-[#4A5D7F]">{campaign.rate}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Rate</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Savings & Rebates ─── */
function SavingsContent() {
  const rebates = [
    { product: "Dysport® 300U", quantity: 24, rebate: "$720", period: "Q2 2026" },
    { product: "Restylane® Family", quantity: 36, rebate: "$1,080", period: "Q2 2026" },
    { product: "Sculptra® Aesthetic", quantity: 12, rebate: "$540", period: "Q2 2026" },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
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
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Patient Savings Extended</p>
          <p className="font-serif text-3xl font-semibold text-[#4A5D7F]">$4,215</p>
          <p className="text-xs text-gray-400 mt-1">186 patients this month</p>
        </div>
      </div>

      {/* Rebate Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-50">
          <h3 className="font-semibold text-[#2C2C2C] text-sm">Current Quarter Rebates</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-50 bg-[#FAFAFA]">
              <th className="text-left px-6 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Product</th>
              <th className="text-left px-6 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Units Purchased</th>
              <th className="text-left px-6 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Rebate Earned</th>
              <th className="text-left px-6 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Period</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rebates.map((rebate) => (
              <tr key={rebate.product} className="hover:bg-[#F5F1EC]/20 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-[#2C2C2C]">{rebate.product}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{rebate.quantity}</td>
                <td className="px-6 py-4 text-sm font-semibold text-[#4A5D7F]">{rebate.rebate}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{rebate.period}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Treatment Resources ─── */
function ResourcesContent() {
  const resources = [
    { title: "Dysport® Treatment Guide", category: "Clinical Guide", type: "PDF", updated: "May 2026" },
    { title: "Restylane® Patient Consultation Toolkit", category: "Consultation", type: "Kit", updated: "Apr 2026" },
    { title: "Sculptra® Before & After Gallery", category: "Visual Assets", type: "Gallery", updated: "May 2026" },
    { title: "Post-Treatment Care Instructions", category: "Patient Handout", type: "PDF", updated: "Mar 2026" },
    { title: "Aesthetic Trends Report 2026", category: "Industry Insights", type: "Report", updated: "Jan 2026" },
    { title: "Practice Marketing Templates", category: "Marketing", type: "Templates", updated: "Apr 2026" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Educational assets to support your patients in their aesthetic journey.</p>
        <div className="flex gap-2">
          {["All", "Clinical", "Marketing", "Patient-Facing"].map((filter) => (
            <button key={filter} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === "All" ? "bg-[#4A5D7F] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[#4A5D7F]"}`}>
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {resources.map((resource) => (
          <div key={resource.title} className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#F5F1EC] flex items-center justify-center group-hover:bg-[#4A5D7F] transition-colors duration-300">
                <BookOpen className="w-5 h-5 text-[#4A5D7F] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
              </div>
              <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{resource.type}</span>
            </div>
            <h4 className="text-sm font-medium text-[#2C2C2C] mb-1 group-hover:text-[#4A5D7F] transition-colors">{resource.title}</h4>
            <p className="text-xs text-gray-400">{resource.category} • Updated {resource.updated}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
