'use client';

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Eli5StorySection from './components/Eli5StorySection';
import StoryJourney from './components/StoryJourney';
import GrandChallenge from './components/GrandChallenge';
import AlphaFoldWorkbench from './components/AlphaFoldWorkbench';
import PocketDockingStudio from './components/PocketDockingStudio';
import TargetExplorer from './components/TargetExplorer';
import TargetDrawer from './components/TargetDrawer';
import InteractiveBenchmarks from './components/InteractiveBenchmarks';
import GamechangerStudio from './components/GamechangerStudio';
import ArchitectureSection from './components/ArchitectureSection';
import CommandPalette from './components/CommandPalette';
import AiChatAssistant from './components/AiChatAssistant';
import Footer from './components/Footer';
import { TARGETS_DATA, Target } from './data/targets';
import { Toaster } from 'sonner';

export default function MainPage() {
  const [activeTarget, setActiveTarget] = useState<Target>(TARGETS_DATA[0]);
  const [drawerTarget, setDrawerTarget] = useState<Target | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  const handleSelectTarget = (target: Target) => {
    setActiveTarget(target);
  };

  const handleSelectPdb = (pdbCode: string) => {
    const cleanPdb = pdbCode.toUpperCase().trim();
    const found = TARGETS_DATA.find((t) => t.pdb.toUpperCase() === cleanPdb);
    if (found) {
      setActiveTarget(found);
    } else {
      // Dynamic Target created for worldwide PDB entry
      const dynamicTarget: Target = {
        id: `RCSB_${cleanPdb}`,
        name: `Receptor Target (${cleanPdb})`,
        disease: `Target Associated with PDB ${cleanPdb}`,
        category: 'Worldwide PDB Explorer' as any,
        pdb: cleanPdb,
        uniprot: 'RCSB-GLOBAL',
        resolution: '2.10 Å',
        primary_mutation: 'Active Site Pocket',
        clinical_bypass: 'Novel De Novo Pocket',
        frontline_drug: 'Drug Resistance / Standard',
        lead_code: `AETH-DENOVO-${cleanPdb}`,
        default_lead: `AETH-DENOVO-${cleanPdb}`,
        wetlab_ic50: 'Predicted Kd = 7.4 nM',
        kd_nm: 7.4,
        posebusters: 'PASS (96.4%)',
        rmsd: '0.42 Å',
        gtex_safety: '100% Wild-Type Diploid Margin',
        mechanism: `AETHER-RAMI SE(3) continuous-time diffusion generated an all-atom de novo small-molecule inhibitor for ${cleanPdb}.`
      };
      setActiveTarget(dynamicTarget);
    }
  };

  const handleOpenDrawer = (target: Target) => {
    setDrawerTarget(target);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const scrollToTargets = () => {
    const el = document.getElementById('targets');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWorkbench = () => {
    const el = document.getElementById('workbench');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF0] text-black flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      
      {/* Toast Notification Container (Sonner in Neobrutalism) */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#FFFFFF',
            border: '3px solid #000000',
            color: '#000000',
            fontFamily: 'inherit',
            fontWeight: 800,
            fontSize: '13px',
            boxShadow: '4px 4px 0px 0px #000000',
            borderRadius: '4px',
          },
        }}
      />

      {/* Global Neobrutalist Navbar */}
      <Navbar
        onOpenSearch={() => setIsCommandOpen(true)}
        onOpenWorkbench={scrollToWorkbench}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* 1. Hero with Prominent Opening Page Conversational AI Chat */}
        <Hero
          targets={TARGETS_DATA}
          activeTarget={activeTarget}
          onSelectTarget={handleSelectTarget}
          onSelectPdb={handleSelectPdb}
          onOpenDrawer={handleOpenDrawer}
          onExploreTargets={scrollToTargets}
          onOpenWorkbench={scrollToWorkbench}
        />

        {/* 1.5. Plain-English ELI5 Storybook Mode */}
        <Eli5StorySection
          onSelectTarget={handleSelectTarget}
          onOpenWorkbench={scrollToWorkbench}
        />

        {/* 2. Interactive Biophysical Storytelling Journey (Chapters 01 - 05) */}
        <StoryJourney
          targets={TARGETS_DATA}
          onSelectTarget={handleSelectTarget}
          onOpenWorkbench={scrollToWorkbench}
        />

        {/* 3. The Grand Challenge: Deep Historical Context & Gatekeeper Paradox */}
        <GrandChallenge />

        {/* 4. 3D WebGL Molecular Biotech Workbench with Worldwide RCSB PDB Search */}
        <AlphaFoldWorkbench
          targets={TARGETS_DATA}
          activeTarget={activeTarget}
          onSelectTarget={handleSelectTarget}
          onOpenDrawer={handleOpenDrawer}
        />

        {/* 4.5. Pocket Location & Virtual Screening Studio */}
        <PocketDockingStudio
          onLoadPdbToViewer={handleSelectPdb}
        />

        {/* 5. The Paradigm Shift: Why AETHER-RAMI is a Gamechanger & AI Drug Explorer Studio */}
        <GamechangerStudio />

        {/* 4. Clinical Pipeline: 36 Disease Targets & Leads */}
        <TargetExplorer
          targets={TARGETS_DATA}
          activeTarget={activeTarget}
          onSelectTarget={handleSelectTarget}
          onOpenDrawer={handleOpenDrawer}
        />

        {/* 5. Interactive Benchmarks Studio & Simplified Explanations */}
        <InteractiveBenchmarks />

        {/* 6. Neural Architecture: Continuous SE(3) Diffusion & 16.4B MoE */}
        <ArchitectureSection />

      </main>

      {/* Persistent Floating AI Chat Assistant (Accessible anywhere on the site) */}
      <AiChatAssistant
        targets={TARGETS_DATA}
        onSelectTarget={handleSelectTarget}
        onSelectPdb={handleSelectPdb}
        onScrollToWorkbench={scrollToWorkbench}
        isFloating={true}
      />

      {/* Slide-In Target Drawer (Vaul) */}
      <TargetDrawer
        target={drawerTarget}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />

      {/* Command Palette (cmdk) */}
      <CommandPalette
        targets={TARGETS_DATA}
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onSelectTarget={handleSelectTarget}
        onOpenDrawer={handleOpenDrawer}
      />

      {/* Institutional & Citation Footer */}
      <Footer />

    </div>
  );
}
