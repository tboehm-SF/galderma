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
          <div className="relative bg-gradient-to-br from-[#4A5D7F] to-[#5A6D8F] text-white p-12 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-90 duration-800" style={{ animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", animationDelay: "200ms" }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-in fade-in duration-1200 slide-in-from-top-full" style={{ animationDelay: "400ms" }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/10 rounded-full blur-3xl animate-in fade-in duration-1200 slide-in-from-bottom-full" style={{ animationDelay: "600ms" }} />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] mb-6 border border-white/10 animate-in fade-in slide-in-from-left-8 duration-500" style={{ animationDelay: "600ms" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Practice Intelligence
              </div>
              <h3 className="font-serif text-5xl font-light mb-4 tracking-tight animate-in fade-in slide-in-from-left-12 zoom-in-95 duration-700" style={{ animationDelay: "750ms" }}>
                Your <span className="font-semibold">Toolkit</span>
              </h3>
              <p className="text-white/70 text-base leading-relaxed max-w-2xl animate-in fade-in slide-in-from-left-8 duration-600" style={{ animationDelay: "1100ms" }}>
                Powerful tools designed to help you understand your patients better and strengthen your practice.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { icon: "📊", name: "Patient Insights Dashboard", desc: "Customized data to identify opportunities", detail: "Track patient activity, appointment frequency, and treatment preferences" },
              { icon: "📧", name: "Branded Communications", desc: "Strategic engagement messaging", detail: "Automated patient outreach with your practice branding" },
              { icon: "📚", name: "Educational Resources", desc: "Treatment education assets", detail: "Patient-facing content about Galderma aesthetic treatments" },
            ].map((tool, i) => (
              <div
                key={tool.name}
                className="group relative bg-white/80 backdrop-blur-xl border-2 border-[#4A5D7F]/10 hover:border-[#4A5D7F]/30 rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 cursor-default animate-in fade-in slide-in-from-left-8 zoom-in-90"
                style={{ animationDelay: `${1300 + i * 200}ms`, animationDuration: "700ms" }}
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F5F1EC] to-white flex items-center justify-center flex-shrink-0 shadow-md border border-[#4A5D7F]/10 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                    <span className="text-2xl">{tool.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-xl font-semibold text-[#4A5D7F] mb-1">{tool.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{tool.desc}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{tool.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      savings: (
        <div className="space-y-8">
          <div className="relative bg-gradient-to-br from-[#4A5D7F] to-[#5A6D8F] text-white p-12 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-90 duration-800" style={{ animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", animationDelay: "200ms" }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl animate-in fade-in duration-1200" style={{ animationDelay: "400ms" }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl animate-in fade-in duration-1200" style={{ animationDelay: "600ms" }} />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] mb-6 border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Financial Benefits
              </div>
              <h3 className="font-serif text-5xl font-light mb-4 tracking-tight animate-in fade-in slide-in-from-left-12 zoom-in-95 duration-700" style={{ animationDelay: "750ms" }}>
                Savings & <span className="font-semibold">Rebates</span>
              </h3>
              <p className="text-white/70 text-base leading-relaxed max-w-2xl animate-in fade-in slide-in-from-left-8 duration-600" style={{ animationDelay: "1100ms" }}>
                Valuable discounts and rebates that directly benefit your practice bottom line while keeping patients happy.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Practice Rebates", value: `${count30}%`, desc: "On qualifying purchases", icon: "💰" },
              { label: "Patient Savings", value: `$${count45}+`, desc: "Per treatment you can extend", icon: "🎁" },
              { label: "Portfolio Coverage", value: `${count2x}x`, desc: "More products than competitors", icon: "📦" },
              { label: "Annual Value", value: `$${count500}+`, desc: "Average practice savings", icon: "📈" },
            ].map((stat, i) => (
              <div key={stat.label} className="bg-white/80 backdrop-blur-xl border border-[#4A5D7F]/10 rounded-2xl p-6 text-center animate-in fade-in zoom-in-95" style={{ animationDelay: `${1300 + i * 150}ms` }}>
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="font-serif text-3xl font-semibold text-[#4A5D7F] mb-1">{stat.value}</p>
                <p className="text-sm font-semibold text-[#4A5D7F] mb-1">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-[#F5F1EC] to-white p-8 rounded-2xl border border-[#4A5D7F]/10 shadow-lg animate-in fade-in slide-in-from-bottom-8" style={{ animationDelay: "2000ms" }}>
            <h4 className="font-serif text-xl font-semibold text-[#4A5D7F] mb-4">How Rebates Work</h4>
            <div className="space-y-3">
              {[
                "Purchase qualifying Galderma aesthetic products",
                "Rebates automatically credited to your account",
                "Extend patient savings to drive repeat visits",
                "Track all savings through your ASPIRE dashboard",
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#4A5D7F] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-semibold">{i + 1}</span>
                  </div>
                  <p className="text-sm text-gray-700">{step}</p>
                </div>
              ))}
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
