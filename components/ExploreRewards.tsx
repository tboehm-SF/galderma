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
    // Directly show panel without intermediate button
    setCurrentPanel(action.id);
    setViewMode("panel");
  };

  const handleCategoryClick = (category: typeof categories[0]) => {
    // Directly show panel without intermediate button
    setCurrentPanel(category.id);
    setViewMode("panel");
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
    const panels: Record<string, React.ReactElement> = {
      "how-earn": (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Hero Section with Gradient */}
          <div className="relative bg-gradient-to-br from-[#4A5D7F] via-[#5B6D8F] to-[#6A7D9F] text-white p-8 rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
            <div className="relative z-10">
              <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-4">
                REWARDS PROGRAM
              </div>
              <h3 className="text-2xl font-bold mb-3">How to Earn Points</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Every qualifying treatment automatically earns you valuable points toward exclusive rewards and savings
              </p>
            </div>
          </div>

          {/* Interactive Treatment Cards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2">Eligible Treatments</h4>

            <div className="group bg-gradient-to-r from-white to-[#F5F1EC] border-2 border-[#4A5D7F]/20 hover:border-[#4A5D7F] rounded-xl p-5 transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4A5D7F] to-[#5B6D8F] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">💉</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#4A5D7F] mb-2 text-lg">Dysport®</h4>
                  <p className="text-sm text-gray-700 mb-3">Injectable neurotoxin for frown lines and facial aesthetics</p>
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-[#4A5D7F]/10 rounded-full text-xs font-semibold text-[#4A5D7F]">
                      ⭐ 50 points per vial
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-r from-white to-[#F5F1EC] border-2 border-[#4A5D7F]/20 hover:border-[#4A5D7F] rounded-xl p-5 transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4A5D7F] to-[#5B6D8F] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">💎</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#4A5D7F] mb-2 text-lg">Restylane® Family</h4>
                  <p className="text-sm text-gray-700 mb-3">Hyaluronic acid dermal fillers for facial volume and contouring</p>
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-[#4A5D7F]/10 rounded-full text-xs font-semibold text-[#4A5D7F]">
                      ⭐ 75 points per syringe
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-r from-white to-[#F5F1EC] border-2 border-[#4A5D7F]/20 hover:border-[#4A5D7F] rounded-xl p-5 transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4A5D7F] to-[#5B6D8F] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">✨</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#4A5D7F] mb-2 text-lg">Sculptra® Aesthetic</h4>
                  <p className="text-sm text-gray-700 mb-3">Poly-L-lactic acid collagen stimulator for gradual volume restoration</p>
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-[#4A5D7F]/10 rounded-full text-xs font-semibold text-[#4A5D7F]">
                      ⭐ 100 points per vial
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Automatic Points Feature */}
          <div className="bg-gradient-to-br from-[#F5F1EC] to-white p-6 rounded-xl border-2 border-[#4A5D7F]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#4A5D7F] flex items-center justify-center">
                <span className="text-white text-lg">🎯</span>
              </div>
              <h4 className="font-bold text-[#2C2C2C]">Automatic Credit</h4>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              Points are automatically credited to your ASPIRE account within 24-48 hours after each qualifying treatment with a participating provider. No manual entry required!
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="bg-white border-2 border-[#4A5D7F]/20 p-5 rounded-xl">
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
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-[#4A5D7F] via-[#5B6D8F] to-[#6A7D9F] text-white p-8 rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-4">
                TREATMENT PORTFOLIO
              </div>
              <h3 className="text-2xl font-bold mb-3">Eligible Treatments</h3>
              <p className="text-white/90 text-sm">
                Premium aesthetic treatments that qualify for ASPIRE Rewards
              </p>
            </div>
          </div>

          {/* Treatment Cards with Tabs */}
          <div className="space-y-4">
            {/* Dysport Card */}
            <div className="bg-white border-2 border-[#4A5D7F]/20 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-gradient-to-r from-[#4A5D7F] to-[#5B6D8F] p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-2xl">💉</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Dysport®</h4>
                    <p className="text-white/80 text-xs">Injectable Neurotoxin</p>
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <p className="text-sm text-gray-700">
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
                <div className="flex items-center gap-2 pt-2">
                  <span className="px-3 py-1 bg-[#4A5D7F]/10 rounded-full text-xs font-semibold text-[#4A5D7F]">
                    ⭐ 50 pts/vial
                  </span>
                </div>
              </div>
            </div>

            {/* Restylane Card */}
            <div className="bg-white border-2 border-[#4A5D7F]/20 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-gradient-to-r from-[#4A5D7F] to-[#5B6D8F] p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-2xl">💎</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Restylane® Family</h4>
                    <p className="text-white/80 text-xs">Hyaluronic Acid Fillers</p>
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <p className="text-sm text-gray-700">
                  Complete portfolio of dermal fillers for facial volume, contouring, and wrinkle correction.
                </p>
                <div className="bg-[#F5F1EC] p-3 rounded-lg space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4A5D7F]"></div>
                    <p className="text-xs text-gray-700 font-medium">Restylane® / Restylane-L®</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4A5D7F]"></div>
                    <p className="text-xs text-gray-700 font-medium">Restylane® Lyft / Lyft with Lidocaine</p>
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
                <div className="flex items-center gap-2 pt-2">
                  <span className="px-3 py-1 bg-[#4A5D7F]/10 rounded-full text-xs font-semibold text-[#4A5D7F]">
                    ⭐ 75 pts/syringe
                  </span>
                </div>
              </div>
            </div>

            {/* Sculptra Card */}
            <div className="bg-white border-2 border-[#4A5D7F]/20 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-gradient-to-r from-[#4A5D7F] to-[#5B6D8F] p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Sculptra® Aesthetic</h4>
                    <p className="text-white/80 text-xs">Collagen Stimulator</p>
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <p className="text-sm text-gray-700">
                  Poly-L-lactic acid injectable that stimulates your body's natural collagen production for gradual, long-lasting results.
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
                <div className="flex items-center gap-2 pt-2">
                  <span className="px-3 py-1 bg-[#4A5D7F]/10 rounded-full text-xs font-semibold text-[#4A5D7F]">
                    ⭐ 100 pts/vial
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Provider Note */}
          <div className="bg-gradient-to-br from-[#F5F1EC] to-white p-5 rounded-xl border-2 border-[#4A5D7F]/10">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#4A5D7F] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">ℹ️</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#2C2C2C] mb-1">Important Note</p>
                <p className="text-sm text-gray-700">
                  All treatments must be performed by a participating ASPIRE provider to qualify for rewards. Ask your provider if they participate in the ASPIRE program.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      "redeem": (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-[#4A5D7F] via-[#5B6D8F] to-[#6A7D9F] text-white p-8 rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-x-8 -translate-y-8"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl translate-x-12 translate-y-12"></div>
            <div className="relative z-10">
              <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-4">
                REDEMPTION PROCESS
              </div>
              <h3 className="text-2xl font-bold mb-3">How to Redeem Rewards</h3>
              <p className="text-white/90 text-sm">
                Simple 4-step process to unlock your earned rewards
              </p>
            </div>
          </div>

          {/* Step-by-Step Process with Connectors */}
          <div className="relative space-y-4">
            {/* Vertical Line Connector */}
            <div className="absolute left-6 top-12 bottom-12 w-0.5 bg-gradient-to-b from-[#4A5D7F] to-[#6A7D9F]"></div>

            {/* Step 1 */}
            <div className="relative bg-white border-2 border-[#4A5D7F]/20 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-start gap-4">
                <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-[#4A5D7F] to-[#5B6D8F] text-white flex items-center justify-center flex-shrink-0 font-bold text-lg shadow-lg">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#4A5D7F] mb-2 text-lg">Log Into Your Account</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Access your personalized ASPIRE dashboard online or via mobile app
                  </p>
                  <div className="inline-block px-3 py-1 bg-[#F5F1EC] rounded-full text-xs font-semibold text-gray-600">
                    aspirerewards.com/login
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative bg-white border-2 border-[#4A5D7F]/20 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-start gap-4">
                <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-[#4A5D7F] to-[#5B6D8F] text-white flex items-center justify-center flex-shrink-0 font-bold text-lg shadow-lg">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#4A5D7F] mb-2 text-lg">Browse Rewards Catalog</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Explore hundreds of exclusive rewards, discounts, and member-only offers
                  </p>
                  <div className="flex gap-2">
                    <div className="px-3 py-1 bg-[#4A5D7F]/10 rounded-full text-xs font-semibold text-[#4A5D7F]">
                      💰 Savings
                    </div>
                    <div className="px-3 py-1 bg-[#4A5D7F]/10 rounded-full text-xs font-semibold text-[#4A5D7F]">
                      🎁 Products
                    </div>
                    <div className="px-3 py-1 bg-[#4A5D7F]/10 rounded-full text-xs font-semibold text-[#4A5D7F]">
                      ✨ Experiences
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative bg-white border-2 border-[#4A5D7F]/20 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-start gap-4">
                <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-[#4A5D7F] to-[#5B6D8F] text-white flex items-center justify-center flex-shrink-0 font-bold text-lg shadow-lg">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#4A5D7F] mb-2 text-lg">Select Your Reward</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Choose the reward that fits your points balance and preferences
                  </p>
                  <div className="bg-gradient-to-r from-[#F5F1EC] to-white p-3 rounded-lg border border-[#4A5D7F]/20">
                    <p className="text-xs text-gray-600 mb-1">Popular Rewards:</p>
                    <p className="text-xs font-semibold text-[#4A5D7F]">$25 off next treatment (250 pts) • $50 off (500 pts) • Free consultation (150 pts)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative bg-white border-2 border-[#4A5D7F]/20 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-start gap-4">
                <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-[#4A5D7F] to-[#5B6D8F] text-white flex items-center justify-center flex-shrink-0 font-bold text-lg shadow-lg">
                  4
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#4A5D7F] mb-2 text-lg">Redeem at Checkout</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Apply your points instantly at your provider's office or online
                  </p>
                  <div className="inline-block px-3 py-1.5 bg-gradient-to-r from-[#4A5D7F] to-[#5B6D8F] text-white rounded-lg text-xs font-bold shadow-md">
                    Instant Savings Applied ✓
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-[#F5F1EC] to-white p-4 rounded-xl border-2 border-[#4A5D7F]/10 text-center">
              <div className="text-2xl mb-2">♾️</div>
              <p className="text-xs font-bold text-[#2C2C2C] mb-1">Points Never Expire</p>
              <p className="text-[10px] text-gray-600">Save and redeem anytime</p>
            </div>
            <div className="bg-gradient-to-br from-[#F5F1EC] to-white p-4 rounded-xl border-2 border-[#4A5D7F]/10 text-center">
              <div className="text-2xl mb-2">⚡</div>
              <p className="text-xs font-bold text-[#2C2C2C] mb-1">Instant Redemption</p>
              <p className="text-[10px] text-gray-600">No waiting periods</p>
            </div>
          </div>
        </div>
      ),
      "benefits": (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-[#4A5D7F] via-[#5B6D8F] to-[#6A7D9F] text-white p-8 rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl translate-x-12 -translate-y-12"></div>
            <div className="relative z-10">
              <div className="text-3xl mb-3">💎</div>
              <h3 className="text-2xl font-bold mb-3">Member Benefits</h3>
              <p className="text-white/90 text-sm">
                Exclusive perks designed to reward your aesthetic journey
              </p>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="space-y-3">
            <div className="group bg-gradient-to-r from-white to-[#F5F1EC] border-l-4 border-[#4A5D7F] p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-x-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4A5D7F]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-lg">⭐</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#2C2C2C] mb-0.5">Earn Points Automatically</p>
                  <p className="text-xs text-gray-600">Every qualifying treatment adds points to your account</p>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-r from-white to-[#F5F1EC] border-l-4 border-[#4A5D7F] p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-x-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4A5D7F]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-lg">🎁</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#2C2C2C] mb-0.5">Exclusive Rewards & Savings</p>
                  <p className="text-xs text-gray-600">Redeem points for treatments, products, and experiences</p>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-r from-white to-[#F5F1EC] border-l-4 border-[#4A5D7F] p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-x-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4A5D7F]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-lg">🔔</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#2C2C2C] mb-0.5">Member-Only Offers</p>
                  <p className="text-xs text-gray-600">First access to promotions and special pricing</p>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-r from-white to-[#F5F1EC] border-l-4 border-[#4A5D7F] p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-x-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4A5D7F]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-lg">📊</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#2C2C2C] mb-0.5">Track Your Journey</p>
                  <p className="text-xs text-gray-600">Monitor points, rewards history, and treatment progress</p>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-r from-white to-[#F5F1EC] border-l-4 border-[#4A5D7F] p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-x-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4A5D7F]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-lg">💝</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#2C2C2C] mb-0.5">Free to Join</p>
                  <p className="text-xs text-gray-600">No enrollment fees, membership costs, or hidden charges</p>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-r from-white to-[#F5F1EC] border-l-4 border-[#4A5D7F] p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-x-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4A5D7F]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-lg">♾️</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#2C2C2C] mb-0.5">Points Never Expire</p>
                  <p className="text-xs text-gray-600">Save and accumulate points at your own pace</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-br from-[#F5F1EC] to-white p-6 rounded-xl border-2 border-[#4A5D7F]/20">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 text-center">Member Success Stories</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#4A5D7F] mb-1">500K+</p>
                <p className="text-[10px] text-gray-600 font-medium">Active Members</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#4A5D7F] mb-1">$12M+</p>
                <p className="text-[10px] text-gray-600 font-medium">Rewards Redeemed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#4A5D7F] mb-1">98%</p>
                <p className="text-[10px] text-gray-600 font-medium">Satisfaction Rate</p>
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <div className="relative bg-gradient-to-br from-[#4A5D7F] to-[#5B6D8F] p-6 rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="relative z-10 text-center text-white">
              <h4 className="font-bold mb-2 text-lg">Ready to Start Earning?</h4>
              <p className="text-sm text-white/90 mb-4">Join ASPIRE today and unlock exclusive rewards with your first treatment</p>
              <button className="px-8 py-3 bg-white text-[#4A5D7F] rounded-full text-sm font-bold hover:bg-white/90 transition-colors shadow-lg hover:scale-105 transform duration-200">
                JOIN NOW →
              </button>
            </div>
          </div>
        </div>
      ),
      "efficacy": (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-[#4A5D7F] via-[#5B6D8F] to-[#6A7D9F] text-white p-8 rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-x-12"></div>
            <div className="relative z-10">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-2xl font-bold mb-3">Clinical Efficacy Data</h3>
              <p className="text-white/90 text-sm">
                Research-backed results from peer-reviewed clinical studies
              </p>
            </div>
          </div>

          {/* Dysport Clinical Card */}
          <div className="bg-white border-2 border-[#4A5D7F]/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-r from-[#4A5D7F] to-[#5B6D8F] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <span className="text-xl">💉</span>
                </div>
                <h4 className="font-bold text-white text-lg">Dysport® Clinical Data</h4>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                FDA-approved for moderate to severe glabellar lines. Clinical trials demonstrate significant efficacy and safety profile.
              </p>

              <div className="space-y-3">
                <div className="bg-gradient-to-r from-[#F5F1EC] to-white p-4 rounded-xl border border-[#4A5D7F]/20">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-gray-500 uppercase">Duration of Effect</p>
                    <div className="px-2 py-0.5 bg-[#4A5D7F] text-white rounded-full text-[10px] font-bold">3-4 mo</div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-4/5 bg-gradient-to-r from-[#4A5D7F] to-[#5B6D8F] rounded-full"></div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#F5F1EC] to-white p-4 rounded-xl border border-[#4A5D7F]/20">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-gray-500 uppercase">Onset Time</p>
                    <div className="px-2 py-0.5 bg-[#4A5D7F] text-white rounded-full text-[10px] font-bold">2-3 days</div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-1/4 bg-gradient-to-r from-[#4A5D7F] to-[#5B6D8F] rounded-full"></div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#F5F1EC] to-white p-4 rounded-xl border border-[#4A5D7F]/20">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">Patient Satisfaction</p>
                  <div className="flex items-center gap-1">
                    <span className="text-lg">⭐⭐⭐⭐⭐</span>
                    <span className="text-xs font-bold text-[#4A5D7F] ml-2">94% satisfied</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#4A5D7F]/5 p-4 rounded-lg">
                <p className="text-xs text-gray-600 italic">
                  "In pivotal clinical trials, Dysport® demonstrated statistically significant improvement in glabellar line severity at day 30 post-injection."
                </p>
              </div>
            </div>
          </div>

          {/* Restylane Clinical Card */}
          <div className="bg-white border-2 border-[#4A5D7F]/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-r from-[#4A5D7F] to-[#5B6D8F] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <span className="text-xl">💎</span>
                </div>
                <h4 className="font-bold text-white text-lg">Restylane® Clinical Data</h4>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                Extensive clinical research demonstrates efficacy for facial volume enhancement and wrinkle correction across multiple anatomical areas.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#F5F1EC] p-3 rounded-xl text-center">
                  <p className="text-2xl font-bold text-[#4A5D7F] mb-1">6-18</p>
                  <p className="text-[10px] text-gray-600 font-semibold">Months Duration</p>
                </div>
                <div className="bg-[#F5F1EC] p-3 rounded-xl text-center">
                  <p className="text-2xl font-bold text-[#4A5D7F] mb-1">97%</p>
                  <p className="text-[10px] text-gray-600 font-semibold">Recommend It</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#4A5D7F]"></div>
                  <p className="text-xs text-gray-700">FDA-approved for mid-to-deep facial wrinkles and folds</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#4A5D7F]"></div>
                  <p className="text-xs text-gray-700">Hyaluronic acid-based for natural-looking results</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#4A5D7F]"></div>
                  <p className="text-xs text-gray-700">Immediate visible improvement post-treatment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sculptra Clinical Card */}
          <div className="bg-white border-2 border-[#4A5D7F]/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-r from-[#4A5D7F] to-[#5B6D8F] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <span className="text-xl">✨</span>
                </div>
                <h4 className="font-bold text-white text-lg">Sculptra® Clinical Data</h4>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                Unique poly-L-lactic acid mechanism stimulates collagen production for gradual, long-lasting facial volume restoration.
              </p>

              <div className="bg-gradient-to-br from-[#F5F1EC] to-white p-4 rounded-xl border-2 border-[#4A5D7F]/20">
                <p className="text-xs font-bold text-gray-500 uppercase mb-3">Treatment Timeline</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#4A5D7F] text-white flex items-center justify-center text-xs font-bold">1</div>
                    <p className="text-xs text-gray-700">Initial treatment series (3-4 sessions)</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#4A5D7F]/70 text-white flex items-center justify-center text-xs font-bold">2</div>
                    <p className="text-xs text-gray-700">Gradual improvement over 3-6 months</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#4A5D7F]/40 text-white flex items-center justify-center text-xs font-bold">3</div>
                    <p className="text-xs text-gray-700">Results last 2+ years</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#F5F1EC] p-3 rounded-xl text-center">
                  <p className="text-2xl font-bold text-[#4A5D7F] mb-1">25+</p>
                  <p className="text-[10px] text-gray-600 font-semibold">Years on Market</p>
                </div>
                <div className="bg-[#F5F1EC] p-3 rounded-xl text-center">
                  <p className="text-2xl font-bold text-[#4A5D7F] mb-1">90%</p>
                  <p className="text-[10px] text-gray-600 font-semibold">Patient Satisfaction</p>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-gradient-to-br from-[#F5F1EC] to-white p-5 rounded-xl border-2 border-[#4A5D7F]/10">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#4A5D7F] flex items-center justify-center flex-shrink-0">
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

          {/* Interactive Dashboard - Full Height Left Side */}
          <div className="fixed top-0 left-0 bottom-0 w-full md:w-[500px] lg:w-[600px] bg-white shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-left duration-500">
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

            {/* Menu View */}
            {viewMode === "chat" && (
              <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
                <div className="space-y-6">
                  {/* Welcome Section */}
                  <div className="text-center py-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#4A5D7F] to-[#5B6D8F] flex items-center justify-center shadow-xl">
                      <span className="text-3xl">✨</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#2C2C2C] mb-2">Explore ASPIRE Rewards</h3>
                    <p className="text-sm text-gray-600 max-w-xs mx-auto">
                      Discover program benefits, clinical data, and how to maximize your rewards
                    </p>
                  </div>

                  {/* Quick Action Cards */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2">Quick Topics</p>

                    {quickActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleQuickAction(action)}
                        className="group w-full text-left bg-white hover:bg-gradient-to-r hover:from-[#4A5D7F] hover:to-[#5B6D8F] border-2 border-[#4A5D7F]/20 hover:border-[#4A5D7F] rounded-xl p-5 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-[#2C2C2C] group-hover:text-white transition-colors">
                            {action.label.replace(" →", "")}
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
                          onClick={() => handleCategoryClick(category)}
                          className="group bg-gradient-to-r from-white to-[#F5F1EC] border-2 border-[#4A5D7F] hover:from-[#4A5D7F] hover:to-[#5B6D8F] text-[#4A5D7F] hover:text-white rounded-xl p-5 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1"
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
