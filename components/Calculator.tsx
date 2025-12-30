
import React, { useState, useEffect } from 'react';

const Calculator: React.FC = () => {
  const [price, setPrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);
  
  const [monthly, setMonthly] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    const principal = price - downPayment;
    const r = rate / 100 / 12;
    const n = years * 12;
    
    if (r === 0) {
      setMonthly(principal / n);
      setTotalInterest(0);
    } else {
      const m = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setMonthly(m);
      setTotalInterest((m * n) - principal);
    }
  }, [price, downPayment, rate, years]);

  return (
    <div className="p-8 max-w-4xl mx-auto w-full">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-800">Mortgage Calculator</h1>
        <p className="text-slate-500 mt-2">Plan your investment and understand your monthly commitments.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Inputs */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Home Price ($)</label>
            <input 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Down Payment ($)</label>
            <input 
              type="number" 
              value={downPayment} 
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Interest Rate (%)</label>
              <input 
                type="number" 
                step="0.1"
                value={rate} 
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Loan Term (Years)</label>
              <select 
                value={years} 
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={30}>30 Years</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-200">
            <p className="text-blue-100 font-medium uppercase tracking-wider text-sm mb-1">Estimated Monthly Payment</p>
            <h2 className="text-5xl font-bold">${Math.round(monthly).toLocaleString()}</h2>
            <div className="mt-8 pt-8 border-t border-blue-500 flex justify-between">
              <div>
                <p className="text-blue-200 text-xs uppercase font-semibold">Total Interest</p>
                <p className="text-xl font-bold">${Math.round(totalInterest).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-blue-200 text-xs uppercase font-semibold">Total Loan Amount</p>
                <p className="text-xl font-bold">${(price - downPayment).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">Payment Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-slate-600 text-sm">Principal & Interest</span>
                </div>
                <span className="font-bold text-slate-800">${Math.round(monthly).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                  <span className="text-slate-600 text-sm">Property Taxes (Est.)</span>
                </div>
                <span className="font-bold text-slate-800">${Math.round(price * 0.001).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                  <span className="text-slate-600 text-sm">Home Insurance (Est.)</span>
                </div>
                <span className="font-bold text-slate-800">$120</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
