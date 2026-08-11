'use client';

import React, { useState } from 'react';
import { FileText, Download, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';
import { useTab } from '../TabContext';

interface EctdModule {
  code: string;
  title: string;
  status: 'Complete' | 'In Review' | 'Draft';
  fileSize: string;
  lastUpdated: string;
}

const ECTD_MODULES: EctdModule[] = [
  { code: 'Module 2.4', title: 'Non-Clinical Overview & Pharmacokinetics Summary', status: 'Complete', fileSize: '14.2 MB', lastUpdated: '2026-08-11' },
  { code: 'Module 2.6', title: 'Non-Clinical Written and Tabulated Summaries (ADMET)', status: 'Complete', fileSize: '28.5 MB', lastUpdated: '2026-08-11' },
  { code: 'Module 4.2.1', title: 'Primary Pharmacodynamics & Target Binding Studies', status: 'Complete', fileSize: '42.0 MB', lastUpdated: '2026-08-10' },
  { code: 'Module 4.2.2', title: 'Pharmacokinetics & Safety Margin Telemetry (hERG, CYP450)', status: 'Complete', fileSize: '18.9 MB', lastUpdated: '2026-08-09' },
];

export default function EctdDossierStudio() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportAll = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 1500);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-emerald-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-black tracking-wide text-white">Automated FDA IND / NDA eCTD Dossier Generator</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Compiles target binding, ADMET safety margins, and 100ns MD equilibrium metrics into official FDA electronic Common Technical Document (eCTD) packages.
          </p>
        </div>

        <button
          onClick={handleExportAll}
          disabled={isExporting}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 font-bold text-xs text-slate-950 hover:opacity-90 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-2"
        >
          {isExporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          <span>Export Full eCTD Package (XML/PDF)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ECTD_MODULES.map((m, idx) => (
          <div key={idx} className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-cyan-300 font-mono">{m.code}</span>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-700/50 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{m.status}</span>
              </span>
            </div>

            <h4 className="font-bold text-xs text-white">{m.title}</h4>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-2">
              <span>Size: {m.fileSize}</span>
              <span>Updated: {m.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
