import { TrendingUp, TrendingDown } from 'lucide-react';

function Sparkline({ data, color }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const h = 32;
  const w = 80;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={w} height={h} className="sparkline overflow-visible">
      <defs>
        <linearGradient id={`sg-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Fill area */}
      <polygon
        points={`0,${h} ${pts} ${w},${h}`}
        fill={`url(#sg-${color.replace('#','')})`}
      />
      {/* Line */}
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* End dot */}
      <circle
        cx={(data.length - 1) / (data.length - 1) * w}
        cy={h - ((data[data.length - 1] - min) / range) * h}
        r="2.5"
        fill={color}
      />
    </svg>
  );
}

export default function KPICard({ label, value, change, trend, spark, sparkColor, icon: Icon, iconColor }) {
  const isUp = trend === 'up';

  return (
    <div className="kpi-card px-4 py-3 flex-1 min-w-0">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="section-header mb-1" style={{ fontSize: 10 }}>{label}</div>
          <div className="text-2xl font-black text-white leading-none tracking-tight">{value}</div>
        </div>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{
          background: `rgba(${iconColor},0.1)`,
          border: `1px solid rgba(${iconColor},0.2)`,
        }}>
          <Icon size={15} style={{ color: `rgb(${iconColor})` }} />
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1">
          {isUp ? (
            <TrendingUp size={12} style={{ color: iconColor.includes('239') ? '#EF4444' : '#22C55E' }} />
          ) : (
            <TrendingDown size={12} style={{ color: '#22C55E' }} />
          )}
          <span className="text-xs font-bold" style={{ color: isUp ? `rgb(${iconColor})` : '#22C55E' }}>
            {change}
          </span>
          <span className="text-xs text-slate-600">from last 7 days</span>
        </div>
        <Sparkline data={spark} color={`rgb(${iconColor})`} />
      </div>
    </div>
  );
}
