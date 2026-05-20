"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#F5F1EC] pt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-6rem)]">
          {/* Left Content */}
          <div className="space-y-8 pt-12 lg:pt-0 z-10">
            <h1 className="font-serif text-[#4A5D7F] leading-[1.15]">
              <span className="block text-5xl sm:text-6xl lg:text-[4rem]">
                See the Results.
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-[4rem]">
                Get the
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-[4rem]">
                Rewards.
              </span>
            </h1>

            <p className="text-[#2C2C2C] text-lg sm:text-xl max-w-md leading-relaxed">
              ASPIRE Galderma Rewards is designed to support and reward you at
              every stage of your aesthetic journey.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-[#4A5D7F] text-white px-12 py-4 rounded-full text-sm font-semibold tracking-wider uppercase hover:bg-[#3A4D6F] transition-colors shadow-lg">
                JOIN NOW
              </button>
              <button className="bg-transparent border-2 border-[#4A5D7F] text-[#4A5D7F] px-12 py-4 rounded-full text-sm font-semibold tracking-wider uppercase hover:bg-[#4A5D7F] hover:text-white transition-colors">
                SIGN IN
              </button>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="relative h-[500px] lg:h-[700px] lg:absolute lg:right-0 lg:top-20 lg:w-[45%]">
            <div className="relative h-full w-full">
              {/* Hero Image - Using CSS gradient to simulate photo */}
              <div className="absolute inset-0 rounded-t-[300px] overflow-hidden">
                {/* Simulated professional photo with skin tone gradients */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#E8C4A0] via-[#D4A88E] to-[#C19177]">
                  {/* Face highlight */}
                  <div className="absolute top-[30%] left-[40%] w-32 h-40 bg-gradient-radial from-[#F5E1D3] to-transparent opacity-60 blur-3xl"></div>

                  {/* Hair simulation */}
                  <div className="absolute top-0 left-[20%] w-[60%] h-[40%] bg-gradient-to-b from-[#8B6F47] to-transparent opacity-40"></div>

                  {/* Shoulder definition */}
                  <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[#B08968] to-transparent opacity-50"></div>

                  {/* Add a centered message */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg max-w-xs">
                      <p className="text-sm text-[#4A5D7F] font-medium mb-2">
                        🖼️ Hero Image Placeholder
                      </p>
                      <p className="text-xs text-gray-600">
                        Replace with licensed patient photo from Galderma assets
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Disclaimer text overlay */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-xs sm:text-sm text-center px-4 drop-shadow-lg z-10">
                Actual patient. Individual results may vary.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
