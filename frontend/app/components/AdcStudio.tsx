'use client';

import React, { useState } from 'react';
import { Layers, ShieldCheck, Activity } from 'lucide-react';
import { useTab } from '../TabContext';

interface AdcEntry {
  name: string;
  mAbTarget: string;
  payloadType: string;
  dar: number;
  linkerType: string;
  ic50: string;
}

const ADCS: AdcEntry[] = [
  { name: 'Trastuzumab Deruxtecan (ENHERTU)', mAbTarget: 'HER2 / ERBB2', payloadType: 'Topoisomerase I Inhibitor (DXd)', dar: 7.8, linkerType: 'Tetrapeptide Cleavable Linker', ic50: '1.2 nM' },
  { name: 'Brentuximab Vedotin (ADCETRIS)', mAbTarget: 'CD30', payloadType: 'MMAE (Microtubule Disruptor)', dar: 4.0, linkerType: 'Cathepsin-B Cleavable Val-Cit Linker', ic50: '0.8 nM' },
  { name: 'Sacituzumab Govitecan (TRODELVY)', mAbTarget: 'Trop-2', payloadType: 'SN-38 (Irinotecan Active Metabolite)', dar: 7.6, linkerType: 'Hydrolyzable CL2A Linker', ic50: '2.4 nM' },
];

export default function AdcStudio() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-indigo-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h1 className="text-xl font-black tracking-wide text-white">Antibody-Drug Conjugate (ADC) & Biologics Studio</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Monoclonal antibody (mAb) engineering engine modeling Drug-to-Antibody Ratio (DAR), cleavable linkers, and MMAE/DXd cytotoxic payloads.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/40 text-xs font-mono font-bold">
          ADC Engine Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ADCS.map((a, idx) => (
          <div key={idx} className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between gap-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-white font-mono">{a.name}</span>
              <span className="px-2 py-0.5 rounded text-[9px] bg-indigo-950 text-indigo-300 border border-indigo-700/50">
                DAR: {a.dar}
              </span>
            </div>

            <div className="space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">mAb Target:</span>
                <span className="text-cyan-300">{a.mAbTarget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cytotoxic Payload:</span>
                <span className="text-rose-300">{a.payloadType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Potency IC50:</span>
                <span className="text-emerald-400 font-bold">{a.ic50}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
