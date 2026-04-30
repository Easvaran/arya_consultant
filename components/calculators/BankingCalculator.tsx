"use client";

import { useState, useEffect } from "react";
import { Building2, Info, Landmark } from "lucide-react";

interface BankingCalculatorProps {
  title: string;
  description: string;
  type: "fd" | "rd";
}

export default function BankingCalculator({ title, description, type }: BankingCalculatorProps) {
  const [amount, setAmount] = useState(type === "fd" ? 100000 : 5000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);
  const [compounding, setCompounding] = useState(4); // Quarterly for FD, Monthly for RD
  
  const [interestEarned, setInterestEarned] = useState(0);
  const [maturityValue, setMaturityValue] = useState(0);

  useEffect(() => {
    if (type === "fd") {
      // FD Formula: A = P(1 + r/n)^(nt)
      const P = amount;
      const r = rate / 100;
      const n = compounding;
      const t = years;
      const A = P * Math.pow(1 + r / n, n * t);
      setMaturityValue(A);
      setInterestEarned(A - P);
    } else {
      // RD Formula: M = R[(1+i)^n - 1] / (1-(1+i)^(-1/3))  -- simplified
      // Common RD formula: M = P * ((1+r/n)^(nt) - 1) / (1 - (1+r/n)^(-1/3))
      const P = amount;
      const r = rate / 100;
      const n = 4; // usually quarterly compounding in India
      const totalMonths = years * 12;
      
      let totalMaturity = 0;
      for (let i = 1; i <= totalMonths; i++) {
        // Each installment earns interest for the remaining period
        totalMaturity += P * Math.pow(1 + r / n, (n * (totalMonths - i + 1) / 12));
      }
      
      setMaturityValue(totalMaturity);
      setInterestEarned(totalMaturity - (P * totalMonths));
    }
  }, [amount, rate, years, compounding, type]);

  return (
    <div className="py-12 px-4 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{title}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">
            <div>
              <div className="flex justify-between mb-4 items-center">
                <label className="font-semibold text-gray-700">
                  {type === "fd" ? "Deposit Amount" : "Monthly Installment"}
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">₹</span>
                  <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-32 text-right font-bold text-purple-600 focus:outline-none bg-gray-50 p-1 rounded"
                  />
                </div>
              </div>
              <input
                type="range"
                min={type === "fd" ? 1000 : 500}
                max={type === "fd" ? 10000000 : 100000}
                step={type === "fd" ? 1000 : 500}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Interest Rate (% p.a.)</label>
                <input 
                  type="number" 
                  value={rate} 
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full font-bold text-purple-600 focus:outline-none bg-gray-50 p-3 rounded-xl border border-gray-100"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Tenure (Years)</label>
                <input 
                  type="number" 
                  value={years} 
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full font-bold text-purple-600 focus:outline-none bg-gray-50 p-3 rounded-xl border border-gray-100"
                />
              </div>
            </div>

            {type === "fd" && (
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Compounding Frequency</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Monthly", value: 12 },
                    { label: "Quarterly", value: 4 },
                    { label: "Half-Yearly", value: 2 },
                    { label: "Yearly", value: 1 },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setCompounding(opt.value)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        compounding === opt.value
                          ? "bg-purple-600 text-white shadow-md"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-start gap-3 bg-purple-50 p-4 rounded-xl text-purple-700 text-sm">
                <Info size={18} className="mt-0.5 flex-shrink-0" />
                <p>
                  Calculations are based on the standard formulas used by Indian banks. TDS may apply as per income tax rules.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-purple-600 rounded-3xl p-8 text-white shadow-xl shadow-purple-200">
              <div className="mb-10">
                <p className="text-purple-100 text-sm mb-2 uppercase tracking-widest font-semibold">Maturity Amount</p>
                <h2 className="text-4xl font-bold">₹{Math.round(maturityValue).toLocaleString('en-IN')}</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-purple-100">Total Deposit</span>
                  <span className="font-bold text-lg">₹{(type === 'fd' ? amount : amount * years * 12).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-100">Interest Earned</span>
                  <span className="font-bold text-xl text-yellow-300">₹{Math.round(interestEarned).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button className="mt-10 bg-white text-purple-600 w-full py-4 rounded-2xl font-bold hover:bg-purple-50 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                Open Account
              </button>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Landmark size={18} className="text-purple-600" />
                Secure Savings
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Bank deposits are one of the safest ways to grow your money with guaranteed returns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
