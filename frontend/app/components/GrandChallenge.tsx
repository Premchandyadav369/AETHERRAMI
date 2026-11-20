'use client';

import React from 'react';
import { AlertCircle, Dna, FlaskConical, Sparkles, TrendingUp, ShieldAlert, Cpu } from 'lucide-react';

export default function GrandChallenge() {
  return (
    <section id="grand-challenge" className="py-20 border-b-4 border-black bg-[#FFFDF0] relative overflow-hidden">
      
      {/* Background Dot Texture */}
      <div className="absolute inset-0 bg-neo-dots pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        
        {/* Section Pill / Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF5470] text-white border-2 border-black text-xs font-mono font-black uppercase shadow-[2px_2px_0px_#000]">
            <ShieldAlert className="w-4 h-4 text-white" />
            <span>THE BIOLOGICAL & COMPUTATIONAL GRAND CHALLENGE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight uppercase leading-tight">
            Why targeted therapies fail: The gatekeeper crisis.
          </h2>

          <p className="text-base font-semibold text-[#262626] leading-relaxed">
            In 2020, AlphaFold resolved the historic 50-year protein folding grand challenge by predicting 3D biomolecular coordinates. Yet in clinical oncology and global infectious disease, predicting wild-type structures alone cannot cure patients. Tumor genomes and pathogens continuously evolve secondary point mutations at sterically vital &ldquo;gatekeeper&rdquo; residues, rendering frontline precision medicines obsolete.
          </p>
        </div>

        {/* 3 Comparative Architectural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1: The Clinical Reality */}
          <div className="p-6 bg-white border-4 border-black shadow-[6px_6px_0px_#000] rounded-xl space-y-4">
            <div className="w-12 h-12 bg-[#FF5470] border-3 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-white">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider font-black text-black bg-[#FFE600] px-2 py-0.5 border border-black inline-block">
                Pillar 01 • Clinical Relapse
              </div>
              <h3 className="text-xl font-black text-black uppercase">
                Steric Gatekeeper Mutations
              </h3>
              <p className="text-xs font-semibold text-[#525252] leading-relaxed">
                When patients receive frontline kinase inhibitors (Osimertinib, Imatinib, Sotorasib), cancer cells acquire secondary substitutions (EGFR T790M/C797S, BCR-ABL1 T315I, KRAS G12D). Bulky side chains physically clash with the drug, reducing binding affinity by over 1,000-fold while preserving oncogenic signaling.
              </p>
            </div>

            <div className="pt-3 border-t-2 border-black text-xs font-mono font-black text-black">
              Clinical Result: <span className="bg-[#FF5470] text-white px-1">100% Relapse Rate in Advanced Cancers</span>
            </div>
          </div>

          {/* Pillar 2: The Computational Bottleneck */}
          <div className="p-6 bg-white border-4 border-black shadow-[6px_6px_0px_#000] rounded-xl space-y-4">
            <div className="w-12 h-12 bg-[#FFE600] border-3 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-black">
              <FlaskConical className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider font-black text-black bg-[#A6FF00] px-2 py-0.5 border border-black inline-block">
                Pillar 02 • Traditional Failure
              </div>
              <h3 className="text-xl font-black text-black uppercase">
                High-Throughput Inadequacy
              </h3>
              <p className="text-xs font-semibold text-[#525252] leading-relaxed">
                Traditional computational screening screens rigid catalogs of 10⁶ commercially synthesizable molecules against a static crystal pocket. This takes 12–15 years and $2.6B with a 90% failure rate, because static libraries cannot navigate the 10⁶⁰ astronomical chemical space required to circumvent mutated steric bulk.
              </p>
            </div>

            <div className="pt-3 border-t-2 border-black text-xs font-mono font-black text-black">
              Search Space: <span className="bg-black text-white px-1">10⁶ Screened vs 10⁶⁰ Druggable Space</span>
            </div>
          </div>

          {/* Pillar 3: The AETHER-RAMI Solution */}
          <div className="p-6 bg-white border-4 border-black shadow-[6px_6px_0px_#000] rounded-xl space-y-4">
            <div className="w-12 h-12 bg-[#A6FF00] border-3 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-black">
              <Sparkles className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider font-black text-black bg-[#00F0FF] px-2 py-0.5 border border-black inline-block">
                Pillar 03 • The Breakthrough
              </div>
              <h3 className="text-xl font-black text-black uppercase">
                SE(3) Equivariant Diffusion
              </h3>
              <p className="text-xs font-semibold text-[#525252] leading-relaxed">
                AETHER-RAMI models lead generation as continuous-time reverse Brownian motion in 3D Euclidean space. Conditioned on ESM-2 evolutionary representations, it generates coordinates and bond valencies that navigate smoothly around mutated residues, achieving sub-nanomolar affinity (<strong className="bg-[#A6FF00] px-1 text-black font-mono">Kd &lt; 10 nM</strong>).
              </p>
            </div>

            <div className="pt-3 border-t-2 border-black text-xs font-mono font-black text-black">
              Empirical Score: <span className="bg-[#A6FF00] text-black px-1 font-bold">0.42 Å Pocket RMSD (#1 on FoldBench)</span>
            </div>
          </div>

        </div>

        {/* DeepMind-Style Technical Highlight Box */}
        <div className="p-6 sm:p-8 bg-[#FFE600] border-4 border-black shadow-[8px_8px_0px_0px_#000] rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-3xl">
            <div className="text-xs font-mono uppercase text-black font-black flex items-center gap-2">
              <Cpu className="w-4 h-4 text-black" />
              <span>DIRECT DE NOVO THERAPEUTIC SYNTHESIS</span>
            </div>
            <div className="text-lg sm:text-xl font-black text-black uppercase">
              AlphaFold predicts the structural canvas. AETHER-RAMI synthesizes the curative molecular therapeutic.
            </div>
            <p className="text-xs sm:text-sm font-semibold text-black/90">
              By validating de novo generation across 36 high-burden clinical targets (including CSIR-IICT India disease programs and global oncology benchmarks), AETHER-RAMI establishes a complete end-to-end bridge from mutated genomic sequence to synthesis-ready lead.
            </p>
          </div>

          <a
            href="#workbench"
            className="px-6 py-3 text-xs font-mono font-black uppercase text-white bg-black hover:bg-gray-800 border-2 border-black shadow-[3px_3px_0px_#FFF] neo-btn whitespace-nowrap cursor-pointer"
          >
            Open 3D Workbench →
          </a>
        </div>

      </div>
    </section>
  );
}
