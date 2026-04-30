"use client";

import { useState, useEffect } from "react";
import { Wallet, Info, Briefcase, IndianRupee } from "lucide-react";

export default function SalaryCalculator() {
  const [ctc, setCtc] = useState(1200000);
  const [bonus, setBonus] = useState(10); // % of CTC
  const [deductions, setDeductions] = useState(2000); // Monthly Professional Tax, etc.
  
  const [monthlyGross, setMonthlyGross] = useState(0);
  const [monthlyTakeHome, setMonthlyTakeHome] = useState(0);
  const [taxMonthly, setTaxMonthly] = useState(0);

  useEffect(() => {
    const annualBonus = (ctc * bonus) / 100;
    const annualBase = ctc - annualBonus;
    const monthlyBase = annualBase / 12;
    
    // Simple Tax calculation (Simplified)
    let annualTax = 0;
    const taxable = ctc; // assuming no deductions for simplicity
    if (taxable > 1500000) annualTax = (taxable - 1500000) * 0.3 + 275000;
    else if (taxable > 1000000) annualTax = (taxable - 1000000) * 0.2 + 125000;
    else if (taxable > 500000) annualTax = (taxable - 500000) * 0.1 + 12500;
    
    const monthlyTax = annualTax / 12;
    const takeHome = monthlyBase - monthlyTax - deductions;

    setMonthlyGross(monthlyBase);
    setTaxMonthly(monthlyTax);
    setMonthlyTakeHome(takeHome);
  }, [ctc, bonus, deductions]);

  return (
    <div className="py-12 px-4 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Salary / Take-home Calculator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Calculate your monthly in-hand salary after taxes, PF, and other deductions from your annual CTC.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">
            <div>
              <div className="flex justify-between mb-4 items-center">
                <label className="font-semibold text-gray-700">Annual CTC (Cost to Company)</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">₹</span>
                  <input 
                    type="number" 
                    value={ctc} 
                    onChange={(e) => setCtc(Number(e.target.value))}
                    className="w-32 text-right font-bold text-orange-600 focus:outline-none bg-gray-50 p-1 rounded"
                  />
                </div>
              </div>
              <input
                type="range"
                min="200000"
                max="5000000"
                step="50000"
                value={ctc}
                onChange={(e) => setCtc(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Performance Bonus (% of CTC)</label>
                <input 
                  type="number" 
                  value={bonus} 
                  onChange={(e) => setBonus(Number(e.target.value))}
                  className="w-full font-bold text-orange-600 focus:outline-none bg-gray-50 p-3 rounded-xl border border-gray-100"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Other Monthly Deductions</label>
                <input 
                  type="number" 
                  value={deductions} 
                  onChange={(e) => setDeductions(Number(e.target.value))}
                  className="w-full font-bold text-orange-600 focus:outline-none bg-gray-50 p-3 rounded-xl border border-gray-100"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-start gap-3 bg-orange-50 p-4 rounded-xl text-orange-700 text-sm">
                <Info size={18} className="mt-0.5 flex-shrink-0" />
                <p>
                  This calculation assumes standard tax rates and may vary based on your specific investment declarations (HRA, 80C, etc.).
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-orange-600 rounded-3xl p-8 text-white shadow-xl shadow-orange-200">
              <div className="mb-10">
                <p className="text-orange-100 text-sm mb-2 uppercase tracking-widest font-semibold">Monthly Take-Home</p>
                <h2 className="text-4xl font-bold">₹{Math.round(monthlyTakeHome).toLocaleString('en-IN')}</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-orange-100">Monthly Gross</span>
                  <span className="font-bold text-lg">₹{Math.round(monthlyGross).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-orange-100">Monthly Tax (Est.)</span>
                  <span className="font-bold text-xl text-yellow-300">₹{Math.round(taxMonthly).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button className="mt-10 bg-white text-orange-600 w-full py-4 rounded-2xl font-bold hover:bg-orange-50 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                Download Salary Slip
              </button>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Briefcase size={18} className="text-orange-600" />
                Financial Planning
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Knowing your exact take-home pay helps you budget better and plan your investments more effectively.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
