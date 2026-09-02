import { AlertTriangle, Info, ExternalLink, Clock } from 'lucide-react';
import { ALERTS } from '../data/mockData';

const SEVERITY_CONFIG = {
  CRITICAL: {
    badge: 'risk-badge-critical',
    icon: AlertTriangle,
    dotColor: '#EF4444',
    bgColor: 'rgba(239,68,68,0.06)',
  },
  HIGH: {
    badge: 'risk-badge-high',
    icon: AlertTriangle,
    dotColor: '#F97316',
    bgColor: 'rgba(249,115,22,0.04)',
  },
  MEDIUM: {
    badge: 'risk-badge-medium',
    icon: AlertTriangle,
    dotColor: '#EAB308',
    bgColor: 'rgba(234,179,8,0.04)',
  },
  INFO: {
    badge: 'risk-badge-info',
    icon: Info,
    dotColor: '#38BDF8',
    bgColor: 'rgba(56,189,248,0.04)',
  },
};

export default function AlertsOverview() {
  return (
    <div className="flex flex-col" style={{
      background: '#0A1422',
      border: '1px solid rgba(34,211,238,0.1)',
      borderRadius: 8,
      overflow: 'hidden',
      flex: '0 0 260px',
      minWidth: 240,
    }}>
      <div className="flex items-center justify-between px-4 py-3" style={{
        borderBottom: '1px solid rgba(34,211,238,0.08)',
      }}>
        <span className="panel-title">Alerts Overview</span>
        <button className="text-xs font-bold text-cyan-600 hover:text-cyan-400 transition-colors flex items-center gap-1">
          View All
          <ExternalLink size={10} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {ALERTS.map((alert) => {
          const cfg = SEVERITY_CONFIG[alert.severity];
          const Icon = cfg.icon;
          return (
            <div
              key={alert.id}
              className="px-4 py-3 cursor-pointer hover:bg-cyan-400/3 transition-colors"
              style={{
                borderBottom: '1px solid rgba(34,211,238,0.05)',
                background: cfg.bgColor,
                opacity: alert.acknowledged ? 0.6 : 1,
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: `${cfg.dotColor}18`,
                    border: `1px solid ${cfg.dotColor}30`,
                  }}
                >
                  <Icon size={12} style={{ color: cfg.dotColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-1.5 py-0.5 rounded font-bold tracking-wider ${cfg.badge}`}>
                      {alert.severity}
                    </span>
                    {!alert.acknowledged && (
                      <div className="w-1.5 h-1.5 rounded-full status-blink" style={{ background: cfg.dotColor }} />
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-1 truncate">{alert.title}</p>
                  <div className="flex items-center gap-1 text-slate-600">
                    <Clock size={9} />
                    <span style={{ fontSize: 10 }}>{alert.time}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
