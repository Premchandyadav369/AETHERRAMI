'use client';

import React, { useState } from 'react';
import { Activity, Sparkles, Heart, ShieldAlert, ArrowRight, ArrowUp, RefreshCw, Zap } from 'lucide-react';
import { useTab } from '../TabContext';

export default function EpigeneticStudio() {
  const [chronologicalAge, setChronologicalAge] = useState(34);
  const [biologicalAge, setBiologicalAge] = useState(31);
  const [cpgMethylationScore, setCpgMethylationScore] = useState('94.2% Optimal');
  const [telomereLength, setTelomereLength] = useState('7.8 kb (85th Percentile)');

  const ageDiff = chronologicalAge - biologicalAge;

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-[2rem] glass-panel-bioscript bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-black tracking-wide text-white">Epigenetic Biological Age & DNA Methylation Clock</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl font-mono">
            Horvath & Hannum epigenetic clock telemetry estimating biological age delta based on CpG island hypermethylation.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          Horvath Clock Active
        </span>
      </div>

      {/* Main bioScript Showcase Visualizer Card */}
      <div className="relative p-8 md:p-12 rounded-[2.5rem] glass-panel-bioscript border border-amber-500/30 overflow-hidden bg-gradient-to-b from-[#0e111d] via-[#121526] to-[#070913] flex flex-col justify-between min-h-[460px]">
        {/* Background Glowing Ambient Orbs */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-amber-500/20 blur-[90px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] rounded-full bg-rose-500/15 blur-[80px] pointer-events-none" />

        {/* Floating Ring Visualizer (Biological Age Centerpiece) */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Visualizer Circle */}
          <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full border border-amber-500/30 bg-slate-950/60 backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_0_60px_rgba(245,158,11,0.25)] group transition-all">
            <div className="absolute inset-2 rounded-full border border-dashed border-amber-400/40 animate-[spin_40s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-rose-500/20 animate-[spin_25s_linear_infinite_reverse]" />

            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">
              Estimated Biological Age
            </span>
            <span className="text-6xl md:text-7xl font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
              {biologicalAge}
            </span>
            <span className="mt-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold shadow-[0_0_10px_rgba(245,158,11,0.3)]">
              {ageDiff} Years Younger
            </span>
          </div>

          {/* Right bioScript Feature Cards Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {/* Card 1: Upcoming Activities */}
            <div className="p-5 rounded-[1.75rem] glass-panel-bioscript border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between gap-3 group">
              <div>
                <span className="text-xs font-bold text-white block mb-1">Upcoming Activities</span>
                <span className="text-[10px] font-mono text-slate-400">4 events scheduled</span>
              </div>
              <div className="flex justify-end">
                <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Card 2: Your Insights (Gradient Rose/Amber Card) */}
            <div className="p-5 rounded-[1.75rem] glass-panel-warm border border-rose-500/40 hover:border-rose-400 transition-all flex flex-col justify-between gap-3 group">
              <div>
                <span className="text-xs font-black text-white block mb-1">Your Epigenetic Insights</span>
                <span className="text-[10px] font-mono text-slate-200 font-bold">8 Risk Biomarkers Analyzed</span>
              </div>
              <div className="flex justify-end">
                <div className="w-8 h-8 rounded-full bg-slate-950/80 border border-slate-700 flex items-center justify-center text-white group-hover:bg-rose-500 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Card 3: Health Snapshot */}
            <div className="p-5 rounded-[1.75rem] glass-panel-bioscript border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between gap-3 group">
              <div>
                <span className="text-xs font-bold text-white block mb-1">Your Health Snapshot</span>
                <span className="text-[10px] font-mono text-slate-400">CpG Methylation: {cpgMethylationScore}</span>
              </div>
              <div className="flex justify-end">
                <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                  <ArrowUp className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Card 4: Action Plan */}
            <div className="p-5 rounded-[1.75rem] glass-panel-rose border border-amber-500/40 hover:border-amber-400 transition-all flex flex-col justify-between gap-3 group">
              <div>
                <span className="text-xs font-black text-white block mb-1">Therapeutic Action Plan</span>
                <span className="text-[10px] font-mono text-slate-200 font-bold">Protocol Details Active</span>
              </div>
              <div className="flex justify-end">
                <div className="w-8 h-8 rounded-full bg-slate-950/80 border border-slate-700 flex items-center justify-center text-white group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
