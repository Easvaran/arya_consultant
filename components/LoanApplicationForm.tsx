"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, CheckCircle2, ShieldCheck, Zap, Percent, FileText, User, Briefcase, Phone, Landmark } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  dob: z.string().min(1, "Date of Birth is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  loanAmount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Amount must be a positive number"),
  loanType: z.enum(["Personal", "Business", "Gold", "Investment", "Bike", "LAP", "Car"]),
  loanTenure: z.string().min(1, "Tenure is required"),
  employmentType: z.enum(["Salaried", "Self-Employed", "Business Owner"]),
  monthlyIncome: z.string().min(1, "Monthly income is required"),
  address: z.string().min(10, "Full address is required"),
});

type FormData = z.infer<typeof schema>;

interface LoanFormProps {
  defaultLoanType: "Personal" | "Business" | "Gold" | "Investment" | "Bike" | "LAP" | "Car";
  title: string;
  description: string;
  benefits?: string[];
  documents?: string[];
}

export default function LoanApplicationForm({ defaultLoanType, title, description, benefits, documents }: LoanFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      loanType: defaultLoanType,
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/loan/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          loanAmount: Number(data.loanAmount),
        }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Application submitted!");
        router.push("/payment-success");
      } else {
        if (res.status === 401) {
          toast.error("Please login first");
          router.push("/login");
        } else {
          toast.error(result.message || "Failed to submit application");
        }
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-20 px-4 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4 text-gray-900">{title}</h1>
              <p className="text-xl text-gray-600 leading-relaxed">{description}</p>
            </div>

            {benefits && (
              <div className="grid sm:grid-cols-2 gap-6">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <CheckCircle2 className="text-primary" size={20} />
                    </div>
                    <span className="font-semibold text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            )}

            {documents && (
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-purple-50 p-2 rounded-lg">
                    <FileText className="text-purple-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Required Documents</h3>
                </div>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {documents.map((doc, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      <span className="text-sm">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-6">
              <div className="flex gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="bg-yellow-50 p-4 rounded-2xl h-fit">
                  <Zap className="text-yellow-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Instant Decision</h3>
                  <p className="text-gray-600 text-sm">Get an initial approval decision in under 5 minutes after submission.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="bg-green-50 p-4 rounded-2xl h-fit">
                  <ShieldCheck className="text-green-600" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Secure & Confidential</h4>
                  <p className="text-gray-600 text-sm">Your data is protected with bank-grade 256-bit SSL encryption.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">Start Your Application</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b pb-2">
                    <User size={20} className="text-primary" /> Personal Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <input
                        {...register("name")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                      <input
                        {...register("dob")}
                        type="date"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      />
                      {errors.dob && <p className="mt-1 text-xs text-red-500">{errors.dob.message}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                      <select
                        {...register("gender")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b pb-2">
                    <Phone size={20} className="text-primary" /> Contact Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <input
                        {...register("email")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                      <input
                        {...register("phone")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="10-digit number"
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Address</label>
                    <textarea
                      {...register("address")}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Street, City, State, ZIP"
                    ></textarea>
                    {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
                  </div>
                </div>

                {/* Employment & Income */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b pb-2">
                    <Briefcase size={20} className="text-primary" /> Employment & Income
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Employment Type</label>
                      <select
                        {...register("employmentType")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                      >
                        <option value="Salaried">Salaried</option>
                        <option value="Self-Employed">Self-Employed</option>
                        <option value="Business Owner">Business Owner</option>
                      </select>
                      {errors.employmentType && <p className="mt-1 text-xs text-red-500">{errors.employmentType.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Income (₹)</label>
                      <input
                        {...register("monthlyIncome")}
                        type="number"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="e.g. 50000"
                      />
                      {errors.monthlyIncome && <p className="mt-1 text-xs text-red-500">{errors.monthlyIncome.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Loan Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b pb-2">
                    <Landmark size={20} className="text-primary" /> Loan Details
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Amount (₹)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                        <input
                          {...register("loanAmount")}
                          type="number"
                          className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-bold text-gray-700"
                          placeholder="e.g. 5,00,000"
                        />
                      </div>
                      {errors.loanAmount && <p className="mt-1 text-xs text-red-500">{errors.loanAmount.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Tenure (Years)</label>
                      <select
                        {...register("loanTenure")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                      >
                        {[1, 2, 3, 4, 5, 7, 10, 15, 20].map((yr) => (
                          <option key={yr} value={yr}>
                            {yr} {yr === 1 ? "Year" : "Years"}
                          </option>
                        ))}
                      </select>
                      {errors.loanTenure && <p className="mt-1 text-xs text-red-500">{errors.loanTenure.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Selected Loan Category</label>
                    <select
                      {...register("loanType")}
                      disabled
                      className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-500 cursor-not-allowed outline-none"
                    >
                      <option value="Personal">Personal Loan</option>
                      <option value="Business">Business Loan</option>
                      <option value="LAP">Loan Against Property & HL</option>
                      <option value="Bike">Bike Loan</option>
                      <option value="Car">Car Loan</option>
                      <option value="Gold">Gold Loan</option>
                      <option value="Investment">Investment Plans</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" /> Processing...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
