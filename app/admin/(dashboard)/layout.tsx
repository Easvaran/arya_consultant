"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ShieldCheck,
  Landmark,
  Mail,
  MessageSquare
} from "lucide-react";
import Logo from "@/components/Logo";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [businessName, setBusinessName] = useState("ARYA CONSULTANT");
  const [subheading, setSubheading] = useState("Your financial Needs is Our First Priority");
  const [nameColor, setNameColor] = useState("#FFFFFF");
  const [subheadingColor, setSubheadingColor] = useState("#94A3B8");
  const [logoUrl, setLogoUrl] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "admin") {
      router.push("/admin/login");
    }

    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          setBusinessName(data.businessName || "ARYA CONSULTANT");
          setSubheading(data.subheading || "Your financial Needs is Our First Priority");
          setNameColor("#FFFFFF"); // Keep white for sidebar
          setSubheadingColor("#94A3B8"); // Keep slate for sidebar
          setLogoUrl(data.logoUrl || "");
        }
      } catch (error) {
        console.error("Failed to load admin settings");
      }
    };
    fetchSettings();
  }, [router]);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/admin" },
    { name: "Applications", icon: <FileText size={20} />, href: "/admin/applications" },
    { name: "Loan Services", icon: <Landmark size={20} />, href: "/admin/loan-types" },
    { name: "Contact Messages", icon: <Mail size={20} />, href: "/admin/contacts" },
    { name: "Get in Touch", icon: <MessageSquare size={20} />, href: "/admin/get-in-touch" },
    { name: "Settings", icon: <Settings size={20} />, href: "/admin/settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center gap-3 border-b border-slate-800">
            <div className="p-2 bg-primary/20 rounded-xl overflow-hidden flex items-center justify-center">
              <Logo size={28} color="#3B82F6" src={logoUrl} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight leading-tight" style={{ color: nameColor }}>{businessName}</span>
              <span className="text-[7px] font-bold uppercase tracking-tight leading-none" style={{ color: subheadingColor }}>{subheading}</span>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2 mt-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                >
                  {item.icon}
                  <span className="font-semibold">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all"
            >
              <LogOut size={20} />
              <span className="font-semibold">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 lg:px-12 sticky top-0 z-40">
          <button 
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">System Admin</p>
              <p className="text-xs text-slate-500">Super Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary font-bold border-2 border-primary/20">
              A
            </div>
          </div>
        </header>

        <div className="p-8 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
