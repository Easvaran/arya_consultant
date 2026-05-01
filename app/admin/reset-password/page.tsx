"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2, Save, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import Head from "next/head";

export default function AdminResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail");
    const storedOtp = sessionStorage.getItem("resetOtp");
    if (!storedEmail || !storedOtp) {
      toast.error("Session expired. Please request a new OTP.");
      router.push("/admin/forgot-password");
    } else {
      setEmail(storedEmail);
      setOtp(storedOtp);
    }
  }, [router]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Password updated successfully!");
        sessionStorage.removeItem("resetEmail");
        sessionStorage.removeItem("resetOtp");
        router.push("/admin/login");
      } else {
        toast.error(data.message || "Failed to reset password");
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4 text-green-600">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Update Password</h1>
            <p className="text-slate-500 font-medium text-sm">
              Create a new secure password for your admin account.
            </p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="group">
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">
                New Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-primary focus:bg-white outline-none transition-all font-semibold text-slate-700"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-primary focus:bg-white outline-none transition-all font-semibold text-slate-700"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-5 px-4 border border-transparent rounded-2xl shadow-xl text-lg font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none transition-all"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <><Save size={20} className="mr-2" /> Reset Password</>}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <button 
              onClick={() => router.push("/admin/login")}
              className="inline-flex items-center gap-2 text-slate-400 text-sm font-bold hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} /> Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
