"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Sparkles, ArrowLeft } from "lucide-react";

type PanelId = "how-earn" | "eligible" | "redeem" | "benefits" | "efficacy";

function useCounter(end: number, duration: number = 1800, start: number = 0): number {
  const [count, setCount] = useState(start);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    let startTime: number | null = null;

    function animate(currentTime: number): void {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(start + (end - start) * eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    }

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [end, duration, start]);

  return count;
}

function AnimatedStat({
  value,
  suffix = "",
  prefix = "",
  label,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay?: number;
}) {
  const [started, setStarted] = useState(false);
  const count = useCounter(started ? value : 0, 2000, 0);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="text-center group">
      <p className="font-serif text-3xl font-light text-white mb-1 tracking-tight transition-transform duration-500 group-hover:scale-110">
        {prefix}{count}{suffix}
      </p>
      <p className="text-[11px] text-white/60 font-medium uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

function ProgressBar({ target, total, delay = 300 }: { target: number; total: number; delay?: number }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth((target / total) * 100);
    }, delay);
    return () => clearTimeout(timer);
  }, [target, total, delay]);

  return (
    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
      <div
        className="h-full bg-gradient-to-r from-amber-400/90 via-amber-300/80 to-amber-200/70 rounded-full transition-all duration-[1500ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

export default function ExploreRewards() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPanel, setCurrentPanel] = useState<PanelId | null>(null);
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else {
      const timer = setTimeout(() => setMounted(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const websiteContent = document.getElementById("website-content");
    if (isOpen) {
      websiteContent?.style.setProperty("filter", "blur(8px) brightness(0.6)");
      websiteContent?.style.setProperty(
        "transition",
        "filter 600ms cubic-bezier(0.4, 0, 0.2, 1)"
      );
    } else {
      websiteContent?.style.setProperty("filter", "none");
    }
  }, [isOpen]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [currentPanel]);

  const handleTopicClick = useCallback((panelId: PanelId) => {
    setCurrentPanel(panelId);
  }, []);

  const backToMenu = useCallback(() => {
    setCurrentPanel(null);
  }, []);

  const quickActions: { id: PanelId; label: string; subtitle: string }[] = [
    { id: "how-earn", label: "Earning Points", subtitle: "Treatment rewards structure" },
    { id: "eligible", label: "Eligible Treatments", subtitle: "Qualifying procedures" },
    { id: "redeem", label: "Redeem Rewards", subtitle: "Unlock your savings" },
  ];

  const categories: { id: PanelId; label: string; subtitle: string }[] = [
    { id: "benefits", label: "Member Benefits", subtitle: "Exclusive program perks" },
    { id: "efficacy", label: "Clinical Efficacy", subtitle: "Research-backed results" },
  ];

  function getPanelContent(panelId: PanelId): React.ReactElement {
    const panels: Record<PanelId, React.ReactElement> = {
      "how-earn": (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
          {/* Hero Card */}
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky-400/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-[10px] font-semibold uppercase tracking-widest mb-6 border border-white/10">
                Rewards Program
              </div>
              <h3 className="font-serif text-4xl font-light mb-4 tracking-tight">
                How to Earn Points
              </h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-lg font-light">
                Every qualifying treatment automatically earns you valuable points toward exclusive rewards and savings on future procedures.
              </p>
            </div>
          </div>

          {/* Treatment Cards */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em] px-1">
              Eligible Treatments
            </h4>

            {[
              { icon: "💉", name: "Dysport®", desc: "Injectable neurotoxin for frown lines and facial aesthetics", points: 50, unit: "per vial" },
              { icon: "💎", name: "Restylane® Family", desc: "Hyaluronic acid dermal fillers for facial volume and contouring", points: 75, unit: "per syringe" },
              { icon: "✨", name: "Sculptra® Aesthetic", desc: "Poly-L-lactic acid collagen stimulator for gradual volume restoration", points: 100, unit: "per vial" },
            ].map((treatment, i) => (
              <div
                key={treatment.name}
                className="group relative bg-slate-900/60 backdrop-blur-2xl border border-white/[0.08] hover:border-white/20 rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] cursor-default"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/0 to-amber-400/0 group-hover:from-amber-400/[0.03] group-hover:via-transparent group-hover:to-transparent rounded-2xl transition-all duration-700" />
                <div className="relative flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.06] backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/[0.08] group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                    <span className="text-2xl">{treatment.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white/90 mb-1 text-lg tracking-tight">{treatment.name}</h4>
                    <p className="text-sm text-white/40 font-light leading-relaxed">{treatment.desc}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="font-serif text-2xl font-light text-amber-300/80">{treatment.points}</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider">{treatment.unit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Auto Credit Info */}
          <div className="relative bg-slate-900/40 backdrop-blur-2xl border border-white/[0.06] p-7 rounded-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/5 rounded-full blur-3xl" />
            <div className="relative flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 flex items-center justify-center flex-shrink-0 border border-emerald-400/20">
                <span className="text-xl">🎯</span>
              </div>
              <div>
                <h4 className="font-semibold text-white/90 text-base mb-2 tracking-tight">Automatic Credit</h4>
                <p className="text-sm text-white/40 leading-relaxed font-light">
                  Points are automatically credited to your ASPIRE account within 24-48 hours after each qualifying treatment with a participating provider. No manual entry required.
                </p>
              </div>
            </div>
          </div>

          {/* Progress Example */}
          <div className="relative bg-slate-900/40 backdrop-blur-2xl border border-white/[0.06] p-7 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-white/60">Example Progress</span>
              <span className="text-xs text-white/30 font-light">250 / 500 points</span>
            </div>
            <ProgressBar target={250} total={500} delay={500} />
            <p className="text-xs text-white/30 mt-3 font-light">250 more points until your next reward tier</p>
          </div>
        </div>
      ),

      "eligible": (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-56 h-56 bg-violet-400/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-[10px] font-semibold uppercase tracking-widest mb-6 border border-white/10">
                Treatment Portfolio
              </div>
              <h3 className="font-serif text-4xl font-light mb-4 tracking-tight">Eligible Treatments</h3>
              <p className="text-white/60 text-sm font-light max-w-lg">
                Premium aesthetic treatments that qualify for ASPIRE Rewards
              </p>
            </div>
          </div>

          {/* Dysport */}
          <div className="group relative bg-slate-900/60 backdrop-blur-2xl border border-white/[0.08] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.01]">
            <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 p-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/[0.06] backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/[0.08] group-hover:rotate-6 transition-transform duration-500">
                  <span className="text-2xl">💉</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white/90 text-xl tracking-tight">Dysport®</h4>
                  <p className="text-white/40 text-xs font-light uppercase tracking-wider">Injectable Neurotoxin</p>
                </div>
              </div>
            </div>
            <div className="p-7 space-y-5">
              <p className="text-sm text-white/50 leading-relaxed font-light">
                FDA-approved injectable for temporary improvement in the appearance of moderate to severe frown lines between the eyebrows.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/[0.04] backdrop-blur-sm p-4 rounded-xl border border-white/[0.06]">
                  <p className="text-[10px] font-medium text-white/30 uppercase tracking-wider mb-1">Duration</p>
                  <p className="text-base font-semibold text-white/80">3-4 months</p>
                </div>
                <div className="bg-white/[0.04] backdrop-blur-sm p-4 rounded-xl border border-white/[0.06]">
                  <p className="text-[10px] font-medium text-white/30 uppercase tracking-wider mb-1">Onset</p>
                  <p className="text-base font-semibold text-white/80">2-3 days</p>
                </div>
              </div>
              <div className="inline-block px-4 py-1.5 bg-amber-400/10 border border-amber-400/20 rounded-full text-xs font-medium text-amber-300/80">
                50 pts / vial
              </div>
            </div>
          </div>

          {/* Restylane */}
          <div className="group relative bg-slate-900/60 backdrop-blur-2xl border border-white/[0.08] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.01]">
            <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 p-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/[0.06] backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/[0.08] group-hover:rotate-6 transition-transform duration-500">
                  <span className="text-2xl">💎</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white/90 text-xl tracking-tight">Restylane® Family</h4>
                  <p className="text-white/40 text-xs font-light uppercase tracking-wider">Hyaluronic Acid Fillers</p>
                </div>
              </div>
            </div>
            <div className="p-7 space-y-5">
              <p className="text-sm text-white/50 leading-relaxed font-light">
                Complete portfolio of dermal fillers for facial volume, contouring, and wrinkle correction.
              </p>
              <div className="bg-white/[0.03] backdrop-blur-sm p-5 rounded-xl border border-white/[0.06] space-y-3">
                {["Restylane® / Restylane-L®", "Restylane® Lyft with Lidocaine", "Restylane® Refyne / Defyne", "Restylane® Kysse / Silk"].map((product) => (
                  <div key={product} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
                    <p className="text-xs text-white/50 font-light">{product}</p>
                  </div>
                ))}
              </div>
              <div className="inline-block px-4 py-1.5 bg-amber-400/10 border border-amber-400/20 rounded-full text-xs font-medium text-amber-300/80">
                75 pts / syringe
              </div>
            </div>
          </div>

          {/* Sculptra */}
          <div className="group relative bg-slate-900/60 backdrop-blur-2xl border border-white/[0.08] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.01]">
            <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 p-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/[0.06] backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/[0.08] group-hover:rotate-6 transition-transform duration-500">
                  <span className="text-2xl">{"✨"}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white/90 text-xl tracking-tight">Sculptra® Aesthetic</h4>
                  <p className="text-white/40 text-xs font-light uppercase tracking-wider">Collagen Stimulator</p>
                </div>
              </div>
            </div>
            <div className="p-7 space-y-5">
              <p className="text-sm text-white/50 leading-relaxed font-light">
                Poly-L-lactic acid injectable that stimulates natural collagen production for gradual, long-lasting results.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/[0.04] backdrop-blur-sm p-4 rounded-xl border border-white/[0.06]">
                  <p className="text-[10px] font-medium text-white/30 uppercase tracking-wider mb-1">Duration</p>
                  <p className="text-base font-semibold text-white/80">2+ years</p>
                </div>
                <div className="bg-white/[0.04] backdrop-blur-sm p-4 rounded-xl border border-white/[0.06]">
                  <p className="text-[10px] font-medium text-white/30 uppercase tracking-wider mb-1">Sessions</p>
                  <p className="text-base font-semibold text-white/80">3-4 typical</p>
                </div>
              </div>
              <div className="inline-block px-4 py-1.5 bg-amber-400/10 border border-amber-400/20 rounded-full text-xs font-medium text-amber-300/80">
                100 pts / vial
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="relative bg-slate-900/40 backdrop-blur-2xl border border-white/[0.06] p-7 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-400/10 flex items-center justify-center flex-shrink-0 border border-sky-400/20 mt-0.5">
                <span className="text-sm">ℹ️</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white/70 mb-1">Important Note</p>
                <p className="text-sm text-white/40 leading-relaxed font-light">
                  All treatments must be performed by a participating ASPIRE provider to qualify for rewards. Ask your provider if they participate in the ASPIRE program.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),

      "redeem": (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-40 h-40 bg-emerald-400/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-amber-400/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-[10px] font-semibold uppercase tracking-widest mb-6 border border-white/10">
                Redemption Process
              </div>
              <h3 className="font-serif text-4xl font-light mb-4 tracking-tight">How to Redeem</h3>
              <p className="text-white/60 text-sm font-light max-w-lg">
                Simple 4-step process to unlock your earned rewards
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="relative space-y-5">
            <div className="absolute left-7 top-14 bottom-14 w-px bg-gradient-to-b from-amber-400/30 via-amber-400/10 to-transparent" />

            {[
              {
                num: 1,
                title: "Log Into Your Account",
                desc: "Access your personalized ASPIRE dashboard online or via mobile app",
                detail: "aspirerewards.com/login",
              },
              {
                num: 2,
                title: "Browse Rewards Catalog",
                desc: "Explore hundreds of exclusive rewards, discounts, and member-only offers",
                tags: ["Savings", "Products", "Experiences"],
              },
              {
                num: 3,
                title: "Select Your Reward",
                desc: "Choose the reward that fits your points balance and preferences",
                rewards: "$25 off (250 pts) • $50 off (500 pts) • Free consultation (150 pts)",
              },
              {
                num: 4,
                title: "Redeem at Checkout",
                desc: "Apply your points instantly at your provider’s office or online",
                cta: "Instant Savings Applied",
              },
            ].map((step, i) => (
              <div
                key={step.num}
                className="group relative bg-slate-900/60 backdrop-blur-2xl border border-white/[0.08] hover:border-white/20 rounded-2xl p-6 transition-all duration-500 hover:shadow-xl hover:scale-[1.01]"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="flex items-start gap-5">
                  <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/30 text-amber-300/90 flex items-center justify-center flex-shrink-0 font-serif text-xl font-light">
                    {step.num}
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="font-semibold text-white/90 mb-2 text-lg tracking-tight">{step.title}</h4>
                    <p className="text-sm text-white/40 mb-3 leading-relaxed font-light">{step.desc}</p>
                    {step.detail && (
                      <div className="inline-block px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-xs text-white/40 font-light">
                        {step.detail}
                      </div>
                    )}
                    {step.tags && (
                      <div className="flex gap-2">
                        {step.tags.map((tag) => (
                          <div key={tag} className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-xs text-white/50 font-light">
                            {tag}
                          </div>
                        ))}
                      </div>
                    )}
                    {step.rewards && (
                      <div className="bg-white/[0.03] border border-white/[0.06] p-4 rounded-xl mt-1">
                        <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Popular Rewards</p>
                        <p className="text-xs text-white/50 font-light">{step.rewards}</p>
                      </div>
                    )}
                    {step.cta && (
                      <div className="inline-block px-5 py-2.5 bg-gradient-to-r from-emerald-400/20 to-emerald-600/10 border border-emerald-400/30 text-emerald-300/80 rounded-xl text-xs font-medium mt-1">
                        {step.cta} ✓
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/[0.06] p-6 rounded-2xl text-center group hover:border-white/15 transition-all duration-500">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-500">{"♾️"}</div>
              <p className="text-xs font-medium text-white/70 mb-1">Points Never Expire</p>
              <p className="text-[10px] text-white/30 font-light">Save and redeem anytime</p>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/[0.06] p-6 rounded-2xl text-center group hover:border-white/15 transition-all duration-500">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-500">{"⚡"}</div>
              <p className="text-xs font-medium text-white/70 mb-1">Instant Redemption</p>
              <p className="text-[10px] text-white/30 font-light">No waiting periods</p>
            </div>
          </div>
        </div>
      ),

      "benefits": (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-56 h-56 bg-amber-400/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-violet-400/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="font-serif text-5xl font-light mb-4 opacity-80">💎</div>
              <h3 className="font-serif text-4xl font-light mb-4 tracking-tight">Member Benefits</h3>
              <p className="text-white/60 text-sm font-light max-w-lg">
                Exclusive perks designed to reward your aesthetic journey
              </p>
            </div>
          </div>

          {/* Benefits List */}
          <div className="space-y-3">
            {[
              { icon: "⭐", title: "Earn Points Automatically", desc: "Every qualifying treatment adds points to your account" },
              { icon: "🎁", title: "Exclusive Rewards & Savings", desc: "Redeem points for treatments, products, and experiences" },
              { icon: "🔔", title: "Member-Only Offers", desc: "First access to promotions and special pricing" },
              { icon: "📊", title: "Track Your Journey", desc: "Monitor points, rewards history, and treatment progress" },
              { icon: "💝", title: "Free to Join", desc: "No enrollment fees, membership costs, or hidden charges" },
              { icon: "♾️", title: "Points Never Expire", desc: "Save and accumulate points at your own pace" },
            ].map((benefit, i) => (
              <div
                key={benefit.title}
                className="group relative bg-slate-900/60 backdrop-blur-2xl border border-white/[0.08] hover:border-white/20 rounded-2xl p-5 transition-all duration-500 hover:shadow-xl hover:scale-[1.01]"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 to-amber-400/0 group-hover:from-amber-400/[0.02] group-hover:to-transparent rounded-2xl transition-all duration-700" />
                <div className="relative flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.06] flex items-center justify-center border border-white/[0.08] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <span className="text-lg">{benefit.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white/80 mb-0.5">{benefit.title}</p>
                    <p className="text-xs text-white/35 font-light">{benefit.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="relative bg-slate-900/60 backdrop-blur-2xl border border-white/[0.08] p-8 rounded-3xl overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-400/5 rounded-full blur-3xl" />
            <p className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.2em] mb-6 text-center relative z-10">
              Member Success
            </p>
            <div className="grid grid-cols-3 gap-4 relative z-10">
              <AnimatedStat value={500} suffix="K+" label="Active Members" delay={200} />
              <AnimatedStat value={12} prefix="$" suffix="M+" label="Rewards Redeemed" delay={400} />
              <AnimatedStat value={98} suffix="%" label="Satisfaction" delay={600} />
            </div>
          </div>

          {/* CTA */}
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl overflow-hidden shadow-2xl border border-white/[0.06]">
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/5 rounded-full blur-3xl" />
            <div className="relative z-10 text-center">
              <h4 className="font-serif text-2xl font-light text-white/90 mb-3 tracking-tight">Ready to Start Earning?</h4>
              <p className="text-sm text-white/40 mb-6 font-light">Join ASPIRE today and unlock exclusive rewards with your first treatment</p>
              <button className="px-10 py-4 bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 hover:border-white/40 text-white/90 rounded-2xl text-sm font-medium tracking-wide transition-all duration-500 hover:scale-105 hover:shadow-xl backdrop-blur-sm">
                JOIN NOW
              </button>
            </div>
          </div>
        </div>
      ),

      "efficacy": (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-56 h-56 bg-sky-400/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="font-serif text-5xl font-light mb-4 opacity-80">📊</div>
              <h3 className="font-serif text-4xl font-light mb-4 tracking-tight">Clinical Efficacy</h3>
              <p className="text-white/60 text-sm font-light max-w-lg">
                Research-backed results from peer-reviewed clinical studies
              </p>
            </div>
          </div>

          {/* Dysport Clinical */}
          <div className="group relative bg-slate-900/60 backdrop-blur-2xl border border-white/[0.08] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
            <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 p-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/[0.06] backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/[0.08] group-hover:rotate-6 transition-transform duration-500">
                  <span className="text-xl">💉</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white/90 text-xl tracking-tight">Dysport® Clinical Data</h4>
                  <p className="text-white/40 text-xs font-light uppercase tracking-wider">Injectable Neurotoxin</p>
                </div>
              </div>
            </div>
            <div className="p-7 space-y-5">
              <p className="text-sm text-white/50 leading-relaxed font-light">
                FDA-approved for moderate to severe glabellar lines. Clinical trials demonstrate significant efficacy and safety profile.
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/[0.04] backdrop-blur-sm p-4 rounded-xl border border-white/[0.06] text-center">
                  <p className="font-serif text-xl font-light text-amber-300/80 mb-1">3-4</p>
                  <p className="text-[9px] text-white/30 uppercase tracking-wider">Months Duration</p>
                </div>
                <div className="bg-white/[0.04] backdrop-blur-sm p-4 rounded-xl border border-white/[0.06] text-center">
                  <p className="font-serif text-xl font-light text-amber-300/80 mb-1">2-3</p>
                  <p className="text-[9px] text-white/30 uppercase tracking-wider">Days Onset</p>
                </div>
                <div className="bg-white/[0.04] backdrop-blur-sm p-4 rounded-xl border border-white/[0.06] text-center">
                  <p className="font-serif text-xl font-light text-amber-300/80 mb-1">94%</p>
                  <p className="text-[9px] text-white/30 uppercase tracking-wider">Satisfaction</p>
                </div>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] p-5 rounded-xl">
                <p className="text-xs text-white/40 italic font-light leading-relaxed">
                  &ldquo;In pivotal clinical trials, Dysport® demonstrated statistically significant improvement in glabellar line severity at day 30 post-injection.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Restylane Clinical */}
          <div className="group relative bg-slate-900/60 backdrop-blur-2xl border border-white/[0.08] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
            <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 p-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/[0.06] backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/[0.08] group-hover:rotate-6 transition-transform duration-500">
                  <span className="text-xl">💎</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white/90 text-xl tracking-tight">Restylane® Clinical Data</h4>
                  <p className="text-white/40 text-xs font-light uppercase tracking-wider">Hyaluronic Acid Filler</p>
                </div>
              </div>
            </div>
            <div className="p-7 space-y-5">
              <p className="text-sm text-white/50 leading-relaxed font-light">
                Extensive clinical research demonstrates efficacy for facial volume enhancement and wrinkle correction across multiple anatomical areas.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/[0.04] backdrop-blur-sm p-4 rounded-xl border border-white/[0.06] text-center">
                  <p className="font-serif text-xl font-light text-amber-300/80 mb-1">6-18</p>
                  <p className="text-[9px] text-white/30 uppercase tracking-wider">Months Duration</p>
                </div>
                <div className="bg-white/[0.04] backdrop-blur-sm p-4 rounded-xl border border-white/[0.06] text-center">
                  <p className="font-serif text-xl font-light text-amber-300/80 mb-1">97%</p>
                  <p className="text-[9px] text-white/30 uppercase tracking-wider">Recommend Rate</p>
                </div>
              </div>
              <div className="space-y-2.5">
                {[
                  "FDA-approved for mid-to-deep facial wrinkles and folds",
                  "Hyaluronic acid-based for natural-looking results",
                  "Immediate visible improvement post-treatment",
                ].map((bullet) => (
                  <div key={bullet} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400/50" />
                    <p className="text-xs text-white/45 font-light">{bullet}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sculptra Clinical */}
          <div className="group relative bg-slate-900/60 backdrop-blur-2xl border border-white/[0.08] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
            <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 p-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/[0.06] backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/[0.08] group-hover:rotate-6 transition-transform duration-500">
                  <span className="text-xl">{"✨"}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white/90 text-xl tracking-tight">Sculptra® Clinical Data</h4>
                  <p className="text-white/40 text-xs font-light uppercase tracking-wider">Collagen Stimulator</p>
                </div>
              </div>
            </div>
            <div className="p-7 space-y-5">
              <p className="text-sm text-white/50 leading-relaxed font-light">
                Unique poly-L-lactic acid mechanism stimulates collagen production for gradual, long-lasting facial volume restoration.
              </p>
              <div className="bg-white/[0.03] border border-white/[0.06] p-5 rounded-xl">
                <p className="text-[10px] font-medium text-white/30 uppercase tracking-wider mb-4">Treatment Timeline</p>
                <div className="space-y-3">
                  {[
                    { step: 1, text: "Initial treatment series (3-4 sessions)" },
                    { step: 2, text: "Gradual improvement over 3-6 months" },
                    { step: 3, text: "Results last 2+ years" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-300/80 flex items-center justify-center text-xs font-medium">
                        {item.step}
                      </div>
                      <p className="text-xs text-white/45 font-light">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/[0.04] backdrop-blur-sm p-4 rounded-xl border border-white/[0.06] text-center">
                  <p className="font-serif text-xl font-light text-amber-300/80 mb-1">25+</p>
                  <p className="text-[9px] text-white/30 uppercase tracking-wider">Years on Market</p>
                </div>
                <div className="bg-white/[0.04] backdrop-blur-sm p-4 rounded-xl border border-white/[0.06] text-center">
                  <p className="font-serif text-xl font-light text-amber-300/80 mb-1">90%</p>
                  <p className="text-[9px] text-white/30 uppercase tracking-wider">Satisfaction</p>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="relative bg-slate-900/40 backdrop-blur-2xl border border-white/[0.06] p-7 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-400/10 flex items-center justify-center flex-shrink-0 border border-sky-400/20">
                <span className="text-xs">📋</span>
              </div>
              <div>
                <p className="text-xs font-medium text-white/60 mb-2">Important Information</p>
                <p className="text-xs text-white/35 leading-relaxed font-light">
                  For complete clinical study data, safety information, and detailed efficacy profiles, please consult with your healthcare provider or visit the official product websites.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    };

    return panels[panelId];
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group fixed bottom-6 left-6 z-50 bg-gradient-to-r from-slate-900 to-slate-800 text-white px-7 py-4 rounded-2xl shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 hover:scale-105 flex items-center gap-3 border border-white/10 hover:border-white/20 backdrop-blur-xl"
        >
          <Sparkles className="w-5 h-5 text-amber-300/80 group-hover:rotate-12 transition-transform duration-500" />
          <span className="text-sm font-medium tracking-wide">Explore Rewards</span>
        </button>
      )}

      {/* Premium Overlay */}
      {mounted && (
        <div
          className={`fixed inset-0 z-50 flex transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          {/* Left Panel - Navigation */}
          <div className="w-80 flex-shrink-0 bg-slate-900/95 backdrop-blur-2xl border-r border-white/[0.06] flex flex-col shadow-2xl animate-in slide-in-from-left-4 duration-500">
            {/* Header */}
            <div className="relative p-6 border-b border-white/[0.06]">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {currentPanel && (
                    <button
                      onClick={backToMenu}
                      className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300"
                      aria-label="Back to menu"
                    >
                      <ArrowLeft className="w-4 h-4 text-white/70" />
                    </button>
                  )}
                  <div>
                    <h3 className="font-serif text-lg font-light text-white/90 tracking-tight">ASPIRE</h3>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Rewards Program</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-white/50" />
                </button>
              </div>
            </div>

            {/* Menu Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-8">
                {/* Welcome */}
                <div className="text-center py-6">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-amber-400/10 to-amber-600/5 border border-amber-400/20 flex items-center justify-center">
                    <span className="text-2xl">{"✨"}</span>
                  </div>
                  <h3 className="font-serif text-xl font-light text-white/90 mb-2 tracking-tight">Explore ASPIRE</h3>
                  <p className="text-xs text-white/35 font-light leading-relaxed">
                    Discover program benefits and maximize your rewards
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2.5">
                  <p className="text-[10px] font-medium text-white/25 uppercase tracking-[0.2em] px-1 mb-3">
                    Quick Topics
                  </p>

                  {quickActions.map((action, i) => (
                    <button
                      key={action.id}
                      onClick={() => handleTopicClick(action.id)}
                      className="group w-full text-left bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/20 rounded-xl p-4 transition-all duration-500 hover:scale-[1.02]"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium text-white/70 group-hover:text-white/90 transition-colors duration-300 block">
                            {action.label}
                          </span>
                          <span className="text-[10px] text-white/25 font-light">
                            {action.subtitle}
                          </span>
                        </div>
                        <div className="w-7 h-7 rounded-lg bg-white/[0.04] group-hover:bg-white/[0.1] flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5">
                          <span className="text-white/30 group-hover:text-white/70 text-xs transition-colors duration-300">{"→"}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Categories */}
                <div className="space-y-2.5">
                  <p className="text-[10px] font-medium text-white/25 uppercase tracking-[0.2em] px-1 mb-3">
                    Deep Dive
                  </p>

                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleTopicClick(category.id)}
                      className="group w-full text-left bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] hover:border-amber-400/30 rounded-xl p-4 transition-all duration-500 hover:scale-[1.02]"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium text-white/70 group-hover:text-white/90 transition-colors duration-300 block">
                            {category.label}
                          </span>
                          <span className="text-[10px] text-white/25 font-light">
                            {category.subtitle}
                          </span>
                        </div>
                        <div className="w-7 h-7 rounded-lg bg-amber-400/[0.06] group-hover:bg-amber-400/[0.15] flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5">
                          <span className="text-amber-300/40 group-hover:text-amber-300/80 text-xs transition-colors duration-300">{"→"}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Content */}
          <div
            ref={contentRef}
            className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-10 transition-all duration-500"
          >
            {/* Ambient Background Glows */}
            <div className="fixed top-20 right-20 w-96 h-96 bg-amber-400/[0.02] rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: "8s" }} />
            <div className="fixed bottom-20 left-1/2 w-80 h-80 bg-sky-400/[0.02] rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: "12s" }} />

            {currentPanel ? (
              getPanelContent(currentPanel)
            ) : (
              <div className="flex items-center justify-center h-full animate-in fade-in zoom-in-95 duration-700">
                <div className="text-center max-w-md">
                  <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-amber-400/10 to-amber-600/5 border border-amber-400/20 flex items-center justify-center shadow-2xl">
                    <span className="text-4xl">💎</span>
                  </div>
                  <h2 className="font-serif text-4xl font-light text-white/90 mb-4 tracking-tight">
                    Welcome to ASPIRE
                  </h2>
                  <p className="text-white/35 leading-relaxed font-light text-sm">
                    Select a topic from the menu to explore program details, benefits, and clinical information.
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
