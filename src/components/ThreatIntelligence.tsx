import { motion } from 'motion/react';
import { 
  AlertTriangle, 
  Map as MapIcon, 
  Flag, 
  Search, 
  Filter, 
  ExternalLink,
  ShieldX,
  Zap,
  Globe
} from 'lucide-react';
import { Alert, Asset } from '../types';

interface ThreatIntelligenceProps {
  alerts: Alert[];
  assets: Asset[];
}

export default function ThreatIntelligence({ alerts, assets }: ThreatIntelligenceProps) {
  const getAssetTitle = (id: string) => assets.find(a => a.id === id)?.title || "Unknown Asset";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900">Threat Intelligence</h3>
          <p className="text-slate-500 text-sm mt-1 font-medium">Real-time tracking of unauthorized media redistribution across the web.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-rose-50 border border-rose-100 rounded-lg flex items-center gap-2 shadow-sm">
            <Zap className="w-4 h-4 text-rose-600" />
            <span className="text-sm font-bold text-rose-600 uppercase tracking-tight">Live Scanners Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters and Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="tech-card border-slate-200 bg-white">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Detection Summary</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 font-medium">Total Infringements</span>
                <span className="text-lg font-bold text-slate-900">{alerts.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 font-medium">High Risk</span>
                <span className="text-lg font-bold text-rose-600">{alerts.filter(a => a.severity === 'High').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 font-medium">Platforms Flagged</span>
                <span className="text-lg font-bold text-slate-900">12</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-100">
              <button className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-bold transition-all shadow-sm">
                Export Incident Report
              </button>
            </div>
          </div>

          <div className="tech-card border-slate-200 bg-white">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Top Platforms</h4>
            <div className="space-y-3">
              {[
                { name: 'GlobalTube', count: 12, color: 'bg-blue-500' },
                { name: 'StreamFlix', count: 8, color: 'bg-rose-500' },
                { name: 'PirateHosts', count: 5, color: 'bg-amber-500' },
                { name: 'SocialMedia X', count: 2, color: 'bg-emerald-500' },
              ].map((p) => (
                <div key={p.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>{p.name}</span>
                    <span>{p.count}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${p.color}`} style={{ width: `${(p.count / 20) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Alert Feed */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Filter by platform or URL..." 
                className="bg-white border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:border-slate-300 transition-colors">
              <Filter className="w-4 h-4" />
              Status
            </button>
          </div>

          <div className="space-y-3">
            {alerts.map((alert, i) => (
              <motion.div 
                key={alert.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer overflow-hidden"
              >
                {alert.severity === 'High' && (
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500" />
                )}
                
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-sm ${
                      alert.severity === 'High' 
                      ? 'bg-rose-50 border-rose-100 text-rose-600' 
                      : 'bg-amber-50 border-amber-100 text-amber-600'
                    }`}>
                      <ShieldX className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600">
                          {alert.status} DETECTED
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-xs font-bold text-slate-400">
                          {new Date(alert.detectedAt).toLocaleString()}
                        </span>
                      </div>
                      <h4 className="font-bold text-lg leading-tight mb-2 text-slate-800 group-hover:text-blue-600 transition-colors">
                        {getAssetTitle(alert.assetId)}
                      </h4>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                          <Globe className="w-3.5 h-3.5" />
                          <span>{alert.platform}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                          <Flag className="w-3.5 h-3.5" />
                          <span>{(alert.confidence * 100).toFixed(1)}% Fingerprint Match</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 items-end">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      alert.severity === 'High' 
                      ? 'bg-rose-100 text-rose-700' 
                      : 'bg-amber-100 text-amber-700'
                    }`}>
                      {alert.severity} SEVERITY
                    </span>
                    <button className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">
                      View Details <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between group/link">
                  <div className="flex items-center gap-3 truncate">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.3)]" />
                    <span className="text-xs font-mono font-medium text-slate-500 truncate">{alert.url}</span>
                  </div>
                  <a 
                    href={alert.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 text-slate-600 hover:border-blue-200 hover:text-blue-600 rounded text-[10px] font-bold uppercase tracking-wider transition-all shadow-sm"
                  >
                    Open Source <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronRight({ className }: { className: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
