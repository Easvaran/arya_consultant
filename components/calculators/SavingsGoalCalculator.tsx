"use client";

import { useState, useEffect } from "react";
import { Target, Info, TrendingUp, Wallet } from "lucide-react";

export default function SavingsGoalCalculator() {
  const [targetAmount, setTargetAmount] = useState(1000000);
  const [initialSavings, setInitialSavings] = useState(50000);
  const [years, setYears] = useState(5);
  const [expectedRate, setExpectedRate] = useState(8);
  
  const [monthlyRequired, setMonthlyRequired] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);

  useEffect(() => {
    const FV = targetAmount;
    const PV = initialSavings;
    const r = expectedRate / 100 / 12;
    const n = years * 12;

    // Formula for Monthly Deposit (Sinking Fund with Initial Value):
    // FV = PV*(1+r)^n + PMT * [((1+r)^n - 1) / r] * (1+r)
    // PMT = (FV - PV*(1+r)^n) / [((1+r)^n - 1) / r * (1+r)]
    
    const numerator = FV - PV * Math.pow(1 + r, n);
    const denominator = ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    
    const pmt = Math.max(0, numerator / denominator);
    
    setMonthlyRequired(pmt);
    setTotalInvested(PV + (pmt * n));
  }, [targetAmount, initialSavings, years, expectedRate]);

  return (
    <div className="py-12 px-4 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Savings Goal Calculator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Find out how much you need to save each month to reach your financial milestones.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">What is your savings goal?</label>
              <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <span className="text-gray-400">₹</span>
                <input 
                  type="number" 
                  value={targetAmount} 
                  onChange={(e) => setTargetAmount(Number(e.target.value))}
                  className="w-full font-bold text-purple-600 focus:outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Initial Savings</label>
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-gray-400">₹</span>
                  <input 
                    type="number" 
                    value={initialSavings} 
                    onChange={(e) => setInitialSavings(Number(e.target.value))}
                    className="w-full font-bold text-purple-600 focus:outline-none bg-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Expected Returns (% p.a.)</label>
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <input 
                    type="number" 
                    value={expectedRate} 
                    onChange={(e) => setExpectedRate(Number(e.target.value))}
                    className="w-full font-bold text-purple-600 focus:outline-none bg-transparent"
                  />
                  <span className="text-gray-400">%</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-4 items-center">
                <label className="font-semibold text-gray-700">Time to reach goal (Years)</label>
                <span className="font-bold text-purple-600">{years} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-start gap-3 bg-purple-50 p-4 rounded-xl text-purple-700 text-sm">
                <Info size={18} className="mt-0.5 flex-shrink-0" />
                <p>
                  This calculation assumes monthly compounding and constant return rates. Market investments fluctuate.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-purple-600 rounded-3xl p-8 text-white shadow-xl shadow-purple-200">
              <div className="mb-10">
                <p className="text-purple-100 text-sm mb-2 uppercase tracking-widest font-semibold">Monthly Savings Needed</p>
                <h2 className="text-4xl font-bold">₹{Math.round(monthlyRequired).toLocaleString('en-IN')}</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-purple-100">Total Invested</span>
                  <span className="font-bold text-lg">₹{Math.round(totalInvested).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-100">Est. Growth</span>
                  <span className="font-bold text-xl text-yellow-300">₹{Math.round(targetAmount - totalInvested).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button className="mt-10 bg-white text-purple-600 w-full py-4 rounded-2xl font-bold hover:bg-purple-50 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                Start Saving Now
              </button>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Target size={18} className="text-purple-600" />
                Goal Achievement
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Reaching <span className="font-bold text-purple-600">₹{targetAmount.toLocaleString('en-IN')}</span> in <span className="font-bold text-purple-600">{years} years</span> is achievable with consistent monthly discipline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
