"use client";

import { Menu, User, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isPatientPage = pathname === "/patients";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = isPatientPage
    ? [
        { label: "How It Works", href: "#" },
        { label: "Program Benefits", href: "#" },
        { label: "Eligible Treatments", href: "#" },
        { label: "Find a Provider", href: "#" },
        { label: "For Providers", href: "/" },
        { label: "FAQs", href: "#" },
        { label: "Contact Us", href: "#" },
      ]
    : [
        { label: "Practice Tools", href: "#" },
        { label: "Savings & Rebates", href: "#" },
        { label: "How It Works", href: "#" },
        { label: "For Patients", href: "/patients" },
        { label: "Prescribing Information", href: "#" },
        { label: "Contact Us", href: "#" },
      ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "header-glass-scrolled py-3"
          : "header-glass py-5"
      }`}
    >
      {/* Demo Purposes Badge */}
      <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md border border-gray-200/60 px-3 py-1.5 rounded-full shadow-sm z-50">
        <span className="text-[10px] font-medium text-gray-400 tracking-wider uppercase">
          Demo Preview
        </span>
      </div>

      <div className="flex items-center justify-between px-6 lg:px-10 max-w-7xl mx-auto">
        {/* Hamburger Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2.5 hover:bg-[#4A5D7F]/5 rounded-xl transition-all duration-300 z-50 group"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-[#4A5D7F] group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
        </button>

        {/* ASPIRE Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/" className="block">
            <span className="text-2xl font-light tracking-[0.35em] text-[#4A5D7F] transition-all duration-300 hover:tracking-[0.4em]">
              ASPIRE
            </span>
          </Link>
        </div>

        {/* Account & CTA */}
        <div className="flex items-center gap-3">
          {/* Page Toggle */}
          <div className="hidden md:flex items-center bg-[#F5F1EC]/60 rounded-full p-1 border border-[#4A5D7F]/10">
            <Link
              href="/"
              className={`px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 ${
                !isPatientPage
                  ? "bg-[#4A5D7F] text-white shadow-sm"
                  : "text-[#4A5D7F]/70 hover:text-[#4A5D7F]"
              }`}
            >
              Providers
            </Link>
            <Link
              href="/patients"
              className={`px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 ${
                isPatientPage
                  ? "bg-[#4A5D7F] text-white shadow-sm"
                  : "text-[#4A5D7F]/70 hover:text-[#4A5D7F]"
              }`}
            >
              Patients
            </Link>
          </div>

          <Link
            href={isPatientPage ? "/register" : "/register"}
            className={`hidden sm:inline-flex px-5 py-2 text-xs font-semibold tracking-wider uppercase rounded-full transition-all duration-400 ${
              scrolled
                ? "btn-primary text-white"
                : "border border-[#4A5D7F]/30 text-[#4A5D7F] hover:bg-[#4A5D7F] hover:text-white hover:border-[#4A5D7F]"
            }`}
          >
            {isPatientPage ? "Join Now" : "Enroll"}
          </Link>
          <button
            className="p-2.5 hover:bg-[#4A5D7F]/5 rounded-xl transition-all duration-300 group"
            aria-label="Account"
          >
            <User className="w-5 h-5 text-[#4A5D7F] group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={() => setMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="fixed left-0 top-0 bottom-0 w-80 bg-white/95 backdrop-blur-xl z-50 shadow-luxury-xl overflow-y-auto">
            {/* Menu Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100">
              <span className="text-xl font-light tracking-[0.25em] text-[#4A5D7F]">
                ASPIRE
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 hover:bg-[#4A5D7F]/5 rounded-xl transition-all duration-300"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-[#4A5D7F]" strokeWidth={1.5} />
              </button>
            </div>

            {/* Page Toggle (Mobile) */}
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center bg-[#F5F1EC]/60 rounded-full p-1">
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className={`flex-1 text-center px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    !isPatientPage
                      ? "bg-[#4A5D7F] text-white shadow-sm"
                      : "text-[#4A5D7F]/70"
                  }`}
                >
                  Providers
                </Link>
                <Link
                  href="/patients"
                  onClick={() => setMenuOpen(false)}
                  className={`flex-1 text-center px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    isPatientPage
                      ? "bg-[#4A5D7F] text-white shadow-sm"
                      : "text-[#4A5D7F]/70"
                  }`}
                >
                  Patients
                </Link>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="py-6">
              <ul className="space-y-1">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    {item.href.startsWith("/") ? (
                      <Link
                        href={item.href}
                        className="block px-8 py-3.5 text-[15px] text-[#4A5D7F] font-medium hover:bg-[#F5F1EC] hover:pl-10 transition-all duration-300"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="block px-8 py-3.5 text-[15px] text-[#2C2C2C] hover:bg-[#F5F1EC] hover:text-[#4A5D7F] hover:pl-10 transition-all duration-300 font-light"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>

              {/* CTA Buttons in Menu */}
              <div className="mt-10 px-8 space-y-3">
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center btn-primary text-white px-6 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider"
                >
                  {isPatientPage ? "Join Now" : "Enroll Today"}
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center border-2 border-[#4A5D7F] text-[#4A5D7F] px-6 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-[#4A5D7F] hover:text-white transition-colors duration-300"
                >
                  Sign In
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
