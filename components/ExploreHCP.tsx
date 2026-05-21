"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, BarChart3, MessageCircle, BadgeDollarSign, BookOpen, Tag, Wallet, Gift, TrendingUp, Building2, LineChart, Users, Target, Gem, RefreshCw } from "lucide-react";

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
        <div className="space-y-6">
          {/* Hero Header */}
          <div className="relative bg-[#4A5D7F] text-white p-10 rounded-2xl overflow-hidden animate-in fade-in duration-500" style={{ animationDelay: "200ms" }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.04] rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/[0.03] rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />

            <div className="relative z-10">
              <p className="text-[10px] font-medium text-white/50 uppercase tracking-widest mb-4">Practice Intelligence</p>
              <h3 className="text-3xl font-light mb-3 tracking-tight">
                Unlock Powerful <span className="font-semibold">Practice Tools</span>
              </h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-lg font-light">
                Business-building tools designed to position your practice for long-term success and patient satisfaction.
              </p>
            </div>
          </div>

          {/* Four Practice Tools — Full Cards */}
          <div className="space-y-4">
            {[
              {
                Icon: BarChart3,
                title: "Leverage Patient Insights",
                description: "Access customized data to help identify new patient opportunities and drive business.",
                metrics: [
                  { label: "Data Points", value: "50+" },
                  { label: "Insights/Mo", value: "12" },
                ],
                detail: "Track appointment trends, treatment preferences, and engagement patterns to make informed decisions about your practice growth strategy."
              },
              {
                Icon: MessageCircle,
                title: "Cultivate Patient Relationships",
                description: "Send strategic, branded communications to help encourage engagement and support retention.",
                metrics: [
                  { label: "Templates", value: "20+" },
                  { label: "Avg Open Rate", value: "42%" },
                ],
                detail: "Automated, personalized outreach that keeps your practice top-of-mind while respecting patient preferences and privacy."
              },
              {
                Icon: BadgeDollarSign,
                title: "Earn Savings",
                description: "Get valuable rebates for your practice and exclusive savings to extend to your patients.",
                metrics: [
                  { label: "Avg Savings", value: "$500+/yr" },
                  { label: "Patient Value", value: "$45+" },
                ],
                detail: "Automatic rebates credited to your account, plus patient-facing savings that incentivize treatment loyalty and repeat visits."
              },
              {
                Icon: BookOpen,
                title: "Utilize Treatment Resources",
                description: "Take advantage of educational assets to help support your patients in their aesthetic journey.",
                metrics: [
                  { label: "Resources", value: "100+" },
                  { label: "Categories", value: "8" },
                ],
                detail: "Clinically-backed educational materials covering the full Galderma portfolio — from consultation guides to post-treatment care."
              },
            ].map((tool, i) => {
              const ToolIcon = tool.Icon;
              return (
                <div
                  key={tool.title}
                  className="group relative bg-white border border-gray-100 hover:border-[#4A5D7F]/20 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-lg cursor-default animate-in fade-in slide-in-from-bottom-6"
                  style={{ animationDelay: `${1200 + i * 150}ms`, animationDuration: "600ms", animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                >
                  <div className="relative p-6">
                    <div className="flex items-start gap-5">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-[#4A5D7F]/[0.06] flex items-center justify-center flex-shrink-0 group-hover:bg-[#4A5D7F]/10 transition-colors duration-300">
                        <ToolIcon className="w-5 h-5 text-[#4A5D7F]" strokeWidth={1.5} />
                      </div>

                      {/* Text Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-semibold text-[#2C2C2C] mb-1.5 tracking-tight">
                          {tool.title}
                        </h4>
                        <p className="text-[13px] text-gray-500 leading-relaxed font-light mb-3">
                          {tool.description}
                        </p>
                        <p className="text-[11px] text-gray-400 leading-relaxed mb-3">
                          {tool.detail}
                        </p>

                        {/* Metrics Row */}
                        <div className="flex gap-2">
                          {tool.metrics.map((metric) => (
                            <div key={metric.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F1EC]/60 rounded-lg">
                              <span className="text-sm font-semibold text-[#4A5D7F]">{metric.value}</span>
                              <span className="text-[9px] text-gray-400 uppercase tracking-wider font-medium">{metric.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Stats */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 animate-in fade-in slide-in-from-bottom-6" style={{ animationDelay: "2000ms", animationDuration: "600ms" }}>
            <div className="text-center mb-6">
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-2">Why Practices Choose ASPIRE</p>
              <h4 className="text-lg font-semibold text-[#2C2C2C]">All-In-One Practice Growth Platform</h4>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {([
                { Icon: BarChart3, label: "Insights" },
                { Icon: MessageCircle, label: "Comms" },
                { Icon: BadgeDollarSign, label: "Savings" },
                { Icon: BookOpen, label: "Education" },
              ] as const).map((item, i) => {
                const ItemIcon = item.Icon;
                return (
                  <div key={item.label} className="text-center group/item cursor-default animate-in zoom-in-50 duration-500" style={{ animationDelay: `${2200 + i * 100}ms` }}>
                    <div className="w-11 h-11 mx-auto mb-2 bg-[#4A5D7F]/[0.06] rounded-xl flex items-center justify-center group-hover/item:bg-[#4A5D7F] transition-all duration-300">
                      <ItemIcon className="w-5 h-5 text-[#4A5D7F] group-hover/item:text-white transition-colors duration-300" strokeWidth={1.5} />
                    </div>
                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">{item.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="relative mt-5 mx-8">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            </div>

            <p className="text-center text-[12px] text-gray-400 mt-4 font-light">
              All tools unlock automatically when you enroll — no additional cost.
            </p>
          </div>

          {/* Enroll CTA */}
          <div className="bg-[#4A5D7F] p-8 rounded-2xl text-center animate-in fade-in" style={{ animationDelay: "2400ms" }}>
            <h4 className="text-lg font-semibold text-white mb-2">Ready to Unlock Your Toolkit?</h4>
            <p className="text-white/50 text-[13px] mb-5 max-w-sm mx-auto font-light">
              Enroll today and get instant access to all practice tools at no cost
            </p>
            <button className="px-8 py-3 bg-white text-[#4A5D7F] rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300">
              Enroll for Access
            </button>
          </div>
        </div>
      ),
      savings: (
        <div className="space-y-6">
          {/* Hero — How It All Adds Up */}
          <div className="relative bg-[#4A5D7F] text-white p-10 rounded-2xl overflow-hidden animate-in fade-in duration-500" style={{ animationDelay: "200ms" }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.04] rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/[0.03] rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />

            <div className="relative z-10">
              <p className="text-[10px] font-medium text-white/50 uppercase tracking-widest mb-4">Financial Benefits</p>
              <h3 className="text-3xl font-light mb-3 tracking-tight">
                How It All <span className="font-semibold">Adds Up</span>
              </h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-lg font-light">
                When you join ASPIRE, you automatically unlock valuable product discounts, rebates and rewards. Plus, offer patients significant savings to drive engagement and grow your business.
              </p>
            </div>
          </div>

          {/* Three Pillars of Value */}
          <div className="space-y-3">
            {([
              {
                Icon: Tag,
                title: "Product Discounts",
                description: "Exclusive pricing on the full Galderma aesthetic portfolio — automatically unlocked when you enroll.",
                highlight: `${count30}%`,
                highlightLabel: "Avg. Discount",
              },
              {
                Icon: Wallet,
                title: "Practice Rebates",
                description: "Valuable rebates credited directly to your practice account on qualifying product purchases.",
                highlight: `$${count500}+`,
                highlightLabel: "Annual Value",
              },
              {
                Icon: Gift,
                title: "Patient Savings",
                description: "Offer your patients significant savings across treatments — driving engagement, loyalty, and repeat visits.",
                highlight: `$${count45}+`,
                highlightLabel: "Per Treatment",
              },
            ] as const).map((pillar, i) => {
              const PillarIcon = pillar.Icon;
              return (
                <div
                  key={pillar.title}
                  className="group bg-white border border-gray-100 hover:border-[#4A5D7F]/20 rounded-2xl overflow-hidden transition-all duration-400 hover:shadow-md cursor-default animate-in fade-in slide-in-from-bottom-6"
                  style={{ animationDelay: `${1300 + i * 150}ms`, animationDuration: "600ms", animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-5">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-[#4A5D7F]/[0.06] flex items-center justify-center flex-shrink-0 group-hover:bg-[#4A5D7F]/10 transition-colors duration-300">
                        <PillarIcon className="w-5 h-5 text-[#4A5D7F]" strokeWidth={1.5} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-semibold text-[#2C2C2C] mb-0.5">{pillar.title}</h4>
                        <p className="text-[12px] text-gray-500 leading-relaxed font-light">{pillar.description}</p>
                      </div>

                      {/* Metric Badge */}
                      <div className="flex-shrink-0 text-center px-4 py-2.5 bg-[#F5F1EC]/60 rounded-xl">
                        <p className="text-xl font-semibold text-[#4A5D7F]">{pillar.highlight}</p>
                        <p className="text-[9px] text-gray-400 uppercase tracking-wider font-medium">{pillar.highlightLabel}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visual Equation: Discounts + Rebates + Patient Savings = Growth */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 animate-in fade-in slide-in-from-bottom-6" style={{ animationDelay: "2000ms", animationDuration: "600ms" }}>
            <div className="text-center mb-6">
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">The ASPIRE Equation</p>
            </div>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              {([
                { label: "Discounts", Icon: Tag },
                { label: "Rebates", Icon: Wallet },
                { label: "Patient Savings", Icon: Gift },
              ] as const).map((item, i) => {
                const EqIcon = item.Icon;
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="text-center px-4 py-3 bg-[#FAFAF8] rounded-xl border border-gray-100 animate-in zoom-in-50 duration-500" style={{ animationDelay: `${2200 + i * 150}ms` }}>
                      <EqIcon className="w-5 h-5 text-[#4A5D7F] mx-auto mb-1.5" strokeWidth={1.5} />
                      <span className="text-[9px] font-medium text-gray-500 uppercase tracking-wider">{item.label}</span>
                    </div>
                    {i < 2 && (
                      <span className="text-gray-300 font-light text-xl">+</span>
                    )}
                  </div>
                );
              })}

              <span className="text-gray-300 font-light text-xl mx-1">=</span>

              <div className="text-center px-5 py-3 bg-[#4A5D7F] rounded-xl shadow-sm animate-in zoom-in-50 duration-500" style={{ animationDelay: "2700ms" }}>
                <TrendingUp className="w-5 h-5 text-white mx-auto mb-1.5" strokeWidth={1.5} />
                <span className="text-[9px] font-medium text-white/80 uppercase tracking-wider">Growth</span>
              </div>
            </div>

            <p className="text-center text-[12px] text-gray-400 mt-5 font-light max-w-sm mx-auto">
              Everything unlocks automatically — no additional cost, no complex activation.
            </p>
          </div>

          {/* CTA */}
          <div className="bg-[#4A5D7F] p-8 rounded-2xl text-center animate-in fade-in" style={{ animationDelay: "2400ms" }}>
            <h4 className="text-lg font-semibold text-white mb-2">Start Saving Today</h4>
            <p className="text-white/50 text-[13px] mb-5 max-w-sm mx-auto font-light">
              Enroll in ASPIRE and unlock discounts, rebates, and patient savings immediately
            </p>
            <button className="px-8 py-3 bg-white text-[#4A5D7F] rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300">
              Enroll Now
            </button>
          </div>
        </div>
      ),
      growth: (
        <div className="space-y-6">
          <div className="relative bg-[#4A5D7F] text-white p-10 rounded-2xl overflow-hidden animate-in fade-in duration-500" style={{ animationDelay: "200ms" }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.04] rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/[0.03] rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />
            <div className="relative z-10">
              <p className="text-[10px] font-medium text-white/50 uppercase tracking-widest mb-4">Practice Success</p>
              <h3 className="text-3xl font-light mb-3 tracking-tight">
                Business <span className="font-semibold">Growth</span>
              </h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-lg font-light">
                Drive patient engagement, increase retention, and grow your aesthetic practice with ASPIRE.
              </p>
            </div>
          </div>

          {/* Growth Metrics */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 animate-in fade-in" style={{ animationDelay: "1300ms" }}>
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-6 text-center">Practice Impact</p>
            <div className="grid grid-cols-3 gap-6">
              {([
                { value: `${count15}K+`, label: "Enrolled Practices", Icon: Building2 },
                { value: `${count92}%`, label: "Retention Rate", Icon: LineChart },
                { value: `${count2x}x`, label: "Patient Visits", Icon: Users },
              ] as const).map((stat, i) => {
                const StatIcon = stat.Icon;
                return (
                  <div key={stat.label} className="text-center animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${1500 + i * 150}ms` }}>
                    <div className="w-11 h-11 mx-auto mb-3 bg-[#4A5D7F]/[0.06] rounded-xl flex items-center justify-center">
                      <StatIcon className="w-5 h-5 text-[#4A5D7F]" strokeWidth={1.5} />
                    </div>
                    <p className="text-2xl font-semibold text-[#2C2C2C] mb-0.5">{stat.value}</p>
                    <p className="text-[11px] text-gray-400 font-medium">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Growth Strategies */}
          <div className="space-y-3">
            <h4 className="text-base font-semibold text-[#2C2C2C] mb-3">Growth Strategies</h4>
            {([
              { title: "Patient Retention", desc: "Reward loyal patients to keep them coming back. ASPIRE savings give patients a reason to stay.", Icon: RefreshCw },
              { title: "New Patient Acquisition", desc: "Use patient insights to identify opportunities and reach new audiences effectively.", Icon: Target },
              { title: "Revenue Per Visit", desc: "Cross-sell across the Galderma portfolio with educational resources that inform patients.", Icon: Gem },
            ] as const).map((strategy, i) => {
              const StratIcon = strategy.Icon;
              return (
                <div key={strategy.title} className="group bg-white border border-gray-100 hover:border-[#4A5D7F]/20 rounded-2xl p-5 transition-all duration-300 hover:shadow-md animate-in fade-in slide-in-from-left-4" style={{ animationDelay: `${2000 + i * 150}ms` }}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#4A5D7F]/[0.06] flex items-center justify-center flex-shrink-0 group-hover:bg-[#4A5D7F]/10 transition-colors duration-300">
                      <StratIcon className="w-4 h-4 text-[#4A5D7F]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-[#2C2C2C] mb-0.5">{strategy.title}</h5>
                      <p className="text-[12px] text-gray-500 leading-relaxed font-light">{strategy.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="bg-[#4A5D7F] p-8 rounded-2xl text-center animate-in fade-in" style={{ animationDelay: "2600ms" }}>
            <h4 className="text-lg font-semibold text-white mb-2">Ready to Grow Your Practice?</h4>
            <p className="text-white/50 text-[13px] mb-5 max-w-sm mx-auto font-light">
              Join ASPIRE Practice Rewards and unlock the tools to build your business
            </p>
            <button className="px-8 py-3 bg-white text-[#4A5D7F] rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300">
              Enroll Now
            </button>
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
          className="fixed bottom-5 left-5 z-50 bg-white/90 backdrop-blur-md text-[#4A5D7F] pl-4 pr-5 py-2.5 rounded-full shadow-lg border border-[#4A5D7F]/15 hover:shadow-xl hover:border-[#4A5D7F]/30 transition-all duration-300 hover:scale-[1.02] flex items-center gap-2.5 group"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#4A5D7F] to-[#5A6D8F] flex items-center justify-center flex-shrink-0 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs font-medium tracking-wide text-[#4A5D7F]/90 group-hover:text-[#4A5D7F]">
            Explore Rewards
          </span>
        </button>
      )}

      {/* Adaptive Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Subtle backdrop with premium blur */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e]/60 via-[#16213e]/50 to-[#0f3460]/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

          {/* Left Panel - Conversation */}
          <div className="w-[340px] flex-shrink-0 bg-white/[0.97] backdrop-blur-2xl flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.15)] relative z-10 animate-in slide-in-from-left duration-500" style={{ animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}>
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4A5D7F] to-[#3A4D6F] flex items-center justify-center shadow-sm">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#2C2C2C] tracking-tight">ASPIRE Rewards</h3>
                    <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Online
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200" aria-label="Close">
                  <X className="w-4 h-4 text-gray-400" strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-4 py-2.5 ${msg.type === "user" ? "bg-[#4A5D7F] text-white rounded-2xl rounded-br-md shadow-sm" : "bg-gray-50 text-[#2C2C2C] rounded-2xl rounded-bl-md border border-gray-100"}`}>
                    <p className="text-[13px] leading-relaxed font-light">{msg.content}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-50 px-4 py-3 rounded-2xl rounded-bl-md border border-gray-100">
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              {messages.length <= 1 && !isTyping && (
                <div className="space-y-2 mt-3">
                  <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest px-1 mb-3">Explore Topics</p>
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleQuickAction(action)}
                      className="w-full text-left bg-gray-50/80 hover:bg-[#4A5D7F] border border-gray-100 hover:border-[#4A5D7F] rounded-xl px-4 py-3 transition-all duration-300 group"
                    >
                      <p className="text-[13px] font-medium text-[#2C2C2C] group-hover:text-white">{action.label}</p>
                      <p className="text-[11px] text-gray-400 group-hover:text-white/60 mt-0.5">{action.subtitle}</p>
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Topic Navigation */}
            {currentPanel && (
              <div className="px-4 py-3 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-1.5">
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
                      className={`px-2 py-2 rounded-lg text-[10px] font-semibold tracking-wide transition-all duration-300 ${currentPanel === action.id ? "bg-[#4A5D7F] text-white shadow-sm" : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-[#4A5D7F]"} ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-4 border-t border-gray-100 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask about ASPIRE..."
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-full focus:outline-none focus:border-[#4A5D7F] focus:ring-2 focus:ring-[#4A5D7F]/10 transition-all text-[13px] bg-gray-50/50"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-10 h-10 flex items-center justify-center bg-[#4A5D7F] text-white rounded-full hover:bg-[#3A4D6F] transition-colors disabled:opacity-40 shadow-sm"
                  aria-label="Send"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Dynamic Content */}
          <div className="flex-1 relative z-10">
            {isTransitioning && (
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#FAFAF8]">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-[#4A5D7F]/20 border-t-[#4A5D7F] rounded-full animate-spin" />
                </div>
              </div>
            )}

            {currentPanel && (
              <div
                ref={contentRef}
                className="h-full overflow-y-auto bg-[#FAFAF8] p-10 animate-in fade-in duration-400"
                style={{ animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                key={currentPanel}
              >
                <div className="max-w-3xl mx-auto">
                  {getPanelContent(currentPanel)}
                </div>
              </div>
            )}

            {!currentPanel && (
              <div className="h-full flex items-center justify-center bg-[#FAFAF8]">
                <div className="text-center max-w-sm">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#4A5D7F]/10 to-[#4A5D7F]/5 flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-[#4A5D7F]/40" />
                  </div>
                  <p className="text-sm text-gray-400 font-light">Select a topic to explore ASPIRE benefits</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
