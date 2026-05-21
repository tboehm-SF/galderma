"use client";

import { TrendingUp, Gift, Percent, Users } from "lucide-react";

export default function HowItAddsUp() {
  const valueProps = [
    {
      icon: Percent,
      label: "Product Discounts",
      description: "Exclusive pricing on Galderma aesthetic products",
    },
    {
      icon: Gift,
      label: "Valuable Rebates",
      description: "Earn back on qualifying purchases for your practice",
    },
    {
      icon: TrendingUp,
      label: "Business Growth",
      description: "Tools that drive engagement and grow your patient base",
    },
    {
      icon: Users,
      label: "Patient Savings",
      description: "Extend exclusive savings to patients across the portfolio",
    },
  ];

  return (
    <section className="relative bg-[#F5F1EC] py-24 lg:py-36 overflow-hidden grain-texture wave-divider">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-white/30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] font-semibold text-[#4A5D7F] uppercase tracking-[0.2em] mb-4">
            Value Proposition
          </span>
          <h2 className="font-serif text-[#4A5D7F] text-4xl sm:text-5xl lg:text-[3.5rem] mb-6 leading-tight font-light">
            How It All <span className="font-normal">Adds Up</span>
          </h2>
          <p className="text-[#2C2C2C]/70 text-lg max-w-3xl mx-auto font-light leading-relaxed">
            When you join ASPIRE, you automatically unlock valuable product discounts,
            rebates and rewards. Plus, you can offer patients significant savings across
            the Galderma aesthetic portfolio to drive engagement and grow your business.
          </p>
        </div>

        {/* Value Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group text-center p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white shadow-luxury hover:shadow-luxury-hover card-lift transition-all duration-500"
              >
                <div className="w-14 h-14 mx-auto mb-5 bg-gradient-to-br from-[#4A5D7F] to-[#3A4D6F] rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>

                <h3 className="text-[#4A5D7F] text-base font-semibold mb-2 tracking-tight">
                  {item.label}
                </h3>
                <p className="text-[#2C2C2C]/60 text-sm font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
