"use client";

import { useState } from "react";
import { X, Send, Sparkles, Gift, HelpCircle } from "lucide-react";

export default function ExploreRewards() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState<"home" | "benefits" | "eligibility">("home");
  const [message, setMessage] = useState("");

  const quickActions = [
    {
      id: "how-earn",
      label: "How do I earn points? →",
      icon: Sparkles,
    },
    {
      id: "eligible",
      label: "Which treatments are eligible? →",
      icon: HelpCircle,
    },
    {
      id: "redeem",
      label: "How do I redeem my rewards? →",
      icon: Gift,
    },
  ];

  const categories = [
    { id: "benefits", label: "💰 Member Benefits", view: "benefits" as const },
    { id: "eligibility", label: "✨ Eligible Treatments", view: "eligibility" as const },
  ];

  const handleQuickAction = (actionId: string) => {
    // Simulate responding to quick action
    console.log("Quick action:", actionId);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Message:", message);
      setMessage("");
    }
  };

  return (
    <>
      {/* Floating "Explore Rewards" Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-50 bg-[#4A5D7F] text-white px-6 py-4 rounded-full shadow-2xl hover:bg-[#3A4D6F] transition-all hover:scale-105 flex items-center gap-2 font-semibold uppercase text-sm tracking-wide"
        >
          <Sparkles className="w-5 h-5" />
          Explore Rewards
        </button>
      )}

      {/* Adaptive Overlay Panel */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-[420px] max-h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#4A5D7F] to-[#5B6D8F] p-6 text-white">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold">ASPIRE Rewards Assistant</h3>
                <p className="text-sm text-white/80 mt-1">
                  Hello! I can help you explore program benefits and eligibility.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Home View */}
            {activeView === "home" && (
              <>
                {/* Quick Actions */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Quick Questions
                  </p>
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.id}
                        onClick={() => handleQuickAction(action.id)}
                        className="w-full text-left px-4 py-3 bg-[#F5F1EC] hover:bg-[#E8D5C4] rounded-xl transition-colors text-sm text-[#4A5D7F] font-medium flex items-center gap-3"
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        {action.label}
                      </button>
                    );
                  })}
                </div>

                {/* Category Buttons */}
                <div className="space-y-2 pt-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Explore Topics
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveView(category.view)}
                        className="px-4 py-3 bg-white border-2 border-[#4A5D7F] text-[#4A5D7F] rounded-xl hover:bg-[#4A5D7F] hover:text-white transition-all text-sm font-semibold"
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Benefits View */}
            {activeView === "benefits" && (
              <div className="space-y-4">
                <button
                  onClick={() => setActiveView("home")}
                  className="text-sm text-[#4A5D7F] hover:underline flex items-center gap-1"
                >
                  ← Back
                </button>

                <div className="bg-gradient-to-br from-[#F5F1EC] to-[#E8D5C4] p-6 rounded-xl">
                  <h4 className="text-lg font-semibold text-[#4A5D7F] mb-4">
                    Member Benefits
                  </h4>
                  <ul className="space-y-3 text-sm text-[#2C2C2C]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#4A5D7F] font-bold">✓</span>
                      <span>Earn points with every qualifying Galderma treatment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#4A5D7F] font-bold">✓</span>
                      <span>Redeem points for exclusive rewards and savings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#4A5D7F] font-bold">✓</span>
                      <span>Access member-only offers and promotions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#4A5D7F] font-bold">✓</span>
                      <span>Track your progress and rewards history</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <button className="w-full bg-[#4A5D7F] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#3A4D6F] transition-colors">
                    ↓ Download Benefits Guide
                  </button>
                  <button
                    onClick={() => setActiveView("eligibility")}
                    className="w-full bg-white border border-[#4A5D7F] text-[#4A5D7F] px-4 py-3 rounded-lg font-semibold hover:bg-[#F5F1EC] transition-colors"
                  >
                    Eligible Treatments ❯
                  </button>
                </div>
              </div>
            )}

            {/* Eligibility View */}
            {activeView === "eligibility" && (
              <div className="space-y-4">
                <button
                  onClick={() => setActiveView("home")}
                  className="text-sm text-[#4A5D7F] hover:underline flex items-center gap-1"
                >
                  ← Back
                </button>

                <div className="bg-gradient-to-br from-[#F5F1EC] to-[#E8D5C4] p-6 rounded-xl">
                  <h4 className="text-lg font-semibold text-[#4A5D7F] mb-4">
                    Eligible Treatments
                  </h4>
                  <div className="space-y-4 text-sm text-[#2C2C2C]">
                    <div>
                      <h5 className="font-semibold text-[#4A5D7F] mb-2">Dysport®</h5>
                      <p>Injectable neurotoxin for facial aesthetic treatments</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-[#4A5D7F] mb-2">Restylane® Family</h5>
                      <p>Dermal fillers for facial volume and contouring</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-[#4A5D7F] mb-2">Sculptra® Aesthetic</h5>
                      <p>Collagen stimulator for facial volume restoration</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button className="w-full bg-[#4A5D7F] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#3A4D6F] transition-colors">
                    ↓ Download Eligibility Guide
                  </button>
                  <button
                    onClick={() => setActiveView("benefits")}
                    className="w-full bg-white border border-[#4A5D7F] text-[#4A5D7F] px-4 py-3 rounded-lg font-semibold hover:bg-[#F5F1EC] transition-colors"
                  >
                    Member Benefits ❯
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask about ASPIRE Rewards..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D7F] text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="bg-[#4A5D7F] text-white p-3 rounded-lg hover:bg-[#3A4D6F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by ASPIRE Galderma Rewards
            </p>
          </div>
        </div>
      )}
    </>
  );
}
