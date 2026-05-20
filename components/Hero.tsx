"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#F5F1EC] pt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-6rem)]">
          {/* Left Content */}
          <div className="space-y-8 pt-12 lg:pt-0 z-10">
            <h1 className="font-serif text-[#4A5D7F] leading-[1.15]">
              <span className="block text-5xl sm:text-6xl lg:text-[4rem]">
                See the Results.
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-[4rem]">
                Get the
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-[4rem]">
                Rewards.
              </span>
            </h1>

            <p className="text-[#2C2C2C] text-lg sm:text-xl max-w-md leading-relaxed">
              ASPIRE Galderma Rewards is designed to support and reward you at
              every stage of your aesthetic journey.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-[#4A5D7F] text-white px-12 py-4 rounded-full text-sm font-semibold tracking-wider uppercase hover:bg-[#3A4D6F] transition-colors shadow-lg">
                JOIN NOW
              </button>
              <button className="bg-transparent border-2 border-[#4A5D7F] text-[#4A5D7F] px-12 py-4 rounded-full text-sm font-semibold tracking-wider uppercase hover:bg-[#4A5D7F] hover:text-white transition-colors">
                SIGN IN
              </button>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="relative h-[500px] lg:h-[700px] lg:absolute lg:right-0 lg:top-20 lg:w-[45%]">
            <div className="relative h-full w-full">
              {/* Hero Image */}
              <div className="absolute inset-0 rounded-t-[300px] overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero-patient.png"
                  alt="ASPIRE Galderma Rewards patient"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  quality={90}
                />
              </div>

              {/* Disclaimer text overlay */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-xs sm:text-sm text-center px-4 drop-shadow-lg z-10 bg-black/30 backdrop-blur-sm py-2 px-4 rounded-full">
                Actual patient. Individual results may vary.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
