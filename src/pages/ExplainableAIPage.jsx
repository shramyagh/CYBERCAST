import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Search, Bell, ChevronDown, Brain, Zap, Target, CreditCard, MapPin, Activity, User
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import UserProfileDropdown from '../components/UserProfileDropdown';
import { ALERTS, CASES } from '../data/mockData';

// TODO: Replace mock XAI factors with real model/SHAP output.
const xaiMockData = {
  riskScore: 87,
  riskLevel: "HIGH",
  factors: [
    {
      icon: '🔴',
      name: "Potential Mule Account",
      explanation: "Account MULE-7821 is associated with 7 reported cases.",
    },
    {
      icon: '🟠',
      name: "Potentially Suspicious Activity",
      explanation: "Similar cash-out activity was previously observed around this region.",
    },
    {
      icon: '🟡',
      name: "Location Pattern",
      explanation: "The predicted area has shown repeated historical cash-out activity.",
    }
  ],
  prediction: {
    location: "Noida Sector 18",
    probability: 87,
    time: "18:00 – 00:00"
  },
  summary: "This case is considered high risk mainly because the linked account appears in multiple reported cases and has previous activity around the predicted cash-out area."
};

export default function ExplainableAIPage() {
  const navigate = useNavigate();
  const unreadCount = ALERTS.filter(a => !a.acknowledged).length;
  
  const [searchQuery, setSearchQuery] = useState('');
  
  // Find a matching case if user types a Case ID (e.g., '10281' or 'CY-10281')
  const searchedCase = searchQuery.length > 2 
    ? CASES.find(c => c.id.toLowerCase().includes(searchQuery.toLowerCase()))
    : null;

  return (
    <div className="flex h-screen w-full bg-[#050B14] text-slate-200 overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar flex flex-col">
          
          {/* Header */}
          <div className="flex flex-col mb-8">
            <header className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid rgba(34,211,238,0.08)' }}>
              <div>
                <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                  <Brain size={22} className="text-cyan-400" /> Explainable AI
                </h1>
                <p className="text-xs text-slate-500 mt-1">Transparent insights into AI risk predictions</p>
              </div>

              <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative hidden sm:block">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-9 pr-4 py-2.5 text-xs"
                    style={{ 
                      width: 260, 
                      background: 'rgba(34,211,238,0.05)', 
                      border: '1px solid rgba(34,211,238,0.1)',
                      color: '#e2e8f0',
                      borderRadius: '0.5rem'
                    }}
                    placeholder="Search Case ID..."
                  />
                </div>

                {/* Notifications */}
                <div className="relative">
                  <button className="relative w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                    style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.1)' }}>
                    <Bell size={16} className="text-slate-400" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: '#EF4444', color: '#fff', fontSize: 9 }}>
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </div>
                <UserProfileDropdown />
              </div>
            </header>
          </div>

          {/* Main Content Area - Centered and Clean */}
          <div className="flex-1 flex flex-col items-center pt-4">
            
            {/* CASE INFO FLASH CARD (Appears when searching) */}
            {searchedCase && (
              <div className="w-full max-w-3xl rounded-xl p-5 mb-8 animate-in fade-in slide-in-from-top-4 duration-300" style={{
                background: 'rgba(7,14,26,0.8)',
                border: '1px solid rgba(34,211,238,0.2)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                backdropFilter: 'blur(10px)',
              }}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 tracking-wider">
                        CRITICAL
                      </span>
                      <h2 className="text-lg font-black text-white tracking-widest">{searchedCase.id}</h2>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-2">
                      <Activity size={12} /> {searchedCase.type} Fraud 
                      <span className="mx-1">•</span>
                      <MapPin size={12} /> {searchedCase.location}
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <CreditCard size={16} className="text-slate-500 hidden sm:block" />
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Amount</div>
                      <div className="text-lg font-black text-slate-200">₹45,000</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 mt-4" style={{ borderTop: '1px solid rgba(34,211,238,0.1)' }}>
                  <div>
                     <div className="text-[9px] text-slate-500 uppercase flex items-center gap-1.5 mb-1"><User size={10} /> Linked Account</div>
                     <div className="text-xs font-bold text-cyan-400">{searchedCase.linkedAccount}</div>
                  </div>
                  <div>
                     <div className="text-[9px] text-slate-500 uppercase mb-1">Status</div>
                     <div className="text-[10px] font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 w-fit px-1.5 py-0.5 rounded">Under Investigation</div>
                  </div>
                  <div>
                     <div className="text-[9px] text-slate-500 uppercase mb-1">Reported Date</div>
                     <div className="text-xs font-bold text-slate-300">23 Aug 2026</div>
                  </div>
                </div>
              </div>
            )}

            <div className="w-full max-w-3xl rounded-xl p-8 lg:p-10" style={{
              background: 'rgba(10,20,34,0.6)',
              border: '1px solid rgba(34,211,238,0.1)',
              boxShadow: '0 0 40px rgba(34,211,238,0.03)',
              backdropFilter: 'blur(10px)',
            }}>
              
              <h2 className="text-lg font-black text-slate-200 tracking-widest uppercase mb-10 text-center flex justify-center items-center gap-3">
                Why is this case high risk?
              </h2>

              {/* Risk Score */}
              <div className="flex flex-col items-center justify-center mb-10">
                <div className="text-6xl font-black text-red-400 mb-2 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                  {xaiMockData.riskScore}<span className="text-3xl text-slate-600">/100</span>
                </div>
                <div className="text-sm font-bold px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 inline-flex items-center gap-2 uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                  <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  {xaiMockData.riskLevel} Risk
                </div>
              </div>

              {/* Top 3 Reasons */}
              <div className="space-y-6 mb-10">
                {xaiMockData.factors.map((factor, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-lg bg-[#050B14]/50 border border-slate-800/50 hover:bg-[#050B14] hover:border-slate-700 transition-colors">
                    <div className="text-xl mt-0.5">{factor.icon}</div>
                    <div>
                      <div className="text-sm font-bold text-slate-200 mb-1.5 tracking-wide">{factor.name}</div>
                      <div className="text-sm text-slate-400 leading-relaxed">{factor.explanation}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Summary */}
              <div className="mb-10">
                <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Zap size={14} /> AI Summary
                </div>
                <p className="text-sm text-slate-300 leading-relaxed italic bg-cyan-500/5 border border-cyan-500/10 p-5 rounded-lg shadow-[inset_0_0_20px_rgba(34,211,238,0.02)]">
                  "{xaiMockData.summary}"
                </p>
              </div>

              {/* Prediction Connection */}
              <div className="bg-[#070E1A] border border-slate-800 rounded-lg p-5">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Target size={14} /> Predicted Cash-Out
                </div>
                <div className="grid grid-cols-3 gap-6 divide-x divide-slate-800">
                  <div className="px-2">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Location</div>
                    <div className="text-sm font-bold text-slate-200">{xaiMockData.prediction.location}</div>
                  </div>
                  <div className="px-6">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Probability</div>
                    <div className="text-sm font-bold text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]">{xaiMockData.prediction.probability}%</div>
                  </div>
                  <div className="px-6">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Time Window</div>
                    <div className="text-sm font-bold text-slate-200">{xaiMockData.prediction.time}</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-xs text-slate-500 text-center leading-relaxed">
                Risk score is a model prediction and should support, not replace, human investigation.
              </div>
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
