"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles } from "lucide-react";

type PanelId = "earn" | "treatments" | "benefits";

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

export default function ExploreRewards() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [currentPanel, setCurrentPanel] = useState<PanelId | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const websiteContent = document.getElementById("website-content");
    if (isOpen) {
      websiteContent?.style.setProperty("filter", "blur(8px) brightness(0.7)");
      websiteContent?.style.setProperty("transition", "filter 800ms cubic-bezier(0.4, 0, 0.2, 1)");
    } else {
      websiteContent?.style.setProperty("filter", "none");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addAssistantMessage("Hello! I can help you explore ASPIRE Rewards. What would you like to know about?");
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
  }, [currentPanel]);

  const addUserMessage = (content: string) => {
    const msg: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
    };
    setMessages((prev) => [...prev, msg]);
  };

  const addAssistantMessage = (content: string, panelId?: PanelId) => {
    setIsTyping(true);
    setTimeout(() => {
      const msg: Message = {
        id: Date.now().toString(),
        type: "assistant",
        content,
        panelId,
      };
      setMessages((prev) => [...prev, msg]);
      setIsTyping(false);
    }, 800);
  };

  const handleQuickAction = (action: { id: PanelId; question: string; response: string }) => {
    addUserMessage(action.question);
    addAssistantMessage(action.response, action.id);
    setCurrentPanel(action.id);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const lower = inputValue.toLowerCase();
    addUserMessage(inputValue);
    setInputValue("");

    if (lower.includes("earn") || lower.includes("points")) {
      addAssistantMessage("Here's how you earn points with ASPIRE — see the panel →", "earn");
      setCurrentPanel("earn");
    } else if (lower.includes("treatment") || lower.includes("eligible")) {
      addAssistantMessage("These are the eligible treatments — see the panel →", "treatments");
      setCurrentPanel("treatments");
    } else if (lower.includes("benefit") || lower.includes("member")) {
      addAssistantMessage("Here are your exclusive member benefits — see the panel →", "benefits");
      setCurrentPanel("benefits");
    } else {
      addAssistantMessage("I can help you with earning points, eligible treatments, or member benefits. What interests you?");
    }
  };

  const quickActions = [
    {
      id: "earn" as PanelId,
      question: "How do I earn points?",
      label: "Earning Points",
      subtitle: "Treatment rewards",
      response: "Here's how you can earn points with ASPIRE — see the panel →"
    },
    {
      id: "treatments" as PanelId,
      question: "Which treatments are eligible?",
      label: "Eligible Treatments",
      subtitle: "Qualifying procedures",
      response: "These treatments qualify for ASPIRE Rewards — see the panel →"
    },
    {
      id: "benefits" as PanelId,
      question: "What are the member benefits?",
      label: "Member Benefits",
      subtitle: "Exclusive perks",
      response: "Here are your exclusive member benefits — see the panel →"
    },
  ];

  const getPanelContent = (panelId: PanelId) => {
    const count50 = useCounter(50, 2000);
    const count75 = useCounter(75, 2000);
    const count100 = useCounter(100, 2000);
    const count500 = useCounter(500, 2500);
    const count12 = useCounter(12, 2500);
    const count98 = useCounter(98, 2500);

    const panels: Record<PanelId, React.ReactElement> = {
      earn: (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-1000">
          <div className="relative bg-gradient-to-br from-[#4A5D7F] to-[#5A6D8F] text-white p-12 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] mb-6 border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Rewards Program
              </div>
              <h3 className="font-serif text-5xl font-light mb-4 tracking-tight">
                Earning <span className="font-semibold">Points</span>
              </h3>
              <p className="text-white/70 text-base leading-relaxed max-w-2xl">
                Every qualifying treatment automatically earns you valuable points. Our seamless system tracks your aesthetic journey and rewards your commitment to excellence.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { icon: "💉", name: "Dysport®", desc: "Injectable neurotoxin for facial aesthetics", points: count50, gradient: "from-blue-50 to-cyan-50", hover: "group-hover:from-blue-100 group-hover:to-cyan-100" },
              { icon: "💎", name: "Restylane® Family", desc: "Hyaluronic acid dermal fillers", points: count75, gradient: "from-purple-50 to-pink-50", hover: "group-hover:from-purple-100 group-hover:to-pink-100" },
              { icon: "✨", name: "Sculptra® Aesthetic", desc: "Collagen stimulator", points: count100, gradient: "from-amber-50 to-orange-50", hover: "group-hover:from-amber-100 group-hover:to-orange-100" },
            ].map((treatment, i) => (
              <div
                key={treatment.name}
                className="group relative bg-white/80 backdrop-blur-xl border-2 border-[#4A5D7F]/10 hover:border-[#4A5D7F]/30 rounded-2xl p-6 transition-all duration-700 hover:shadow-2xl hover:scale-[1.02] cursor-default"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${treatment.gradient} ${treatment.hover} opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-2xl`} />

                <div className="relative flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5F1EC] to-white flex items-center justify-center flex-shrink-0 shadow-md border border-[#4A5D7F]/10 group-hover:rotate-12 group-hover:scale-110 transition-all duration-700">
                    <span className="text-3xl">{treatment.icon}</span>
                  </div>

                  <div className="flex-1">
                    <h4 className="font-serif text-2xl font-semibold text-[#4A5D7F] mb-1 tracking-tight">
                      {treatment.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">{treatment.desc}</p>

                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4A5D7F]/5 rounded-full">
                      <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-serif text-lg font-semibold text-[#4A5D7F]">
                        {treatment.points}
                      </span>
                      <span className="text-xs text-gray-500">points</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-[#F5F1EC] to-white p-8 rounded-2xl border border-[#4A5D7F]/10 shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#4A5D7F] flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h4 className="font-serif text-xl font-semibold text-[#4A5D7F] mb-2">Automatic Credit</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Points are automatically credited within 24-48 hours after each qualifying treatment. No manual entry required.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Current Progress</p>
                  <p className="font-serif text-3xl font-semibold text-[#4A5D7F]">250 / 500</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Next tier</p>
                  <p className="font-serif text-lg font-semibold text-emerald-600">250 pts away</p>
                </div>
              </div>
              <ProgressBar target={250} total={500} delay={300} />
            </div>
          </div>
        </div>
      ),
      treatments: (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-1000">
          <div className="relative bg-gradient-to-br from-[#4A5D7F] to-[#5A6D8F] text-white p-12 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] mb-6 border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Treatment Portfolio
              </div>
              <h3 className="font-serif text-5xl font-light mb-4 tracking-tight">
                Eligible <span className="font-semibold">Treatments</span>
              </h3>
              <p className="text-white/70 text-base leading-relaxed max-w-2xl">
                Premium aesthetic treatments that qualify for ASPIRE Rewards. Each procedure is performed by certified providers using advanced techniques.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {[
              {
                icon: "💉",
                name: "Dysport®",
                category: "Injectable Neurotoxin",
                desc: "FDA-approved injectable for temporary improvement of moderate to severe frown lines.",
                stats: [
                  { label: "Duration", value: "3-4 months" },
                  { label: "Onset", value: "2-3 days" }
                ],
                points: count50
              },
              {
                icon: "💎",
                name: "Restylane® Family",
                category: "Hyaluronic Acid Fillers",
                desc: "Complete portfolio of dermal fillers for facial volume, contouring, and wrinkle correction.",
                products: ["Restylane®", "Restylane-L®", "Restylane® Lyft", "Restylane® Refyne"],
                points: count75
              },
              {
                icon: "✨",
                name: "Sculptra® Aesthetic",
                category: "Collagen Stimulator",
                desc: "Poly-L-lactic acid injectable that stimulates natural collagen production for gradual, long-lasting results.",
                stats: [
                  { label: "Duration", value: "2+ years" },
                  { label: "Sessions", value: "3-4 typical" }
                ],
                points: count100
              },
            ].map((treatment, i) => (
              <div
                key={treatment.name}
                className="group bg-white/90 backdrop-blur-xl border-2 border-[#4A5D7F]/10 hover:border-[#4A5D7F]/30 rounded-3xl overflow-hidden transition-all duration-700 hover:shadow-2xl hover:scale-[1.01]"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="bg-gradient-to-r from-[#4A5D7F] to-[#5A6D8F] p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:rotate-6 group-hover:scale-110 transition-all duration-700">
                      <span className="text-3xl">{treatment.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-serif text-2xl font-semibold text-white">{treatment.name}</h4>
                      <p className="text-white/70 text-sm">{treatment.category}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-sm text-gray-700 leading-relaxed">{treatment.desc}</p>

                  {treatment.stats && (
                    <div className="grid grid-cols-2 gap-3">
                      {treatment.stats.map((stat) => (
                        <div key={stat.label} className="bg-[#F5F1EC] p-3 rounded-xl">
                          <p className="text-xs font-semibold text-gray-500 mb-1">{stat.label}</p>
                          <p className="font-serif text-base font-semibold text-[#4A5D7F]">{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {treatment.products && (
                    <div className="bg-[#F5F1EC] p-4 rounded-xl space-y-2">
                      {treatment.products.map((product) => (
                        <div key={product} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#4A5D7F]" />
                          <p className="text-xs text-gray-700 font-medium">{product}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4A5D7F]/5 rounded-full">
                    <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-serif text-lg font-semibold text-[#4A5D7F]">
                      {treatment.points}
                    </span>
                    <span className="text-xs text-gray-500">points</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-[#F5F1EC] to-white p-6 rounded-2xl border border-[#4A5D7F]/10">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#4A5D7F] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">ℹ️</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#4A5D7F] mb-1">Important Note</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  All treatments must be performed by a participating ASPIRE provider. Ask your provider if they participate in the program.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      benefits: (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-1000">
          <div className="relative bg-gradient-to-br from-[#4A5D7F] to-[#5A6D8F] text-white p-12 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="font-serif text-5xl font-light mb-4 tracking-tight">
                Member <span className="font-semibold">Benefits</span>
              </h3>
              <p className="text-white/70 text-base leading-relaxed max-w-2xl">
                Exclusive perks designed to reward your aesthetic journey with seamless tracking, instant redemption, and lifetime value.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { icon: "⭐", title: "Earn Points Automatically", desc: "Every qualifying treatment adds points to your account" },
              { icon: "🎁", title: "Exclusive Rewards", desc: "Redeem points for treatments, products, and experiences" },
              { icon: "📊", title: "Track Your Journey", desc: "Monitor points, rewards history, and treatment progress" },
              { icon: "♾️", title: "Points Never Expire", desc: "Save and accumulate points at your own pace" },
            ].map((benefit, i) => (
              <div
                key={benefit.title}
                className="group bg-gradient-to-r from-white to-[#F5F1EC] border-l-4 border-[#4A5D7F] p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-700 hover:-translate-x-2"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                    <span className="text-2xl">{benefit.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-semibold text-[#4A5D7F] mb-1">{benefit.title}</p>
                    <p className="text-sm text-gray-600">{benefit.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-[#F5F1EC] to-white p-8 rounded-2xl border border-[#4A5D7F]/10 shadow-lg">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6 text-center">Program Success</p>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center group cursor-default">
                <p className="font-serif text-4xl font-light text-[#4A5D7F] mb-2 group-hover:scale-110 transition-transform duration-500">
                  {count500}K+
                </p>
                <p className="text-xs text-gray-600 font-medium">Active Members</p>
              </div>
              <div className="text-center group cursor-default">
                <p className="font-serif text-4xl font-light text-[#4A5D7F] mb-2 group-hover:scale-110 transition-transform duration-500">
                  ${count12}M+
                </p>
                <p className="text-xs text-gray-600 font-medium">Rewards Redeemed</p>
              </div>
              <div className="text-center group cursor-default">
                <p className="font-serif text-4xl font-light text-[#4A5D7F] mb-2 group-hover:scale-110 transition-transform duration-500">
                  {count98}%
                </p>
                <p className="text-xs text-gray-600 font-medium">Satisfaction</p>
              </div>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-[#4A5D7F] to-[#5A6D8F] p-8 rounded-3xl overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            <div className="relative z-10 text-center text-white">
              <h4 className="font-serif text-2xl font-semibold mb-3">Ready to Start Earning?</h4>
              <p className="text-white/70 text-sm mb-6 max-w-md mx-auto">
                Join ASPIRE today and unlock exclusive rewards with your first treatment
              </p>
              <button className="px-10 py-4 bg-white text-[#4A5D7F] rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-xl">
                JOIN NOW →
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
          className="fixed bottom-6 left-6 z-50 bg-[#4A5D7F] text-white px-8 py-4 rounded-full shadow-2xl hover:bg-[#3A4D6F] transition-all hover:scale-105 flex items-center gap-3 font-semibold uppercase text-sm tracking-wider"
        >
          <Sparkles className="w-5 h-5" />
          Explore Rewards
        </button>
      )}

      {/* Adaptive Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex animate-in fade-in duration-500">
          {/* Left Panel - Chat (320px) */}
          <div className="w-80 flex-shrink-0 bg-[#F5F1EC]/95 backdrop-blur-xl border-r border-[#4A5D7F]/20 flex flex-col shadow-2xl animate-in slide-in-from-left duration-700">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#4A5D7F] to-[#5A6D8F] p-6 text-white border-b border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif text-xl font-semibold">ASPIRE Assistant</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-white/70">Online • Ready to help</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm ${
                      msg.type === "user"
                        ? "bg-[#4A5D7F] text-white rounded-br-sm"
                        : "bg-white text-gray-800 rounded-bl-sm border border-[#4A5D7F]/10"
                    }`}
                  >
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
                      <p className="text-sm font-semibold text-[#4A5D7F] group-hover:text-white mb-0.5">
                        {action.label}
                      </p>
                      <p className="text-xs text-gray-500 group-hover:text-white/70">{action.subtitle}</p>
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#4A5D7F]/20 bg-white/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask about ASPIRE..."
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
          <div
            ref={contentRef}
            className="flex-1 overflow-y-auto bg-[#F5F1EC] p-10"
          >
            {currentPanel ? (
              getPanelContent(currentPanel)
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-lg">
                  <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#4A5D7F] to-[#5A6D8F] flex items-center justify-center shadow-2xl">
                    <span className="text-5xl">💎</span>
                  </div>
                  <h2 className="font-serif text-4xl font-light text-[#4A5D7F] mb-4 tracking-tight">
                    Welcome to <span className="font-semibold">ASPIRE</span>
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Ask me anything about earning points, eligible treatments, or member benefits.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
