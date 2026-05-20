"use client";

import { Search } from "lucide-react";
import { useState } from "react";

export default function TreatmentFinder() {
  const [location, setLocation] = useState("");
  const [zipCode, setZipCode] = useState("");

  return (
    <section className="bg-[#F5F1EC] py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Heading */}
        <h2 className="font-serif text-[#4A5D7F] text-4xl sm:text-5xl lg:text-6xl text-center mb-4 leading-tight">
          Find a Provider
        </h2>
        <p className="text-[#2C2C2C] text-lg text-center mb-12 max-w-2xl mx-auto">
          Locate participating providers near you
        </p>

        {/* Search Form */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="space-y-6">
              {/* Location Input */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-semibold text-[#4A5D7F] mb-2"
                >
                  City, State or Address
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your location"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#4A5D7F] focus:outline-none transition-colors"
                />
              </div>

              {/* Zip Code Input */}
              <div>
                <label
                  htmlFor="zipcode"
                  className="block text-sm font-semibold text-[#4A5D7F] mb-2"
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
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#4A5D7F] focus:outline-none transition-colors"
                  />
                  <button className="bg-[#4A5D7F] text-white px-8 py-3 rounded-lg font-semibold uppercase hover:bg-[#3A4D6F] transition-colors flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
