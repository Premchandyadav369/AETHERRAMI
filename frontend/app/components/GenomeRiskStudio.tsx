'use client';

import React, { useState } from 'react';
import { Activity, ShieldAlert, Heart, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTab } from '../TabContext';

interface GeneticTrait {
  category: string;
  traitName: string;
  rsId: string;
  genotype: string;
  riskScore: string;
  impactLevel: 'Elevated' | 'Low Risk' | 'Optimal';
}

const TRAITS: GeneticTrait[] = [
  { category: 'Pharmacogenomics', traitName: 'CYP2D6 Drug Clearance Rate', rsId: 'rs1065852', genotype: 'C/T (Intermediate Metabolizer)', riskScore: '1.42x Normal', impactLevel: 'Elevated' },
  { category: 'Oncology Risk', traitName: 'EGFR T790M Gatekeeper Sensitivity', rsId: 'rs121434568', genotype: 'C/C (Wild-Type Sensitive)', riskScore: '0.12x Low Risk', impactLevel: 'Optimal' },
  { category: 'Cardiovascular', traitName: 'hERG QT Prolongation Risk (KCNH2)', rsId: 'rs1805123', genotype: 'G/G (Low QT Risk)', riskScore: '0.24x Low Risk', impactLevel: 'Optimal' },
  { category: 'Metabolic Health', traitName: 'MTHFR Folate Methylation Rate', rsId: 'rs1801133', genotype: 'C/T (Heterozygous Reduced)', riskScore: '1.65x Elevated', impactLevel: 'Elevated' },
];

export default function GenomeRiskStudio() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-[2rem] glass-panel-bioscript border border-rose-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-5 h-5 text-rose-400" />
            <h1 className="text-xl font-black tracking-wide text-white">Whole-Genome Genetic Health & Polygenic Risk Snapshot</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl font-mono">
            Polygenic Risk Score (PRS) calculator across 25+ pharmacogenomic & oncology traits with actionable clinical guidelines.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-rose-950/80 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold">
          PRS Genome Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TRAITS.map((t, idx) => (
          <div key={idx} className="p-6 rounded-[1.75rem] glass-panel-bioscript border border-slate-800 flex flex-col justify-between gap-4 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-white">{t.traitName}</span>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                t.impactLevel === 'Elevated' ? 'bg-amber-950 text-amber-300 border border-amber-700/50' : 'bg-emerald-950 text-emerald-300 border border-emerald-700/50'
              }`}>
                {t.impactLevel}
              </span>
            </div>

            <div className="space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Variant rsID:</span>
                <span className="text-cyan-300">{t.rsId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Patient Genotype:</span>
                <span className="text-purple-300">{t.genotype}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Polygenic Risk Score:</span>
                <span className="text-rose-400 font-bold">{t.riskScore}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
