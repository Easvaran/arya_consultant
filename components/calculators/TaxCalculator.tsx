"use client";

import { useState, useEffect } from "react";
import { Receipt, Info, IndianRupee, ShieldCheck } from "lucide-react";

interface TaxCalculatorProps {
  title: string;
  description: string;
  type: "gst" | "income-tax";
}

export default function TaxCalculator({ title, description, type }: TaxCalculatorProps) {
  const [amount, setAmount] = useState(type === "gst" ? 10000 : 800000);
  const [gstRate, setGstRate] = useState(18);
  const [isInclusive, setIsInclusive] = useState(false);
  
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Income Tax specific states
  const [age, setAge] = useState(30);
  const [deductions, setDeductions] = useState(150000);

  useEffect(() => {
    if (type === "gst") {
      if (isInclusive) {
        // GST = Amount - (Amount * (100 / (100 + GST%)))
        const gst = amount - (amount * (100 / (100 + gstRate)));
        setTaxAmount(gst);
        setTotalAmount(amount);
      } else {
        const gst = (amount * gstRate) / 100;
        setTaxAmount(gst);
        setTotalAmount(amount + gst);
      }
    } else {
      // Simple Income Tax Calculation (Old Regime simplified)
      const taxableIncome = Math.max(0, amount - deductions);
      let tax = 0;
      
      if (taxableIncome > 1000000) {
        tax = (taxableIncome - 1000000) * 0.3 + 112500;
      } else if (taxableIncome > 500000) {
        tax = (taxableIncome - 500000) * 0.2 + 12500;
      } else if (taxableIncome > 250000) {
        tax = (taxableIncome - 250000) * 0.05;
      }
      
      // Rebate under 87A
      if (taxableIncome <= 500000) tax = 0;
      
      // Cess
      tax = tax * 1.04;
      
      setTaxAmount(tax);
      setTotalAmount(amount - tax);
    }
  }, [amount, gstRate, isInclusive, type, deductions]);

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
                  {type === "gst" ? "Net Amount" : "Gross Annual Income"}
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">₹</span>
                  <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-32 text-right font-bold text-orange-600 focus:outline-none bg-gray-50 p-1 rounded"
                  />
                </div>
              </div>
              <input
                type="range"
                min={type === "gst" ? 100 : 100000}
                max={type === "gst" ? 1000000 : 5000000}
                step={type === "gst" ? 100 : 50000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
              />
            </div>

            {type === "gst" ? (
              <div className="space-y-6">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">GST Rate (%)</label>
                  <div className="grid grid-cols-5 gap-2">
                    {[5, 12, 18, 28].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => setGstRate(rate)}
                        className={`py-2 rounded-lg text-sm font-medium transition-all ${
                          gstRate === rate
                            ? "bg-orange-600 text-white shadow-md"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {rate}%
                      </button>
                    ))}
                    <input 
                      type="number" 
                      value={gstRate}
                      onChange={(e) => setGstRate(Number(e.target.value))}
                      className="bg-gray-50 border border-gray-100 rounded-lg text-center font-bold text-orange-600 focus:outline-none"
                      placeholder="Custom"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm font-semibold text-gray-700">GST is:</span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      checked={!isInclusive} 
                      onChange={() => setIsInclusive(false)}
                      className="w-4 h-4 accent-orange-600"
                    />
                    <span className="text-sm">Exclusive</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      checked={isInclusive} 
                      onChange={() => setIsInclusive(true)}
                      className="w-4 h-4 accent-orange-600"
                    />
                    <span className="text-sm">Inclusive</span>
                  </label>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-4 items-center">
                    <label className="font-semibold text-gray-700">Total Deductions (80C, 80D, etc.)</label>
                    <span className="font-bold text-orange-600">₹{deductions.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="5000"
                    value={deductions}
                    onChange={(e) => setDeductions(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-start gap-3 bg-orange-50 p-4 rounded-xl text-orange-700 text-sm">
                <Info size={18} className="mt-0.5 flex-shrink-0" />
                <p>
                  {type === "gst" 
                    ? "GST calculations are as per current Indian tax laws. Please consult a professional for business filings."
                    : "Income tax is calculated based on simplified old tax regime. New regime calculations may differ."}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-orange-600 rounded-3xl p-8 text-white shadow-xl shadow-orange-200">
              <div className="mb-10">
                <p className="text-orange-100 text-sm mb-2 uppercase tracking-widest font-semibold">
                  {type === "gst" ? "GST Amount" : "Estimated Tax"}
                </p>
                <h2 className="text-4xl font-bold">₹{Math.round(taxAmount).toLocaleString('en-IN')}</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-orange-100">
                    {type === "gst" ? "Base Amount" : "Gross Income"}
                  </span>
                  <span className="font-bold text-lg">
                    ₹{(isInclusive && type === 'gst' ? amount - taxAmount : amount).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-orange-100">
                    {type === "gst" ? "Total Amount" : "Post-tax Income"}
                  </span>
                  <span className="font-bold text-xl text-yellow-300">
                    ₹{Math.round(totalAmount).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button className="mt-10 bg-white text-orange-600 w-full py-4 rounded-2xl font-bold hover:bg-orange-50 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                {type === 'gst' ? 'Generate Invoice' : 'Plan Savings'}
              </button>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <ShieldCheck size={18} className="text-orange-600" />
                Tax Compliance
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Stay compliant with the latest tax regulations and plan your finances better.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
