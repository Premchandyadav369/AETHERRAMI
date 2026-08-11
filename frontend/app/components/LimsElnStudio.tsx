'use client';

import React, { useState } from 'react';
import { Database, Search, ShieldCheck, CheckCircle2, QrCode } from 'lucide-react';
import { useTab } from '../TabContext';

interface SampleItem {
  barcode: string;
  reagentName: string;
  quantity: string;
  location: string;
  purity: string;
  status: 'In Stock' | 'Low Stock' | 'Depleted';
}

const INVENTORY: SampleItem[] = [
  { barcode: 'QR-8841-A', reagentName: 'Osimertinib Reference Powder (10mg)', quantity: '8.4 mg', location: '-80°C Freezer Rack 4, Shelf B', purity: '99.8% HPLC', status: 'In Stock' },
  { barcode: 'QR-8842-B', reagentName: 'EGFR Kinase Domain Protein Sample (1mg/mL)', quantity: '450 µL', location: '-80°C Freezer Rack 2, Shelf A', purity: '95.0% SDS-PAGE', status: 'In Stock' },
  { barcode: 'QR-8843-C', reagentName: 'Acrylamide Electrophilic Warhead Probe', quantity: '1.2 mg', location: 'Desiccator Cabinet 3', purity: '98.5% NMR', status: 'Low Stock' },
];

export default function LimsElnStudio() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-teal-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Database className="w-5 h-5 text-teal-400" />
            <h1 className="text-xl font-black tracking-wide text-white">Electronic Lab Notebook (ELN) & LIMS Inventory</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Barcode/QR code scanner integration, chemical reagent stock tracking (mg/µL), and -80°C freezer rack location telemetry.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-teal-950 text-teal-300 border border-teal-500/40 text-xs font-mono font-bold">
          LIMS Active
        </span>
      </div>

      <div className="space-y-3 font-mono text-xs">
        {INVENTORY.map((item, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-teal-400">
                <QrCode className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block font-bold">{item.reagentName}</strong>
                <span className="text-[10px] text-slate-500">{item.barcode} | Location: {item.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <span className="text-cyan-300 font-bold">{item.quantity}</span>
              <span className="text-emerald-400">{item.purity}</span>
              <span className="px-2 py-0.5 rounded text-[9px] bg-teal-950 text-teal-300 border border-teal-700/50">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
