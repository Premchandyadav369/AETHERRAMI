'use client';

import React, { useState } from 'react';
import { Beaker, FlaskConical, ShieldCheck } from 'lucide-react';
import { useTab } from '../TabContext';

interface Formulation {
  excipient: string;
  solubilityMgMl: string;
  bioavailabilityIncrease: string;
  stabilityMonths: string;
  recommendation: 'Optimal' | 'Compatible';
}

const FORMULATIONS: Formulation[] = [
  { excipient: 'PEG-400 / Cosolvent System (40:60)', solubilityMgMl: '14.8 mg/mL (120x baseline)', bioavailabilityIncrease: '+42% F% Increase', stabilityMonths: '24 Months at 25°C', recommendation: 'Optimal' },
  { excipient: 'HP-β-Cyclodextrin Inclusion Complex', solubilityMgMl: '28.5 mg/mL (230x baseline)', bioavailabilityIncrease: '+65% F% Increase', stabilityMonths: '36 Months at 25°C', recommendation: 'Optimal' },
  { excipient: 'Self-Emulsifying Lipid (SEDDS Nanoemulsion)', solubilityMgMl: '45.0 mg/mL (360x baseline)', bioavailabilityIncrease: '+82% F% Increase', stabilityMonths: '18 Months at 4°C', recommendation: 'Compatible' },
];

export default function SolubilityStudio() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-emerald-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Beaker className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-black tracking-wide text-white">AI Aqueous Solubility & Excipient Formulation Optimizer</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Recommends lipid carriers, cosolvents, and cyclodextrin complexes to boost oral bioavailability ($F\%$) for Lipinski Class II/IV compounds.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
          Formulation AI Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        {FORMULATIONS.map((f, idx) => (
          <div key={idx} className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-white">{f.excipient}</span>
              <span className="px-2 py-0.5 rounded text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                {f.recommendation}
              </span>
            </div>

            <div className="space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Solubility:</span>
                <span className="text-cyan-300 font-bold">{f.solubilityMgMl}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Bioavailability (F%):</span>
                <span className="text-emerald-400 font-bold">{f.bioavailabilityIncrease}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Shelf Stability:</span>
                <span className="text-purple-300">{f.stabilityMonths}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
