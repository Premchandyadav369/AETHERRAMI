'use client';

import React, { useState } from 'react';
import { Microscope, Zap, ShieldAlert, Activity } from 'lucide-react';
import { useTab } from '../TabContext';

interface MutationImpact {
  mutation: string;
  wildTypeKd: string;
  mutantKd: string;
  foldResistance: string;
  resistanceMechanism: string;
}

const MUTATIONS: MutationImpact[] = [
  { mutation: 'EGFR T790M (Gatekeeper Mutation)', wildTypeKd: '1.2 nM', mutantKd: '142.0 nM', foldResistance: '118x Resistance', resistanceMechanism: 'Steric clash with threonine-to-methionine substitution in ATP binding pocket.' },
  { mutation: 'EGFR C797S (Covalent Resistance)', wildTypeKd: '0.8 nM', mutantKd: '850.0 nM', foldResistance: '1062x Resistance', resistanceMechanism: 'Loss of nucleophilic cysteine thiol required for acrylamide covalent bond formation.' },
  { mutation: 'BRAF V600E (Kinase Activation)', wildTypeKd: '45.0 nM', mutantKd: '3.1 nM', foldResistance: '14.5x Sensitizing', resistanceMechanism: 'Constitutive activation loop destabilization locking active DFG-in conformation.' },
];

export default function MutationHeatmapStudio() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-cyan-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Microscope className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-black tracking-wide text-white">3D Active Site Mutation & Drug Resistance Heatmap</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Predicts single-amino-acid point mutation resistance folds ($K_d$ shift) across kinase gatekeeper and covalent binding residues.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
          Mutation Radar Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        {MUTATIONS.map((m, idx) => (
          <div key={idx} className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-white">{m.mutation}</span>
              <span className="px-2 py-0.5 rounded text-[9px] bg-rose-950 text-rose-300 border border-rose-700/50">
                {m.foldResistance}
              </span>
            </div>

            <div className="space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">WT Affinity (Kd):</span>
                <span className="text-emerald-400">{m.wildTypeKd}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mutant Affinity (Kd):</span>
                <span className="text-rose-400 font-bold">{m.mutantKd}</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 border-t border-slate-900 pt-2 leading-relaxed">
              {m.resistanceMechanism}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
