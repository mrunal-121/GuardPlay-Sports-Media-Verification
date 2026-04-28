export interface Asset {
  id: string;
  title: string;
  owner: string;
  type: string;
  blockchainHash: string;
  registeredAt: string;
  watermarkId: string;
  status: 'Protected' | 'Monitoring' | 'Alerted';
}

export interface Alert {
  id: string;
  assetId: string;
  platform: string;
  url: string;
  detectedAt: string;
  confidence: number;
  status: 'New' | 'Investigating' | 'Resolved' | 'Active';
  severity: 'Low' | 'Medium' | 'High';
}

export type ViewState = 'overview' | 'registry' | 'intelligence' | 'verification';
