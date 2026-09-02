import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ShieldCheck, Lock } from 'lucide-react';

export default function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="flex items-center gap-2.5 pl-3 hover:opacity-80 transition-opacity" 
        style={{ borderLeft: '1px solid rgba(34,211,238,0.1)' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black" style={{
          background: 'rgba(34,211,238,0.15)',
          color: '#22D3EE',
        }}>
          IN
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-slate-200">INS-20481</div>
          <div className="text-[10px] text-slate-500">Cyber Crime Division</div>
        </div>
        <ChevronDown size={12} className="text-slate-600 transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-lg overflow-hidden shadow-2xl z-[100] animate-in fade-in slide-in-from-top-2 duration-200" style={{
          background: 'rgba(10,20,34,0.95)',
          border: '1px solid rgba(34,211,238,0.2)',
          backdropFilter: 'blur(12px)',
        }}>
          <div className="px-4 py-3 border-b border-slate-800/50 bg-[#050B14]/50">
            <div className="text-sm font-bold text-slate-200">System Status</div>
          </div>
          
          <div className="p-2 flex flex-col gap-1">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded hover:bg-white/5 transition-colors">
              <div className="w-2 h-2 rounded-full bg-green-500 status-blink shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <div>
                <div className="text-[10px] font-bold text-slate-300 tracking-wider">SYSTEM SECURE</div>
                <div className="text-green-500 text-[10px]">All systems operational</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 px-3 py-2.5 rounded hover:bg-white/5 transition-colors">
              <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
              <div>
                <div className="text-[10px] font-bold text-slate-300 tracking-wider">DATA ENCRYPTED</div>
                <div className="text-cyan-500 text-[10px]">End-to-end encryption active</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
