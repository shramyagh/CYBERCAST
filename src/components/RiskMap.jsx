import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap, Polygon, Tooltip, Marker } from 'react-leaflet';
import L from 'leaflet';
import { Maximize2, Locate, Map as MapIcon, Satellite } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { HEX_CELLS, RISK_ZONES, getRiskColor, getRiskStatus, getZoneById } from '../data/mockData';

// ── Generate hexagon polygon points ──────────────────────────
// Must match the hexSize used in mockData.js generateHexGrid()
function hexPoints(lat, lng, size = 0.012) {
  return [0, 1, 2, 3, 4, 5].map(k => {
    const angle = (Math.PI / 3) * k + Math.PI / 6;
    return [lat + size * Math.sin(angle), lng + size * Math.cos(angle)];
  });
}

// ── Map tile switcher ──────────────────────────────────────────
function TileController({ mode }) {
  const map = useMap();
  return null;
}

// ── District label markers ─────────────────────────────────────
const DISTRICT_LABELS = [
  { name: 'New Delhi', pos: [28.6139, 77.2090] },
  { name: 'Noida', pos: [28.5355, 77.3910] },
  { name: 'Ghaziabad', pos: [28.6692, 77.4538] },
  { name: 'Gurugram', pos: [28.4595, 77.0266] },
  { name: 'Faridabad', pos: [28.4089, 77.3178] },
];

// ── Map filter panel ───────────────────────────────────────────
function MapFilters({ predWindow, setPredWindow, fraudTypes, setFraudTypes }) {
  const windows = ['Next 1 Hour', 'Next 3 Hours', 'Next 6 Hours', 'Next 12 Hours'];
  const types = ['UPI', 'Card', 'Wallet', 'OTP'];

  const toggleType = (t) => {
    setFraudTypes(prev =>
      prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]
    );
  };

  return (
    <div className="absolute top-3 left-3 z-[500] rounded-lg p-4" style={{
      background: 'rgba(7,14,26,0.95)',
      border: '1px solid rgba(34,211,238,0.15)',
      backdropFilter: 'blur(12px)',
      minWidth: 180,
    }}>
      <div className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
        Prediction Window
      </div>
      <div className="space-y-2 mb-5">
        {windows.map(w => (
          <label key={w} className="flex items-center gap-2.5 cursor-pointer group">
            <div
              className="w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
              style={{
                borderColor: predWindow === w ? '#22D3EE' : '#374151',
                background: predWindow === w ? '#22D3EE' : 'transparent',
              }}
              onClick={() => setPredWindow(w)}
            >
              {predWindow === w && (
                <div className="w-1.5 h-1.5 rounded-full bg-navy-950" style={{ background: '#070E1A' }} />
              )}
            </div>
            <span
              className="text-xs transition-colors cursor-pointer"
              style={{ color: predWindow === w ? '#E2E8F0' : '#4B5563' }}
              onClick={() => setPredWindow(w)}
            >
              {w}
            </span>
          </label>
        ))}
      </div>

      <div className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
        Fraud Type
      </div>
      <div className="space-y-2">
        {types.map(t => (
          <label key={t} className="flex items-center gap-2.5 cursor-pointer">
            <div
              className="w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0 transition-all"
              style={{
                background: fraudTypes.includes(t) ? '#22D3EE' : 'transparent',
                border: fraudTypes.includes(t) ? '1px solid #22D3EE' : '1px solid #374151',
              }}
              onClick={() => toggleType(t)}
            >
              {fraudTypes.includes(t) && (
                <svg width="8" height="8" viewBox="0 0 8 8">
                  <polyline points="1,4 3,6 7,2" stroke="#050B14" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <span
              className="text-xs cursor-pointer transition-colors"
              style={{ color: fraudTypes.includes(t) ? '#E2E8F0' : '#4B5563' }}
              onClick={() => toggleType(t)}
            >
              {t}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

// ── Legend ─────────────────────────────────────────────────────
function MapLegend() {
  return (
    <div className="absolute bottom-3 left-3 z-[500] flex gap-3 px-3 py-2 rounded-lg" style={{
      background: 'rgba(7,14,26,0.9)',
      border: '1px solid rgba(34,211,238,0.1)',
    }}>
      {[
        { color: '#22C55E', label: 'Low' },
        { color: '#EAB308', label: 'Moderate' },
        { color: '#F97316', label: 'High' },
        { color: '#EF4444', label: 'Critical' },
      ].map(({ color, label }) => (
        <div key={label} className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
          <span className="text-xs text-slate-500">{label}</span>
        </div>
      ))}
    </div>
  );
}

// ── Main RiskMap Component ────────────────────────────────────
export default function RiskMap({ selectedZone, onZoneSelect, predWindow, setPredWindow, fraudTypes, setFraudTypes }) {
  const [mapMode, setMapMode] = useState('map');

  // Compute risk modifier based on prediction window
  const windowModifier = {
    'Next 1 Hour': 1.0,
    'Next 3 Hours': 0.92,
    'Next 6 Hours': 0.85,
    'Next 12 Hours': 0.75,
  }[predWindow] || 1.0;

  // Filter cells based on fraud type
  const getVisibleCells = () => {
    return HEX_CELLS.map(cell => {
      const zone = RISK_ZONES.find(z => z.id === cell.zoneId);
      const showZone = zone && fraudTypes.includes(zone.primaryFraudType);
      const adjustedRisk = showZone ? Math.round(cell.risk * windowModifier) : Math.round(cell.risk * windowModifier * 0.4);
      return { ...cell, displayRisk: adjustedRisk, dimmed: !showZone };
    });
  };

  const visibleCells = getVisibleCells();

  const tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
  const satelliteUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

  return (
    <div className="relative flex-1 rounded-lg overflow-hidden" style={{
      border: '1px solid rgba(34,211,238,0.1)',
      minHeight: 0,
    }}>
      {/* Map/Satellite toggle */}
      <div className="absolute top-3 right-3 z-[500] flex rounded-lg overflow-hidden" style={{
        border: '1px solid rgba(34,211,238,0.2)',
        background: 'rgba(7,14,26,0.9)',
      }}>
        {['map', 'satellite'].map(mode => (
          <button
            key={mode}
            onClick={() => setMapMode(mode)}
            className="px-3 py-1.5 text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-1.5"
            style={{
              background: mapMode === mode ? 'rgba(34,211,238,0.15)' : 'transparent',
              color: mapMode === mode ? '#22D3EE' : '#4B5563',
              borderRight: mode === 'map' ? '1px solid rgba(34,211,238,0.15)' : 'none',
            }}
          >
            {mode === 'map' ? <MapIcon size={11} /> : <Satellite size={11} />}
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>

      {/* Locate & Fullscreen Controls */}
      <div className="absolute top-14 right-3 z-[500] flex flex-col gap-2">
        <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-900 border border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors" title="Locate">
          <Locate size={14} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-900 border border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors" title="Fullscreen">
          <Maximize2 size={14} />
        </button>
      </div>

      <MapFilters
        predWindow={predWindow}
        setPredWindow={setPredWindow}
        fraudTypes={fraudTypes}
        setFraudTypes={setFraudTypes}
      />

      <MapLegend />

      <MapContainer
        center={[28.5850, 77.2100]}
        zoom={11}
        style={{ width: '100%', height: '100%', background: '#050B14' }}
        zoomControl={true}
        scrollWheelZoom={true}
        preferCanvas={true}
      >
        <TileLayer
          url={mapMode === 'satellite' ? satelliteUrl : tileUrl}
          attribution='&copy; CartoDB'
          maxZoom={20}
        />

        {/* Hex cells */}
        {visibleCells.map(cell => {
          const pts = hexPoints(cell.center[0], cell.center[1]);
          const color = getRiskColor(cell.displayRisk);
          const isSelected = selectedZone?.id === cell.zoneId;

          return (
            <Polygon
              key={cell.id}
              positions={pts}
              pathOptions={{
                fillColor: color,
                fillOpacity: cell.dimmed ? 0.06 : (isSelected ? 0.8 : 0.55),
                color: isSelected ? '#fff' : color,
                weight: isSelected ? 1.5 : 0.3,
                opacity: cell.dimmed ? 0.2 : (isSelected ? 1 : 0.5),
              }}
              eventHandlers={{
                click: () => {
                  const zone = getZoneById(cell.zoneId);
                  onZoneSelect(zone);
                },
                dblclick: () => {
                  // If they double click the hexagon, jump to case intelligence
                  window.location.href = `/case-intelligence?zoneId=${cell.zoneId}`;
                },
                mouseover: (e) => {
                  e.target.setStyle({ fillOpacity: cell.dimmed ? 0.12 : 0.85, weight: 1 });
                },
                mouseout: (e) => {
                  e.target.setStyle({
                    fillOpacity: cell.dimmed ? 0.06 : (isSelected ? 0.8 : 0.55),
                    weight: isSelected ? 1.5 : 0.3,
                  });
                },
              }}
            >
              <Tooltip sticky direction="top" offset={[0, -5]}>
                <div style={{ minWidth: 130 }}>
                  <div className="font-bold text-cyan-400 text-xs mb-1">{cell.zoneId}</div>
                  <div className="text-slate-300 text-xs">Risk: <span style={{ color }}>{cell.displayRisk}%</span></div>
                  <div className="text-slate-500 text-xs">Status: {getRiskStatus(cell.displayRisk)}</div>
                  <div className="text-slate-500 text-xs">{cell.district}</div>
                </div>
              </Tooltip>
            </Polygon>
          );
        })}

        {/* Clean City Labels */}
        {DISTRICT_LABELS.map(district => {
          const customIcon = L.divIcon({
            className: 'custom-city-label',
            html: `<div style="
              color: white; 
              font-weight: 600; 
              font-size: 13px; 
              text-shadow: 0 1px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.6);
              letter-spacing: 0.5px;
              white-space: nowrap;
            ">${district.name}</div>`,
            iconSize: [100, 20],
            iconAnchor: [50, 10],
          });
          return (
            <Marker key={district.name} position={district.pos} icon={customIcon} interactive={false} />
          );
        })}
      </MapContainer>
    </div>
  );
}
