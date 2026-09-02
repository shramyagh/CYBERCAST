import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield, LayoutDashboard, Briefcase, Network, MapPin,
  Brain, Bell, BarChart2, Play, Settings, Lock, LogOut,
  ChevronRight, Zap, Menu
} from 'lucide-react';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Command Center', path: '/dashboard' },
  { icon: Briefcase, label: 'Case Intelligence', path: '/case-intelligence' },
  { icon: Network, label: 'Mule Network', path: '/mule-network' },
  { icon: Brain, label: 'Explainable AI', path: '/explainable-ai' },
  { icon: Bell, label: 'Alerts & Intervention', path: '/alerts' },
];

export default function Sidebar({ onComingSoon }) {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('sidebarCollapsed') === 'true';
  });

  const toggleCollapse = () => {
    const newVal = !isCollapsed;
    setIsCollapsed(newVal);
    localStorage.setItem('sidebarCollapsed', String(newVal));
  };

  const handleClick = (item) => {
    if (item.comingSoon) {
      onComingSoon && onComingSoon(item.label);
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <aside className="flex flex-col h-full transition-all duration-300" style={{
      width: isCollapsed ? 64 : 208,
      minWidth: isCollapsed ? 64 : 208,
      background: '#070E1A',
      borderRight: '1px solid rgba(34,211,238,0.08)',
    }}>
      {/* Top Header with Hamburger */}
      <div className={`px-4 py-4 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`} style={{ borderBottom: '1px solid rgba(34,211,238,0.07)', minHeight: '80px' }}>
        {!isCollapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{
              background: 'rgba(34,211,238,0.12)',
              border: '1px solid rgba(34,211,238,0.25)',
            }}>
              <Shield size={15} className="text-cyan-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black text-white tracking-widest leading-none">CYBERCAST</span>
            </div>
          </div>
        )}
        <button 
          onClick={toggleCollapse}
          className={`text-slate-400 hover:text-white transition-colors ${isCollapsed ? '' : ''}`}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-0.5 custom-scrollbar">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            onClick={() => handleClick(item)}
            className={`sidebar-item w-full ${currentPath === item.path ? 'active' : ''} ${isCollapsed ? 'justify-center px-0' : ''}`}
            title={isCollapsed ? item.label : undefined}
          >
            <item.icon size={15} className="flex-shrink-0" />
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                {item.comingSoon && (
                  <ChevronRight size={11} className="opacity-30" />
                )}
              </>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom status */}
      <div className={`px-3 py-4 space-y-3 ${isCollapsed ? 'flex flex-col items-center' : ''}`} style={{ borderTop: '1px solid rgba(34,211,238,0.07)' }}>

        {/* Officer profile */}
        <div className={`rounded-lg ${isCollapsed ? 'p-1.5 mt-0 w-full' : 'p-2.5 mt-2'}`} style={{
          background: 'rgba(34,211,238,0.05)',
          border: '1px solid rgba(34,211,238,0.1)',
        }}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5'}`}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-black" style={{
              background: 'rgba(34,211,238,0.15)',
              color: '#22D3EE',
            }}>
              IN
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-slate-200 truncate">INS-20481</div>
                <div className="text-[9px] text-slate-500 truncate">Cyber Crime Division</div>
              </div>
            )}
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => navigate('/login')}
          className={`sidebar-item w-full text-red-500/60 hover:text-red-400 ${isCollapsed ? 'justify-center px-0' : ''}`}
          style={{ marginTop: 4 }}
          title={isCollapsed ? 'Logout' : undefined}
        >
          <LogOut size={14} className="flex-shrink-0" />
          {!isCollapsed && <span>LOGOUT</span>}
        </button>
      </div>
    </aside>
  );
}
