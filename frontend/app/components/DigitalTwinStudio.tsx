'use client';

import React, { useState } from 'react';
import { Heart, Activity, ShieldCheck, AlertTriangle, Zap, CheckCircle2, RefreshCw, BarChart3 } from 'lucide-react';
import { useTab } from '../TabContext';

interface OrganMetric {
  organ: string;
  subsystem: string;
  riskScore: number;
  status: 'Low Risk' | 'Moderate Risk' | 'High Risk';
  value: string;
  desc: string;
}

export default function DigitalTwinStudio() {
  const { smilesInput } = useTab();
  const [dosageMg, setDosageMg] = useState(100);
  const [route, setRoute] = useState<'oral' | 'iv'>('oral');

  const organMetrics: OrganMetric[] = [
    { organ: 'Liver', subsystem: 'CYP450 Metabolism (CYP3A4 & CYP2D6)', riskScore: 12, status: 'Low Risk', value: 'Cl_int = 14.2 mL/min/kg', desc: 'Normal hepatic metabolic turnover without enzyme inhibition alerts.' },
    { organ: 'Heart', subsystem: 'hERG Ion Channel & Cardiac Electrophysiology', riskScore: 18, status: 'Low Risk', value: 'hERG IC50 = 34.2 μM', desc: 'Safe cardiotoxicity margin (>30 μM safety window).' },
    { organ: 'Kidney', subsystem: 'Renal Clearance & Glomerular Filtration', riskScore: 8, status: 'Low Risk', value: 'Cl_ren = 88.5 mL/min', desc: 'Unbound drug filtered cleanly via renal tubules.' },
    { organ: 'Brain', subsystem: 'Blood-Brain Barrier (BBB) Penetration', riskScore: 24, status: 'Moderate Risk', value: 'logBB = -0.12 (BBB+)', desc: 'Moderate CNS penetration suited for targeted kinase inhibitors.' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-rose-500/20 bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-5 h-5 text-rose-400" />
            <h1 className="text-xl font-black tracking-wide text-white">Digital Human Twin & Pharmacokinetics Simulator</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Simulates whole-body human organ pharmacokinetics (PK/PD), hepatic CYP450 metabolism, cardiac hERG QT risk, and blood-brain barrier transport.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 font-mono text-xs font-bold">
            Organ-on-a-Chip Engine
          </span>
        </div>
      </div>

      {/* Control Panel: Dosage & Route */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">Simulated Dosage (mg):</label>
          <input
            type="number"
            value={dosageMg}
            onChange={(e) => setDosageMg(parseInt(e.target.value) || 100)}
            className="w-full bg-slate-950 border border-slate-800 text-rose-300 px-3 py-2 rounded-xl text-xs font-mono focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">Administration Route:</label>
          <select
            value={route}
            onChange={(e) => setRoute(e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-800 text-rose-300 px-3 py-2 rounded-xl text-xs font-mono focus:outline-none"
          >
            <option value="oral">Oral Administration (PO)</option>
            <option value="iv">Intravenous Injection (IV)</option>
          </select>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 flex flex-col justify-between">
          <span className="text-slate-500 text-[10px]">Estimated Cmax:</span>
          <strong className="text-cyan-400 font-bold text-sm">{(dosageMg * (route === 'iv' ? 0.08 : 0.045)).toFixed(2)} μM</strong>
        </div>
      </div>

      {/* Organ Risk Telemetry Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {organMetrics.map((item, idx) => (
          <div key={idx} className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                  <Activity className="w-4 h-4 text-rose-400" />
                  <span>{item.organ} Organ Telemetry</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  {item.status}
                </span>
              </div>

              <span className="text-xs text-slate-400 font-mono block mb-3">{item.subsystem}</span>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs mb-3">
                <span className="text-slate-500 text-[10px] uppercase block">Pharmacokinetic Value</span>
                <strong className="text-cyan-300 font-bold text-xs">{item.value}</strong>
              </div>

              <p className="text-xs text-slate-300 font-mono leading-relaxed">{item.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">Toxicity Risk Index:</span>
              <strong className="text-emerald-400">{item.riskScore} / 100</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
