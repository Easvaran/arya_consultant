"use client";

import { useState, useEffect } from "react";
import { Percent, Info, TrendingUp } from "lucide-react";

export default function InterestRateCalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [emi, setEmi] = useState(12399);
  const [tenure, setTenure] = useState(120);
  const [interestRate, setInterestRate] = useState(0);

  useEffect(() => {
    // Newton-Raphson method to find interest rate
    const findInterestRate = (P: number, E: number, n: number) => {
      let r = 0.1 / 12; // initial guess 10% annual
      for (let i = 0; i < 20; i++) {
        const powTerm = Math.pow(1 + r, n);
        const f = E * (powTerm - 1) - P * r * powTerm;
        const df = E * n * Math.pow(1 + r, n - 1) - P * (powTerm + r * n * Math.pow(1 + r, n - 1));
        const newR = r - f / df;
        if (Math.abs(newR - r) < 0.0000001) {
          r = newR;
          break;
        }
        r = newR;
      }
      return r * 12 * 100;
    };

    const rate = findInterestRate(loanAmount, emi, tenure);
    setInterestRate(rate);
  }, [loanAmount, emi, tenure]);

  return (
    <div className="py-12 px-4 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Interest Rate Calculator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Calculate the effective annual interest rate of your loan based on the EMI and principal amount.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Loan Amount</label>
              <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <span className="text-gray-400">₹</span>
                <input 
                  type="number" 
                  value={loanAmount} 
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full font-bold text-primary focus:outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">Monthly EMI</label>
              <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <span className="text-gray-400">₹</span>
                <input 
                  type="number" 
                  value={emi} 
                  onChange={(e) => setEmi(Number(e.target.value))}
                  className="w-full font-bold text-primary focus:outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-4 items-center">
                <label className="font-semibold text-gray-700">Tenure (Months)</label>
                <span className="font-bold text-primary">{tenure} Months</span>
              </div>
              <input
                type="range"
                min="6"
                max="360"
                step="6"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl text-blue-700 text-sm">
                <Info size={18} className="mt-0.5 flex-shrink-0" />
                <p>
                  This tool helps you find the actual interest rate being charged when only the EMI and loan amount are known.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-primary rounded-3xl p-8 text-white shadow-xl shadow-blue-200">
              <div className="mb-10">
                <p className="text-blue-100 text-sm mb-2 uppercase tracking-widest font-semibold">Effective Interest Rate</p>
                <h2 className="text-5xl font-bold">{interestRate > 0 ? interestRate.toFixed(2) : "0.00"}%</h2>
                <p className="text-blue-100 mt-2">Per Annum</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-blue-100">Monthly Rate</span>
                  <span className="font-bold text-lg">{(interestRate / 12).toFixed(4)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Total Payment</span>
                  <span className="font-bold text-xl text-yellow-300">₹{(emi * tenure).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <TrendingUp size={18} className="text-primary" />
                Rate Analysis
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                A lower effective interest rate means you pay less over the life of the loan. Always check the APR including fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
