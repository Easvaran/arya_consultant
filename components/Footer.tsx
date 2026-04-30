"use client";

import Link from "next/link";
import { Landmark } from "lucide-react";
import { useState, useEffect } from "react";
import Logo from "./Logo";

const Footer = () => {
  const [settings, setSettings] = useState({
    businessName: "ARYA CONSULTANT",
    subheading: "Your financial Needs is Our First Priority",
    nameColor: "#FFFFFF",
    subheadingColor: "#94A3B8",
    logoUrl: "",
    email: "info@aryaconsultant.com",
    phone: "+1 (555) 000-0000",
    address: "123 Finance Plaza, Wall Street, NY",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          setSettings({
            businessName: data.businessName || "ARYA CONSULTANT",
            subheading: data.subheading || "Your financial Needs is Our First Priority",
            nameColor: data.nameColor || "#FFFFFF",
            subheadingColor: data.subheadingColor || "#94A3B8",
            logoUrl: data.logoUrl || "",
            email: data.email || "info@aryaconsultant.com",
            phone: data.phone || "+1 (555) 000-0000",
            address: data.address || "123 Finance Plaza, Wall Street, NY",
          });
        }
      } catch (error) {
        console.error("Failed to load footer settings");
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity mb-6">
              <Logo size={40} color="#3B82F6" src={settings.logoUrl} />
              <div className="flex flex-col">
                <span className="font-black text-2xl leading-tight" style={{ color: settings.nameColor }}>{settings.businessName}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider leading-none" style={{ color: settings.subheadingColor }}>{settings.subheading}</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6">
              Your trusted financial partner providing secure and fast loan solutions since 2010.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/calculators" className="hover:text-white transition-colors">Calculators</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Our Services</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/services#personal" className="hover:text-white transition-colors">Personal Loan</Link></li>
              <li><Link href="/services#business" className="hover:text-white transition-colors">Business Loan</Link></li>
              <li><Link href="/services#lap" className="hover:text-white transition-colors">LAP & HOUSING LOAN</Link></li>
              <li><Link href="/services#car" className="hover:text-white transition-colors">Car Loan</Link></li>
              <li><Link href="/services#bike" className="hover:text-white transition-colors">Bike Loan</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li>Email: {settings.email}</li>
              <li>Phone: {settings.phone}</li>
              <li>Address: {settings.address}</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} {settings.businessName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
