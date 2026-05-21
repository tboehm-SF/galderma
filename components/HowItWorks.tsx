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
    <section className="relative bg-[#F5F1EC] py-24 lg:py-36 overflow-hidden grain-texture wave-divider">
      {/* Background decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <span className="inline-block text-[11px] font-semibold text-[#4A5D7F] uppercase tracking-[0.2em] mb-4">
            Getting Started
          </span>
          <h2 className="font-serif text-[#4A5D7F] text-4xl sm:text-5xl lg:text-[3.5rem] mb-5 leading-tight font-light">
            How It <span className="font-normal">Works</span>
          </h2>
          <p className="text-[#2C2C2C]/70 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Start earning rewards in four simple steps
          </p>
        </div>

        {/* Steps Grid with Timeline */}
        <div className="relative">
          {/* Connecting Line (desktop only) */}
          <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-transparent via-[#4A5D7F]/20 to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center space-y-5 group">
                {/* Step Number Circle */}
                <div className="relative z-10 w-20 h-20 mx-auto">
                  {/* Outer ring on hover */}
                  <div className="absolute inset-0 rounded-full border-2 border-[#4A5D7F]/0 group-hover:border-[#4A5D7F]/20 scale-100 group-hover:scale-125 transition-all duration-700" />

                  {/* Main circle */}
                  <div className="relative w-20 h-20 bg-gradient-to-br from-[#4A5D7F] to-[#3A4D6F] rounded-full flex items-center justify-center shadow-luxury group-hover:shadow-luxury-hover transition-all duration-500 group-hover:scale-110">
                    <span className="text-3xl font-serif text-white font-light">
                      {step.number}
                    </span>
                  </div>
                </div>

                <h3 className="text-[#4A5D7F] text-2xl font-serif font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[#2C2C2C]/70 text-[15px] leading-relaxed font-light max-w-[200px] mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <button className="btn-primary text-white px-14 py-4.5 rounded-full text-sm font-semibold tracking-wider uppercase">
            Get Started Today
          </button>
          <p className="text-xs text-[#2C2C2C]/50 mt-4 font-light">
            Free to join • No credit card required
          </p>
        </div>
      </div>
    </section>
  );
}
