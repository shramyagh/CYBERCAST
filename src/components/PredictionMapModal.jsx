import React, { useState } from 'react';
import { X } from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const PREDICTIONS = [
  { name: 'Noida\nSector 18', pos: [28.5705, 77.3219], pct: 87 },
  { name: 'Ghaziabad', pos: [28.6692, 77.4538], pct: 64 },
  { name: 'Connaught\nPlace', pos: [28.6304, 77.2177], pct: 58 },
  { name: 'Noida\nSector 62', pos: [28.6208, 77.3639], pct: 54 },
  { name: 'South Delhi', pos: [28.4962, 77.2155], pct: 42 },
  { name: 'Faridabad', pos: [28.4089, 77.3178], pct: 46 },
  { name: 'North Delhi', pos: [28.7383, 77.1358], pct: 36 },
  { name: 'West Delhi', pos: [28.6519, 77.1265], pct: 28 },
  { name: 'Gurugram', pos: [28.4595, 77.0266], pct: 31 },
];

function getColor(pct) {
  if (pct > 80) return '#EF4444'; // Red
  if (pct > 60) return '#F97316'; // Orange
  if (pct > 30) return '#EAB308'; // Yellow
  return '#22C55E'; // Green
}

function getGlowSize(pct) {
  if (pct > 80) return 110;
  if (pct > 60) return 90;
  if (pct > 30) return 75;
  return 60;
}

export default function PredictionMapModal({ onClose }) {
  const [timeline, setTimeline] = useState(3); // index for 19:00 (61%)

  const timelineData = [
    { time: '16:00', pct: 42 },
    { time: '17:00', pct: 49 },
    { time: '18:00', pct: 61 },
    { time: '19:00', pct: 73 },
    { time: '20:00', pct: 82 },
    { time: '21:00', pct: 87 },
    { time: '22:00', pct: 89 },
    { time: '23:00', pct: 86 },
    { time: '00:00', pct: 81 },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8">
      <div className="w-full h-full max-w-[1400px] bg-[#050B14] border border-cyan-500/20 rounded-xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(34,211,238,0.15)]">
        
        {/* Header & Map Container */}
        <div className="relative flex-1 bg-[#050B14]">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-[500] w-8 h-8 flex items-center justify-center rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>

          {/* Legend */}
          <div className="absolute top-4 left-4 z-[500] bg-[#070E1A]/90 border border-slate-800 rounded-lg p-3 backdrop-blur-md">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Risk Level</div>
            {[
              { label: 'Low (0-30%)', color: '#22C55E' },
              { label: 'Moderate (31-60%)', color: '#EAB308' },
              { label: 'High (61-80%)', color: '#F97316' },
              { label: 'Critical (81-100%)', color: '#EF4444' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-2 mb-1.5 last:mb-0">
                <div className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: l.color, color: l.color }} />
                <span className="text-xs text-slate-300">{l.label}</span>
              </div>
            ))}
          </div>

          <MapContainer 
            center={[28.58, 77.22]} 
            zoom={11} 
            style={{ width: '100%', height: '100%', background: '#050B14' }}
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; CartoDB'
            />
            {PREDICTIONS.map(p => {
              const color = getColor(p.pct);
              const size = getGlowSize(p.pct);
              const icon = L.divIcon({
                className: 'custom-pred-marker',
                html: `
                  <div style="
                    width: ${size}px; 
                    height: ${size}px; 
                    border-radius: 50%; 
                    background: ${color}20; 
                    border: 1px solid ${color}60; 
                    box-shadow: 0 0 30px ${color}40, inset 0 0 20px ${color}20;
                    display: flex; 
                    flex-direction: column; 
                    align-items: center; 
                    justify-content: center;
                    transform: translate(-50%, -50%);
                  ">
                    <div style="font-weight: 800; font-size: ${p.pct > 80 ? '16px' : '13px'}; color: ${color}; line-height: 1;">${p.pct}%</div>
                    <div style="font-size: 9px; font-weight: 600; color: #cbd5e1; text-align: center; line-height: 1.1; margin-top: 2px;">
                      ${p.name.replace('\n', '<br/>')}
                    </div>
                  </div>
                `,
                iconSize: [0, 0],
              });

              return (
                <Marker key={p.name} position={p.pos} icon={icon} interactive={false} />
              );
            })}
          </MapContainer>
        </div>

        {/* Bottom Panel */}
        <div className="h-48 bg-[#070E1A] border-t border-cyan-500/20 flex divide-x divide-slate-800">
          
          {/* KPIs */}
          <div className="w-[300px] p-5 flex flex-col justify-center space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                Predicted Window
              </span>
              <span className="text-sm font-bold text-slate-200">18:00 - 00:00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Confidence
              </span>
              <span className="text-sm font-bold text-slate-200">91%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                Related Cases
              </span>
              <span className="text-sm font-bold text-slate-200">7</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13.2 9.8L12 11l1.2 1.2M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                Linked Mule Accounts
              </span>
              <span className="text-sm font-bold text-slate-200">3</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="flex-1 p-5 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-8">
              <h3 className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Risk Escalation Timeline</h3>
              <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] text-slate-400">i</div>
            </div>
            
            <div className="relative flex justify-between items-center px-4">
              <div className="absolute left-6 right-6 h-0.5 bg-slate-800 top-[19px]"></div>
              {timelineData.map((t, i) => {
                const color = getColor(t.pct);
                return (
                  <div key={t.time} className="flex flex-col items-center relative z-10" onClick={() => setTimeline(i)} style={{ cursor: 'pointer' }}>
                    <div className="text-[10px] text-slate-500 mb-3 font-medium">{t.time}</div>
                    <div 
                      className="w-4 h-4 rounded-full border-2 transition-all" 
                      style={{ 
                        borderColor: color, 
                        backgroundColor: '#070E1A',
                        boxShadow: timeline === i ? `0 0 15px ${color}` : 'none',
                        transform: timeline === i ? 'scale(1.2)' : 'scale(1)'
                      }} 
                    />
                    <div className="text-[11px] font-bold mt-3" style={{ color: timeline === i ? color : '#94A3B8' }}>{t.pct}%</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Hotspots */}
          <div className="w-[340px] p-5 flex flex-col justify-center">
            <h3 className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-4">Top Predicted Hotspots (Next 6 Hrs)</h3>
            <div className="space-y-3">
              {PREDICTIONS.slice(0, 5).map((p, i) => {
                const color = getColor(p.pct);
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs text-slate-600 font-mono">{i + 1}</span>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-xs text-slate-300 w-28 truncate">{p.name.replace('\n', ' ')}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${p.pct}%`, backgroundColor: color }} />
                    </div>
                    <span className="text-xs font-bold text-slate-200 w-8 text-right">{p.pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
