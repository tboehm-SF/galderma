"use client";

export default function HCPHero() {
  return (
    <section className="relative min-h-screen pt-24 overflow-hidden grain-texture wave-divider">
      {/* Luxury background with warm cream tones */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F5F1EC] via-[#EDE7E0] to-[#F5F1EC]" />

      {/* Decorative flowing shapes */}
      <div className="absolute top-0 right-0 w-[60%] h-full">
        <div className="absolute inset-0 bg-gradient-to-l from-[#4A5D7F]/[0.04] to-transparent" />
        <svg className="absolute top-0 left-0 h-full w-full opacity-[0.04]" viewBox="0 0 800 1000" fill="none">
          <path d="M200 0C400 200 600 100 800 300C1000 500 700 600 800 800C900 1000 400 900 200 1000" stroke="#4A5D7F" strokeWidth="1" />
          <path d="M300 0C500 150 650 200 800 350C950 500 750 550 800 750" stroke="#4A5D7F" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Soft radial glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-white/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#C9A96E]/[0.03] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] text-center py-20">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-[#4A5D7F]/10 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4A5D7F] animate-pulse" />
            <span className="text-[11px] font-semibold text-[#4A5D7F] uppercase tracking-[0.15em]">
              For Healthcare Professionals
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-[#4A5D7F] leading-[1.05] mb-8">
            <span className="block text-6xl sm:text-7xl lg:text-[5.5rem] font-light">
              Build Your
            </span>
            <span className="block text-6xl sm:text-7xl lg:text-[5.5rem] font-light mt-2">
              <span className="gold-shimmer font-normal">Business</span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-[#2C2C2C]/70 text-lg sm:text-xl max-w-2xl leading-relaxed font-light mb-10">
            ASPIRE Galderma Practice Rewards* is a loyalty program unlike any other.
            Get valuable, business-building tools designed to position your practice
            for long-term success.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="btn-primary text-white px-14 py-4.5 rounded-full text-sm font-semibold tracking-wider uppercase">
              ENROLL TODAY
            </button>
            <button className="btn-secondary text-[#4A5D7F] px-14 py-4.5 rounded-full text-sm font-semibold tracking-wider uppercase relative">
              <span className="relative z-10">SIGN IN</span>
            </button>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-[#2C2C2C]/40 font-light">
            *Terms and Conditions apply. Enroll for more details.
          </p>
        </div>
      </div>
    </section>
  );
}
