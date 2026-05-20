"use client";

export default function Perks() {
  const perks = [
    {
      title: "Earn Points",
      description: "Accumulate points with every qualifying treatment",
    },
    {
      title: "Exclusive Rewards",
      description: "Redeem points for special offers and benefits",
    },
    {
      title: "Member Savings",
      description: "Access exclusive discounts on treatments",
    },
    {
      title: "Repeat Benefits",
      description: "Continue earning with each visit",
    },
  ];

  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Heading */}
        <h2 className="font-serif text-[#4A5D7F] text-4xl sm:text-5xl lg:text-6xl text-center mb-16 leading-tight">
          The Perks of
          <br />
          Membership
        </h2>

        {/* Perks Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {perks.map((perk, index) => (
            <div key={index} className="text-center space-y-4">
              {/* Icon placeholder */}
              <div className="w-20 h-20 mx-auto bg-[#F5F1EC] rounded-full flex items-center justify-center">
                <div className="w-10 h-10 bg-[#4A5D7F] rounded-full"></div>
              </div>

              <h3 className="text-[#4A5D7F] text-xl font-semibold">
                {perk.title}
              </h3>
              <p className="text-[#2C2C2C] text-base leading-relaxed">
                {perk.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
