"use client";

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
    <section className="bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Heading */}
        <h2 className="font-serif text-[#4A5D7F] text-4xl sm:text-5xl lg:text-6xl text-center mb-4 leading-tight">
          The Perks of
          <br />
          Membership
        </h2>
        <p className="text-[#2C2C2C] text-lg text-center mb-16 max-w-2xl mx-auto">
          Enjoy exclusive benefits designed to support your aesthetic journey
        </p>

        {/* Perks Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <div key={index} className="text-center space-y-4">
                {/* Icon */}
                <div className="w-20 h-20 mx-auto bg-[#F5F1EC] rounded-full flex items-center justify-center">
                  <Icon className="w-10 h-10 text-[#4A5D7F]" strokeWidth={2} />
                </div>

                <h3 className="text-[#4A5D7F] text-xl font-semibold">
                  {perk.title}
                </h3>
                <p className="text-[#2C2C2C] text-base leading-relaxed">
                  {perk.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Image Placeholder for "Perks" visual */}
        <div className="mt-16 rounded-2xl overflow-hidden shadow-xl">
          <div className="aspect-video bg-gradient-to-br from-[#E8D5C4] to-[#C4B5A0] flex items-center justify-center">
            <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg max-w-md">
              <p className="text-sm text-[#4A5D7F] font-medium mb-2">
                📱 Benefits Image Placeholder
              </p>
              <p className="text-xs text-gray-600">
                Lifestyle photo showing member using app or receiving treatment
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
