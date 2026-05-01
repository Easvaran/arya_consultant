"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Landmark, ShieldCheck, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

import Logo from "./Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [businessName, setBusinessName] = useState("ARYA CONSULTANT");
  const [subheading, setSubheading] = useState("Your financial Needs is Our First Priority");
  const [nameColor, setNameColor] = useState("#0F172A");
  const [subheadingColor, setSubheadingColor] = useState("#64748B");
  const [logoUrl, setLogoUrl] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = () => {
    const cookies = document.cookie.split(';');
    const hasToken = cookies.some(c => c.trim().startsWith('token='));
    setIsLoggedIn(hasToken);
    
    const userRole = localStorage.getItem('userRole');
    setIsAdmin(hasToken && userRole === 'admin');
  };

  useEffect(() => {
    // 1. Try to load from localStorage immediately
    const cachedBranding = localStorage.getItem("cached_branding");
    if (cachedBranding) {
      try {
        const data = JSON.parse(cachedBranding);
        setBusinessName(data.businessName || "ARYA CONSULTANT");
        setSubheading(data.subheading || "Your financial Needs is Our First Priority");
        setNameColor(data.nameColor || "#0F172A");
        setSubheadingColor(data.subheadingColor || "#64748B");
        setLogoUrl(data.logoUrl || "");
      } catch (e) {
        console.error("Failed to parse cached branding");
      }
    }

    checkAuth();
    
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          setBusinessName(data.businessName || "ARYA CONSULTANT");
          setSubheading(data.subheading || "Your financial Needs is Our First Priority");
          setNameColor(data.nameColor || "#0F172A");
          setSubheadingColor(data.subheadingColor || "#64748B");
          setLogoUrl(data.logoUrl || "");
          // 2. Cache for next refresh
          localStorage.setItem("cached_branding", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Failed to load navbar settings");
      }
    };
    fetchSettings();
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = async () => {
    // In a real app, you'd call an API to clear the cookie
    // For now, we'll just expire it manually and clear local storage
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setIsAdmin(false);
    router.push("/");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Calculators", href: "/calculators" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link 
            key={`${businessName}-${nameColor}`} 
            href="/admin/login" 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity no-underline"
          >
            <Logo size={40} color="#3B82F6" src={logoUrl} />
            <div className="flex flex-col">
              <span className="font-black text-2xl leading-tight" style={{ color: nameColor || "inherit" }}>{businessName}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider leading-none" style={{ color: subheadingColor || "inherit" }}>{subheading}</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`${
                  isActive(link.href) 
                    ? "text-primary font-bold border-b-2 border-primary" 
                    : "text-gray-600 hover:text-primary font-medium"
                } transition-all py-1`}
              >
                {link.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <div className="flex items-center gap-6">
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-primary font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : null}
            <Link
              href="/contact"
              className={`${
                isActive("/contact") 
                  ? "ring-4 ring-primary/20" 
                  : ""
              } bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all`}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Links */}
        {isOpen && (
          <div className="md:hidden pb-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`${
                  isActive(link.href)
                    ? "text-primary font-bold bg-primary/5 pl-2 border-l-4 border-primary"
                    : "text-gray-600 font-medium"
                } py-2 transition-all`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-gray-600 font-medium py-2 pl-2 border-l-4 border-transparent text-left"
                >
                  Logout
                </button>
              </>
            ) : null}
            <Link
              href="/contact"
              className={`${
                isActive("/contact")
                  ? "opacity-90"
                  : ""
              } bg-primary text-white px-6 py-2 rounded-lg font-semibold text-center`}
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
