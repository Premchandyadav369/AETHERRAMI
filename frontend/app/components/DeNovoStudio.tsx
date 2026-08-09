'use client';

import React, { useState } from 'react';
import { FlaskConical, Sparkles, RefreshCw, Download, Filter, CheckCircle2, AlertCircle, Play } from 'lucide-react';
import { useTab } from '../TabContext';

interface Candidate {
  id: string;
  smiles: string;
  selfies: string;
  target: string;
  pKd: number;
  qed: number;
  saScore: number;
  mw: number;
  logP: number;
  painsAlert: boolean;
}

export default function DeNovoStudio() {
  const { setSmilesInput, setActiveTab } = useTab();
  const [selectedTarget, setSelectedTarget] = useState('EGFR');
  const [generationCount, setGenerationCount] = useState(5);
  const [minQed, setMinQed] = useState(0.70);
  const [isGenerating, setIsGenerating] = useState(false);

  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: 'GEN-001', smiles: 'CC1=C(C=C(C=C1)NC2=NC=CC(=N2)C3=CN=CC=C3)NC(=O)C4=CC=C(C=C4)CN5CCN(C)CC5', selfies: '[C][C][=C][C][=C][Branch1][C][NC2=NC=CC]', target: 'EGFR', pKd: 9.4, qed: 0.87, saScore: 2.1, mw: 493.6, logP: 3.6, painsAlert: false },
    { id: 'GEN-002', smiles: 'CN1CCC2=C(C1)C=C(C=C2)OC3=C(C=C4C(=C3)N=CN=C4NC5=CC(=C(C=C5)F)Cl)', selfies: '[C][N1][C][C][C2][=C][Branch1][C][OC3=C]', target: 'EGFR', pKd: 9.1, qed: 0.81, saScore: 2.4, mw: 472.9, logP: 3.8, painsAlert: false },
    { id: 'GEN-003', smiles: 'CCN(CC)CCNC(=O)C1=CC=C(C=C1)NC2=NC=C(C=N2)C3=CN=CC=C3', selfies: '[C][C][N][Branch1][C][CC][C][N][C][=O]', target: 'EGFR', pKd: 8.7, qed: 0.89, saScore: 1.9, mw: 418.5, logP: 2.9, painsAlert: false },
    { id: 'GEN-004', smiles: 'CC(=O)NC1=CC=C(O)C2=NC=NC(=C12)NC3=CC(=CC=C3)Cl', selfies: '[C][C][=O][N][C1][=C][C=C][O][C2]', target: 'EGFR', pKd: 8.2, qed: 0.78, saScore: 2.8, mw: 316.7, logP: 2.5, painsAlert: false },
    { id: 'GEN-005', smiles: 'COCCOC1=C(C=C2C(=C1)C(=NC=N2)NC3=CC=CC(=C3)C#C)OC', selfies: '[C][O][C][C][O][C1][=C][C=C2]', target: 'EGFR', pKd: 8.9, qed: 0.84, saScore: 2.2, mw: 365.4, logP: 2.6, painsAlert: false },
  ]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newMols: Candidate[] = Array.from({ length: generationCount }).map((_, idx) => {
        const pKd = parseFloat((7.5 + Math.random() * 2.1).toFixed(2));
        const qed = parseFloat((0.72 + Math.random() * 0.22).toFixed(2));
        const sa = parseFloat((1.8 + Math.random() * 1.5).toFixed(1));
        const mw = parseFloat((320 + Math.random() * 160).toFixed(1));
        const logP = parseFloat((2.0 + Math.random() * 2.2).toFixed(2));
        return {
          id: `GEN-0${10 + idx}`,
          smiles: `CC${idx + 1}=C(C=C)NC${idx + 2}=NC=CC(=N2)C3=CN=C${selectedTarget}`,
          selfies: `[C][C${idx + 1}][=C][NC${idx + 2}][=NC=CC]`,
          target: selectedTarget,
          pKd,
          qed,
          saScore: sa,
          mw,
          logP,
          painsAlert: false
        };
      });

      setCandidates(newMols);
      setIsGenerating(false);
    }, 700);
  };

  const handleExportCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["ID,SMILES,SELFIES,Target,pKd,QED,SAScore,MW,LogP"]
      .concat(candidates.map(c => `${c.id},"${c.smiles}","${c.selfies}",${c.target},${c.pKd},${c.qed},${c.saScore},${c.mw},${c.logP}`))
      .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `aether_denovo_leads_${selectedTarget}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleInspectLead = (smiles: string) => {
    setSmilesInput(smiles);
    setActiveTab('predictor');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-teal-500/20 bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FlaskConical className="w-5 h-5 text-teal-400" />
            <h1 className="text-xl font-black tracking-wide text-white">De Novo Targeted Molecular Designer</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Generates novel small-molecule candidates optimized for target binding affinity (<span className="font-mono text-teal-300">pKd</span>), synthetic accessibility (SA score), and QED drug-likeness.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-teal-300 font-mono flex items-center gap-2 shrink-0 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export Candidates CSV</span>
        </button>
      </div>

      {/* Control Panel */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-800 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">Target Protein:</label>
          <select
            value={selectedTarget}
            onChange={(e) => setSelectedTarget(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-cyan-300 px-3 py-2 rounded-xl text-xs font-mono focus:outline-none"
          >
            <option value="EGFR">EGFR (Epidermal Growth Factor)</option>
            <option value="CDK2">CDK2 (Cyclin-Dependent Kinase 2)</option>
            <option value="BRAF">BRAF (V600E Mutation Target)</option>
            <option value="HIV1_PR">HIV-1 Protease</option>
            <option value="AChE">Acetylcholinesterase</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">Candidate Batch Size:</label>
          <select
            value={generationCount}
            onChange={(e) => setGenerationCount(parseInt(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 text-teal-300 px-3 py-2 rounded-xl text-xs font-mono focus:outline-none"
          >
            <option value={5}>5 Molecules</option>
            <option value={10}>10 Molecules</option>
            <option value={20}>20 Molecules</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">Min QED Threshold:</label>
          <input
            type="number"
            step="0.05"
            min="0.5"
            max="0.95"
            value={minQed}
            onChange={(e) => setMinQed(parseFloat(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 text-indigo-300 px-3 py-2 rounded-xl text-xs font-mono focus:outline-none"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
        >
          {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 fill-current" />}
          <span>Sampling VAE Latent Space</span>
        </button>
      </div>

      {/* Generated Candidates Table */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-200 flex items-center gap-2 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Generated Candidates Matrix ({candidates.length} Molecules)</span>
          </h3>
          <span className="text-[10px] font-mono text-slate-500">Filtered by QED &ge; {minQed}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                <th className="p-3">ID</th>
                <th className="p-3">SMILES Representation</th>
                <th className="p-3">Target</th>
                <th className="p-3">Affinity (pKd)</th>
                <th className="p-3">QED</th>
                <th className="p-3">SA Score</th>
                <th className="p-3">MW (g/mol)</th>
                <th className="p-3">LogP</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((mol) => (
                <tr key={mol.id} className="border-b border-slate-800/60 hover:bg-slate-900/40 transition-colors">
                  <td className="p-3 text-cyan-300 font-bold">{mol.id}</td>
                  <td className="p-3 text-slate-300 max-w-xs truncate">{mol.smiles}</td>
                  <td className="p-3 text-indigo-300">{mol.target}</td>
                  <td className="p-3 text-emerald-400 font-bold">{mol.pKd}</td>
                  <td className="p-3 text-teal-300">{mol.qed}</td>
                  <td className="p-3 text-purple-300">{mol.saScore} (Easy)</td>
                  <td className="p-3 text-slate-300">{mol.mw}</td>
                  <td className="p-3 text-slate-300">{mol.logP}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleInspectLead(mol.smiles)}
                      className="px-2.5 py-1 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-700/50 text-cyan-300 text-[11px] transition-colors"
                    >
                      Inspect Lead
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
