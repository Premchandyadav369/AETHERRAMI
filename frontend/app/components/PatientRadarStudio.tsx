'use client';

import React, { useState } from 'react';
import { Users, Activity, CheckCircle2 } from 'lucide-react';
import { useTab } from '../TabContext';

interface Cohort {
  cohortName: string;
  patientCount: number;
  biomarkerMatch: string;
  responseRatePredicted: string;
  eligibilityScore: string;
}

const COHORTS: Cohort[] = [
  { cohortName: 'Cohort A: EGFR T790M Positive NSCLC', patientCount: 420, biomarkerMatch: 'cobas® EGFR T790M ctDNA ≥ 10 copies/mL', responseRatePredicted: '74.5% ORR (95% CI: 69-80%)', eligibilityScore: '98.5 / 100 (Optimal Match)' },
  { cohortName: 'Cohort B: BRAF V600E Melanoma', patientCount: 280, biomarkerMatch: 'THxID® BRAF V600E Mutation Positive', responseRatePredicted: '58.0% ORR (95% CI: 51-65%)', eligibilityScore: '91.2 / 100 (High Match)' },
  { cohortName: 'Cohort C: HER2 Amplified Solid Tumors', patientCount: 310, biomarkerMatch: 'HER2 IHC 3+ / FISH Ratio ≥ 2.2', responseRatePredicted: '66.2% ORR (95% CI: 60-72%)', eligibilityScore: '94.0 / 100 (High Match)' },
];

export default function PatientRadarStudio() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-rose-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-5 h-5 text-rose-400" />
            <h1 className="text-xl font-black tracking-wide text-white">Real-Time Clinical Trial Patient Stratification Radar</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Correlates liquid biopsy genomic profiles with clinical trial eligibility to match high-responding patient sub-populations.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold">
          Patient Match Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        {COHORTS.map((c, idx) => (
          <div key={idx} className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-white">{c.cohortName}</span>
              <span className="px-2 py-0.5 rounded text-[9px] bg-rose-950 text-rose-300 border border-rose-700/50">
                N = {c.patientCount} Patients
              </span>
            </div>

            <div className="space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Biomarker Criterion:</span>
                <span className="text-cyan-300 text-[10px] truncate max-w-[140px]">{c.biomarkerMatch}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Predicted Response:</span>
                <span className="text-emerald-400 font-bold">{c.responseRatePredicted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Match Score:</span>
                <span className="text-purple-300 font-bold">{c.eligibilityScore}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
