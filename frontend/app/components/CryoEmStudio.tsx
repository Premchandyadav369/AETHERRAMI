'use client';

import React, { useState } from 'react';
import { Microscope, Layers, Sparkles, Activity } from 'lucide-react';
import { useTab } from '../TabContext';

interface CryoEmDataset {
  pdbId: string;
  proteinName: string;
  fscResolution: string;
  mapModelCc: string;
  flexibilityScore: string;
}

const CRYOEM_DATASETS: CryoEmDataset[] = [
  { pdbId: '7KRN', proteinName: 'SARS-CoV-2 Spike Protein in Open Conformation', fscResolution: '2.40 Å Resolution (FSC=0.143)', mapModelCc: 'CCmask = 0.884 (Optimal Fit)', flexibilityScore: 'High Flex (NTD Domain b-factor: 85 Å²)' },
  { pdbId: '6V48', proteinName: 'Human GLP-1 Receptor Active G-Protein Complex', fscResolution: '2.85 Å Resolution (FSC=0.143)', mapModelCc: 'CCmask = 0.842 (Optimal Fit)', flexibilityScore: 'Moderate Flex (Transmembrane Helix 6)' },
  { pdbId: '8D16', proteinName: 'Human 80S Ribosome Translational Complex', fscResolution: '1.98 Å Atomic Resolution', mapModelCc: 'CCmask = 0.925 (Ultra-High Fit)', flexibilityScore: 'Low Flex (Rigid Core b-factor: 18 Å²)' },
];

export default function CryoEmStudio() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-[2rem] glass-panel-bioscript border border-cyan-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Microscope className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-black tracking-wide text-white">Cryo-EM 3D Density Map Fitting & Flexibility Simulator</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl font-mono">
            Simulates cryo-electron microscopy 3D map fitting, FSC resolution curves, and local residue b-factor flexibilities.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
          Cryo-EM AI Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        {CRYOEM_DATASETS.map((c, idx) => (
          <div key={idx} className="p-5 rounded-[1.75rem] glass-panel-bioscript border border-slate-800 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-white">{c.proteinName}</span>
              <span className="px-2 py-0.5 rounded-full text-[9px] bg-cyan-950 text-cyan-300 border border-cyan-700/50">
                PDB: {c.pdbId}
              </span>
            </div>

            <div className="space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">FSC Resolution:</span>
                <span className="text-emerald-400 font-bold">{c.fscResolution}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Map-Model Fit:</span>
                <span className="text-cyan-300 font-bold">{c.mapModelCc}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Residue Flex:</span>
                <span className="text-purple-300">{c.flexibilityScore}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
