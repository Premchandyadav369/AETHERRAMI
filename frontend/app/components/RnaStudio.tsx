'use client';

import React, { useState } from 'react';
import { Network, Sparkles, Activity, ShieldCheck, Zap } from 'lucide-react';
import { useTab } from '../TabContext';

interface RnaTarget {
  rnaName: string;
  motifType: string;
  bindingAffinityKd: string;
  spliceModulationPct: string;
  ribosomalSelectivity: string;
}

const RNA_TARGETS: RnaTarget[] = [
  { rnaName: 'SMN2 Pre-mRNA Exon 7 Splice Site', motifType: 'Internal Asymmetric Loop', bindingAffinityKd: '12.4 nM', spliceModulationPct: '+88.5% Exon Inclusion', ribosomalSelectivity: '420x Selective vs 18S rRNA' },
  { rnaName: 'MYC mRNA 5-UTR G-Quadruplex', motifType: 'Parallel G-Quadruplex (G4)', bindingAffinityKd: '4.8 nM', spliceModulationPct: '-74.2% MYC Translation', ribosomalSelectivity: '850x Selective vs tRNAs' },
  { rnaName: 'miR-21 Oncogenic MicroRNA Precursor', motifType: 'Hairpin Terminal Loop', bindingAffinityKd: '35.0 nM', spliceModulationPct: '-62.0% Dicer Processing', ribosomalSelectivity: '210x Selective vs pre-miR-29' },
];

export default function RnaStudio() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-[2rem] glass-panel-bioscript border border-purple-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Network className="w-5 h-5 text-purple-400" />
            <h1 className="text-xl font-black tracking-wide text-white">RNA Targeted Small Molecule & Splice Modulator Studio</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl font-mono">
            Predicts small molecule binding affinity to tertiary RNA motifs (G-quadruplexes, hairpin loops) and exon splice inclusion rates.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold">
          RNA AI Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        {RNA_TARGETS.map((r, idx) => (
          <div key={idx} className="p-5 rounded-[1.75rem] glass-panel-bioscript border border-slate-800 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-white">{r.rnaName}</span>
              <span className="px-2 py-0.5 rounded-full text-[9px] bg-purple-950 text-purple-300 border border-purple-700/50">
                {r.motifType}
              </span>
            </div>

            <div className="space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">RNA Affinity (Kd):</span>
                <span className="text-cyan-300 font-bold">{r.bindingAffinityKd}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Splice Effect:</span>
                <span className="text-emerald-400 font-bold">{r.spliceModulationPct}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ribosomal Selectivity:</span>
                <span className="text-purple-300">{r.ribosomalSelectivity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
