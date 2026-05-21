"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate login attempt
    setTimeout(() => {
      setIsLoading(false);
      setError("This is a demo. Login functionality is not active.");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F5F1EC] grain-texture flex flex-col">
      {/* Top cream banner */}
      <div className="bg-gradient-to-br from-[#EDE7E0] to-[#F5F1EC] h-48 relative overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4A5D7F]/[0.03] to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#C9A96E]/[0.03] rounded-full blur-3xl translate-y-1/2" />
      </div>

      <div className="max-w-md mx-auto px-6 -mt-24 relative pb-20 w-full">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#4A5D7F] text-sm font-medium mb-8 hover:gap-3 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-luxury-xl p-10 lg:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="text-lg font-light tracking-[0.3em] text-[#4A5D7F]/40 block mb-6">
              ASPIRE
            </span>

            {/* Lock icon */}
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#F5F1EC] to-white rounded-2xl flex items-center justify-center shadow-sm border border-[#4A5D7F]/10">
              <Lock className="w-7 h-7 text-[#4A5D7F]" strokeWidth={1.5} />
            </div>

            <h1 className="font-serif text-3xl text-[#4A5D7F] mb-2 font-light">
              Welcome <span className="font-normal">Back</span>
            </h1>
            <p className="text-[#2C2C2C]/50 text-sm font-light">
              Sign in to your ASPIRE Practice Rewards account
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="text-sm text-amber-800 font-light">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-xs font-semibold text-[#4A5D7F] uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:border-[#4A5D7F] focus:ring-2 focus:ring-[#4A5D7F]/10 focus:outline-none transition-all duration-300 text-[15px] bg-[#FAFAFA] hover:bg-white placeholder:text-gray-400"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" className="block text-xs font-semibold text-[#4A5D7F] uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3.5 pr-12 border border-gray-200 rounded-xl focus:border-[#4A5D7F] focus:ring-2 focus:ring-[#4A5D7F]/10 focus:outline-none transition-all duration-300 text-[15px] bg-[#FAFAFA] hover:bg-white placeholder:text-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-[#4A5D7F] transition-colors duration-300 rounded-lg hover:bg-[#F5F1EC]/50"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                  ) : (
                    <Eye className="w-4 h-4" strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#4A5D7F] focus:ring-[#4A5D7F]"
                />
                <span className="text-sm text-[#2C2C2C]/60 font-light group-hover:text-[#2C2C2C] transition-colors">
                  Remember me
                </span>
              </label>
              <a href="#" className="text-sm text-[#4A5D7F] font-medium hover:underline underline-offset-4">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary text-white py-4 rounded-full text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "SIGN IN"
                )}
              </button>
            </div>
          </form>

          {/* Register link */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-[#2C2C2C]/50 font-light">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#4A5D7F] font-medium hover:underline underline-offset-4">
                Enroll Today
              </Link>
            </p>
          </div>
        </div>

        {/* Help text */}
        <p className="text-center text-xs text-[#2C2C2C]/40 mt-6 font-light">
          Need help? Contact{" "}
          <a href="#" className="text-[#4A5D7F] hover:underline underline-offset-2">ASPIRE Support</a>
        </p>
      </div>
    </div>
  );
}
