"use client";

import { MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    qualified?: {
      (command: string, ...args: any[]): void;
      q?: any[];
    };
  }
}

export default function QualifiedButton() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Check if Qualified is loaded
    const checkQualified = setInterval(() => {
      if (window.qualified) {
        setIsLoaded(true);
        clearInterval(checkQualified);
      }
    }, 100);

    // Cleanup
    return () => clearInterval(checkQualified);
  }, []);

  useEffect(() => {
    if (isExpanded && window.qualified) {
      // Open the Qualified messenger when panel expands
      window.qualified("messenger", "open");
    } else if (!isExpanded && window.qualified) {
      // Close the messenger when panel collapses
      window.qualified("messenger", "close");
    }
  }, [isExpanded]);

  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Floating Button */}
      {!isExpanded && (
        <button
          onClick={togglePanel}
          disabled={!isLoaded}
          className="fixed bottom-6 right-6 z-50 bg-[#4A5D7F] text-white p-4 rounded-full shadow-2xl hover:bg-[#3A4D6F] transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group"
          aria-label="Contact Galderma Support"
          title="Chat with us"
        >
          <MessageCircle className="w-6 h-6" />

          {/* Tooltip */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat with Galderma
          </span>

          {/* Pulse effect when loaded */}
          {isLoaded && (
            <span className="absolute inset-0 rounded-full bg-[#4A5D7F] animate-ping opacity-25"></span>
          )}
        </button>
      )}

      {/* Expanded Panel */}
      {isExpanded && (
        <div className="fixed bottom-6 right-6 z-50 w-[440px] h-[650px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#4A5D7F] to-[#5B6D8F] p-5 text-white flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Galderma Support</h3>
              <p className="text-xs text-white/80 mt-0.5">We're here to help</p>
            </div>
            <button
              onClick={togglePanel}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Qualified Widget Container */}
          <div className="flex-1 relative bg-gray-50" id="qualified-messenger-container">
            {/* Qualified will inject its messenger here */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-6">
                <MessageCircle className="w-12 h-12 text-[#4A5D7F] mx-auto mb-3" />
                <p className="text-sm text-gray-600">
                  Loading Galderma Support...
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Qualified messenger will appear here
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <p className="text-[10px] text-gray-400 text-center">
              Powered by Qualified • Galderma Support
            </p>
          </div>
        </div>
      )}
    </>
  );
}
