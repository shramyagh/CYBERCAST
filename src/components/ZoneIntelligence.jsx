import { MapPin, Clock, Target, Briefcase, Network, Building2, ArrowRight, ChevronRight } from 'lucide-react';
import { getRiskColor } from '../data/mockData';

function RiskCircle({ score, color }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: 110, height: 110 }}>
      <svg width="110" height="110" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle cx="55" cy="55" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        {/* Progress */}
        <circle
          cx="55" cy="55" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference - progress}`}
          style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
        />
      </svg>
      <div className="text-center z-10">
        <div className="text-2xl font-black text-white leading-none">{score}</div>
        <div className="text-xs text-slate-500">/100</div>
        <div className="text-xs font-bold mt-0.5" style={{ color, fontSize: 9, letterSpacing: '0.05em' }}>RISK SCORE</div>
      </div>
    </div>
  );
}

function MetricRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid rgba(34,211,238,0.06)' }}>
      <div className="flex items-center gap-2">
        <Icon size={12} className="text-slate-600 flex-shrink-0" />
        <span className="text-xs text-slate-500">{label}</span>
      </div>
      <span className="text-xs font-bold text-slate-200">{value}</span>
    </div>
  );
}

function LocationItem({ loc }) {
  const icon = loc.type === 'atm' ? '🏧' : '🏦';
  return (
    <div className="flex items-center justify-between py-2 hover:bg-cyan-400/3 transition-colors rounded px-1 cursor-pointer"
      style={{ borderBottom: '1px solid rgba(34,211,238,0.05)' }}>
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 rounded flex items-center justify-center text-xs" style={{
          background: 'rgba(34,211,238,0.08)',
        }}>
          <Building2 size={11} className="text-cyan-600" />
        </div>
        <span className="text-xs text-slate-300">{loc.name}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-slate-500">{loc.distance}</span>
        <ChevronRight size={10} className="text-slate-700" />
      </div>
    </div>
  );
}

export default function ZoneIntelligence({ zone, onViewDetails }) {
  if (!zone) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-6" style={{
        background: '#0A1422',
        border: '1px solid rgba(34,211,238,0.1)',
        borderRadius: 8,
        minWidth: 260,
        maxWidth: 280,
      }}>
        <MapPin size={28} className="text-slate-700 mb-3" />
        <p className="text-sm text-slate-600 leading-relaxed">
          Click a risk zone on the map to view intelligence
        </p>
      </div>
    );
  }

  const color = getRiskColor(zone.riskScore);
  const statusClass = {
    CRITICAL: 'risk-badge-critical',
    HIGH: 'risk-badge-high',
    MODERATE: 'risk-badge-medium',
    LOW: 'risk-badge-low',
  }[zone.status];

  return (
    <div className="flex flex-col" style={{
      background: '#0A1422',
      border: '1px solid rgba(34,211,238,0.1)',
      borderRadius: 8,
      minWidth: 260,
      maxWidth: 280,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(34,211,238,0.08)' }}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-black tracking-widest text-slate-400 uppercase">Zone Intelligence</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-white font-mono">{zone.id}</span>
          <span className={`text-xs px-2 py-0.5 rounded font-bold tracking-wider ${statusClass}`}>
            {zone.status}
          </span>
        </div>
        <div className="text-xs text-slate-500 mt-0.5">{zone.name}</div>
      </div>

      {/* Risk circle */}
      <div className="flex flex-col items-center py-5" style={{ borderBottom: '1px solid rgba(34,211,238,0.06)' }}>
        <RiskCircle score={zone.riskScore} color={color} />
      </div>

      {/* Metrics */}
      <div className="px-4 py-2" style={{ borderBottom: '1px solid rgba(34,211,238,0.06)' }}>
        <MetricRow icon={Clock} label="Predicted Window" value={zone.predictedWindow} />
        <MetricRow icon={Target} label="Confidence" value={`${zone.confidence}%`} />
      </div>

      {/* Compact stats */}
      <div className="grid grid-cols-3 gap-0" style={{ borderBottom: '1px solid rgba(34,211,238,0.06)' }}>
        {[
          { label: 'Linked Cases', value: zone.linkedCases },
          { label: 'Mule Accounts', value: zone.linkedMuleAccounts },
          { label: 'Nearby ATMs', value: zone.nearbyATMs },
        ].map((s, i) => (
          <div
            key={s.label}
            className="flex flex-col items-center py-3 text-center"
            style={{ borderRight: i < 2 ? '1px solid rgba(34,211,238,0.06)' : 'none' }}
          >
            <div className="text-lg font-black text-white leading-none">{s.value}</div>
            <div className="text-xs text-slate-600 mt-1 leading-tight" style={{ fontSize: 10 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* View details button */}
      <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(34,211,238,0.06)' }}>
        <button
          onClick={() => onViewDetails(zone)}
          className="btn-primary w-full py-2.5 flex items-center justify-center gap-2"
        >
          <span>VIEW ZONE DETAILS</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Top nearby locations */}
      <div className="px-4 py-3 flex-1 overflow-y-auto">
        <div className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-3">
          Top Nearby Locations
        </div>
        {zone.topLocations.map((loc, i) => (
          <LocationItem key={i} loc={loc} />
        ))}
      </div>
    </div>
  );
}
