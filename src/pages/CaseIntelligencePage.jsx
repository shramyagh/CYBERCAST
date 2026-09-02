import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft, Search, Bell, Settings, ChevronDown, 
  MapPin, Clock, ShieldAlert, FolderTree, User,
  Activity, Zap, Info, Target, CreditCard, Crosshair, 
  Database, AlertTriangle, Eye, Network
} from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Sidebar from '../components/Sidebar';
import ZoneModal from '../components/ZoneModal';
import UserProfileDropdown from '../components/UserProfileDropdown';
import { CASES, ALERTS, getZoneById } from '../data/mockData';

// ── Top Header specific to Case Intelligence ─────────────────
function CaseHeader({ unreadCount }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col mb-4">
      <button 
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-1.5 text-cyan-500 hover:text-cyan-400 text-xs font-bold transition-colors w-fit mb-3"
      >
        <ArrowLeft size={14} /> Back to Command Center
      </button>

      <header className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid rgba(34,211,238,0.08)' }}>
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">Case Intelligence</h1>
          <p className="text-xs text-slate-500 mt-1">Deep dive into cases and their connections</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
            <input
              type="text"
              className="input-field pl-9 pr-4 py-2.5 text-xs"
              style={{ width: 260 }}
              placeholder="Search Case ID, Account, Phone..."
            />
          </div>

          {/* Notification */}
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
  );
}

// ── Shared Card Container ─────────────────────────────────────
function Card({ title, children, action, flex }) {
  return (
    <div className={`rounded-xl flex flex-col h-full ${flex ? 'flex-1' : ''}`} style={{
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

export default function CaseIntelligencePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlCaseId = searchParams.get('caseId');
  const urlZoneId = searchParams.get('zoneId');
  const urlMuleId = searchParams.get('muleId');

  let caseData = CASES[0]; // default
  if (urlCaseId) {
    caseData = CASES.find(c => c.id === urlCaseId) || caseData;
  } else if (urlZoneId) {
    caseData = CASES.find(c => c.predictedZone === urlZoneId) || caseData;
  } else if (urlMuleId) {
    caseData = CASES.find(c => c.linkedAccount === urlMuleId) || caseData;
  }

  const unreadCount = ALERTS.filter(a => !a.acknowledged).length;
  const [showZoneModal, setShowZoneModal] = useState(false);
  const [showLinkedCases, setShowLinkedCases] = useState(false);

  return (
    <div className="flex h-screen w-full bg-navy-950 text-slate-200 overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 bg-[#050B14]">
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
          
          <CaseHeader unreadCount={unreadCount} />

          {/* ── TOP RIBBON ── */}
          <div className="rounded-xl mb-5 relative z-50" style={{
            background: 'rgba(10,20,34,0.6)',
            border: '1px solid rgba(34,211,238,0.1)',
            backdropFilter: 'blur(10px)',
          }}>
            <div className="flex items-center justify-between p-5 w-full divide-x divide-cyan-500/10">
              {/* Title Section */}
              <div className="pr-4 lg:pr-6 flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 tracking-wider flex-shrink-0">
                    CRITICAL
                  </span>
                  <span className="text-xl font-black text-white truncate">{caseData.id}</span>
                </div>
                <div className="text-xs text-slate-500 truncate">{caseData.type} Fraud • Reported on 23 Aug 2026, 14:32 • {caseData.location}, Uttar Pradesh</div>
              </div>

              <div className="flex items-center gap-3 px-4 lg:px-6 flex-shrink-0">
                <CreditCard size={20} className="text-slate-500 hidden sm:block" />
                <div>
                  <div className="text-[10px] md:text-xs text-slate-500 mb-0.5">Amount</div>
                  <div className="text-base md:text-lg font-bold text-slate-200">₹45,000</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 lg:px-6 flex-shrink-0">
                <ShieldAlert size={20} className="text-red-400 hidden sm:block" />
                <div>
                  <div className="text-[10px] md:text-xs text-slate-500 mb-0.5">Risk Score</div>
                  <div className="text-base md:text-lg font-bold text-red-400">87<span className="text-xs md:text-sm text-slate-600">/100</span></div>
                </div>
              </div>

              <div 
                className="flex items-center gap-3 px-4 lg:px-6 flex-shrink-0 relative cursor-pointer group"
                onClick={() => setShowLinkedCases(!showLinkedCases)}
              >
                <FolderTree size={20} className={`hidden sm:block transition-colors ${showLinkedCases ? 'text-cyan-400' : 'text-slate-500 group-hover:text-cyan-400'}`} />
                <div>
                  <div className={`text-[10px] md:text-xs mb-0.5 transition-colors ${showLinkedCases ? 'text-cyan-400' : 'text-slate-500 group-hover:text-cyan-400'}`}>Linked Cases</div>
                  <div className="text-base md:text-lg font-bold text-slate-200">7</div>
                </div>

                {/* Click Dropdown */}
                {showLinkedCases && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 transition-all z-[500]">
                    <div className="p-3 rounded-lg shadow-xl" style={{
                      background: 'rgba(7,14,26,0.95)',
                      border: '1px solid rgba(34,211,238,0.2)',
                      backdropFilter: 'blur(12px)',
                    }}>
                      <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2 flex justify-between items-center">
                        Related Cases
                        <span className="bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded text-[9px]">7 ACTIVE</span>
                      </div>
                      <div className="space-y-1">
                        {['CY-10282', 'CY-10283', 'CY-10284', 'CY-10285', 'CY-10286', 'CY-10287', 'CY-10288'].map((id) => (
                          <div key={id} className="text-xs text-slate-300 hover:text-cyan-400 py-1.5 px-2 rounded hover:bg-cyan-500/10 transition-colors flex items-center justify-between">
                            {id}
                            <ArrowLeft size={10} className="opacity-0 group-hover:opacity-100 rotate-135" style={{ transform: 'rotate(135deg)' }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 pl-4 lg:pl-6 flex-shrink-0">
                <User size={20} className="text-slate-500 hidden sm:block" />
                <div>
                  <div className="text-[10px] md:text-xs text-slate-500 mb-0.5">Linked Account</div>
                  <div className="text-base md:text-lg font-bold text-slate-200">{caseData.linkedAccount}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── MIDDLE ROW (3 Cols) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
            
            {/* Case Location */}
            <Card title="Case Location">
              <div className="rounded-lg overflow-hidden relative flex-1 min-h-[240px]" style={{ border: '1px solid rgba(34,211,238,0.1)' }}>
                <MapContainer center={[28.5705, 77.3219]} zoom={12} style={{ width: '100%', height: '100%', background: '#050B14' }} zoomControl={false} scrollWheelZoom={false}>
                  <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                  <Circle center={[28.5705, 77.3219]} radius={1500} pathOptions={{ color: '#EF4444', fillColor: '#EF4444', fillOpacity: 0.1, weight: 1 }} />
                  <Circle center={[28.5705, 77.3219]} radius={500} pathOptions={{ color: '#EF4444', fillColor: '#EF4444', fillOpacity: 0.3, weight: 0 }} />
                  <CircleMarker center={[28.5705, 77.3219]} radius={4} pathOptions={{ color: '#fff', fillColor: '#EF4444', fillOpacity: 1, weight: 2 }} />
                </MapContainer>
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg z-[400] flex items-center gap-3" style={{ background: 'rgba(7,14,26,0.9)', border: '1px solid rgba(34,211,238,0.15)', backdropFilter: 'blur(8px)' }}>
                  <MapPin size={16} className="text-red-400 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-200">Noida Sector 18</div>
                    <div className="text-[10px] text-slate-500">Uttar Pradesh</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Case Information */}
            <Card title="Case Information">
              <div className="flex flex-col justify-between flex-1 py-1">
                {[
                  { icon: Activity, label: 'Fraud Type', val: caseData.type + ' Fraud' },
                  { icon: CreditCard, label: 'Amount', val: '₹45,000' },
                  { icon: MapPin, label: 'Victim Location', val: 'Noida, Uttar Pradesh' },
                  { icon: Clock, label: 'Reported Time', val: '23 Aug 2026, 14:32' },
                  { icon: User, label: 'Linked Account', val: <span className="text-cyan-400 font-bold">{caseData.linkedAccount}</span> },
                  { icon: Target, label: 'Risk Score', val: <span className="text-red-400 font-bold bg-red-500/10 px-2 py-0.5 rounded">87/100</span> },
                  { icon: Crosshair, label: 'Status', val: <span className="text-orange-400 font-bold bg-orange-500/10 px-2 py-0.5 rounded">Under Investigation</span> },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-slate-500">
                      <item.icon size={14} className="opacity-70" />
                      {item.label}
                    </div>
                    <div className="font-medium text-slate-300 text-right">{item.val}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Why High Risk & Predicted */}
            <div className="flex flex-col gap-5">
              <Card title="Why High Risk?" action={<Info size={14} className="text-slate-500 cursor-pointer hover:text-cyan-400" />}>
                <div className="space-y-3.5">
                  {[
                    { label: 'Linked mule account', pct: 38, color: '#EF4444' },
                    { label: 'Previous activity', pct: 27, color: '#F97316' },
                    { label: 'Spatial proximity', pct: 19, color: '#EAB308' },
                    { label: 'Time pattern', pct: 11, color: '#22C55E' },
                    { label: 'Other factors', pct: 5, color: '#3B82F6' },
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 w-32 truncate">{f.label}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${f.pct}%`, background: f.color }} />
                      </div>
                      <span className="text-xs text-slate-500 w-8 text-right">{f.pct}%</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="Predicted Cash-Out">
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Likely Zone</div>
                    <div className="text-sm font-bold text-slate-200">Noida Sector 18</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Probability</div>
                    <div className="text-sm font-bold text-red-400">87%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Confidence</div>
                    <div className="text-sm font-bold text-cyan-400">91%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Predicted Window</div>
                    <div className="text-sm font-bold text-slate-200">18:00 – 00:00</div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowZoneModal(true)}
                  className="w-full py-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-500/5 hover:bg-cyan-500/10 rounded-md transition-colors"
                >
                  View Prediction Details →
                </button>
              </Card>
            </div>
            
          </div>

          {/* ── BOTTOM ROW (2 Cols) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            
            {/* Linked Entities Panel (Replaced Table as requested) */}
            <Card title="Linked Entities (7)">
              <div className="flex flex-col flex-1 justify-between gap-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 border border-red-500/30">
                    <AlertTriangle size={18} className="text-red-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-red-400 mb-0.5">High Network Risk</div>
                    <div className="text-xs text-slate-400">This account is central to 7 different UPI fraud complaints within 48 hours.</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg" style={{ background: 'rgba(34,211,238,0.03)', border: '1px solid rgba(34,211,238,0.08)' }}>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Linked Mule Account</div>
                    <div className="text-lg font-black text-slate-200">{caseData.linkedAccount}</div>
                    <button 
                      onClick={() => navigate(`/mule-network?muleId=${caseData.linkedAccount}`)}
                      className="mt-2 text-xs text-cyan-400 flex items-center gap-1 hover:text-cyan-300"
                    >
                      <Eye size={12} /> View Details
                    </button>
                  </div>
                  <div className="p-4 rounded-lg" style={{ background: 'rgba(34,211,238,0.03)', border: '1px solid rgba(34,211,238,0.08)' }}>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Linked Phone</div>
                    <div className="text-lg font-black text-slate-200">P9921****14</div>
                    <button className="mt-2 text-xs text-cyan-400 flex items-center gap-1 hover:text-cyan-300">
                      <Eye size={12} /> View Details
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">First Seen</div>
                    <div className="text-sm font-medium text-slate-300">18 Aug 2026</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Last Activity</div>
                    <div className="text-sm font-medium text-slate-300">23 Aug 2026</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Related Complaints</div>
                    <div className="text-sm font-medium text-slate-300">7 Active</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Case Activity Timeline */}
            <Card title="Case Activity Timeline">
              <div className="relative pl-8 space-y-6 before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-cyan-500/20 before:via-cyan-500/20 before:to-transparent">
                {[
                  { time: '14:32', event: 'Complaint received via helpline', icon: Bell, color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
                  { time: '14:33', event: 'Linked account MULE-7821 identified', icon: Database, color: 'text-purple-400', bg: 'bg-purple-500/20' },
                  { time: '14:34', event: '7 linked cases found across NCR', icon: Network, color: 'text-orange-400', bg: 'bg-orange-500/20' },
                  { time: '14:35', event: 'Risk score calculated (87/100)', icon: ShieldAlert, color: 'text-red-400', bg: 'bg-red-500/20' },
                  { time: '14:37', event: 'Cash-out zone predicted in Noida Sector 18', icon: MapPin, color: 'text-green-400', bg: 'bg-green-500/20' },
                ].map((item, i) => (
                  <div key={i} className="relative flex items-center group is-active">
                    <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 border-[#0A1422] ${item.bg} text-white shadow shrink-0 absolute -left-8`}>
                      <item.icon size={10} className={item.color} />
                    </div>
                    <div className="flex gap-4 w-full pl-2">
                      <div className="w-12 text-right shrink-0">
                        <span className="text-xs font-bold text-slate-500">{item.time}</span>
                      </div>
                      <div className="flex-1 text-sm text-slate-300">{item.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

          </div>

        </div>
      </main>

      {showZoneModal && (
        <ZoneModal 
          zone={getZoneById(caseData.predictedZone)}
          onClose={() => setShowZoneModal(false)}
        />
      )}
    </div>
  );
}
