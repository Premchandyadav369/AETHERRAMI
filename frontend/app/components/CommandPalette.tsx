'use client';

import React, { useState } from 'react';
import { Search, Zap, Microscope, Beaker, Network, Heart, Database, FlaskConical, BarChart3, Bot, Settings, Flame, Layers, ShieldCheck, FileText, Activity, Key, BookOpen, Users, Sparkles } from 'lucide-react';
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
    { id: '0a', title: 'Epigenetic Biological Age & Horvath DNA Methylation Clock', category: 'Epigenetics & Genomic Testing', tab: 'epigenetic', icon: Sparkles },
    { id: '0b', title: 'Whole-Genome Polygenic Risk Score (PRS) Snapshot', category: 'Epigenetics & Genomic Testing', tab: 'genomerisk', icon: Activity },
    { id: '1', title: 'Precision Binding Affinity & ADMET Predictor', category: 'Structural & Molecular AI', tab: 'predictor', icon: Zap },
    { id: '2', title: 'Scientific Methodology & Layman Explainer Guide', category: 'Evidence & AI Copilot', tab: 'methodology', icon: BookOpen },
    { id: '3', title: 'RCSB PDB 3D WebGL Structural Explorer', category: 'Structural & Molecular AI', tab: 'explorer', icon: Microscope },
    { id: '4', title: 'AlphaFold-3 & Cryo-EM Structure Intelligence', category: 'Structural & Molecular AI', tab: 'alphafold', icon: Microscope },
    { id: '5', title: 'Covalent Inhibitor & Electrophilic Warhead Designer', category: 'Structural & Molecular AI', tab: 'covalent', icon: Flame },
    { id: '6', title: 'PROTAC & Molecular Glue Degrader Studio', category: 'Structural & Molecular AI', tab: 'protac', icon: Layers },
    { id: '7', title: '3D Active Site Mutation Resistance Radar', category: 'Structural & Molecular AI', tab: 'mutation', icon: ShieldCheck },
    { id: '8', title: 'Virtual Drug Discovery Laboratory Suite', category: 'Virtual Drug Lab & Dynamics', tab: 'druglab', icon: Beaker },
    { id: '9', title: 'AI Aqueous Solubility & Excipient Optimizer', category: 'Virtual Drug Lab & Dynamics', tab: 'solubility', icon: Beaker },
    { id: '10', title: '14-Compartment Whole-Body PBPK Model', category: 'Virtual Drug Lab & Dynamics', tab: 'pbpk', icon: Heart },
    { id: '11', title: 'Digital Human Twin & Organ-on-a-Chip PK/PD', category: 'Virtual Drug Lab & Dynamics', tab: 'digitaltwin', icon: Heart },
    { id: '12', title: 'Antibody-Drug Conjugate (ADC) & Biologics Studio', category: 'Virtual Drug Lab & Dynamics', tab: 'adc', icon: Layers },
    { id: '13', title: 'Multi-Omics Target & Disease Intelligence', category: 'Translational & Clinical Hub', tab: 'multiomics', icon: Database },
    { id: '14', title: 'Clinical Biomarker & Companion Diagnostics (CDx)', category: 'Translational & Clinical Hub', tab: 'biomarker', icon: Activity },
    { id: '15', title: 'Real-Time Clinical Trial Patient Match Radar', category: 'Translational & Clinical Hub', tab: 'patientradar', icon: Users },
    { id: '16', title: 'De Novo Targeted Molecular Designer', category: 'Translational & Clinical Hub', tab: 'generator', icon: FlaskConical },
    { id: '17', title: 'Automated FDA IND/NDA eCTD Dossier Generator', category: 'Translational & Clinical Hub', tab: 'ectd', icon: FileText },
    { id: '18', title: 'n8n-Inspired Workflow Automation Studio', category: 'Automation & Governance', tab: 'workflow', icon: Network },
    { id: '19', title: 'Enterprise Role-Based Access Control (RBAC)', category: 'Automation & Governance', tab: 'rbac', icon: ShieldCheck },
    { id: '20', title: 'AI Microservices REST & GraphQL Gateway', category: 'Automation & Governance', tab: 'apigateway', icon: Network },
    { id: '21', title: 'Cryptographic Blockchain IP Priority Vault', category: 'Automation & Governance', tab: 'ipvault', icon: Key },
    { id: '22', title: 'Electronic Lab Notebook (ELN) & LIMS Inventory', category: 'Automation & Governance', tab: 'limseln', icon: Database },
    { id: '23', title: 'V10 Empirical Benchmark Evidence Browser', category: 'Evidence & AI Copilot', tab: 'results', icon: BarChart3 },
    { id: '24', title: 'AI Scientific Research Assistant', category: 'Evidence & AI Copilot', tab: 'assistant', icon: Bot },
    { id: '25', title: 'System Configuration & Controls', category: 'Evidence & AI Copilot', tab: 'settings', icon: Settings },
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
      <div className="w-full max-w-2xl glass-panel-bioscript border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center px-4 border-b border-slate-800 bg-slate-950/90">
          <Search className="w-4 h-4 text-amber-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across all 27 bioScript research stations..."
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
                  className="w-full p-3 rounded-xl hover:bg-amber-500/15 border border-transparent hover:border-amber-500/30 text-left transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-900 text-amber-400 group-hover:bg-amber-950 border border-slate-800">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-200 group-hover:text-amber-300 block">{item.title}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{item.category}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono group-hover:text-amber-400">Navigate &rarr;</span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
