import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Eye, EyeOff, Lock, User, ChevronDown,
  Brain, Network, Zap, Check, AlertTriangle, Activity
} from 'lucide-react';

// ── Delhi NCR SVG Background Map ──────────────────────────────
function DelhiNcrMap() {
  const cities = [
    { name: 'Delhi', x: 38, y: 40, risk: 72, color: '#F97316' },
    { name: 'Noida', x: 62, y: 52, risk: 87, color: '#EF4444' },
    { name: 'Ghaziabad', x: 68, y: 32, risk: 56, color: '#F97316' },
    { name: 'Gurugram', x: 20, y: 60, risk: 28, color: '#22C55E' },
    { name: 'Faridabad', x: 55, y: 72, risk: 43, color: '#EAB308' },
  ];

  const connections = [
    [0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [1, 4],
  ];

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" style={{ opacity: 0.55 }}>
      {/* Grid lines */}
      {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(v => (
        <g key={v}>
          <line x1={v} y1="0" x2={v} y2="100" stroke="rgba(34,211,238,0.04)" strokeWidth="0.3" />
          <line x1="0" y1={v} x2="100" y2={v} stroke="rgba(34,211,238,0.04)" strokeWidth="0.3" />
        </g>
      ))}

      {/* Connection lines */}
      {connections.map(([a, b], i) => (
        <line
          key={i}
          x1={cities[a].x} y1={cities[a].y}
          x2={cities[b].x} y2={cities[b].y}
          stroke="rgba(34,211,238,0.12)"
          strokeWidth="0.4"
          strokeDasharray="1,1"
        />
      ))}

      {/* Risk zone halos */}
      {cities.map((city, i) => (
        <g key={i}>
          <circle
            cx={city.x} cy={city.y} r={city.risk / 12}
            fill={city.color}
            opacity="0.08"
          />
          <circle
            cx={city.x} cy={city.y} r={city.risk / 18}
            fill={city.color}
            opacity="0.15"
          />
        </g>
      ))}

      {/* Hexagon shapes around each city */}
      {cities.map((city, i) => {
        const r = 4;
        const pts = [0, 1, 2, 3, 4, 5].map(k => {
          const angle = (Math.PI / 3) * k - Math.PI / 6;
          return `${city.x + r * Math.cos(angle)},${city.y + r * Math.sin(angle)}`;
        }).join(' ');
        return (
          <polygon
            key={i}
            points={pts}
            fill="none"
            stroke={city.color}
            strokeWidth="0.35"
            opacity="0.4"
          />
        );
      })}

      {/* City dots */}
      {cities.map((city, i) => (
        <g key={i}>
          <circle cx={city.x} cy={city.y} r="1.2" fill={city.color} opacity="0.9" />
          <circle cx={city.x} cy={city.y} r="0.6" fill="#fff" opacity="0.8" />
        </g>
      ))}

      {/* City labels */}
      {cities.map((city, i) => (
        <text
          key={i}
          x={city.x + 2} y={city.y - 2}
          fill="rgba(148,163,184,0.6)"
          fontSize="3.5"
          fontFamily="Inter, sans-serif"
        >
          {city.name}
        </text>
      ))}

      {/* Scanning ring on Noida (critical zone) */}
      <circle cx="62" cy="52" r="10" fill="none" stroke="#EF4444" strokeWidth="0.3" opacity="0.2" />
      <circle cx="62" cy="52" r="15" fill="none" stroke="#EF4444" strokeWidth="0.2" opacity="0.12" />
    </svg>
  );
}

// ── Sparkline for login bg ─────────────────────────────────────
function DataLine({ y, color }) {
  const points = Array.from({ length: 20 }, (_, i) => {
    const x = (i / 19) * 100;
    const yv = y + Math.sin(i * 0.8) * 8 + Math.cos(i * 0.4) * 4;
    return `${x},${yv}`;
  }).join(' ');
  return (
    <polyline
      points={points}
      fill="none"
      stroke={color}
      strokeWidth="0.5"
      opacity="0.15"
    />
  );
}

// ── Capability Block ────────────────────────────────────────────
function CapabilityBlock({ icon: Icon, title, desc, color }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg" style={{
      background: 'rgba(10,20,34,0.6)',
      border: '1px solid rgba(34,211,238,0.1)',
    }}>
      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{
        background: `rgba(${color},0.12)`,
        border: `1px solid rgba(${color},0.25)`,
      }}>
        <Icon size={16} style={{ color: `rgb(${color})` }} />
      </div>
      <div>
        <div className="text-xs font-bold tracking-widest text-slate-300 mb-1 uppercase">{title}</div>
        <div className="text-xs text-slate-500 leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

// ── Status Indicator ─────────────────────────────────────────
function StatusIndicator({ icon: Icon, title, subtitle, color }) {
  return (
    <div className="flex items-center gap-2 flex-1 min-w-0">
      <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0" style={{
        background: `rgba(${color},0.1)`,
        border: `1px solid rgba(${color},0.2)`,
      }}>
        <Icon size={12} style={{ color: `rgb(${color})` }} />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-bold text-slate-300 truncate tracking-wider">{title}</div>
        <div className="text-xs" style={{ color: `rgb(${color})` }}>{subtitle}</div>
      </div>
    </div>
  );
}

// ── Main Login Page ────────────────────────────────────────────
export default function LoginPage() {
  const navigate = useNavigate();
  const [officerId, setOfficerId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [department, setDepartment] = useState('Cyber Crime Division');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);

  const departments = [
    'Cyber Crime Division',
    'Economic Offences Wing',
    'Special Investigation Team',
    'Intelligence Bureau',
    'Financial Intelligence Unit',
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!officerId.trim() || !password.trim()) {
      setError('Officer ID and password are required.');
      return;
    }
    setLoading(true);
    // Simulate auth delay
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex login-bg relative overflow-hidden">
      {/* Background data lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        {[15, 25, 35, 45, 55, 65, 75, 85].map((y, i) => (
          <DataLine key={i} y={y} color={i % 2 === 0 ? '34,211,238' : '56,189,248'} />
        ))}
      </svg>

      {/* ── LEFT SIDE ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-between p-6 lg:p-10 relative z-10 max-w-3xl">
        {/* Logo */}
        <div className="flex items-center gap-3 mt-2">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
            background: 'rgba(34,211,238,0.12)',
            border: '1px solid rgba(34,211,238,0.3)',
          }}>
            <Shield size={20} className="text-cyan-400" />
          </div>
          <div>
            <div className="text-lg font-black tracking-widest text-white">CYBERCAST</div>
            <div className="text-xs tracking-wider text-slate-500 uppercase">Predictive Cybercrime Intelligence</div>
          </div>
        </div>

        {/* Hero text */}
        <div>
          <div className="mb-6 mt-4">
            <h1 className="font-black leading-none mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
              <span className="text-white block">PREDICT.</span>
              <span className="text-white block">PREVENT.</span>
              <span className="block" style={{ color: '#22D3EE' }}>PROTECT.</span>
            </h1>
          </div>

          {/* Map visualization */}
          <div className="mb-6 rounded-xl overflow-hidden" style={{
            width: '100%',
            maxWidth: 480,
            height: 180,
            background: 'rgba(5,11,20,0.8)',
            border: '1px solid rgba(34,211,238,0.1)',
            position: 'relative',
          }}>
            <DelhiNcrMap />
            {/* Map overlay label */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 status-blink" />
              <span className="text-xs text-slate-500 font-mono tracking-wider">LIVE · DELHI NCR</span>
            </div>
            {/* Risk legend */}
            <div className="absolute bottom-3 right-3 flex gap-3">
              {[
                { color: '#EF4444', label: 'Critical' },
                { color: '#F97316', label: 'High' },
                { color: '#EAB308', label: 'Moderate' },
                { color: '#22C55E', label: 'Low' },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span className="text-xs text-slate-600">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
            AI-powered intelligence to predict cash-out activities and help authorities take proactive action.
          </p>

          {/* Capability blocks */}
          <div className="grid gap-3 max-w-lg">
            <CapabilityBlock
              icon={Brain}
              title="AI Prediction"
              desc="Identify high-risk cash-out zones using advanced ML models trained on historical fraud patterns."
              color="34,211,238"
            />
            <CapabilityBlock
              icon={Network}
              title="Link Analysis"
              desc="Uncover mule networks and hidden connections across accounts and transactions."
              color="168,85,247"
            />
            <CapabilityBlock
              icon={Zap}
              title="Proactive Action"
              desc="Generate early alerts and actionable intelligence to intervene before cash-out occurs."
              color="249,115,22"
            />
          </div>
        </div>

        {/* Bottom */}
        <div />
      </div>

      {/* ── RIGHT SIDE — LOGIN CARD ─────────────────────────────── */}
      <div className="flex items-center justify-center p-6 lg:p-8 z-10" style={{ minWidth: 420, maxWidth: 480 }}>
        <div className="w-full" style={{
          background: 'rgba(10,20,34,0.92)',
          border: '1px solid rgba(34,211,238,0.15)',
          borderRadius: 14,
          backdropFilter: 'blur(20px)',
          padding: '28px 32px',
        }}>
          {/* Card header */}
          <div className="text-center mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{
              background: 'rgba(34,211,238,0.1)',
              border: '1px solid rgba(34,211,238,0.2)',
            }}>
              <Lock size={18} className="text-cyan-400" />
            </div>
            <h2 className="text-xl font-black text-white tracking-widest uppercase mb-1">Secure Login</h2>
            <p className="text-xs text-slate-500 tracking-wider">Access Cybercast Intelligence Platform</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-2.5 rounded-lg flex items-center gap-2 text-xs" style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#EF4444',
            }}>
              <AlertTriangle size={14} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Officer ID */}
            <div>
              <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">
                Officer ID
              </label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                <input
                  type="text"
                  className="input-field pl-9 pr-4 py-3"
                  placeholder="Enter Officer ID"
                  value={officerId}
                  onChange={e => setOfficerId(e.target.value)}
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">
                Department
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="input-field px-4 py-3 flex items-center justify-between w-full text-left"
                  style={{ color: department ? '#E2E8F0' : '#475569' }}
                  onClick={() => setShowDeptDropdown(!showDeptDropdown)}
                >
                  <span className="text-sm">{department}</span>
                  <ChevronDown size={14} className="text-slate-500" />
                </button>
                {showDeptDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 rounded-lg overflow-hidden z-50" style={{
                    background: '#0A1422',
                    border: '1px solid rgba(34,211,238,0.2)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                  }}>
                    {departments.map(d => (
                      <button
                        key={d}
                        type="button"
                        className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-cyan-400/10 hover:text-cyan-400 transition-colors"
                        onClick={() => { setDepartment(d); setShowDeptDropdown(false); }}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input-field pl-9 pr-10 py-3"
                  placeholder="••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Remember me + forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    background: rememberMe ? '#22D3EE' : 'transparent',
                    border: rememberMe ? '1px solid #22D3EE' : '1px solid rgba(100,116,139,0.4)',
                    cursor: 'pointer',
                  }}
                  onClick={() => setRememberMe(!rememberMe)}
                >
                  {rememberMe && <Check size={10} color="#050B14" strokeWidth={3} />}
                </div>
                <span className="text-xs text-slate-400">Remember me</span>
              </label>
              <button type="button" className="text-xs text-cyan-500 hover:text-cyan-400 transition-colors">
                Forgot Password?
              </button>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 flex items-center justify-center gap-3 mt-2"
              style={{ opacity: loading ? 0.8 : 1 }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-navy-950 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#050B14', borderTopColor: 'transparent' }} />
                  <span>AUTHENTICATING...</span>
                </>
              ) : (
                <span>LOGIN</span>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: 'rgba(100,116,139,0.2)' }} />
              <span className="text-xs text-slate-600">OR</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(100,116,139,0.2)' }} />
            </div>

            {/* OTP button */}
            <button
              type="button"
              className="btn-secondary w-full py-3 flex items-center justify-center gap-2"
            >
              <Lock size={14} />
              <span>Login with OTP</span>
            </button>
          </form>

          {/* Status indicators */}
          <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(34,211,238,0.08)' }}>
            <div className="flex gap-2">
              <StatusIndicator
                icon={Shield}
                title="System Secure"
                subtitle="All systems operational"
                color="34,197,94"
              />
              <StatusIndicator
                icon={Lock}
                title="Data Encrypted"
                subtitle="End-to-end encryption"
                color="34,211,238"
              />
              <StatusIndicator
                icon={Activity}
                title="Model Status"
                subtitle="AI models active"
                color="168,85,247"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5 text-center">
            <p className="text-xs text-slate-600 leading-relaxed" style={{ fontSize: 10 }}>
              This is a government authorized system.<br />
              Unauthorized access is strictly prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
