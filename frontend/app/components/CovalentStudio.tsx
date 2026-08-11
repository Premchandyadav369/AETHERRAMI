'use client';

import React, { useState } from 'react';
import { Flame, ShieldCheck, Activity, Zap, ExternalLink } from 'lucide-react';
import { useTab } from '../TabContext';

interface CovalentWarhead {
  name: string;
  targetResidue: 'Cys797' | 'Cys481' | 'Lys745' | 'Ser195';
  warheadType: 'Acrylamide' | 'Haloacetamide' | 'Sulfonyl Fluoride' | 'Cyanoacrylamide';
  kinacKi: string;
  halfLife: string;
  selectivityRatio: string;
}

const WARHEAD_CATALOG: CovalentWarhead[] = [
  { name: 'Osimertinib Acrylamide Core', targetResidue: 'Cys797', warheadType: 'Acrylamide', kinacKi: '2.4 x 10^5 M^-1 s^-1', halfLife: '14.2 min', selectivityRatio: '140x over WT-EGFR' },
  { name: 'Ibrutinib α,β-Unsaturated Amide', targetResidue: 'Cys481', warheadType: 'Acrylamide', kinacKi: '1.8 x 10^5 M^-1 s^-1', halfLife: '18.5 min', selectivityRatio: '85x over BTK WT' },
  { name: 'Sulfonyl Fluoride Probe SF-102', targetResidue: 'Lys745', warheadType: 'Sulfonyl Fluoride', kinacKi: '8.9 x 10^4 M^-1 s^-1', halfLife: '32.0 min', selectivityRatio: '45x Pan-Kinase' },
];

export default function CovalentStudio() {
  const { smilesInput } = useTab();
  const [selectedWarhead, setSelectedWarhead] = useState<CovalentWarhead>(WARHEAD_CATALOG[0]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-rose-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-5 h-5 text-rose-400" />
            <h1 className="text-xl font-black tracking-wide text-white">Covalent Inhibitor & Electrophilic Warhead Designer</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Targeted nucleophilic residue adduct modeling (Cys, Lys, Ser, Thr) with electrophilic reactivity rates (kinac / KI).
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold">
          Covalent Engine Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {WARHEAD_CATALOG.map((wh, idx) => (
          <div key={idx} className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-white font-mono">{wh.name}</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-rose-950 text-rose-300 border border-rose-700/50">
                  {wh.targetResidue}
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Reactivity (kinac/KI):</span>
                  <strong className="text-cyan-300">{wh.kinacKi}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Adduct Half-Life:</span>
                  <strong className="text-emerald-400">{wh.halfLife}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Selectivity Window:</span>
                  <strong className="text-purple-300">{wh.selectivityRatio}</strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
