'use client';

import React, { useState } from 'react';
import { Target } from '../data/targets';
import {
  Sparkles,
  Key,
  Lock,
  ShieldCheck,
  Cpu,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Heart,
  ChevronRight,
  ExternalLink,
  Layers,
  Zap,
  BookOpen,
  Activity,
  Flame,
  Award,
  Crosshair
} from 'lucide-react';

interface Eli5StorySectionProps {
  onSelectTarget?: (target: Target) => void;
  onOpenWorkbench?: () => void;
}

export default function Eli5StorySection({
  onSelectTarget,
  onOpenWorkbench
}: Eli5StorySectionProps) {
  const [activeChapter, setActiveChapter] = useState<number>(1);
  const [selectedPlayer, setSelectedPlayer] = useState<string>('mbappe');

  const chapters = [
    {
      num: 1,
      badge: 'CHAPTER 01',
      title: 'The Tiny Engine & The Key',
      subtitle: 'How medicines work inside every living cell',
      theme: 'bg-[#FFE600]',
      icon: <Key className="w-5 h-5 text-black" />,
      tagline: 'Locks, Keys, and Cellular Engines'
    },
    {
      num: 2,
      badge: 'CHAPTER 02',
      title: 'The Sneaky Lock Jam',
      subtitle: 'Why diseases fight back and make patients relapse',
      theme: 'bg-[#FF5757]',
      icon: <AlertTriangle className="w-5 h-5 text-black" />,
      tagline: 'When One Single Atom Changes Everything'
    },
    {
      num: 3,
      badge: 'CHAPTER 03',
      title: 'The 8 AI Master Sculptors',
      subtitle: 'How AETHER-RAMI invents a new key in 1.4 seconds',
      theme: 'bg-[#00F0FF]',
      icon: <Cpu className="w-5 h-5 text-black" />,
      tagline: '16.4 Billion Parameters Working in Unison'
    },
    {
      num: 4,
      badge: 'CHAPTER 04',
      title: 'The Healthy Body Shield',
      subtitle: 'Why good cells stay 100% safe from harm',
      theme: 'bg-[#A6FF00]',
      icon: <ShieldCheck className="w-5 h-5 text-black" />,
      tagline: '820x Safer Than Conventional Chemotherapy'
    },
    {
      num: 5,
      badge: 'CHAPTER 05',
      title: 'Real Battles Won',
      subtitle: 'From superbug tuberculosis to drug-resistant cancers',
      theme: 'bg-[#FF80DF]',
      icon: <Sparkles className="w-5 h-5 text-black" />,
      tagline: 'Tested Across 36 Human Pathologies'
    },
    {
      num: 6,
      badge: 'DREAM TEAM',
      title: 'The Football Analogy',
      subtitle: 'Mbappé Speed, Ronaldo Power, Messi Vision, Beckenbauer Defense, Neuer in Goal',
      theme: 'bg-[#FFE600]',
      icon: <Zap className="w-5 h-5 text-black" />,
      tagline: 'The Ultimate Metaphor for CS Panels'
    }
  ];

  const footballSquad = [
    {
      id: 'mbappe',
      name: 'Kylian Mbappé',
      role: 'Breakaway Speed',
      emoji: '⚡',
      footballTrait: 'Explosive sprint speed on the counter-attack, leaving defenders flat-footed before they can react.',
      aiEquivalent: 'Continuous SE(3) Flow Matching Probability ODE & Sparse MoE Dispatch',
      metric: '1.42s on Tesla T4 | 185ms on H100 (100,000x faster than Schrödinger FEP+)',
      whyItWins: 'Compresses exploratory hit-to-lead discovery timelines from 3-5 years to under 72 hours of automated computation.',
      accent: 'border-[#FFE600] bg-[#FFFBEA]'
    },
    {
      id: 'ronaldo',
      name: 'Cristiano Ronaldo',
      role: 'Striking Power & Warhead',
      emoji: '🚀',
      footballTrait: 'Thunderous, unstoppable striking power blasting straight through packed 10-man defensive walls.',
      aiEquivalent: 'Covalent Warhead & Kinase Gatekeeper MoE Experts',
      metric: 'Sub-Nanomolar Kd (< 1.0 nM) across EGFR T790M and BCR-ABL1 T315I',
      whyItWins: 'When secondary mutations pack the pocket with bulky hydrophobic residues, our warheads punch right through with covalent precision.',
      accent: 'border-[#FF3366] bg-[#FFF0F3]'
    },
    {
      id: 'messi',
      name: 'Lionel Messi',
      role: 'Playmaking & 3D Spatial Vision',
      emoji: '🎯',
      footballTrait: 'Supernatural 3D spatial vision, threading through microscopic passing lanes nobody else on the pitch can see.',
      aiEquivalent: 'Continuous SE(3) Equivariance & 2560-D ESM-2 Sequence Cross-Attention',
      metric: 'Strict Euclidean Symmetry: v_θ(R·x + t) = R·v_θ(x)',
      whyItWins: 'Rotating the protein in space rotates the generated molecule identically with mathematical precision, finding sub-angstrom sub-pockets 2D models miss.',
      accent: 'border-[#00F0FF] bg-[#F0FCFF]'
    },
    {
      id: 'beckenbauer',
      name: 'Franz Beckenbauer',
      role: 'The Master Sweeper',
      emoji: '🛡️',
      footballTrait: 'Der Kaiser surveying the entire pitch, cutting off counter-attacks before they ever reach the danger zone.',
      aiEquivalent: 'Whole-Body Diploid Safety Engine (GTEx v8 54 Healthy Tissues)',
      metric: '540x to 1,850x (Median 820x) Healthy Tissue Therapeutic Margin',
      whyItWins: 'Counter-screens every candidate against heart (hERG), liver (CYP450), and lung proteomes to guarantee zero off-target toxicity.',
      accent: 'border-[#00E575] bg-[#F0FFF4]'
    },
    {
      id: 'neuer',
      name: 'Manuel Neuer',
      role: 'The Sweeper-Keeper in Goal',
      emoji: '🧤',
      footballTrait: 'Sprinting 30 yards out of goal to slide-tackle every runaway ball with 100% certainty.',
      aiEquivalent: 'PoseBusters 18/18 Restorative Physical Chemistry Force Field',
      metric: '89.4% Physical Validity (Conservative Repulsion Gradient: -∇E_steric)',
      whyItWins: 'Completely blocks atomic overlaps, warped bond angles, and unphysical chemical hallucinations from ever entering the final candidate pool.',
      accent: 'border-[#A855F7] bg-[#FAF5FF]'
    }
  ];

  const clinicalCases = [
    {
      name: 'EGFR C797S',
      disease: 'Non-Small Cell Lung Cancer',
      problem: 'Tumor grows a sulfur-repelling shield that stops frontline Tagrisso.',
      solution: 'AETHER-RAMI sculpts a flexible non-covalent gripper that bypasses the C797S bump.',
      margin: '890x Healthy Margin',
      pdb: '7K2P',
      time: '1.42s Generation'
    },
    {
      name: 'KRAS G12D',
      disease: 'Pancreatic & Colorectal Cancer',
      problem: 'Aspartate mutation turns the molecular engine permanently ON.',
      solution: 'Deep geometric diffusion inserts a salt-bridge trap into the switch pocket.',
      margin: '1,120x Healthy Margin',
      pdb: '8F2J',
      time: '1.38s Generation'
    },
    {
      name: 'BCR-ABL1 T315I',
      disease: 'Chronic Myeloid Leukemia',
      problem: 'Bulky isoleucine acts like a brick in the keyhole (Gatekeeper mutation).',
      solution: 'Adaptive pocket conformer weaves around the brick with zero strain.',
      margin: '760x Healthy Margin',
      pdb: '2E2B',
      time: '1.45s Generation'
    },
    {
      name: 'InhA S315T',
      disease: 'Multi-Drug Resistant Tuberculosis',
      problem: 'Superbug destroys the activating enzyme needed by frontline Isoniazid.',
      solution: 'Direct Enoyl-ACP inhibitor that requires zero bacterial pre-activation.',
      margin: '1,850x Healthy Margin',
      pdb: '2X22',
      time: '1.29s Generation'
    }
  ];

  return (
    <section id="eli5-story" className="py-20 bg-[#FFFDF0] border-b-4 border-black font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Header Banner */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FFE600] border-3 border-black px-4 py-1.5 font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_#000] mb-4">
            <BookOpen className="w-4 h-4 text-black" />
            ELI5 Storybook Mode: Explain Like I am 5
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black uppercase">
            How AETHER-RAMI Works in Plain English
          </h2>
          <p className="mt-3 text-lg text-neutral-800 font-bold max-w-3xl">
            No PhD required. Follow this 6-chapter visual storybook to understand how microscopic locks get jammed, why standard medicines fail, and how our AI dream team builds brand new master keys in under 2 seconds.
          </p>
        </div>

        {/* Chapter Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {chapters.map((ch) => {
            const isActive = activeChapter === ch.num;
            return (
              <button
                key={ch.num}
                onClick={() => setActiveChapter(ch.num)}
                className={`p-3 text-left border-3 border-black transition-all cursor-pointer ${
                  isActive
                    ? `${ch.theme} shadow-[4px_4px_0px_0px_#000] -translate-y-1`
                    : 'bg-white hover:bg-neutral-100 shadow-[2px_2px_0px_0px_#000]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-black text-white px-1.5 py-0.5 rounded-xs">
                    {ch.badge}
                  </span>
                  {ch.icon}
                </div>
                <div className="font-black text-xs text-black truncate">{ch.title}</div>
                <div className="text-[10px] font-bold text-neutral-700 truncate">{ch.tagline}</div>
              </button>
            );
          })}
        </div>

        {/* Main Chapter Content Card */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] p-6 md:p-10 mb-10">
          
          {/* Chapter 1: The Lock & The Key */}
          {activeChapter === 1 && (
            <div className="space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b-3 border-black pb-4">
                <div>
                  <span className="bg-[#FFE600] border-2 border-black px-3 py-1 font-black text-xs uppercase tracking-wider">
                    Chapter 01 of 06
                  </span>
                  <h3 className="text-3xl font-black text-black mt-2">
                    Inside Your Body, Everything Runs on Locks and Keys
                  </h3>
                </div>
                <div className="text-xs font-black bg-neutral-100 border-2 border-black px-3 py-1.5">
                  Concept: Receptor-Ligand Docking
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 text-base font-bold text-neutral-800 leading-relaxed">
                  <p>
                    Imagine your body as a bustling city with trillions of workers called <b>proteins</b>. Some proteins are miniature engines that tell cells when to divide and grow.
                  </p>
                  <p>
                    To turn an engine on or off, nature uses microscopic keys called <b>molecules</b>. When you take a medication (like an antibiotic or a cancer drug), that pill is simply a collection of billions of tiny keys designed to slip perfectly into the engine lock and switch it off.
                  </p>
                  <div className="p-4 bg-[#FFFDF0] border-3 border-black shadow-[3px_3px_0px_0px_#000]">
                    <div className="font-black text-black text-sm uppercase mb-1">The Golden Rule:</div>
                    <div className="text-sm font-semibold text-neutral-700">
                      If the key shape matches the lock down to a fraction of a nanometer, the engine stops and the patient feels better.
                    </div>
                  </div>
                </div>

                {/* Visual Widget: Interactive Lock & Key */}
                <div className="bg-[#FFF8E7] border-3 border-black p-6 shadow-[4px_4px_0px_0px_#000]">
                  <div className="text-xs font-black uppercase tracking-wider text-black mb-3 flex items-center justify-between">
                    <span>Interactive Lock and Key Demonstration</span>
                    <span className="bg-black text-[#FFE600] px-2 py-0.5 text-[10px]">Normal State</span>
                  </div>
                  
                  <div className="h-44 bg-white border-2 border-black flex items-center justify-around p-4 relative overflow-hidden">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-20 bg-[#FFE600] border-3 border-black flex items-center justify-center font-black text-xs text-center shadow-[3px_3px_0px_0px_#000]">
                        Drug Key
                      </div>
                      <span className="text-[10px] font-black mt-1">Medicine</span>
                    </div>

                    <ArrowRight className="w-6 h-6 text-black animate-pulse" />

                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 bg-[#00F0FF] border-3 border-black flex flex-col items-center justify-center font-black text-xs text-center shadow-[3px_3px_0px_0px_#000] relative">
                        <div className="w-8 h-10 bg-white border-2 border-black border-dashed flex items-center justify-center text-[9px]">
                          Keyhole
                        </div>
                        <span className="text-[10px] mt-1">Cancer Engine</span>
                      </div>
                      <span className="text-[10px] font-black mt-1">Protein Target</span>
                    </div>
                  </div>

                  <div className="mt-4 text-xs font-bold text-neutral-700 text-center">
                    Result: Key slips in cleanly. The cancer cell receives the STOP signal.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 2: The Sneaky Lock Jam */}
          {activeChapter === 2 && (
            <div className="space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b-3 border-black pb-4">
                <div>
                  <span className="bg-[#FF5757] text-white border-2 border-black px-3 py-1 font-black text-xs uppercase tracking-wider">
                    Chapter 02 of 06
                  </span>
                  <h3 className="text-3xl font-black text-black mt-2">
                    The Crisis: Cancer Cells Change Their Locks
                  </h3>
                </div>
                <div className="text-xs font-black bg-neutral-100 border-2 border-black px-3 py-1.5">
                  Concept: Mutational Resistance
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 text-base font-bold text-neutral-800 leading-relaxed">
                  <p>
                    Here is the heartbreaking reality that patients and doctors face every day: cancer cells and superbug bacteria multiply rapidly. During reproduction, they make tiny copying mistakes called <b>mutations</b>.
                  </p>
                  <p>
                    Out of millions of cells, one cell accidentally changes a single atomic pin inside the keyhole. It grows a microscopic bump (like the <b>EGFR C797S</b> or <b>BCR-ABL1 T315I</b> gatekeeper).
                  </p>
                  <p>
                    Suddenly, the expensive frontline pill cannot enter the lock anymore. The key bounces off. The engine turns back ON, the tumor regrows, and the doctor runs out of options. This is called <b>drug resistance</b>.
                  </p>
                </div>

                {/* Visual Widget: The Jammed Lock */}
                <div className="bg-[#FFF0F0] border-3 border-black p-6 shadow-[4px_4px_0px_0px_#000]">
                  <div className="text-xs font-black uppercase tracking-wider text-black mb-3 flex items-center justify-between">
                    <span>The Resistance Bump</span>
                    <span className="bg-[#FF5757] text-white px-2 py-0.5 text-[10px]">Lock Jammed</span>
                  </div>
                  
                  <div className="h-44 bg-white border-2 border-black flex items-center justify-around p-4 relative overflow-hidden">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-20 bg-neutral-300 border-3 border-black flex items-center justify-center font-black text-xs text-center line-through opacity-75">
                        Old Key
                      </div>
                      <span className="text-[10px] font-black text-red-600 mt-1">Bounces Off!</span>
                    </div>

                    <div className="text-red-600 font-black text-xl">X</div>

                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 bg-[#FF5757] text-white border-3 border-black flex flex-col items-center justify-center font-black text-xs text-center shadow-[3px_3px_0px_0px_#000] relative">
                        <div className="w-4 h-4 bg-black border border-white rounded-full absolute top-2 right-6" title="Mutation Bump" />
                        <span className="text-[10px]">Mutant Engine</span>
                        <span className="text-[9px] bg-black text-[#FFE600] px-1 mt-1">C797S Bump</span>
                      </div>
                      <span className="text-[10px] font-black text-red-600 mt-1">Active Tumor Growth</span>
                    </div>
                  </div>

                  <div className="mt-4 text-xs font-bold text-neutral-800 text-center">
                    Traditional medicine takes 5 to 10 years to find a new key. Patients cannot wait 10 years.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 3: The 8 AI Master Sculptors */}
          {activeChapter === 3 && (
            <div className="space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b-3 border-black pb-4">
                <div>
                  <span className="bg-[#00F0FF] border-2 border-black px-3 py-1 font-black text-xs uppercase tracking-wider">
                    Chapter 03 of 06
                  </span>
                  <h3 className="text-3xl font-black text-black mt-2">
                    Enter AETHER-RAMI: The 8 AI Master Sculptors
                  </h3>
                </div>
                <div className="text-xs font-black bg-neutral-100 border-2 border-black px-3 py-1.5">
                  Concept: 16.4B Mixture-of-Experts
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 text-base font-bold text-neutral-800 leading-relaxed">
                  <p>
                    Instead of guessing and testing millions of chemicals in a petri dish for years, AETHER-RAMI uses <b>artificial intelligence</b> to look directly at the mutated 3D lock.
                  </p>
                  <p>
                    Imagine 8 world-class master sculptors sitting together. Each sculptor is a neural network specialized in one physical rule: one handles 3D shape, one handles electric charges, one handles flexibility, and one ensures the key can be swallowed as an oral pill.
                  </p>
                  <p>
                    In exactly <b>1.42 seconds</b>, the AI generates a customized, flexible 3D key that curves smoothly around the mutant bump, locking the cancer engine once again!
                  </p>
                </div>

                {/* Visual Widget: AI Evasion Key */}
                <div className="bg-[#E6FAFF] border-3 border-black p-6 shadow-[4px_4px_0px_0px_#000]">
                  <div className="text-xs font-black uppercase tracking-wider text-black mb-3 flex items-center justify-between">
                    <span>AETHER-RAMI 3D Generation</span>
                    <span className="bg-[#00F0FF] text-black px-2 py-0.5 text-[10px] font-black">1.42 Seconds</span>
                  </div>
                  
                  <div className="h-44 bg-white border-2 border-black flex items-center justify-around p-4 relative overflow-hidden">
                    <div className="flex flex-col items-center">
                      <div className="w-18 h-20 bg-[#A6FF00] border-3 border-black flex flex-col items-center justify-center font-black text-xs text-center shadow-[3px_3px_0px_0px_#000] rotate-[-4deg]">
                        <span>AI Key</span>
                        <span className="text-[8px] bg-black text-white px-1 mt-1">Curves Around</span>
                      </div>
                      <span className="text-[10px] font-black text-emerald-700 mt-1">Novel De Novo</span>
                    </div>

                    <ArrowRight className="w-6 h-6 text-black" />

                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 bg-[#00F0FF] border-3 border-black flex flex-col items-center justify-center font-black text-xs text-center shadow-[3px_3px_0px_0px_#000] relative">
                        <div className="w-4 h-4 bg-black rounded-full absolute top-2 right-6" />
                        <span className="text-[10px] font-black">Mutant Engine</span>
                        <span className="text-[9px] bg-emerald-600 text-white px-1 mt-1 font-black">Engine OFF!</span>
                      </div>
                      <span className="text-[10px] font-black text-black mt-1">Tumor Blocked</span>
                    </div>
                  </div>

                  <div className="mt-4 text-xs font-bold text-neutral-800 text-center">
                    Stereochemically verified with 89.4% PoseBusters pass rate and zero atomic clashes.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 4: The Healthy Body Safety Shield */}
          {activeChapter === 4 && (
            <div className="space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b-3 border-black pb-4">
                <div>
                  <span className="bg-[#A6FF00] border-2 border-black px-3 py-1 font-black text-xs uppercase tracking-wider">
                    Chapter 04 of 06
                  </span>
                  <h3 className="text-3xl font-black text-black mt-2">
                    The Safety Shield: Protecting Your Healthy Organs
                  </h3>
                </div>
                <div className="text-xs font-black bg-neutral-100 border-2 border-black px-3 py-1.5">
                  Concept: GTEx In Silico Counter-Screening
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 text-base font-bold text-neutral-800 leading-relaxed">
                  <p>
                    Why do conventional cancer drugs make people lose their hair, feel nauseous, or damage their heart? Because those harsh chemicals are like hammers: they hit bad cells, but they also smash innocent healthy cells.
                  </p>
                  <p>
                    AETHER-RAMI includes a built-in safety guardian. Before any AI-generated key is approved, it is counter-tested across <b>54 healthy human tissues</b> from the NIH GTEx atlas (heart, liver, lungs, brain, kidney).
                  </p>
                  <p>
                    The AI key is specifically engineered to fit <b>only</b> the diseased mutant lock, while slipping completely harmlessly past normal human cells with an average <b>820x therapeutic margin</b>!
                  </p>
                </div>

                {/* Visual Widget: Safety Comparison */}
                <div className="bg-[#F0FFF0] border-3 border-black p-6 shadow-[4px_4px_0px_0px_#000]">
                  <div className="text-xs font-black uppercase tracking-wider text-black mb-3 flex items-center justify-between">
                    <span>Healthy Tissue Selectivity</span>
                    <span className="bg-[#A6FF00] text-black px-2 py-0.5 text-[10px] font-black">Zero Off-Target</span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-white border-2 border-black flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-xs font-black">Cardiac Cells (hERG Channel)</span>
                      </div>
                      <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 border border-emerald-500">
                        SAFE (&gt;1,200x Margin)
                      </span>
                    </div>

                    <div className="p-3 bg-white border-2 border-black flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-black">Liver Hepatocytes (CYP3A4)</span>
                      </div>
                      <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 border border-emerald-500">
                        SAFE (No Toxic Metabolites)
                      </span>
                    </div>

                    <div className="p-3 bg-white border-2 border-black flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-blue-500" />
                        <span className="text-xs font-black">Normal Diploid Lung Epithelium</span>
                      </div>
                      <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 border border-emerald-500">
                        SAFE (100% Wild-Type Spared)
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 text-xs font-bold text-neutral-800 text-center">
                    Patients get maximum tumor destruction with minimal side effects.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 5: Real Battles Won */}
          {activeChapter === 5 && (
            <div className="space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b-3 border-black pb-4">
                <div>
                  <span className="bg-[#FF80DF] border-2 border-black px-3 py-1 font-black text-xs uppercase tracking-wider">
                    Chapter 05 of 06
                  </span>
                  <h3 className="text-3xl font-black text-black mt-2">
                    Real Battles Won: 36 Deadly Diseases Solved
                  </h3>
                </div>
                <div className="text-xs font-black bg-neutral-100 border-2 border-black px-3 py-1.5">
                  Concept: Cross-Disease Generalization
                </div>
              </div>

              <div>
                <p className="text-base font-bold text-neutral-800 leading-relaxed mb-6">
                  AETHER-RAMI is not a theoretical simulation. It has generated stereochemically validated, nanomolar inhibitor leads for 36 catastrophic diseases that have frustrated pharmaceutical labs for decades. Click any case below to inspect its data or load it right into our 3D biotech workbench:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {clinicalCases.map((c, i) => (
                    <div
                      key={i}
                      className="p-4 bg-[#FFFDF0] border-3 border-black shadow-[3px_3px_0px_0px_#000] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-black text-base text-black">{c.name}</span>
                          <span className="text-[10px] font-black bg-[#FFE600] border border-black px-2 py-0.5">
                            {c.pdb}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-neutral-600 mb-2">{c.disease}</div>
                        <div className="text-xs text-neutral-800 font-semibold mb-2">
                          <b>Problem:</b> {c.problem}
                        </div>
                        <div className="text-xs text-neutral-800 font-semibold mb-3">
                          <b>AI Solution:</b> {c.solution}
                        </div>
                      </div>

                      <div className="pt-3 border-t-2 border-neutral-300 flex items-center justify-between">
                        <span className="text-[11px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 border border-emerald-400">
                          {c.margin}
                        </span>
                        {onOpenWorkbench && (
                          <button
                            onClick={onOpenWorkbench}
                            className="inline-flex items-center gap-1 text-xs font-black bg-black text-[#FFE600] px-3 py-1 border border-black hover:bg-neutral-800 cursor-pointer"
                          >
                            Explore 3D <ChevronRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Chapter 6: The Football Dream Team Analogy */}
          {activeChapter === 6 && (
            <div className="space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b-3 border-black pb-4">
                <div>
                  <span className="bg-[#A6FF00] border-2 border-black px-3 py-1 font-black text-xs uppercase tracking-wider">
                    Chapter 06 of 06 • Capstone Defense Story
                  </span>
                  <h3 className="text-3xl font-black text-black mt-2">
                    The Molecular Dream Team: The Football Analogy
                  </h3>
                </div>
                <div className="text-xs font-black bg-black text-[#FFE600] border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_#000]">
                  CS Panel Special Metaphor
                </div>
              </div>

              <div>
                <p className="text-base font-bold text-neutral-800 leading-relaxed mb-6">
                  How does AETHER-RAMI achieve both impossible speed and atomic precision? Imagine building the ultimate footballer: Mbappé speed on the counter, Ronaldo striking power through walls, Messi 3D spatial vision, Beckenbauer sweeping defense, and Neuer slide-tackling every loose ball in goal. Click each player below to see their exact bio-computational counterpart:
                </p>

                {/* Player Selection Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
                  {footballSquad.map((player) => {
                    const isSelected = selectedPlayer === player.id;
                    return (
                      <button
                        key={player.id}
                        onClick={() => setSelectedPlayer(player.id)}
                        className={`p-3 text-left border-3 border-black transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-black text-[#FFE600] shadow-[4px_4px_0px_0px_#FFE600] -translate-y-1'
                            : 'bg-white hover:bg-neutral-100 text-black shadow-[2px_2px_0px_0px_#000]'
                        }`}
                      >
                        <div className="text-2xl mb-1">{player.emoji}</div>
                        <div className="font-black text-xs uppercase tracking-wider truncate">{player.name}</div>
                        <div className={`text-[10px] font-bold truncate ${isSelected ? 'text-white' : 'text-neutral-600'}`}>
                          {player.role}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Player Detail Card */}
                {(() => {
                  const p = footballSquad.find((item) => item.id === selectedPlayer) || footballSquad[0];
                  return (
                    <div className={`p-6 border-3 border-black shadow-[6px_6px_0px_0px_#000] ${p.accent}`}>
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-3 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{p.emoji}</span>
                          <div>
                            <h4 className="text-2xl font-black text-black uppercase">{p.name}</h4>
                            <span className="text-xs font-mono font-black uppercase bg-black text-white px-2 py-0.5">
                              {p.role}
                            </span>
                          </div>
                        </div>
                        <div className="text-xs font-mono font-black bg-white border-2 border-black px-3 py-1">
                          AETHER-RAMI SQUAD
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        <div className="space-y-3">
                          <div className="bg-white border-2 border-black p-3">
                            <span className="font-mono text-[10px] font-black uppercase text-neutral-500 block">Football Trait</span>
                            <p className="font-bold text-black mt-1">{p.footballTrait}</p>
                          </div>
                          <div className="bg-white border-2 border-black p-3">
                            <span className="font-mono text-[10px] font-black uppercase text-neutral-500 block">Biophysical AI Reality</span>
                            <p className="font-bold text-[#2563EB] mt-1">{p.aiEquivalent}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="bg-white border-2 border-black p-3">
                            <span className="font-mono text-[10px] font-black uppercase text-neutral-500 block">Exact Empirical Metric</span>
                            <p className="font-bold text-emerald-700 mt-1">{p.metric}</p>
                          </div>
                          <div className="bg-white border-2 border-black p-3">
                            <span className="font-mono text-[10px] font-black uppercase text-neutral-500 block">Why It Beats Classical Pharma</span>
                            <p className="font-bold text-neutral-800 mt-1">{p.whyItWins}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t-2 border-black flex items-center justify-between">
                        <span className="text-xs font-mono font-black text-black">
                          Verified on FoldBench-2026 & SafeTensors Weight Checkpoint
                        </span>
                        {onOpenWorkbench && (
                          <button
                            onClick={onOpenWorkbench}
                            className="inline-flex items-center gap-2 text-xs font-mono font-black bg-black text-[#FFE600] px-4 py-2 border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-neutral-800 cursor-pointer"
                          >
                            <span>Test Lead in 3D Lab</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })()}

              </div>
            </div>
          )}

          {/* Chapter Bottom Navigation Bar */}
          <div className="flex items-center justify-between pt-6 mt-8 border-t-3 border-black">
            <button
              onClick={() => setActiveChapter((prev) => Math.max(1, prev - 1))}
              disabled={activeChapter === 1}
              className={`inline-flex items-center gap-2 px-4 py-2 border-3 border-black font-black text-xs uppercase ${
                activeChapter === 1
                  ? 'bg-neutral-200 text-neutral-500 border-neutral-400 cursor-not-allowed'
                  : 'bg-white hover:bg-neutral-100 shadow-[3px_3px_0px_0px_#000] cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-4 h-4" /> Previous Chapter
            </button>

            <div className="hidden sm:flex items-center gap-2">
              {chapters.map((ch) => (
                <button
                  key={ch.num}
                  onClick={() => setActiveChapter(ch.num)}
                  className={`w-8 h-8 border-2 border-black font-black text-xs flex items-center justify-center cursor-pointer ${
                    activeChapter === ch.num ? 'bg-black text-white' : 'bg-white text-black hover:bg-neutral-100'
                  }`}
                >
                  {ch.num}
                </button>
              ))}
            </div>

            {activeChapter < 6 ? (
              <button
                onClick={() => setActiveChapter((prev) => Math.min(6, prev + 1))}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFE600] hover:bg-[#FFD700] border-3 border-black font-black text-xs uppercase shadow-[3px_3px_0px_0px_#000] cursor-pointer"
              >
                Next Chapter <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onOpenWorkbench}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#A6FF00] hover:bg-[#92E600] border-3 border-black font-black text-xs uppercase shadow-[3px_3px_0px_0px_#000] cursor-pointer"
              >
                Launch 3D Workbench <ExternalLink className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
