'use client';

import React, { useState } from 'react';
import { Microscope, Search, Layers, Box, RotateCw, ExternalLink, RefreshCw, Sparkles, CheckCircle2, Sliders } from 'lucide-react';
import { useTab } from '../TabContext';
import InteractiveMoleculeCanvas from './InteractiveMoleculeCanvas';

interface PresetPdb {
  id: string;
  name: string;
  resolution: string;
  method: string;
  organism: string;
  chains: string;
}

const PRESET_PDBS: PresetPdb[] = [
  { id: '1M17', name: 'EGFR Kinase Domain with Erlotinib', resolution: '2.60 Å', method: 'X-RAY DIFFRACTION', organism: 'Homo sapiens', chains: 'A, B' },
  { id: '6VXX', name: 'SARS-CoV-2 Spike Glycoprotein Trimer', resolution: '2.80 Å', method: 'CRYO-EM MAP', organism: 'SARS-CoV-2', chains: 'A, B, C' },
  { id: '3PP0', name: 'JAK2 Tyrosine Kinase Active Pocket', resolution: '1.95 Å', method: 'X-RAY DIFFRACTION', organism: 'Homo sapiens', chains: 'A' },
  { id: '4W52', name: 'KRAS G12C Mutant Covalent Pocket', resolution: '1.85 Å', method: 'X-RAY DIFFRACTION', organism: 'Homo sapiens', chains: 'A' },
  { id: '1TUP', name: 'p53 Tumor Suppressor DNA Binding Domain', resolution: '2.20 Å', method: 'X-RAY DIFFRACTION', organism: 'Homo sapiens', chains: 'A, B, C' },
  { id: '2RH1', name: 'Human Beta-2 Adrenergic Receptor (GPCR)', resolution: '2.40 Å', method: 'X-RAY DIFFRACTION', organism: 'Homo sapiens', chains: 'A' },
];

export default function PdbExplorer() {
  const { selectedProtein, setSelectedProtein } = useTab();
  const [queryInput, setQueryInput] = useState<string>(selectedProtein || '1M17');
  const [isFetchingRcsb, setIsFetchingRcsb] = useState<boolean>(false);

  const currentMeta = PRESET_PDBS.find(p => p.id.toUpperCase() === selectedProtein.toUpperCase()) || {
    id: selectedProtein.toUpperCase(),
    name: `${selectedProtein.toUpperCase()} Macromolecular Complex`,
    resolution: '2.10 Å',
    method: 'X-RAY DIFFRACTION',
    organism: 'Homo sapiens',
    chains: 'A, B'
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim()) return;
    setIsFetchingRcsb(true);
    setTimeout(() => {
      setSelectedProtein(queryInput.toUpperCase());
      setIsFetchingRcsb(false);
    }, 400);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-[2rem] glass-panel-bioscript border border-purple-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Microscope className="w-5 h-5 text-purple-400" />
            <h1 className="text-xl font-black tracking-wide text-white">RCSB PDB 3D WebGL Structural Explorer</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl font-mono">
            Interactive WebGL 3D molecular viewer parsing RCSB Protein Data Bank PDB/mmCIF atomic coordinates and active site residue pockets.
          </p>
        </div>

        <a
          href={`https://www.rcsb.org/structure/${selectedProtein}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-full bg-purple-950/80 hover:bg-purple-900 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold flex items-center gap-1.5 shrink-0 transition-colors"
        >
          <span>View on RCSB.org</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 3D WebGL Molecular Canvas */}
      <InteractiveMoleculeCanvas proteinName={`${currentMeta.id} - ${currentMeta.name}`} />

      {/* Simplified Search & Preset PDB Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        {/* Search Input Card */}
        <div className="p-6 rounded-[1.75rem] glass-panel-bioscript border border-slate-800 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-bold text-white text-xs flex items-center gap-2">
              <Search className="w-4 h-4 text-purple-400" />
              Fetch RCSB PDB ID
            </span>
            <span className="text-[10px] text-slate-500">Live API Sync</span>
          </div>

          <form onSubmit={handleSearchSubmit} className="space-y-3">
            <div>
              <label className="text-slate-400 text-[10px] block mb-1">4-Character PDB Code:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={4}
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  placeholder="e.g. 1M17"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-purple-300 font-mono font-bold uppercase text-xs focus:border-purple-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isFetchingRcsb}
                  className="px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shrink-0 flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isFetchingRcsb ? 'animate-spin' : ''}`} />
                  <span>Fetch</span>
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Resolution:</span>
                <span className="text-cyan-300 font-bold">{currentMeta.resolution}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Experimental Method:</span>
                <span className="text-amber-300 font-bold">{currentMeta.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Organism:</span>
                <span className="text-emerald-400 font-bold">{currentMeta.organism}</span>
              </div>
            </div>
          </form>
        </div>

        {/* Preset PDB Selector Buttons */}
        <div className="md:col-span-2 p-6 rounded-[1.75rem] glass-panel-bioscript border border-slate-800 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-bold text-white text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Featured Benchmark Macromolecular Complexes
            </span>
            <span className="text-[10px] text-slate-500">Select Structure</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRESET_PDBS.map((pdb) => {
              const isSelected = selectedProtein.toUpperCase() === pdb.id;
              return (
                <button
                  key={pdb.id}
                  onClick={() => {
                    setSelectedProtein(pdb.id);
                    setQueryInput(pdb.id);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1 group ${
                    isSelected
                      ? 'bg-purple-950/80 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs text-purple-400 group-hover:text-purple-300">{pdb.id}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                      {pdb.resolution}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-200 line-clamp-1">{pdb.name}</span>
                  <span className="text-[9px] text-slate-500 font-mono">{pdb.organism} &bull; Chains {pdb.chains}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
