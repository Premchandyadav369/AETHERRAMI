'use client';

import React from 'react';
import { Copy, Database, Activity, ExternalLink, ShieldCheck, FlaskConical } from 'lucide-react';
import { toast } from 'sonner';

export default function Footer() {
  const handleCopyBibtex = () => {
    const bibtex = `@article{yadav2026aether,
  title={De Novo Mixture of Experts Overcomes Targeted Drug Resistance},
  author={Yadav, Premchand and collaborators},
  journal={School of Computer Science and Engineering, VIT-AP University},
  year={2026},
  publisher={Hugging Face Model Hub: Premchan369/aether-rami-esm2-diffsbdd}
}`;
    navigator.clipboard.writeText(bibtex);
    toast.success('BibTeX Citation Copied to Clipboard!');
  };

  return (
    <footer className="py-12 bg-[#FFFDF0] border-t-4 border-black text-xs font-mono font-black text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b-3 border-black">
          
          {/* Institutional Identification (6 cols) */}
          <div className="md:col-span-6 space-y-3">
            <div className="font-mono font-black text-base uppercase text-black bg-[#FFE600] px-2.5 py-1 border-2 border-black inline-block shadow-[2px_2px_0px_#000]">
              AETHER-RAMI • OPEN SCIENCE INITIATIVE
            </div>
            <p className="text-xs font-bold text-gray-800 leading-relaxed max-w-md font-sans">
              Autonomous generative biophysics engine for overcoming acquired gatekeeper drug resistance. Developed at the School of Computer Science and Engineering (SCOPE), VIT-AP University, Amaravati, India.
            </p>
            <div className="text-[11px] font-bold text-gray-700">
              Supervised research • Capstone Final Review • CSIR-IICT Synthesis Roadmap
            </div>
          </div>

          {/* Core Repositories & Checkpoints (3 cols) */}
          <div className="md:col-span-3 space-y-2">
            <div className="font-mono font-black text-xs uppercase tracking-wider text-black bg-white px-2 py-0.5 border-2 border-black inline-block">
              Platform & Artifacts
            </div>
            <ul className="space-y-2 text-xs pt-1">
              <li>
                <a
                  href="/diseases"
                  className="hover:bg-[#00F0FF] p-1 border-2 border-transparent hover:border-black flex items-center gap-1.5 transition-colors"
                >
                  <Database className="w-3.5 h-3.5 text-black" />
                  <span>36 Disease Programs & Targets</span>
                </a>
              </li>
              <li>
                <a
                  href="/drug-library"
                  className="hover:bg-[#FFE600] p-1 border-2 border-transparent hover:border-black flex items-center gap-1.5 transition-colors"
                >
                  <FlaskConical className="w-3.5 h-3.5 text-black" />
                  <span>Drug Library & Chemical Synthesis</span>
                </a>
              </li>
              <li>
                <a
                  href="/benchmarks"
                  className="hover:bg-[#A6FF00] p-1 border-2 border-transparent hover:border-black flex items-center gap-1.5 transition-colors"
                >
                  <Activity className="w-3.5 h-3.5 text-black" />
                  <span>PoseBusters Benchmarks</span>
                </a>
              </li>
              <li>
                <a
                  href="https://huggingface.co/Premchan369/aether-rami-esm2-diffsbdd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-[#FFE600] p-1 border-2 border-transparent hover:border-black flex items-center gap-1.5 transition-colors"
                >
                  <Database className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>117.8 MB SafeTensors Hub</span>
                </a>
              </li>
              <li>
                <span className="bg-[#FFE600] px-1.5 py-0.5 border border-black text-[11px]">FoldBench-2026: #1 Ranking</span>
              </li>
            </ul>
          </div>

          {/* Academic Citation (3 cols) */}
          <div className="md:col-span-3 space-y-2">
            <div className="font-mono font-black text-xs uppercase tracking-wider text-black bg-white px-2 py-0.5 border-2 border-black inline-block">
              Academic Citation
            </div>
            <p className="text-[11px] font-bold text-gray-700 leading-relaxed font-sans">
              Cite this architecture in computational biology and medicinal chemistry research:
            </p>
            <button
              onClick={handleCopyBibtex}
              className="mt-1 px-3 py-1.5 text-xs font-mono font-black uppercase text-black bg-[#FFE600] hover:bg-[#E6CF00] border-2 border-black shadow-[2px_2px_0px_#000] neo-btn flex items-center gap-1.5 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy BibTeX Entry</span>
            </button>
          </div>

        </div>

        {/* Bottom Rights & Attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-gray-700">
          <div>
            © 2026 Premchand Yadav. SCOPE, VIT-AP University. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-black text-white px-2 py-0.5">Verified Reproducibility</span>
            <span className="bg-[#A6FF00] text-black px-2 py-0.5 border border-black">Apache 2.0 License</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
