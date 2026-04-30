"use client";

import { useState, useEffect } from "react";
import { Calculator } from "lucide-react";
import Link from "next/link";

export default function EMICalculator() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(10);
  const [tenure, setTenure] = useState(12);
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
    <div className="py-20 px-4 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Calculator className="text-primary" size={40} />
            EMI Calculator
          </h1>
          <p className="text-gray-600">Plan your loan repayment with ease.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-3xl shadow-lg">
          {/* Inputs */}
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-4">
                <label className="font-semibold">Loan Amount</label>
                <span className="text-primary font-bold">₹{amount.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="50000"
                max="5000000"
                step="50000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <label className="font-semibold">Interest Rate (% p.a.)</label>
                <span className="text-primary font-bold">{rate}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                step="0.5"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <label className="font-semibold">Tenure (Months)</label>
                <span className="text-primary font-bold">{tenure} Months</span>
              </div>
              <input
                type="range"
                min="12"
                max="360"
                step="12"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          </div>

          {/* Results */}
          <div className="bg-primary rounded-2xl p-8 text-white flex flex-col justify-center">
            <div className="mb-8">
              <p className="text-blue-100 text-sm mb-1 uppercase tracking-wider">Monthly EMI</p>
              <h2 className="text-4xl font-bold">₹{Math.round(emi).toLocaleString('en-IN')}</h2>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-blue-100 text-xs mb-1 uppercase tracking-wider">Total Interest</p>
                <p className="text-xl font-bold">₹{Math.round(totalInterest).toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-blue-100 text-xs mb-1 uppercase tracking-wider">Total Payment</p>
                <p className="text-xl font-bold">₹{Math.round(totalPayment).toLocaleString('en-IN')}</p>
              </div>
            </div>
            <Link 
              href="/services"
              className="mt-10 bg-white text-primary w-full py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center justify-center"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
