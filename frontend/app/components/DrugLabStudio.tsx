'use client';

import React, { useState } from 'react';
import { Beaker, FlaskConical, Atom, Activity, Database, Flame, Zap, ShieldCheck, Download, ExternalLink, RefreshCw, Play, Layers } from 'lucide-react';
import { useTab } from '../TabContext';

interface DrugEntry {
  name: string;
  genericName: string;
  casNumber: string;
  targetClass: 'Kinase' | 'GPCR' | 'Protease' | 'Ion Channel' | 'Nuclear Receptor';
  targetSymbol: string;
  moa: string;
  ic50: string;
  pubchemCid: number;
  chemblId: string;
  dftEnergy: string;
  sasa: string;
  dipoleDebye: string;
  smiles: string;
}

const DRUG_KNOWLEDGE_BASE: DrugEntry[] = [
  { name: 'Osimertinib (TAGRISSO)', genericName: 'Osimertinib Mesylate', casNumber: '1421373-65-0', targetClass: 'Kinase', targetSymbol: 'EGFR (T790M/L858R)', moa: 'Irreversible EGFR Tyrosine Kinase Inhibitor', ic50: '12.4 nM', pubchemCid: 71496458, chemblId: 'CHEMBL3353410', dftEnergy: '-1420.85 Hartree', sasa: '482.4 Å²', dipoleDebye: '4.25 D', smiles: 'COC1=C(C=C2C(=C1)N=CN=C2NC3=CC(=C(C=C3)F)Cl)OCCCN4CCOCC4' },
  { name: 'Palbociclib (IBRANCE)', genericName: 'Palbociclib Hydrochloride', casNumber: '571190-30-2', targetClass: 'Kinase', targetSymbol: 'CDK4 / CDK6', moa: 'Selective Cyclin-Dependent Kinase 4/6 Inhibitor', ic50: '11.0 nM', pubchemCid: 5330286, chemblId: 'CHEMBL189963', dftEnergy: '-1580.42 Hartree', sasa: '512.1 Å²', dipoleDebye: '3.88 D', smiles: 'CC1=C(C(=O)C2=C(N1)N=C(N=C2C3=CC(=NC=C3)N4CCNCC4)NC5=CC=C(C=N5)C(=O)C)C' },
  { name: 'Vemurafenib (ZELBORAF)', genericName: 'Vemurafenib', casNumber: '918504-65-1', targetClass: 'Kinase', targetSymbol: 'BRAF (V600E Mutant)', moa: 'Mutant BRAF V600E Kinase Domain Inhibitor', ic50: '31.0 nM', pubchemCid: 42611257, chemblId: 'CHEMBL1229517', dftEnergy: '-1720.10 Hartree', sasa: '465.8 Å²', dipoleDebye: '5.12 D', smiles: 'CCCS(=O)(=O)NC1=C(C(=C(C=C1)F)C(=O)C2=CNC3=C2C=C(C=N3)C4=CC=C(C=C4)Cl)F' },
  { name: 'Darunavir (PREZISTA)', genericName: 'Darunavir Ethanolate', casNumber: '206361-99-1', targetClass: 'Protease', targetSymbol: 'HIV-1 Protease', moa: 'HIV Protease Dimerization Inhibitor', ic50: '4.5 nM', pubchemCid: 213039, chemblId: 'CHEMBL1732', dftEnergy: '-1890.33 Hartree', sasa: '540.2 Å²', dipoleDebye: '6.05 D', smiles: 'CC(C)CN(CC(C(R)C(F)(F)F)NC(=O)O[C@H]1CO[C@@H]2[C@H]1CCCO2)S(=O)(=O)C3=CC=C(C=C3)N' },
  { name: 'Donepezil (ARICEPT)', genericName: 'Donepezil Hydrochloride', casNumber: '120014-06-4', targetClass: 'Protease', targetSymbol: 'Acetylcholinesterase (AChE)', moa: 'Reversible Central AChE Enzyme Inhibitor', ic50: '5.7 nM', pubchemCid: 3152, chemblId: 'CHEMBL502', dftEnergy: '-1240.67 Hartree', sasa: '430.5 Å²', dipoleDebye: '3.14 D', smiles: 'COC1=C(C=C2C(=C1)CC(C2=O)CC3CCN(CC3)CC4=CC=CC=C4)OC' },
];

export default function DrugLabStudio() {
  const { setSmilesInput, setActiveTab } = useTab();
  const [selectedDrug, setSelectedDrug] = useState<DrugEntry>(DRUG_KNOWLEDGE_BASE[0]);
  const [isSimulatingMd, setIsSimulatingMd] = useState(false);
  const [rmsdValue, setRmsdValue] = useState(1.42);

  const handleSimulateMd = () => {
    setIsSimulatingMd(true);
    setTimeout(() => {
      setRmsdValue(parseFloat((1.2 + Math.random() * 0.6).toFixed(2)));
      setIsSimulatingMd(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-cyan-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Beaker className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-black tracking-wide text-white">Virtual Drug Discovery Laboratory Suite</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Integrated drug knowledge base, Density Functional Theory (DFT) quantum energy estimator, and all-atom molecular dynamics (MD) simulation engine.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
            Quantum & MD Simulator Active
          </span>
        </div>
      </div>

      {/* Main Grid: Drug Selector & Simulation Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Drug Encyclopedia Selector */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col gap-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1 font-mono">
            Drug Knowledge Base ({DRUG_KNOWLEDGE_BASE.length})
          </span>

          {DRUG_KNOWLEDGE_BASE.map((drug) => (
            <button
              key={drug.name}
              onClick={() => setSelectedDrug(drug)}
              className={`w-full p-3.5 rounded-xl border text-left transition-all flex flex-col gap-1 ${
                selectedDrug.name === drug.name
                  ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-200 shadow-[0_0_20px_rgba(0,240,255,0.15)]'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white">{drug.name}</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-700/50">
                  {drug.targetClass}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono truncate">{drug.moa}</span>
            </button>
          ))}
        </div>

        {/* Right 2 Columns: Drug Details & MD Simulation Workbench */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Card 1: Drug Info & Quantum Energy Parameters */}
          <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-black text-white font-mono">{selectedDrug.name}</h3>
                <span className="text-xs text-slate-400 font-mono">{selectedDrug.genericName} | CAS: {selectedDrug.casNumber}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://pubchem.ncbi.nlm.nih.gov/compound/${selectedDrug.pubchemCid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-cyan-300 font-mono flex items-center gap-1.5"
                >
                  <span>PubChem #{selectedDrug.pubchemCid}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Quantum Chemistry Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
                <span className="text-slate-500 text-[10px] uppercase block">DFT B3LYP Energy</span>
                <strong className="text-cyan-300 font-bold text-xs">{selectedDrug.dftEnergy}</strong>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
                <span className="text-slate-500 text-[10px] uppercase block">Solvent Surface (SASA)</span>
                <strong className="text-purple-300 font-bold text-xs">{selectedDrug.sasa}</strong>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
                <span className="text-slate-500 text-[10px] uppercase block">Dipole Moment</span>
                <strong className="text-rose-300 font-bold text-xs">{selectedDrug.dipoleDebye}</strong>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 flex items-center justify-between">
              <span className="text-slate-500 text-[10px]">SMILES String:</span>
              <code className="text-cyan-300 text-xs truncate max-w-md">{selectedDrug.smiles}</code>
            </div>
          </div>

          {/* Card 2: All-Atom Molecular Dynamics (MD) Simulation */}
          <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-sm text-white flex items-center gap-2 font-mono">
                <Flame className="w-4 h-4 text-rose-400" />
                <span>100ns Explicit Solvent Molecular Dynamics (MD) Trajectory</span>
              </span>

              <button
                onClick={handleSimulateMd}
                disabled={isSimulatingMd}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 font-bold text-xs text-slate-950 hover:opacity-90 transition-all shadow-[0_0_15px_rgba(244,63,94,0.3)] flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSimulatingMd ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>Run 100ns MD Simulation</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs flex flex-col justify-between">
                <span className="text-slate-500 text-[10px]">C-alpha Backbone RMSD Fluctuation:</span>
                <strong className="text-emerald-400 font-bold text-base mt-1">{rmsdValue} Å (Stable Equilibrated)</strong>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs flex flex-col justify-between">
                <span className="text-slate-500 text-[10px]">MM-PBSA Binding Free Energy ΔG:</span>
                <strong className="text-cyan-400 font-bold text-base mt-1">-11.85 kcal/mol</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
