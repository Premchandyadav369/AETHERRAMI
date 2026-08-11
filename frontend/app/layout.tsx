'use client';

import React, { useState } from 'react';
import {
  Activity, Zap, FlaskConical, Microscope, Layers, Cpu, Database, ShieldCheck,
  BarChart3, Heart, FileText, Settings, Bot, Sparkles, Command, Home, Wind, Replace, Beaker, Network, Atom, Flame, Users, Key, Code, BookOpen, ChevronDown, ChevronRight, Play, Pause, Volume2, VolumeX, Download, RefreshCw
} from 'lucide-react';
import { GeistSans } from 'geist/font/sans';
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import { TabProvider, useTab, SectionTab } from './TabContext';
import './globals.css';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });
const ibmPlexMono = IBM_Plex_Mono({ weight: ['400', '500', '600', '700'], subsets: ['latin'], variable: '--font-ibm-plex-mono' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
      <body className={`${GeistSans.className} bg-[#050716] text-slate-100 min-h-screen flex flex-col relative`}>
        <TabProvider>
          <RootLayoutInner>{children}</RootLayoutInner>
        </TabProvider>
      </body>
    </html>
  );
}

interface StationGroup {
  groupName: string;
  groupIcon: any;
  items: { key: SectionTab; label: string; desc: string; icon: any; color: string }[];
}

const STATION_GROUPS: StationGroup[] = [
  {
    groupName: 'Epigenetics & Genomic Testing',
    groupIcon: Sparkles,
    items: [
      { key: 'epigenetic', label: 'Biological Age & Horvath Clock', desc: 'DNA Methylation Telemetry', icon: Sparkles, color: 'text-amber-400 border-amber-500/40 bg-amber-950/60' },
      { key: 'genomerisk', label: 'Whole-Genome Polygenic Risk', desc: 'PRS Trait Snapshot & rsID', icon: Activity, color: 'text-rose-400 border-rose-500/40 bg-rose-950/60' },
    ]
  },
  {
    groupName: 'Structural & Molecular AI',
    groupIcon: Microscope,
    items: [
      { key: 'predictor', label: 'Binding Affinity & ADMET', desc: 'Live PubChem & Cross-Attention', icon: Zap, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60' },
      { key: 'explorer', label: 'RCSB PDB 3D Explorer', desc: 'Live WebGL Coordinate Viewer', icon: Microscope, color: 'text-purple-400 border-purple-500/40 bg-purple-950/60' },
      { key: 'alphafold', label: 'AlphaFold-3 Structure AI', desc: 'pLDDT & PAES Error Scoring', icon: Microscope, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60' },
      { key: 'cryoem', label: 'Cryo-EM 3D Map Fitting', desc: 'FSC Curve & B-factor Flex', icon: Microscope, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60' },
      { key: 'covalent', label: 'Covalent Warhead Designer', desc: 'Nucleophilic Adduct Rates', icon: Flame, color: 'text-rose-400 border-rose-500/40 bg-rose-950/60' },
      { key: 'protac', label: 'PROTAC Degrader Studio', desc: 'Ternary Complex Degradation', icon: Layers, color: 'text-indigo-400 border-indigo-500/40 bg-indigo-950/60' },
      { key: 'rna', label: 'RNA Targeted Ligand AI', desc: 'G-Quadruplex & Splice Switching', icon: Network, color: 'text-purple-400 border-purple-500/40 bg-purple-950/60' },
      { key: 'mutation', label: '3D Mutation Resistance Radar', desc: 'Active Site Mutation Folds', icon: ShieldCheck, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60' },
    ]
  },
  {
    groupName: 'Virtual Drug Lab & Dynamics',
    groupIcon: Beaker,
    items: [
      { key: 'druglab', label: 'Virtual Drug Discovery Lab', desc: 'DFT Quantum & MD Simulation', icon: Beaker, color: 'text-pink-400 border-pink-500/40 bg-pink-950/60' },
      { key: 'radiochem', label: 'Radiopharmaceutical Theranostics', desc: 'Lu-177 & Ac-225 Chelator Design', icon: Flame, color: 'text-rose-400 border-rose-500/40 bg-rose-950/60' },
      { key: 'solubility', label: 'Solubility & Excipient AI', desc: 'Lipid Formulation Optimizer', icon: Beaker, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60' },
      { key: 'pbpk', label: '14-Compartment PBPK Model', desc: 'Whole-Body Concentration AUC', icon: Heart, color: 'text-amber-400 border-amber-500/40 bg-amber-950/60' },
      { key: 'digitaltwin', label: 'Digital Human Twin', desc: 'PK/PD Organ-on-a-Chip Telemetry', icon: Heart, color: 'text-amber-400 border-amber-500/40 bg-amber-950/60' },
      { key: 'adc', label: 'ADC & Biologics Studio', desc: 'mAb DAR & Payload Modeling', icon: Layers, color: 'text-indigo-400 border-indigo-500/40 bg-indigo-950/60' },
    ]
  },
  {
    groupName: 'Translational & Clinical Hub',
    groupIcon: Activity,
    items: [
      { key: 'multiomics', label: 'Multi-Omics Catalog', desc: 'ChEMBL & Disease Target Mapping', icon: Database, color: 'text-blue-400 border-blue-500/40 bg-blue-950/60' },
      { key: 'biomarker', label: 'Companion Diagnostics (CDx)', desc: 'Biomarker Stratification', icon: Activity, color: 'text-rose-400 border-rose-500/40 bg-rose-950/60' },
      { key: 'patientradar', label: 'Clinical Trial Patient Match', desc: 'ctDNA Patient Stratification', icon: Users, color: 'text-rose-400 border-rose-500/40 bg-rose-950/60' },
      { key: 'generator', label: 'De Novo Designer', desc: 'Targeted SMILES/SELFIES VAE', icon: FlaskConical, color: 'text-indigo-400 border-indigo-500/40 bg-indigo-950/60' },
      { key: 'ectd', label: 'FDA eCTD Dossier Generator', desc: 'IND/NDA Regulatory Packages', icon: FileText, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60' },
    ]
  },
  {
    groupName: 'Automation & Security Governance',
    groupIcon: ShieldCheck,
    items: [
      { key: 'workflow', label: 'n8n Workflow Studio', desc: 'Node-Graph Automation Flow', icon: Network, color: 'text-teal-400 border-teal-500/40 bg-teal-950/60' },
      { key: 'rbac', label: 'RBAC Security Governance', desc: 'Role Permissions & Audit Logs', icon: ShieldCheck, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60' },
      { key: 'apigateway', label: 'API Microservices Gateway', desc: 'OpenAPI 3.0 & GraphQL Spec', icon: Network, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60' },
      { key: 'patentpacket', label: 'Provisional Patent Packet', desc: '1-Click USPTO PTO/SB/16 Export', icon: FileText, color: 'text-amber-400 border-amber-500/40 bg-amber-950/60' },
      { key: 'limssync', label: 'Benchling & LIMS Sync', desc: 'Enterprise Webhook Connector', icon: RefreshCw, color: 'text-teal-400 border-teal-500/40 bg-teal-950/60' },
    ]
  },
  {
    groupName: 'Evidence & AI Copilot',
    groupIcon: BookOpen,
    items: [
      { key: 'methodology', label: 'Methodology & Layman Guide', desc: 'SOTA Baselines & Architecture', icon: BookOpen, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60' },
      { key: 'results', label: 'V10 Evidence Center', desc: 'ROC, TreeSHAP & MPO Data', icon: BarChart3, color: 'text-teal-400 border-teal-500/40 bg-teal-950/60' },
      { key: 'assistant', label: 'Research Assistant', desc: 'Domain Copilot Agent', icon: Bot, color: 'text-pink-400 border-pink-500/40 bg-pink-950/60' },
      { key: 'settings', label: 'System Controls', desc: 'Hardware & Seeds', icon: Settings, color: 'text-slate-400 border-slate-500/40 bg-slate-900/60' },
    ]
  }
];

function RootLayoutInner({ children }: { children: React.ReactNode }) {
  const { activeTab, setActiveTab, currentRole, setIsCommandPaletteOpen, setIsCopilotOpen } = useTab();
  const [collapsedGroups, setCollapsedGroups] = useState<{ [key: string]: boolean }>({});
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const toggleGroup = (groupName: string) => {
    setCollapsedGroups(prev => ({ ...prev, [groupName]: !prev[groupName] }));
  };

  return (
    <>
      {/* Background ambient glowing gradient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[650px] h-[450px] ambient-glow-amber rounded-full blur-[130px]" />
        <div className="absolute top-1/3 right-10 w-[550px] h-[400px] ambient-glow-rose rounded-full blur-[120px]" />
        <div className="absolute inset-0 scientific-grid opacity-25" />
      </div>

      {/* Header */}
      <header className="glass-panel-bioscript border-b border-amber-500/20 sticky top-0 w-full h-16 flex items-center justify-between px-6 z-40 bg-slate-950/90 backdrop-blur-xl">
        <button className="flex items-center gap-3 text-left" onClick={() => setActiveTab('epigenetic')}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 via-rose-500 to-purple-600 flex items-center justify-center font-black text-slate-950 text-base shadow-[0_0_20px_rgba(245,158,11,0.5)]">
            A
          </div>
          <div>
            <span className="font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-cyan-400 text-base">
              artery | bioScript
            </span>
            <span className="ml-2 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-950 text-amber-300 border border-amber-500/50">
              V10 OMEGA
            </span>
          </div>
        </button>

        <div className="flex items-center gap-3">
          {/* User Profile Avatar - Premchand Yadav */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900 border border-amber-500/30">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center text-slate-950 font-black text-xs">
              PY
            </div>
            <span className="font-bold text-xs text-white hidden sm:inline">V C Premchand Yadav</span>
          </div>

          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors"
          >
            <Command className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline font-mono text-[11px] text-slate-400">Ctrl+K</span>
          </button>

          <button
            onClick={() => setIsCopilotOpen(true)}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 font-bold text-xs text-slate-950 hover:opacity-90 transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-1.5"
          >
            <Bot className="w-3.5 h-3.5 fill-current" />
            <span>AI Copilot</span>
          </button>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex flex-1 relative z-10 pb-16">
        {/* Left Sidebar */}
        <aside className="glass-panel-bioscript border-r border-amber-500/20 w-16 md:w-64 flex flex-col py-4 px-2 gap-4 sticky top-16 h-[calc(100vh-64px)] z-30 overflow-y-auto bg-slate-950/80">
          <div className="hidden md:block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-2">
            ENTERPRISE HUBS ({STATION_GROUPS.length})
          </div>

          {STATION_GROUPS.map((group) => {
            const GroupIcon = group.groupIcon;
            const isCollapsed = collapsedGroups[group.groupName];
            return (
              <div key={group.groupName} className="flex flex-col gap-1">
                <button
                  onClick={() => toggleGroup(group.groupName)}
                  className="hidden md:flex items-center justify-between px-2 py-1 text-[11px] font-mono font-bold text-amber-400 hover:text-white uppercase tracking-wider transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <GroupIcon className="w-3.5 h-3.5 text-amber-400" />
                    <span>{group.groupName}</span>
                  </div>
                  {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {!isCollapsed && group.items.map(({ key, label, desc, icon: Icon, color }) => {
                  const isActive = activeTab === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all text-left group ${
                        isActive
                          ? 'bg-slate-900/90 border border-amber-500/50 text-white shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                          : 'text-slate-400 hover:bg-slate-900/50 hover:text-white border border-transparent'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg flex items-center justify-center shrink-0 border ${color}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="hidden md:flex flex-col overflow-hidden">
                        <span className="font-bold text-xs truncate leading-snug">{label}</span>
                        <span className="text-[9px] text-slate-500 font-mono truncate">{desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </aside>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 relative">
          {children}
        </main>
      </div>

      {/* Floating Media & Telemetry Control Bar */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 px-6 py-2.5 rounded-full glass-panel-bioscript border border-amber-500/30 shadow-2xl flex items-center gap-6 bg-slate-950/90 backdrop-blur-xl">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 rounded-full bg-white text-slate-950 flex items-center justify-center hover:scale-105 transition-transform"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 text-slate-300 flex items-center justify-center hover:bg-slate-800 transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
        </button>

        <div className="w-64 md:w-96 h-1.5 bg-slate-800 rounded-full overflow-hidden relative">
          <div className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-purple-500 rounded-full w-3/4 animate-pulse" />
        </div>

        <span className="text-[10px] font-mono text-amber-300 font-bold hidden sm:inline">
          Live Telemetry Stream
        </span>
      </div>
    </>
  );
}
