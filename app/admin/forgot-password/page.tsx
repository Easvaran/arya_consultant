"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Mail, Loader2, Key, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import Head from "next/head";

export default function AdminForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("OTP sent to your email!");
        setStep(2);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const cleanOtp = otp.replace(/\s+/g, ''); // Remove any spaces
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: cleanOtp }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("OTP verified!");
        // Store session info in sessionStorage to use on reset page
        sessionStorage.setItem("resetEmail", email);
        sessionStorage.setItem("resetOtp", cleanOtp);
        router.push("/admin/reset-password");
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-primary/20 px-4 py-6 md:py-12 relative overflow-hidden">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/95 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 text-primary">
              <Key size={32} />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
              {step === 1 ? "Reset Admin Password" : "Verify OTP"}
            </h1>
            <p className="text-slate-500 font-medium text-sm">
              {step === 1 
                ? "Enter your admin email to receive a secure OTP." 
                : `We've sent a 6-digit code to ${email}`}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div className="group">
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">
                  Admin Email
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-primary focus:bg-white outline-none transition-all font-semibold text-slate-700"
                    placeholder="admin@aryafinance.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-5 px-4 border border-transparent rounded-2xl shadow-xl text-lg font-bold text-white bg-primary hover:bg-blue-600 focus:outline-none transition-all"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="group">
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">
                  6-Digit OTP
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                    <ShieldCheck size={20} />
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-primary focus:bg-white outline-none transition-all font-black text-slate-700 tracking-[0.5em] text-center text-xl"
                    placeholder="000000"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-5 px-4 border border-transparent rounded-2xl shadow-xl text-lg font-bold text-white bg-primary hover:bg-blue-600 focus:outline-none transition-all"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Verify Code"}
              </button>
              
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="w-full text-slate-400 text-sm font-bold hover:text-primary transition-colors"
              >
                Change Email Address
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <Link href="/admin/login" className="inline-flex items-center gap-2 text-slate-400 text-sm font-bold hover:text-primary transition-colors">
              <ArrowLeft size={16} /> Back to Admin Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
