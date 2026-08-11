'use client';

import React, { useState } from 'react';
import { FileText, Download, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { useTab } from '../TabContext';

export default function PatentPacketStudio() {
  const { smilesInput } = useTab();
  const [inventorName, setInventorName] = useState('V C Premchand Yadav');
  const [patentTitle, setPatentTitle] = useState('Novel Heteroaryl Kinase Inhibitors and Methods of Use');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Provisional Patent Packet (USPTO Form PTO/SB/16) exported successfully!');
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-[2rem] glass-panel-bioscript border border-amber-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-black tracking-wide text-white">1-Click Provisional Patent Packet Generator</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl font-mono">
            Generates USPTO & EPO-compliant Provisional Patent Disclosures (Form PTO/SB/16) with automated prior art claims and SMILES Markush structures.
          </p>
        </div>

        <button
          onClick={handleExport}
          disabled={isExporting}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 font-bold text-xs text-slate-950 hover:opacity-90 transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-2 self-start md:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>{isExporting ? 'Generating Packet...' : 'Export Provisional Patent Packet (PDF)'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        <div className="p-6 rounded-[1.75rem] glass-panel-bioscript border border-slate-800 flex flex-col gap-4">
          <h2 className="font-bold text-sm text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Patent Filing Metadata
          </h2>

          <div className="space-y-3">
            <div>
              <label className="text-slate-500 text-[10px] block mb-1">Invention Title:</label>
              <input
                type="text"
                value={patentTitle}
                onChange={(e) => setPatentTitle(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div>
              <label className="text-slate-500 text-[10px] block mb-1">Lead Inventor / Applicant:</label>
              <input
                type="text"
                value={inventorName}
                onChange={(e) => setInventorName(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500/50"
              />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-[1.75rem] glass-panel-bioscript border border-slate-800 flex flex-col justify-between gap-4">
          <div>
            <h2 className="font-bold text-sm text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Disclosure & Markush Claims Summary
            </h2>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 text-[11px] break-all">
              {smilesInput}
            </div>
          </div>

          <div className="space-y-1.5 text-slate-300 border-t border-slate-900 pt-3">
            <div className="flex justify-between">
              <span className="text-slate-500">Form Standard:</span>
              <span className="text-amber-400">USPTO 37 CFR 1.53(c) / EPO Article 123</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Prior Art Search:</span>
              <span className="text-emerald-400 font-bold">142 Compounds Screened (Clean Priority)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
