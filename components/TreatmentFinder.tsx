"use client";

import { Search, MapPin } from "lucide-react";
import { useState } from "react";

export default function TreatmentFinder() {
  const [location, setLocation] = useState("");
  const [zipCode, setZipCode] = useState("");

  return (
    <section className="relative bg-white py-24 lg:py-36 overflow-hidden">
      {/* Premium background treatment */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#F5F1EC]/30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#4A5D7F]/[0.02] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <span className="inline-block text-[11px] font-semibold text-[#4A5D7F] uppercase tracking-[0.2em] mb-4">
            Locate a Provider
          </span>
          <h2 className="font-serif text-[#4A5D7F] text-4xl sm:text-5xl lg:text-[3.5rem] mb-5 leading-tight font-light">
            Find a <span className="font-normal">Provider</span>
          </h2>
          <p className="text-[#2C2C2C]/70 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Locate participating providers near you
          </p>
        </div>

        {/* Search Form - Premium Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-luxury-xl p-10 border border-gray-100 relative overflow-hidden">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#F5F1EC] to-transparent rounded-bl-3xl" />

            <div className="space-y-7 relative">
              {/* Location Input */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-xs font-semibold text-[#4A5D7F] mb-2.5 uppercase tracking-wider"
                >
                  City, State or Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A5D7F]/40" />
                  <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your location"
                    className="w-full pl-11 pr-4 py-4 border border-gray-200 rounded-xl focus:border-[#4A5D7F] focus:ring-2 focus:ring-[#4A5D7F]/10 focus:outline-none transition-all duration-300 text-[15px] bg-[#FAFAFA] hover:bg-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Zip Code Input */}
              <div>
                <label
                  htmlFor="zipcode"
                  className="block text-xs font-semibold text-[#4A5D7F] mb-2.5 uppercase tracking-wider"
                >
                  Zip Code
                </label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    id="zipcode"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="12345"
                    maxLength={5}
                    className="flex-1 px-4 py-4 border border-gray-200 rounded-xl focus:border-[#4A5D7F] focus:ring-2 focus:ring-[#4A5D7F]/10 focus:outline-none transition-all duration-300 text-[15px] bg-[#FAFAFA] hover:bg-white placeholder:text-gray-400"
                  />
                  <button className="btn-primary text-white px-8 py-4 rounded-xl font-semibold uppercase text-sm tracking-wider flex items-center gap-2.5">
                    <Search className="w-4 h-4" strokeWidth={2} />
                    Search
                  </button>
                </div>
              </div>

              {/* Quick location suggestions */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs text-gray-400 font-medium self-center mr-1">Popular:</span>
                {["New York, NY", "Los Angeles, CA", "Miami, FL", "Chicago, IL"].map((city) => (
                  <button
                    key={city}
                    className="px-3.5 py-1.5 text-xs text-[#4A5D7F] bg-[#F5F1EC]/60 hover:bg-[#F5F1EC] rounded-full transition-colors duration-300 font-medium"
                    onClick={() => setLocation(city)}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
