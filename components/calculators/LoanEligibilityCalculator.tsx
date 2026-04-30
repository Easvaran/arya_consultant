"use client";

import { useState, useEffect } from "react";
import { UserCheck, Info, Briefcase, IndianRupee } from "lucide-react";

export default function LoanEligibilityCalculator() {
  const [income, setIncome] = useState(50000);
  const [existingEMI, setExistingEMI] = useState(0);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(240);
  const [eligibility, setEligibility] = useState(0);
  const [maxEMI, setMaxEMI] = useState(0);

  useEffect(() => {
    // Standard rule: Total EMI should not exceed 50% of monthly income
    const disposableIncome = income * 0.5;
    const allowedNewEMI = Math.max(0, disposableIncome - existingEMI);
    
    const r = rate / (12 * 100);
    const n = tenure;
    
    // Reverse EMI formula: P = EMI / [r * (1 + r)^n / ((1 + r)^n - 1)]
    const p = (allowedNewEMI * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
    
    setEligibility(p);
    setMaxEMI(allowedNewEMI);
  }, [income, existingEMI, rate, tenure]);

  return (
    <div className="py-12 px-4 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Loan Eligibility Calculator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Find out how much loan amount you are eligible for based on your income and existing commitments.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">
            <div>
              <div className="flex justify-between mb-4 items-center">
                <label className="font-semibold text-gray-700">Monthly Income (Take-home)</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">₹</span>
                  <input 
                    type="number" 
                    value={income} 
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-32 text-right font-bold text-primary focus:outline-none bg-gray-50 p-1 rounded"
                  />
                </div>
              </div>
              <input
                type="range"
                min="10000"
                max="500000"
                step="5000"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div>
              <div className="flex justify-between mb-4 items-center">
                <label className="font-semibold text-gray-700">Existing Monthly EMIs</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">₹</span>
                  <input 
                    type="number" 
                    value={existingEMI} 
                    onChange={(e) => setExistingEMI(Number(e.target.value))}
                    className="w-32 text-right font-bold text-primary focus:outline-none bg-gray-50 p-1 rounded"
                  />
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="200000"
                step="1000"
                value={existingEMI}
                onChange={(e) => setExistingEMI(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Interest Rate (%)</label>
                <input 
                  type="number" 
                  value={rate} 
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full font-bold text-primary focus:outline-none bg-gray-50 p-3 rounded-xl border border-gray-100"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Tenure (Months)</label>
                <input 
                  type="number" 
                  value={tenure} 
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full font-bold text-primary focus:outline-none bg-gray-50 p-3 rounded-xl border border-gray-100"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl text-blue-700 text-sm">
                <Info size={18} className="mt-0.5 flex-shrink-0" />
                <p>
                  Eligibility is calculated assuming a FOIR (Fixed Obligation to Income Ratio) of 50%. This may vary by lender.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-primary rounded-3xl p-8 text-white shadow-xl shadow-blue-200">
              <div className="mb-10">
                <p className="text-blue-100 text-sm mb-2 uppercase tracking-widest font-semibold">Maximum Loan Eligibility</p>
                <h2 className="text-4xl font-bold">₹{Math.round(eligibility).toLocaleString('en-IN')}</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-blue-100">Max. Monthly EMI</span>
                  <span className="font-bold text-lg">₹{Math.round(maxEMI).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Eligible Amount</span>
                  <span className="font-bold text-xl text-yellow-300">₹{Math.round(eligibility).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button className="mt-10 bg-white text-primary w-full py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                Check Full Eligibility
              </button>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Briefcase size={18} className="text-primary" />
                Eligibility Factors
              </h3>
              <ul className="text-sm text-gray-600 space-y-3">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  Credit Score (750+ is ideal)
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  Stable employment history
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  Age (usually 21-60 years)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
