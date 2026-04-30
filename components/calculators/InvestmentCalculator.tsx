"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Info, PieChart, Briefcase } from "lucide-react";

interface InvestmentCalculatorProps {
  title: string;
  description: string;
  type: "lump-sum" | "compound-interest";
}

export default function InvestmentCalculator({ title, description, type }: InvestmentCalculatorProps) {
  const [initialInvestment, setInitialInvestment] = useState(100000);
  const [expectedRate, setExpectedRate] = useState(12);
  const [years, setYears] = useState(10);
  const [compoundingFrequency, setCompoundingFrequency] = useState(1); // 1 = yearly, 4 = quarterly, 12 = monthly
  
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const P = initialInvestment;
    const r = expectedRate / 100;
    const t = years;
    const n = compoundingFrequency;

    // Compound Interest Formula: A = P(1 + r/n)^(nt)
    const futureValue = P * Math.pow(1 + r / n, n * t);
    const returns = futureValue - P;

    setEstimatedReturns(returns);
    setTotalValue(futureValue);
  }, [initialInvestment, expectedRate, years, compoundingFrequency]);

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
                <label className="font-semibold text-gray-700">Initial Investment</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">₹</span>
                  <input 
                    type="number" 
                    value={initialInvestment} 
                    onChange={(e) => setInitialInvestment(Number(e.target.value))}
                    className="w-32 text-right font-bold text-green-600 focus:outline-none bg-gray-50 p-1 rounded"
                  />
                </div>
              </div>
              <input
                type="range"
                min="5000"
                max="10000000"
                step="5000"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
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

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Time Period (Years)</label>
                <input 
                  type="number" 
                  value={years} 
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full font-bold text-green-600 focus:outline-none bg-gray-50 p-3 rounded-xl border border-gray-100"
                />
              </div>
              {type === "compound-interest" && (
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Compounding</label>
                  <select 
                    value={compoundingFrequency}
                    onChange={(e) => setCompoundingFrequency(Number(e.target.value))}
                    className="w-full font-bold text-green-600 focus:outline-none bg-gray-50 p-3 rounded-xl border border-gray-100"
                  >
                    <option value={1}>Yearly</option>
                    <option value={2}>Half-Yearly</option>
                    <option value={4}>Quarterly</option>
                    <option value={12}>Monthly</option>
                  </select>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-start gap-3 bg-green-50 p-4 rounded-xl text-green-700 text-sm">
                <Info size={18} className="mt-0.5 flex-shrink-0" />
                <p>
                  Investment growth depends on the rate of return and the time period. Taxes and inflation are not considered here.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-green-600 rounded-3xl p-8 text-white shadow-xl shadow-green-200">
              <div className="mb-10">
                <p className="text-green-100 text-sm mb-2 uppercase tracking-widest font-semibold">Maturity Value</p>
                <h2 className="text-4xl font-bold">₹{Math.round(totalValue).toLocaleString('en-IN')}</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-green-100">Initial Investment</span>
                  <span className="font-bold text-lg">₹{initialInvestment.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Total Gain</span>
                  <span className="font-bold text-xl text-yellow-300">₹{Math.round(estimatedReturns).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button className="mt-10 bg-white text-green-600 w-full py-4 rounded-2xl font-bold hover:bg-green-50 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                Invest Now
              </button>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Briefcase size={18} className="text-green-600" />
                Investment Insight
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Your investment of <span className="font-bold text-green-600">₹{initialInvestment.toLocaleString('en-IN')}</span> will grow to <span className="font-bold text-green-600">₹{Math.round(totalValue).toLocaleString('en-IN')}</span> in <span className="font-bold text-green-600">{years} years</span> at <span className="font-bold text-green-600">{expectedRate}%</span> return.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
