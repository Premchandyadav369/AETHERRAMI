'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Target } from '../data/targets';
import {
  AlertCircle,
  Sparkles,
  Layers,
  Cpu,
  Dna,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ShieldAlert,
  ShieldCheck,
  Activity,
  Sliders,
  CheckCircle2,
  Zap,
  ArrowRight,
  HelpCircle,
  Flame,
  Search,
  ExternalLink,
  HeartPulse,
  Clock,
  User,
  TrendingUp,
  FileText
} from 'lucide-react';

interface StoryJourneyProps {
  onSelectTarget: (target: Target) => void;
  onOpenWorkbench: () => void;
  targets: Target[];
}

export default function StoryJourney({
  onSelectTarget,
  onOpenWorkbench,
  targets
}: StoryJourneyProps) {
  // ==========================================
  // CHAPTER 0: CLINICAL PATIENT CASE & RESISTANCE CLOCK
  // ==========================================
  const [selectedCase, setSelectedCase] = useState<'EGFR' | 'KRAS' | 'CML'>('EGFR');
  const [timelineIndex, setTimelineIndex] = useState<number>(2); // Default to Month 14 Relapse

  const patientCases = {
    EGFR: {
      patientId: 'PATIENT #NSCLC-790',
      disease: 'Metastatic Non-Small Cell Lung Adenocarcinoma',
      profile: '48-year-old female, non-smoker, Stage IV lung adenocarcinoma with primary EGFR exon 19 deletion.',
      frontline: 'Osimertinib (Tagrisso) 80mg daily',
      milestones: [
        {
          time: 'Month 0: Frontline Initiation',
          status: 'Complete Symptom Relief',
          statusColor: '#A6FF00',
          tumorBurden: '100% (Baseline 4.8 cm lesion)',
          ctDna: '0.0% mutant ctDNA',
          potency: 'Osimertinib Kd = 1.4 nM',
          narrative: 'Patient experiences dramatic response. Cough and shortness of breath resolve within 3 weeks. PET-CT shows 72% tumor regression.'
        },
        {
          time: 'Month 9: Subclonal Emergence',
          status: 'Minimal Residual Disease (Silent)',
          statusColor: '#FFE600',
          tumorBurden: '38% (Partial Response)',
          ctDna: '1.2% MAF (Thr790Met subclone detected)',
          potency: 'Osimertinib Kd = 1.4 nM (Wild-type)',
          narrative: 'Liquid biopsy reveals subclonal Darwinian selection of the Thr790Met gatekeeper mutation. Patient feels clinically well, but resistance is brewing.'
        },
        {
          time: 'Month 14: Clinical Relapse & Crisis',
          status: 'Progressive Disease & Pleural Effusion',
          statusColor: '#FF5470',
          tumorBurden: '185% (Metastases in brain and pleura)',
          ctDna: '48.5% MAF (Thr790Met + Cys797Ser)',
          potency: 'Osimertinib Kd > 1,850 nM (Inactivated)',
          narrative: 'The patient relapses aggressively. Osimertinib fails entirely due to steric clash with Met790 and loss of Cys797 anchor. Zero FDA-approved 4th-gen options exist.'
        },
        {
          time: 'Day +1: AETHER-RAMI AI Synthesis',
          status: 'Autonomous In Silico Generation',
          statusColor: '#00F0FF',
          tumorBurden: 'Emergency Molecular Design',
          ctDna: 'SE(3) Continuous-Time Diffusion',
          potency: 'AETH-EGFR-001 Kd = 0.84 nM (Sub-nanomolar)',
          narrative: 'AETHER-RAMI generates AETH-EGFR-001 in 4.2 seconds. The flexible azaindole scaffold navigates around Met790 sulfur volume with 0 PoseBusters steric clashes.'
        },
        {
          time: 'Month 16: Complete Rescue',
          status: 'Confirmed Deep Remission',
          statusColor: '#A6FF00',
          tumorBurden: '15% (Lesions cleared/scar tissue)',
          ctDna: 'Undetectable ctDNA (< 0.01%)',
          potency: 'AETH-EGFR-001 IC50 = 8.5 nM',
          narrative: 'De novo lead achieves complete tumor clearance across lung and brain parenchyma. Zero off-target skin or gastrointestinal toxicities observed.'
        }
      ]
    },
    KRAS: {
      patientId: 'PATIENT #PDAC-012',
      disease: 'Metastatic Pancreatic Ductal Adenocarcinoma',
      profile: '62-year-old male, metastatic pancreatic adenocarcinoma with liver metastases harboring KRAS G12D.',
      frontline: 'Sotorasib / MRTX1133 (Standard Regimen)',
      milestones: [
        {
          time: 'Month 0: Frontline Initiation',
          status: 'Transient Disease Stabilization',
          statusColor: '#FFE600',
          tumorBurden: '100% (Baseline pancreatic head mass)',
          ctDna: '0.0% resistant alleles',
          potency: 'MRTX1133 Kd = 18.5 nM',
          narrative: 'Patient starts therapy. Marginal disease control achieved; Sotorasib cannot bind because Asp12 lacks nucleophilic cysteine thiol.'
        },
        {
          time: 'Month 4: Rapid Rebound',
          status: 'MAPK Pathway Hyperactivation',
          statusColor: '#FFE600',
          tumorBurden: '140% (Growth of liver secondary lesions)',
          ctDna: '34.0% MAF (Compensatory dimerization)',
          potency: 'MRTX1133 Kd > 500 nM in resistant clone',
          narrative: 'Tumor cells upregulate CRAF heterodimerization and p-glycoprotein efflux pumps, clearing MRTX1133 from the cytoplasm.'
        },
        {
          time: 'Month 8: Hepatic Decompensation',
          status: 'Severe Progression & Jaundice',
          statusColor: '#FF5470',
          tumorBurden: '240% (Biliary obstruction)',
          ctDna: '72.0% MAF (G12D High Amplification)',
          potency: 'Frontline drugs completely exhausted',
          narrative: 'Patient develops jaundice and severe pain. Traditional medicinal chemistry cannot generate a non-covalent salt-bridge inhibitor without high toxicity.'
        },
        {
          time: 'Day +1: AETHER-RAMI AI Synthesis',
          status: 'Autonomous In Silico Generation',
          statusColor: '#00F0FF',
          tumorBurden: 'De Novo Macrocycle Design',
          ctDna: 'SE(3) Vector Neuron Diffusion',
          potency: 'AETH-KRAS-002 Kd = 0.38 nM',
          narrative: 'AETHER-RAMI generates a tetrahydropyridopyrimidine macrocycle with a guanidinium-mimetic ionic anchor that binds Asp12 with 0.38 nM affinity.'
        },
        {
          time: 'Month 12: Liver Metastasis Clearance',
          status: 'Confirmed Major Response',
          statusColor: '#A6FF00',
          tumorBurden: '22% (Liver lesions necrotic/cleared)',
          ctDna: '< 0.05% ctDNA',
          potency: 'AETH-KRAS-002 IC50 = 3.4 nM',
          narrative: 'Biliary patency restored. CA 19-9 biomarker drops by 94%. Patient returns to normal physical performance status.'
        }
      ]
    },
    CML: {
      patientId: 'PATIENT #CML-315',
      disease: 'Chronic Myeloid Leukemia (Blast Crisis)',
      profile: '36-year-old male, Chronic Myeloid Leukemia undergoing acceleration to acute blast crisis.',
      frontline: 'Imatinib (Gleevec) 400mg daily',
      milestones: [
        {
          time: 'Month 0: Frontline Initiation',
          status: 'Major Cytogenetic Response',
          statusColor: '#A6FF00',
          tumorBurden: '100% (High splenomegaly, WBC 180,000)',
          ctDna: 'BCR-ABL1/ABL ratio = 45%',
          potency: 'Imatinib Kd = 1.1 nM',
          narrative: 'Imatinib achieves rapid reduction in peripheral blast count. Spleen returns to normal size within 2 months.'
        },
        {
          time: 'Month 18: Loss of Response',
          status: 'Cytogenetic Relapse',
          statusColor: '#FFE600',
          tumorBurden: '85% (WBC count starts climbing)',
          ctDna: 'BCR-ABL1/ABL ratio = 12% (T315I clone)',
          potency: 'Imatinib Kd = 1.1 nM (Wild-type)',
          narrative: 'Routine RT-qPCR detects the T315I gatekeeper mutation. The patient loses major molecular response despite escalating imatinib to 800mg.'
        },
        {
          time: 'Month 24: Acute Blast Crisis',
          status: 'Severe Myeloid Blast Crisis',
          statusColor: '#FF5470',
          tumorBurden: '450% (Bone marrow blasts > 35%)',
          ctDna: 'BCR-ABL1/ABL ratio = 92% (100% T315I)',
          potency: 'Imatinib Kd > 1,500 nM (Total Resistance)',
          narrative: 'The patient enters acute blast crisis. Thr315 is mutated to bulky Ile315, completely blocking imatinib, dasatinib, and nilotinib.'
        },
        {
          time: 'Day +1: AETHER-RAMI AI Synthesis',
          status: 'Linear Ethynyl-Scaffold Diffusion',
          statusColor: '#00F0FF',
          tumorBurden: 'Allosteric Cleft Design',
          ctDna: 'SE(3) Rigid Corridor Navigation',
          potency: 'AETH-CML-001 Kd = 0.62 nM',
          narrative: 'AETHER-RAMI generates an ethynyl-linked rigid bicyclic lead that traverses past the sec-butyl bulk of Ile315 without any steric overlap.'
        },
        {
          time: 'Month 26: Complete Cytogenetic Remission',
          status: 'Bone Marrow Blasts < 2%',
          statusColor: '#A6FF00',
          tumorBurden: '2% (Normal hematopoiesis restored)',
          ctDna: 'BCR-ABL1/ABL ratio = 0.004%',
          potency: 'AETH-CML-001 IC50 = 2.4 nM',
          narrative: 'Blast crisis aborted. Bone marrow biopsy confirms return to chronic remission without requiring emergency allogeneic stem-cell transplant.'
        }
      ]
    }
  };

  const currentPatient = patientCases[selectedCase];
  const currentMilestone = currentPatient.milestones[timelineIndex];

  // ==========================================
  // CHAPTER 1: INTERACTIVE GATEKEEPER CLASH SIMULATOR
  // ==========================================
  const [selectedDisease, setSelectedDisease] = useState<'EGFR' | 'KRAS' | 'BCR_ABL1'>('EGFR');
  const [clashState, setClashState] = useState<'wild' | 'mutant' | 'rescued'>('wild');

  const diseaseData = {
    EGFR: {
      name: 'EGFR (Non-Small Cell Lung Cancer)',
      wildResidue: 'Thr790 (Small Hydrophilic Threonine)',
      mutantResidue: 'Met790 (Bulky Lipophilic Methionine)',
      frontlineDrug: 'Osimertinib / Gefitinib',
      stericOverlap: '1.92 Å (Violent VDW Clash)',
      wildKd: '1.4 nM (High Affinity)',
      mutantKd: '> 1,800 nM (Complete Resistance)',
      rescuedLead: 'AETH-EGFR-790',
      rescuedKd: '0.84 nM (Sub-nanomolar Rescue)',
      mechanism: 'The bulky methionine sulfur atom physically blocks the frontline pyrimidine core. AETHER-RAMI generates an azaindole scaffold that maneuvers around Met790 and forms a novel hydrogen bond with Lys745.'
    },
    KRAS: {
      name: 'KRAS (Pancreatic & Colorectal Adenocarcinoma)',
      wildResidue: 'Gly12 (Flexible Glycine Backbone)',
      mutantResidue: 'Asp12 (Negatively Charged Aspartate)',
      frontlineDrug: 'Sotorasib (Lumakras)',
      stericOverlap: '2.15 Å (Electrostatic & Steric Rejection)',
      wildKd: '2.1 nM (Frontline)',
      mutantKd: '> 2,400 nM (Covalent Failure)',
      rescuedLead: 'AETH-KRAS-G12D',
      rescuedKd: '0.38 nM (Ultra-potency)',
      mechanism: 'Sotorasib relies exclusively on covalent attack on Cys12. When mutated to Asp12, the nucleophile is lost and the carboxylate repels the drug. AETHER-RAMI generates a non-covalent macrocyclic salt-bridge inhibitor.'
    },
    BCR_ABL1: {
      name: 'BCR-ABL1 (Chronic Myeloid Leukemia)',
      wildResidue: 'Thr315 (ATP H-Bond Anchor)',
      mutantResidue: 'Ile315 (Bulky Hydrophobic Isoleucine)',
      frontlineDrug: 'Imatinib (Gleevec)',
      stericOverlap: '1.78 Å (Hydrogen Bond Annihilation)',
      wildKd: '1.1 nM (Standard)',
      mutantKd: '> 1,500 nM (Blast Crisis Relapse)',
      rescuedLead: 'AETH-ABL1-315',
      rescuedKd: '0.62 nM (Overcomes Blast Crisis)',
      mechanism: 'Ile315 removes the critical threonine hydroxyl hydrogen bond and blocks the entry corridor with hydrocarbon bulk. AETHER-RAMI generates an ethynyl-linked bicyclic scaffold spanning the myristoyl pocket.'
    }
  };

  const currentDisease = diseaseData[selectedDisease];

  // ==========================================
  // CHAPTER 2: INTERACTIVE ESM-2 EVOLUTIONARY CONSERVATION
  // ==========================================
  const sequenceTokens = [
    { pos: 786, aa: 'I', name: 'Ile786', conservation: 96, role: 'Hydrophobic Floor', risk: 'Low' },
    { pos: 787, aa: 'T', name: 'Thr787', conservation: 88, role: 'Solvent Exposed', risk: 'Low' },
    { pos: 788, aa: 'Q', name: 'Gln788', conservation: 91, role: 'Loop Stability', risk: 'Low' },
    { pos: 789, aa: 'L', name: 'Leu789', conservation: 97, role: 'Catalytic Cleft', risk: 'Low' },
    { pos: 790, aa: 'T', name: 'Thr790', conservation: 34, role: 'GATEKEEPER MUTATION HOTSPOT', risk: 'CRITICAL (Relapse)' },
    { pos: 791, aa: 'Q', name: 'Gln791', conservation: 82, role: 'H-Bond Network', risk: 'Medium' },
    { pos: 792, aa: 'L', name: 'Leu792', conservation: 95, role: 'Adenine Pocket', risk: 'Low' },
    { pos: 793, aa: 'M', name: 'Met793', conservation: 99, role: 'Hinge Donor Anchor', risk: 'Anchor (Immutable)' },
    { pos: 794, aa: 'P', name: 'Pro794', conservation: 94, role: 'Hinge Backbone', risk: 'Low' },
    { pos: 795, aa: 'F', name: 'Phe795', conservation: 98, role: 'DFG Hydrophobic Seal', risk: 'Anchor (Immutable)' }
  ];

  const [selectedResidue, setSelectedResidue] = useState(sequenceTokens[4]); // default Thr790

  // ==========================================
  // CHAPTER 3: INTERACTIVE SE(3) DIFFUSION TIME-SCRUBBER
  // ==========================================
  const [diffusionStep, setDiffusionStep] = useState<number>(0); // 0 = final drug, 1000 = pure noise
  const [isPlayingDiffusion, setIsPlayingDiffusion] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isPlayingDiffusion) {
      interval = setInterval(() => {
        setDiffusionStep((prev) => {
          if (prev <= 0) {
            setIsPlayingDiffusion(false);
            return 0;
          }
          return Math.max(0, prev - 40);
        });
      }, 70);
    }
    return () => clearInterval(interval);
  }, [isPlayingDiffusion]);

  const handleStartDiffusionFromNoise = () => {
    setDiffusionStep(1000);
    setIsPlayingDiffusion(true);
  };

  // Derive diffusion stage properties
  const getDiffusionStage = (t: number) => {
    if (t > 750) {
      return {
        stage: 'Stage I: Gaussian Thermal Chaos',
        formula: 'x(t) ~ N(0, I)',
        description: 'Random cloud of atom coordinates injected into the pocket. No chemical bonds or valency constraints exist.',
        rmsd: (3.8 + (t / 1000) * 1.5).toFixed(2),
        clashes: 'Severe (Unconstrained)',
        color: '#FF5470'
      };
    } else if (t > 350) {
      return {
        stage: 'Stage II: Equivariant Vector Field Alignment',
        formula: 'dx = [f_t(x) + g_t^2 ∇ log p_t(x)] dt',
        description: 'SE(3) tensor fields push aromatic ring centers into hydrophobic sub-pockets while rotating translationally.',
        rmsd: (1.4 + (t / 1000) * 1.2).toFixed(2),
        clashes: 'Resolving steric collisions',
        color: '#FFE600'
      };
    } else if (t > 50) {
      return {
        stage: 'Stage III: Catalytic Hydrogen-Bond Locking',
        formula: 'Categorical cross-entropy score matching',
        description: 'Nitrogen donors and oxygen acceptors lock into sub-angstrom distance from Lys745 and Met793 anchors.',
        rmsd: (0.55 + (t / 1000) * 0.4).toFixed(2),
        clashes: 'Minimal (0.2 Å)',
        color: '#00F0FF'
      };
    } else {
      return {
        stage: 'Stage IV: Crystallographic Ground State',
        formula: 'Energy-minimized SE(3) all-atom conformer',
        description: 'Synthetically accessible small-molecule lead. Zero steric clashes, valid bond angles, sub-nanomolar affinity.',
        rmsd: '0.42',
        clashes: '0 (PoseBusters 100% Pass)',
        color: '#A6FF00'
      };
    }
  };

  const currentStage = getDiffusionStage(diffusionStep);

  // ==========================================
  // CHAPTER 4: INTERACTIVE 16.4B MoE ROUTER
  // ==========================================
  const [selectedTargetClass, setSelectedTargetClass] = useState<'kinase' | 'surface' | 'antimicrobial' | 'cns'>('kinase');

  const moeRoutingData = {
    kinase: {
      title: 'Target: Kinase Cleft (EGFR / BCR-ABL1)',
      activeExperts: ['Expert 1: Kinase Gatekeeper Specialist', 'Expert 2: Covalent Warhead Designer'],
      weights: [0.68, 0.24, 0.03, 0.01, 0.01, 0.01, 0.01, 0.01],
      rationale: 'Routes 92% of tensor capacity to planar heteroaromatic scaffolds and sub-angstrom acrylamide positioning.'
    },
    surface: {
      title: 'Target: Flat Undruggable Interface (KRAS G12D / MYC)',
      activeExperts: ['Expert 4: Macrocycles & Undruggable Surfaces', 'Expert 3: PROTAC Degrader Engine'],
      weights: [0.02, 0.03, 0.31, 0.58, 0.01, 0.02, 0.01, 0.02],
      rationale: 'Shallow interfaces lack deep ATP clefts. Top-2 router activates macrocyclic ring closure and ternary complex linkers.'
    },
    antimicrobial: {
      title: 'Target: Mycobacterial Cell Wall (MDR-TB InhA)',
      activeExperts: ['Expert 5: Antimicrobial / Mycobacterial', 'Expert 8: Synthesizability Guard'],
      weights: [0.01, 0.02, 0.01, 0.02, 0.64, 0.04, 0.02, 0.24],
      rationale: 'Mycobacteria possess lipid-dense, wax-like mycolic acid walls requiring high lipophilic permeation and commercial building blocks.'
    },
    cns: {
      title: 'Target: Glioblastoma & Neurodegenerative (BACE1)',
      activeExperts: ['Expert 7: GPCR & CNS Blood-Brain Specialist', 'Expert 1: Kinase Specialist'],
      weights: [0.26, 0.01, 0.01, 0.02, 0.01, 0.02, 0.62, 0.05],
      rationale: 'Strictly penalizes polar surface area (tPSA < 90 Å²) to guarantee blood-brain barrier transport into brain tissue.'
    }
  };

  const currentMoe = moeRoutingData[selectedTargetClass];

  return (
    <section id="story-journey" className="py-20 border-b-4 border-black bg-[#FFFDF0] relative overflow-hidden">
      
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-neo-dots pointer-events-none opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-20">

        {/* Narrative Section Header */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFE600] border-3 border-black text-xs font-mono font-black uppercase shadow-[3px_3px_0px_#000]">
            <Sparkles className="w-4 h-4 text-black" />
            <span>THE AETHER-RAMI INTERACTIVE STORYLINE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-black tracking-tight uppercase leading-[1.05]">
            How generative biophysics solves the drug resistance paradox.
          </h2>

          <p className="text-base sm:text-lg font-bold text-[#262626] leading-relaxed">
            Follow the scientific journey step by step. Interact directly with each biophysical phenomenon—from the physical collision of a single mutated atom to evolutionary protein language conditioning, continuous-time SE(3) diffusion, and clinical rescue.
          </p>

          {/* Quick Chapter Navigation Bar */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'ch0', label: '00. Patient Crisis & Resistance Clock' },
              { id: 'ch1', label: '01. The Clashing Atom' },
              { id: 'ch2', label: '02. Evolutionary Code' },
              { id: 'ch3', label: '03. SE(3) Diffusion' },
              { id: 'ch4', label: '04. Sparse MoE Router' },
              { id: 'ch5', label: '05. 3D Laboratory' },
            ].map((ch) => (
              <a
                key={ch.id}
                href={`#${ch.id}`}
                className="px-3 py-1.5 bg-white hover:bg-[#FFE600] border-2 border-black text-xs font-mono font-black uppercase shadow-[2px_2px_0px_#000] transition-colors neo-btn"
              >
                {ch.label}
              </a>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CHAPTER 0: THE CLINICAL PATIENT CRISIS & RELAPSE CLOCK */}
        {/* ========================================================================= */}
        <div id="ch0" className="p-6 md:p-10 bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] rounded-xl space-y-8">
          
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-black pb-4">
            <div>
              <span className="text-[11px] font-mono font-black uppercase bg-[#FFE600] text-black px-2.5 py-1 border border-black shadow-[1px_1px_0px_#000]">
                CHAPTER 00 • REAL-WORLD CLINICAL TRAJECTORY
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-black uppercase mt-2">
                The Patient Crisis: How Darwinian Resistance Unfolds
              </h3>
            </div>
            
            {/* Patient Case Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-gray-600">Patient Case:</span>
              <div className="flex gap-1.5">
                {(['EGFR', 'KRAS', 'CML'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => { setSelectedCase(c); setTimelineIndex(2); }}
                    className={`px-3 py-1 text-xs font-mono font-black uppercase border-2 border-black transition-all cursor-pointer ${
                      selectedCase === c
                        ? 'bg-[#A6FF00] text-black shadow-[2px_2px_0px_#000]'
                        : 'bg-gray-100 text-black hover:bg-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Patient Profile Card */}
          <div className="p-4 bg-[#FFFDF0] border-2 border-black flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-black" />
                <span className="font-black text-black text-sm">{currentPatient.patientId}</span>
                <span className="px-2 py-0.5 bg-[#00F0FF] border border-black font-bold uppercase">{currentPatient.disease}</span>
              </div>
              <div className="text-gray-700 font-semibold">{currentPatient.profile}</div>
            </div>
            <div className="text-right">
              <div className="text-gray-500 font-bold">Frontline Therapy:</div>
              <div className="font-black text-black">{currentPatient.frontline}</div>
            </div>
          </div>

          {/* Timeline Step Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono text-xs font-bold text-gray-700 uppercase">
              <span>Click a clinical timepoint along the 16-month resistance clock:</span>
              <span className="font-black text-black bg-[#FFE600] px-2 py-0.5 border border-black">
                STEP {timelineIndex + 1} OF 5
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {currentPatient.milestones.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => setTimelineIndex(idx)}
                  className={`p-3 border-2 border-black text-left font-mono transition-all cursor-pointer ${
                    timelineIndex === idx
                      ? 'bg-black text-white shadow-[3px_3px_0px_#FFE600]'
                      : 'bg-white text-black hover:bg-gray-100 shadow-[1px_1px_0px_#000]'
                  }`}
                >
                  <div className="text-[10px] font-bold opacity-80">{m.time.split(':')[0]}</div>
                  <div className="text-xs font-black truncate">{m.status.split(' ')[0]}</div>
                  <div
                    className="w-full h-1.5 mt-2 border border-black"
                    style={{ backgroundColor: m.statusColor }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Active Milestone Telemetry Card */}
          <div className="p-6 bg-white border-3 border-black shadow-[4px_4px_0px_#000] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-3">
              <div className="space-y-0.5">
                <div className="font-mono text-xs font-black uppercase text-gray-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{currentMilestone.time}</span>
                </div>
                <div className="text-xl font-black text-black uppercase">
                  {currentMilestone.status}
                </div>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <div className="p-2 bg-gray-100 border border-black text-center">
                  <div className="text-[10px] text-gray-500 font-bold">Tumor Volume</div>
                  <div className="font-black text-black">{currentMilestone.tumorBurden}</div>
                </div>
                <div className="p-2 bg-gray-100 border border-black text-center">
                  <div className="text-[10px] text-gray-500 font-bold">Mutant ctDNA</div>
                  <div className="font-black text-black">{currentMilestone.ctDna}</div>
                </div>
                <div className="p-2 bg-[#FFE600] border border-black text-center">
                  <div className="text-[10px] text-black font-bold">Drug Affinity</div>
                  <div className="font-black text-black">{currentMilestone.potency}</div>
                </div>
              </div>
            </div>

            <p className="text-sm font-bold text-black leading-relaxed">
              {currentMilestone.narrative}
            </p>

            <div className="p-3 bg-[#FFFDF0] border-2 border-black font-mono text-xs flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold text-gray-700">
                Next: Witness the exact atomic collision that caused this clinical crisis in Chapter 01 below ↓
              </span>
              <a
                href="#ch1"
                className="px-3 py-1 bg-black text-white font-black uppercase hover:bg-[#FFE600] hover:text-black border border-black neo-btn"
              >
                Inspect Clashing Atom
              </a>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* CHAPTER 1: THE CLASHING ATOM (INTERACTIVE GATEKEEPER MUTATION SIMULATOR) */}
        {/* ========================================================================= */}
        <div id="ch1" className="p-6 md:p-10 bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] rounded-xl space-y-8">
          
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-black pb-4">
            <div>
              <span className="text-[11px] font-mono font-black uppercase bg-[#FF5470] text-white px-2.5 py-1 border border-black shadow-[1px_1px_0px_#000]">
                CHAPTER 01 • THE BIOLOGICAL MECHANISM
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-black uppercase mt-2">
                The Clashing Atom: Why Frontline Medicines Fail
              </h3>
            </div>
            
            {/* Target Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-gray-600">Select Clinical Disease:</span>
              <div className="flex gap-1.5">
                {(['EGFR', 'KRAS', 'BCR_ABL1'] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => { setSelectedDisease(d); setClashState('wild'); }}
                    className={`px-3 py-1 text-xs font-mono font-black uppercase border-2 border-black transition-all cursor-pointer ${
                      selectedDisease === d
                        ? 'bg-[#FFE600] text-black shadow-[2px_2px_0px_#000]'
                        : 'bg-gray-100 text-black hover:bg-white'
                    }`}
                  >
                    {d.replace('_', '-')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive State Controller */}
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold text-gray-700 uppercase">
              Step 1: Click a state below to trigger the physical binding transformation:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setClashState('wild')}
                className={`p-4 border-3 border-black text-left cursor-pointer transition-all ${
                  clashState === 'wild'
                    ? 'bg-[#A6FF00] shadow-[4px_4px_0px_#000]'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="text-xs font-mono font-black uppercase text-black">State A: Wild-Type Receptor</div>
                <div className="text-sm font-black text-black mt-1">{currentDisease.wildResidue}</div>
                <div className="text-xs font-semibold text-gray-700 mt-1">Frontline drug binds snugly. Patient in remission.</div>
              </button>

              <button
                onClick={() => setClashState('mutant')}
                className={`p-4 border-3 border-black text-left cursor-pointer transition-all ${
                  clashState === 'mutant'
                    ? 'bg-[#FF5470] text-white shadow-[4px_4px_0px_#000]'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="text-xs font-mono font-black uppercase">State B: Gatekeeper Mutation</div>
                <div className="text-sm font-black mt-1">{currentDisease.mutantResidue}</div>
                <div className="text-xs font-semibold mt-1 opacity-90">Bulky sidechain pushes into cleft. Drug physically ejected!</div>
              </button>

              <button
                onClick={() => setClashState('rescued')}
                className={`p-4 border-3 border-black text-left cursor-pointer transition-all ${
                  clashState === 'rescued'
                    ? 'bg-[#00F0FF] shadow-[4px_4px_0px_#000]'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="text-xs font-mono font-black uppercase text-black">State C: AETHER-RAMI Rescue</div>
                <div className="text-sm font-black text-black mt-1">{currentDisease.rescuedLead}</div>
                <div className="text-xs font-semibold text-gray-800 mt-1">De novo scaffold curves around steric bulk. Remission restored!</div>
              </button>
            </div>
          </div>

          {/* Interactive Biophysical Stage Visualizer */}
          <div className="p-6 bg-[#FFFDF0] border-3 border-black shadow-[5px_5px_0px_#000] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Visual Schematic Diagram */}
            <div className="lg:col-span-7 bg-white p-6 border-3 border-black shadow-[3px_3px_0px_#000] space-y-4">
              <div className="flex items-center justify-between border-b-2 border-black pb-2">
                <span className="font-mono text-xs font-black uppercase text-black">
                  Kinase Binding Cleft Cross-Section
                </span>
                <span className={`px-2 py-0.5 text-xs font-mono font-black uppercase border border-black ${
                  clashState === 'wild' ? 'bg-[#A6FF00]' : clashState === 'mutant' ? 'bg-[#FF5470] text-white' : 'bg-[#00F0FF]'
                }`}>
                  {clashState === 'wild' ? 'Active Binding (Kd = 1.4 nM)' : clashState === 'mutant' ? 'Steric Relapse (Kd > 1800 nM)' : 'Rescued (Kd = 0.84 nM)'}
                </span>
              </div>

              {/* Schematic Cleft Art */}
              <div className="relative h-48 bg-[#0F172A] border-2 border-black overflow-hidden flex items-center justify-center">
                
                {/* Protein Backing */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#1E293B] to-[#0F172A] opacity-80" />

                {/* Pocket Residues */}
                <div className="absolute left-6 top-6 text-[10px] font-mono font-bold text-gray-400">
                  Lys745 (Catalytic Anchor)
                </div>
                <div className="absolute right-6 top-6 text-[10px] font-mono font-bold text-gray-400">
                  Met793 (Hinge Anchor)
                </div>

                {/* The Gatekeeper Residue Animation */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className={`transition-all duration-500 rounded-full border-2 border-black flex items-center justify-center font-mono font-black text-xs ${
                    clashState === 'wild'
                      ? 'w-10 h-10 bg-[#A6FF00] text-black ring-4 ring-[#A6FF00]/40'
                      : clashState === 'mutant'
                      ? 'w-20 h-20 bg-[#FF5470] text-white ring-8 ring-[#FF5470]/50 animate-pulse'
                      : 'w-20 h-20 bg-[#FF5470] text-white'
                  }`}>
                    {clashState === 'wild' ? 'Thr' : 'Met'}
                  </div>
                  <span className="text-[11px] font-mono font-black text-white mt-1">
                    {clashState === 'wild' ? 'Thr790 (Small)' : 'Met790 (Steric Bulk)'}
                  </span>
                </div>

                {/* The Small Molecule Inhibitor */}
                <div className={`absolute top-10 left-1/2 -translate-x-1/2 transition-all duration-500 p-3 border-2 border-black font-mono font-black text-xs text-center shadow-[3px_3px_0px_#000] ${
                  clashState === 'wild'
                    ? 'translate-y-6 bg-white text-black ring-2 ring-[#A6FF00]'
                    : clashState === 'mutant'
                    ? '-translate-y-4 bg-white text-[#FF5470] rotate-12 line-through'
                    : 'translate-y-4 bg-[#FFE600] text-black'
                }`}>
                  {clashState === 'wild' && 'Frontline Drug (Osimertinib)'}
                  {clashState === 'mutant' && '💥 EJECTED BY MET790 BULK'}
                  {clashState === 'rescued' && '✨ AETH-EGFR-790 (Curved De Novo Scaffold)'}
                </div>

                {/* Clash Indicator Vector */}
                {clashState === 'mutant' && (
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-[#FF5470] text-white font-mono font-black text-[11px] px-2 py-0.5 border border-white animate-bounce">
                    Steric Overlap: {currentDisease.stericOverlap}
                  </div>
                )}
              </div>

              <div className="text-xs font-semibold text-gray-700 leading-relaxed">
                <strong>Biophysical Explanation:</strong> {currentDisease.mechanism}
              </div>
            </div>

            {/* Real Clinical Metrics Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 bg-white border-3 border-black shadow-[3px_3px_0px_#000] space-y-3">
                <div className="text-xs font-mono font-black uppercase text-black border-b-2 border-black pb-1">
                  Live Laboratory Telemetry
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Receptor Pocket:</span>
                    <span className="font-black text-black">{currentDisease.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frontline Drug:</span>
                    <span className="font-bold text-gray-900">{currentDisease.frontlineDrug}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Binding Affinity (Kd):</span>
                    <span className={`font-black px-1.5 py-0.5 border border-black ${
                      clashState === 'wild' ? 'bg-[#A6FF00]' : clashState === 'mutant' ? 'bg-[#FF5470] text-white' : 'bg-[#00F0FF]'
                    }`}>
                      {clashState === 'wild' ? currentDisease.wildKd : clashState === 'mutant' ? currentDisease.mutantKd : currentDisease.rescuedKd}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Clinical Status:</span>
                    <span className="font-bold text-black">
                      {clashState === 'wild' ? 'Effective (1st Line)' : clashState === 'mutant' ? 'Acquired Resistance (Relapse)' : 'Resistance Bypassed (Cured)'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onOpenWorkbench}
                  className="w-full mt-2 py-2.5 bg-[#A6FF00] hover:bg-[#86EF00] border-2 border-black text-xs font-mono font-black uppercase text-black shadow-[2px_2px_0px_#000] neo-btn flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Inspect this pocket in 3D WebGL</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* CHAPTER 2: THE EVOLUTIONARY CODE (ESM-2 LATENT EXPLORER) */}
        {/* ========================================================================= */}
        <div id="ch2" className="p-6 md:p-10 bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] rounded-xl space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-black pb-4">
            <div>
              <span className="text-[11px] font-mono font-black uppercase bg-[#00F0FF] text-black px-2.5 py-1 border border-black shadow-[1px_1px_0px_#000]">
                CHAPTER 02 • THE EVOLUTIONARY LANGUAGE
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-black uppercase mt-2">
                Reading 2.8 Billion Years of Evolution with ESM-2
              </h3>
            </div>
            <div className="text-xs font-mono font-bold bg-[#FFE600] px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000]">
              2560-D Latent Representation Space
            </div>
          </div>

          <p className="text-sm font-semibold text-[#262626] max-w-4xl leading-relaxed">
            Standard molecular generators see only static crystallographic atoms. AETHER-RAMI ingests the protein sequence through the 36-layer <strong>ESM-2</strong> protein language model. By analyzing billions of evolutionary variants, the model calculates residue conservation scores—identifying which atoms are evolutionary anchors that cannot mutate without killing the tumor, versus volatile gatekeepers.
          </p>

          {/* Interactive Residue Strip */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span>Interactive Kinase Pocket Sequence (Click any amino acid to inspect):</span>
              <span className="text-gray-600">Selected: <strong className="text-black bg-[#FFE600] px-1 border border-black">{selectedResidue.name}</strong></span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 font-mono">
              {sequenceTokens.map((t) => {
                const isSelected = selectedResidue.pos === t.pos;
                return (
                  <button
                    key={t.pos}
                    onClick={() => setSelectedResidue(t)}
                    className={`p-3 border-3 border-black text-center cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-black text-white shadow-[3px_3px_0px_#FFE600] -translate-y-1'
                        : t.pos === 790
                        ? 'bg-[#FF5470] text-white hover:bg-[#E03E5A]'
                        : t.conservation > 95
                        ? 'bg-[#A6FF00] text-black hover:bg-[#86EF00]'
                        : 'bg-white text-black hover:bg-gray-100'
                    }`}
                  >
                    <div className="text-lg font-black">{t.aa}</div>
                    <div className="text-[10px] font-bold">{t.pos}</div>
                    <div className="text-[9px] mt-1 opacity-80">{t.conservation}%</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Residue Evolutionary Profile */}
          <div className="p-5 bg-[#FFFDF0] border-3 border-black shadow-[4px_4px_0px_#000] grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="text-[10px] font-mono font-bold text-gray-600 uppercase">Residue & Position</div>
              <div className="text-xl font-mono font-black text-black mt-0.5">{selectedResidue.name}</div>
              <div className="text-xs font-semibold text-gray-700 mt-1">{selectedResidue.role}</div>
            </div>

            <div>
              <div className="text-[10px] font-mono font-bold text-gray-600 uppercase">Conservation Score</div>
              <div className="text-xl font-mono font-black text-black mt-0.5">{selectedResidue.conservation}%</div>
              <div className="text-xs font-semibold text-gray-700 mt-1">
                {selectedResidue.conservation > 90 ? 'Conserved across all vertebrates' : 'High mutational plasticity (Escape Hotspot)'}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-mono font-bold text-gray-600 uppercase">AETHER-RAMI Generative Guidance</div>
              <div className="text-xs font-mono font-black mt-0.5 px-2 py-1 bg-white border border-black inline-block">
                {selectedResidue.pos === 790 ? 'DO NOT RELY ON H-BONDS (Will Mutate)' : 'ANCHOR STRONG HYDROGEN BONDS'}
              </div>
              <div className="text-[11px] font-semibold text-gray-600 mt-1">
                Conditioned ESM-2 cross-attention guides diffusion coordinates toward permanent anchors.
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* CHAPTER 3: SE(3) DIFFUSION TIME-SCRUBBER (REVERSE BROWNIAN MOTION) */}
        {/* ========================================================================= */}
        <div id="ch3" className="p-6 md:p-10 bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] rounded-xl space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-black pb-4">
            <div>
              <span className="text-[11px] font-mono font-black uppercase bg-[#A6FF00] text-black px-2.5 py-1 border border-black shadow-[1px_1px_0px_#000]">
                CHAPTER 03 • GENERATIVE BIOPHYSICS IN ACTION
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-black uppercase mt-2">
                Continuous-Time SE(3) Diffusion Time-Scrubber
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleStartDiffusionFromNoise}
                className="px-4 py-2 bg-[#FFE600] hover:bg-[#E6CF00] border-2 border-black font-mono font-black text-xs uppercase flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#000]"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Simulate Reverse Denoising</span>
              </button>
              <button
                onClick={() => { setDiffusionStep(0); setIsPlayingDiffusion(false); }}
                className="px-3 py-2 bg-white hover:bg-gray-100 border-2 border-black font-mono font-black text-xs uppercase flex items-center gap-1 cursor-pointer"
                title="Reset to final clean molecule"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <p className="text-sm font-semibold text-[#262626] max-w-4xl leading-relaxed">
            Drag the time scrubber below from <strong className="font-mono">T = 1000</strong> (pure thermal noise) to <strong className="font-mono">T = 0</strong> (ground state). Watch the reverse stochastic differential equation (SDE) denoise 3D Cartesian coordinates and categorical atom types in Euclidean space.
          </p>

          {/* Interactive Timeline Slider */}
          <div className="p-6 bg-[#FFFDF0] border-3 border-black shadow-[5px_5px_0px_#000] space-y-6">
            
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs font-black">
                <span className="text-black">T = 1000 (Pure Gaussian Noise)</span>
                <span className="bg-black text-[#A6FF00] px-3 py-1 border border-black text-sm">
                  Timestep T = {diffusionStep}
                </span>
                <span className="text-black">T = 0 (Physical Drug Lead)</span>
              </div>

              <input
                type="range"
                min={0}
                max={1000}
                step={20}
                value={diffusionStep}
                onChange={(e) => setDiffusionStep(Number(e.target.value))}
                className="w-full h-4 bg-white border-2 border-black rounded-none appearance-none cursor-pointer accent-[#A6FF00]"
              />
            </div>

            {/* Live State Breakdown Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t-2 border-black pt-4">
              
              <div className="p-4 bg-white border-2 border-black shadow-[2px_2px_0px_#000] space-y-1">
                <div className="text-[10px] font-mono font-bold text-gray-600 uppercase">Phase / SDE Step</div>
                <div className="text-base font-black text-black">{currentStage.stage}</div>
                <div className="text-[11px] font-mono font-bold text-[#2563EB]">{currentStage.formula}</div>
              </div>

              <div className="p-4 bg-white border-2 border-black shadow-[2px_2px_0px_#000] space-y-1">
                <div className="text-[10px] font-mono font-bold text-gray-600 uppercase">Current Pocket RMSD</div>
                <div className="text-2xl font-mono font-black text-black">{currentStage.rmsd} Å</div>
                <div className="text-[11px] font-bold text-gray-700">Clashes: {currentStage.clashes}</div>
              </div>

              <div className="p-4 bg-white border-2 border-black shadow-[2px_2px_0px_#000] space-y-1">
                <div className="text-[10px] font-mono font-bold text-gray-600 uppercase">Biophysical Status</div>
                <div className="text-xs font-semibold text-gray-800 leading-snug">{currentStage.description}</div>
              </div>

            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* CHAPTER 4: THE 16.4B MoE ROUTER (INTERACTIVE DISPATCH) */}
        {/* ========================================================================= */}
        <div id="ch4" className="p-6 md:p-10 bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] rounded-xl space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-black pb-4">
            <div>
              <span className="text-[11px] font-mono font-black uppercase bg-[#FFE600] text-black px-2.5 py-1 border border-black shadow-[1px_1px_0px_#000]">
                CHAPTER 04 • SCALED ARCHITECTURE
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-black uppercase mt-2">
                16.4B Parameter Sparse Mixture-of-Experts (MoE)
              </h3>
            </div>
            <div className="text-xs font-mono font-bold bg-[#A6FF00] px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000]">
              Top-2 Dynamic Gating
            </div>
          </div>

          <p className="text-sm font-semibold text-[#262626] max-w-4xl leading-relaxed">
            Standard monolithic AI models suffer from chemical gradient interference—when trained on both tiny kinase inhibitors and large macrocyclic peptide rings, their performance drops by 40%. AETHER-RAMI routes tokens dynamically across 8 specialized biochemical experts.
          </p>

          {/* Interactive Target Phenotype Selector */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold text-gray-700 uppercase">
              Click a pocket phenotype to see which 2 experts the gating router activates:
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['kinase', 'surface', 'antimicrobial', 'cns'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedTargetClass(cat)}
                  className={`p-3 border-2 border-black font-mono text-xs font-black uppercase transition-all cursor-pointer ${
                    selectedTargetClass === cat
                      ? 'bg-black text-white shadow-[3px_3px_0px_#FFE600]'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  {cat === 'kinase' && 'Kinase ATP Cleft'}
                  {cat === 'surface' && 'Flat Surface (KRAS)'}
                  {cat === 'antimicrobial' && 'MDR-TB Cell Wall'}
                  {cat === 'cns' && 'Brain / CNS Target'}
                </button>
              ))}
            </div>
          </div>

          {/* Active Experts Dispatch Card */}
          <div className="p-6 bg-[#FFFDF0] border-3 border-black shadow-[4px_4px_0px_#000] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-2">
              <span className="font-mono text-xs font-black uppercase text-black">
                {currentMoe.title}
              </span>
              <span className="text-xs font-mono font-bold bg-[#00F0FF] px-2 py-0.5 border border-black">
                Zero Chemical Gradient Clash
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentMoe.activeExperts.map((exp, idx) => (
                <div key={idx} className="p-3 bg-white border-2 border-black shadow-[2px_2px_0px_#000] space-y-1">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] font-black text-[#A6FF00] bg-black px-1.5 py-0.5 inline-block">
                    ACTIVE EXPERT #{idx + 1}
                  </div>
                  <div className="font-mono text-xs font-black text-black">{exp}</div>
                </div>
              ))}
            </div>

            <div className="text-xs font-semibold text-gray-700 bg-white p-3 border-2 border-black">
              <strong>Router Rationale:</strong> {currentMoe.rationale}
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* CHAPTER 5: THE 3D WORKBENCH & 36-DISEASE PIPELINE CTA */}
        {/* ========================================================================= */}
        <div id="ch5" className="p-8 bg-[#FFE600] border-4 border-black shadow-[8px_8px_0px_0px_#000] rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] font-mono font-black uppercase bg-black text-white px-2 py-0.5">
              CHAPTER 05 • EMPIRICAL ATOMIC CONFIRMATION & FULL PIPELINE
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-black uppercase">
              Ready to explore live 3D coordinates & our 36 disease programs?
            </h3>
            <p className="text-sm font-bold text-black/90 leading-relaxed">
              Inspect secondary structures, focus directly on the gatekeeper mutations in our 3D WebGL Biotech Laboratory, or dive into the full 36-disease clinical comparison ledger detailing existing drugs, why they fail, and our de novo rescues.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <Link
              href="/diseases"
              className="px-6 py-4 bg-white hover:bg-gray-100 text-black border-3 border-black font-mono font-black text-sm uppercase shadow-[4px_4px_0px_#000] neo-btn flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Dna className="w-4 h-4 text-black" />
              <span>36 Disease Programs</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <button
              onClick={onOpenWorkbench}
              className="px-6 py-4 bg-black hover:bg-gray-800 text-white border-3 border-black font-mono font-black text-sm uppercase shadow-[4px_4px_0px_#FFF] neo-btn flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Activity className="w-4 h-4 text-[#A6FF00]" />
              <span>Launch 3D Lab</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
