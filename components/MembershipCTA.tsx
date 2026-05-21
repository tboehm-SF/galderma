"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function MembershipCTA() {
  const benefits = [
    "Customized patient data & insights",
    "Practice rebates & product discounts",
    "Patient savings you can extend",
    "Branded communications tools",
    "Educational treatment resources",
  ];

  return (
    <section className="relative bg-white py-24 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Premium CTA Card */}
        <div className="relative bg-gradient-to-br from-[#4A5D7F] to-[#3A4D6F] rounded-[2rem] p-12 lg:p-20 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C9A96E]/[0.05] rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`
          }} />

          {/* Gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <span className="inline-block text-[11px] font-semibold text-white/50 uppercase tracking-[0.2em] mb-4">
                Start Today
              </span>
              <h2 className="font-serif text-white text-4xl sm:text-5xl leading-tight font-light mb-6">
                Get More with Your
                <br />
                <span className="font-normal">Membership</span>
              </h2>
              <p className="text-white/70 text-lg font-light leading-relaxed mb-8">
                Enroll in ASPIRE Galderma Practice Rewards today.
              </p>

              <button className="group inline-flex items-center gap-3 bg-white text-[#4A5D7F] px-10 py-4.5 rounded-full text-sm font-semibold tracking-wider uppercase hover:scale-105 transition-all duration-300 shadow-xl">
                ENROLL NOW
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* Right - Benefits List */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4 hover:bg-white/[0.1] transition-colors duration-300"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#C9A96E] flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-white/90 text-[15px] font-light">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
