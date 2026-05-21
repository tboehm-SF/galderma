"use client";

import { Stethoscope, Users, TrendingUp, Quote } from "lucide-react";

export default function HCPBenefits() {
  const benefits = [
    {
      icon: Users,
      title: "Patient Loyalty",
      description: "Strengthen patient relationships with a program that rewards their continued trust",
    },
    {
      icon: TrendingUp,
      title: "Practice Growth",
      description: "Drive repeat visits and increase patient lifetime value with built-in incentives",
    },
    {
      icon: Stethoscope,
      title: "Wide Portfolio",
      description: "Access Galderma's comprehensive range of aesthetic products to serve diverse needs",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-[#4A5D7F] to-[#3A4D6F] py-24 lg:py-36 overflow-hidden">
      {/* Background texture and decorative elements */}
      <div className="absolute inset-0 grain-texture opacity-40" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C9A96E]/[0.05] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-white/60 uppercase tracking-[0.2em] mb-4">
            <Stethoscope className="w-3.5 h-3.5" strokeWidth={1.5} />
            For Providers
          </span>
          <h2 className="font-serif text-white text-4xl sm:text-5xl lg:text-[3.5rem] mb-5 leading-tight font-light">
            Premier Benefits for
            <br />
            <span className="font-normal">Healthcare Professionals</span>
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto font-light leading-relaxed">
            ASPIRE provides value to Healthcare Professionals who purchase Galderma
            aesthetic products by providing a unique consumer loyalty program and a wide
            portfolio of aesthetic products that can help strengthen their practices.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/[0.1] hover:border-white/20 transition-all duration-500 card-lift"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />

                <div className="relative space-y-4">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-white/15 transition-all duration-500">
                    <Icon className="w-7 h-7 text-white/80" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-white text-xl font-semibold tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-white/60 text-[15px] leading-relaxed font-light">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Value Proposition */}
        <div className="text-center mb-16">
          <p className="text-white/70 text-base max-w-3xl mx-auto font-light leading-relaxed">
            ASPIRE offers numerous opportunities for savings for Healthcare Professionals –
            while enhancing the connections they share with their patients.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white/[0.08] backdrop-blur-md border border-white/10 rounded-3xl p-10 lg:p-14 overflow-hidden">
            {/* Decorative quote mark */}
            <div className="absolute top-6 left-8 lg:top-8 lg:left-12">
              <Quote className="w-10 h-10 text-[#C9A96E]/30" strokeWidth={1} />
            </div>

            {/* Gold accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

            <div className="relative">
              <blockquote className="text-white/90 text-lg lg:text-xl leading-relaxed font-light italic mb-8 pl-4 border-l-2 border-[#C9A96E]/30">
                &ldquo;Galderma&apos;s new program offers significant flexibility, allowing each
                healthcare practitioner to provide clients with value in the way that best
                fits their needs. This program allows us the opportunity to thank our most
                loyal patients with convenient tools and helpful information alongside their
                beneficial discounts. When we can work together to increase client
                satisfaction, everyone benefits.&rdquo;
              </blockquote>

              <div className="flex items-center gap-4 pl-4">
                {/* Avatar placeholder */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A96E]/40 to-[#C9A96E]/20 border border-[#C9A96E]/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-white/90 font-serif text-lg">MG</span>
                </div>

                <div>
                  <p className="text-white font-semibold text-sm">
                    Dr. Mitchel P. Goldman
                  </p>
                  <p className="text-white/50 text-xs font-light leading-snug mt-0.5">
                    Founder & Director, Cosmetic Laser Dermatology
                    <br />
                    San Diego, California
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
