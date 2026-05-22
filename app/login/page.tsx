"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Lock, Sparkles, Mail } from "lucide-react";
import { saveMember } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Unable to authenticate. Please check your email.");
        setIsLoading(false);
        return;
      }

      saveMember(data);
      router.push("/portal");
    } catch {
      setError("Connection error. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1EC] grain-texture flex flex-col">
      <div className="h-48 relative overflow-hidden flex-shrink-0">
        <Image src="/images/bg-pattern.jpg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#F5F1EC]/30" />
      </div>

      <div className="max-w-md mx-auto px-6 -mt-24 relative pb-20 w-full">
        <Link href="/" className="inline-flex items-center gap-2 text-[#4A5D7F] text-sm font-medium mb-8 hover:gap-3 transition-all duration-300">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-luxury-xl p-10 lg:p-12">
          <div className="text-center mb-10">
            <span className="text-lg font-light tracking-[0.3em] text-[#4A5D7F]/40 block mb-6">ASPIRE</span>
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#F5F1EC] to-white rounded-2xl flex items-center justify-center shadow-sm border border-[#4A5D7F]/10">
              <Lock className="w-7 h-7 text-[#4A5D7F]" strokeWidth={1.5} />
            </div>
            <h1 className="font-serif text-3xl text-[#4A5D7F] mb-2 font-light">
              Welcome <span className="font-normal">Back</span>
            </h1>
            <p className="text-[#2C2C2C]/50 text-sm font-light">Access your ASPIRE Practice Rewards portal</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-sm text-amber-800 font-light">{error}</p>
            </div>
          )}

          <div className="mb-6 p-4 bg-[#F5F1EC]/60 border border-[#4A5D7F]/10 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#4A5D7F]" />
              <p className="text-xs font-semibold text-[#4A5D7F] uppercase tracking-wider">Demo Login</p>
            </div>
            <p className="text-xs text-[#2C2C2C]/50">
              Use{" "}
              <button type="button" onClick={() => { setEmail("aaronmorita@gmail.com"); }} className="text-[#4A5D7F] font-medium underline underline-offset-2 cursor-pointer">
                Dr. Aaron Morita&apos;s account
              </button>{" "}
              to explore
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="login-email" className="block text-xs font-semibold text-[#4A5D7F] uppercase tracking-wider mb-2">Practice Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="email" id="login-email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your registered email" className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:border-[#4A5D7F] focus:ring-2 focus:ring-[#4A5D7F]/10 focus:outline-none transition-all duration-300 text-[15px] bg-[#FAFAFA] hover:bg-white placeholder:text-gray-400" required />
              </div>
              <p className="text-[10px] text-gray-400 mt-2 font-light">Enter the email associated with your ASPIRE membership</p>
            </div>

            <div className="pt-2">
              <button type="submit" disabled={isLoading} className="w-full btn-primary text-white py-4 rounded-full text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 disabled:opacity-70">
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  "ACCESS PORTAL"
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-[#2C2C2C]/50 font-light">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#4A5D7F] font-medium hover:underline underline-offset-4">Enroll Today</Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-[#2C2C2C]/40 mt-6 font-light">
          Need help? Contact <a href="#" className="text-[#4A5D7F] hover:underline underline-offset-2">ASPIRE Support</a>
        </p>
      </div>
    </div>
  );
}
