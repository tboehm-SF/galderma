"use client";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Enroll",
      description: "Sign up for free and start earning points immediately",
    },
    {
      number: "2",
      title: "Earn",
      description: "Accumulate points with every qualifying aesthetic treatment",
    },
    {
      number: "3",
      title: "Redeem",
      description: "Use your points for rewards and exclusive offers",
    },
    {
      number: "4",
      title: "Repeat",
      description: "Continue your aesthetic journey and keep earning",
    },
  ];

  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Heading */}
        <h2 className="font-serif text-[#4A5D7F] text-4xl sm:text-5xl lg:text-6xl text-center mb-4 leading-tight">
          How It Works
        </h2>
        <p className="text-[#2C2C2C] text-lg text-center mb-16 max-w-2xl mx-auto">
          Start earning rewards in four simple steps
        </p>

        {/* Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center space-y-4">
              {/* Step Number */}
              <div className="w-20 h-20 mx-auto bg-[#4A5D7F] rounded-full flex items-center justify-center">
                <span className="text-4xl font-serif text-white">{step.number}</span>
              </div>

              <h3 className="text-[#4A5D7F] text-2xl font-semibold">
                {step.title}
              </h3>
              <p className="text-[#2C2C2C] text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="bg-[#4A5D7F] text-white px-12 py-4 rounded-full text-sm font-semibold tracking-wider uppercase hover:bg-[#3A4D6F] transition-colors shadow-lg">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
}
