import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ShieldCheck, 
  ShieldAlert, 
  Loader2, 
  Link as LinkIcon, 
  ArrowRight,
  Fingerprint,
  Cpu,
  Fingerprint as FingerprintIcon
} from 'lucide-react';

export default function VerificationTool() {
  const [url, setUrl] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setVerifying(true);
    setResult(null);

    // Simulated API call
    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await response.json();
      
      // Artificial delay for UX "scanning" feel
      setTimeout(() => {
        setResult(data);
        setVerifying(false);
      }, 1500);
    } catch (error) {
      console.error('Verification failed:', error);
      setVerifying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full shadow-sm">
          <FingerprintIcon className="w-4 h-4 text-blue-600" />
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Digital Watermark Scanner</span>
        </div>
        <h3 className="text-4xl font-bold tracking-tight text-slate-900">Verify Sports Media Content</h3>
        <p className="text-slate-500 max-w-xl mx-auto font-medium leading-relaxed">
          Paste a URL or upload a file to check for embedded blockchain-verified watermarks 
          and distribution permission headers.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-xl shadow-slate-200/50">
        <form onSubmit={handleVerify} className="space-y-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <LinkIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/watch?v=..."
              className="block w-full pl-14 pr-4 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-lg focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-400 text-slate-800 font-medium"
            />
            <button
              type="submit"
              disabled={verifying || !url}
              className="absolute inset-y-2.5 right-2.5 px-8 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20"
            >
              {verifying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  Verify Source
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-8">
              <label className="flex items-center gap-2 text-sm text-slate-500 font-bold cursor-pointer hover:text-slate-700 group transition-colors">
                <input type="checkbox" className="rounded-md border-slate-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                Deep Packet Inspection
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-500 font-bold cursor-pointer hover:text-slate-700 group transition-colors">
                <input type="checkbox" className="rounded-md border-slate-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                AI Visual Hashing
              </label>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">v2.4 Engine Active</span>
          </div>
        </form>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`rounded-3xl border p-10 shadow-lg ${
              result.verified 
              ? 'border-emerald-200 bg-emerald-50/50 shadow-emerald-200/20' 
              : 'border-rose-200 bg-rose-50/50 shadow-rose-200/20'
            }`}
          >
            <div className="flex gap-8">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm ${
                result.verified 
                ? 'bg-white border-emerald-200 text-emerald-600' 
                : 'bg-white border-rose-200 text-rose-600'
              }`}>
                {result.verified ? <ShieldCheck className="w-12 h-12" /> : <ShieldAlert className="w-12 h-12" />}
              </div>
              
              <div className="space-y-6 flex-1">
                <div>
                  <h4 className={`text-3xl font-bold ${result.verified ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {result.verified ? 'Source Verified: Legitimate' : 'Verification Failed'}
                  </h4>
                  <p className="text-slate-600 text-lg mt-2 font-medium">{result.reason || result.details}</p>
                </div>

                {!result.verified && (
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-widest">Detected Watermark</p>
                      <p className="text-base font-mono font-bold text-slate-800">{result.watermarkId || 'None Found'}</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-widest">Claimant Identity</p>
                      <p className="text-base font-bold text-slate-800">{result.owner || 'Unknown Entity'}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-2">
                  {result.verified ? (
                    <button className="px-8 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20">
                      View Certificate
                    </button>
                  ) : (
                    <>
                      <button className="px-8 py-3 bg-rose-600 text-white rounded-xl text-sm font-bold hover:bg-rose-500 transition-all shadow-lg shadow-rose-600/20">
                        Issue Takedown Notice
                      </button>
                      <button className="px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
                        Add to Watchlist
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-3 gap-6">
        {[
          { icon: Fingerprint, label: 'LWE Fingerprinting', status: 'Optimal' },
          { icon: Cpu, label: 'Polygon Proof-of-Stake', status: 'Standard' },
          { icon: Search, label: 'Sub-pixel Detection', status: 'Engaged' }
        ].map((feat) => (
          <div key={feat.label} className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center gap-4">
            <div className="p-2 bg-slate-50 rounded-lg">
              <feat.icon className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700">{feat.label}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{feat.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
