import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import UserProfileDropdown from '../components/UserProfileDropdown';
import { Bell, MapPin, Target, ChevronRight, CheckCircle2, UserPlus, FileSearch, ShieldAlert, MessageSquare, Play, X, ChevronDown, ChevronUp } from 'lucide-react';

const INITIAL_ALERTS = [
  {
    id: "CY-10281",
    severity: "CRITICAL",
    location: "Noida Sector 18",
    risk: 87,
    window: "18:00 – 00:00",
    reason: "Multiple recent cases and previous activity detected.",
    relatedCases: 7,
    mule: "MULE-7821",
    status: "UNASSIGNED",
    assignedOfficer: "Rahul Sharma",
    time: null,
    smsTriggered: false,
    smsStatus: null
  },
  {
    id: "CY-10276",
    severity: "HIGH",
    location: "Ghaziabad",
    risk: 78,
    window: "Next 6 hours",
    reason: "Unusual cash-out pattern detected.",
    relatedCases: 4,
    mule: "MULE-6412",
    status: "ACKNOWLEDGED",
    assignedOfficer: "Rahul Sharma",
    time: null,
    smsTriggered: false,
    smsStatus: null
  },
  {
    id: "CY-10291",
    severity: "MEDIUM",
    location: "South Delhi",
    risk: 54,
    window: "Next 12 hours",
    reason: "Increasing complaint activity.",
    relatedCases: 3,
    mule: "MULE-5290",
    status: "IN PROGRESS",
    assignedOfficer: "Officer A",
    time: null,
    smsTriggered: false,
    smsStatus: null
  },
  {
    id: "CY-10266",
    severity: "LOW",
    location: "Gurugram",
    risk: 32,
    window: "Next 24 hours",
    reason: "Minor anomaly detected.",
    relatedCases: 1,
    mule: "MULE-1120",
    status: "UNASSIGNED",
    assignedOfficer: null,
    time: null,
    smsTriggered: false,
    smsStatus: null
  }
];

export default function AlertsInterventionPage() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [selectedAlertId, setSelectedAlertId] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignOfficerName, setAssignOfficerName] = useState('Officer A');
  
  // Notification & SMS State
  const [notification, setNotification] = useState(null);
  const [showSmsPreview, setShowSmsPreview] = useState(false);

  const selectedAlert = alerts.find(a => a.id === selectedAlertId);
  const activeAlertsCount = alerts.filter(a => a.status !== 'ACTIONED').length;

  // AUTOMATIC SMS TRIGGER LOGIC
  useEffect(() => {
    let triggeredId = null;
    let timeoutId = null;

    alerts.forEach(alert => {
      if (alert.risk >= 70 && !alert.smsTriggered && !triggeredId) {
        triggeredId = alert.id;
        
        // Mark as triggered immediately to prevent loop
        setAlerts(prev => prev.map(a => 
          a.id === alert.id ? { ...a, smsTriggered: true, smsStatus: 'sending' } : a
        ));

        // Simulate sending delay
        timeoutId = setTimeout(() => {
          setAlerts(prev => prev.map(a => 
            a.id === alert.id ? { ...a, smsStatus: 'sent' } : a
          ));
          setNotification({
            title: '⚠️ Automatic SMS Alert Triggered',
            message: `${alert.id} — ${alert.risk}% risk. Officer notified.`
          });
          
          // Clear notification after 4s
          setTimeout(() => setNotification(null), 4000);
        }, 1500);
      }
    });

    return () => clearTimeout(timeoutId);
  }, [alerts]);

  const updateAlertStatus = (id, newStatus, extra = {}) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, status: newStatus, ...extra } : alert
    ));
  };

  const handleAcknowledge = (id, e) => {
    if (e) e.stopPropagation();
    updateAlertStatus(id, 'ACKNOWLEDGED');
  };

  const handleAssign = () => {
    if (selectedAlert) {
      updateAlertStatus(selectedAlert.id, 'IN PROGRESS', { assignedOfficer: assignOfficerName });
      setShowAssignModal(false);
    }
  };

  const handleMarkActioned = (id) => {
    updateAlertStatus(id, 'ACTIONED', { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
  };

  const handleSendSmsAgain = (id) => {
    updateAlertStatus(id, selectedAlert.status, { smsStatus: 'sending' });
    setTimeout(() => {
      updateAlertStatus(id, selectedAlert.status, { smsStatus: 'sent' });
      setNotification({
        title: 'SMS Sent',
        message: `SMS notification sent to Officer ${selectedAlert.assignedOfficer || 'Rahul Sharma'}`
      });
      setTimeout(() => setNotification(null), 3000);
    }, 1500);
  };

  const handleDemoSimulation = () => {
    const newId = `CY-${Math.floor(10000 + Math.random() * 9000)}`;
    const newRisk = Math.floor(75 + Math.random() * 21); // 75 to 95
    const severity = newRisk >= 85 ? 'CRITICAL' : 'HIGH';
    
    const newAlert = {
      id: newId,
      severity,
      location: "Noida Sector 18",
      risk: newRisk,
      window: "Next 4 hours",
      reason: "Multiple recent cases combined with previous activity in the predicted zone.",
      relatedCases: 5,
      mule: "MULE-9921",
      status: "UNASSIGNED",
      assignedOfficer: "Rahul Sharma",
      time: null,
      smsTriggered: false,
      smsStatus: null
    };

    setAlerts(prev => [newAlert, ...prev]);
    setSelectedAlertId(newId);
  };

  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'CRITICAL': return { icon: '🔴', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' };
      case 'HIGH': return { icon: '🟠', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' };
      case 'MEDIUM': return { icon: '🟡', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' };
      case 'WATCH': return { icon: '🟡', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' };
      case 'LOW': return { icon: '⚪', color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20' };
      default: return { icon: '⚪', color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20' };
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'UNASSIGNED': return { icon: '○', color: 'text-slate-500' };
      case 'ACKNOWLEDGED': return { icon: '✓', color: 'text-cyan-400' };
      case 'IN PROGRESS': return { icon: '●', color: 'text-orange-400' };
      case 'ACTIONED': return { icon: '✓', color: 'text-green-400' };
      default: return { icon: '○', color: 'text-slate-500' };
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#050B14] text-slate-200 overflow-hidden relative">
      <Sidebar />

      {/* TOAST NOTIFICATION */}
      {notification && (
        <div className="absolute top-6 right-6 z-[100] bg-[#0A1422] border border-cyan-500/30 rounded-lg p-4 shadow-2xl animate-in slide-in-from-top-4 fade-in flex gap-3 min-w-[300px]">
          <MessageSquare className="text-cyan-400 shrink-0" size={20} />
          <div>
            <div className="text-xs font-bold text-slate-200 mb-1">{notification.title}</div>
            <div className="text-[10px] text-slate-400">{notification.message}</div>
          </div>
          <button className="absolute top-2 right-2 text-slate-500 hover:text-slate-300" onClick={() => setNotification(null)}>
            <X size={14} />
          </button>
        </div>
      )}

      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar flex flex-col">
          
          {/* Header */}
          <div className="flex flex-col mb-6">
            <header className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid rgba(34,211,238,0.08)' }}>
              <div>
                <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                  <ShieldAlert size={22} className="text-red-400" /> ALERTS & INTERVENTION
                </h1>
                <p className="text-xs text-slate-500 mt-1">Prioritize high-risk situations and coordinate timely intervention.</p>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={handleDemoSimulation}
                  className="hidden sm:flex items-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                >
                  <Play size={12} /> Simulate New High-Risk Case
                </button>
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold text-red-400">{activeAlertsCount < 10 ? `0${activeAlertsCount}` : activeAlertsCount} Active</span>
                </div>
                <UserProfileDropdown />
              </div>
            </header>
          </div>

          {/* 2-Column Layout */}
          <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
            
            {/* LEFT: Alert Queue */}
            <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2 pb-8">
              {alerts.map(alert => {
                const isSelected = selectedAlertId === alert.id;
                const s = getSeverityStyles(alert.severity);
                
                return (
                  <div 
                    key={alert.id}
                    className={`rounded-xl p-5 cursor-pointer transition-all border ${isSelected ? 'border-cyan-500 bg-[#070E1A]' : 'border-slate-800 bg-[rgba(10,20,34,0.6)] hover:border-slate-700'}`}
                    onClick={() => { setSelectedAlertId(alert.id); setShowSmsPreview(false); }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{s.icon}</span>
                        <span className={`text-[10px] font-bold tracking-widest ${s.color}`}>{alert.severity}</span>
                      </div>
                      <div className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 flex items-center gap-1.5">
                        {getStatusStyles(alert.status).icon} {alert.status}
                      </div>
                    </div>
                    
                    <h3 className="text-base font-bold text-slate-200 mb-1 leading-tight">{alert.id} • {alert.reason.split('.')[0]}</h3>
                    <div className="text-xs text-slate-500 flex items-center gap-1.5 mb-4">
                      <MapPin size={12} /> {alert.location}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Risk</div>
                        <div className={`text-sm font-bold ${s.color}`}>{alert.risk}%</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Window</div>
                        <div className="text-sm font-bold text-slate-300">{alert.window}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                      <button 
                        className="flex-1 py-2 rounded bg-cyan-500/10 text-cyan-400 text-xs font-bold hover:bg-cyan-500/20 transition-colors"
                        onClick={(e) => { e.stopPropagation(); setSelectedAlertId(alert.id); setShowSmsPreview(false); }}
                      >
                        VIEW
                      </button>
                      {alert.status === 'UNASSIGNED' && (
                        <button 
                          className="flex-1 py-2 rounded bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition-colors"
                          onClick={(e) => handleAcknowledge(alert.id, e)}
                        >
                          ACKNOWLEDGE
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT: Selected Alert + Intervention */}
            <div className="w-full lg:w-1/2 xl:w-3/5 flex flex-col min-h-0 overflow-y-auto custom-scrollbar pb-8 pr-2">
              {selectedAlert ? (
                <div className="flex flex-col gap-6">
                  
                  {/* Alert Details */}
                  <div className="rounded-xl p-6 lg:p-8" style={{ background: 'rgba(10,20,34,0.6)', border: '1px solid rgba(34,211,238,0.1)', backdropFilter: 'blur(10px)' }}>
                    <div className="flex justify-between items-start mb-6">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Alert Details</div>
                      <div className="text-sm font-black text-slate-400">{selectedAlert.id}</div>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl">{getSeverityStyles(selectedAlert.severity).icon}</span>
                      <div>
                        <div className={`text-sm font-bold tracking-widest ${getSeverityStyles(selectedAlert.severity).color}`}>{selectedAlert.severity}</div>
                        <h2 className="text-xl font-black text-white">{selectedAlert.location}</h2>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 pb-6 border-b border-slate-800">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Risk Score</div>
                        <div className={`text-xl font-black ${getSeverityStyles(selectedAlert.severity).color}`}>{selectedAlert.risk}%</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Expected Window</div>
                        <div className="text-sm font-bold text-slate-200 mt-1.5">{selectedAlert.window}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Related Cases</div>
                        <div className="text-sm font-bold text-slate-200 mt-1.5">{selectedAlert.relatedCases}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Potential Mule</div>
                        <div className="text-sm font-bold text-cyan-400 mt-1.5">{selectedAlert.mule}</div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Alert Reason</div>
                      <p className="text-sm text-slate-300 leading-relaxed">{selectedAlert.reason}</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button 
                        onClick={() => navigate('/case-intelligence')}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-700 transition-colors"
                      >
                        <FileSearch size={14} /> VIEW CASE
                      </button>
                      <button 
                        onClick={() => navigate(`/mule-network?muleId=${selectedAlert.mule}`)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-700 transition-colors"
                      >
                        <Target size={14} /> VIEW MULE
                      </button>
                    </div>
                  </div>

                  {/* Automatic SMS Section (Only for Risk >= 70) */}
                  {selectedAlert.risk >= 70 && (
                    <div className="rounded-xl p-5" style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)' }}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-xs font-bold text-green-400 uppercase tracking-widest mb-1">Automatic Intervention Triggered</div>
                          {selectedAlert.risk >= 85 && (
                            <div className="text-[10px] text-slate-400 mb-3">CRITICAL RISK — Immediate officer notification triggered.</div>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 bg-green-500/10 px-2 py-1 rounded border border-green-500/20 text-green-400 text-[10px] font-bold">
                          {selectedAlert.smsStatus === 'sending' ? (
                            <>
                              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> SENDING...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 size={12} /> SMS ALERT SENT
                            </>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Recipient</div>
                          <div className="text-xs font-bold text-slate-200">Officer {selectedAlert.assignedOfficer || 'Rahul Sharma'}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Phone</div>
                          <div className="text-xs font-bold text-slate-300">+91 98XXX XXXXX</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Time</div>
                          <div className="text-xs font-bold text-slate-300">{selectedAlert.time || 'Just now'}</div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-green-500/10 flex justify-between items-center">
                        <button 
                          className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                          onClick={() => setShowSmsPreview(!showSmsPreview)}
                        >
                          {showSmsPreview ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          {showSmsPreview ? 'HIDE SMS PREVIEW' : 'VIEW SMS PREVIEW'}
                        </button>
                        
                        {selectedAlert.smsStatus === 'sent' && (
                          <button 
                            className="text-[10px] font-bold text-slate-400 hover:text-slate-200 transition-colors px-3 py-1.5 rounded bg-slate-800"
                            onClick={() => handleSendSmsAgain(selectedAlert.id)}
                          >
                            SEND SMS AGAIN
                          </button>
                        )}
                      </div>

                      {showSmsPreview && (
                        <div className="mt-4 bg-[#0A1422] rounded-lg p-4 border border-slate-800 font-mono text-xs text-slate-300 relative">
                          <div className="absolute top-2 right-2 text-[8px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded uppercase font-sans font-bold">
                            SIMULATED SMS — DEMO
                          </div>
                          <p className="mb-2 text-cyan-400 font-bold">CYBERCAST SECURITY ALERT</p>
                          <p className="mb-2">⚠️ {selectedAlert.severity} RISK CASH-OUT PREDICTION</p>
                          <p className="mb-0">Case: {selectedAlert.id}</p>
                          <p className="mb-0">Risk: {selectedAlert.risk}%</p>
                          <p className="mb-0">Predicted Zone: {selectedAlert.location}</p>
                          <p className="mb-2">Time Window: {selectedAlert.window}</p>
                          <p className="mb-2">Immediate review recommended.</p>
                          <p className="text-slate-500">— CyberCast</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Intervention Section */}
                  <div className="rounded-xl p-6 lg:p-8" style={{ background: '#070E1A', border: '1px solid rgba(34,211,238,0.15)' }}>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Intervention Workflow</div>
                    
                    {/* Status Pipeline Visual */}
                    <div className="flex items-center gap-2 mb-8">
                      {['UNASSIGNED', 'ACKNOWLEDGED', 'IN PROGRESS', 'ACTIONED'].map((step, idx, arr) => {
                        const stepIndex = arr.indexOf(selectedAlert.status);
                        const isPast = idx < stepIndex;
                        const isCurrent = idx === stepIndex;
                        const colorClass = isPast || isCurrent ? 'text-cyan-400' : 'text-slate-600';
                        const dotClass = isPast || isCurrent ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'bg-slate-700';
                        const lineClass = isPast ? 'bg-cyan-400' : 'bg-slate-800';

                        return (
                          <div key={step} className="flex items-center flex-1 last:flex-none">
                            <div className="flex flex-col items-center gap-2 relative z-10">
                              <div className={`w-3 h-3 rounded-full ${dotClass} transition-all duration-300`} />
                              <div className={`text-[9px] font-bold tracking-widest uppercase absolute top-5 whitespace-nowrap ${colorClass}`}>
                                {step}
                              </div>
                            </div>
                            {idx < arr.length - 1 && (
                              <div className={`h-[2px] w-full mx-2 rounded-full transition-colors duration-300 ${lineClass}`} />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mb-8 pt-4">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Recommended Action</div>
                      <p className="text-sm text-slate-300 italic p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                        "Increase monitoring around the predicted cash-out zone and review associated case activity."
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {selectedAlert.status !== 'ACTIONED' && (
                        <button 
                          onClick={() => setShowAssignModal(true)}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 text-navy-900 text-xs font-black hover:bg-cyan-400 transition-colors"
                        >
                          <UserPlus size={14} /> ASSIGN TO OFFICER
                        </button>
                      )}
                      
                      {selectedAlert.status === 'UNASSIGNED' && (
                        <button 
                          onClick={() => handleAcknowledge(selectedAlert.id)}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-700 transition-colors"
                        >
                          ACKNOWLEDGE ALERT
                        </button>
                      )}
                      
                      {(selectedAlert.status === 'ACKNOWLEDGED' || selectedAlert.status === 'IN PROGRESS') && (
                        <button 
                          onClick={() => handleMarkActioned(selectedAlert.id)}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-bold hover:bg-green-500/30 transition-colors"
                        >
                          <CheckCircle2 size={14} /> MARK ACTIONED
                        </button>
                      )}

                      {selectedAlert.status === 'ACTIONED' && (
                        <div className="w-full flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 size={20} className="text-green-400" />
                            <div>
                              <div className="text-sm font-bold text-green-400">Intervention recorded</div>
                              <div className="text-xs text-slate-400">Assigned Officer: {selectedAlert.assignedOfficer || 'Rahul Sharma'}</div>
                            </div>
                          </div>
                          <div className="text-xs font-bold text-slate-400">{selectedAlert.time}</div>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-500 gap-4" style={{ background: 'rgba(10,20,34,0.3)', border: '1px dashed rgba(34,211,238,0.1)', borderRadius: '1rem' }}>
                  <Target size={48} className="opacity-20" />
                  <p className="text-sm font-bold tracking-wider">SELECT AN ALERT TO VIEW DETAILS</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ASSIGN OFFICER MODAL */}
      {showAssignModal && selectedAlert && (
        <div className="fixed inset-0 bg-[#050B14]/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-2xl" style={{ background: '#0A1422', border: '1px solid rgba(34,211,238,0.2)' }}>
            <div className="px-5 py-4 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-200 tracking-wider">ASSIGN ALERT</h3>
              <button onClick={() => setShowAssignModal(false)} className="text-slate-500 hover:text-slate-300">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Officer</label>
                <select 
                  className="w-full bg-[#050B14] border border-slate-800 rounded p-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50"
                  value={assignOfficerName}
                  onChange={e => setAssignOfficerName(e.target.value)}
                >
                  <option>Officer A</option>
                  <option>Rahul Sharma</option>
                  <option>Priya Patel</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Priority</label>
                <div className="w-full bg-[#050B14] border border-slate-800 rounded p-2 text-sm text-slate-400 cursor-not-allowed">
                  {selectedAlert.severity}
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-800 flex justify-end gap-3">
              <button 
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 rounded text-xs font-bold text-slate-400 hover:text-slate-200"
              >
                CANCEL
              </button>
              <button 
                onClick={handleAssign}
                className="px-6 py-2 rounded bg-cyan-500 text-navy-900 text-xs font-black hover:bg-cyan-400"
              >
                ASSIGN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
