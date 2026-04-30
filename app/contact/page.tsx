"use client";

import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [settings, setSettings] = useState({
    email: "info@aryaconsultant.com",
    phone: "+1 (555) 000-0000",
    address: "123 Finance Plaza, Wall Street, NY",
    workingHours: "Mon-Fri from 9am to 6pm.",
    mapIframe: "",
    contactTitle: "Get in Touch",
    contactDescription: "Have questions about our loan services? Our team of financial experts is here to help you find the perfect solution for your needs.",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          setSettings({
            email: data.email || "info@aryaconsultant.com",
            phone: data.phone || "+1 (555) 000-0000",
            address: data.address || "123 Finance Plaza, Wall Street, NY",
            workingHours: data.workingHours || "Mon-Fri from 9am to 6pm.",
            mapIframe: data.mapIframe || "",
            contactTitle: data.contactTitle || "Get in Touch",
            contactDescription: data.contactDescription || "Have questions about our loan services? Our team of financial experts is here to help you find the perfect solution for your needs.",
          });
        }
      } catch (error) {
        console.error("Failed to load settings");
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Thank you for your message! We will get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const contactInfo = [
    {
      icon: <Phone className="text-primary" size={24} />,
      title: "Phone",
      details: settings.phone,
      description: settings.workingHours,
    },
    {
      icon: <Mail className="text-primary" size={24} />,
      title: "Email",
      details: settings.email,
      description: "Our support team will reply within 24h.",
    },
    {
      icon: <MapPin className="text-primary" size={24} />,
      title: "Office",
      details: settings.address,
      description: "Come say hello at our office HQ.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">
            {settings.contactTitle}
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            {settings.contactDescription}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-start gap-6 group hover:border-primary/20 transition-all">
                <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1 text-lg">{item.title}</h3>
                  <p className="text-primary font-black mb-1">{item.details}</p>
                  <p className="text-sm text-slate-400 font-medium">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-sm border border-slate-100">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white outline-none transition-all font-semibold text-slate-700"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white outline-none transition-all font-semibold text-slate-700"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white outline-none transition-all font-semibold text-slate-700"
                    placeholder="How can we help?"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-primary focus:bg-white outline-none transition-all font-semibold text-slate-700 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-12 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-primary transition-all flex items-center justify-center gap-3 group shadow-xl shadow-slate-200"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <>
                    Send Message
                    <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-20 rounded-[3rem] overflow-hidden h-[500px] bg-slate-200 relative shadow-inner border border-slate-100">
          {settings.mapIframe ? (
            <iframe
              src={settings.mapIframe}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-50">
              <div className="text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin size={40} className="opacity-20" />
                </div>
                <p className="font-bold uppercase tracking-widest mb-2">Location Map</p>
                <p className="text-sm font-medium">{settings.address}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
