"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ExploreRewards() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickActions = [
    {
      id: "how-earn",
      label: "How do I earn points? →",
      response: "Great question! You earn points with every qualifying Galderma treatment:\n\n✨ Dysport® treatments\n✨ Restylane® family fillers\n✨ Sculptra® Aesthetic\n\nPoints are automatically added to your account after each visit. The more treatments you receive, the more rewards you earn!"
    },
    {
      id: "eligible",
      label: "Which treatments are eligible? →",
      response: "ASPIRE Rewards includes these eligible treatments:\n\n💉 **Dysport®** - Injectable neurotoxin for frown lines and facial aesthetics\n\n💎 **Restylane® Family** - Dermal fillers including Restylane®, Restylane-L®, Restylane® Lyft, and more\n\n✨ **Sculptra® Aesthetic** - Collagen stimulator for facial volume restoration\n\nAll treatments must be performed by a participating provider."
    },
    {
      id: "redeem",
      label: "How do I redeem rewards? →",
      response: "Redeeming your rewards is easy!\n\n1️⃣ Log into your ASPIRE account\n2️⃣ Browse available rewards in the catalog\n3️⃣ Select the reward you want\n4️⃣ Redeem points at checkout\n\nYou can use rewards toward future treatments, exclusive offers, or special member benefits. Points never expire!"
    },
  ];

  const categories = [
    {
      id: "benefits",
      label: "💰 Member Benefits",
      response: "ASPIRE Member Benefits:\n\n✓ Earn points with every qualifying treatment\n✓ Redeem points for exclusive rewards and savings\n✓ Access member-only offers and promotions\n✓ Track your progress and rewards history\n✓ No enrollment fees - free to join\n✓ Points never expire\n\nJoin today and start earning!"
    },
    {
      id: "efficacy",
      label: "📊 Efficacy Data",
      response: "Clinical Efficacy:\n\nOur treatment protocols are backed by extensive clinical research:\n\n• Dysport®: Proven efficacy in reducing moderate to severe frown lines\n• Restylane®: Clinically demonstrated results for facial volume and contouring\n• Sculptra®: Long-lasting results with gradual, natural-looking improvements\n\nFor detailed clinical study data and efficacy information, please consult with your healthcare provider."
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

  const addAssistantMessage = (content: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const assistantMessage: Message = {
        id: Date.now().toString(),
        type: "assistant",
        content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleQuickAction = (action: typeof quickActions[0]) => {
    addUserMessage(action.label.replace(" →", ""));
    addAssistantMessage(action.response);
  };

  const handleCategoryClick = (category: typeof categories[0]) => {
    addUserMessage(`Tell me about ${category.label}`);
    addAssistantMessage(category.response);
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

      {/* Interactive Dashboard */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-[440px] h-[650px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#4A5D7F] to-[#5B6D8F] p-5 text-white flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">ASPIRE Rewards Assistant</h3>
              <p className="text-xs text-white/80 mt-0.5">Online • Ready to help</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
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
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask about ASPIRE Rewards..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A5D7F] focus:border-transparent text-sm"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-[#4A5D7F] text-white p-2.5 rounded-xl hover:bg-[#3A4D6F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                aria-label="Send"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-center">
              Powered by ASPIRE Galderma Rewards
            </p>
          </div>
        </div>
      )}
    </>
  );
}
