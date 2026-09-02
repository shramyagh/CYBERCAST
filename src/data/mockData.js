// ============================================================
// CYBERCAST — Mock Data
// All data is structured for easy API replacement
// Replace these with API calls when backend is ready
// ============================================================

export const OFFICER = {
  id: 'INS-20481',
  name: 'Inspector S. Verma',
  department: 'Cyber Crime Division',
  initials: 'IN',
  role: 'Senior Intelligence Officer',
};

// ── Cases ────────────────────────────────────────────────────
export const CASES = [
  {
    id: 'CY-10281',
    type: 'UPI',
    amount: 45000,
    location: 'Noida',
    risk: 'HIGH',
    riskScore: 87,
    linkedAccount: 'MULE-7821',
    linkedBank: 'ICICI Bank, Sector 18',
    victimPhone: '+91-98xxxxxxx1',
    predictedZone: 'H3-ZONE-2847',
    reportedAt: '2026-08-24T14:32:00',
    status: 'ACTIVE',
    description: 'Victim received a fraudulent UPI payment request claiming to be from a government portal. Amount was debited before victim could cancel.',
    suspectIP: '103.xx.xx.21',
    deviceFingerprint: 'Android 13 / Chrome 124',
    caseSummary: 'UPI fraud linked to known mule network operating in Sector 18, Noida. Cross-linked with 4 other active cases.',
  },
  {
    id: 'CY-10282',
    type: 'OTP',
    amount: 18000,
    location: 'Delhi',
    risk: 'MEDIUM',
    riskScore: 62,
    linkedAccount: 'MULE-4412',
    linkedBank: 'SBI, Connaught Place',
    victimPhone: '+91-98xxxxxxx2',
    predictedZone: 'H3-ZONE-1193',
    reportedAt: '2026-08-24T13:15:00',
    status: 'INVESTIGATING',
    description: 'Victim was called by fraudster impersonating bank official. OTP was shared unknowingly leading to unauthorized transaction.',
    suspectIP: '103.xx.xx.44',
    deviceFingerprint: 'iOS 17 / Safari',
    caseSummary: 'Classic OTP scam using vishing. Suspect traced to call center network in South Delhi.',
  },
  {
    id: 'CY-10283',
    type: 'UPI',
    amount: 72000,
    location: 'Ghaziabad',
    risk: 'HIGH',
    riskScore: 79,
    linkedAccount: 'MULE-3388',
    linkedBank: 'HDFC Bank, Kaushambi',
    victimPhone: '+91-98xxxxxxx3',
    predictedZone: 'H3-ZONE-3341',
    reportedAt: '2026-08-24T12:48:00',
    status: 'ACTIVE',
    description: 'High-value UPI fraud. Amount transferred in 3 splits to avoid detection. Mule account used for layering.',
    suspectIP: '103.xx.xx.77',
    deviceFingerprint: 'Android 12 / Firefox',
    caseSummary: 'High-value split transaction fraud. AI flagged pattern similarity to 11 previous incidents.',
  },
  {
    id: 'CY-10284',
    type: 'Card',
    amount: 31000,
    location: 'Faridabad',
    risk: 'MEDIUM',
    riskScore: 53,
    linkedAccount: 'MULE-9012',
    linkedBank: 'Axis Bank, NIT',
    victimPhone: '+91-98xxxxxxx4',
    predictedZone: 'H3-ZONE-4420',
    reportedAt: '2026-08-24T11:22:00',
    status: 'INVESTIGATING',
    description: 'Card-not-present fraud. Card details obtained through phishing website mimicking an e-commerce portal.',
    suspectIP: '103.xx.xx.91',
    deviceFingerprint: 'Windows 11 / Chrome 124',
    caseSummary: 'CNP fraud linked to phishing campaign targeting online shoppers.',
  },
  {
    id: 'CY-10285',
    type: 'Wallet',
    amount: 12000,
    location: 'Gurugram',
    risk: 'LOW',
    riskScore: 28,
    linkedAccount: 'MULE-2201',
    linkedBank: 'Paytm Payments Bank',
    victimPhone: '+91-98xxxxxxx5',
    predictedZone: 'H3-ZONE-5519',
    reportedAt: '2026-08-24T10:05:00',
    status: 'CLOSED',
    description: 'Wallet fraud through fake cashback offer. Victim linked wallet to fraudulent merchant app.',
    suspectIP: '103.xx.xx.33',
    deviceFingerprint: 'Android 13 / Paytm App',
    caseSummary: 'Low-risk wallet scam. Mule account flagged for monitoring.',
  },
  {
    id: 'CY-10286',
    type: 'UPI',
    amount: 105000,
    location: 'Noida',
    risk: 'HIGH',
    riskScore: 92,
    linkedAccount: 'MULE-7821',
    linkedBank: 'ICICI Bank, Sector 18',
    victimPhone: '+91-98xxxxxxx6',
    predictedZone: 'H3-ZONE-2847',
    reportedAt: '2026-08-24T09:15:00',
    status: 'ACTIVE',
    description: 'Multiple unauthorized UPI mandates created. High-value transactions pushed through before account freeze.',
    suspectIP: '103.xx.xx.22',
    deviceFingerprint: 'Android 14 / Chrome 126',
    caseSummary: 'Escalated UPI fraud linked to primary mule node in Sector 18.',
  },
  {
    id: 'CY-10287',
    type: 'Card',
    amount: 22000,
    location: 'Delhi',
    risk: 'MEDIUM',
    riskScore: 68,
    linkedAccount: 'MULE-4412',
    linkedBank: 'SBI, Connaught Place',
    victimPhone: '+91-98xxxxxxx7',
    predictedZone: 'H3-ZONE-1193',
    reportedAt: '2026-08-24T08:45:00',
    status: 'INVESTIGATING',
    description: 'Suspicious overseas ATM withdrawal using cloned card data. Terminal compromised near metro station.',
    suspectIP: '185.xx.xx.12',
    deviceFingerprint: 'Unknown POS Terminal',
    caseSummary: 'Card cloning suspected. Follows pattern of recent skimming devices found in central Delhi.',
  },
  {
    id: 'CY-10288',
    type: 'OTP',
    amount: 54000,
    location: 'Gurugram',
    risk: 'HIGH',
    riskScore: 76,
    linkedAccount: 'MULE-2201',
    linkedBank: 'Paytm Payments Bank',
    victimPhone: '+91-98xxxxxxx8',
    predictedZone: 'H3-ZONE-5519',
    reportedAt: '2026-08-23T22:30:00',
    status: 'ACTIVE',
    description: 'Victim tricked into forwarding SMS containing bank OTP. Funds instantly transferred to digital wallet.',
    suspectIP: '103.xx.xx.44',
    deviceFingerprint: 'iOS 16 / Safari',
    caseSummary: 'Advanced SMS forwarding scam. Correlated with 3 other active investigations.',
  },
  {
    id: 'CY-10289',
    type: 'Wallet',
    amount: 8500,
    location: 'Ghaziabad',
    risk: 'LOW',
    riskScore: 34,
    linkedAccount: 'MULE-3388',
    linkedBank: 'HDFC Bank, Kaushambi',
    victimPhone: '+91-98xxxxxxx9',
    predictedZone: 'H3-ZONE-3341',
    reportedAt: '2026-08-23T19:20:00',
    status: 'CLOSED',
    description: 'Fraudulent cash request sent via wallet app. Victim approved thinking it was a refund.',
    suspectIP: '103.xx.xx.89',
    deviceFingerprint: 'Android 11 / Wallet App',
    caseSummary: 'Low-value social engineering attack. Account flagged and recovered.',
  },
  {
    id: 'CY-10290',
    type: 'UPI',
    amount: 150000,
    location: 'Faridabad',
    risk: 'HIGH',
    riskScore: 95,
    linkedAccount: 'MULE-9012',
    linkedBank: 'Axis Bank, NIT',
    victimPhone: '+91-98xxxxxx10',
    predictedZone: 'H3-ZONE-4420',
    reportedAt: '2026-08-23T15:10:00',
    status: 'ACTIVE',
    description: 'Corporate account targeted via spear-phishing. Payment intercepted and re-routed to mule network.',
    suspectIP: '45.xx.xx.102',
    deviceFingerprint: 'Windows 10 / Edge',
    caseSummary: 'High-value corporate interception. Immediate intervention required.',
  },
  {
    id: 'CY-10265',
    type: 'Card',
    amount: 52000,
    location: 'Noida',
    risk: 'HIGH',
    riskScore: 82,
    linkedAccount: 'MULE-7821',
    linkedBank: 'ICICI Bank, Sector 18',
    victimPhone: '+91-98xxxxxx11',
    predictedZone: 'H3-ZONE-2847',
    reportedAt: '2026-08-22T19:12:00',
    status: 'ACTIVE',
    description: 'Cloned card used at ATM. Mule account identified receiving funds from multiple victims.',
    suspectIP: '103.xx.xx.21',
    deviceFingerprint: 'Unknown POS Terminal',
    caseSummary: 'ATM withdrawal matching pattern of recent skimming gang.',
  },
  {
    id: 'CY-10276',
    type: 'OTP',
    amount: 12500,
    location: 'Delhi',
    risk: 'MEDIUM',
    riskScore: 65,
    linkedAccount: 'MULE-7821',
    linkedBank: 'ICICI Bank, Sector 18',
    victimPhone: '+91-98xxxxxx12',
    predictedZone: 'H3-ZONE-1193',
    reportedAt: '2026-08-23T09:45:00',
    status: 'INVESTIGATING',
    description: 'Victim tricked into sharing OTP by caller pretending to be bank customer care.',
    suspectIP: '103.xx.xx.44',
    deviceFingerprint: 'Android 12 / Chrome',
    caseSummary: 'Social engineering vector leading to unauthorized debit.',
  },
  {
    id: 'CY-10278',
    type: 'Wallet',
    amount: 34000,
    location: 'Noida',
    risk: 'HIGH',
    riskScore: 88,
    linkedAccount: 'MULE-7821',
    linkedBank: 'ICICI Bank, Sector 18',
    victimPhone: '+91-98xxxxxx13',
    predictedZone: 'H3-ZONE-2847',
    reportedAt: '2026-08-23T10:30:00',
    status: 'ACTIVE',
    description: 'Fraudulent KYC update link sent via SMS. Wallet balance drained immediately.',
    suspectIP: '103.xx.xx.21',
    deviceFingerprint: 'iOS 16 / Safari',
    caseSummary: 'KYC phishing scam. Linked to primary mule MULE-7821.',
  },
  {
    id: 'CY-10291',
    type: 'UPI',
    amount: 88000,
    location: 'Ghaziabad',
    risk: 'HIGH',
    riskScore: 91,
    linkedAccount: 'MULE-442',
    linkedBank: 'SBI, Connaught Place',
    victimPhone: '+91-98xxxxxx14',
    predictedZone: 'H3-ZONE-3341',
    reportedAt: '2026-08-24T15:20:00',
    status: 'ACTIVE',
    description: 'QR code fraud. Victim scanned a fraudulent code to receive payment but funds were debited.',
    suspectIP: '103.xx.xx.77',
    deviceFingerprint: 'Android 14 / WhatsApp',
    caseSummary: 'QR code scam targeting small merchants. Mule account MULE-442 used.',
  },
];

// ── Risk Zones ────────────────────────────────────────────────
export const RISK_ZONES = [
  {
    id: 'H3-ZONE-2847',
    name: 'Noida Sector 18',
    district: 'Noida',
    center: [28.5705, 77.3219],
    riskScore: 87,
    status: 'CRITICAL',
    predictedWindow: '18:00 – 00:00',
    confidence: 91,
    linkedCases: 24,
    linkedMuleAccounts: 4,
    nearbyATMs: 12,
    primaryFraudType: 'UPI',
    topLocations: [
      { name: 'ICICI Bank, Sector 18', distance: '0.4 km', type: 'bank' },
      { name: 'HDFC Bank, Sector 18', distance: '0.7 km', type: 'bank' },
      { name: 'Axis Bank, Noida', distance: '1.1 km', type: 'bank' },
      { name: 'SBI ATM, Sector 17', distance: '1.2 km', type: 'atm' },
    ],
    topFactors: [
      'High density of mule accounts in area',
      'Previous cash-out events on weekday evenings',
      'Multiple SIM registrations from single address',
      'Elevated UPI transaction velocity',
    ],
    trend: 'INCREASING',
  },
  {
    id: 'H3-ZONE-1193',
    name: 'Central Delhi',
    district: 'Delhi',
    center: [28.6315, 77.2167],
    riskScore: 72,
    status: 'HIGH',
    predictedWindow: '16:00 – 21:00',
    confidence: 83,
    linkedCases: 18,
    linkedMuleAccounts: 3,
    nearbyATMs: 9,
    primaryFraudType: 'OTP',
    topLocations: [
      { name: 'SBI, Connaught Place', distance: '0.2 km', type: 'bank' },
      { name: 'PNB ATM, CP', distance: '0.5 km', type: 'atm' },
      { name: 'BOI Branch, Janpath', distance: '0.9 km', type: 'bank' },
      { name: 'HDFC ATM, Barakhamba', distance: '1.4 km', type: 'atm' },
    ],
    topFactors: [
      'Surge in OTP fraud complaints',
      'Vishing call patterns from local numbers',
      'Multiple victims from same PIN code',
      'Mule account cluster near ITO',
    ],
    trend: 'STABLE',
  },
  {
    id: 'H3-ZONE-3341',
    name: 'Kaushambi – Ghaziabad',
    district: 'Ghaziabad',
    center: [28.6430, 77.3360],
    riskScore: 56,
    status: 'HIGH',
    predictedWindow: '14:00 – 19:00',
    confidence: 74,
    linkedCases: 11,
    linkedMuleAccounts: 2,
    nearbyATMs: 7,
    primaryFraudType: 'UPI',
    topLocations: [
      { name: 'HDFC Bank, Kaushambi', distance: '0.3 km', type: 'bank' },
      { name: 'Axis Bank, Vaishali', distance: '0.8 km', type: 'bank' },
      { name: 'SBI ATM, Kaushambi', distance: '1.0 km', type: 'atm' },
      { name: 'Canara Bank, Ghaziabad', distance: '1.5 km', type: 'bank' },
    ],
    topFactors: [
      'Split transaction pattern detected',
      'New SIM activations linked to fraud',
      'ATM cluster withdrawal pattern',
      'AI similarity score 79% to prior incidents',
    ],
    trend: 'INCREASING',
  },
  {
    id: 'H3-ZONE-4420',
    name: 'NIT – Faridabad',
    district: 'Faridabad',
    center: [28.4089, 77.3178],
    riskScore: 43,
    status: 'MODERATE',
    predictedWindow: '12:00 – 16:00',
    confidence: 65,
    linkedCases: 7,
    linkedMuleAccounts: 2,
    nearbyATMs: 5,
    primaryFraudType: 'Card',
    topLocations: [
      { name: 'Axis Bank, NIT', distance: '0.4 km', type: 'bank' },
      { name: 'ICICI ATM, Old Faridabad', distance: '0.9 km', type: 'atm' },
      { name: 'PNB Branch, NIT', distance: '1.2 km', type: 'bank' },
      { name: 'HDFC ATM, Faridabad', distance: '1.6 km', type: 'atm' },
    ],
    topFactors: [
      'Card cloning incidents near ATM clusters',
      'Phishing website hits from area',
      'E-commerce dispute surge',
    ],
    trend: 'STABLE',
  },
  {
    id: 'H3-ZONE-5519',
    name: 'DLF – Gurugram',
    district: 'Gurugram',
    center: [28.4595, 77.0266],
    riskScore: 28,
    status: 'LOW',
    predictedWindow: '10:00 – 14:00',
    confidence: 58,
    linkedCases: 4,
    linkedMuleAccounts: 1,
    nearbyATMs: 4,
    primaryFraudType: 'Wallet',
    topLocations: [
      { name: 'Paytm Bank, DLF', distance: '0.6 km', type: 'bank' },
      { name: 'HDFC Bank, Sector 29', distance: '1.0 km', type: 'bank' },
      { name: 'ICICI ATM, MG Road', distance: '1.3 km', type: 'atm' },
      { name: 'Kotak Bank, Gurugram', distance: '1.7 km', type: 'bank' },
    ],
    topFactors: [
      'Low-value wallet transactions flagged',
      'Fake merchant app installs',
    ],
    trend: 'DECREASING',
  },
];

// ── District Risk ──────────────────────────────────────────────
export const DISTRICT_RISK = [
  { district: 'Noida', risk: 87, status: 'CRITICAL', cases: 24 },
  { district: 'Delhi', risk: 72, status: 'HIGH', cases: 18 },
  { district: 'Ghaziabad', risk: 56, status: 'HIGH', cases: 11 },
  { district: 'Faridabad', risk: 43, status: 'MODERATE', cases: 7 },
  { district: 'Gurugram', risk: 28, status: 'LOW', cases: 4 },
];

// ── Alerts ────────────────────────────────────────────────────
export const ALERTS = [
  {
    id: 'ALT-001',
    severity: 'CRITICAL',
    title: 'High risk zone detected in Sector 18, Noida',
    description: 'AI model predicts 87% probability of cash-out event in H3-ZONE-2847 between 18:00–00:00.',
    time: '18:00 – 00:00',
    timestamp: '2026-08-24T14:45:00',
    zone: 'H3-ZONE-2847',
    acknowledged: false,
  },
  {
    id: 'ALT-002',
    severity: 'HIGH',
    title: 'Unusual activity on MULE-7821',
    description: 'Mule account MULE-7821 shows 6 rapid transactions totalling ₹1,23,000 in 45 minutes.',
    time: '14:35',
    timestamp: '2026-08-24T14:35:00',
    zone: 'H3-ZONE-2847',
    acknowledged: false,
  },
  {
    id: 'ALT-003',
    severity: 'MEDIUM',
    title: 'Multiple complaints linked in Ghaziabad',
    description: 'Cluster of 8 UPI fraud complaints from Kaushambi area within 2 hours. Pattern match: 94%.',
    time: '13:20',
    timestamp: '2026-08-24T13:20:00',
    zone: 'H3-ZONE-3341',
    acknowledged: false,
  },
  {
    id: 'ALT-004',
    severity: 'INFO',
    title: 'New pattern identified in OTP frauds',
    description: 'ML model identified a new OTP scam vector using fake TRAI disconnect notices. 12 victims in past 24h.',
    time: '12:05',
    timestamp: '2026-08-24T12:05:00',
    zone: 'H3-ZONE-1193',
    acknowledged: true,
  },
];

// ── KPI Data ───────────────────────────────────────────────────
export const KPI_DATA = {
  activeCases: { value: 1284, change: '+12.4%', trend: 'up', spark: [40, 45, 38, 52, 58, 55, 62, 70, 75, 80, 85, 82] },
  highRiskZones: { value: 17, change: '+4', trend: 'up', spark: [8, 10, 9, 12, 11, 13, 15, 14, 16, 15, 17, 17] },
  muleAccounts: { value: 43, change: '+8', trend: 'up', spark: [20, 22, 25, 28, 30, 32, 35, 36, 38, 40, 42, 43] },
  predictionsNext6h: { value: 29, change: '+3', trend: 'up', spark: [12, 15, 18, 14, 20, 22, 19, 24, 26, 25, 28, 29] },
  avgLeadTime: { value: '4.7 hrs', change: '+1.2 hrs', trend: 'up', spark: [2.1, 2.5, 2.8, 3.1, 3.4, 3.8, 4.0, 4.2, 4.4, 4.5, 4.6, 4.7] },
};

// ── Mule Accounts ──────────────────────────────────────────────
export const MULE_ACCOUNTS = [
  { id: 'MULE-7821', bank: 'ICICI Bank', zone: 'H3-ZONE-2847', transactions: 6, totalAmount: 123000, status: 'FLAGGED', linkedCases: 4 },
  { id: 'MULE-4412', bank: 'SBI', zone: 'H3-ZONE-1193', transactions: 3, totalAmount: 45000, status: 'MONITORING', linkedCases: 2 },
  { id: 'MULE-3388', bank: 'HDFC Bank', zone: 'H3-ZONE-3341', transactions: 3, totalAmount: 72000, status: 'FLAGGED', linkedCases: 3 },
  { id: 'MULE-9012', bank: 'Axis Bank', zone: 'H3-ZONE-4420', transactions: 2, totalAmount: 31000, status: 'MONITORING', linkedCases: 1 },
  { id: 'MULE-2201', bank: 'Paytm Payments Bank', zone: 'H3-ZONE-5519', transactions: 1, totalAmount: 12000, status: 'CLOSED', linkedCases: 1 },
];

// ── Map Hex Grid (procedurally generated dense tessellation) ──
// ── Map Hex Grid (procedurally generated dense tessellation) ──
// Hotspot centers with influence radius and peak risk
const HOTSPOTS = [
  { center: [28.5705, 77.3219], peakRisk: 92, radius: 0.08, zoneId: 'H3-ZONE-2847', district: 'Noida' },
  { center: [28.6315, 77.2167], peakRisk: 75, radius: 0.07, zoneId: 'H3-ZONE-1193', district: 'Delhi' },
  { center: [28.6430, 77.3360], peakRisk: 60, radius: 0.06, zoneId: 'H3-ZONE-3341', district: 'Ghaziabad' },
  { center: [28.4089, 77.3178], peakRisk: 48, radius: 0.05, zoneId: 'H3-ZONE-4420', district: 'Faridabad' },
  { center: [28.4595, 77.0266], peakRisk: 32, radius: 0.04, zoneId: 'H3-ZONE-5519', district: 'Gurugram' },
];

function generateHexGrid() {
  const cells = [];
  // Bounding box for Delhi NCR
  const latMin = 28.35, latMax = 28.72;
  const lngMin = 76.95, lngMax = 77.50;
  // Hex spacing — flat-top hex tessellation
  const hexSize = 0.012; // ~1.3km per hex
  const rowHeight = hexSize * Math.sqrt(3);
  const colWidth = hexSize * 1.5;

  let id = 0;
  for (let lng = lngMin; lng <= lngMax; lng += colWidth) {
    const col = Math.round((lng - lngMin) / colWidth);
    const latOffset = (col % 2 === 1) ? rowHeight / 2 : 0;
    for (let lat = latMin + latOffset; lat <= latMax; lat += rowHeight) {
      // Calculate risk from all hotspots (gaussian falloff, take max)
      let maxRisk = 0;
      let closestZoneId = 'H3-ZONE-1193';
      let closestDistrict = 'Delhi';
      let minDist = Infinity;

      for (const hs of HOTSPOTS) {
        const dlat = lat - hs.center[0];
        const dlng = lng - hs.center[1];
        const dist = Math.sqrt(dlat * dlat + dlng * dlng);
        // Gaussian falloff
        const influence = hs.peakRisk * Math.exp(-(dist * dist) / (2 * hs.radius * hs.radius));
        if (influence > maxRisk) {
          maxRisk = influence;
        }
        if (dist < minDist) {
          minDist = dist;
          closestZoneId = hs.zoneId;
          closestDistrict = hs.district;
        }
      }

      const risk = Math.round(Math.min(maxRisk, 100));
      // Only include cells with meaningful risk (> 20) to create distinct, organic blobs
      if (risk > 20) {
        cells.push({
          id: `h-${String(id++).padStart(4, '0')}`,
          center: [lat, lng],
          risk,
          zoneId: closestZoneId,
          district: closestDistrict,
        });
      }
    }
  }
  return cells;
}

export const HEX_CELLS = generateHexGrid();

// ── Utility functions ──────────────────────────────────────────
export function getRiskColor(score) {
  if (score >= 75) return '#EF4444'; // critical
  if (score >= 55) return '#F97316'; // high
  if (score >= 35) return '#EAB308'; // moderate
  return '#22C55E'; // low
}

export function getRiskStatus(score) {
  if (score >= 75) return 'CRITICAL';
  if (score >= 55) return 'HIGH';
  if (score >= 35) return 'MODERATE';
  return 'LOW';
}

export function getZoneById(id) {
  return RISK_ZONES.find(z => z.id === id) || RISK_ZONES[0];
}

export function formatAmount(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

export function searchCases(query) {
  if (!query || query.trim() === '') return [];
  const q = query.toLowerCase();
  return CASES.filter(c =>
    c.id.toLowerCase().includes(q) ||
    c.type.toLowerCase().includes(q) ||
    c.location.toLowerCase().includes(q) ||
    c.linkedAccount.toLowerCase().includes(q)
  );
}
