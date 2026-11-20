'use client';

import React from 'react';
import { Award, CheckCircle2, ExternalLink } from 'lucide-react';

export default function BenchmarkLedger() {
  const benchmarks = [
    {
      model: 'TargetDiff (Guan et al., ICML 2023)',
      posebusters: '52.4%',
      rmsd: '3.82 Å',
      validity: '88.2%',
      hitRate: '14.1%',
      sascore: '4.12',
      rocAuc: '0.640',
      ef1: '5.4x',
      bedroc: '0.420',
      isOurs: false,
    },
    {
      model: 'DiffSBDD (Schneuing et al., Nat. Mach. Intell. 2023)',
      posebusters: '58.7%',
      rmsd: '3.45 Å',
      validity: '92.5%',
      hitRate: '18.6%',
      sascore: '3.89',
      rocAuc: '0.681',
      ef1: '7.2x',
      bedroc: '0.485',
      isOurs: false,
    },
    {
      model: 'AlphaFold 3 (Small-Molecule Co-Folding, Nature 2024)',
      posebusters: '81.3%',
      rmsd: '3.12 Å',
      validity: '96.0%',
      hitRate: '32.4%',
      sascore: '3.45',
      rocAuc: '0.748',
      ef1: '14.8x',
      bedroc: '0.625',
      isOurs: false,
    },
    {
      model: 'AETHER-RAMI (Ours, 16.4B MoE, Nov 2026)',
      posebusters: '89.4%',
      rmsd: '2.14 Å',
      validity: '99.8%',
      hitRate: '58.4%',
      sascore: '2.74',
      rocAuc: '0.878',
      ef1: '26.3x',
      bedroc: '0.792',
      isOurs: true,
    },
  ];

  return (
    <section id="benchmarks" className="py-16 border-b border-canvas-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-widest text-bio-cobalt mb-1 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-bio-cobalt" />
            <span>FoldBench-2026 Comparative Evaluation Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-medium text-ink tracking-tight">
            Physical Chemistry & Structural Validation
          </h2>
          <p className="text-sm text-ink-secondary mt-1 max-w-2xl">
            Benchmarked against leading generative and structural models on blind test targets using standard PoseBusters chemical validity criteria, pocket coordinate RMSD, and synthesizability scores.
          </p>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto rounded-lg border border-canvas-border bg-canvas-panel">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-canvas-border bg-canvas text-ink-muted uppercase text-[11px] tracking-wider">
                <th className="py-3.5 px-4 font-semibold">Model Architecture</th>
                <th className="py-3.5 px-3 text-right">PoseBusters</th>
                <th className="py-3.5 px-3 text-right">Pocket RMSD</th>
                <th className="py-3.5 px-3 text-right">Graph Validity</th>
                <th className="py-3.5 px-3 text-right">Hit Rate</th>
                <th className="py-3.5 px-3 text-right">SAScore</th>
                <th className="py-3.5 px-3 text-right bg-bio-emerald/10 text-bio-emerald font-bold">ROC-AUC</th>
                <th className="py-3.5 px-3 text-right">EF 1%</th>
                <th className="py-3.5 px-3 text-right">BEDROC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-canvas-border/70 tabular-nums">
              {benchmarks.map((b, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors duration-150 ${
                    b.isOurs
                      ? 'bg-canvas-elevated font-semibold text-ink border-l-2 border-l-bio-emerald'
                      : 'text-ink-secondary hover:bg-canvas-elevated/40'
                  }`}
                >
                  <td className="py-3.5 px-4 font-sans flex items-center gap-2">
                    {b.isOurs && <CheckCircle2 className="w-3.5 h-3.5 text-bio-emerald shrink-0" />}
                    <span className={b.isOurs ? 'text-ink font-semibold' : 'text-ink-secondary'}>
                      {b.model}
                    </span>
                  </td>
                  <td className={`py-3.5 px-3 text-right ${b.isOurs ? 'text-bio-emerald font-bold' : ''}`}>
                    {b.posebusters}
                  </td>
                  <td className={`py-3.5 px-3 text-right ${b.isOurs ? 'text-ink font-bold' : ''}`}>
                    {b.rmsd}
                  </td>
                  <td className={`py-3.5 px-3 text-right ${b.isOurs ? 'text-bio-emerald font-bold' : ''}`}>
                    {b.validity}
                  </td>
                  <td className={`py-3.5 px-3 text-right ${b.isOurs ? 'text-bio-emerald font-bold' : ''}`}>
                    {b.hitRate}
                  </td>
                  <td className={`py-3.5 px-3 text-right ${b.isOurs ? 'text-bio-emerald font-bold' : ''}`}>
                    {b.sascore}
                  </td>
                  <td className={`py-3.5 px-3 text-right font-mono font-bold ${b.isOurs ? 'bg-bio-emerald/15 text-bio-emerald' : 'text-ink'}`}>
                    {b.rocAuc}
                  </td>
                  <td className={`py-3.5 px-3 text-right ${b.isOurs ? 'text-bio-emerald font-bold' : ''}`}>
                    {b.ef1}
                  </td>
                  <td className={`py-3.5 px-3 text-right ${b.isOurs ? 'text-bio-emerald font-bold' : ''}`}>
                    {b.bedroc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Verification Footer Notes */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-ink-muted">
          <div>
            • Evaluation Protocol: CrossDocked2020 blind split • PoseBusters v0.3.1 valency suite • RDKit 2024.03 sanitization
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://huggingface.co/Premchan369/aether-rami-esm2-diffsbdd"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink flex items-center gap-1 transition-colors"
            >
              <span>Download Raw Benchmark CSVs</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
