/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Activity, 
  Database, 
  AlertTriangle, 
  Search, 
  Lock, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Menu,
  ChevronRight,
  Plus
} from 'lucide-react';
import { Asset, Alert, ViewState } from './types';
import Overview from './components/Overview';
import AssetRegistry from './components/AssetRegistry';
import ThreatIntelligence from './components/ThreatIntelligence';
import VerificationTool from './components/VerificationTool';

export default function App() {
  const [activeView, setActiveView] = useState<ViewState>('overview');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Polling every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 5000); // 5s timeout

      const [assetsRes, alertsRes] = await Promise.all([
        fetch('/api/assets', { signal: controller.signal }),
        fetch('/api/alerts', { signal: controller.signal })
      ]);
      
      clearTimeout(id);

      if (!assetsRes.ok || !alertsRes.ok) throw new Error('API unstable');

      const assetsData = await assetsRes.json();
      const alertsData = await alertsRes.json();
      setAssets(assetsData);
      setAlerts(alertsData);
      setLoading(false);
    } catch (error) {
      // Fail silently for polling, retry after shorter interval if loading
      if (loading) {
        setTimeout(fetchData, 2000); 
      }
      console.warn('API sync deferred:', error);
    }
  };

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: Activity },
    { id: 'registry', label: 'Asset Registry', icon: Database },
    { id: 'intelligence', label: 'Threat Intel', icon: AlertTriangle },
    { id: 'verification', label: 'Verify Media', icon: ShieldCheck },
  ];

  return (
    <div className="flex h-screen bg-white text-slate-800 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-100 bg-white flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Lock className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-slate-900 font-sans">GuardPlay</h1>
            <p className="text-[10px] text-blue-500 uppercase tracking-widest font-mono font-bold">Media Security</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as ViewState)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                activeView === item.id 
                ? 'bg-blue-50 text-blue-600 shadow-sm' 
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeView === item.id ? 'text-blue-600' : 'text-slate-300 group-hover:text-slate-500'}`} />
              <span className="font-bold text-sm tracking-tight">{item.label}</span>
              {activeView === item.id && (
                <motion.div layoutId="activeNav" className="ml-auto">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                </motion.div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-slate-50">
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-slate-400 uppercase font-mono font-bold">System Status</span>
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
            </div>
            <p className="text-xs text-slate-600 font-bold">Chain Connected</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-slate-50/30">
        <header className="sticky top-0 z-10 backdrop-blur-xl border-b border-slate-100/60 px-8 py-5 flex items-center justify-between bg-white/60">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 capitalize">
            {activeView.replace('-', ' ')}
          </h2>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input 
                type="text" 
                placeholder="Search assets..." 
                className="bg-white border border-slate-200 rounded-2xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all w-64 shadow-sm placeholder:text-slate-300 font-medium"
              />
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-all shadow-sm">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <>
                  {activeView === 'overview' && (
                    <Overview assets={assets} alerts={alerts} onNavigate={setActiveView} />
                  )}
                  {activeView === 'registry' && (
                    <AssetRegistry assets={assets} onRefresh={fetchData} />
                  )}
                  {activeView === 'intelligence' && (
                    <ThreatIntelligence alerts={alerts} assets={assets} />
                  )}
                  {activeView === 'verification' && (
                    <VerificationTool />
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

