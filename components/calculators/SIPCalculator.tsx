"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Info, PieChart } from "lucide-react";

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedRate, setExpectedRate] = useState(12);
  const [years, setYears] = useState(10);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const P = monthlyInvestment;
    const i = expectedRate / 100 / 12;
    const n = years * 12;

    // SIP Formula: M = P × ({[1 + i]^n – 1} / i) × (1 + i)
    const futureValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const invested = P * n;
    const returns = futureValue - invested;

    setTotalInvestment(invested);
    setEstimatedReturns(returns);
    setTotalValue(futureValue);
  }, [monthlyInvestment, expectedRate, years]);

  return (
    <div className="py-12 px-4 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">SIP Calculator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Calculate the future value of your Systematic Investment Plan (SIP) and see how your wealth grows over time.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">
            <div>
              <div className="flex justify-between mb-4 items-center">
                <label className="font-semibold text-gray-700">Monthly Investment</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">₹</span>
                  <input 
                    type="number" 
                    value={monthlyInvestment} 
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    className="w-32 text-right font-bold text-green-600 focus:outline-none bg-gray-50 p-1 rounded"
                  />
                </div>
              </div>
              <input
                type="range"
                min="500"
                max="100000"
                step="500"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
            </div>

            <div>
              <div className="flex justify-between mb-4 items-center">
                <label className="font-semibold text-gray-700">Expected Return Rate (% p.a.)</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={expectedRate} 
                    onChange={(e) => setExpectedRate(Number(e.target.value))}
                    className="w-20 text-right font-bold text-green-600 focus:outline-none bg-gray-50 p-1 rounded"
                  />
                  <span className="text-xs text-gray-400">%</span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="0.5"
                value={expectedRate}
                onChange={(e) => setExpectedRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
            </div>

            <div>
              <div className="flex justify-between mb-4 items-center">
                <label className="font-semibold text-gray-700">Time Period (Years)</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={years} 
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-20 text-right font-bold text-green-600 focus:outline-none bg-gray-50 p-1 rounded"
                  />
                  <span className="text-xs text-gray-400">Yrs</span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-start gap-3 bg-green-50 p-4 rounded-xl text-green-700 text-sm">
                <Info size={18} className="mt-0.5 flex-shrink-0" />
                <p>
                  Mutual fund investments are subject to market risks. The actual returns may vary based on market conditions.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-green-600 rounded-3xl p-8 text-white shadow-xl shadow-green-200">
              <div className="mb-10">
                <p className="text-green-100 text-sm mb-2 uppercase tracking-widest font-semibold">Total Value</p>
                <h2 className="text-4xl font-bold">₹{Math.round(totalValue).toLocaleString('en-IN')}</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-green-100">Invested Amount</span>
                  <span className="font-bold text-lg">₹{totalInvestment.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Est. Returns</span>
                  <span className="font-bold text-xl text-yellow-300">₹{Math.round(estimatedReturns).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button className="mt-10 bg-white text-green-600 w-full py-4 rounded-2xl font-bold hover:bg-green-50 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                Start Investing
              </button>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <PieChart size={18} className="text-green-600" />
                Power of Compounding
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                By investing just <span className="font-bold text-green-600">₹{monthlyInvestment}</span> monthly for <span className="font-bold text-green-600">{years} years</span>, you can accumulate a wealth of <span className="font-bold text-green-600">₹{Math.round(totalValue).toLocaleString('en-IN')}</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
