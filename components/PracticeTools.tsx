"use client";

import { BarChart3, Users, DollarSign, BookOpen } from "lucide-react";

export default function PracticeTools() {
  const tools = [
    {
      icon: BarChart3,
      title: "Leverage Patient Insights",
      description: "Access customized data to help identify new patient opportunities and drive business.",
      gradient: "from-blue-50 to-cyan-50",
    },
    {
      icon: Users,
      title: "Cultivate Patient Relationships",
      description: "Send strategic, branded communications to help encourage engagement and support retention.",
      gradient: "from-purple-50 to-pink-50",
    },
    {
      icon: DollarSign,
      title: "Earn Savings",
      description: "Get valuable rebates for your practice and exclusive savings to extend to your patients.",
      gradient: "from-amber-50 to-orange-50",
    },
    {
      icon: BookOpen,
      title: "Utilize Treatment Resources",
      description: "Take advantage of educational assets to help support your patients in their aesthetic journey.",
      gradient: "from-emerald-50 to-teal-50",
    },
  ];

  return (
    <section className="relative bg-white py-24 lg:py-36 overflow-hidden wave-divider wave-divider-cream">
      {/* Subtle background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F5F1EC]/50 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <span className="inline-block text-[11px] font-semibold text-[#4A5D7F] uppercase tracking-[0.2em] mb-4">
            Your Toolkit
          </span>
          <h2 className="font-serif text-[#4A5D7F] text-4xl sm:text-5xl lg:text-[3.5rem] mb-5 leading-tight font-light">
            Unlock Powerful
            <br />
            <span className="font-normal">Practice Tools</span>
          </h2>
        </div>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div
                key={index}
                className="group relative bg-white border border-gray-100 rounded-3xl p-8 lg:p-10 card-lift shadow-luxury hover:shadow-luxury-hover transition-all duration-500"
              >
                {/* Hover gradient fill */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-700`} />

                <div className="relative space-y-5">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-[#F5F1EC] to-white rounded-2xl flex items-center justify-center shadow-sm border border-[#4A5D7F]/5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Icon className="w-8 h-8 text-[#4A5D7F]" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <h3 className="text-[#4A5D7F] text-xl font-semibold tracking-tight">
                    {tool.title}
                  </h3>
                  <p className="text-[#2C2C2C]/70 text-[15px] leading-relaxed font-light">
                    {tool.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="btn-primary text-white px-14 py-4.5 rounded-full text-sm font-semibold tracking-wider uppercase">
            ENROLL FOR ACCESS
          </button>
        </div>
      </div>
    </section>
  );
}
