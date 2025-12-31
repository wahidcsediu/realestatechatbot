
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'chat', icon: '💬', label: 'Advisor' },
    { id: 'trends', icon: '📈', label: 'Market Trends' },
    { id: 'calc', icon: '🧮', label: 'Mortgage Calc' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold animate-slow-pulse shadow-lg shadow-blue-200">
            E
          </div>
          <span className="hidden md:block font-bold text-xl text-slate-800 tracking-tight">EstateAI</span>
        </div>

        <nav className="flex-1 px-3 space-y-2 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="hidden md:block text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="hidden md:flex flex-col gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-semibold text-slate-600">Gemini 2.5 Online</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              Real-time property data and investment insights active.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default Layout;
