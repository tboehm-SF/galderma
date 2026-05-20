"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Footer() {
  const [safetyInfoOpen, setSafetyInfoOpen] = useState(false);

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Safety Information Expandable */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => setSafetyInfoOpen(!safetyInfoOpen)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          aria-expanded={safetyInfoOpen}
        >
          <span className="text-sm font-medium text-[#2C2C2C]">
            Please read full Important Safety Information for Dysport
          </span>
          {safetyInfoOpen ? (
            <ChevronUp className="w-5 h-5 text-[#4A5D7F]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[#4A5D7F]" />
          )}
        </button>

        {safetyInfoOpen && (
          <div className="px-6 py-6 bg-gray-50 text-sm text-[#2C2C2C] leading-relaxed space-y-4">
            <p className="font-semibold">Important Safety Information</p>
            <p>
              This expandable section would contain the full prescribing
              information, contraindications, warnings, and safety data for
              Dysport and other products, including Distant Spread of Toxin
              Effect Boxed Warning.
            </p>
          </div>
        )}
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-[#4A5D7F] mb-3">About</h3>
            <ul className="space-y-2 text-sm text-[#2C2C2C]">
              <li>
                <a href="#" className="hover:text-[#4A5D7F] transition-colors">
                  Program Details
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#4A5D7F] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#4A5D7F] transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#4A5D7F] mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-[#2C2C2C]">
              <li>
                <a href="#" className="hover:text-[#4A5D7F] transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#4A5D7F] transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#4A5D7F] mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-[#2C2C2C]">
              <li>
                <a href="#" className="hover:text-[#4A5D7F] transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#4A5D7F] transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#4A5D7F] mb-3">Connect</h3>
            <ul className="space-y-2 text-sm text-[#2C2C2C]">
              <li>
                <a href="#" className="hover:text-[#4A5D7F] transition-colors">
                  Social Media
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 text-xs text-gray-600 text-center">
          <p>© {new Date().getFullYear()} Galderma. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
