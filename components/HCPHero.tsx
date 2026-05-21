"use client";

import Image from "next/image";
import Link from "next/link";

export default function HCPHero() {
  return (
    <section className="relative min-h-screen pt-24 overflow-hidden wave-divider">
      {/* Background pattern image */}
      <div className="absolute inset-0">
        <Image
          src="/images/bg-pattern.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F1EC]/40 via-transparent to-[#F5F1EC]/80" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-6rem)] py-20">
          {/* Left — Content */}
          <div className="flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-[#4A5D7F]/10 mb-8 w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4A5D7F] animate-pulse" />
              <span className="text-[11px] font-semibold text-[#4A5D7F] uppercase tracking-[0.15em]">
                For Healthcare Professionals
              </span>
            </div>

            {/* Galderma Logo */}
            <Image
              src="/images/galderma-logo-gold.png"
              alt="Galderma"
              width={160}
              height={40}
              className="mb-6 opacity-80"
            />

            {/* Main Heading */}
            <h1 className="font-serif text-[#4A5D7F] leading-[1.05] mb-8">
              <span className="block text-5xl sm:text-6xl lg:text-[4.5rem] font-light">
                Build Your
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-[4.5rem] font-light mt-2">
                <span className="gold-shimmer font-normal">Business</span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-[#2C2C2C]/70 text-lg max-w-lg leading-relaxed font-light mb-10">
              ASPIRE Galderma Practice Rewards* is a loyalty program unlike any other.
              Get valuable, business-building tools designed to position your practice
              for long-term success.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/register" className="btn-primary text-white px-12 py-4 rounded-full text-sm font-semibold tracking-wider uppercase text-center">
                Enroll Today
              </Link>
              <Link href="/login" className="btn-secondary text-[#4A5D7F] px-12 py-4 rounded-full text-sm font-semibold tracking-wider uppercase relative text-center">
                <span className="relative z-10">Sign In</span>
              </Link>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-[#2C2C2C]/40 font-light">
              *Terms and Conditions apply. Enroll for more details.
            </p>
          </div>

          {/* Right — Treatment Photo */}
          <div className="hidden lg:block relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] max-h-[600px]">
              <Image
                src="/images/hero-treatment.jpg"
                alt="Aesthetic treatment in a clinical setting"
                fill
                className="object-cover"
                priority
              />
              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A5D7F]/10 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg border border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-0.5">Trusted by</p>
              <p className="text-lg font-semibold text-[#4A5D7F]">15,000+ Practices</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
