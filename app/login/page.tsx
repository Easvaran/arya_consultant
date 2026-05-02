"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Landmark, Loader2 } from "lucide-react";
import Logo from "@/components/Logo";
import { useEffect, useState } from "react";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    logoUrl: "",
    businessName: "Arya Finance",
    subheading: "Loan Services",
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
            logoUrl: data.logoUrl || "",
            businessName: data.businessName || "Arya Finance",
            subheading: data.subheading || "Loan Services",
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
          // If a regular user logs in, we don't allow it here or we handle it differently
          // Based on user request, if it's not valid admin or valid credentials, return back
          toast.error("Invalid details. Access denied.");
        }
      } else {
        toast.error("Invalid details. Please check your credentials.");
      }
    } catch (error) {
      toast.error("Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-6 md:py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-10">
          <div className="text-center mb-8">
            <Link 
              href="/admin/login" 
              className="inline-flex items-center gap-3 text-primary hover:scale-[1.02] active:scale-[0.98] transition-all relative z-50 cursor-pointer p-2 rounded-xl hover:bg-slate-50"
              title="Admin Portal Access"
            >
              <div className="shrink-0">
                <Logo size={48} color="#3B82F6" src={settings.logoUrl} />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-black text-3xl tracking-tight leading-tight" style={{ color: settings.nameColor }}>{settings.businessName}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest leading-none" style={{ color: settings.subheadingColor }}>{settings.subheading}</span>
              </div>
            </Link>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">Welcome Back</h2>
            <p className="mt-2 text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-semibold text-primary hover:underline">
                Register now
              </Link>
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-slate-50 focus:bg-white text-slate-900"
                  placeholder="name@example.com"
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email.message}</p>}
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Password</label>
                </div>
                <input
                  {...register("password")}
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-slate-50 focus:bg-white text-slate-900"
                  placeholder="••••••••"
                />
                {errors.password && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.password.message}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-all transform active:scale-[0.98]"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400 font-medium tracking-wider">Security Guaranteed</span>
              </div>
            </div>

            <div className="text-center">
              <Link href="/admin/login" className="text-xs font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-widest">
                Admin Portal Access
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
