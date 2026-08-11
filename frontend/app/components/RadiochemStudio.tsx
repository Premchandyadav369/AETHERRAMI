'use client';

import React, { useState } from 'react';
import { Flame, ShieldCheck, Zap, Activity } from 'lucide-react';
import { useTab } from '../TabContext';

interface Radioligand {
  compoundName: string;
  radionuclide: string;
  chelatorType: string;
  chelatorStabilityLogK: string;
  tumorToBackground: string;
  absorbedDoseGyGbq: string;
}

const RADIOLIGANDS: Radioligand[] = [
  { compoundName: 'Lu-177-PSMA-617 (Targeted Beta Radiotherapy)', radionuclide: '177Lu (t1/2 = 6.64 days)', chelatorType: 'DOTA Chelator', chelatorStabilityLogK: 'log K = 24.2 (Ultra-stable)', tumorToBackground: '18.5x T/B Ratio at 24h', absorbedDoseGyGbq: '3.2 Gy/GBq Tumor Dose' },
  { compoundName: 'Ac-225-PSMA-I&T (Targeted Alpha Therapy)', radionuclide: '225Ac (t1/2 = 9.92 days)', chelatorType: 'MACROPA Chelator', chelatorStabilityLogK: 'log K = 22.8 (High Stability)', tumorToBackground: '24.0x T/B Ratio at 48h', absorbedDoseGyGbq: '14.8 Gy/GBq Tumor Dose' },
  { compoundName: 'Ga-68-FAPI-46 (PET Imaging Theranostic)', radionuclide: '68Ga (t1/2 = 67.7 mins)', chelatorType: 'NOTASA Chelator', chelatorStabilityLogK: 'log K = 26.5 (Optimal)', tumorToBackground: '32.1x SUVmax Contrast', absorbedDoseGyGbq: 'Diagnostic PET Scanner' },
];

export default function RadiochemStudio() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-[2rem] glass-panel-bioscript border border-rose-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-5 h-5 text-rose-400" />
            <h1 className="text-xl font-black tracking-wide text-white">Radiopharmaceutical & Theranostic Ligand Studio</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl font-mono">
            Designs target-directed radioligands for PET imaging (68Ga) and targeted alpha/beta radionuclide therapy (177Lu, 225Ac).
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-rose-950/80 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold">
          Theranostic AI Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        {RADIOLIGANDS.map((r, idx) => (
          <div key={idx} className="p-5 rounded-[1.75rem] glass-panel-bioscript border border-slate-800 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-white">{r.compoundName}</span>
              <span className="px-2 py-0.5 rounded-full text-[9px] bg-rose-950 text-rose-300 border border-rose-700/50">
                {r.radionuclide}
              </span>
            </div>

            <div className="space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Chelator Stability:</span>
                <span className="text-cyan-300 font-bold">{r.chelatorStabilityLogK}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tumor Contrast:</span>
                <span className="text-emerald-400 font-bold">{r.tumorToBackground}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Absorbed Dose:</span>
                <span className="text-amber-300">{r.absorbedDoseGyGbq}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
