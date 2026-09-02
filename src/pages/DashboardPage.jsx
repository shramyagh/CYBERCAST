import { useState, useCallback } from 'react';
import {
  AlertCircle, Layers, Share2, Clock, Activity
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import KPICard from '../components/KPICard';
import RiskMap from '../components/RiskMap';
import ZoneIntelligence from '../components/ZoneIntelligence';
import RecentCases from '../components/RecentCases';
import DistrictRisk from '../components/DistrictRisk';
import CaseModal from '../components/CaseModal';
import ZoneModal from '../components/ZoneModal';
import ComingSoonToast from '../components/ComingSoonToast';
import { KPI_DATA, RISK_ZONES } from '../data/mockData';

export default function DashboardPage() {
  // Map & zone state
  const [selectedZone, setSelectedZone] = useState(RISK_ZONES[0]); // Default: Noida (critical)
  const [predWindow, setPredWindow] = useState('Next 1 Hour');
  const [fraudTypes, setFraudTypes] = useState(['UPI', 'Card']);

  // Modals
  const [caseModal, setCaseModal] = useState(null);
  const [zoneModal, setZoneModal] = useState(null);

  // Toast
  const [toastModule, setToastModule] = useState(null);
  const [toastKey, setToastKey] = useState(0);

  const handleComingSoon = useCallback((label) => {
    setToastModule(label);
    setToastKey(k => k + 1); // force re-render to restart timer
  }, []);

  const handleZoneSelect = useCallback((zone) => {
    setSelectedZone(zone);
  }, []);

  const handleViewZoneDetails = useCallback((zone) => {
    setZoneModal(zone);
  }, []);

  const handleCaseSelect = useCallback((c) => {
    setCaseModal(c);
  }, []);

  // KPI icon configs
  const kpiItems = [
    {
      label: 'Active Cases',
      ...KPI_DATA.activeCases,
      icon: AlertCircle,
      iconColor: '249,115,22',
    },
    {
      label: 'High-Risk Zones',
      ...KPI_DATA.highRiskZones,
      icon: Layers,
      iconColor: '239,68,68',
    },
    {
      label: 'Mule Accounts',
      ...KPI_DATA.muleAccounts,
      icon: Share2,
      iconColor: '168,85,247',
    },
    {
      label: 'Predictions Next 6H',
      ...KPI_DATA.predictionsNext6h,
      icon: Clock,
      iconColor: '34,211,238',
    },
    {
      label: 'Avg Lead Time',
      ...KPI_DATA.avgLeadTime,
      icon: Activity,
      iconColor: '234,179,8',
    },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ background: '#050B14' }}>
      {/* Sidebar */}
      <Sidebar onComingSoon={handleComingSoon} />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <TopHeader onCaseSelect={handleCaseSelect} />

        {/* Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ padding: '16px 16px 12px 16px' }}>
          {/* KPI Row */}
          <div className="flex gap-3 mb-4">
            {kpiItems.map((kpi) => (
              <KPICard key={kpi.label} {...kpi} />
            ))}
          </div>

          {/* Map + Zone Intelligence */}
          <div className="flex gap-3 mb-4" style={{ height: 'calc(100vh - 340px)', minHeight: 380 }}>
            <RiskMap
              selectedZone={selectedZone}
              onZoneSelect={handleZoneSelect}
              predWindow={predWindow}
              setPredWindow={setPredWindow}
              fraudTypes={fraudTypes}
              setFraudTypes={setFraudTypes}
            />
            <ZoneIntelligence
              zone={selectedZone}
              onViewDetails={handleViewZoneDetails}
            />
          </div>

          {/* Bottom panels */}
          <div className="flex gap-3" style={{ minHeight: 240 }}>
            <RecentCases onCaseSelect={handleCaseSelect} />
            <DistrictRisk />
          </div>
        </div>
      </div>

      {/* Modals */}
      {caseModal && <CaseModal caseData={caseModal} onClose={() => setCaseModal(null)} />}
      {zoneModal && <ZoneModal zone={zoneModal} onClose={() => setZoneModal(null)} />}

      {/* Coming soon toast */}
      {toastModule && (
        <ComingSoonToast
          key={toastKey}
          module={toastModule}
          onClose={() => setToastModule(null)}
        />
      )}
    </div>
  );
}
