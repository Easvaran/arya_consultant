"use client";

import { useState, useEffect } from "react";
import { Calculator, Info } from "lucide-react";

interface EMICalculatorProps {
  title: string;
  description: string;
  defaultAmount?: number;
  maxAmount?: number;
  minAmount?: number;
  defaultRate?: number;
  defaultTenure?: number;
  maxTenure?: number;
}

export default function EMICalculator({
  title,
  description,
  defaultAmount = 1000000,
  maxAmount = 10000000,
  minAmount = 10000,
  defaultRate = 8.5,
  defaultTenure = 120,
  maxTenure = 360,
}: EMICalculatorProps) {
  const [amount, setAmount] = useState(defaultAmount);
  const [rate, setRate] = useState(defaultRate);
  const [tenure, setTenure] = useState(defaultTenure);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    const p = amount;
    const r = rate / (12 * 100);
    const n = tenure;

    const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = emiValue * n;
    const interest = totalPay - p;

    setEmi(emiValue);
    setTotalInterest(interest);
    setTotalPayment(totalPay);
  }, [amount, rate, tenure]);

  return (
    <div className="py-12 px-4 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{title}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Inputs Column */}
          <div className="lg:col-span-2 space-y-8 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">
            <div>
              <div className="flex justify-between mb-4 items-center">
                <label className="font-semibold text-gray-700">Loan Amount</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">₹</span>
                  <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-32 text-right font-bold text-primary focus:outline-none bg-gray-50 p-1 rounded"
                  />
                </div>
              </div>
              <input
                type="range"
                min={minAmount}
                max={maxAmount}
                step={minAmount / 2}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>₹{(minAmount/1000).toFixed(0)}K</span>
                <span>₹{(maxAmount/100000).toFixed(0)}L</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-4 items-center">
                <label className="font-semibold text-gray-700">Interest Rate (% p.a.)</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={rate} 
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-20 text-right font-bold text-primary focus:outline-none bg-gray-50 p-1 rounded"
                  />
                  <span className="text-xs text-gray-400">%</span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>1%</span>
                <span>30%</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-4 items-center">
                <label className="font-semibold text-gray-700">Tenure (Months)</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={tenure} 
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-20 text-right font-bold text-primary focus:outline-none bg-gray-50 p-1 rounded"
                  />
                  <span className="text-xs text-gray-400">Mo</span>
                </div>
              </div>
              <input
                type="range"
                min="6"
                max={maxTenure}
                step="6"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>6 Mo</span>
                <span>{maxTenure} Mo</span>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl text-blue-700 text-sm">
                <Info size={18} className="mt-0.5 flex-shrink-0" />
                <p>
                  This is an estimate. Actual EMI may vary based on processing fees, taxes, and other bank-specific charges.
                </p>
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="space-y-6">
            <div className="bg-primary rounded-3xl p-8 text-white shadow-xl shadow-blue-200">
              <div className="mb-10">
                <p className="text-blue-100 text-sm mb-2 uppercase tracking-widest font-semibold">Monthly EMI</p>
                <h2 className="text-5xl font-bold">₹{Math.round(emi).toLocaleString('en-IN')}</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-blue-100">Principal Amount</span>
                  <span className="font-bold text-lg">₹{amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-blue-100">Total Interest</span>
                  <span className="font-bold text-lg">₹{Math.round(totalInterest).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Total Payable</span>
                  <span className="font-bold text-xl text-yellow-300">₹{Math.round(totalPayment).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button className="mt-10 bg-white text-primary w-full py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                Get This Loan
              </button>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Calculator size={18} className="text-primary" />
                Why use this calculator?
              </h3>
              <ul className="text-sm text-gray-600 space-y-3">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  Quickly estimate your monthly financial commitment.
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  Compare different interest rates and tenures.
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  Better plan your budget and savings.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
