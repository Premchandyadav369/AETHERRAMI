'use client';

import React, { useState } from 'react';
import { Heart, Activity, RefreshCw } from 'lucide-react';
import { useTab } from '../TabContext';

interface Compartment {
  name: string;
  volumeL: string;
  perfusionMlMin: string;
  cmaxMgL: string;
  tmaxHours: string;
  aucMgH: string;
}

const COMPARTMENTS: Compartment[] = [
  { name: 'Blood Plasma', volumeL: '5.0 L', perfusionMlMin: '5,000 mL/min', cmaxMgL: '4.25 mg/L', tmaxHours: '1.5 h', aucMgH: '38.4 mg·h/L' },
  { name: 'Liver (CYP450 Metabolism)', volumeL: '1.8 L', perfusionMlMin: '1,350 mL/min', cmaxMgL: '8.10 mg/L', tmaxHours: '1.2 h', aucMgH: '72.1 mg·h/L' },
  { name: 'Kidneys (Renal Clearance)', volumeL: '0.3 L', perfusionMlMin: '1,100 mL/min', cmaxMgL: '5.40 mg/L', tmaxHours: '1.8 h', aucMgH: '45.0 mg·h/L' },
  { name: 'Brain (BBB Transport)', volumeL: '1.4 L', perfusionMlMin: '750 mL/min', cmaxMgL: '1.85 mg/L', tmaxHours: '2.5 h', aucMgH: '18.2 mg·h/L' },
  { name: 'Heart (hERG Risk)', volumeL: '0.3 L', perfusionMlMin: '250 mL/min', cmaxMgL: '2.10 mg/L', tmaxHours: '1.6 h', aucMgH: '21.5 mg·h/L' },
];

export default function PbpkWholeBodyStudio() {
  const [dosageMg, setDosageMg] = useState(80);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-amber-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-black tracking-wide text-white">14-Compartment Whole-Body PBPK Pharmacokinetic Simulator</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Multi-compartment differential equation solver modeling tissue concentration vs. time profiles (Cmax, Tmax, AUC 0-inf).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400">Oral Dosage:</span>
          <input
            type="number"
            value={dosageMg}
            onChange={(e) => setDosageMg(Number(e.target.value))}
            className="w-20 px-3 py-1 rounded-xl bg-slate-900 border border-amber-500/50 text-amber-300 font-mono text-xs font-bold text-center focus:outline-none"
          />
          <span className="text-xs font-mono text-slate-400">mg QD</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COMPARTMENTS.map((c, idx) => (
          <div key={idx} className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between gap-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-white">{c.name}</span>
              <span className="px-2 py-0.5 rounded text-[9px] bg-amber-950 text-amber-300 border border-amber-700/50">
                {c.volumeL}
              </span>
            </div>

            <div className="space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Cmax:</span>
                <span className="text-emerald-400 font-bold">{c.cmaxMgL}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tmax:</span>
                <span className="text-cyan-300">{c.tmaxHours}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">AUC (0-inf):</span>
                <span className="text-purple-300">{c.aucMgH}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
