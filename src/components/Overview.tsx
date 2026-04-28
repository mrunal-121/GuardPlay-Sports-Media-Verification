import { motion } from 'motion/react';
import { 
  Shield, 
  AlertCircle, 
  TrendingUp, 
  ExternalLink, 
  Clock,
  ShieldAlert,
  BarChart3
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Asset, Alert, ViewState } from '../types';

interface OverviewProps {
  assets: Asset[];
  alerts: Alert[];
  onNavigate: (view: ViewState) => void;
}

const data = [
  { name: 'Mon', alerts: 4 },
  { name: 'Tue', alerts: 7 },
  { name: 'Wed', alerts: 5 },
  { name: 'Thu', alerts: 12 },
  { name: 'Fri', alerts: 9 },
  { name: 'Sat', alerts: 15 },
  { name: 'Sun', alerts: 11 },
];

export default function Overview({ assets, alerts, onNavigate }: OverviewProps) {
  const stats = [
    { label: 'Total Assets', value: assets.length, icon: Shield, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Active Alerts', value: alerts.filter(a => a.status !== 'Resolved').length, icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { label: 'Protection Rate', value: '99.9%', icon: ShieldAlert, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Verification Load', value: '1.2ms', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="tech-card bg-white shadow-sm border-slate-200"
          >
            <div className={`p-3 rounded-xl ${stat.bg} w-fit mb-4`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
            <h3 className="text-3xl font-bold mt-1 tracking-tight text-slate-900">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Detection Trend */}
        <div className="lg:col-span-2 tech-card bg-white shadow-sm border-slate-200 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="font-bold text-lg text-slate-800">Detection Analytics</h4>
              <p className="text-sm text-slate-500">Unauthorized use attempts across all platforms</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-200">
              <BarChart3 className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-bold text-blue-600">Real-time Feed</span>
            </div>
          </div>
          
          <div className="h-64 mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="alerts" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#colorAlerts)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Alerts Feed */}
        <div className="tech-card bg-white shadow-sm border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-lg text-slate-800">Live Alerts</h4>
            <button 
              onClick={() => onNavigate('intelligence')}
              className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1"
            >
              View All <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          
          <div className="space-y-4">
            {alerts.slice(0, 5).map((alert) => (
              <div key={alert.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 group hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${alert.severity === 'High' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                    <span className="text-sm font-bold text-slate-700">{alert.platform}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    {new Date(alert.detectedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate mb-3">{alert.url}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                    <span className="text-[10px] text-emerald-600 font-bold">{(alert.confidence * 100).toFixed(0)}% Match</span>
                  </div>
                  <button className="text-[10px] uppercase tracking-wider font-bold text-blue-600 hover:text-blue-700 transition-colors">
                    Take Action
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Asset Registry Summary */}
      <div className="tech-card bg-white shadow-sm border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="font-bold text-lg text-slate-800">Protected Inventory</h4>
            <p className="text-sm text-slate-500">Immutable ledger entries on Polygon Blockchain</p>
          </div>
          <button 
            onClick={() => onNavigate('registry')}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-bold transition-colors"
          >
            Manage Registry
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-[11px] uppercase tracking-wider font-bold">
                <th className="pb-4 font-bold">Asset ID</th>
                <th className="pb-4 font-bold">Title</th>
                <th className="pb-4 font-bold">Registered</th>
                <th className="pb-4 font-bold">Chain Status</th>
                <th className="pb-4 font-bold">Integrity</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {assets.map((asset) => (
                <tr key={asset.id} className="group border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 font-mono text-slate-400 font-medium">{asset.id}</td>
                  <td className="py-4 font-bold text-slate-700">{asset.title}</td>
                  <td className="py-4 text-slate-500">{new Date(asset.registeredAt).toLocaleDateString()}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-xs font-bold text-emerald-600">Verified</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[100%]" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
