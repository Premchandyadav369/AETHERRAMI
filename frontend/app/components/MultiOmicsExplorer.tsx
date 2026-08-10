'use client';

import React, { useState } from 'react';
import { Network, Database, Dna, Activity, Search, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';
import { useTab } from '../TabContext';

interface TargetGene {
  symbol: string;
  name: string;
  uniprotId: string;
  disease: string;
  chemblId: string;
  pdbIds: string[];
  expressionLevel: string;
  tractability: string;
  approvedDrugs: string[];
}

const ONCOLOGY_TARGETS: TargetGene[] = [
  { symbol: 'EGFR', name: 'Epidermal Growth Factor Receptor', uniprotId: 'P00533', disease: 'Non-Small Cell Lung Cancer (NSCLC), Glioblastoma', chemblId: 'CHEMBL203', pdbIds: ['1M17', '2ITN', '3W2S'], expressionLevel: 'High (Tumor Overexpressed)', tractability: 'Small Molecule & Antibody Passed', approvedDrugs: ['Gefitinib', 'Erlotinib', 'Osimertinib'] },
  { symbol: 'CDK2', name: 'Cyclin-Dependent Kinase 2', uniprotId: 'P24941', disease: 'Breast Cancer, Ovarian Cancer', chemblId: 'CHEMBL301', pdbIds: ['1HCK', '1FIN', '2R64'], expressionLevel: 'Moderate to High', tractability: 'Small Molecule Inhibitor', approvedDrugs: ['Palbociclib', 'Ribociclib', 'Abemaciclib'] },
  { symbol: 'BRAF', name: 'Serine/threonine-protein kinase B-Raf', uniprotId: 'P15056', disease: 'Melanoma, Colorectal Cancer (V600E Mutation)', chemblId: 'CHEMBL5145', pdbIds: ['1J7T', '3FU2', '4MBJ'], expressionLevel: 'Mutant Activated', tractability: 'Kinase Inhibitor', approvedDrugs: ['Vemurafenib', 'Dabrafenib', 'Encorafenib'] },
  { symbol: 'HER2 (ERBB2)', name: 'Receptor tyrosine-protein kinase erbB-2', uniprotId: 'P04626', disease: 'HER2+ Breast Cancer, Gastric Cancer', chemblId: 'CHEMBL1824', pdbIds: ['3PP0', '1N8Z'], expressionLevel: 'Overexpressed', tractability: 'Kinase & ADC Target', approvedDrugs: ['Lapatinib', 'Neratinib', 'Tucatinib'] },
  { symbol: 'KRAS', name: 'GTPase KRas (G12D / G12C Mutations)', uniprotId: 'P01116', disease: 'Pancreatic Adenocarcinoma, NSCLC', chemblId: 'CHEMBL2185', pdbIds: ['6V51', '4OBE'], expressionLevel: 'High Mutation Frequency', tractability: 'Covalent Pocket Inhibitor', approvedDrugs: ['Sotorasib', 'Adagrasib'] },
  { symbol: 'AChE', name: 'Acetylcholinesterase', uniprotId: 'P22303', disease: 'Alzheimer\'s Disease, Neurodegeneration', chemblId: 'CHEMBL220', pdbIds: ['1ANR', '4EY7', '1EVE'], expressionLevel: 'Central Nervous System', tractability: 'Reversible Inhibitor', approvedDrugs: ['Donepezil', 'Rivastigmine', 'Galantamine'] },
];

export default function MultiOmicsExplorer() {
  const { setSelectedProtein, setActiveTab } = useTab();
  const [searchTarget, setSearchTarget] = useState('');
  const [selectedGene, setSelectedGene] = useState<TargetGene>(ONCOLOGY_TARGETS[0]);

  const filteredTargets = ONCOLOGY_TARGETS.filter(t => 
    t.symbol.toLowerCase().includes(searchTarget.toLowerCase()) || 
    t.disease.toLowerCase().includes(searchTarget.toLowerCase())
  );

  const handleInspectPdb = (pdbId: string) => {
    setSelectedProtein(pdbId);
    setActiveTab('explorer');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-purple-500/20 bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Network className="w-5 h-5 text-purple-400" />
            <h1 className="text-xl font-black tracking-wide text-white">Multi-Omics Target & Disease Intelligence</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Maps human disease targets to UniProt accessions, ChEMBL bioactivity records, structural PDB entries, and approved therapeutic inhibitors.
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTarget}
            onChange={(e) => setSearchTarget(e.target.value)}
            placeholder="Search gene symbol or disease..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-purple-300 font-mono text-xs focus:outline-none focus:border-purple-500/60"
          />
        </div>
      </div>

      {/* Target Grid & Details Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Target Selector Cards */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col gap-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Target Catalog ({filteredTargets.length})
          </span>

          {filteredTargets.map((gene) => (
            <button
              key={gene.symbol}
              onClick={() => setSelectedGene(gene)}
              className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between group ${
                selectedGene.symbol === gene.symbol
                  ? 'bg-purple-500/15 border-purple-500/40 text-purple-300 shadow-[0_0_15px_rgba(139,92,246,0.15)]'
                  : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div>
                <span className="font-bold text-xs flex items-center gap-2">
                  <Dna className="w-3.5 h-3.5 text-purple-400" />
                  <span>{gene.symbol}</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono block truncate max-w-[180px]">{gene.name}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
            </button>
          ))}
        </div>

        {/* Right 2 Columns: Detailed Gene Inspector */}
        <div className="lg:col-span-2 p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-white font-mono">{selectedGene.symbol}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-700/50">
                    UniProt: {selectedGene.uniprotId}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-mono block mt-1">{selectedGene.name}</span>
              </div>

              <a
                href={`https://www.ebi.ac.uk/chembl/target_report_card/${selectedGene.chemblId}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-purple-300 font-mono flex items-center gap-1.5"
              >
                <span>ChEMBL Card</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">ASSOCIATED DISEASE INDICATIONS</span>
                <strong className="text-xs text-slate-200 font-mono">{selectedGene.disease}</strong>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">TRACTABILITY ASSESSMENT</span>
                <strong className="text-xs text-emerald-400 font-mono">{selectedGene.tractability}</strong>
              </div>
            </div>

            {/* Approved Inhibitors */}
            <div className="mb-6">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2 font-mono">
                FDA Approved Inhibitors ({selectedGene.approvedDrugs.length})
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedGene.approvedDrugs.map((drug, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-indigo-950/60 border border-indigo-500/40 text-indigo-300 text-xs font-mono font-bold">
                    {drug}
                  </span>
                ))}
              </div>
            </div>

            {/* Associated PDB Structures */}
            <div>
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2 font-mono">
                Verified 3D Structural PDB Entries
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedGene.pdbIds.map((pdb) => (
                  <button
                    key={pdb}
                    onClick={() => handleInspectPdb(pdb)}
                    className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-700/50 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Inspect 3D {pdb}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
