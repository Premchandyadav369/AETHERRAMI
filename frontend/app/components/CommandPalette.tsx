'use client';

import React, { useState } from 'react';
import { Search, Zap, Microscope, Beaker, Network, Heart, Database, FlaskConical, BarChart3, Bot, Settings, Flame, Layers } from 'lucide-react';
import { useTab, SectionTab } from '../TabContext';

interface PaletteItem {
  id: string;
  title: string;
  category: string;
  tab: SectionTab;
  icon: any;
}

export default function CommandPalette() {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, setActiveTab } = useTab();
  const [query, setQuery] = useState('');

  const items: PaletteItem[] = [
    { id: '1', title: 'Precision Binding Affinity & ADMET Predictor', category: 'Molecular Engineering', tab: 'predictor', icon: Zap },
    { id: '2', title: 'RCSB PDB 3D WebGL Structural Explorer', category: 'Structural Intelligence', tab: 'explorer', icon: Microscope },
    { id: '3', title: 'AlphaFold-3 & Cryo-EM Structure Intelligence', category: 'Structural Intelligence', tab: 'alphafold', icon: Microscope },
    { id: '4', title: 'Covalent Inhibitor & Electrophilic Warhead Designer', category: 'Covalent Chemistry', tab: 'covalent', icon: Flame },
    { id: '5', title: 'PROTAC & Molecular Glue Degrader Studio', category: 'Targeted Degradation', tab: 'protac', icon: Layers },
    { id: '6', title: 'Virtual Drug Discovery Laboratory Suite', category: 'Quantum Chemistry & MD', tab: 'druglab', icon: Beaker },
    { id: '7', title: 'n8n-Inspired Workflow Automation Studio', category: 'Pipeline Automation', tab: 'workflow', icon: Network },
    { id: '8', title: 'Digital Human Twin & Organ-on-a-Chip PK/PD', category: 'Pharmacokinetics', tab: 'digitaltwin', icon: Heart },
    { id: '9', title: 'Multi-Omics Target & Disease Intelligence', category: 'Target Discovery', tab: 'multiomics', icon: Database },
    { id: '10', title: 'De Novo Targeted Molecular Designer', category: 'Generative AI', tab: 'generator', icon: FlaskConical },
    { id: '11', title: 'V10 Empirical Benchmark Evidence Browser', category: 'Analytics & Evidence', tab: 'results', icon: BarChart3 },
    { id: '12', title: 'AI Scientific Research Assistant', category: 'AI Copilot', tab: 'assistant', icon: Bot },
    { id: '13', title: 'System Configuration & Controls', category: 'Management', tab: 'settings', icon: Settings },
  ];

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (tab: SectionTab) => {
    setActiveTab(tab);
    setIsCommandPaletteOpen(false);
    setQuery('');
  };

  if (!isCommandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-950/80 backdrop-blur-md p-4">
      <div className="w-full max-w-2xl glass-panel border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center px-4 border-b border-slate-800 bg-slate-950/90">
          <Search className="w-4 h-4 text-cyan-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a station name (e.g., AlphaFold, Covalent, PROTAC, Drug Lab, Workflow, PDB)..."
            className="w-full py-4 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-slate-500"
            autoFocus
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="text-xs text-slate-500 hover:text-slate-300 font-mono px-2 py-1 rounded bg-slate-900 border border-slate-800"
          >
            ESC
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 flex flex-col gap-1">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-slate-500">
              No matching research stations found.
            </div>
          ) : (
            filteredItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.tab)}
                  className="w-full p-3 rounded-xl hover:bg-cyan-500/15 border border-transparent hover:border-cyan-500/30 text-left transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-900 text-cyan-400 group-hover:bg-cyan-950 border border-slate-800">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-200 group-hover:text-cyan-300 block">{item.title}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{item.category}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono group-hover:text-cyan-400">Navigate &rarr;</span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
