"use client";

import { useState, useEffect } from "react";
import { BarChart, Info, TrendingUp, DollarSign } from "lucide-react";

export default function ROICalculator() {
  const [initialValue, setInitialValue] = useState(100000);
  const [finalValue, setFinalValue] = useState(150000);
  const [timePeriod, setTimePeriod] = useState(2);
  
  const [roi, setRoi] = useState(0);
  const [annualizedRoi, setAnnualizedRoi] = useState(0);

  useEffect(() => {
    const profit = finalValue - initialValue;
    const roiValue = (profit / initialValue) * 100;
    
    // Annualized ROI = [(Final Value / Initial Value)^(1/t) - 1] * 100
    const annRoi = (Math.pow(finalValue / initialValue, 1 / timePeriod) - 1) * 100;

    setRoi(roiValue);
    setAnnualizedRoi(annRoi);
  }, [initialValue, finalValue, timePeriod]);

  return (
    <div className="py-12 px-4 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">ROI (Return on Investment) Calculator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Calculate the efficiency of your investment. Find out your total return and annualized growth rate.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Initial Investment Amount</label>
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-gray-400">₹</span>
                  <input 
                    type="number" 
                    value={initialValue} 
                    onChange={(e) => setInitialValue(Number(e.target.value))}
                    className="w-full font-bold text-green-600 focus:outline-none bg-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Final Value / Sale Price</label>
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-gray-400">₹</span>
                  <input 
                    type="number" 
                    value={finalValue} 
                    onChange={(e) => setFinalValue(Number(e.target.value))}
                    className="w-full font-bold text-green-600 focus:outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-4 items-center">
                <label className="font-semibold text-gray-700">Investment Period (Years)</label>
                <span className="font-bold text-green-600">{timePeriod} Years</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="30"
                step="0.5"
                value={timePeriod}
                onChange={(e) => setTimePeriod(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-start gap-3 bg-green-50 p-4 rounded-xl text-green-700 text-sm">
                <Info size={18} className="mt-0.5 flex-shrink-0" />
                <p>
                  ROI tells you the total percentage gain or loss. Annualized ROI is more useful for comparing investments held for different time periods.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-green-600 rounded-3xl p-8 text-white shadow-xl shadow-green-200">
              <div className="mb-10">
                <p className="text-green-100 text-sm mb-2 uppercase tracking-widest font-semibold">Total ROI</p>
                <h2 className="text-5xl font-bold">{roi.toFixed(2)}%</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-green-100">Annualized ROI</span>
                  <span className="font-bold text-lg">{annualizedRoi.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Net Profit</span>
                  <span className="font-bold text-xl text-yellow-300">₹{(finalValue - initialValue).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <TrendingUp size={18} className="text-green-600" />
                Investment Performance
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                An ROI of <span className="font-bold text-green-600">{roi.toFixed(2)}%</span> over <span className="font-bold text-green-600">{timePeriod} years</span> represents a solid return on your capital.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
