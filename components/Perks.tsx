"use client";

import Image from "next/image";
import { Gift, Star, DollarSign, Repeat } from "lucide-react";

export default function Perks() {
  const perks = [
    {
      icon: Star,
      title: "Earn Points",
      description: "Accumulate points with every qualifying Galderma aesthetic treatment",
    },
    {
      icon: Gift,
      title: "Exclusive Rewards",
      description: "Redeem points for special offers, savings, and exclusive benefits",
    },
    {
      icon: DollarSign,
      title: "Member Savings",
      description: "Access exclusive discounts and special pricing on select treatments",
    },
    {
      icon: Repeat,
      title: "Ongoing Benefits",
      description: "Continue earning rewards with each visit and treatment",
    },
  ];

  return (
    <section className="relative bg-white py-24 lg:py-36 overflow-hidden wave-divider wave-divider-cream">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F5F1EC]/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4A5D7F]/[0.02] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <span className="inline-block text-[11px] font-semibold text-[#4A5D7F] uppercase tracking-[0.2em] mb-4">
            Why Join
          </span>
          <h2 className="font-serif text-[#4A5D7F] text-4xl sm:text-5xl lg:text-[3.5rem] mb-5 leading-tight font-light">
            The Perks of
            <br />
            <span className="font-normal">Membership</span>
          </h2>
          <p className="text-[#2C2C2C]/70 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Enjoy exclusive benefits designed to support your aesthetic journey
          </p>
        </div>

        {/* Perks Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <div
                key={index}
                className="group text-center space-y-5 p-8 rounded-3xl bg-white border border-gray-100 card-lift shadow-luxury hover:shadow-luxury-hover cursor-default"
              >
                {/* Icon */}
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#F5F1EC] to-white rounded-2xl flex items-center justify-center shadow-sm border border-[#4A5D7F]/5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Icon className="w-9 h-9 text-[#4A5D7F]" strokeWidth={1.5} />
                </div>

                <h3 className="text-[#4A5D7F] text-xl font-semibold tracking-tight">
                  {perk.title}
                </h3>
                <p className="text-[#2C2C2C]/70 text-[15px] leading-relaxed font-light">
                  {perk.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Treatment Areas Visual */}
        <div className="mt-20 rounded-3xl overflow-hidden shadow-luxury-xl bg-white border border-gray-100">
          <div className="relative aspect-video">
            <Image
              src="/images/treatment-areas.png"
              alt="ASPIRE eligible treatment areas"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
              quality={90}
            />
          </div>
          <div className="p-8 bg-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-lg font-semibold text-[#4A5D7F] mb-2 tracking-tight">
                  Eligible Treatment Areas
                </h4>
                <p className="text-sm text-[#2C2C2C]/70 leading-relaxed font-light">
                  Earn points on qualifying treatments across multiple facial zones including
                  frown lines, cheeks, lips, and more.
                </p>
              </div>
              <button className="flex-shrink-0 px-5 py-2.5 text-xs font-semibold text-[#4A5D7F] border border-[#4A5D7F]/20 rounded-full hover:bg-[#4A5D7F] hover:text-white transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
