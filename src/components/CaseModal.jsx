import { X, MapPin, CreditCard, User, AlertTriangle, Clock, Building2, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatAmount, formatTime } from '../data/mockData';

const RISK_CONFIG = {
  HIGH: { badge: 'risk-badge-high', color: '#F97316' },
  MEDIUM: { badge: 'risk-badge-medium', color: '#EAB308' },
  LOW: { badge: 'risk-badge-low', color: '#22C55E' },
};

const TYPE_COLORS = {
  UPI: '#22D3EE',
  OTP: '#A78BFA',
  Card: '#F97316',
  Wallet: '#34D399',
};

function Field({ label, value, mono, accent }) {
  return (
    <div className="py-2.5" style={{ borderBottom: '1px solid rgba(34,211,238,0.06)' }}>
      <div className="text-xs text-slate-600 mb-1 tracking-wider uppercase" style={{ fontSize: 10 }}>{label}</div>
      <div
        className={`text-sm font-medium ${mono ? 'font-mono' : ''}`}
        style={{ color: accent || '#E2E8F0' }}
      >
        {value}
      </div>
    </div>
  );
}

export default function CaseModal({ caseData, onClose }) {
  const navigate = useNavigate();
  if (!caseData) return null;

  const rc = RISK_CONFIG[caseData.risk] || RISK_CONFIG.LOW;
  const typeColor = TYPE_COLORS[caseData.type] || '#94A3B8';

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content" style={{ width: '100%', maxWidth: 560 }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{
          borderBottom: '1px solid rgba(34,211,238,0.1)',
        }}>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-lg font-black text-white font-mono">{caseData.id}</span>
              <span className="text-xs px-2 py-0.5 rounded font-bold" style={{
                background: `${typeColor}18`,
                color: typeColor,
                border: `1px solid ${typeColor}30`,
              }}>
                {caseData.type} FRAUD
              </span>
              <span className={`text-xs px-2 py-0.5 rounded font-bold ${rc.badge}`}>
                {caseData.risk}
              </span>
            </div>
            <p className="text-xs text-slate-500">{caseData.caseSummary}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors ml-4 flex-shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-2 gap-x-8">
            {/* Left column */}
            <div>
              <div className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-3">Case Details</div>
              <Field label="Amount" value={formatAmount(caseData.amount)} mono accent="#22D3EE" />
              <Field label="Fraud Type" value={caseData.type} />
              <Field label="Victim Location" value={caseData.location} />
              <Field label="Reported At" value={formatTime(caseData.reportedAt)} />
              <Field label="Status" value={caseData.status} accent={
                caseData.status === 'ACTIVE' ? '#EF4444' :
                caseData.status === 'INVESTIGATING' ? '#F97316' : '#22C55E'
              } />
            </div>

            {/* Right column */}
            <div>
              <div className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-3">Intelligence</div>
              <Field label="Linked Mule Account" value={caseData.linkedAccount} mono accent="#A78BFA" />
              <Field label="Linked Bank" value={caseData.linkedBank} />
              <Field label="Risk Score" value={`${caseData.riskScore}%`} accent={rc.color} />
              <Field label="Suspect IP" value={caseData.suspectIP} mono />
              <Field label="Device" value={caseData.deviceFingerprint} />
            </div>
          </div>

          {/* Predicted zone */}
          <div className="mt-4 p-4 rounded-lg flex items-center gap-4" style={{
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.2)',
          }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{
              background: 'rgba(239,68,68,0.15)',
            }}>
              <Target size={18} style={{ color: '#EF4444' }} />
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-0.5">Predicted Cash-Out Zone</div>
              <div className="text-sm font-bold text-white font-mono">{caseData.predictedZone}</div>
              <div className="text-xs text-slate-500 mt-0.5">Based on ML pattern analysis and historical cash-out behavior</div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-4">
            <div className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">Incident Description</div>
            <p className="text-xs text-slate-400 leading-relaxed" style={{
              background: 'rgba(34,211,238,0.03)',
              border: '1px solid rgba(34,211,238,0.08)',
              borderRadius: 6,
              padding: '12px',
            }}>
              {caseData.description}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4" style={{
          borderTop: '1px solid rgba(34,211,238,0.08)',
        }}>
          <button onClick={onClose} className="btn-secondary px-4 py-2 text-xs">
            Close
          </button>
          <button 
            onClick={() => {
              navigate(`/case-intelligence?caseId=${caseData.id}`);
              onClose();
            }}
            className="btn-primary px-4 py-2 text-xs"
          >
            Open Full Case →
          </button>
        </div>
      </div>
    </div>
  );
}
