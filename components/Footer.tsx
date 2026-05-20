"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

export default function Footer() {
  const [dysportOpen, setDysportOpen] = useState(false);
  const [restylaneOpen, setRestylaneOpen] = useState(false);
  const [sculptraOpen, setSculptraOpen] = useState(false);

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Product Safety Information Sections */}
      <div className="border-b border-gray-200">
        {/* Dysport Safety Info */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => setDysportOpen(!dysportOpen)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
            aria-expanded={dysportOpen}
          >
            <span className="text-sm font-medium text-[#2C2C2C]">
              Please read full Important Safety Information for Dysport®
            </span>
            {dysportOpen ? (
              <ChevronUp className="w-5 h-5 text-[#4A5D7F] flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#4A5D7F] flex-shrink-0" />
            )}
          </button>

          {dysportOpen && (
            <div className="px-6 py-6 bg-gray-50 text-sm text-[#2C2C2C] leading-relaxed space-y-4">
              <p className="font-semibold">Important Safety Information for Dysport® (abobotulinumtoxinA)</p>
              <p>
                This section contains important prescribing information, contraindications,
                warnings including Distant Spread of Toxin Effect Boxed Warning, and adverse reactions.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#" className="text-[#4A5D7F] hover:underline inline-flex items-center gap-1">
                  Full Prescribing Information <ExternalLink className="w-4 h-4" />
                </a>
                <a href="#" className="text-[#4A5D7F] hover:underline inline-flex items-center gap-1">
                  Medication Guide <ExternalLink className="w-4 h-4" />
                </a>
                <a href="#" className="text-[#4A5D7F] hover:underline inline-flex items-center gap-1">
                  DysportUSA.com <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Restylane Safety Info */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => setRestylaneOpen(!restylaneOpen)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
            aria-expanded={restylaneOpen}
          >
            <span className="text-sm font-medium text-[#2C2C2C]">
              Please read full Important Safety Information for Restylane® products
            </span>
            {restylaneOpen ? (
              <ChevronUp className="w-5 h-5 text-[#4A5D7F] flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#4A5D7F] flex-shrink-0" />
            )}
          </button>

          {restylaneOpen && (
            <div className="px-6 py-6 bg-gray-50 text-sm text-[#2C2C2C] leading-relaxed space-y-4">
              <p className="font-semibold">Important Safety Information for Restylane® Dermal Fillers</p>
              <p>
                Important safety information, indications, contraindications, and adverse reactions
                for the Restylane family of products.
              </p>
              <div className="pt-2">
                <a href="#" className="text-[#4A5D7F] hover:underline inline-flex items-center gap-1">
                  RestylaneUSA.com <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Sculptra Safety Info */}
        <div>
          <button
            onClick={() => setSculptraOpen(!sculptraOpen)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
            aria-expanded={sculptraOpen}
          >
            <span className="text-sm font-medium text-[#2C2C2C]">
              Please read full Important Safety Information for Sculptra® Aesthetic
            </span>
            {sculptraOpen ? (
              <ChevronUp className="w-5 h-5 text-[#4A5D7F] flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#4A5D7F] flex-shrink-0" />
            )}
          </button>

          {sculptraOpen && (
            <div className="px-6 py-6 bg-gray-50 text-sm text-[#2C2C2C] leading-relaxed space-y-4">
              <p className="font-semibold">Important Safety Information for Sculptra® Aesthetic</p>
              <p>
                Important safety information, indications for use, contraindications, and adverse reactions.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#" className="text-[#4A5D7F] hover:underline inline-flex items-center gap-1">
                  Instructions for Use <ExternalLink className="w-4 h-4" />
                </a>
                <a href="#" className="text-[#4A5D7F] hover:underline inline-flex items-center gap-1">
                  SculptraUSA.com <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Links - Horizontal */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-8 text-sm">
          <a href="#" className="text-[#2C2C2C] hover:text-[#4A5D7F] transition-colors">
            Prescribing Information
          </a>
          <span className="text-gray-300">|</span>
          <a href="#" className="text-[#2C2C2C] hover:text-[#4A5D7F] transition-colors">
            Legal
          </a>
          <span className="text-gray-300">|</span>
          <a href="#" className="text-[#2C2C2C] hover:text-[#4A5D7F] transition-colors">
            FAQ
          </a>
          <span className="text-gray-300">|</span>
          <a href="#" className="text-[#2C2C2C] hover:text-[#4A5D7F] transition-colors">
            Contact ASPIRE
          </a>
          <span className="text-gray-300">|</span>
          <a href="#" className="text-[#2C2C2C] hover:text-[#4A5D7F] transition-colors">
            Terms & Conditions
          </a>
        </div>

        {/* Secondary Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-8 text-sm">
          <a href="#" className="text-[#2C2C2C] hover:text-[#4A5D7F] transition-colors">
            About Galderma
          </a>
          <span className="text-gray-300">|</span>
          <a href="#" className="text-[#2C2C2C] hover:text-[#4A5D7F] transition-colors">
            Contact Galderma
          </a>
          <span className="text-gray-300">|</span>
          <a href="#" className="text-[#2C2C2C] hover:text-[#4A5D7F] transition-colors">
            Privacy Policy
          </a>
          <span className="text-gray-300">|</span>
          <a href="#" className="text-[#2C2C2C] hover:text-[#4A5D7F] transition-colors">
            Cookie Policy
          </a>
          <span className="text-gray-300">|</span>
          <a href="#" className="text-[#2C2C2C] hover:text-[#4A5D7F] transition-colors">
            Consumer Health Data Privacy Policy
          </a>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-gray-200 text-xs text-gray-600 text-center space-y-2">
          <p>© {new Date().getFullYear()} Galderma Laboratories, L.P. All rights reserved.</p>
          <p className="text-gray-500">
            Dysport®, Restylane®, and Sculptra® are registered trademarks of Galderma.
          </p>
        </div>
      </div>
    </footer>
  );
}
