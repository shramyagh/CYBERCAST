import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft, Search, Users, FileText, Network, AlertTriangle, 
  X, MapPin, Activity, DollarSign, Target
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import PredictionMapModal from '../components/PredictionMapModal';
import { CASES, MULE_ACCOUNTS } from '../data/mockData';

function Card({ title, children, flex, className = '', action }) {
  return (
    <div className={`rounded-xl flex flex-col h-full ${flex ? 'flex-1' : ''} ${className}`} style={{
      background: 'rgba(10,20,34,0.6)',
      border: '1px solid rgba(34,211,238,0.1)',
      backdropFilter: 'blur(10px)',
    }}>
      {title && (
        <div className="px-5 py-3.5 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(34,211,238,0.08)' }}>
          <h3 className="text-xs font-bold text-slate-300 tracking-widest uppercase">{title}</h3>
          {action && action}
        </div>
      )}
      <div className={`p-5 flex flex-col flex-1 min-h-0 ${flex ? 'overflow-y-auto' : ''}`}>
        {children}
      </div>
    </div>
  );
}

function KpiCard({ icon: Icon, color, title, val, sub }) {
  return (
    <div className="rounded-xl p-4 flex items-center gap-4" style={{
      background: 'rgba(10,20,34,0.6)',
      border: '1px solid rgba(34,211,238,0.1)',
      backdropFilter: 'blur(10px)',
    }}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-slate-900 border ${color.replace('text-', 'border-').replace('400', '500/30').replace('500', '500/30')} bg-opacity-50`}>
        <Icon size={18} className={color} />
      </div>
      <div>
        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">{title}</div>
        <div className="text-xl font-black text-slate-200 leading-none mb-1">{val}</div>
        <div className="text-[10px] text-green-400 font-medium">{sub}</div>
      </div>
    </div>
  );
}

function Node({ top, left, label, color, icon: Icon }) {
  const colors = {
    blue: 'bg-blue-500/20 border-blue-500/50 text-blue-400',
    cyan: 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400',
    purple: 'bg-purple-500/20 border-purple-500/50 text-purple-400',
  };

  const isCase = label.startsWith('CASE-');
  const caseId = isCase ? label.replace('CASE-', 'CY-') : null;
  const caseDetail = caseId ? CASES.find(c => c.id === caseId) : null;

  const navigate = useNavigate();

  return (
    <div 
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer" 
      style={{ top, left }}
      onClick={() => isCase && navigate(`/case-intelligence?caseId=${caseId}`)}
    >
      <div className={`w-10 h-10 rounded-full border flex items-center justify-center z-10 bg-[#050B14] shadow-lg transition-transform group-hover:scale-110 ${colors[color]}`}>
        <Icon size={16} />
      </div>
      <div className="mt-1.5 text-[10px] md:text-xs font-medium text-slate-300 whitespace-nowrap bg-[#050B14]/80 px-2 py-0.5 rounded">{label}</div>
      
      {/* Tooltip for Cases */}
      {caseDetail && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 w-48 p-3 rounded-lg border border-cyan-500/20 bg-[#070E1A]/95 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-white">{caseDetail.id}</span>
            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${caseDetail.riskScore > 80 ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'}`}>
              SCORE {caseDetail.riskScore}
            </span>
          </div>
          <div className="text-[10px] text-slate-400 mb-2">{caseDetail.type}</div>
          <div className="flex justify-between text-[10px]">
            <span className="text-slate-500">Amount</span>
            <span className="font-medium text-slate-300">₹{caseDetail.amount?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[10px] mt-1">
            <span className="text-slate-500">Status</span>
            <span className="font-medium text-slate-300 capitalize">{caseDetail.status}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function ZoneNode({ top, left, label, sublabel }) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer" style={{ top, left }}>
      <div className="w-10 h-10 rounded-full border border-orange-500/50 bg-orange-500/20 flex items-center justify-center z-10 bg-[#050B14] shadow-lg transition-transform group-hover:scale-110">
        <MapPin size={16} className="text-orange-400" />
      </div>
      <div className="mt-1.5 text-[10px] md:text-xs font-bold text-slate-200 whitespace-nowrap bg-[#050B14]/80 px-2 py-0.5 rounded">{label}</div>
      <div className="text-[9px] text-slate-500 whitespace-nowrap">{sublabel}</div>
    </div>
  );
}

function NetworkGraph7821() {
  return (
    <Card flex>
      <div className="flex-1 min-h-[500px] rounded-lg relative overflow-hidden" style={{
        background: 'radial-gradient(circle at center, rgba(34,211,238,0.03) 0%, transparent 70%)',
      }}>
        {/* Background Radar Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] border border-cyan-500/10 rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-cyan-500/10 rounded-full pointer-events-none"></div>
        
        {/* Legend */}
        <div className="absolute top-2 left-2 flex gap-4 text-[10px] text-slate-400 font-medium bg-[#050B14]/80 px-3 py-2 rounded-lg border border-cyan-500/10 backdrop-blur-sm z-20">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-cyan-400"></div> Mule Account</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-400"></div> Case/Complaint</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-400"></div> Bank Account</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-400"></div> Location/Zone</div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-2 left-2 flex flex-col gap-1 bg-[#050B14]/80 p-1 rounded-lg border border-cyan-500/10 z-20">
          <button className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white transition-colors">+</button>
          <div className="w-full h-px bg-cyan-500/10"></div>
          <button className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white transition-colors">-</button>
        </div>

        {/* SVG Lines - Hardcoded for visual matching */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="25" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(34,211,238,0.4)" />
            </marker>
          </defs>
          {/* Lines to Cases */}
          <line x1="50%" y1="50%" x2="40%" y2="25%" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <line x1="50%" y1="50%" x2="50%" y2="20%" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <line x1="50%" y1="50%" x2="65%" y2="30%" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <line x1="50%" y1="50%" x2="70%" y2="45%" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <line x1="50%" y1="50%" x2="35%" y2="45%" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <line x1="50%" y1="50%" x2="38%" y2="60%" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" markerEnd="url(#arrow)" />
          
          {/* Line to Mule-442 */}
          <line x1="50%" y1="50%" x2="60%" y2="55%" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
          {/* Line from Mule-442 to Case-10291 */}
          <line x1="60%" y1="55%" x2="72%" y2="65%" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Line to Bank Account */}
          <line x1="50%" y1="50%" x2="50%" y2="70%" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" />
          
          {/* Lines from Bank to Zones */}
          <line x1="50%" y1="70%" x2="35%" y2="85%" stroke="rgba(249,115,22,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="50%" y1="70%" x2="50%" y2="85%" stroke="rgba(249,115,22,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="50%" y1="70%" x2="65%" y2="85%" stroke="rgba(249,115,22,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>

        {/* Center Node (MULE-7821) */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-20"
          onClick={() => navigate('/case-intelligence?muleId=MULE-7821')}
        >
          <div className="w-14 h-14 rounded-full bg-[#050B14] border-2 border-red-500 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-transform group-hover:scale-110">
            <Users size={24} className="text-red-500" />
          </div>
          <div className="mt-2 text-sm font-bold text-white whitespace-nowrap bg-[#050B14]/80 px-2 py-0.5 rounded">MULE-7821</div>
          <div className="text-[10px] font-bold text-red-500 uppercase mt-0.5 bg-[#050B14]/80 px-1 rounded">Critical</div>
        </div>

        {/* Case Nodes */}
        <Node top="25%" left="40%" label="CASE-10283" color="blue" icon={FileText} />
        <Node top="20%" left="50%" label="CASE-10281" color="blue" icon={FileText} />
        <Node top="30%" left="65%" label="CASE-10278" color="blue" icon={FileText} />
        <Node top="45%" left="70%" label="CASE-10290" color="blue" icon={FileText} />
        <Node top="45%" left="35%" label="CASE-10265" color="blue" icon={FileText} />
        <Node top="60%" left="38%" label="CASE-10276" color="blue" icon={FileText} />
        <Node top="65%" left="72%" label="CASE-10291" color="blue" icon={FileText} />

        {/* Associated Mule */}
        <Node top="55%" left="60%" label="MULE-442" color="cyan" icon={Users} />

        {/* Bank Account */}
        <Node top="70%" left="50%" label="BANK-8842" color="purple" icon={Network} />

        {/* Zones */}
        <ZoneNode top="85%" left="35%" label="ZONE A" sublabel="(Sector 18, Noida)" />
        <ZoneNode top="85%" left="50%" label="ZONE C" sublabel="(Laxmi Nagar)" />
        <ZoneNode top="85%" left="65%" label="ZONE D" sublabel="(Ghaziabad)" />
      </div>
    </Card>
  );
}

function NetworkGraph3388() {
  return (
    <Card flex>
      <div className="flex-1 min-h-[500px] rounded-lg relative overflow-hidden" style={{
        background: 'radial-gradient(circle at center, rgba(34,211,238,0.03) 0%, transparent 70%)',
      }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] border border-cyan-500/10 rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-cyan-500/10 rounded-full pointer-events-none"></div>
        
        <div className="absolute top-2 left-2 flex gap-4 text-[10px] text-slate-400 font-medium bg-[#050B14]/80 px-3 py-2 rounded-lg border border-cyan-500/10 backdrop-blur-sm z-20">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-cyan-400"></div> Mule Account</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-400"></div> Case/Complaint</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-400"></div> Bank Account</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-400"></div> Location/Zone</div>
        </div>

        <div className="absolute bottom-2 left-2 flex flex-col gap-1 bg-[#050B14]/80 p-1 rounded-lg border border-cyan-500/10 z-20">
          <button className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white transition-colors">+</button>
          <div className="w-full h-px bg-cyan-500/10"></div>
          <button className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white transition-colors">-</button>
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="25" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(34,211,238,0.4)" />
            </marker>
          </defs>
          {/* Distinct clean layout for 3388 */}
          <line x1="50%" y1="50%" x2="35%" y2="30%" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <line x1="50%" y1="50%" x2="65%" y2="30%" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <line x1="50%" y1="50%" x2="50%" y2="70%" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" />
          <line x1="50%" y1="70%" x2="65%" y2="85%" stroke="rgba(249,115,22,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>

        {/* Center Node (MULE-3388) */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-20"
          onClick={() => navigate('/case-intelligence?muleId=MULE-3388')}
        >
          <div className="w-14 h-14 rounded-full bg-[#050B14] border-2 border-orange-500 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-transform group-hover:scale-110">
            <Users size={24} className="text-orange-500" />
          </div>
          <div className="mt-2 text-sm font-bold text-white whitespace-nowrap bg-[#050B14]/80 px-2 py-0.5 rounded">MULE-3388</div>
          <div className="text-[10px] font-bold text-orange-500 uppercase mt-0.5 bg-[#050B14]/80 px-1 rounded">Monitoring</div>
        </div>

        <Node top="30%" left="35%" label="CASE-10283" color="blue" icon={FileText} />
        <Node top="30%" left="65%" label="CASE-10289" color="blue" icon={FileText} />
        
        <Node top="70%" left="50%" label="HDFC BANK" color="purple" icon={Network} />
        <ZoneNode top="85%" left="65%" label="ZONE D" sublabel="(Ghaziabad)" />
      </div>
    </Card>
  );
}

function SidePanel7821({ onPredictClick }) {
  return (
    <Card 
      title="MULE-7821" 
      action={
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold bg-red-500/10 text-red-500 px-2 py-0.5 rounded border border-red-500/20">CRITICAL RISK</span>
          <X size={16} className="text-slate-500 cursor-pointer hover:text-white" />
        </div>
      }
      flex
    >
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-4 pb-4 border-b border-cyan-500/10">
          <div>
            <div className="text-[10px] text-slate-500 mb-1">Account Type</div>
            <div className="text-xs font-medium text-slate-300">Upi Linked Account</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 mb-1">First Seen</div>
            <div className="text-xs font-medium text-slate-300">12 Jul 2026</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 mb-1">Last Active</div>
            <div className="text-xs font-medium text-slate-300">23 Aug 2026</div>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-slate-500 tracking-wider mb-3 uppercase">Risk Overview</h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-2.5 rounded-lg border border-cyan-500/10 bg-slate-900/50 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[10px] text-slate-400"><FileText size={12}/> Linked Complaints</div>
              <div className="text-base font-bold text-white">8</div>
            </div>
            <div className="p-2.5 rounded-lg border border-cyan-500/10 bg-slate-900/50 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[10px] text-slate-400"><Users size={12}/> Linked Victims</div>
              <div className="text-base font-bold text-white">11</div>
            </div>
            <div className="p-2.5 rounded-lg border border-cyan-500/10 bg-slate-900/50 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[10px] text-slate-400"><Target size={12}/> Active Cases</div>
              <div className="text-base font-bold text-white">5</div>
            </div>
            <div className="p-2.5 rounded-lg border border-cyan-500/10 bg-slate-900/50 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[10px] text-slate-400"><DollarSign size={12}/> Previous Cash-outs</div>
              <div className="text-base font-bold text-white">4</div>
            </div>
            <div className="p-2.5 rounded-lg border border-cyan-500/10 bg-slate-900/50 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[10px] text-slate-400"><MapPin size={12}/> Geographical Spread</div>
              <div className="text-base font-bold text-white">3 Districts</div>
            </div>
            <div className="p-2.5 rounded-lg border border-cyan-500/10 bg-slate-900/50 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[10px] text-slate-400"><Network size={12}/> Network Centrality</div>
              <div className="text-base font-bold text-red-500">HIGH</div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-slate-500 tracking-wider mb-3 uppercase">Predicted Cash-out Destinations</h4>
          <div className="space-y-4">
            {[
              { label: 'Noida Sector 18', pct: 82, color: '#EF4444' },
              { label: 'Laxmi Nagar', pct: 74, color: '#F97316' },
              { label: 'Ghaziabad', pct: 61, color: '#EAB308' },
              { label: 'South Delhi', pct: 48, color: '#EAB308' }
            ].map((d, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-4">{i + 1}</span>
                <span className="text-xs text-slate-300 w-32 truncate">{d.label}</span>
                <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${d.pct}%`, background: d.color }} />
                </div>
                <span className="text-xs font-bold text-white w-8 text-right">{d.pct}%</span>
              </div>
            ))}
          </div>
          
          <button 
            onClick={onPredictClick}
            className="w-full mt-5 py-2.5 text-xs font-bold text-cyan-400 hover:text-white border border-cyan-500/30 hover:bg-cyan-500/10 rounded-md transition-colors flex items-center justify-center gap-2"
          >
            PREDICT NEXT CASH-OUT →
          </button>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-slate-500 tracking-wider mb-3 uppercase">Recent Activity</h4>
          <div className="relative pl-3 space-y-4 before:absolute before:inset-0 before:ml-[5px] before:-translate-x-px before:h-full before:w-px before:bg-cyan-500/10">
            {[
              { time: '23 Aug 2026, 14:32', event: 'Linked with Case CY-10281', color: 'bg-red-500' },
              { time: '23 Aug 2026, 13:18', event: 'Transaction detected - ₹45,000', color: 'bg-orange-500' },
              { time: '23 Aug 2026, 11:47', event: 'Linked with Case CY-10283', color: 'bg-blue-500' },
              { time: '22 Aug 2026, 21:05', event: 'Cash-out at ATM - Noida Sector 18', color: 'bg-orange-500' },
              { time: '22 Aug 2026, 19:12', event: 'Linked with Case CY-10265', color: 'bg-purple-500' },
            ].map((item, i) => (
              <div key={i} className="relative flex items-start group">
                <div className={`w-2 h-2 rounded-full border border-[#050B14] ${item.color} shadow shrink-0 absolute -left-3 top-1`}></div>
                <div className="flex gap-4 w-full pl-3">
                  <div className="w-24 shrink-0">
                    <span className="text-[10px] font-medium text-slate-500">{item.time}</span>
                  </div>
                  <div className="flex-1 text-[11px] text-slate-300 leading-tight mt-0.5">{item.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function SidePanel3388({ onPredictClick }) {
  return (
    <Card 
      title="MULE-3388" 
      action={
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded border border-orange-500/20">MONITORING</span>
          <X size={16} className="text-slate-500 cursor-pointer hover:text-white" />
        </div>
      }
      flex
    >
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-4 pb-4 border-b border-cyan-500/10">
          <div>
            <div className="text-[10px] text-slate-500 mb-1">Account Type</div>
            <div className="text-xs font-medium text-slate-300">Wallet Linked Account</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 mb-1">First Seen</div>
            <div className="text-xs font-medium text-slate-300">15 Jun 2026</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 mb-1">Last Active</div>
            <div className="text-xs font-medium text-slate-300">23 Aug 2026</div>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-slate-500 tracking-wider mb-3 uppercase">Risk Overview</h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-2.5 rounded-lg border border-cyan-500/10 bg-slate-900/50 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[10px] text-slate-400"><FileText size={12}/> Linked Complaints</div>
              <div className="text-base font-bold text-white">3</div>
            </div>
            <div className="p-2.5 rounded-lg border border-cyan-500/10 bg-slate-900/50 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[10px] text-slate-400"><Users size={12}/> Linked Victims</div>
              <div className="text-base font-bold text-white">4</div>
            </div>
            <div className="p-2.5 rounded-lg border border-cyan-500/10 bg-slate-900/50 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[10px] text-slate-400"><Target size={12}/> Active Cases</div>
              <div className="text-base font-bold text-white">2</div>
            </div>
            <div className="p-2.5 rounded-lg border border-cyan-500/10 bg-slate-900/50 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[10px] text-slate-400"><DollarSign size={12}/> Previous Cash-outs</div>
              <div className="text-base font-bold text-white">1</div>
            </div>
            <div className="p-2.5 rounded-lg border border-cyan-500/10 bg-slate-900/50 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[10px] text-slate-400"><MapPin size={12}/> Geographical Spread</div>
              <div className="text-base font-bold text-white">1 District</div>
            </div>
            <div className="p-2.5 rounded-lg border border-cyan-500/10 bg-slate-900/50 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[10px] text-slate-400"><Network size={12}/> Network Centrality</div>
              <div className="text-base font-bold text-orange-500">MODERATE</div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-slate-500 tracking-wider mb-3 uppercase">Predicted Cash-out Destinations</h4>
          <div className="space-y-4">
            {[
              { label: 'Kaushambi, Ghaziabad', pct: 85, color: '#F97316' },
              { label: 'Vaishali, Ghaziabad', pct: 60, color: '#EAB308' },
            ].map((d, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-4">{i + 1}</span>
                <span className="text-xs text-slate-300 w-32 truncate">{d.label}</span>
                <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${d.pct}%`, background: d.color }} />
                </div>
                <span className="text-xs font-bold text-white w-8 text-right">{d.pct}%</span>
              </div>
            ))}
          </div>
          
          <button 
            onClick={onPredictClick}
            className="w-full mt-5 py-2.5 text-xs font-bold text-cyan-400 hover:text-white border border-cyan-500/30 hover:bg-cyan-500/10 rounded-md transition-colors flex items-center justify-center gap-2"
          >
            PREDICT NEXT CASH-OUT →
          </button>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-slate-500 tracking-wider mb-3 uppercase">Recent Activity</h4>
          <div className="relative pl-3 space-y-4 before:absolute before:inset-0 before:ml-[5px] before:-translate-x-px before:h-full before:w-px before:bg-cyan-500/10">
            {[
              { time: '23 Aug 2026, 19:20', event: 'Linked with Wallet Case CY-10289', color: 'bg-blue-500' },
              { time: '23 Aug 2026, 10:15', event: 'Small deposit received - ₹8,500', color: 'bg-orange-500' },
              { time: '21 Aug 2026, 14:02', event: 'Linked with UPI Case CY-10283', color: 'bg-blue-500' },
            ].map((item, i) => (
              <div key={i} className="relative flex items-start group">
                <div className={`w-2 h-2 rounded-full border border-[#050B14] ${item.color} shadow shrink-0 absolute -left-3 top-1`}></div>
                <div className="flex gap-4 w-full pl-3">
                  <div className="w-24 shrink-0">
                    <span className="text-[10px] font-medium text-slate-500">{item.time}</span>
                  </div>
                  <div className="flex-1 text-[11px] text-slate-300 leading-tight mt-0.5">{item.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function MuleNetworkPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const muleId = searchParams.get('muleId') || 'MULE-7821';
  
  const is3388 = muleId === 'MULE-3388';
  const [showPredictionModal, setShowPredictionModal] = useState(false);

  return (
    <div className="flex h-screen w-full bg-navy-950 text-slate-200 overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 bg-[#050B14]">
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
          
          <div className="flex flex-col mb-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-cyan-500 hover:text-cyan-400 text-xs font-bold transition-colors w-fit mb-3"
            >
              <ArrowLeft size={14} /> Back
            </button>

            <header className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid rgba(34,211,238,0.08)' }}>
              <div>
                <h1 className="text-xl font-black text-white tracking-tight uppercase">Mule Network Intelligence</h1>
                <p className="text-xs text-slate-500 mt-1">Visualize mule accounts, linked cases and predicted cash-out destinations</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    type="text"
                    className="input-field pl-9 pr-4 py-2 text-xs bg-slate-900/50"
                    style={{ width: 280 }}
                    placeholder="Search Mule ID / Account / Phone..."
                  />
                </div>
                <button className="btn-secondary px-4 py-2 text-xs flex items-center gap-2">
                  <Network size={14} /> Export Network
                </button>
              </div>
            </header>
          </div>

          {/* KPIs Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
            <KpiCard icon={Users} color="text-purple-400" title="Total Mule Accounts" val="43" sub="↑ 8 this week" />
            <KpiCard icon={FileText} color="text-blue-400" title="Linked Complaints" val="284" sub="↑ 22 this week" />
            <KpiCard icon={Network} color="text-cyan-400" title="Active Networks" val="17" sub="↑ 3 this week" />
            <KpiCard icon={AlertTriangle} color="text-red-500" title="High Risk Accounts" val="8" sub="↑ 2 this week" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5 flex-1 min-h-0">
            {/* Main Network Graph */}
            <div className="lg:col-span-2 flex flex-col min-h-[500px]">
              {is3388 ? <NetworkGraph3388 /> : <NetworkGraph7821 />}
            </div>

            {/* Selected Mule Details Sidebar */}
            <div className="flex flex-col gap-5 h-full">
              {is3388 ? <SidePanel3388 onPredictClick={() => setShowPredictionModal(true)} /> : <SidePanel7821 onPredictClick={() => setShowPredictionModal(true)} />}
            </div>
          </div>

        </div>
      </main>
      
      {showPredictionModal && (
        <PredictionMapModal onClose={() => setShowPredictionModal(false)} />
      )}
    </div>
  );
}
