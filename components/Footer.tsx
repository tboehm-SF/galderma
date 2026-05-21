"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

export default function Footer() {
  const [dysportOpen, setDysportOpen] = useState(false);
  const [restylaneOpen, setRestylaneOpen] = useState(false);
  const [sculptraOpen, setSculptraOpen] = useState(false);

  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Product Safety Information Sections */}
      <div className="border-b border-gray-100">
        {/* Dysport Safety Info */}
        <div className="border-b border-gray-50">
          <button
            onClick={() => setDysportOpen(!dysportOpen)}
            className="w-full px-6 lg:px-10 py-4.5 flex items-center justify-between hover:bg-[#F5F1EC]/30 transition-colors duration-300 text-left group"
            aria-expanded={dysportOpen}
          >
            <span className="text-sm font-medium text-[#2C2C2C]/80 group-hover:text-[#4A5D7F] transition-colors duration-300">
              Please read full Important Safety Information for Dysport®
            </span>
            {dysportOpen ? (
              <ChevronUp className="w-4 h-4 text-[#4A5D7F] flex-shrink-0 transition-transform duration-300" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#4A5D7F] flex-shrink-0 group-hover:translate-y-0.5 transition-transform duration-300" />
            )}
          </button>

          {dysportOpen && (
            <div className="px-6 lg:px-10 py-6 bg-[#F5F1EC]/20 text-sm text-[#2C2C2C]/70 leading-relaxed space-y-4 border-t border-gray-50">
              <p className="font-semibold text-[#2C2C2C]">Important Safety Information for Dysport® (abobotulinumtoxinA)</p>
              <p className="font-light">
                This section contains important prescribing information, contraindications,
                warnings including Distant Spread of Toxin Effect Boxed Warning, and adverse reactions.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#" className="text-[#4A5D7F] hover:text-[#3A4D6F] inline-flex items-center gap-1.5 text-xs font-medium hover:underline underline-offset-4">
                  Full Prescribing Information <ExternalLink className="w-3 h-3" />
                </a>
                <a href="#" className="text-[#4A5D7F] hover:text-[#3A4D6F] inline-flex items-center gap-1.5 text-xs font-medium hover:underline underline-offset-4">
                  Medication Guide <ExternalLink className="w-3 h-3" />
                </a>
                <a href="#" className="text-[#4A5D7F] hover:text-[#3A4D6F] inline-flex items-center gap-1.5 text-xs font-medium hover:underline underline-offset-4">
                  DysportUSA.com <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Restylane Safety Info */}
        <div className="border-b border-gray-50">
          <button
            onClick={() => setRestylaneOpen(!restylaneOpen)}
            className="w-full px-6 lg:px-10 py-4.5 flex items-center justify-between hover:bg-[#F5F1EC]/30 transition-colors duration-300 text-left group"
            aria-expanded={restylaneOpen}
          >
            <span className="text-sm font-medium text-[#2C2C2C]/80 group-hover:text-[#4A5D7F] transition-colors duration-300">
              Please read full Important Safety Information for Restylane® products
            </span>
            {restylaneOpen ? (
              <ChevronUp className="w-4 h-4 text-[#4A5D7F] flex-shrink-0 transition-transform duration-300" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#4A5D7F] flex-shrink-0 group-hover:translate-y-0.5 transition-transform duration-300" />
            )}
          </button>

          {restylaneOpen && (
            <div className="px-6 lg:px-10 py-6 bg-[#F5F1EC]/20 text-sm text-[#2C2C2C]/70 leading-relaxed space-y-4 border-t border-gray-50">
              <p className="font-semibold text-[#2C2C2C]">Important Safety Information for Restylane® Dermal Fillers</p>
              <p className="font-light">
                Important safety information, indications, contraindications, and adverse reactions
                for the Restylane family of products.
              </p>
              <div className="pt-2">
                <a href="#" className="text-[#4A5D7F] hover:text-[#3A4D6F] inline-flex items-center gap-1.5 text-xs font-medium hover:underline underline-offset-4">
                  RestylaneUSA.com <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Sculptra Safety Info */}
        <div>
          <button
            onClick={() => setSculptraOpen(!sculptraOpen)}
            className="w-full px-6 lg:px-10 py-4.5 flex items-center justify-between hover:bg-[#F5F1EC]/30 transition-colors duration-300 text-left group"
            aria-expanded={sculptraOpen}
          >
            <span className="text-sm font-medium text-[#2C2C2C]/80 group-hover:text-[#4A5D7F] transition-colors duration-300">
              Please read full Important Safety Information for Sculptra® Aesthetic
            </span>
            {sculptraOpen ? (
              <ChevronUp className="w-4 h-4 text-[#4A5D7F] flex-shrink-0 transition-transform duration-300" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#4A5D7F] flex-shrink-0 group-hover:translate-y-0.5 transition-transform duration-300" />
            )}
          </button>

          {sculptraOpen && (
            <div className="px-6 lg:px-10 py-6 bg-[#F5F1EC]/20 text-sm text-[#2C2C2C]/70 leading-relaxed space-y-4 border-t border-gray-50">
              <p className="font-semibold text-[#2C2C2C]">Important Safety Information for Sculptra® Aesthetic</p>
              <p className="font-light">
                Important safety information, indications for use, contraindications, and adverse reactions.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#" className="text-[#4A5D7F] hover:text-[#3A4D6F] inline-flex items-center gap-1.5 text-xs font-medium hover:underline underline-offset-4">
                  Instructions for Use <ExternalLink className="w-3 h-3" />
                </a>
                <a href="#" className="text-[#4A5D7F] hover:text-[#3A4D6F] inline-flex items-center gap-1.5 text-xs font-medium hover:underline underline-offset-4">
                  SculptraUSA.com <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        {/* Brand mark */}
        <div className="text-center mb-10">
          <span className="text-lg font-light tracking-[0.3em] text-[#4A5D7F]/60">
            ASPIRE
          </span>
        </div>

        {/* Main Footer Links - Horizontal */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-8 text-[13px]">
          <a href="#" className="text-[#2C2C2C]/70 hover:text-[#4A5D7F] transition-colors duration-300 font-light">
            Prescribing Information
          </a>
          <a href="#" className="text-[#2C2C2C]/70 hover:text-[#4A5D7F] transition-colors duration-300 font-light">
            Legal
          </a>
          <a href="#" className="text-[#2C2C2C]/70 hover:text-[#4A5D7F] transition-colors duration-300 font-light">
            FAQ
          </a>
          <a href="#" className="text-[#2C2C2C]/70 hover:text-[#4A5D7F] transition-colors duration-300 font-light">
            Contact ASPIRE
          </a>
          <a href="#" className="text-[#2C2C2C]/70 hover:text-[#4A5D7F] transition-colors duration-300 font-light">
            Terms & Conditions
          </a>
        </div>

        {/* Secondary Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10 text-[13px]">
          <a href="#" className="text-[#2C2C2C]/50 hover:text-[#4A5D7F] transition-colors duration-300 font-light">
            About Galderma
          </a>
          <a href="#" className="text-[#2C2C2C]/50 hover:text-[#4A5D7F] transition-colors duration-300 font-light">
            Contact Galderma
          </a>
          <a href="#" className="text-[#2C2C2C]/50 hover:text-[#4A5D7F] transition-colors duration-300 font-light">
            Privacy Policy
          </a>
          <a href="#" className="text-[#2C2C2C]/50 hover:text-[#4A5D7F] transition-colors duration-300 font-light">
            Cookie Policy
          </a>
          <a href="#" className="text-[#2C2C2C]/50 hover:text-[#4A5D7F] transition-colors duration-300 font-light">
            Consumer Health Data Privacy Policy
          </a>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-100 text-center space-y-2">
          <p className="text-xs text-gray-400 font-light">
            © {new Date().getFullYear()} Galderma Laboratories, L.P. All rights reserved.
          </p>
          <p className="text-[11px] text-gray-300 font-light">
            Dysport®, Restylane®, and Sculptra® are registered trademarks of Galderma.
          </p>
        </div>
      </div>
    </footer>
  );
}
