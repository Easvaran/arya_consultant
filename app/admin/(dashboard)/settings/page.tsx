"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { 
  Save, 
  Key, 
  Loader2,
  Globe,
  ShieldCheck,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  X as CloseIcon,
  Mail
} from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    businessName: "",
    subheading: "",
    nameColor: "#0F172A",
    subheadingColor: "#64748B",
    logoUrl: "",
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [emailChange, setEmailChange] = useState({
    currentPassword: "",
    newEmail: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingSettings, setIsUpdatingSettings] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isChangingEmail, setIsChangingEmail] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          setSettings({
            businessName: data.businessName || "",
            subheading: data.subheading || "",
            nameColor: data.nameColor || "#0F172A",
            subheadingColor: data.subheadingColor || "#64748B",
            logoUrl: data.logoUrl || "",
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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        return toast.error("Logo must be less than 2MB");
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings({ ...settings, logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingSettings(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        const result = await res.json();
        if (result.settings) {
          setSettings({
            businessName: result.settings.businessName || "",
            subheading: result.settings.subheading || "",
            nameColor: result.settings.nameColor || "#0F172A",
            subheadingColor: result.settings.subheadingColor || "#64748B",
            logoUrl: result.settings.logoUrl || "",
          });
        }
        toast.success("Branding settings updated successfully");
      } else {
        toast.error("Failed to update settings");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsUpdatingSettings(false);
    }
  };

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChangingEmail(true);
    try {
      const res = await fetch("/api/admin/change-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailChange),
      });

      if (res.ok) {
        toast.success("Email updated successfully");
        setEmailChange({ currentPassword: "", newEmail: "" });
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to update email");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsChangingEmail(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("New passwords do not match");
    }

    setIsChangingPassword(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        }),
      });

      if (res.ok) {
        toast.success("Password changed successfully");
        setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to change password");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsChangingPassword(false);
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
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">Global Settings</h1>
        <p className="text-slate-500 font-medium">Manage your brand logo and account security.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* General Settings */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                <ImageIcon size={24} />
              </div>
              <h2 className="text-xl font-black text-slate-900">Branding</h2>
            </div>

            <form onSubmit={handleUpdateSettings} className="space-y-8">
              <div className="space-y-6">
                <div className="group">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest group-focus-within:text-primary transition-colors">Business Name</label>
                    <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full">Customizable</span>
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={settings.businessName}
                      onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white outline-none transition-all font-semibold"
                      placeholder="ARYA CONSULTANT"
                    />
                    <div className="flex flex-col items-center gap-1">
                      <input
                        type="color"
                        value={settings.nameColor}
                        onChange={(e) => setSettings({ ...settings, nameColor: e.target.value })}
                        className="w-12 h-12 rounded-xl cursor-pointer border-2 border-slate-200 bg-white p-1 hover:border-primary transition-all"
                        title="Pick Business Name Color"
                      />
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Text Color</span>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest group-focus-within:text-primary transition-colors">Subheading</label>
                    <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full">Customizable</span>
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={settings.subheading}
                      onChange={(e) => setSettings({ ...settings, subheading: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white outline-none transition-all font-semibold"
                      placeholder="Your financial Needs is Our First Priority"
                    />
                    <div className="flex flex-col items-center gap-1">
                      <input
                        type="color"
                        value={settings.subheadingColor}
                        onChange={(e) => setSettings({ ...settings, subheadingColor: e.target.value })}
                        className="w-12 h-12 rounded-xl cursor-pointer border-2 border-slate-200 bg-white p-1 hover:border-primary transition-all"
                        title="Pick Subheading Color"
                      />
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Text Color</span>
                    </div>
                  </div>
                </div>

                {/* Live Preview Section */}
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <label className="block text-[10px] font-black text-slate-400 mb-4 uppercase tracking-[0.2em]">Live Preview</label>
                  <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100 w-fit">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold">
                      Logo
                    </div>
                    <div className="flex flex-col">
                      <span className="font-black text-xl leading-tight transition-colors" style={{ color: settings.nameColor }}>
                        {settings.businessName || "Business Name"}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-wider leading-none transition-colors" style={{ color: settings.subheadingColor }}>
                        {settings.subheading || "Your Subheading Here"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Logo & Favicon</label>
                  <div className="flex flex-col items-center gap-6 p-8 border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/50 group hover:border-primary/20 transition-all">
                    {settings.logoUrl ? (
                      <div className="relative group">
                        <div className="w-24 h-24 bg-white rounded-2xl shadow-sm flex items-center justify-center overflow-hidden border border-slate-100">
                          <Image 
                            src={settings.logoUrl} 
                            alt="Logo Preview" 
                            width={96}
                            height={96}
                            className="max-w-full max-h-full object-contain" 
                            unoptimized
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setSettings({ ...settings, logoUrl: "" })}
                          className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all"
                        >
                          <CloseIcon size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300">
                        <ImageIcon size={40} />
                      </div>
                    )}
                    
                    <div className="text-center">
                      <label className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-100 rounded-xl font-bold text-slate-600 hover:border-primary hover:text-primary transition-all shadow-sm">
                        <Upload size={18} />
                        {settings.logoUrl ? "Change Logo" : "Upload Logo"}
                        <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                      </label>
                      <p className="mt-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider">PNG, JPG or SVG (Max 2MB)</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isUpdatingSettings}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-primary transition-all disabled:opacity-50 shadow-lg shadow-slate-200"
              >
                {isUpdatingSettings ? <Loader2 className="animate-spin" /> : "Save Branding"}
              </button>
            </form>
          </div>

          <div className="bg-blue-50 p-8 rounded-[2.5rem] border border-blue-100 flex gap-4">
            <AlertCircle className="text-blue-500 shrink-0" size={24} />
            <p className="text-sm text-blue-700 font-medium leading-relaxed">
              Contact details, working hours, and map locations have been moved to the <strong>Get in Touch</strong> menu for better organization.
            </p>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 h-fit">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-amber-100 rounded-2xl text-amber-600">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-xl font-black text-slate-900">Security</h2>
          </div>

          <div className="space-y-8">
            {/* Change Email */}
            <form onSubmit={handleChangeEmail} className="space-y-6 pb-8 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest">Update Admin Email</h3>
              <div className="group">
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">New Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    type="email"
                    required
                    value={emailChange.newEmail}
                    onChange={(e) => setEmailChange({ ...emailChange, newEmail: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white outline-none transition-all font-semibold"
                    placeholder="new-admin@example.com"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">Verify Password</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    type="password"
                    required
                    value={emailChange.currentPassword}
                    onChange={(e) => setEmailChange({ ...emailChange, currentPassword: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white outline-none transition-all font-semibold"
                    placeholder="Confirm with your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isChangingEmail}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-primary transition-all disabled:opacity-50 shadow-lg shadow-slate-100"
              >
                {isChangingEmail ? <Loader2 className="animate-spin" /> : "Update Email"}
              </button>
            </form>

            {/* Change Password */}
            <form onSubmit={handleChangePassword} className="space-y-6">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest">Update Password</h3>
              <div className="group">
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">Current Password</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    type="password"
                    value={passwords.currentPassword}
                    onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white outline-none transition-all font-semibold"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">New Password</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    type="password"
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white outline-none transition-all font-semibold"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">Confirm New Password</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    type="password"
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white outline-none transition-all font-semibold"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isChangingPassword}
                className="w-full py-4 bg-amber-600 text-white rounded-2xl font-bold hover:bg-amber-700 transition-all disabled:opacity-50 shadow-lg shadow-amber-100"
              >
                {isChangingPassword ? <Loader2 className="animate-spin" /> : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
