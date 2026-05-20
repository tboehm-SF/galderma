"use client";

import { Menu, User, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: "How It Works", href: "#" },
    { label: "Program Benefits", href: "#" },
    { label: "Eligible Treatments", href: "#" },
    { label: "Find a Provider", href: "#" },
    { label: "FAQs", href: "#" },
    { label: "Contact Us", href: "#" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      {/* Demo Purposes Badge */}
      <div className="absolute top-2 left-2 bg-amber-100 border border-amber-300 px-3 py-1 rounded-md z-50">
        <span className="text-xs font-semibold text-amber-800 uppercase tracking-wide">
          Demo Purposes
        </span>
      </div>

      <div className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        {/* Hamburger Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors z-50"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-[#4A5D7F]" strokeWidth={2} />
        </button>

        {/* ASPIRE Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="text-2xl font-light tracking-[0.3em] text-[#4A5D7F]">
            ASPIRE
          </span>
        </div>

        {/* Account Icon */}
        <button
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Account"
        >
          <User className="w-8 h-8 text-[#4A5D7F]" strokeWidth={2} />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 shadow-2xl overflow-y-auto">
            {/* Menu Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
              <span className="text-xl font-light tracking-[0.2em] text-[#4A5D7F]">
                ASPIRE
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-[#4A5D7F]" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="py-6">
              <ul className="space-y-1">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="block px-6 py-3 text-base text-[#2C2C2C] hover:bg-[#F5F1EC] hover:text-[#4A5D7F] transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* CTA Buttons in Menu */}
              <div className="mt-8 px-6 space-y-3">
                <button className="w-full bg-[#4A5D7F] text-white px-6 py-3 rounded-full text-sm font-semibold uppercase hover:bg-[#3A4D6F] transition-colors">
                  Join Now
                </button>
                <button className="w-full border-2 border-[#4A5D7F] text-[#4A5D7F] px-6 py-3 rounded-full text-sm font-semibold uppercase hover:bg-[#4A5D7F] hover:text-white transition-colors">
                  Sign In
                </button>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
