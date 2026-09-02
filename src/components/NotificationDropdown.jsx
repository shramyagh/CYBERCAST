import { Bell, AlertTriangle, Info, X } from 'lucide-react';
import { formatTime } from '../data/mockData';

const SEVERITY_CONFIG = {
  CRITICAL: { color: '#EF4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)', icon: AlertTriangle },
  HIGH: { color: '#F97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.25)', icon: AlertTriangle },
  MEDIUM: { color: '#EAB308', bg: 'rgba(234,179,8,0.1)', border: 'rgba(234,179,8,0.25)', icon: AlertTriangle },
  INFO: { color: '#38BDF8', bg: 'rgba(56,189,248,0.1)', border: 'rgba(56,189,248,0.25)', icon: Info },
};

export default function NotificationDropdown({ alerts, onClose }) {
  return (
    <div className="notification-dropdown">
      <div className="flex items-center justify-between px-4 py-3" style={{
        borderBottom: '1px solid rgba(34,211,238,0.1)',
      }}>
        <div className="flex items-center gap-2">
          <Bell size={14} className="text-cyan-400" />
          <span className="text-sm font-bold text-slate-200">Alerts</span>
          <span className="px-1.5 py-0.5 text-xs rounded font-bold" style={{
            background: 'rgba(239,68,68,0.2)',
            color: '#EF4444',
          }}>
            {alerts.filter(a => !a.acknowledged).length} new
          </span>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition-colors">
          <X size={14} />
        </button>
      </div>

      <div className="py-2 max-h-80 overflow-y-auto">
        {alerts.map((alert) => {
          const cfg = SEVERITY_CONFIG[alert.severity];
          const Icon = cfg.icon;
          return (
            <div
              key={alert.id}
              className="px-4 py-3 hover:bg-cyan-400/3 transition-colors cursor-pointer"
              style={{
                borderBottom: '1px solid rgba(34,211,238,0.04)',
                opacity: alert.acknowledged ? 0.5 : 1,
              }}
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{
                  background: cfg.bg,
                  border: `1px solid ${cfg.border}`,
                }}>
                  <Icon size={12} style={{ color: cfg.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold tracking-wider uppercase" style={{ color: cfg.color }}>
                      {alert.severity}
                    </span>
                    <span className="text-xs text-slate-600">{alert.time}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{alert.title}</p>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{alert.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-4 py-3" style={{ borderTop: '1px solid rgba(34,211,238,0.08)' }}>
        <button className="w-full text-center text-xs font-bold text-cyan-500 hover:text-cyan-400 tracking-wider uppercase transition-colors">
          View All Alerts →
        </button>
      </div>
    </div>
  );
}
