"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles } from "lucide-react";

type PanelId = "tools" | "savings" | "growth";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  panelId?: PanelId;
}

// Animated counter hook
function useCounter(end: number, duration: number = 2000, start: number = 0): number {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number;
    let frameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(start + (end - start) * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [end, duration, start]);

  return count;
}

// Progress bar component
function ProgressBar({ target, total, delay = 0 }: { target: number; total: number; delay?: number }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth((target / total) * 100);
    }, delay);
    return () => clearTimeout(timer);
  }, [target, total, delay]);

  return (
    <div className="w-full h-2.5 bg-[#4A5D7F]/10 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-[#4A5D7F] via-[#5A6D8F] to-[#4A5D7F] rounded-full transition-all duration-[2000ms] ease-out relative"
        style={{ width: `${width}%` }}
      >
        <div className="absolute inset-0 bg-white/20 animate-pulse" />
      </div>
    </div>
  );
}

export default function ExploreHCP() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [currentPanel, setCurrentPanel] = useState<PanelId | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [panelMounted, setPanelMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const count30 = useCounter(panelMounted ? 30 : 0, 2000);
  const count45 = useCounter(panelMounted ? 45 : 0, 2000);
  const count2x = useCounter(panelMounted ? 2 : 0, 2500);
  const count500 = useCounter(panelMounted ? 500 : 0, 2500);
  const count15 = useCounter(panelMounted ? 15 : 0, 2500);
  const count92 = useCounter(panelMounted ? 92 : 0, 2500);

  useEffect(() => {
    const websiteContent = document.getElementById("website-content");
    if (isOpen && currentPanel) {
      websiteContent?.style.setProperty("filter", "blur(8px) brightness(0.7)");
      websiteContent?.style.setProperty("transition", "filter 800ms cubic-bezier(0.4, 0, 0.2, 1)");
    } else {
      websiteContent?.style.setProperty("filter", "none");
    }
  }, [isOpen, currentPanel]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addAssistantMessage("Hello! I can help you explore ASPIRE Practice Rewards and how they can grow your business. What would you like to know?");
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
    if (currentPanel) {
      setPanelMounted(false);
      setTimeout(() => setPanelMounted(true), 600);
    }
  }, [currentPanel]);

  const addUserMessage = (content: string) => {
    const msg: Message = { id: Date.now().toString(), type: "user", content };
    setMessages((prev) => [...prev, msg]);
  };

  const addAssistantMessage = (content: string, panelId?: PanelId) => {
    setIsTyping(true);
    setTimeout(() => {
      const msg: Message = { id: Date.now().toString(), type: "assistant", content, panelId };
      setMessages((prev) => [...prev, msg]);
      setIsTyping(false);
    }, 800);
  };

  const handleQuickAction = (action: { id: PanelId; question: string; response: string }) => {
    addUserMessage(action.question);
    addAssistantMessage(action.response, action.id);

    if (currentPanel && currentPanel !== action.id) {
      setIsTransitioning(true);
      setCurrentPanel(null);
      setTimeout(() => { setCurrentPanel(action.id); setIsTransitioning(false); }, 400);
    } else {
      setCurrentPanel(action.id);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const lower = inputValue.toLowerCase();
    addUserMessage(inputValue);
    setInputValue("");

    let targetPanel: PanelId | null = null;

    if (lower.includes("tool") || lower.includes("insight") || lower.includes("data")) {
      addAssistantMessage("Here's an overview of your practice tools — see the panel →", "tools");
      targetPanel = "tools";
    } else if (lower.includes("saving") || lower.includes("rebate") || lower.includes("discount")) {
      addAssistantMessage("Here's how savings work for your practice — see the panel →", "savings");
      targetPanel = "savings";
    } else if (lower.includes("grow") || lower.includes("patient") || lower.includes("business")) {
      addAssistantMessage("Here's how ASPIRE drives practice growth — see the panel →", "growth");
      targetPanel = "growth";
    } else {
      addAssistantMessage("I can help with practice tools, savings & rebates, or business growth strategies. What interests you?");
    }

    if (targetPanel) {
      if (currentPanel && currentPanel !== targetPanel) {
        setIsTransitioning(true);
        setCurrentPanel(null);
        setTimeout(() => { setCurrentPanel(targetPanel); setIsTransitioning(false); }, 400);
      } else {
        setCurrentPanel(targetPanel);
      }
    }
  };

  const quickActions = [
    {
      id: "tools" as PanelId,
      question: "What practice tools are available?",
      label: "Practice Tools",
      subtitle: "Insights & communications",
      response: "Here's what's in your toolkit — see the panel →"
    },
    {
      id: "savings" as PanelId,
      question: "How do savings & rebates work?",
      label: "Savings & Rebates",
      subtitle: "Discounts for your practice",
      response: "Here's how you save with ASPIRE — see the panel →"
    },
    {
      id: "growth" as PanelId,
      question: "How can I grow my practice?",
      label: "Business Growth",
      subtitle: "Drive engagement",
      response: "Here's how ASPIRE grows your business — see the panel →"
    },
  ];

  const getPanelContent = (panelId: PanelId) => {
    const panels: Record<PanelId, React.ReactElement> = {
      tools: (
        <div className="space-y-8">
          {/* Hero Header */}
          <div className="relative bg-gradient-to-br from-[#4A5D7F] to-[#3A4D6F] text-white p-12 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-90 duration-800" style={{ animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", animationDelay: "200ms" }}>
            {/* Animated background particles */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-in fade-in duration-1200 slide-in-from-top-full" style={{ animationDelay: "400ms" }} />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-purple-400/10 rounded-full blur-3xl animate-in fade-in duration-1200 slide-in-from-bottom-full" style={{ animationDelay: "600ms" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl animate-in fade-in zoom-in-50 duration-1500" style={{ animationDelay: "800ms" }} />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`
            }} />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] mb-6 border border-white/10 animate-in fade-in slide-in-from-left-8 duration-500" style={{ animationDelay: "600ms" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ASPIRE Practice Intelligence
              </div>
              <h3 className="font-serif text-5xl font-light mb-4 tracking-tight animate-in fade-in slide-in-from-left-12 zoom-in-95 duration-700" style={{ animationDelay: "750ms", animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}>
                Unlock Powerful{" "}
                <span className="font-semibold animate-in fade-in zoom-in-50 duration-500" style={{ animationDelay: "950ms" }}>
                  Practice Tools
                </span>
              </h3>
              <p className="text-white/70 text-base leading-relaxed max-w-2xl animate-in fade-in slide-in-from-left-8 duration-600" style={{ animationDelay: "1100ms" }}>
                Powerful, business-building tools designed to position your practice for long-term success and patient satisfaction.
              </p>
            </div>
          </div>

          {/* Four Practice Tools — Full Cards */}
          <div className="space-y-5">
            {[
              {
                icon: "📊",
                emoji: "📈",
                title: "Leverage Patient Insights",
                description: "Access customized data to help identify new patient opportunities and drive business.",
                gradient: "from-blue-50 to-cyan-50",
                hoverGradient: "group-hover:from-blue-100 group-hover:to-cyan-100",
                metrics: [
                  { label: "Data Points", value: "50+" },
                  { label: "Insights/Mo", value: "12" },
                ],
                detail: "Track appointment trends, treatment preferences, and engagement patterns to make informed decisions about your practice growth strategy."
              },
              {
                icon: "💬",
                emoji: "📧",
                title: "Cultivate Patient Relationships",
                description: "Send strategic, branded communications to help encourage engagement and support retention.",
                gradient: "from-purple-50 to-pink-50",
                hoverGradient: "group-hover:from-purple-100 group-hover:to-pink-100",
                metrics: [
                  { label: "Templates", value: "20+" },
                  { label: "Avg Open Rate", value: "42%" },
                ],
                detail: "Automated, personalized outreach that keeps your practice top-of-mind while respecting patient preferences and privacy."
              },
              {
                icon: "💰",
                emoji: "🏷️",
                title: "Earn Savings",
                description: "Get valuable rebates for your practice and exclusive savings to extend to your patients.",
                gradient: "from-amber-50 to-orange-50",
                hoverGradient: "group-hover:from-amber-100 group-hover:to-orange-100",
                metrics: [
                  { label: "Avg Savings", value: "$500+/yr" },
                  { label: "Patient Value", value: "$45+" },
                ],
                detail: "Automatic rebates credited to your account, plus patient-facing savings that incentivize treatment loyalty and repeat visits."
              },
              {
                icon: "📚",
                emoji: "🎓",
                title: "Utilize Treatment Resources",
                description: "Take advantage of educational assets to help support your patients in their aesthetic journey.",
                gradient: "from-emerald-50 to-teal-50",
                hoverGradient: "group-hover:from-emerald-100 group-hover:to-teal-100",
                metrics: [
                  { label: "Resources", value: "100+" },
                  { label: "Categories", value: "8" },
                ],
                detail: "Clinically-backed educational materials covering the full Galderma portfolio — from consultation guides to post-treatment care."
              },
            ].map((tool, i) => (
              <div
                key={tool.title}
                className={`group relative bg-white/90 backdrop-blur-xl border-2 border-[#4A5D7F]/8 hover:border-[#4A5D7F]/25 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 cursor-default animate-in fade-in slide-in-from-bottom-8 zoom-in-95`}
                style={{ animationDelay: `${1200 + i * 200}ms`, animationDuration: "700ms", animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                {/* Hover gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} ${tool.hoverGradient} opacity-0 group-hover:opacity-100 transition-all duration-700`} />

                {/* Card content */}
                <div className="relative p-7">
                  <div className="flex items-start gap-5">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5F1EC] to-white flex items-center justify-center flex-shrink-0 shadow-lg border border-[#4A5D7F]/8 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 animate-in zoom-in-50 duration-600" style={{ animationDelay: `${1300 + i * 200}ms` }}>
                      <span className="text-3xl">{tool.icon}</span>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-[22px] font-semibold text-[#4A5D7F] mb-2 tracking-tight animate-in fade-in slide-in-from-right-4 duration-500" style={{ animationDelay: `${1350 + i * 200}ms` }}>
                        {tool.title}
                      </h4>
                      <p className="text-[15px] text-[#2C2C2C]/80 leading-relaxed font-light mb-4 animate-in fade-in slide-in-from-right-4 duration-500" style={{ animationDelay: `${1450 + i * 200}ms` }}>
                        {tool.description}
                      </p>

                      {/* Extended detail on hover / always visible */}
                      <p className="text-xs text-gray-500 leading-relaxed mb-4 animate-in fade-in duration-500" style={{ animationDelay: `${1550 + i * 200}ms` }}>
                        {tool.detail}
                      </p>

                      {/* Metrics Row */}
                      <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${1650 + i * 200}ms` }}>
                        {tool.metrics.map((metric) => (
                          <div key={metric.label} className="inline-flex items-center gap-2 px-4 py-2 bg-[#4A5D7F]/5 group-hover:bg-white/80 rounded-xl transition-colors duration-300">
                            <span className="font-serif text-lg font-semibold text-[#4A5D7F]">{metric.value}</span>
                            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">{metric.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom accent bar */}
                <div className="h-1 bg-gradient-to-r from-[#4A5D7F]/0 via-[#4A5D7F]/20 to-[#4A5D7F]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="bg-gradient-to-br from-[#F5F1EC] to-white p-8 rounded-3xl border border-[#4A5D7F]/10 shadow-lg animate-in fade-in slide-in-from-bottom-8 zoom-in-95" style={{ animationDelay: "2200ms", animationDuration: "800ms" }}>
            <div className="text-center mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 animate-in fade-in duration-400" style={{ animationDelay: "2400ms" }}>Why Practices Choose ASPIRE</p>
              <h4 className="font-serif text-2xl font-semibold text-[#4A5D7F] animate-in fade-in slide-in-from-bottom duration-500" style={{ animationDelay: "2500ms" }}>All-In-One Practice Growth Platform</h4>
            </div>

            <div className="grid grid-cols-4 gap-4 animate-in fade-in duration-600" style={{ animationDelay: "2600ms" }}>
              {[
                { icon: "📊", label: "Insights" },
                { icon: "💬", label: "Comms" },
                { icon: "💰", label: "Savings" },
                { icon: "📚", label: "Education" },
              ].map((item, i) => (
                <div key={item.label} className="text-center group/item cursor-default animate-in zoom-in-50 duration-500" style={{ animationDelay: `${2700 + i * 100}ms` }}>
                  <div className="w-12 h-12 mx-auto mb-2 bg-[#4A5D7F]/10 rounded-xl flex items-center justify-center group-hover/item:bg-[#4A5D7F] group-hover/item:scale-110 transition-all duration-300">
                    <span className="text-xl group-hover/item:scale-125 transition-transform duration-300">{item.icon}</span>
                  </div>
                  <p className="text-[10px] font-semibold text-[#4A5D7F] uppercase tracking-wider">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Connecting line visual */}
            <div className="relative mt-4 mx-8">
              <div className="h-[2px] bg-gradient-to-r from-transparent via-[#4A5D7F]/20 to-transparent rounded-full animate-in fade-in zoom-in-x-0 duration-1000" style={{ animationDelay: "2900ms" }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#4A5D7F] rounded-full animate-in zoom-in-0 duration-300" style={{ animationDelay: "3100ms" }} />
            </div>

            <p className="text-center text-sm text-gray-500 mt-4 font-light animate-in fade-in duration-500" style={{ animationDelay: "3200ms" }}>
              All tools unlock automatically when you enroll — no additional cost.
            </p>
          </div>

          {/* Enroll CTA */}
          <div className="relative bg-gradient-to-br from-[#4A5D7F] to-[#5A6D8F] p-8 rounded-3xl overflow-hidden shadow-xl animate-in fade-in zoom-in-95" style={{ animationDelay: "3400ms", animationDuration: "700ms" }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />
            <div className="relative z-10 text-center text-white">
              <h4 className="font-serif text-2xl font-semibold mb-3 animate-in fade-in slide-in-from-bottom duration-400" style={{ animationDelay: "3600ms" }}>Ready to Unlock Your Toolkit?</h4>
              <p className="text-white/70 text-sm mb-6 max-w-md mx-auto animate-in fade-in slide-in-from-bottom duration-400" style={{ animationDelay: "3700ms" }}>
                Enroll today and get instant access to all practice tools at no cost
              </p>
              <button className="px-10 py-4 bg-white text-[#4A5D7F] rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-xl animate-in zoom-in duration-500" style={{ animationDelay: "3800ms" }}>
                ENROLL FOR ACCESS →
              </button>
            </div>
          </div>
        </div>
      ),
      savings: (
        <div className="space-y-8">
          {/* Hero — How It All Adds Up */}
          <div className="relative bg-gradient-to-br from-[#4A5D7F] to-[#3A4D6F] text-white p-12 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-90 duration-800" style={{ animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", animationDelay: "200ms" }}>
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl animate-in fade-in duration-1200 slide-in-from-top-full" style={{ animationDelay: "400ms" }} />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-amber-400/10 rounded-full blur-3xl animate-in fade-in duration-1200 slide-in-from-bottom-full" style={{ animationDelay: "600ms" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl animate-in fade-in zoom-in-50 duration-1500" style={{ animationDelay: "800ms" }} />

            {/* Subtle coin/money pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='8' fill='none' stroke='white' stroke-width='0.5'/%3E%3Ccircle cx='30' cy='30' r='4' fill='none' stroke='white' stroke-width='0.3'/%3E%3C/svg%3E")`
            }} />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] mb-6 border border-white/10 animate-in fade-in slide-in-from-left-8 duration-500" style={{ animationDelay: "600ms" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Financial Benefits
              </div>
              <h3 className="font-serif text-5xl font-light mb-4 tracking-tight animate-in fade-in slide-in-from-left-12 zoom-in-95 duration-700" style={{ animationDelay: "750ms", animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}>
                How It All{" "}
                <span className="font-semibold animate-in fade-in zoom-in-50 duration-500" style={{ animationDelay: "950ms" }}>
                  Adds Up
                </span>
              </h3>
              <p className="text-white/80 text-base leading-relaxed max-w-2xl animate-in fade-in slide-in-from-left-8 duration-600" style={{ animationDelay: "1100ms" }}>
                When you join ASPIRE, you automatically unlock valuable product discounts, rebates and rewards. Plus, you can offer patients significant savings across the Galderma aesthetic portfolio to drive engagement and grow your business.
              </p>
            </div>
          </div>

          {/* Three Pillars of Value */}
          <div className="space-y-4">
            {[
              {
                icon: "🏷️",
                title: "Product Discounts",
                description: "Exclusive pricing on the full Galderma aesthetic portfolio — automatically unlocked when you enroll.",
                highlight: `${count30}%`,
                highlightLabel: "Avg. Discount",
                gradient: "from-emerald-50 to-teal-50",
              },
              {
                icon: "💰",
                title: "Practice Rebates",
                description: "Valuable rebates credited directly to your practice account on qualifying product purchases.",
                highlight: `$${count500}+`,
                highlightLabel: "Annual Value",
                gradient: "from-amber-50 to-orange-50",
              },
              {
                icon: "🎁",
                title: "Patient Savings",
                description: "Offer your patients significant savings across treatments — driving engagement, loyalty, and repeat visits.",
                highlight: `$${count45}+`,
                highlightLabel: "Per Treatment",
                gradient: "from-blue-50 to-cyan-50",
              },
            ].map((pillar, i) => (
              <div
                key={pillar.title}
                className="group relative bg-white/90 backdrop-blur-xl border-2 border-[#4A5D7F]/8 hover:border-[#4A5D7F]/25 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 cursor-default animate-in fade-in slide-in-from-bottom-8 zoom-in-95"
                style={{ animationDelay: `${1300 + i * 200}ms`, animationDuration: "700ms", animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                {/* Hover gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-all duration-700`} />

                <div className="relative p-7">
                  <div className="flex items-center gap-5">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5F1EC] to-white flex items-center justify-center flex-shrink-0 shadow-lg border border-[#4A5D7F]/8 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                      <span className="text-3xl">{pillar.icon}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-xl font-semibold text-[#4A5D7F] mb-1 tracking-tight">{pillar.title}</h4>
                      <p className="text-sm text-[#2C2C2C]/70 leading-relaxed font-light">{pillar.description}</p>
                    </div>

                    {/* Metric Badge */}
                    <div className="flex-shrink-0 text-center px-4 py-3 bg-[#4A5D7F]/5 group-hover:bg-white/80 rounded-2xl transition-colors duration-300">
                      <p className="font-serif text-2xl font-semibold text-[#4A5D7F]">{pillar.highlight}</p>
                      <p className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold">{pillar.highlightLabel}</p>
                    </div>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="h-1 bg-gradient-to-r from-[#4A5D7F]/0 via-[#4A5D7F]/15 to-[#4A5D7F]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>

          {/* Visual Equation: Discounts + Rebates + Patient Savings = Growth */}
          <div className="bg-gradient-to-br from-[#F5F1EC] to-white p-8 rounded-3xl border border-[#4A5D7F]/10 shadow-lg animate-in fade-in slide-in-from-bottom-8 zoom-in-95" style={{ animationDelay: "2100ms", animationDuration: "800ms" }}>
            <div className="text-center mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">The ASPIRE Equation</p>
            </div>

            <div className="flex items-center justify-center gap-3 flex-wrap animate-in fade-in duration-700" style={{ animationDelay: "2300ms" }}>
              {[
                { label: "Discounts", icon: "🏷️" },
                { label: "Rebates", icon: "💰" },
                { label: "Patient Savings", icon: "🎁" },
              ].map((item, i) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="text-center px-4 py-3 bg-white rounded-xl shadow-sm border border-[#4A5D7F]/10 animate-in zoom-in-50 duration-500" style={{ animationDelay: `${2400 + i * 150}ms` }}>
                    <span className="text-xl block mb-1">{item.icon}</span>
                    <span className="text-[10px] font-semibold text-[#4A5D7F] uppercase tracking-wider">{item.label}</span>
                  </div>
                  {i < 2 && (
                    <span className="text-[#4A5D7F]/40 font-light text-2xl animate-in fade-in duration-300" style={{ animationDelay: `${2500 + i * 150}ms` }}>+</span>
                  )}
                </div>
              ))}

              <span className="text-[#4A5D7F]/40 font-light text-2xl mx-2 animate-in fade-in duration-300" style={{ animationDelay: "2800ms" }}>=</span>

              <div className="text-center px-6 py-3 bg-gradient-to-br from-[#4A5D7F] to-[#3A4D6F] rounded-xl shadow-lg animate-in zoom-in-50 duration-500" style={{ animationDelay: "2900ms" }}>
                <span className="text-xl block mb-1">📈</span>
                <span className="text-[10px] font-semibold text-white uppercase tracking-wider">Business Growth</span>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6 font-light max-w-md mx-auto animate-in fade-in duration-500" style={{ animationDelay: "3100ms" }}>
              Everything unlocks automatically — no additional cost, no complex activation.
            </p>
          </div>

          {/* CTA */}
          <div className="relative bg-gradient-to-br from-[#4A5D7F] to-[#5A6D8F] p-8 rounded-3xl overflow-hidden shadow-xl animate-in fade-in zoom-in-95" style={{ animationDelay: "3300ms", animationDuration: "700ms" }}>
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            <div className="relative z-10 text-center text-white">
              <h4 className="font-serif text-2xl font-semibold mb-3 animate-in fade-in slide-in-from-bottom duration-400" style={{ animationDelay: "3500ms" }}>Start Saving Today</h4>
              <p className="text-white/70 text-sm mb-6 max-w-md mx-auto animate-in fade-in slide-in-from-bottom duration-400" style={{ animationDelay: "3600ms" }}>
                Enroll in ASPIRE and unlock discounts, rebates, and patient savings immediately
              </p>
              <button className="px-10 py-4 bg-white text-[#4A5D7F] rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-xl animate-in zoom-in duration-500" style={{ animationDelay: "3700ms" }}>
                ENROLL NOW →
              </button>
            </div>
          </div>
        </div>
      ),
      growth: (
        <div className="space-y-8">
          <div className="relative bg-gradient-to-br from-[#4A5D7F] to-[#5A6D8F] text-white p-12 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-90 duration-800" style={{ animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", animationDelay: "200ms" }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-in fade-in duration-1200" style={{ animationDelay: "400ms" }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-400/10 rounded-full blur-3xl animate-in fade-in duration-1200" style={{ animationDelay: "600ms" }} />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] mb-6 border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Practice Success
              </div>
              <h3 className="font-serif text-5xl font-light mb-4 tracking-tight animate-in fade-in slide-in-from-left-12 zoom-in-95 duration-700" style={{ animationDelay: "750ms" }}>
                Business <span className="font-semibold">Growth</span>
              </h3>
              <p className="text-white/70 text-base leading-relaxed max-w-2xl animate-in fade-in slide-in-from-left-8 duration-600" style={{ animationDelay: "1100ms" }}>
                Drive patient engagement, increase retention, and grow your aesthetic practice with ASPIRE.
              </p>
            </div>
          </div>

          {/* Growth Metrics */}
          <div className="bg-gradient-to-br from-[#F5F1EC] to-white p-8 rounded-2xl border border-[#4A5D7F]/10 shadow-lg animate-in fade-in zoom-in-95" style={{ animationDelay: "1300ms" }}>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6 text-center">Practice Impact</p>
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: `${count15}K+`, label: "Enrolled Practices", icon: "🏥" },
                { value: `${count92}%`, label: "Retention Rate", icon: "📈" },
                { value: `${count2x}x`, label: "Patient Visits", icon: "👥" },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center animate-in fade-in slide-in-from-bottom-6" style={{ animationDelay: `${1500 + i * 150}ms` }}>
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <p className="font-serif text-3xl font-light text-[#4A5D7F] mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Strategies */}
          <div className="space-y-4">
            <h4 className="font-serif text-2xl font-semibold text-[#4A5D7F] mb-4">Growth Strategies</h4>
            {[
              { title: "Patient Retention", desc: "Reward loyal patients to keep them coming back. ASPIRE savings give patients a reason to stay.", icon: "🔄" },
              { title: "New Patient Acquisition", desc: "Use patient insights to identify opportunities and reach new audiences effectively.", icon: "🎯" },
              { title: "Revenue Per Visit", desc: "Cross-sell across the Galderma portfolio with educational resources that inform patients.", icon: "💎" },
            ].map((strategy, i) => (
              <div key={strategy.title} className="group bg-white/80 backdrop-blur-xl border border-[#4A5D7F]/10 hover:border-[#4A5D7F]/30 rounded-2xl p-6 transition-all duration-500 hover:shadow-lg animate-in fade-in slide-in-from-left-6" style={{ animationDelay: `${2000 + i * 200}ms` }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F5F1EC] to-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <span className="text-2xl">{strategy.icon}</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[#4A5D7F] mb-1">{strategy.title}</h5>
                    <p className="text-sm text-gray-600 leading-relaxed">{strategy.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="relative bg-gradient-to-br from-[#4A5D7F] to-[#5A6D8F] p-8 rounded-3xl overflow-hidden shadow-xl animate-in fade-in zoom-in-95" style={{ animationDelay: "2800ms" }}>
            <div className="relative z-10 text-center text-white">
              <h4 className="font-serif text-2xl font-semibold mb-3">Ready to Grow Your Practice?</h4>
              <p className="text-white/70 text-sm mb-6 max-w-md mx-auto">
                Join ASPIRE Practice Rewards and unlock the tools to build your business
              </p>
              <button className="px-10 py-4 bg-white text-[#4A5D7F] rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-xl">
                ENROLL NOW →
              </button>
            </div>
          </div>
        </div>
      ),
    };

    return panels[panelId];
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-50 bg-[#4A5D7F] text-white px-8 py-4 rounded-full shadow-2xl hover:bg-[#3A4D6F] transition-all hover:scale-105 flex items-center gap-3 font-semibold uppercase text-sm tracking-wider pulse-glow"
        >
          <Sparkles className="w-5 h-5" />
          Explore Practice Rewards
        </button>
      )}

      {/* Adaptive Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Left Panel - Chat */}
          <div className="w-80 flex-shrink-0 bg-[#F5F1EC]/95 backdrop-blur-xl border-r border-[#4A5D7F]/20 flex flex-col shadow-2xl animate-in slide-in-from-left duration-700">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#4A5D7F] to-[#5A6D8F] p-6 text-white border-b border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif text-xl font-semibold">ASPIRE Practice</h3>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors" aria-label="Close">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-white/70">Online • Ready to help</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm ${msg.type === "user" ? "bg-[#4A5D7F] text-white rounded-br-sm" : "bg-white text-gray-800 rounded-bl-sm border border-[#4A5D7F]/10"}`}>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-[#4A5D7F]/10">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              {messages.length <= 1 && !isTyping && (
                <div className="space-y-2 mt-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2">Quick Topics</p>
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleQuickAction(action)}
                      className="w-full text-left bg-white hover:bg-[#4A5D7F] hover:text-white border border-[#4A5D7F]/20 hover:border-[#4A5D7F] rounded-xl p-3 transition-all duration-300 group"
                    >
                      <p className="text-sm font-semibold text-[#4A5D7F] group-hover:text-white mb-0.5">{action.label}</p>
                      <p className="text-xs text-gray-500 group-hover:text-white/70">{action.subtitle}</p>
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Topic Navigation */}
            {currentPanel && (
              <div className="px-4 py-3 border-t border-[#4A5D7F]/20 bg-gradient-to-b from-[#F5F1EC]/50 to-[#F5F1EC]/80 backdrop-blur-sm">
                <div className="grid grid-cols-3 gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => {
                        if (currentPanel !== action.id && !isTransitioning) {
                          setIsTransitioning(true);
                          setCurrentPanel(null);
                          setTimeout(() => { setCurrentPanel(action.id); setIsTransitioning(false); }, 400);
                        }
                      }}
                      disabled={isTransitioning}
                      className={`px-2 py-2.5 rounded-xl text-xs font-semibold transition-all duration-500 ${currentPanel === action.id ? "bg-gradient-to-br from-[#4A5D7F] to-[#5A6D8F] text-white shadow-xl scale-105" : "bg-white/70 text-[#4A5D7F] hover:bg-white hover:scale-105"} ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}
                    >
                      <span className="text-center flex items-center justify-center gap-1">
                        {currentPanel === action.id && <span className="animate-pulse">✓</span>}
                        {action.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-[#4A5D7F]/20 bg-white/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask about ASPIRE Practice..."
                  className="flex-1 px-4 py-3 border border-[#4A5D7F]/20 rounded-xl focus:outline-none focus:border-[#4A5D7F] transition-colors text-sm bg-white"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-[#4A5D7F] text-white p-3 rounded-xl hover:bg-[#3A4D6F] transition-colors disabled:opacity-50 shadow-sm"
                  aria-label="Send"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Dynamic Content */}
          <div className="flex-1 relative bg-[#F5F1EC]">
            {isTransitioning && (
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#F5F1EC] animate-in fade-in duration-200">
                <div className="w-20 h-20 relative animate-spin" style={{ animationDuration: '1.5s' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4A5D7F] to-[#5A6D8F] rounded-3xl animate-pulse" />
                  <div className="absolute inset-2 bg-[#F5F1EC] rounded-2xl" />
                </div>
              </div>
            )}

            {currentPanel && (
              <div
                ref={contentRef}
                className="h-full overflow-y-auto p-10 animate-in fade-in slide-in-from-right-4 zoom-in-95 duration-500"
                style={{ animationTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                key={currentPanel}
              >
                {getPanelContent(currentPanel)}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
