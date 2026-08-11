'use client';

import React, { useState } from 'react';
import { Sparkles, Activity, Clock, ShieldCheck, RefreshCw, Zap, Sliders } from 'lucide-react';
import { useTab } from '../TabContext';

export default function EpigeneticStudio() {
  const [chronologicalAge, setChronologicalAge] = useState<number>(42);
  const [methylationDensity, setMethylationDensity] = useState<number>(68); // 68% CpG methylation
  const [paceOfAging, setPaceOfAging] = useState<number>(0.84); // DunedinPACE

  const biologicalAge = +(chronologicalAge * (methylationDensity / 80) * paceOfAging).toFixed(1);
  const ageDelta = +(chronologicalAge - biologicalAge).toFixed(1);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-[2rem] glass-panel-bioscript border border-amber-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-black tracking-wide text-white">Epigenetic Biological Age & Horvath DNA Clock</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl font-mono">
            Interactive DNA methylation (CpG island) Horvath clock calculating cellular biological age delta and DunedinPACE aging rate.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
          Live Epigenetic Telemetry
        </span>
      </div>

      {/* Interactive Controls & Visualizer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        {/* Interactive Sliders Card */}
        <div className="p-6 rounded-[1.75rem] glass-panel-bioscript border border-slate-800 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-bold text-white text-xs flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              Patient Biomarker Inputs
            </span>
            <span className="text-[10px] text-slate-500">Horvath v2</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-slate-300 text-[11px] mb-1.5">
                <span>Chronological Age:</span>
                <span className="text-amber-400 font-bold">{chronologicalAge} Years</span>
              </div>
              <input
                type="range"
                min="18"
                max="90"
                value={chronologicalAge}
                onChange={(e) => setChronologicalAge(+e.target.value)}
                className="w-full accent-amber-400 bg-slate-900"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 text-[11px] mb-1.5">
                <span>CpG Island Methylation Density:</span>
                <span className="text-cyan-400 font-bold">{methylationDensity}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="95"
                value={methylationDensity}
                onChange={(e) => setMethylationDensity(+e.target.value)}
                className="w-full accent-cyan-400 bg-slate-900"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 text-[11px] mb-1.5">
                <span>DunedinPACE Pace of Aging:</span>
                <span className="text-emerald-400 font-bold">{paceOfAging}x / Year</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.05"
                value={paceOfAging}
                onChange={(e) => setPaceOfAging(+e.target.value)}
                className="w-full accent-emerald-400 bg-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Live Epigenetic Particle Ring Display */}
        <div className="md:col-span-2 p-6 rounded-[1.75rem] glass-panel-bioscript border border-slate-800 flex flex-col justify-between items-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/20">
          <div className="w-full flex items-center justify-between z-10 border-b border-slate-800 pb-3">
            <span className="font-bold text-white text-xs">Horvath Epigenetic Clock Telemetry</span>
            <span className="text-emerald-400 font-bold text-xs">{ageDelta >= 0 ? `+${ageDelta} Yrs Younger` : `${Math.abs(ageDelta)} Yrs Accelerated`}</span>
          </div>

          {/* Particle Ring Visualizer */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border-4 stroke-cyan-400 border-amber-500/30 animate-spin-slow flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.25)]">
              <div className="w-36 h-36 rounded-full border-2 border-dashed border-cyan-400/50 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-3xl font-black text-white tracking-tight block">{biologicalAge}</span>
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Bio-Age Yrs</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-3 gap-3 font-mono text-[10px] text-center z-10">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-slate-500 block">Chronological</span>
              <span className="text-white font-bold text-sm">{chronologicalAge} Yrs</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/40">
              <span className="text-slate-500 block">Biological</span>
              <span className="text-amber-400 font-bold text-sm">{biologicalAge} Yrs</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/40">
              <span className="text-slate-500 block">Epigenetic Reversal</span>
              <span className="text-emerald-400 font-bold text-sm">{ageDelta} Yrs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
