"use client";

import { Menu, User } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        {/* Hamburger Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-[#4A5D7F]" strokeWidth={2} />
        </button>

        {/* Account Icon */}
        <button
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Account"
        >
          <User className="w-8 h-8 text-[#4A5D7F]" strokeWidth={2} />
        </button>
      </div>

      {/* Mobile Menu Drawer (placeholder for full implementation) */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="bg-white w-80 h-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Menu content would go here */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-[#4A5D7F]">Menu</h2>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
