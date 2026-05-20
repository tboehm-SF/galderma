"use client";

import { MessageCircle } from "lucide-react";
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

  const openQualified = () => {
    if (window.qualified) {
      // Open the Qualified messenger
      window.qualified("messenger", "open");
    }
  };

  return (
    <button
      onClick={openQualified}
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
  );
}
