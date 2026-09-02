import { ExternalLink } from 'lucide-react';
import { CASES, formatAmount } from '../data/mockData';

const RISK_STYLE = {
  HIGH: { badge: 'risk-badge-high', dot: '#F97316' },
  MEDIUM: { badge: 'risk-badge-medium', dot: '#EAB308' },
  LOW: { badge: 'risk-badge-low', dot: '#22C55E' },
};

const TYPE_COLORS = {
  UPI: '#22D3EE',
  OTP: '#A78BFA',
  Card: '#F97316',
  Wallet: '#34D399',
};

export default function RecentCases({ onCaseSelect, cases = CASES }) {
  return (
    <div className="flex flex-col" style={{
      background: '#0A1422',
      border: '1px solid rgba(34,211,238,0.1)',
      borderRadius: 8,
      overflow: 'hidden',
      flex: 1,
      minWidth: 0,
    }}>
      <div className="flex items-center justify-between px-4 py-3" style={{
        borderBottom: '1px solid rgba(34,211,238,0.08)',
      }}>
        <span className="panel-title">Recent Cases</span>
        <button className="text-xs font-bold text-cyan-600 hover:text-cyan-400 transition-colors flex items-center gap-1">
          View All
          <ExternalLink size={10} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full" style={{ minWidth: 480 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(34,211,238,0.06)' }}>
              {['Case ID', 'Type', 'Amount', 'Location', 'Risk'].map(h => (
                <th key={h} className="px-4 py-2.5 text-left section-header" style={{ fontSize: 10 }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => {
              const rs = RISK_STYLE[c.risk] || RISK_STYLE.LOW;
              const typeColor = TYPE_COLORS[c.type] || '#94A3B8';
              return (
                <tr
                  key={c.id}
                  className="hover:bg-cyan-400/3 cursor-pointer transition-colors"
                  style={{ borderBottom: '1px solid rgba(34,211,238,0.04)' }}
                  onClick={() => onCaseSelect(c)}
                >
                  <td className="px-4 py-2.5">
                    <span className="text-xs font-bold text-cyan-400 font-mono">{c.id}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded" style={{
                      background: `${typeColor}18`,
                      color: typeColor,
                      border: `1px solid ${typeColor}30`,
                    }}>
                      {c.type}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="text-xs text-slate-300 font-mono">{formatAmount(c.amount)}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="text-xs text-slate-400">{c.location}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: rs.dot }} />
                      <span className={`text-xs px-1.5 py-0.5 rounded font-bold ${rs.badge}`}>{c.risk}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
