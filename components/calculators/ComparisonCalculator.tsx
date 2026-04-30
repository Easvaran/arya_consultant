"use client";

import { useState, useEffect } from "react";
import { Columns, Info, CheckCircle2 } from "lucide-react";

export default function ComparisonCalculator() {
  const [amount, setAmount] = useState(1000000);
  const [tenure, setTenure] = useState(120);
  
  const [rate1, setRate1] = useState(8.5);
  const [rate2, setRate2] = useState(9.5);

  const calculateEMI = (p: number, r: number, n: number) => {
    const ratePerMonth = r / (12 * 100);
    return (p * ratePerMonth * Math.pow(1 + ratePerMonth, n)) / (Math.pow(1 + ratePerMonth, n) - 1);
  };

  const emi1 = calculateEMI(amount, rate1, tenure);
  const emi2 = calculateEMI(amount, rate2, tenure);
  
  const totalPay1 = emi1 * tenure;
  const totalPay2 = emi2 * tenure;
  
  const totalInt1 = totalPay1 - amount;
  const totalInt2 = totalPay2 - amount;
  
  const diffEMI = Math.abs(emi1 - emi2);
  const diffInt = Math.abs(totalInt1 - totalInt2);

  return (
    <div className="py-12 px-4 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Loan Comparison Calculator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Compare two loan options side-by-side to find the best deal for your financial situation.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4">Loan Details</h3>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Amount</label>
              <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full font-bold text-primary focus:outline-none bg-gray-50 p-3 rounded-xl border border-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tenure (Months)</label>
              <input 
                type="number" 
                value={tenure} 
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full font-bold text-primary focus:outline-none bg-gray-50 p-3 rounded-xl border border-gray-100"
              />
            </div>
            <div className="pt-6 border-t border-gray-100">
              <div className="bg-blue-50 p-4 rounded-xl text-blue-700 text-sm">
                <Info size={18} className="mb-2" />
                <p>Even a 0.5% difference in interest rate can save you thousands in the long run.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="grid sm:grid-cols-2 gap-8">
              {/* Option 1 */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-primary/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary/10 px-4 py-1 rounded-bl-xl text-primary text-xs font-bold">OPTION 1</div>
                <h4 className="font-bold text-xl mb-6">Standard Rate</h4>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Interest Rate</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        value={rate1} 
                        onChange={(e) => setRate1(Number(e.target.value))}
                        className="text-2xl font-bold text-gray-800 w-24 bg-transparent focus:outline-none"
                      />
                      <span className="text-xl font-bold text-gray-400">%</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-50">
                    <p className="text-sm text-gray-500 mb-1">Monthly EMI</p>
                    <p className="text-2xl font-bold text-primary">₹{Math.round(emi1).toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Interest</p>
                    <p className="text-xl font-bold text-gray-700">₹{Math.round(totalInt1).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </div>

              {/* Option 2 */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-blue-600 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-blue-600 px-4 py-1 rounded-bl-xl text-white text-xs font-bold">OPTION 2</div>
                <h4 className="font-bold text-xl mb-6">Special Offer</h4>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Interest Rate</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        value={rate2} 
                        onChange={(e) => setRate2(Number(e.target.value))}
                        className="text-2xl font-bold text-gray-800 w-24 bg-transparent focus:outline-none"
                      />
                      <span className="text-xl font-bold text-gray-400">%</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-50">
                    <p className="text-sm text-gray-500 mb-1">Monthly EMI</p>
                    <p className="text-2xl font-bold text-blue-600">₹{Math.round(emi2).toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Interest</p>
                    <p className="text-xl font-bold text-gray-700">₹{Math.round(totalInt2).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Result */}
            <div className="bg-gradient-to-r from-blue-600 to-primary rounded-3xl p-8 text-white shadow-xl shadow-blue-200">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Potential Savings</h3>
                  <p className="text-blue-100">By choosing the lower interest rate option</p>
                </div>
                <div className="text-center md:text-right">
                  <div className="bg-white/20 backdrop-blur-sm px-6 py-4 rounded-2xl">
                    <p className="text-sm text-blue-100 uppercase tracking-wider mb-1">Total Savings</p>
                    <p className="text-3xl font-bold text-yellow-300">₹{Math.round(diffInt).toLocaleString('en-IN')}</p>
                    <p className="text-xs text-blue-200 mt-1">₹{Math.round(diffEMI).toLocaleString('en-IN')} / month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
