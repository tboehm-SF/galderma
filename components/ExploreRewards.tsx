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
  const [panelMounted, setPanelMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // All counter hooks must be at the top level - only count when panel is mounted
  const count50 = useCounter(panelMounted ? 50 : 0, 2000);
  const count75 = useCounter(panelMounted ? 75 : 0, 2000);
  const count100 = useCounter(panelMounted ? 100 : 0, 2000);
  const count500 = useCounter(panelMounted ? 500 : 0, 2500);
  const count12 = useCounter(panelMounted ? 12 : 0, 2500);
  const count98 = useCounter(panelMounted ? 98 : 0, 2500);

  useEffect(() => {
    const websiteContent = document.getElementById("website-content");
    if (isOpen && currentPanel) {
      // Blur background when panel content is shown
      websiteContent?.style.setProperty("filter", "blur(8px) brightness(0.7)");
      websiteContent?.style.setProperty("transition", "filter 800ms cubic-bezier(0.4, 0, 0.2, 1)");
    } else {
      websiteContent?.style.setProperty("filter", "none");
    }
  }, [isOpen, currentPanel]);

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

    // Reset and trigger counters when panel changes
    if (currentPanel) {
      setPanelMounted(false);
      setTimeout(() => setPanelMounted(true), 600); // Start counting after hero animation
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

    // Smooth morphing transition when switching panels
    if (currentPanel && currentPanel !== action.id) {
      setIsTransitioning(true);
      setCurrentPanel(null);
      setTimeout(() => {
        setCurrentPanel(action.id);
        setIsTransitioning(false);
      }, 400);
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

    if (lower.includes("earn") || lower.includes("points")) {
      addAssistantMessage("Here's how you earn points with ASPIRE — see the panel →", "earn");
      targetPanel = "earn";
    } else if (lower.includes("treatment") || lower.includes("eligible")) {
      addAssistantMessage("These are the eligible treatments — see the panel →", "treatments");
      targetPanel = "treatments";
    } else if (lower.includes("benefit") || lower.includes("member")) {
      addAssistantMessage("Here are your exclusive member benefits — see the panel →", "benefits");
      targetPanel = "benefits";
    } else {
      addAssistantMessage("I can help you with earning points, eligible treatments, or member benefits. What interests you?");
    }

    // Smooth morphing transition when switching panels
    if (targetPanel) {
      if (currentPanel && currentPanel !== targetPanel) {
        setIsTransitioning(true);
        setCurrentPanel(null);
        setTimeout(() => {
          setCurrentPanel(targetPanel);
          setIsTransitioning(false);
        }, 400);
      } else {
        setCurrentPanel(targetPanel);
      }
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
    const panels: Record<PanelId, React.ReactElement> = {
      earn: (
        <div className="space-y-8">
          <div className="relative bg-gradient-to-br from-[#4A5D7F] to-[#5A6D8F] text-white p-12 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-90 duration-800" style={{ animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", animationDelay: "200ms" }}>
            {/* Animated particle glow circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-in fade-in duration-1200 slide-in-from-top-full" style={{ animationDelay: "400ms" }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/10 rounded-full blur-3xl animate-in fade-in duration-1200 slide-in-from-bottom-full" style={{ animationDelay: "600ms" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-in fade-in zoom-in-50 duration-1500" style={{ animationDelay: "800ms" }} />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] mb-6 border border-white/10 animate-in fade-in slide-in-from-left-8 duration-500" style={{ animationDelay: "600ms" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Rewards Program
              </div>
              <h3 className="font-serif text-5xl font-light mb-4 tracking-tight animate-in fade-in slide-in-from-left-12 zoom-in-95 duration-700" style={{ animationDelay: "750ms", animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}>
                Earning <span className="font-semibold animate-in fade-in zoom-in-50 duration-500" style={{ animationDelay: "950ms" }}>Points</span>
              </h3>
              <p className="text-white/70 text-base leading-relaxed max-w-2xl animate-in fade-in slide-in-from-left-8 duration-600" style={{ animationDelay: "1100ms" }}>
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
                className="group relative bg-white/80 backdrop-blur-xl border-2 border-[#4A5D7F]/10 hover:border-[#4A5D7F]/30 rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1 cursor-default animate-in fade-in slide-in-from-left-8 zoom-in-90 rotate-in-6"
                style={{ animationDelay: `${1300 + i * 200}ms`, animationDuration: "700ms", animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${treatment.gradient} ${treatment.hover} opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-2xl animate-in fade-in duration-300`} />

                <div className="relative flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5F1EC] to-white flex items-center justify-center flex-shrink-0 shadow-md border border-[#4A5D7F]/10 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 animate-in zoom-in-50 rotate-in-12 duration-600" style={{ animationDelay: `${1400 + i * 200}ms` }}>
                    <span className="text-3xl">{treatment.icon}</span>
                  </div>

                  <div className="flex-1">
                    <h4 className="font-serif text-2xl font-semibold text-[#4A5D7F] mb-1 tracking-tight animate-in fade-in slide-in-from-right-4 duration-500" style={{ animationDelay: `${1450 + i * 200}ms` }}>
                      {treatment.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3 animate-in fade-in slide-in-from-right-4 duration-500" style={{ animationDelay: `${1550 + i * 200}ms` }}>{treatment.desc}</p>

                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4A5D7F]/5 rounded-full animate-in fade-in zoom-in-95 duration-500" style={{ animationDelay: `${1650 + i * 200}ms` }}>
                      <svg className="w-4 h-4 text-amber-500 animate-in zoom-in-50 rotate-in-12 duration-400" style={{ animationDelay: `${1700 + i * 200}ms` }} fill="currentColor" viewBox="0 0 20 20">
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

          <div className="bg-gradient-to-br from-[#F5F1EC] to-white p-8 rounded-2xl border border-[#4A5D7F]/10 shadow-lg animate-in fade-in slide-in-from-bottom-8 zoom-in-90" style={{ animationDelay: "2300ms", animationDuration: "800ms", animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#4A5D7F] flex items-center justify-center flex-shrink-0 shadow-md animate-in zoom-in-50 rotate-in-45 duration-700" style={{ animationDelay: "2500ms" }}>
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h4 className="font-serif text-xl font-semibold text-[#4A5D7F] mb-2 animate-in fade-in slide-in-from-right-6 duration-500" style={{ animationDelay: "2600ms" }}>Automatic Credit</h4>
                <p className="text-sm text-gray-600 leading-relaxed animate-in fade-in slide-in-from-right-4 duration-500" style={{ animationDelay: "2750ms" }}>
                  Points are automatically credited within 24-48 hours after each qualifying treatment. No manual entry required.
                </p>
              </div>
            </div>

            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-6 zoom-in-95 duration-600" style={{ animationDelay: "2900ms" }}>
              <div className="flex items-end justify-between">
                <div className="animate-in fade-in slide-in-from-left-4 duration-400" style={{ animationDelay: "3000ms" }}>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Current Progress</p>
                  <p className="font-serif text-3xl font-semibold text-[#4A5D7F]">250 / 500</p>
                </div>
                <div className="text-right animate-in fade-in slide-in-from-right-4 duration-400" style={{ animationDelay: "3100ms" }}>
                  <p className="text-xs text-gray-500">Next tier</p>
                  <p className="font-serif text-lg font-semibold text-emerald-600">250 pts away</p>
                </div>
              </div>
              <ProgressBar target={250} total={500} delay={3200} />
            </div>
          </div>
        </div>
      ),
      treatments: (
        <div className="space-y-8">
          <div className="relative bg-gradient-to-br from-[#4A5D7F] to-[#5A6D8F] text-white p-12 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-90 duration-800" style={{ animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", animationDelay: "200ms" }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-in fade-in duration-1200 slide-in-from-top-full" style={{ animationDelay: "400ms" }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-400/10 rounded-full blur-3xl animate-in fade-in duration-1200 slide-in-from-bottom-full" style={{ animationDelay: "600ms" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-in fade-in zoom-in-50 duration-1500" style={{ animationDelay: "800ms" }} />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] mb-6 border border-white/10 animate-in fade-in slide-in-from-left-8 duration-500" style={{ animationDelay: "600ms" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Treatment Portfolio
              </div>
              <h3 className="font-serif text-5xl font-light mb-4 tracking-tight animate-in fade-in slide-in-from-left-12 zoom-in-95 duration-700" style={{ animationDelay: "750ms", animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}>
                Eligible <span className="font-semibold animate-in fade-in zoom-in-50 duration-500" style={{ animationDelay: "950ms" }}>Treatments</span>
              </h3>
              <p className="text-white/70 text-base leading-relaxed max-w-2xl animate-in fade-in slide-in-from-left-8 duration-600" style={{ animationDelay: "1100ms" }}>
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
                className="group bg-white/90 backdrop-blur-xl border-2 border-[#4A5D7F]/10 hover:border-[#4A5D7F]/30 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-6 zoom-in-95"
                style={{ animationDelay: `${600 + i * 200}ms`, animationDuration: "700ms", animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
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
                      {[
                        { name: "Restylane®", info: "For moderate to severe facial wrinkles and folds, lip enhancement" },
                        { name: "Restylane-L®", info: "With lidocaine for enhanced comfort during treatment" },
                        { name: "Restylane® Lyft", info: "For cheek augmentation and correction of age-related midface contour deficiencies" },
                        { name: "Restylane® Refyne", info: "For moderate to severe facial wrinkles and folds with natural movement" }
                      ].map((product) => (
                        <div key={product.name} className="group/product relative flex items-center gap-2 py-1 cursor-help">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#4A5D7F] group-hover/product:scale-150 transition-transform duration-300" />
                          <p className="text-xs text-gray-700 font-medium group-hover/product:text-[#4A5D7F] transition-colors">{product.name}</p>

                          {/* Hover Tooltip */}
                          <div className="absolute left-0 top-full mt-2 w-64 bg-white border-2 border-[#4A5D7F]/20 rounded-xl p-3 shadow-xl opacity-0 invisible group-hover/product:opacity-100 group-hover/product:visible transition-all duration-300 z-30 pointer-events-none">
                            <div className="absolute -top-2 left-4 w-4 h-4 bg-white border-l-2 border-t-2 border-[#4A5D7F]/20 transform rotate-45" />
                            <p className="text-xs font-semibold text-[#4A5D7F] mb-1">{product.name}</p>
                            <p className="text-xs text-gray-600 leading-relaxed">{product.info}</p>
                          </div>
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

          {/* Interactive Map - Find Provider */}
          <div className="relative bg-gradient-to-br from-[#4A5D7F] to-[#5A6D8F] rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95" style={{ animationDelay: "1600ms", animationDuration: "800ms" }}>
            {/* Cinematic Zoom Background */}
            <div className="relative h-96 overflow-hidden bg-black">
              {/* Space layer - zoom from deep space */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-blue-950 to-black"
                style={{
                  animationName: "zoom-from-space",
                  animationDuration: "8s",
                  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  animationFillMode: "forwards",
                  animationDelay: "1800ms"
                }}
              >
                {/* Twinkling stars */}
                <div className="absolute inset-0 opacity-60">
                  {[...Array(50)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute bg-white rounded-full animate-pulse"
                      style={{
                        width: `${1 + Math.random() * 2}px`,
                        height: `${1 + Math.random() * 2}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${1.5 + Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Atmosphere layer - zoom from orbit */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-800/40 via-cyan-700/30 to-transparent"
                style={{
                  animationName: "zoom-from-orbit",
                  animationDuration: "6s",
                  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  animationFillMode: "forwards",
                  animationDelay: "2200ms"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-400/10 to-transparent" />
              </div>

              {/* City layer - Zurich zooming in */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  animationName: "zoom-to-street",
                  animationDuration: "4s",
                  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  animationFillMode: "forwards",
                  animationDelay: "2800ms"
                }}
              >
                <div className="relative">
                  {/* City lights effect */}
                  <div className="absolute inset-0 blur-2xl">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/30 rounded-full" />
                    <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-teal-400/20 rounded-full" />
                    <div className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-cyan-500/25 rounded-full" />
                  </div>

                  {/* Location pin */}
                  <div className="relative text-white/40 text-9xl font-light animate-in fade-in zoom-in-50 duration-2000" style={{ animationDelay: "4000ms" }}>
                    📍
                  </div>

                  {/* Zurich label */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <p className="text-white/60 text-sm font-light tracking-wider animate-in fade-in slide-in-from-bottom duration-800" style={{ animationDelay: "4500ms" }}>
                      Zürich, Switzerland
                    </p>
                  </div>
                </div>
              </div>

              {/* Street level overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A5D7F] via-transparent to-transparent" />

              {/* Search Interface Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 animate-in fade-in slide-in-from-bottom-8 duration-800" style={{ animationDelay: "4000ms" }}>
                <div className="w-full max-w-md space-y-4">
                  <div className="text-center mb-6 animate-in fade-in slide-in-from-top duration-600" style={{ animationDelay: "4200ms" }}>
                    <h4 className="text-white font-serif text-3xl font-semibold mb-2">Find Your Provider</h4>
                    <p className="text-white/70 text-sm">Locate participating ASPIRE providers near you</p>
                  </div>

                  {/* Search Bar */}
                  <div className="relative animate-in fade-in zoom-in-95 duration-600" style={{ animationDelay: "4400ms" }}>
                    <input
                      type="text"
                      placeholder="Enter address, city, or postal code..."
                      className="w-full px-6 py-4 pr-12 bg-white/95 backdrop-blur-xl rounded-2xl border-2 border-white/50 focus:border-white focus:outline-none text-[#4A5D7F] placeholder:text-gray-400 shadow-2xl transition-all duration-300 focus:scale-105"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#4A5D7F] text-white p-3 rounded-xl hover:bg-[#3A4D6F] transition-all hover:scale-110 shadow-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>

                  {/* Quick Location Buttons */}
                  <div className="flex gap-2 animate-in fade-in slide-in-from-bottom duration-500" style={{ animationDelay: "4600ms" }}>
                    {["Zürich", "Geneva", "Basel", "Bern"].map((city, i) => (
                      <button
                        key={city}
                        className="flex-1 px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-xl border border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 animate-in fade-in"
                        style={{ animationDelay: `${4700 + i * 100}ms` }}
                      >
                        {city}
                      </button>
                    ))}
                  </div>

                  {/* Info Banner */}
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 animate-in fade-in slide-in-from-bottom duration-500" style={{ animationDelay: "5100ms" }}>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">ℹ️</span>
                      </div>
                      <p className="text-white/90 text-xs leading-relaxed">
                        All treatments must be performed by a participating ASPIRE provider. Search to find certified providers in your area.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      benefits: (
        <div className="space-y-8">
          {/* Premium Hero */}
          <div className="relative bg-gradient-to-br from-[#4A5D7F] to-[#5A6D8F] text-white p-12 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-90 duration-800" style={{ animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", animationDelay: "200ms" }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-in fade-in duration-1200 slide-in-from-top-full rotate-in-45" style={{ animationDelay: "400ms" }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-400/10 rounded-full blur-3xl animate-in fade-in duration-1200 slide-in-from-bottom-full rotate-in-45" style={{ animationDelay: "600ms" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-in fade-in zoom-in-50 duration-1500" style={{ animationDelay: "800ms" }} />
            <div className="relative z-10">
              <div className="text-4xl mb-4 animate-in zoom-in-50 rotate-in-12 duration-700" style={{ animationDelay: "600ms" }}>💎</div>
              <h3 className="font-serif text-5xl font-light mb-4 tracking-tight animate-in fade-in slide-in-from-left-12 zoom-in-95 duration-700" style={{ animationDelay: "750ms", animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}>
                Member <span className="font-semibold animate-in fade-in zoom-in-50 duration-500" style={{ animationDelay: "950ms" }}>Benefits</span>
              </h3>
              <p className="text-white/70 text-base leading-relaxed max-w-2xl animate-in fade-in slide-in-from-left-8 duration-600" style={{ animationDelay: "1100ms" }}>
                Unlock exclusive rewards, track your aesthetic journey, and enjoy premium perks designed for you.
              </p>
            </div>
          </div>

          {/* Interactive Reward Tiers */}
          <div className="relative bg-gradient-to-br from-white via-[#F5F1EC] to-white p-8 rounded-3xl border-2 border-[#4A5D7F]/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-700" style={{ animationDelay: "1300ms" }}>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzRBNUQ3RiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />

            <div className="relative z-10">
              <h4 className="font-serif text-2xl font-semibold text-[#4A5D7F] mb-6 text-center animate-in fade-in duration-500" style={{ animationDelay: "1500ms" }}>Membership Tiers</h4>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { tier: "Silver", points: "0-499", icon: "🥈", color: "from-gray-400 to-gray-500", benefits: ["Basic tracking", "Points earning", "Email support"] },
                  { tier: "Gold", points: "500-999", icon: "🥇", color: "from-amber-400 to-amber-600", benefits: ["Priority booking", "Bonus points", "Exclusive events"] },
                  { tier: "Platinum", points: "1000+", icon: "💎", color: "from-purple-500 to-indigo-600", benefits: ["VIP treatment", "Double points", "Personal advisor"] }
                ].map((tier, i) => (
                  <div
                    key={tier.tier}
                    className="group relative bg-white rounded-2xl p-6 border-2 border-[#4A5D7F]/10 hover:border-[#4A5D7F]/40 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer animate-in fade-in slide-in-from-bottom-8 zoom-in-90"
                    style={{ animationDelay: `${1600 + i * 150}ms`, animationDuration: "600ms" }}
                  >
                    {/* Tier glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />

                    <div className="relative z-10 text-center">
                      <div className="text-5xl mb-3 animate-in zoom-in-50 rotate-in-12 duration-500" style={{ animationDelay: `${1700 + i * 150}ms` }}>{tier.icon}</div>
                      <h5 className="font-serif text-xl font-bold text-[#4A5D7F] mb-1">{tier.tier}</h5>
                      <p className="text-xs text-gray-500 mb-4">{tier.points} pts</p>

                      <div className="space-y-2">
                        {tier.benefits.map((benefit, j) => (
                          <div key={j} className="flex items-center gap-2 justify-center text-xs text-gray-600 animate-in fade-in duration-400" style={{ animationDelay: `${1800 + i * 150 + j * 100}ms` }}>
                            <div className="w-1 h-1 rounded-full bg-[#4A5D7F]" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hover particle effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      {[...Array(5)].map((_, j) => (
                        <div
                          key={j}
                          className="absolute w-1 h-1 bg-[#4A5D7F] rounded-full animate-ping"
                          style={{
                            top: `${20 + j * 15}%`,
                            left: `${10 + j * 20}%`,
                            animationDelay: `${j * 200}ms`,
                            animationDuration: "2s"
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Rewards Gallery */}
          <div className="space-y-4 animate-in fade-in duration-700" style={{ animationDelay: "2100ms" }}>
            <h4 className="font-serif text-2xl font-semibold text-[#4A5D7F] mb-4">Available Rewards</h4>

            <div className="grid grid-cols-2 gap-4">
              {[
                { reward: "$50 Treatment Credit", points: "500", icon: "💉", gradient: "from-blue-500/20 to-cyan-500/20" },
                { reward: "Free Product Sample", points: "250", icon: "🎁", gradient: "from-purple-500/20 to-pink-500/20" },
                { reward: "$100 Treatment Credit", points: "1000", icon: "✨", gradient: "from-amber-500/20 to-orange-500/20" },
                { reward: "VIP Consultation", points: "750", icon: "👑", gradient: "from-emerald-500/20 to-teal-500/20" }
              ].map((reward, i) => (
                <div
                  key={reward.reward}
                  className="group relative bg-white rounded-2xl p-6 border-2 border-[#4A5D7F]/10 hover:border-[#4A5D7F]/30 shadow-md hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden animate-in fade-in slide-in-from-left-6 zoom-in-95"
                  style={{ animationDelay: `${2200 + i * 150}ms`, animationDuration: "600ms" }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${reward.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative z-10 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5F1EC] to-white flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <span className="text-3xl">{reward.icon}</span>
                    </div>

                    <div className="flex-1">
                      <h5 className="font-semibold text-[#4A5D7F] mb-1">{reward.reward}</h5>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-semibold text-[#4A5D7F]">{reward.points} points</span>
                      </div>
                    </div>

                    <button className="px-4 py-2 bg-[#4A5D7F] text-white rounded-xl text-xs font-semibold hover:bg-[#3A4D6F] transition-colors group-hover:scale-110 duration-300">
                      Redeem
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Animated Stats Counter */}
          <div className="bg-gradient-to-br from-[#F5F1EC] to-white p-8 rounded-2xl border border-[#4A5D7F]/10 shadow-lg animate-in fade-in zoom-in-95" style={{ animationDelay: "2800ms", animationDuration: "600ms" }}>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6 text-center animate-in fade-in duration-400" style={{ animationDelay: "3000ms" }}>Program Success</p>
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: `${count500}K+`, label: "Active Members", icon: "👥" },
                { value: `$${count12}M+`, label: "Rewards Redeemed", icon: "💰" },
                { value: `${count98}%`, label: "Satisfaction", icon: "⭐" }
              ].map((stat, i) => (
                <div key={stat.label} className="text-center group cursor-default animate-in fade-in slide-in-from-bottom-6 zoom-in-90" style={{ animationDelay: `${3100 + i * 150}ms`, animationDuration: "600ms" }}>
                  <div className="text-3xl mb-2 animate-in zoom-in-50 duration-500" style={{ animationDelay: `${3200 + i * 150}ms` }}>{stat.icon}</div>
                  <p className="font-serif text-4xl font-light text-[#4A5D7F] mb-2 group-hover:scale-110 transition-transform duration-500">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="relative bg-gradient-to-br from-[#4A5D7F] to-[#5A6D8F] p-8 rounded-3xl overflow-hidden shadow-xl animate-in fade-in zoom-in-95" style={{ animationDelay: "3500ms", animationDuration: "700ms" }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-in fade-in duration-1000" style={{ animationDelay: "3600ms" }} />
            <div className="relative z-10 text-center text-white">
              <h4 className="font-serif text-2xl font-semibold mb-3 animate-in fade-in slide-in-from-bottom duration-400" style={{ animationDelay: "3700ms" }}>Ready to Start Earning?</h4>
              <p className="text-white/70 text-sm mb-6 max-w-md mx-auto animate-in fade-in slide-in-from-bottom duration-400" style={{ animationDelay: "3800ms" }}>
                Join ASPIRE today and unlock exclusive rewards with your first treatment
              </p>
              <button className="px-10 py-4 bg-white text-[#4A5D7F] rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-xl animate-in zoom-in duration-500" style={{ animationDelay: "3900ms" }}>
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
        <div className="fixed inset-0 z-50 flex">
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

            {/* Topic Navigation (bottom of chat) */}
            {currentPanel && (
              <div className="px-4 py-3 border-t border-[#4A5D7F]/20 bg-gradient-to-b from-[#F5F1EC]/50 to-[#F5F1EC]/80 backdrop-blur-sm">
                <div className="grid grid-cols-3 gap-2">
                  {quickActions.map((action, idx) => (
                    <button
                      key={action.id}
                      onClick={() => {
                        if (currentPanel !== action.id && !isTransitioning) {
                          setIsTransitioning(true);
                          setCurrentPanel(null);
                          setTimeout(() => {
                            setCurrentPanel(action.id);
                            setIsTransitioning(false);
                          }, 400);
                        }
                      }}
                      disabled={isTransitioning}
                      className={`group relative px-2 py-2.5 rounded-xl text-xs font-semibold transition-all duration-500 transform-gpu ${
                        currentPanel === action.id
                          ? "bg-gradient-to-br from-[#4A5D7F] to-[#5A6D8F] text-white shadow-xl scale-110 -translate-y-1"
                          : "bg-white/70 text-[#4A5D7F] hover:bg-white hover:scale-105 hover:shadow-lg hover:-translate-y-0.5"
                      } ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}
                      style={{
                        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                        transitionDelay: currentPanel === action.id ? `${idx * 50}ms` : '0ms'
                      }}
                    >
                      {/* Shimmer effect on active */}
                      {currentPanel === action.id && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-xl" style={{ backgroundSize: '200% 100%' }} />
                          <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/50 rounded-full animate-in slide-in-from-left duration-300" />
                        </>
                      )}

                      {/* Glow effect */}
                      <div className={`absolute inset-0 rounded-xl transition-opacity duration-500 ${
                        currentPanel === action.id
                          ? 'opacity-100 bg-[#4A5D7F]/20 blur-md'
                          : 'opacity-0 group-hover:opacity-50 bg-[#4A5D7F]/10 blur-sm'
                      }`} style={{ transform: 'scale(1.1)' }} />

                      <div className="relative text-center flex items-center justify-center gap-1">
                        {currentPanel === action.id && (
                          <span className="animate-pulse">✓</span>
                        )}
                        <span>{action.label}</span>
                      </div>
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

          {/* Right Panel - Dynamic Content (only shows when panel selected) */}
          <div className="flex-1 relative bg-[#F5F1EC]">
            {/* Morphing overlay during transitions */}
            {isTransitioning && (
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#F5F1EC] animate-in fade-in duration-200">
                <div className="relative">
                  {/* Spinning loader with morphing shape */}
                  <div className="w-20 h-20 relative animate-spin" style={{ animationDuration: '1.5s' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4A5D7F] to-[#5A6D8F] rounded-3xl animate-pulse" style={{ animationDuration: '1s' }} />
                    <div className="absolute inset-2 bg-[#F5F1EC] rounded-2xl" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4A5D7F]/20 to-[#5A6D8F]/20 rounded-full blur-xl animate-pulse" style={{ animationDuration: '1s' }} />
                </div>
              </div>
            )}

            {currentPanel && (
              <div
                ref={contentRef}
                className="h-full overflow-y-auto p-10 animate-in fade-in slide-in-from-right-4 zoom-in-95 duration-500"
                style={{
                  animationTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                  animationFillMode: "both"
                }}
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
