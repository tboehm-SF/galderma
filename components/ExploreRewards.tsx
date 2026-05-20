"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, ArrowLeft } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  showPanel?: boolean;
  panelId?: string;
}

type ViewMode = "chat" | "panel";

export default function ExploreRewards() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("chat");
  const [currentPanel, setCurrentPanel] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickActions = [
    {
      id: "how-earn",
      label: "How do I earn points? →",
      response: "Here's how you can earn points with ASPIRE — see the panel →",
      hasPanel: true
    },
    {
      id: "eligible",
      label: "Which treatments are eligible? →",
      response: "ASPIRE includes multiple eligible treatments — see the panel →",
      hasPanel: true
    },
    {
      id: "redeem",
      label: "How do I redeem rewards? →",
      response: "Redeeming rewards is simple — see the panel →",
      hasPanel: true
    },
  ];

  const categories = [
    {
      id: "benefits",
      label: "💰 Member Benefits",
      response: "ASPIRE Member Benefits — see the panel →",
      hasPanel: true
    },
    {
      id: "efficacy",
      label: "📊 Efficacy Data",
      response: "Clinical Efficacy — see the panel →",
      hasPanel: true
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      setTimeout(() => {
        addAssistantMessage("Hello! I can help you explore clinical evidence and program information for ASPIRE Galderma Rewards. What would you like to know?");
      }, 500);
    }
  }, [isOpen]);

  const addUserMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
  };

  const addAssistantMessage = (content: string, panelId?: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const assistantMessage: Message = {
        id: Date.now().toString(),
        type: "assistant",
        content,
        timestamp: new Date(),
        showPanel: !!panelId,
        panelId,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleQuickAction = (action: typeof quickActions[0]) => {
    addUserMessage(action.label.replace(" →", ""));
    addAssistantMessage(action.response, action.hasPanel ? action.id : undefined);
  };

  const handleCategoryClick = (category: typeof categories[0]) => {
    addUserMessage(`Tell me about ${category.label}`);
    addAssistantMessage(category.response, category.hasPanel ? category.id : undefined);
  };

  const showPanel = (panelId: string) => {
    setCurrentPanel(panelId);
    setViewMode("panel");
  };

  const backToChat = () => {
    setViewMode("chat");
    setCurrentPanel(null);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      addUserMessage(inputValue);
      setInputValue("");

      // Simulate response based on keywords
      setTimeout(() => {
        if (inputValue.toLowerCase().includes("join") || inputValue.toLowerCase().includes("sign up")) {
          addAssistantMessage("To join ASPIRE Rewards:\n\n1. Click the 'JOIN NOW' button at the top of the page\n2. Fill out your information\n3. Verify your email\n4. Start earning points immediately!\n\nIt's free to join and takes less than 2 minutes.");
        } else if (inputValue.toLowerCase().includes("provider") || inputValue.toLowerCase().includes("find")) {
          addAssistantMessage("To find a participating provider:\n\n1. Use the Treatment Finder section on this page\n2. Enter your location or zip code\n3. Browse providers near you\n\nAll participating providers are certified to administer ASPIRE eligible treatments.");
        } else {
          addAssistantMessage("Thank you for your question! For specific program details, I recommend:\n\n• Reviewing our FAQ section\n• Contacting ASPIRE support at 1-800-ASPIRE-RX\n• Speaking with your healthcare provider\n\nIs there anything else I can help you with?");
        }
      }, 100);
    }
  };

  const getPanelContent = (panelId: string) => {
    const panels: Record<string, JSX.Element> = {
      "how-earn": (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#4A5D7F] to-[#5B6D8F] text-white p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Earning Points</h3>
            <p className="text-sm text-white/90">Every qualifying treatment earns you points automatically</p>
          </div>

          <div className="space-y-4">
            <div className="bg-white border-2 border-[#4A5D7F]/20 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4A5D7F]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">✨</span>
                </div>
                <div>
                  <h4 className="font-semibold text-[#2C2C2C] mb-1">Dysport® Treatments</h4>
                  <p className="text-sm text-gray-600">Earn points with every Dysport® injection for frown lines and facial aesthetics</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-[#4A5D7F]/20 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4A5D7F]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">💎</span>
                </div>
                <div>
                  <h4 className="font-semibold text-[#2C2C2C] mb-1">Restylane® Family</h4>
                  <p className="text-sm text-gray-600">Points earned on all Restylane® dermal filler treatments</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-[#4A5D7F]/20 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4A5D7F]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">✨</span>
                </div>
                <div>
                  <h4 className="font-semibold text-[#2C2C2C] mb-1">Sculptra® Aesthetic</h4>
                  <p className="text-sm text-gray-600">Collagen stimulator treatments automatically add points</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F5F1EC] p-5 rounded-xl">
            <p className="text-sm text-[#2C2C2C] font-medium">
              Points are automatically credited to your account after each visit with a participating provider.
            </p>
          </div>
        </div>
      ),
      "eligible": (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#4A5D7F] to-[#5B6D8F] text-white p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Eligible Treatments</h3>
            <p className="text-sm text-white/90">All ASPIRE qualifying treatments</p>
          </div>

          <div className="space-y-4">
            <div className="bg-white border-2 border-[#4A5D7F]/20 rounded-xl p-5">
              <h4 className="font-bold text-[#4A5D7F] mb-3">💉 Dysport®</h4>
              <p className="text-sm text-gray-700 mb-3">Injectable neurotoxin for frown lines and facial aesthetics</p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600"><strong>Indication:</strong> Moderate to severe frown lines between the eyebrows</p>
              </div>
            </div>

            <div className="bg-white border-2 border-[#4A5D7F]/20 rounded-xl p-5">
              <h4 className="font-bold text-[#4A5D7F] mb-3">💎 Restylane® Family</h4>
              <p className="text-sm text-gray-700 mb-3">Hyaluronic acid dermal fillers for facial volume and contouring</p>
              <div className="bg-gray-50 p-3 rounded-lg space-y-1">
                <p className="text-xs text-gray-600">• Restylane®</p>
                <p className="text-xs text-gray-600">• Restylane-L®</p>
                <p className="text-xs text-gray-600">• Restylane® Lyft</p>
                <p className="text-xs text-gray-600">• Restylane® Refyne</p>
                <p className="text-xs text-gray-600">• Restylane® Defyne</p>
              </div>
            </div>

            <div className="bg-white border-2 border-[#4A5D7F]/20 rounded-xl p-5">
              <h4 className="font-bold text-[#4A5D7F] mb-3">✨ Sculptra® Aesthetic</h4>
              <p className="text-sm text-gray-700 mb-3">Poly-L-lactic acid collagen stimulator for gradual facial volume restoration</p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600"><strong>Mechanism:</strong> Stimulates natural collagen production over time</p>
              </div>
            </div>
          </div>

          <div className="bg-[#F5F1EC] p-5 rounded-xl">
            <p className="text-sm text-[#2C2C2C] font-medium">
              All treatments must be performed by a participating ASPIRE provider.
            </p>
          </div>
        </div>
      ),
      "redeem": (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#4A5D7F] to-[#5B6D8F] text-white p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Redeeming Rewards</h3>
            <p className="text-sm text-white/90">Simple steps to use your points</p>
          </div>

          <div className="space-y-4">
            <div className="bg-white border-2 border-[#4A5D7F]/20 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#4A5D7F] text-white flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-[#2C2C2C] mb-1">Log Into Your Account</h4>
                  <p className="text-sm text-gray-600">Access your ASPIRE dashboard online</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-[#4A5D7F]/20 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#4A5D7F] text-white flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-[#2C2C2C] mb-1">Browse Rewards Catalog</h4>
                  <p className="text-sm text-gray-600">View available rewards and exclusive offers</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-[#4A5D7F]/20 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#4A5D7F] text-white flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-[#2C2C2C] mb-1">Select Your Reward</h4>
                  <p className="text-sm text-gray-600">Choose the reward you want to redeem</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-[#4A5D7F]/20 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#4A5D7F] text-white flex items-center justify-center flex-shrink-0 font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-[#2C2C2C] mb-1">Redeem at Checkout</h4>
                  <p className="text-sm text-gray-600">Apply points toward treatments or special benefits</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F5F1EC] p-5 rounded-xl">
            <p className="text-sm text-[#2C2C2C] font-medium mb-2">
              ✓ Points never expire
            </p>
            <p className="text-sm text-[#2C2C2C] font-medium">
              ✓ Use rewards toward future treatments or exclusive member benefits
            </p>
          </div>
        </div>
      ),
      "benefits": (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#4A5D7F] to-[#5B6D8F] text-white p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">💰 Member Benefits</h3>
            <p className="text-sm text-white/90">Exclusive perks for ASPIRE members</p>
          </div>

          <div className="space-y-3">
            <div className="bg-white border-l-4 border-[#4A5D7F] p-4 rounded-lg shadow-sm">
              <p className="text-sm font-semibold text-[#2C2C2C]">✓ Earn points with every qualifying treatment</p>
            </div>
            <div className="bg-white border-l-4 border-[#4A5D7F] p-4 rounded-lg shadow-sm">
              <p className="text-sm font-semibold text-[#2C2C2C]">✓ Redeem points for exclusive rewards and savings</p>
            </div>
            <div className="bg-white border-l-4 border-[#4A5D7F] p-4 rounded-lg shadow-sm">
              <p className="text-sm font-semibold text-[#2C2C2C]">✓ Access member-only offers and promotions</p>
            </div>
            <div className="bg-white border-l-4 border-[#4A5D7F] p-4 rounded-lg shadow-sm">
              <p className="text-sm font-semibold text-[#2C2C2C]">✓ Track your progress and rewards history</p>
            </div>
            <div className="bg-white border-l-4 border-[#4A5D7F] p-4 rounded-lg shadow-sm">
              <p className="text-sm font-semibold text-[#2C2C2C]">✓ No enrollment fees - free to join</p>
            </div>
            <div className="bg-white border-l-4 border-[#4A5D7F] p-4 rounded-lg shadow-sm">
              <p className="text-sm font-semibold text-[#2C2C2C]">✓ Points never expire</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#F5F1EC] to-white p-6 rounded-xl border-2 border-[#4A5D7F]/20">
            <h4 className="font-bold text-[#4A5D7F] mb-3 text-center">Ready to Join?</h4>
            <p className="text-sm text-center text-gray-700 mb-4">Sign up today and start earning rewards with your next treatment</p>
            <div className="text-center">
              <span className="inline-block px-6 py-2 bg-[#4A5D7F] text-white rounded-full text-sm font-semibold">
                JOIN NOW
              </span>
            </div>
          </div>
        </div>
      ),
      "efficacy": (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#4A5D7F] to-[#5B6D8F] text-white p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">📊 Clinical Efficacy</h3>
            <p className="text-sm text-white/90">Research-backed treatment protocols</p>
          </div>

          <div className="space-y-4">
            <div className="bg-white border-2 border-[#4A5D7F]/20 rounded-xl p-5">
              <h4 className="font-bold text-[#4A5D7F] mb-3">Dysport® Clinical Data</h4>
              <p className="text-sm text-gray-700 mb-3">Proven efficacy in reducing moderate to severe frown lines</p>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p className="text-xs text-gray-700"><strong>Duration:</strong> Results typically last 3-4 months</p>
                <p className="text-xs text-gray-700"><strong>Onset:</strong> Visible improvement within 2-3 days</p>
                <p className="text-xs text-gray-700"><strong>Efficacy:</strong> Clinically demonstrated reduction in glabellar lines</p>
              </div>
            </div>

            <div className="bg-white border-2 border-[#4A5D7F]/20 rounded-xl p-5">
              <h4 className="font-bold text-[#4A5D7F] mb-3">Restylane® Clinical Data</h4>
              <p className="text-sm text-gray-700 mb-3">Clinically demonstrated results for facial volume and contouring</p>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p className="text-xs text-gray-700"><strong>Duration:</strong> Results can last 6-18 months depending on product</p>
                <p className="text-xs text-gray-700"><strong>Mechanism:</strong> Hyaluronic acid-based volumizing</p>
                <p className="text-xs text-gray-700"><strong>Applications:</strong> Multiple facial areas including lips, cheeks, nasolabial folds</p>
              </div>
            </div>

            <div className="bg-white border-2 border-[#4A5D7F]/20 rounded-xl p-5">
              <h4 className="font-bold text-[#4A5D7F] mb-3">Sculptra® Clinical Data</h4>
              <p className="text-sm text-gray-700 mb-3">Long-lasting results with gradual, natural-looking improvements</p>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p className="text-xs text-gray-700"><strong>Duration:</strong> Results can last more than 2 years</p>
                <p className="text-xs text-gray-700"><strong>Mechanism:</strong> Stimulates natural collagen production</p>
                <p className="text-xs text-gray-700"><strong>Effect:</strong> Gradual restoration of facial volume over time</p>
              </div>
            </div>
          </div>

          <div className="bg-[#F5F1EC] p-5 rounded-xl">
            <p className="text-sm text-[#2C2C2C] font-medium">
              For detailed clinical study data and comprehensive efficacy information, please consult with your healthcare provider.
            </p>
          </div>
        </div>
      ),
    };

    return panels[panelId] || null;
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

      {/* Full Page Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-300"
            onClick={() => setIsOpen(false)}
          />

          {/* Interactive Dashboard - Full Height Right Side */}
          <div className="fixed top-0 right-0 bottom-0 w-full md:w-[500px] lg:w-[600px] bg-white shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#4A5D7F] to-[#5B6D8F] p-6 text-white flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                {viewMode === "panel" && (
                  <button
                    onClick={backToChat}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Back to chat"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <div>
                  <h3 className="text-xl font-bold">
                    {viewMode === "chat" ? "ASPIRE Rewards Assistant" : "Content Panel"}
                  </h3>
                  <p className="text-sm text-white/90 mt-1">
                    {viewMode === "chat" ? "Online • Ready to help" : "Detailed Information"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Chat View */}
            {viewMode === "chat" && (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {messages.map((msg) => (
                  <div key={msg.id}>
                    <div
                      className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm ${
                          msg.type === "user"
                            ? "bg-[#4A5D7F] text-white rounded-br-sm"
                            : "bg-white text-[#2C2C2C] rounded-bl-sm border border-gray-200"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line leading-relaxed">{msg.content}</p>
                        <span className={`text-[10px] mt-1 block ${msg.type === "user" ? "text-white/60" : "text-gray-400"}`}>
                          {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>

                    {/* Show panel button if message has panel */}
                    {msg.showPanel && msg.panelId && (
                      <div className="flex justify-start mt-2">
                        <button
                          onClick={() => showPanel(msg.panelId!)}
                          className="px-4 py-2 bg-[#4A5D7F] text-white rounded-xl hover:bg-[#3A4D6F] transition-colors text-sm font-medium flex items-center gap-2"
                        >
                          View Details →
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-gray-200">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Actions (only show if no messages yet or after welcome) */}
                {messages.length <= 1 && !isTyping && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2">Quick Questions</p>
                    {quickActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleQuickAction(action)}
                        className="w-full text-left px-4 py-2.5 bg-white hover:bg-[#F5F1EC] rounded-xl transition-colors text-sm text-[#4A5D7F] font-medium border border-gray-200 shadow-sm"
                      >
                        {action.label}
                      </button>
                    ))}

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleCategoryClick(category)}
                          className="px-3 py-2.5 bg-white border-2 border-[#4A5D7F] text-[#4A5D7F] rounded-xl hover:bg-[#4A5D7F] hover:text-white transition-all text-xs font-semibold shadow-sm"
                        >
                          {category.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

                {/* Input Area */}
                <div className="p-6 border-t border-gray-200 bg-white">
                  <div className="flex gap-3">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Ask about ASPIRE Rewards..."
                      className="flex-1 px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A5D7F] focus:border-transparent text-sm"
                      disabled={isTyping}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-[#4A5D7F] text-white p-3 rounded-xl hover:bg-[#3A4D6F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                      aria-label="Send"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-3 text-center">
                    Powered by ASPIRE Galderma Rewards
                  </p>
                </div>
              </>
            )}

            {/* Panel View */}
            {viewMode === "panel" && currentPanel && (
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                {getPanelContent(currentPanel)}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
