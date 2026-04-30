"use client";

import { useEffect, useState } from "react";
import { 
  Save, 
  Loader2,
  MessageSquare,
  Type,
  AlignLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe
} from "lucide-react";
import toast from "react-hot-toast";

export default function GetInTouchSettingsPage() {
  const [settings, setSettings] = useState({
    contactTitle: "",
    contactDescription: "",
    email: "",
    phone: "",
    address: "",
    workingHours: "",
    mapIframe: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          setSettings({
            contactTitle: data.contactTitle || "Get in Touch",
            contactDescription: data.contactDescription || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            workingHours: data.workingHours || "",
            mapIframe: data.mapIframe || "",
          });
        }
      } catch (error) {
        toast.error("Failed to load settings");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        toast.success("Contact settings updated successfully");
      } else {
        toast.error("Failed to update settings");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">Contact Page Settings</h1>
        <p className="text-slate-500 font-medium">Manage the header, contact cards, and map on your contact page.</p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-8">
        {/* Header Section */}
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
          <h3 className="text-xs font-black text-primary uppercase tracking-widest mb-8">1. Header Content</h3>
          <div className="space-y-6">
            <div className="group">
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">
                Section Title
              </label>
              <div className="relative">
                <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="text"
                  value={settings.contactTitle}
                  onChange={(e) => setSettings({ ...settings, contactTitle: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white outline-none transition-all font-semibold"
                  placeholder="e.g. Get in Touch"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">
                Section Description
              </label>
              <div className="relative">
                <AlignLeft className="absolute left-4 top-4 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                <textarea
                  rows={4}
                  value={settings.contactDescription}
                  onChange={(e) => setSettings({ ...settings, contactDescription: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white outline-none transition-all font-semibold resize-none"
                  placeholder="Tell your customers how you can help them..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Cards Section */}
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
          <h3 className="text-xs font-black text-primary uppercase tracking-widest mb-8">2. Contact Details (Cards)</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white outline-none transition-all font-semibold"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white outline-none transition-all font-semibold"
                />
              </div>
            </div>

            <div className="group md:col-span-2">
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">Office Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white outline-none transition-all font-semibold"
                />
              </div>
            </div>

            <div className="group md:col-span-2">
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">Working Hours (Description)</label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="text"
                  value={settings.workingHours}
                  onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white outline-none transition-all font-semibold"
                  placeholder="e.g. Mon-Fri from 9am to 6pm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
          <h3 className="text-xs font-black text-primary uppercase tracking-widest mb-8">3. Location Map</h3>
          <div className="group">
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">Google Maps Embed URL</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
              <input
                type="text"
                value={settings.mapIframe}
                onChange={(e) => setSettings({ ...settings, mapIframe: e.target.value })}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white outline-none transition-all font-semibold"
                placeholder="Paste the 'src' attribute from Google Maps embed code"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="w-full flex items-center justify-center gap-2 px-10 py-5 bg-primary text-white rounded-[2rem] font-black shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50 text-lg"
        >
          {isUpdating ? <Loader2 className="animate-spin" /> : <><Save size={24} /> Update Contact Page</>}
        </button>
      </form>

      {/* Live Preview */}
      <div className="bg-slate-50 p-10 rounded-[3rem] border-2 border-dashed border-slate-200">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-10 text-center">Live Preview (Public View)</h3>
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
            {settings.contactTitle || "Get in Touch"}
          </h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            {settings.contactDescription || "Have questions? Our experts are here to help."}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <Phone size={20}/>, title: "Phone", details: settings.phone, desc: settings.workingHours },
            { icon: <Mail size={20}/>, title: "Email", details: settings.email, desc: "Our team will reply within 24h." },
            { icon: <MapPin size={20}/>, title: "Office", details: settings.address, desc: "Come say hello at our HQ." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                {item.icon}
              </div>
              <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
              <p className="text-primary font-black text-sm mb-1">{item.details || "Not set"}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
