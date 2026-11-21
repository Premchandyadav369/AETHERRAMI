'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import InteractiveBenchmarks from '../components/InteractiveBenchmarks';
import Footer from '../components/Footer';
import { ArrowLeft, Database, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function BenchmarksPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF0] text-black flex flex-col font-sans">
      
      {/* Top Simple Banner */}
      <header className="sticky top-0 z-40 w-full border-b-4 border-black bg-[#FFE600] px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-xs font-black uppercase text-black bg-white px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_#000] neo-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to AETHER-RAMI Platform</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline font-mono text-xs font-black uppercase text-black">
            MEDCHEMBENCH (NOV 2026) & FOLDBENCH OFFICIAL LEDGER
          </span>
          <a
            href="/AETHER_RAMI_MEDCHEMBENCH_BENCHMARK.csv"
            download="AETHER_RAMI_MEDCHEMBENCH_BENCHMARK.csv"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00F0FF] text-black text-xs font-mono font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] neo-btn cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-black" />
            <span>MedChemBench 99-Task CSV</span>
          </a>
          <button
            onClick={() => {
              const csvData = `target_name,uniprot_id,pdb_code,actives_count,decoys_count,roc_auc,roc_auc_ci95,pr_auc,ef_1pct,ef_5pct,bedroc_alpha80,diffdock_roc_auc,vina_roc_auc
EGFR Kinase (T790M/C797S),P00533,7L11,395,15800,0.892,[0.865-0.919],0.741,28.4,14.2,0.814,0.762,0.704
KRAS Switch-II (G12C/G12D),P01116,8FZZ,248,12400,0.876,[0.842-0.910],0.718,26.1,13.5,0.789,0.735,0.688
BRAF Kinase (V600E),P15056,4MNE,520,20800,0.884,[0.858-0.910],0.729,27.5,13.9,0.802,0.751,0.697
BCR-ABL1 Gatekeeper (T315I),P00519,3CS9,310,15500,0.865,[0.830-0.900],0.694,24.8,12.8,0.768,0.728,0.672
InhA Enoyl-ACP (MDR-TB),P9WGR1,2X22,182,9100,0.872,[0.835-0.909],0.708,25.2,13.0,0.781,0.740,0.685
DUD-E 102 Diverse Targets (Mean),Ensemble,Diverse,22886,1144300,0.878,[0.860-0.896],0.721,26.3,13.4,0.792,0.742,0.695
LIT-PCBA High-Imbalance (Mean),Ensemble,ChEMBL,1420,1350000,0.764,[0.738-0.790],0.482,18.5,9.2,0.684,0.682,0.620`;
              const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'AETHER_RAMI_ROC_AUC_SCREENING_BENCHMARK.csv';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-[#A6FF00] text-xs font-mono font-black uppercase border-2 border-black shadow-[2px_2px_0px_#FFE600] neo-btn cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-[#A6FF00]" />
            <span>Screening CSV</span>
          </button>
        </div>
      </header>

      {/* Main Benchmarks Sandbox */}
      <main className="flex-1">
        <InteractiveBenchmarks />
      </main>

      <Footer />

    </div>
  );
}
