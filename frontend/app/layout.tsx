'use client';

import React from 'react';
import {
  Activity, Zap, FlaskConical, Microscope, Layers, Cpu, Database, ShieldCheck,
  BarChart3, Heart, FileText, Settings, Bot, Sparkles, Command, Home, Wind, Replace, Beaker, Network, Atom, Flame, Users, Key, Code, BookOpen
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

const RESEARCH_STATIONS: { key: SectionTab; label: string; desc: string; icon: any; color: string }[] = [
  { key: 'predictor', label: 'Binding Affinity & ADMET', desc: 'Live PubChem & Cross-Attention', icon: Zap, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60' },
  { key: 'methodology', label: 'Methodology & Layman Explainer', desc: 'SOTA Baselines & Architecture', icon: BookOpen, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60' },
  { key: 'explorer', label: 'RCSB PDB 3D Explorer', desc: 'Live WebGL Coordinate Viewer', icon: Microscope, color: 'text-purple-400 border-purple-500/40 bg-purple-950/60' },
  { key: 'alphafold', label: 'AlphaFold-3 Structure AI', desc: 'pLDDT & PAES Error Scoring', icon: Microscope, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60' },
  { key: 'covalent', label: 'Covalent Warhead Designer', desc: 'Nucleophilic Adduct Rates', icon: Flame, color: 'text-rose-400 border-rose-500/40 bg-rose-950/60' },
  { key: 'protac', label: 'PROTAC Degrader Studio', desc: 'Ternary Complex Degradation', icon: Layers, color: 'text-indigo-400 border-indigo-500/40 bg-indigo-950/60' },
  { key: 'druglab', label: 'Virtual Drug Discovery Lab', desc: 'DFT Quantum & MD Simulation', icon: Beaker, color: 'text-pink-400 border-pink-500/40 bg-pink-950/60' },
  { key: 'workflow', label: 'n8n Workflow Studio', desc: 'Node-Graph Automation Flow', icon: Network, color: 'text-teal-400 border-teal-500/40 bg-teal-950/60' },
  { key: 'digitaltwin', label: 'Digital Human Twin', desc: 'PK/PD Organ-on-a-Chip Telemetry', icon: Heart, color: 'text-amber-400 border-amber-500/40 bg-amber-950/60' },
  { key: 'multiomics', label: 'Multi-Omics Catalog', desc: 'ChEMBL & Disease Target Mapping', icon: Database, color: 'text-blue-400 border-blue-500/40 bg-blue-950/60' },
  { key: 'generator', label: 'De Novo Designer', desc: 'Targeted SMILES/SELFIES VAE', icon: FlaskConical, color: 'text-indigo-400 border-indigo-500/40 bg-indigo-950/60' },
  { key: 'rbac', label: 'RBAC Security Governance', desc: 'Role Permissions & Audit Logs', icon: ShieldCheck, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60' },
  { key: 'apigateway', label: 'API Microservices Gateway', desc: 'OpenAPI 3.0 & GraphQL Spec', icon: Network, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60' },
  { key: 'ectd', label: 'FDA eCTD Dossier Generator', desc: 'IND/NDA Regulatory Packages', icon: FileText, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60' },
  { key: 'biomarker', label: 'Companion Diagnostics (CDx)', desc: 'Biomarker Stratification', icon: Activity, color: 'text-rose-400 border-rose-500/40 bg-rose-950/60' },
  { key: 'pbpk', label: '14-Compartment PBPK Model', desc: 'Whole-Body Concentration AUC', icon: Heart, color: 'text-amber-400 border-amber-500/40 bg-amber-950/60' },
  { key: 'adc', label: 'ADC & Biologics Studio', desc: 'mAb DAR & Payload Modeling', icon: Layers, color: 'text-indigo-400 border-indigo-500/40 bg-indigo-950/60' },
  { key: 'ipvault', label: 'Cryptographic IP Vault', desc: 'SHA-256 Ledger Timestamping', icon: Key, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60' },
  { key: 'limseln', label: 'ELN & LIMS Inventory', desc: '-80°C Freezer & QR Tracking', icon: Database, color: 'text-teal-400 border-teal-500/40 bg-teal-950/60' },
  { key: 'results', label: 'V10 Evidence Center', desc: 'ROC, TreeSHAP & MPO Data', icon: BarChart3, color: 'text-teal-400 border-teal-500/40 bg-teal-950/60' },
  { key: 'assistant', label: 'Research Assistant', desc: 'Domain Copilot Agent', icon: Bot, color: 'text-pink-400 border-pink-500/40 bg-pink-950/60' },
  { key: 'settings', label: 'System Controls', desc: 'Hardware & Seeds', icon: Settings, color: 'text-slate-400 border-slate-500/40 bg-slate-900/60' },
];

function RootLayoutInner({ children }: { children: React.ReactNode }) {
  const { activeTab, setActiveTab, currentRole, setIsCommandPaletteOpen, setIsCopilotOpen } = useTab();

  return (
    <>
      {/* Background ambient glowing gradient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[650px] h-[450px] bg-cyan-500/15 rounded-full blur-[130px] ambient-glow" />
        <div className="absolute top-1/3 right-10 w-[550px] h-[400px] bg-purple-500/15 rounded-full blur-[120px] ambient-glow" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-10 left-10 w-[500px] h-[350px] bg-rose-500/10 rounded-full blur-[110px] ambient-glow" style={{ animationDelay: '5s' }} />
        <div className="absolute inset-0 scientific-grid opacity-25" />
      </div>

      {/* Header */}
      <header className="glass-panel border-b border-slate-800/80 sticky top-0 w-full h-14 flex items-center justify-between px-4 z-40 bg-slate-950/90 backdrop-blur-xl">
        <button className="flex items-center gap-3 text-left" onClick={() => setActiveTab('predictor')}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 via-purple-500 to-rose-500 flex items-center justify-center font-black text-slate-950 text-base shadow-[0_0_20px_rgba(0,240,255,0.5)]">
            A
          </div>
          <div>
            <span className="font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-rose-400 text-sm">
              AETHER-RAMI
            </span>
            <span className="ml-2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
              V10 OMEGA
            </span>
          </div>
        </button>

        <div className="flex items-center gap-2">
          {/* Active RBAC Role Indicator */}
          <button
            onClick={() => setActiveTab('rbac')}
            className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-mono text-[10px] flex items-center gap-1.5 transition-colors"
          >
            <ShieldCheck className="w-3 h-3 text-cyan-400" />
            <span className="font-bold">{currentRole}</span>
          </button>

          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors"
            title="Command Palette (Ctrl+K)"
          >
            <Command className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline font-mono text-[11px] text-slate-400">Ctrl+K</span>
          </button>

          <button
            onClick={() => setIsCopilotOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 via-purple-500 to-rose-500 font-bold text-xs text-slate-950 hover:opacity-90 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center gap-1.5"
          >
            <Bot className="w-3.5 h-3.5 fill-current" />
            <span>AI Copilot</span>
          </button>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex flex-1 relative z-10">
        {/* Left Sidebar */}
        <aside className="glass-panel border-r border-slate-800/80 w-16 md:w-64 flex flex-col py-4 px-2 gap-2 sticky top-14 h-[calc(100vh-56px)] z-30 overflow-y-auto bg-slate-950/80">
          <div className="hidden md:block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
            RESEARCH STATIONS ({RESEARCH_STATIONS.length})
          </div>
          {RESEARCH_STATIONS.map(({ key, label, desc, icon: Icon, color }) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all text-left group ${
                  isActive
                    ? 'bg-slate-900/90 border border-cyan-500/50 text-white shadow-[0_0_20px_rgba(0,240,255,0.15)]'
                    : 'text-slate-400 hover:bg-slate-900/50 hover:text-white border border-transparent'
                }`}
              >
                <div className={`p-2 rounded-lg flex items-center justify-center shrink-0 border ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="hidden md:flex flex-col overflow-hidden">
                  <span className="font-bold text-xs truncate leading-snug">{label}</span>
                  <span className="text-[10px] text-slate-500 font-mono truncate">{desc}</span>
                </div>
              </button>
            );
          })}
        </aside>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 relative">
          {children}
        </main>
      </div>
    </>
  );
}
