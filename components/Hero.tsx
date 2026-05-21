"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#F5F1EC] pt-24 overflow-hidden grain-texture wave-divider">
      {/* Subtle radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#4A5D7F]/[0.03]" />

      {/* Decorative soft circles */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#4A5D7F]/[0.03] rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#C9A96E]/[0.04] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-full relative">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-6rem)]">
          {/* Left Content */}
          <div className="space-y-8 pt-12 lg:pt-0 z-10">
            {/* Subtle eyebrow text */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-[#4A5D7F]/10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4A5D7F] animate-pulse" />
              <span className="text-[11px] font-semibold text-[#4A5D7F] uppercase tracking-[0.15em]">
                Galderma Rewards Program
              </span>
            </div>

            <h1 className="font-serif text-[#4A5D7F] leading-[1.1]">
              <span className="block text-5xl sm:text-6xl lg:text-[4.5rem] font-light">
                See the Results.
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-[4.5rem] font-light mt-1">
                Get the
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-[4.5rem] font-light mt-1">
                <span className="gold-shimmer font-normal">Rewards.</span>
              </span>
            </h1>

            <p className="text-[#2C2C2C]/80 text-lg sm:text-xl max-w-md leading-relaxed font-light">
              ASPIRE Galderma Rewards is designed to support and reward you at
              every stage of your aesthetic journey.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="btn-primary text-white px-12 py-4 rounded-full text-sm font-semibold tracking-wider uppercase">
                JOIN NOW
              </button>
              <button className="btn-secondary text-[#4A5D7F] px-12 py-4 rounded-full text-sm font-semibold tracking-wider uppercase relative">
                <span className="relative z-10">SIGN IN</span>
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4A5D7F] to-[#5A6D8F] border-2 border-white flex items-center justify-center"
                  >
                    <span className="text-[9px] text-white font-semibold">
                      {["A", "M", "K", "S"][i - 1]}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#2C2C2C]/60 font-light">
                <span className="font-semibold text-[#4A5D7F]">500K+</span> active members
              </p>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="relative h-[500px] lg:h-[700px] lg:absolute lg:right-0 lg:top-20 lg:w-[45%]">
            <div className="relative h-full w-full">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-t-[320px] border border-[#4A5D7F]/10 hidden lg:block" />

              {/* Hero Image */}
              <div className="absolute inset-0 rounded-t-[300px] overflow-hidden shadow-luxury-xl">
                <Image
                  src="/images/hero-patient.png"
                  alt="ASPIRE Galderma Rewards patient"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  quality={90}
                />
                {/* Soft gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Disclaimer text overlay */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-xs text-center z-10 bg-black/20 backdrop-blur-md py-2 px-5 rounded-full border border-white/10">
                Actual patient. Individual results may vary.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
