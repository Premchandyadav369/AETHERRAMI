'use client';

import React, { useState } from 'react';
import { Activity, ShieldCheck, Search, Users } from 'lucide-react';
import { useTab } from '../TabContext';

interface BiomarkerEntry {
  geneSymbol: string;
  variantMutation: string;
  cdxAssayType: string;
  responseRate: string;
  fdaApprovedCdx: string;
}

const BIOMARKERS: BiomarkerEntry[] = [
  { geneSymbol: 'EGFR', variantMutation: 'T790M / L858R / ex19del', cdxAssayType: 'cobas® EGFR Mutation Test v2 (ctDNA)', responseRate: '71.2% ORR', fdaApprovedCdx: 'Approved (P120019)' },
  { geneSymbol: 'BRAF', variantMutation: 'V600E / V600K', cdxAssayType: 'THxID® BRAF Kit (FFPE Tissue)', responseRate: '53.0% ORR', fdaApprovedCdx: 'Approved (P120014)' },
  { geneSymbol: 'ERBB2 (HER2)', variantMutation: 'Amplification / Y772_A775insGAY', cdxAssayType: 'HER2 IHC 3+ / FISH Ratio ≥ 2.0', responseRate: '68.5% ORR', fdaApprovedCdx: 'Approved (P980018)' },
  { geneSymbol: 'KRAS', variantMutation: 'G12C / G12D', cdxAssayType: 'therascreen® KRAS RGQ PCR Kit', responseRate: '43.0% ORR', fdaApprovedCdx: 'Approved (P110027)' },
];

export default function BiomarkerStudio() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-rose-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-5 h-5 text-rose-400" />
            <h1 className="text-xl font-black tracking-wide text-white">Clinical Biomarker & Companion Diagnostics (CDx) Stratifier</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Companion diagnostic assay designer mapping liquid biopsy ctDNA mutations and IHC staining scores for clinical trial patient selection.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold">
          CDx Engine Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BIOMARKERS.map((b, idx) => (
          <div key={idx} className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between gap-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-white">{b.geneSymbol}</span>
              <span className="px-2 py-0.5 rounded text-[9px] bg-rose-950 text-rose-300 border border-rose-700/50">
                {b.variantMutation}
              </span>
            </div>

            <div className="space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">CDx Assay:</span>
                <span className="text-cyan-300">{b.cdxAssayType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target Response Rate:</span>
                <span className="text-emerald-400 font-bold">{b.responseRate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">FDA Status:</span>
                <span className="text-purple-300">{b.fdaApprovedCdx}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
