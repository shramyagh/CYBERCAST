import { ExternalLink } from 'lucide-react';
import { DISTRICT_RISK } from '../data/mockData';

const RISK_BAR_COLOR = (risk) => {
  if (risk >= 75) return { bar: '#EF4444', glow: 'rgba(239,68,68,0.3)', text: '#EF4444' };
  if (risk >= 55) return { bar: '#F97316', glow: 'rgba(249,115,22,0.3)', text: '#F97316' };
  if (risk >= 35) return { bar: '#EAB308', glow: 'rgba(234,179,8,0.3)', text: '#EAB308' };
  return { bar: '#22C55E', glow: 'rgba(34,197,94,0.3)', text: '#22C55E' };
};

export default function DistrictRisk() {
  return (
    <div className="flex flex-col" style={{
      background: '#0A1422',
      border: '1px solid rgba(34,211,238,0.1)',
      borderRadius: 8,
      overflow: 'hidden',
      flex: 1,
      minWidth: 200,
    }}>
      <div className="flex items-center justify-between px-4 py-3" style={{
        borderBottom: '1px solid rgba(34,211,238,0.08)',
      }}>
        <span className="panel-title">District Risk</span>
        <button className="text-xs font-bold text-cyan-600 hover:text-cyan-400 transition-colors flex items-center gap-1">
          View All
          <ExternalLink size={10} />
        </button>
      </div>

      <div className="px-4 py-4 space-y-4 flex-1">
        {DISTRICT_RISK.map((d) => {
          const cfg = RISK_BAR_COLOR(d.risk);
          return (
            <div key={d.district}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-slate-300 font-medium">{d.district}</span>
                <span className="text-xs font-bold" style={{ color: cfg.text }}>{d.risk}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${d.risk}%`,
                    background: `linear-gradient(90deg, ${cfg.bar}88, ${cfg.bar})`,
                    boxShadow: `0 0 8px ${cfg.glow}`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-slate-600" style={{ fontSize: 10 }}>{d.cases} active cases</span>
                <span className="text-xs font-bold tracking-wider" style={{ color: cfg.text, fontSize: 10 }}>
                  {d.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
