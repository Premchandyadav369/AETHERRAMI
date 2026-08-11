'use client';

import React, { useState } from 'react';
import { Microscope, Layers, Activity, Search, ShieldCheck, Download, ExternalLink, RefreshCw } from 'lucide-react';
import { useTab } from '../TabContext';

interface AfEntry {
  uniprotId: string;
  geneSymbol: string;
  proteinName: string;
  meanPlddt: number;
  paeMax: string;
  disorderedPercent: string;
  structuralClass: string;
}

const AF3_CATALOG: AfEntry[] = [
  { uniprotId: 'P00533', geneSymbol: 'EGFR', proteinName: 'Epidermal Growth Factor Receptor', meanPlddt: 92.4, paeMax: '1.2 Å', disorderedPercent: '4.2%', structuralClass: 'Receptor Tyrosine Kinase' },
  { uniprotId: 'P24941', geneSymbol: 'CDK2', proteinName: 'Cyclin-Dependent Kinase 2', meanPlddt: 95.1, paeMax: '0.8 Å', disorderedPercent: '1.8%', structuralClass: 'Serine/Threonine Kinase' },
  { uniprotId: 'P15056', geneSymbol: 'BRAF', proteinName: 'Serine/threonine-protein kinase B-Raf', meanPlddt: 88.7, paeMax: '2.1 Å', disorderedPercent: '8.5%', structuralClass: 'Raf Kinase Family' },
  { uniprotId: 'P04626', geneSymbol: 'ERBB2', proteinName: 'Receptor tyrosine-protein kinase erbB-2 (HER2)', meanPlddt: 91.8, paeMax: '1.4 Å', disorderedPercent: '5.1%', structuralClass: 'Receptor Tyrosine Kinase' },
];

export default function AlphaFoldStudio() {
  const { setSelectedProtein, setActiveTab } = useTab();
  const [selectedEntry, setSelectedEntry] = useState<AfEntry>(AF3_CATALOG[0]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-cyan-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Microscope className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-black tracking-wide text-white">AlphaFold-3 & Cryo-EM Structure Intelligence Engine</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Per-residue pLDDT structural confidence scoring, Predicted Aligned Error (PAE) matrices, and intrinsically disordered region (IDR) profiling.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
            AlphaFold-3 DB Active
          </span>
        </div>
      </div>

      {/* Grid Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Target Selector */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col gap-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1 font-mono">
            AlphaFold-3 Predictions ({AF3_CATALOG.length})
          </span>

          {AF3_CATALOG.map(entry => (
            <button
              key={entry.uniprotId}
              onClick={() => setSelectedEntry(entry)}
              className={`w-full p-3.5 rounded-xl border text-left transition-all flex flex-col gap-1 ${
                selectedEntry.uniprotId === entry.uniprotId
                  ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-200 shadow-[0_0_20px_rgba(0,240,255,0.15)]'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white">{entry.geneSymbol}</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                  pLDDT: {entry.meanPlddt}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono truncate">{entry.proteinName}</span>
            </button>
          ))}
        </div>

        {/* Right 2 Columns: Structural Telemetry */}
        <div className="lg:col-span-2 p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <h3 className="text-lg font-black text-white font-mono">{selectedEntry.geneSymbol}</h3>
                <span className="text-xs text-slate-400 font-mono">{selectedEntry.proteinName} (UniProt: {selectedEntry.uniprotId})</span>
              </div>

              <a
                href={`https://alphafold.ebi.ac.uk/entry/${selectedEntry.uniprotId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-cyan-300 font-mono flex items-center gap-1.5"
              >
                <span>AlphaFold EBI Card</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">MEAN PLDDT SCORE</span>
                <strong className="text-emerald-400 font-bold text-base font-mono">{selectedEntry.meanPlddt} / 100 (Very High)</strong>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">PAE ERROR MATRIX MAX</span>
                <strong className="text-cyan-300 font-bold text-base font-mono">{selectedEntry.paeMax}</strong>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">DISORDERED REGIONS (IDR)</span>
                <strong className="text-purple-300 font-bold text-base font-mono">{selectedEntry.disorderedPercent}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
