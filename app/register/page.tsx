"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

type PracticeType = "single" | "multiple" | null;
type MultipleOption = "manage-multiple" | "manage-one" | null;

export default function RegisterPage() {
  const [mckessonId, setMckessonId] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [practiceType, setPracticeType] = useState<PracticeType>(null);
  const [multipleOption, setMultipleOption] = useState<MultipleOption>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F1EC] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#4A5D7F] to-[#3A4D6F] rounded-full flex items-center justify-center shadow-luxury">
            <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-3xl text-[#4A5D7F] mb-4">Registration Submitted</h1>
          <p className="text-[#2C2C2C]/70 text-base font-light leading-relaxed mb-8">
            Thank you for registering with ASPIRE Galderma Practice Rewards. You will receive a confirmation email shortly.
          </p>
          <Link
            href="/portal"
            className="inline-flex items-center gap-2 btn-primary text-white px-8 py-3.5 rounded-full text-sm font-semibold tracking-wider uppercase"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1EC] grain-texture">
      {/* Top cream banner */}
      <div className="bg-gradient-to-br from-[#EDE7E0] to-[#F5F1EC] h-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4A5D7F]/[0.03] to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      </div>

      <div className="max-w-xl mx-auto px-6 -mt-24 relative pb-20">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#4A5D7F] text-sm font-medium mb-8 hover:gap-3 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-luxury-xl p-10 lg:p-12">
          {/* Header */}
          <div className="mb-10">
            <span className="text-lg font-light tracking-[0.3em] text-[#4A5D7F]/40 block mb-4">
              ASPIRE
            </span>
            <h1 className="font-serif text-4xl text-[#4A5D7F] mb-3 font-light">
              Sign <span className="font-normal">Up</span>
            </h1>
            <p className="text-[#2C2C2C]/60 text-[15px] font-light leading-relaxed">
              Please complete the required fields below and submit to create your ASPIRE Galderma Practice Rewards account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* McKesson ID */}
            <div className="group">
              <label htmlFor="mckesson" className="block text-xs font-semibold text-[#4A5D7F] uppercase tracking-wider mb-2">
                McKesson ID
              </label>
              <input
                type="text"
                id="mckesson"
                value={mckessonId}
                onChange={(e) => setMckessonId(e.target.value)}
                placeholder="Enter your McKesson ID"
                className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:border-[#4A5D7F] focus:outline-none transition-colors duration-300 text-[15px] bg-transparent placeholder:text-gray-400"
                required
              />
            </div>

            {/* Zip Code */}
            <div>
              <label htmlFor="zip" className="block text-xs font-semibold text-[#4A5D7F] uppercase tracking-wider mb-2">
                Zip Code
              </label>
              <input
                type="text"
                id="zip"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Enter your zip code"
                maxLength={5}
                className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:border-[#4A5D7F] focus:outline-none transition-colors duration-300 text-[15px] bg-transparent placeholder:text-gray-400"
                required
              />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-[#4A5D7F] uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:border-[#4A5D7F] focus:outline-none transition-colors duration-300 text-[15px] bg-transparent placeholder:text-gray-400"
                required
              />
            </div>

            {/* Confirm Email Address */}
            <div>
              <label htmlFor="confirm-email" className="block text-xs font-semibold text-[#4A5D7F] uppercase tracking-wider mb-2">
                Confirm Email Address
              </label>
              <input
                type="email"
                id="confirm-email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                placeholder="Confirm your email address"
                className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:border-[#4A5D7F] focus:outline-none transition-colors duration-300 text-[15px] bg-transparent placeholder:text-gray-400"
                required
              />
            </div>

            {/* Practice Type Selection */}
            <div className="pt-4">
              <p className="text-[15px] text-[#2C2C2C]/80 mb-5 font-light">
                Please select the option that best describes your practice.
              </p>

              <div className="space-y-3">
                {/* Single Location */}
                <label className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  practiceType === "single"
                    ? "border-[#4A5D7F] bg-[#4A5D7F]/5"
                    : "border-gray-200 hover:border-[#4A5D7F]/30 hover:bg-[#F5F1EC]/30"
                }`}>
                  <input
                    type="radio"
                    name="practiceType"
                    value="single"
                    checked={practiceType === "single"}
                    onChange={() => { setPracticeType("single"); setMultipleOption(null); }}
                    className="mt-1 w-4 h-4 text-[#4A5D7F] border-gray-300 focus:ring-[#4A5D7F]"
                  />
                  <span className="text-sm text-[#2C2C2C]/80">
                    This account is for a single location.
                  </span>
                </label>

                {/* Multiple Locations */}
                <label className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  practiceType === "multiple"
                    ? "border-[#4A5D7F] bg-[#4A5D7F]/5"
                    : "border-gray-200 hover:border-[#4A5D7F]/30 hover:bg-[#F5F1EC]/30"
                }`}>
                  <input
                    type="radio"
                    name="practiceType"
                    value="multiple"
                    checked={practiceType === "multiple"}
                    onChange={() => setPracticeType("multiple")}
                    className="mt-1 w-4 h-4 text-[#4A5D7F] border-gray-300 focus:ring-[#4A5D7F]"
                  />
                  <span className="text-sm text-[#2C2C2C]/80">
                    This account is for multiple locations.
                  </span>
                </label>

                {/* Sub-options for multiple locations */}
                {practiceType === "multiple" && (
                  <div className="ml-8 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className={`flex items-start gap-4 p-3.5 rounded-xl border cursor-pointer transition-all duration-300 ${
                      multipleOption === "manage-multiple"
                        ? "border-[#4A5D7F]/50 bg-[#4A5D7F]/5"
                        : "border-gray-200 hover:border-[#4A5D7F]/20"
                    }`}>
                      <input
                        type="radio"
                        name="multipleOption"
                        value="manage-multiple"
                        checked={multipleOption === "manage-multiple"}
                        onChange={() => setMultipleOption("manage-multiple")}
                        className="mt-0.5 w-3.5 h-3.5 text-[#4A5D7F] border-gray-300 focus:ring-[#4A5D7F]"
                      />
                      <span className="text-sm text-[#2C2C2C]/70 font-light">
                        I&apos;ll manage multiple practices from this account.
                      </span>
                    </label>

                    <label className={`flex items-start gap-4 p-3.5 rounded-xl border cursor-pointer transition-all duration-300 ${
                      multipleOption === "manage-one"
                        ? "border-[#4A5D7F]/50 bg-[#4A5D7F]/5"
                        : "border-gray-200 hover:border-[#4A5D7F]/20"
                    }`}>
                      <input
                        type="radio"
                        name="multipleOption"
                        value="manage-one"
                        checked={multipleOption === "manage-one"}
                        onChange={() => setMultipleOption("manage-one")}
                        className="mt-0.5 w-3.5 h-3.5 text-[#4A5D7F] border-gray-300 focus:ring-[#4A5D7F]"
                      />
                      <span className="text-sm text-[#2C2C2C]/70 font-light">
                        I&apos;ll only manage one practice location from this account.
                      </span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full btn-primary text-white py-4.5 rounded-full text-sm font-semibold tracking-wider uppercase"
              >
                SUBMIT
              </button>
            </div>
          </form>

          {/* Sign in link */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-[#2C2C2C]/50 font-light">
              Already have an account?{" "}
              <Link href="/login" className="text-[#4A5D7F] font-medium hover:underline underline-offset-4">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
