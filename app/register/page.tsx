"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

type InquiryType = "practice" | "member" | null;

export default function RegisterPage() {
  const [mckessonId, setMckessonId] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [inquiryType, setInquiryType] = useState<InquiryType>(null);
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
      {/* Top cream banner with brand pattern */}
      <div className="h-48 relative overflow-hidden">
        <Image
          src="/images/bg-pattern.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#F5F1EC]/30" />
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

            {/* Inquiry Type Selection */}
            <div className="pt-4">
              <p className="text-[15px] text-[#2C2C2C]/80 mb-5 font-light">
                Are you inquiring about your practice or an ASPIRE member? <span className="text-red-400">*</span>
              </p>

              <div className="space-y-3">
                {/* Practice */}
                <label className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  inquiryType === "practice"
                    ? "border-[#4A5D7F] bg-[#4A5D7F]/5"
                    : "border-gray-200 hover:border-[#4A5D7F]/30 hover:bg-[#F5F1EC]/30"
                }`}>
                  <input
                    type="radio"
                    name="inquiryType"
                    value="practice"
                    checked={inquiryType === "practice"}
                    onChange={() => setInquiryType("practice")}
                    className="mt-1 w-4 h-4 text-[#4A5D7F] border-gray-300 focus:ring-[#4A5D7F]"
                  />
                  <span className="text-sm text-[#2C2C2C]/80 font-medium">
                    Practice
                  </span>
                </label>

                {/* ASPIRE Member */}
                <label className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  inquiryType === "member"
                    ? "border-[#4A5D7F] bg-[#4A5D7F]/5"
                    : "border-gray-200 hover:border-[#4A5D7F]/30 hover:bg-[#F5F1EC]/30"
                }`}>
                  <input
                    type="radio"
                    name="inquiryType"
                    value="member"
                    checked={inquiryType === "member"}
                    onChange={() => setInquiryType("member")}
                    className="mt-1 w-4 h-4 text-[#4A5D7F] border-gray-300 focus:ring-[#4A5D7F]"
                  />
                  <span className="text-sm text-[#2C2C2C]/80 font-medium">
                    ASPIRE Member
                  </span>
                </label>
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
