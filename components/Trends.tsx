
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const dummyData = [
  { month: 'Jan', price: 450000, inventory: 120 },
  { month: 'Feb', price: 455000, inventory: 115 },
  { month: 'Mar', price: 462000, inventory: 105 },
  { month: 'Apr', price: 470000, inventory: 98 },
  { month: 'May', price: 485000, inventory: 90 },
  { month: 'Jun', price: 495000, inventory: 85 },
  { month: 'Jul', price: 490000, inventory: 95 },
  { month: 'Aug', price: 482000, inventory: 110 },
  { month: 'Sep', price: 475000, inventory: 130 },
  { month: 'Oct', price: 470000, inventory: 145 },
  { month: 'Nov', price: 465000, inventory: 155 },
  { month: 'Dec', price: 468000, inventory: 140 },
];

const Trends: React.FC = () => {
  return (
    <div className="p-8 space-y-8 overflow-y-auto h-full">
      <header>
        <h1 className="text-3xl font-bold text-slate-800">Market Insights</h1>
        <p className="text-slate-500 mt-2">Historical trends for your current region based on aggregate data.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Median Sales Price</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dummyData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(val: number) => [`$${val.toLocaleString()}`, 'Price']}
                />
                <Area type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Active Inventory</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dummyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="inventory" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Avg. Days on Market', value: '24', trend: '-4.2%', color: 'text-green-600' },
          { label: 'Inventory Growth', value: '142', trend: '+12.5%', color: 'text-red-600' },
          { label: 'Price/Sq. Ft', value: '$412', trend: '+2.1%', color: 'text-green-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-3xl font-bold text-slate-800">{stat.value}</span>
              <span className={`text-sm font-semibold ${stat.color}`}>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trends;
