"use client";

import { useState, useRef, useEffect } from "react";
import { X, Sparkles, ArrowLeft } from "lucide-react";

type PanelId = "how-earn" | "eligible" | "redeem" | "benefits" | "efficacy";

export default function ExploreRewards() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPanel, setCurrentPanel] = useState<PanelId | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const websiteContent = document.getElementById("website-content");
    if (isOpen) {
      websiteContent?.classList.add("blur-sm", "brightness-75");
      websiteContent?.classList.add("transition-all", "duration-500");
    } else {
      websiteContent?.classList.remove("blur-sm", "brightness-75");
    }
  }, [isOpen]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [currentPanel]);

  const quickActions = [
    { id: "how-earn" as PanelId, label: "How do I earn points?" },
    { id: "eligible" as PanelId, label: "Which treatments are eligible?" },
    { id: "redeem" as PanelId, label: "How do I redeem rewards?" },
  ];

  const categories = [
    { id: "benefits" as PanelId, label: "💰 Member Benefits" },
    { id: "efficacy" as PanelId, label: "📊 Efficacy Data" },
  ];

  const handleTopicClick = (panelId: PanelId) => {
    setCurrentPanel(panelId);
  };

  const backToMenu = () => {
    setCurrentPanel(null);
  };

  const getPanelContent = (panelId: PanelId) => {
    const panels: Record<PanelId, React.ReactElement> = {
      "how-earn": (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="relative bg-gradient-to-br from-[#4A5D7F] via-[#5B6D8F] to-[#6A7D9F] text-white p-8 rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
            <div className="relative z-10">
              <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-4">
                REWARDS PROGRAM
              </div>
              <h3 className="text-3xl font-bold mb-3">How to Earn Points</h3>
              <p className="text-white/90 text-sm leading-relaxed max-w-2xl">
                Every qualifying treatment automatically earns you valuable points toward exclusive rewards and savings
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2">Eligible Treatments</h4>

            <div className="group bg-gradient-to-r from-white to-[#F5F1EC] border-2 border-[#4A5D7F]/20 hover:border-[#4A5D7F] rounded-xl p-6 transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4A5D7F] to-[#5B6D8F] flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">💉</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#4A5D7F] mb-2 text-xl">Dysport®</h4>
                  <p className="text-sm text-gray-700 mb-3">Injectable neurotoxin for frown lines and facial aesthetics</p>
                  <div className="px-3 py-1 bg-[#4A5D7F]/10 rounded-full text-xs font-semibold text-[#4A5D7F] inline-block">
                    ⭐ 50 points per vial
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-r from-white to-[#F5F1EC] border-2 border-[#4A5D7F]/20 hover:border-[#4A5D7F] rounded-xl p-6 transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4A5D7F] to-[#5B6D8F] flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">💎</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#4A5D7F] mb-2 text-xl">Restylane® Family</h4>
                  <p className="text-sm text-gray-700 mb-3">Hyaluronic acid dermal fillers for facial volume and contouring</p>
                  <div className="px-3 py-1 bg-[#4A5D7F]/10 rounded-full text-xs font-semibold text-[#4A5D7F] inline-block">
                    ⭐ 75 points per syringe
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-r from-white to-[#F5F1EC] border-2 border-[#4A5D7F]/20 hover:border-[#4A5D7F] rounded-xl p-6 transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4A5D7F] to-[#5B6D8F] flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">✨</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#4A5D7F] mb-2 text-xl">Sculptra® Aesthetic</h4>
                  <p className="text-sm text-gray-700 mb-3">Poly-L-lactic acid collagen stimulator for gradual volume restoration</p>
                  <div className="px-3 py-1 bg-[#4A5D7F]/10 rounded-full text-xs font-semibold text-[#4A5D7F] inline-block">
                    ⭐ 100 points per vial
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#F5F1EC] to-white p-6 rounded-xl border-2 border-[#4A5D7F]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-[#4A5D7F] flex items-center justify-center">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h4 className="font-bold text-[#2C2C2C] text-lg">Automatic Credit</h4>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              Points are automatically credited to your ASPIRE account within 24-48 hours after each qualifying treatment with a participating provider. No manual entry required!
            </p>
          </div>

          <div className="bg-white border-2 border-[#4A5D7F]/20 p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">Example Progress</span>
              <span className="text-xs text-gray-500">250 / 500 points</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-gradient-to-r from-[#4A5D7F] to-[#6A7D9F] rounded-full animate-pulse"></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">250 more points until your next reward tier!</p>
          </div>
        </div>
      ),
      "eligible": (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="relative bg-gradient-to-br from-[#4A5D7F] via-[#5B6D8F] to-[#6A7D9F] text-white p-8 rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-4">
                TREATMENT PORTFOLIO
              </div>
              <h3 className="text-3xl font-bold mb-3">Eligible Treatments</h3>
              <p className="text-white/90 text-sm max-w-2xl">
                Premium aesthetic treatments that qualify for ASPIRE Rewards
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white border-2 border-[#4A5D7F]/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-gradient-to-r from-[#4A5D7F] to-[#5B6D8F] p-5">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-2xl">💉</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xl">Dysport®</h4>
                    <p className="text-white/80 text-xs">Injectable Neurotoxin</p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <p className="text-sm text-gray-700 leading-relaxed">
                  FDA-approved injectable for temporary improvement in the appearance of moderate to severe frown lines between the eyebrows.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#F5F1EC] p-3 rounded-lg">
                    <p className="text-xs font-semibold text-gray-500 mb-1">Duration</p>
                    <p className="text-sm font-bold text-[#4A5D7F]">3-4 months</p>
                  </div>
                  <div className="bg-[#F5F1EC] p-3 rounded-lg">
                    <p className="text-xs font-semibold text-gray-500 mb-1">Onset</p>
                    <p className="text-sm font-bold text-[#4A5D7F]">2-3 days</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-[#4A5D7F]/10 rounded-full text-xs font-semibold text-[#4A5D7F] inline-block">
                  ⭐ 50 pts/vial
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-[#4A5D7F]/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-gradient-to-r from-[#4A5D7F] to-[#5B6D8F] p-5">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-2xl">💎</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xl">Restylane® Family</h4>
                    <p className="text-white/80 text-xs">Hyaluronic Acid Fillers</p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Complete portfolio of dermal fillers for facial volume, contouring, and wrinkle correction.
                </p>
                <div className="bg-[#F5F1EC] p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4A5D7F]"></div>
                    <p className="text-xs text-gray-700 font-medium">Restylane® / Restylane-L®</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4A5D7F]"></div>
                    <p className="text-xs text-gray-700 font-medium">Restylane® Lyft with Lidocaine</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4A5D7F]"></div>
                    <p className="text-xs text-gray-700 font-medium">Restylane® Refyne / Defyne</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4A5D7F]"></div>
                    <p className="text-xs text-gray-700 font-medium">Restylane® Kysse / Silk</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-[#4A5D7F]/10 rounded-full text-xs font-semibold text-[#4A5D7F] inline-block">
                  ⭐ 75 pts/syringe
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-[#4A5D7F]/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-gradient-to-r from-[#4A5D7F] to-[#5B6D8F] p-5">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xl">Sculptra® Aesthetic</h4>
                    <p className="text-white/80 text-xs">Collagen Stimulator</p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Poly-L-lactic acid injectable that stimulates natural collagen production for gradual, long-lasting results.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#F5F1EC] p-3 rounded-lg">
                    <p className="text-xs font-semibold text-gray-500 mb-1">Duration</p>
                    <p className="text-sm font-bold text-[#4A5D7F]">2+ years</p>
                  </div>
                  <div className="bg-[#F5F1EC] p-3 rounded-lg">
                    <p className="text-xs font-semibold text-gray-500 mb-1">Sessions</p>
                    <p className="text-sm font-bold text-[#4A5D7F]">3-4 typical</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-[#4A5D7F]/10 rounded-full text-xs font-semibold text-[#4A5D7F] inline-block">
                  ⭐ 100 pts/vial
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#F5F1EC] to-white p-6 rounded-xl border-2 border-[#4A5D7F]/10">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#4A5D7F] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">ℹ️</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#2C2C2C] mb-1">Important Note</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  All treatments must be performed by a participating ASPIRE provider to qualify for rewards. Ask your provider if they participate in the ASPIRE program.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      "redeem": (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="relative bg-gradient-to-br from-[#4A5D7F] via-[#5B6D8F] to-[#6A7D9F] text-white p-8 rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-x-8 -translate-y-8"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl translate-x-12 translate-y-12"></div>
            <div className="relative z-10">
              <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-4">
                REDEMPTION PROCESS
              </div>
              <h3 className="text-3xl font-bold mb-3">How to Redeem Rewards</h3>
              <p className="text-white/90 text-sm max-w-2xl">
                Simple 4-step process to unlock your earned rewards
              </p>
            </div>
          </div>

          <div className="relative space-y-4">
            <div className="absolute left-6 top-12 bottom-12 w-0.5 bg-gradient-to-b from-[#4A5D7F] to-[#6A7D9F]"></div>

            {[
              {
                num: 1,
                title: "Log Into Your Account",
                desc: "Access your personalized ASPIRE dashboard online or via mobile app",
                tag: "aspirerewards.com/login"
              },
              {
                num: 2,
                title: "Browse Rewards Catalog",
                desc: "Explore hundreds of exclusive rewards, discounts, and member-only offers",
                tags: ["💰 Savings", "🎁 Products", "✨ Experiences"]
              },
              {
                num: 3,
                title: "Select Your Reward",
                desc: "Choose the reward that fits your points balance and preferences",
                extra: "$25 off next treatment (250 pts) • $50 off (500 pts) • Free consultation (150 pts)"
              },
              {
                num: 4,
                title: "Redeem at Checkout",
                desc: "Apply your points instantly at your provider's office or online",
                cta: "Instant Savings Applied ✓"
              }
            ].map((step) => (
              <div key={step.num} className="relative bg-white border-2 border-[#4A5D7F]/20 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-start gap-4">
                  <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-[#4A5D7F] to-[#5B6D8F] text-white flex items-center justify-center flex-shrink-0 font-bold text-xl shadow-lg">
                    {step.num}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#4A5D7F] mb-2 text-lg">{step.title}</h4>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">{step.desc}</p>
                    {step.tag && (
                      <div className="inline-block px-3 py-1 bg-[#F5F1EC] rounded-full text-xs font-semibold text-gray-600">
                        {step.tag}
                      </div>
                    )}
                    {step.tags && (
                      <div className="flex gap-2">
                        {step.tags.map((tag) => (
                          <div key={tag} className="px-3 py-1 bg-[#4A5D7F]/10 rounded-full text-xs font-semibold text-[#4A5D7F]">
                            {tag}
                          </div>
                        ))}
                      </div>
                    )}
                    {step.extra && (
                      <div className="bg-gradient-to-r from-[#F5F1EC] to-white p-3 rounded-lg border border-[#4A5D7F]/20 mt-3">
                        <p className="text-xs text-gray-600 mb-1">Popular Rewards:</p>
                        <p className="text-xs font-semibold text-[#4A5D7F]">{step.extra}</p>
                      </div>
                    )}
                    {step.cta && (
                      <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#4A5D7F] to-[#5B6D8F] text-white rounded-lg text-xs font-bold shadow-md mt-3">
                        {step.cta}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-[#F5F1EC] to-white p-5 rounded-xl border-2 border-[#4A5D7F]/10 text-center">
              <div className="text-3xl mb-2">♾️</div>
              <p className="text-xs font-bold text-[#2C2C2C] mb-1">Points Never Expire</p>
              <p className="text-[10px] text-gray-600">Save and redeem anytime</p>
            </div>
            <div className="bg-gradient-to-br from-[#F5F1EC] to-white p-5 rounded-xl border-2 border-[#4A5D7F]/10 text-center">
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-xs font-bold text-[#2C2C2C] mb-1">Instant Redemption</p>
              <p className="text-[10px] text-gray-600">No waiting periods</p>
            </div>
          </div>
        </div>
      ),
      "benefits": (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="relative bg-gradient-to-br from-[#4A5D7F] via-[#5B6D8F] to-[#6A7D9F] text-white p-8 rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl translate-x-12 -translate-y-12"></div>
            <div className="relative z-10">
              <div className="text-4xl mb-3">💎</div>
              <h3 className="text-3xl font-bold mb-3">Member Benefits</h3>
              <p className="text-white/90 text-sm max-w-2xl">
                Exclusive perks designed to reward your aesthetic journey
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { icon: "⭐", title: "Earn Points Automatically", desc: "Every qualifying treatment adds points to your account" },
              { icon: "🎁", title: "Exclusive Rewards & Savings", desc: "Redeem points for treatments, products, and experiences" },
              { icon: "🔔", title: "Member-Only Offers", desc: "First access to promotions and special pricing" },
              { icon: "📊", title: "Track Your Journey", desc: "Monitor points, rewards history, and treatment progress" },
              { icon: "💝", title: "Free to Join", desc: "No enrollment fees, membership costs, or hidden charges" },
              { icon: "♾️", title: "Points Never Expire", desc: "Save and accumulate points at your own pace" }
            ].map((benefit) => (
              <div key={benefit.title} className="group bg-gradient-to-r from-white to-[#F5F1EC] border-l-4 border-[#4A5D7F] p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-x-1">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#4A5D7F]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl">{benefit.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#2C2C2C] mb-0.5">{benefit.title}</p>
                    <p className="text-xs text-gray-600">{benefit.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-[#F5F1EC] to-white p-6 rounded-xl border-2 border-[#4A5D7F]/20">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 text-center">Member Success Stories</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#4A5D7F] mb-1">500K+</p>
                <p className="text-[10px] text-gray-600 font-medium">Active Members</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#4A5D7F] mb-1">$12M+</p>
                <p className="text-[10px] text-gray-600 font-medium">Rewards Redeemed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#4A5D7F] mb-1">98%</p>
                <p className="text-[10px] text-gray-600 font-medium">Satisfaction Rate</p>
              </div>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-[#4A5D7F] to-[#5B6D8F] p-6 rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="relative z-10 text-center text-white">
              <h4 className="font-bold mb-2 text-xl">Ready to Start Earning?</h4>
              <p className="text-sm text-white/90 mb-4">Join ASPIRE today and unlock exclusive rewards with your first treatment</p>
              <button className="px-8 py-3 bg-white text-[#4A5D7F] rounded-full text-sm font-bold hover:bg-white/90 transition-colors shadow-lg hover:scale-105 transform duration-200">
                JOIN NOW →
              </button>
            </div>
          </div>
        </div>
      ),
      "efficacy": (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="relative bg-gradient-to-br from-[#4A5D7F] via-[#5B6D8F] to-[#6A7D9F] text-white p-8 rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-x-12"></div>
            <div className="relative z-10">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-3xl font-bold mb-3">Clinical Efficacy Data</h3>
              <p className="text-white/90 text-sm max-w-2xl">
                Research-backed results from peer-reviewed clinical studies
              </p>
            </div>
          </div>

          {[
            {
              icon: "💉",
              title: "Dysport®",
              subtitle: "Injectable Neurotoxin",
              description: "FDA-approved for moderate to severe glabellar lines. Clinical trials demonstrate significant efficacy and safety profile.",
              stats: [
                { label: "Duration of Effect", value: "3-4 mo" },
                { label: "Onset Time", value: "2-3 days" },
                { label: "Patient Satisfaction", value: "94% satisfied" }
              ],
              quote: "In pivotal clinical trials, Dysport® demonstrated statistically significant improvement in glabellar line severity at day 30 post-injection."
            },
            {
              icon: "💎",
              title: "Restylane®",
              subtitle: "Hyaluronic Acid Filler",
              description: "Extensive clinical research demonstrates efficacy for facial volume enhancement and wrinkle correction across multiple anatomical areas.",
              stats: [
                { label: "Duration", value: "6-18 months" },
                { label: "Recommend Rate", value: "97%" }
              ],
              bullets: [
                "FDA-approved for mid-to-deep facial wrinkles and folds",
                "Hyaluronic acid-based for natural-looking results",
                "Immediate visible improvement post-treatment"
              ]
            },
            {
              icon: "✨",
              title: "Sculptra®",
              subtitle: "Collagen Stimulator",
              description: "Unique poly-L-lactic acid mechanism stimulates collagen production for gradual, long-lasting facial volume restoration.",
              timeline: [
                { step: 1, text: "Initial treatment series (3-4 sessions)" },
                { step: 2, text: "Gradual improvement over 3-6 months" },
                { step: 3, text: "Results last 2+ years" }
              ],
              stats: [
                { label: "Years on Market", value: "25+" },
                { label: "Patient Satisfaction", value: "90%" }
              ]
            }
          ].map((treatment) => (
            <div key={treatment.title} className="bg-white border-2 border-[#4A5D7F]/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="bg-gradient-to-r from-[#4A5D7F] to-[#5B6D8F] px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-2xl">{treatment.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xl">{treatment.title} Clinical Data</h4>
                    <p className="text-white/80 text-xs">{treatment.subtitle}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-sm text-gray-700 leading-relaxed">{treatment.description}</p>

                {treatment.stats && (
                  <div className="grid grid-cols-2 gap-3">
                    {treatment.stats.map((stat) => (
                      <div key={stat.label} className="bg-[#F5F1EC] p-3 rounded-xl text-center">
                        <p className="text-2xl font-bold text-[#4A5D7F] mb-1">{stat.value}</p>
                        <p className="text-[10px] text-gray-600 font-semibold">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                {treatment.bullets && (
                  <div className="space-y-2">
                    {treatment.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#4A5D7F]"></div>
                        <p className="text-xs text-gray-700">{bullet}</p>
                      </div>
                    ))}
                  </div>
                )}

                {treatment.timeline && (
                  <div className="bg-gradient-to-br from-[#F5F1EC] to-white p-4 rounded-xl border-2 border-[#4A5D7F]/20">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-3">Treatment Timeline</p>
                    <div className="space-y-2">
                      {treatment.timeline.map((item) => (
                        <div key={item.step} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#4A5D7F] text-white flex items-center justify-center text-xs font-bold">
                            {item.step}
                          </div>
                          <p className="text-xs text-gray-700">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {treatment.quote && (
                  <div className="bg-[#4A5D7F]/5 p-4 rounded-lg">
                    <p className="text-xs text-gray-600 italic">{treatment.quote}</p>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="bg-gradient-to-br from-[#F5F1EC] to-white p-6 rounded-xl border-2 border-[#4A5D7F]/10">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#4A5D7F] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs">📋</span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#2C2C2C] mb-2">Important Information</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  For complete clinical study data, safety information, and detailed efficacy profiles, please consult with your healthcare provider or visit the official product websites.
                </p>
              </div>
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
          className="fixed bottom-6 left-6 z-50 bg-[#4A5D7F] text-white px-6 py-4 rounded-full shadow-2xl hover:bg-[#3A4D6F] transition-all hover:scale-105 flex items-center gap-2 font-semibold uppercase text-sm tracking-wide"
        >
          <Sparkles className="w-5 h-5" />
          Explore Rewards
        </button>
      )}

      {/* Adaptive Website Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex animate-in fade-in duration-500">
          {/* Left Panel - Fixed Chat/Menu (320px) */}
          <div className="w-80 flex-shrink-0 bg-white/95 backdrop-blur-xl border-r border-gray-200 flex flex-col shadow-2xl animate-in slide-in-from-left-8 duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#4A5D7F] to-[#5B6D8F] p-5 text-white flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                {currentPanel && (
                  <button
                    onClick={backToMenu}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Back to menu"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <div>
                  <h3 className="text-lg font-bold">ASPIRE Rewards</h3>
                  <p className="text-xs text-white/80 mt-0.5">Explore & Learn</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
              <div className="space-y-6">
                {/* Welcome Section */}
                <div className="text-center py-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#4A5D7F] to-[#5B6D8F] flex items-center justify-center shadow-lg">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">Explore ASPIRE</h3>
                  <p className="text-sm text-gray-600">
                    Discover program benefits and maximize your rewards
                  </p>
                </div>

                {/* Quick Action Cards */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2">Quick Topics</p>

                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleTopicClick(action.id)}
                      className="group w-full text-left bg-white hover:bg-gradient-to-r hover:from-[#4A5D7F] hover:to-[#5B6D8F] border-2 border-[#4A5D7F]/20 hover:border-[#4A5D7F] rounded-xl p-4 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#2C2C2C] group-hover:text-white transition-colors">
                          {action.label}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[#4A5D7F]/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                          <span className="text-[#4A5D7F] group-hover:text-white">→</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Category Cards */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2">Additional Information</p>

                  <div className="grid grid-cols-1 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleTopicClick(category.id)}
                        className="group bg-gradient-to-r from-white to-[#F5F1EC] border-2 border-[#4A5D7F] hover:from-[#4A5D7F] hover:to-[#5B6D8F] text-[#4A5D7F] hover:text-white rounded-xl p-4 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold">{category.label}</span>
                          <span className="text-xl group-hover:scale-110 transition-transform duration-300">→</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Dynamic Content (flexible width) */}
          <div
            ref={contentRef}
            className="flex-1 overflow-y-auto bg-gray-50 p-8 transition-all duration-500"
          >
            {currentPanel ? (
              getPanelContent(currentPanel)
            ) : (
              <div className="flex items-center justify-center h-full animate-in fade-in zoom-in-95 duration-700">
                <div className="text-center max-w-md">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#4A5D7F] to-[#5B6D8F] flex items-center justify-center shadow-2xl">
                    <span className="text-4xl">💎</span>
                  </div>
                  <h2 className="text-3xl font-bold text-[#2C2C2C] mb-4">
                    Welcome to ASPIRE
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Select a topic from the left menu to explore program details, benefits, and clinical information.
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
