"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Landmark, Loader2, ShieldCheck, Lock, Mail, Key } from "lucide-react";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    businessName: "ARYA CONSULTANT",
    subheading: "Your financial Needs is Our First Priority",
    nameColor: "#0F172A",
    subheadingColor: "#64748B",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          setSettings({
            businessName: data.businessName || "ARYA CONSULTANT",
            subheading: data.subheading || "Your financial Needs is Our First Priority",
            nameColor: data.nameColor || "#0F172A",
            subheadingColor: data.subheadingColor || "#64748B",
          });
        }
      } catch (error) {
        console.error("Failed to load settings");
      }
    };
    fetchSettings();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        if (result.user.role === "admin") {
          toast.success("Admin login successful!");
          localStorage.setItem("userRole", "admin");
          router.push("/admin");
        } else {
          toast.error("Access denied. Not an admin account.");
        }
      } else {
        toast.error(result.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-primary/20 px-4 py-6 md:py-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/95 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-tr from-primary to-blue-600 rounded-3xl mb-6 shadow-xl shadow-primary/20 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <ShieldCheck className="text-white w-10 h-10 md:w-14 md:h-14" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">Admin Portal</h1>
            <div className="flex flex-col gap-1">
              <p className="font-bold text-sm md:text-base uppercase tracking-wider" style={{ color: settings.nameColor }}>{settings.businessName} Control Center</p>
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: settings.subheadingColor }}>{settings.subheading}</p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="group">
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-[0.2em] group-focus-within:text-primary transition-colors">
                  Administrator Email
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                    <Mail size={20} />
                  </div>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-primary focus:bg-white focus:ring-0 outline-none transition-all font-semibold text-slate-700"
                    placeholder="admin@aryaconsultant.com"
                  />
                </div>
                {errors.email && <p className="mt-2 text-xs text-red-500 font-bold flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full inline-block"></span>
                  {errors.email.message}
                </p>}
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-[0.2em] group-focus-within:text-primary transition-colors">
                  Secret Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                    <Key size={20} />
                  </div>
                  <input
                    {...register("password")}
                    type="password"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-primary focus:bg-white focus:ring-0 outline-none transition-all font-semibold text-slate-700"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="mt-2 text-xs text-red-500 font-bold flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full inline-block"></span>
                  {errors.password.message}
                </p>}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm py-2">
              <Link href="/admin/forgot-password" title="Forgot password" className="text-xs font-bold text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-5 px-4 border border-transparent rounded-2xl shadow-xl text-lg font-bold text-white bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-all transform hover:-translate-y-1 active:translate-y-0.5"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Authorize Access"
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              Authorized Personnel Only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
