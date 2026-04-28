import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  ExternalLink, 
  Copy, 
  ShieldCheck, 
  RefreshCcw,
  Search,
  Filter,
  MoreVertical,
  Check
} from 'lucide-react';
import { Asset } from '../types';

interface ActionButtonProps {
  icon: any;
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

function ActionButton({ icon: Icon, label, onClick, variant = 'secondary' }: ActionButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
        variant === 'primary' 
        ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20' 
        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-sm'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}

export default function AssetRegistry({ assets, onRefresh }: { assets: Asset[], onRefresh: () => void }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900">Content Registry</h3>
          <p className="text-slate-500 text-sm mt-1 font-medium">Verified sports media assets recorded on the blockchain ledger.</p>
        </div>
        <div className="flex items-center gap-3">
          <ActionButton icon={RefreshCcw} label="Sync Chain" onClick={onRefresh} />
          <ActionButton icon={Plus} label="Register Asset" variant="primary" />
        </div>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search ledger..." 
                className="bg-white border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-slate-800 text-sm font-bold transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            Blocks: 14,292,102 • Gas: 42 Gwei
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                <th className="px-6 py-4 font-bold">Registered Asset</th>
                <th className="px-6 py-4 font-bold">Asset Hash (Polygon)</th>
                <th className="px-6 py-4 font-bold">Watermark ID</th>
                <th className="px-6 py-4 font-bold">Ownership</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {assets.map((asset) => (
                <tr key={asset.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-200 shadow-sm">
                        {asset.type === 'Video' ? <ShieldCheck className="w-5 h-5 text-blue-500" /> : <RefreshCcw className="w-5 h-5 text-emerald-500" />}
                      </div>
                      <div>
                        <p className="font-bold text-sm leading-tight mb-1 text-slate-800">{asset.title}</p>
                        <p className="text-[10px] font-mono text-slate-400 font-bold uppercase">{asset.type} • ID: {asset.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <button 
                      onClick={() => copyToClipboard(asset.blockchainHash, asset.id)}
                      className="flex items-center gap-2 group/hash"
                    >
                      <span className="font-mono text-xs text-slate-500 font-medium group-hover/hash:text-blue-600 transition-colors">
                        {asset.blockchainHash.substring(0, 8)}...{asset.blockchainHash.substring(asset.blockchainHash.length - 8)}
                      </span>
                      {copiedId === asset.id ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3 text-slate-300 group-hover/hash:text-slate-500 transition-opacity opacity-0 group-hover/hash:opacity-100" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[10px] font-mono font-bold text-slate-600">
                      {asset.watermarkId}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-slate-700">{asset.owner}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                      asset.status === 'Protected' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                      : 'bg-blue-50 text-blue-700 border-blue-100'
                    }`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
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
