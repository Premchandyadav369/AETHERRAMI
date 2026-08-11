'use client';

import React, { useState } from 'react';
import { Layers, ShieldCheck, Activity, RefreshCw } from 'lucide-react';
import { useTab } from '../TabContext';

interface ProtacEntry {
  name: string;
  targetProtein: string;
  e3Ligase: 'VHL' | 'CRBN' | 'MDM2';
  linkerType: string;
  dc50: string;
  dmaxPercent: string;
  ternaryKd: string;
}

const PROTAC_CATALOG: ProtacEntry[] = [
  { name: 'ARV-110 (Bavdegalutamide)', targetProtein: 'Androgen Receptor (AR)', e3Ligase: 'VHL', linkerType: 'PEG-Alkyme Flexible Linker (12 atoms)', dc50: '1.0 nM', dmaxPercent: '98%', ternaryKd: '14.2 nM' },
  { name: 'ARV-471 (Vepdegestrant)', targetProtein: 'Estrogen Receptor (ERα)', e3Ligase: 'VHL', linkerType: 'Rigid Piperazine-Alkyne Linker', dc50: '1.8 nM', dmaxPercent: '95%', ternaryKd: '22.0 nM' },
  { name: 'CC-92480 (Mezigdomide)', targetProtein: 'Ikaros / Aiolos (IKZF1/3)', e3Ligase: 'CRBN', linkerType: 'Molecular Glue Phenol-Glutarimide', dc50: '0.4 nM', dmaxPercent: '99%', ternaryKd: '5.1 nM' },
];

export default function ProtacStudio() {
  const [selectedProtac, setSelectedProtac] = useState<ProtacEntry>(PROTAC_CATALOG[0]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-indigo-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h1 className="text-xl font-black tracking-wide text-white">PROTAC & Molecular Glue Degrader Studio</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Targeted Protein Degradation (TPD) engine modeling ternary complex stability (E3 Ligase - Linker - Target).
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/40 text-xs font-mono font-bold">
          TPD Engine Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PROTAC_CATALOG.map((p, idx) => (
          <div key={idx} className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-white font-mono">{p.name}</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-700/50">
                  E3: {p.e3Ligase}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono block mb-3">{p.targetProtein}</span>

              <div className="space-y-2 text-xs font-mono text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Degradation DC50:</span>
                  <strong className="text-emerald-400">{p.dc50}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Max Degradation (Dmax):</span>
                  <strong className="text-cyan-300">{p.dmaxPercent}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Ternary Complex Kd:</span>
                  <strong className="text-purple-300">{p.ternaryKd}</strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
