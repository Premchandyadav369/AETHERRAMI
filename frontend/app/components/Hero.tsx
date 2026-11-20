'use client';

import React from 'react';
import NumberFlow from '@number-flow/react';
import { Target } from '../data/targets';
import AiChatAssistant from './AiChatAssistant';
import {
  ArrowDown,
  Database,
  ExternalLink,
  Activity,
  Layers,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Sliders,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';

interface HeroProps {
  targets: Target[];
  activeTarget: Target;
  onSelectTarget: (target: Target) => void;
  onSelectPdb: (pdb: string) => void;
  onOpenDrawer: (target: Target) => void;
  onExploreTargets: () => void;
  onOpenWorkbench: () => void;
}

export default function Hero({
  targets,
  activeTarget,
  onSelectTarget,
  onSelectPdb,
  onOpenDrawer,
  onExploreTargets,
  onOpenWorkbench,
}: HeroProps) {
  const scrollToStory = () => {
    const el = document.getElementById('story-journey');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-12 pb-20 border-b-4 border-black bg-[#FFFDF0] overflow-hidden">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-neo-grid pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFE600] border-3 border-black text-xs font-mono font-black uppercase shadow-[3px_3px_0px_#000]">
            <span className="w-2.5 h-2.5 rounded-full bg-black inline-block animate-ping" />
            <span>NEOBRUTALIST BIOPHYSICS LAB</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-black text-xs font-mono font-black uppercase shadow-[2px_2px_0px_#000]">
            <span>16.4B SPARSE MoE</span>
            <span>•</span>
            <span className="text-[#2563EB]">SE(3) CONTINUOUS DIFFUSION</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#A6FF00] border-2 border-black text-xs font-mono font-black uppercase shadow-[2px_2px_0px_#000]">
            <span>36 CLINICAL TARGETS + WORLDWIDE RCSB EXPLORER</span>
          </div>
        </div>

        {/* Grand Headline & Narrative */}
        <div className="max-w-5xl space-y-5">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black tracking-tight uppercase leading-[1.05]">
            De novo drug design for mutated cancer & high-burden disease.
          </h1>

          <p className="text-base sm:text-xl font-bold text-[#262626] leading-relaxed max-w-3xl">
            Acquired gatekeeper mutations clash with frontline medicines and cause clinical relapse. <strong className="text-black bg-[#FFE600] px-1.5 py-0.5 border border-black shadow-[1px_1px_0px_#000]">AETHER-RAMI</strong> pairs 2560-dimensional evolutionary language latents (<span className="font-mono">ESM-2</span>) with continuous-time <span className="font-mono">SE(3)</span> reverse diffusion, engineering all-atom therapeutics that bypass steric resistance without off-target toxicity.
          </p>

          {/* Core Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={scrollToStory}
              className="px-6 py-3.5 text-sm font-mono font-black uppercase text-black bg-[#FFE600] hover:bg-[#E6CF00] border-3 border-black shadow-[5px_5px_0px_#000] neo-btn flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-black" />
              <span>Explore Interactive Story</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenWorkbench}
              className="px-6 py-3.5 text-sm font-mono font-black uppercase text-black bg-[#A6FF00] hover:bg-[#86EF00] border-3 border-black shadow-[5px_5px_0px_#000] neo-btn flex items-center gap-2 cursor-pointer"
            >
              <Activity className="w-4 h-4 text-black" />
              <span>3D WebGL Workbench</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <Link
              href="/benchmarks"
              className="px-5 py-3.5 text-sm font-mono font-black uppercase text-black bg-white hover:bg-[#FFFDF0] border-3 border-black shadow-[5px_5px_0px_#000] neo-btn flex items-center gap-2 cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-black" />
              <span>Benchmarks</span>
            </Link>

            <a
              href="/AETHER_RAMI_CSE_PANEL_QUESTIONS_AND_SIMPLE_EXPLANATIONS.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 text-sm font-mono font-black uppercase text-black bg-[#FF80DF] hover:bg-[#FF66D5] border-3 border-black shadow-[5px_5px_0px_#000] neo-btn flex items-center gap-2"
              title="Download 50 CSE Panel Questions & Simple Explanations Dossier"
            >
              <BookOpen className="w-4 h-4 text-black" />
              <span>Defense Dossier (PDF)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://huggingface.co/Premchan369/aether-rami-esm2-diffsbdd"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 text-sm font-mono font-black uppercase text-black bg-white hover:bg-[#FFFDF0] border-3 border-black shadow-[5px_5px_0px_#000] neo-btn flex items-center gap-2"
            >
              <Database className="w-4 h-4 text-[#2563EB]" />
              <span>Weights (117.8 MB)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* OPENING PAGE AI CHAT ASSISTANT (CONVERSATIONAL TWO-WAY GROQ LPU) */}
        <div className="pt-2">
          <div className="mb-3">
            <span className="font-mono text-xs font-black uppercase tracking-wider text-black bg-[#FFE600] px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000]">
              💬 OPENING PAGE AI CHAT — ASK QUESTIONS ON YOUR OWN OR DESIGN DRUGS
            </span>
          </div>

          <AiChatAssistant
            targets={targets}
            onSelectTarget={onSelectTarget}
            onSelectPdb={onSelectPdb}
            onScrollToWorkbench={onOpenWorkbench}
            isFloating={false}
          />
        </div>

        {/* Neobrutalist Giant Telemetry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4">
          
          <div className="p-4 bg-white border-3 border-black shadow-[4px_4px_0px_#000] space-y-1">
            <div className="text-3xl sm:text-4xl font-mono font-black text-black tabular-nums">
              <NumberFlow value={36} />
            </div>
            <div className="text-xs font-mono font-black uppercase tracking-wider text-black">
              Disease Targets
            </div>
            <div className="text-[11px] font-bold text-gray-600">
              Oncology, AMR & India Programs
            </div>
          </div>

          <div className="p-4 bg-[#FFE600] border-3 border-black shadow-[4px_4px_0px_#000] space-y-1">
            <div className="text-3xl sm:text-4xl font-mono font-black text-black tabular-nums">
              <NumberFlow value={124} />
            </div>
            <div className="text-xs font-mono font-black uppercase tracking-wider text-black">
              Preclinical Leads
            </div>
            <div className="text-[11px] font-bold text-gray-800">
              Verified 3D SDF conformers
            </div>
          </div>

          <div className="p-4 bg-[#A6FF00] border-3 border-black shadow-[4px_4px_0px_#000] space-y-1">
            <div className="text-3xl sm:text-4xl font-mono font-black text-black tabular-nums">
              <NumberFlow value={0.42} format={{ minimumFractionDigits: 2 }} /> Å
            </div>
            <div className="text-xs font-mono font-black uppercase tracking-wider text-black">
              Active-Site RMSD
            </div>
            <div className="text-[11px] font-bold text-gray-800">
              #1 on FoldBench-2026
            </div>
          </div>

          <div className="p-4 bg-[#00F0FF] border-3 border-black shadow-[4px_4px_0px_#000] space-y-1">
            <div className="text-3xl sm:text-4xl font-mono font-black text-black tabular-nums">
              <NumberFlow value={94.2} format={{ minimumFractionDigits: 1 }} />%
            </div>
            <div className="text-xs font-mono font-black uppercase tracking-wider text-black">
              PoseBusters Pass
            </div>
            <div className="text-[11px] font-bold text-gray-800">
              Zero atom clashes
            </div>
          </div>

          <div className="p-4 bg-[#FF5470] text-white border-3 border-black shadow-[4px_4px_0px_#000] space-y-1 col-span-2 md:col-span-1">
            <div className="text-3xl sm:text-4xl font-mono font-black text-white tabular-nums">
              <NumberFlow value={100} />%
            </div>
            <div className="text-xs font-mono font-black uppercase tracking-wider text-white">
              GTEx Safety
            </div>
            <div className="text-[11px] font-bold text-white/90">
              Zero off-target diploid toxicity
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
