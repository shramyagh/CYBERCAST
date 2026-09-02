import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CaseIntelligencePage from './pages/CaseIntelligencePage';
import MuleNetworkPage from './pages/MuleNetworkPage';
import ExplainableAIPage from './pages/ExplainableAIPage';
import AlertsInterventionPage from './pages/AlertsInterventionPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/case-intelligence" element={<CaseIntelligencePage />} />
        <Route path="/mule-network" element={<MuleNetworkPage />} />
        <Route path="/explainable-ai" element={<ExplainableAIPage />} />
        <Route path="/alerts" element={<AlertsInterventionPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
