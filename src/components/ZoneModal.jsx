import { X, Target, Clock, CheckCircle, Briefcase, Network, Building2, TrendingUp, AlertTriangle } from 'lucide-react';
import { getRiskColor } from '../data/mockData';

function StatCard({ label, value, sub, color }) {
  return (
    <div className="text-center py-4" style={{
      background: 'rgba(34,211,238,0.04)',
      border: '1px solid rgba(34,211,238,0.08)',
      borderRadius: 6,
    }}>
      <div className="text-2xl font-black leading-none mb-1" style={{ color }}>{value}</div>
      <div className="text-xs font-bold text-slate-300 mb-0.5">{label}</div>
      {sub && <div className="text-xs text-slate-600" style={{ fontSize: 10 }}>{sub}</div>}
    </div>
  );
}

export default function ZoneModal({ zone, onClose }) {
  if (!zone) return null;

  const color = getRiskColor(zone.riskScore);
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const progress = (zone.riskScore / 100) * circumference;

  const statusBadge = {
    CRITICAL: 'risk-badge-critical',
    HIGH: 'risk-badge-high',
    MODERATE: 'risk-badge-medium',
    LOW: 'risk-badge-low',
  }[zone.status];

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content" style={{ width: '100%', maxWidth: 600 }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{
          borderBottom: '1px solid rgba(34,211,238,0.1)',
        }}>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-lg font-black text-white font-mono">{zone.id}</span>
              <span className={`text-xs px-2 py-0.5 rounded font-bold tracking-wider ${statusBadge}`}>
                {zone.status}
              </span>
            </div>
            <p className="text-xs text-slate-500">{zone.name} · {zone.district}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {/* Top row: circle + stats */}
          <div className="flex gap-6 mb-6">
            {/* Risk circle */}
            <div className="flex flex-col items-center justify-center flex-shrink-0">
              <div className="relative flex items-center justify-center" style={{ width: 110, height: 110 }}>
                <svg width="110" height="110" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
                  <circle cx="55" cy="55" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle
                    cx="55" cy="55" r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${progress} ${circumference - progress}`}
                    style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
                  />
                </svg>
                <div className="text-center z-10">
                  <div className="text-3xl font-black text-white leading-none">{zone.riskScore}</div>
                  <div className="text-xs text-slate-500">/100</div>
                </div>
              </div>
              <div className="text-xs font-bold tracking-wider text-slate-500 mt-1 uppercase" style={{ fontSize: 10 }}>Risk Score</div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3 flex-1">
              <StatCard label="Predicted Window" value={zone.predictedWindow.split(' – ')[0]} sub={`– ${zone.predictedWindow.split(' – ')[1]}`} color="#22D3EE" />
              <StatCard label="Confidence" value={`${zone.confidence}%`} sub="AI confidence level" color="#A78BFA" />
              <StatCard label="Linked Cases" value={zone.linkedCases} sub="Active investigations" color={color} />
              <StatCard label="Mule Accounts" value={zone.linkedMuleAccounts} sub="Flagged accounts" color="#F97316" />
              <StatCard label="Nearby ATMs" value={zone.nearbyATMs} sub="Cash-out points" color="#EAB308" />
              <StatCard label="Primary Type" value={zone.primaryFraudType} sub="Dominant fraud type" color="#34D399" />
            </div>
          </div>

          {/* Top contributing factors */}
          <div className="mb-5">
            <div className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-3">
              Top Contributing Factors
            </div>
            <div className="space-y-2">
              {zone.topFactors.map((f, i) => (
                <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-lg" style={{
                  background: 'rgba(34,211,238,0.04)',
                  border: '1px solid rgba(34,211,238,0.07)',
                }}>
                  <div className="w-5 h-5 rounded flex items-center justify-center text-xs font-black flex-shrink-0" style={{
                    background: 'rgba(34,211,238,0.12)',
                    color: '#22D3EE',
                  }}>
                    {i + 1}
                  </div>
                  <span className="text-xs text-slate-300">{f}</span>
                  <div className="ml-auto flex-shrink-0">
                    <TrendingUp size={12} style={{ color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nearby locations */}
          <div>
            <div className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-3">
              Top Nearby Cash-Out Points
            </div>
            <div className="grid grid-cols-2 gap-2">
              {zone.topLocations.map((loc, i) => (
                <div key={i} className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg" style={{
                  background: 'rgba(34,211,238,0.03)',
                  border: '1px solid rgba(34,211,238,0.07)',
                }}>
                  <Building2 size={12} className="text-cyan-700 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs text-slate-300 truncate">{loc.name}</div>
                    <div className="text-xs text-slate-600" style={{ fontSize: 10 }}>{loc.distance} away</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4" style={{
          borderTop: '1px solid rgba(34,211,238,0.08)',
        }}>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <AlertTriangle size={12} style={{ color: '#F97316' }} />
            Trend: <span className="font-bold" style={{ color: zone.trend === 'INCREASING' ? '#EF4444' : zone.trend === 'DECREASING' ? '#22C55E' : '#EAB308' }}>{zone.trend}</span>
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="btn-secondary px-4 py-2 text-xs">Close</button>
            <button className="btn-primary px-4 py-2 text-xs">Deploy Alert →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
