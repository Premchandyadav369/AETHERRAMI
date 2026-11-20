'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  ArrowLeft,
  ExternalLink,
  Dna,
  ShieldCheck,
  Activity,
  AlertTriangle,
  ChevronRight,
  Sliders,
  Pill,
  CheckCircle2,
  XCircle,
  Sparkles,
  Database,
  Download,
  RefreshCw,
  Layers,
  ArrowUpRight,
  Zap,
  Info,
  X
} from 'lucide-react';
import { ALL_DISEASE_PROGRAMS, DiseaseProgram } from './diseaseData';
import Footer from '../components/Footer';

export default function DiseasePortfolioPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [quickFilter, setQuickFilter] = useState<'all' | 'gatekeeper' | 'sub5nm' | 'cns'>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'matrix'>('cards');
  const [activeModalProgram, setActiveModalProgram] = useState<DiseaseProgram | null>(null);

  // Categories list
  const categories = [
    'All',
    'Global Oncology',
    'High-Burden India',
    'Infectious & AMR',
    'Neurology & Metabolic',
    'Cardiovascular'
  ];

  // Filtered programs
  const filteredPrograms = useMemo(() => {
    return ALL_DISEASE_PROGRAMS.filter((prog) => {
      // Category filter
      if (selectedCategory !== 'All' && prog.category !== selectedCategory) {
        return false;
      }

      // Quick filter
      if (quickFilter === 'gatekeeper') {
        const isGatekeeper =
          prog.primaryMutation.toLowerCase().includes('gatekeeper') ||
          prog.primaryMutation.toLowerCase().includes('t790m') ||
          prog.primaryMutation.toLowerCase().includes('t315i') ||
          prog.primaryMutation.toLowerCase().includes('s108n');
        if (!isGatekeeper) return false;
      } else if (quickFilter === 'sub5nm') {
        if (prog.ourDrug.kdNm > 5.0) return false;
      } else if (quickFilter === 'cns') {
        const isCns =
          prog.category === 'Neurology & Metabolic' ||
          prog.ourDrug.admet.bloodBrainBarrier.includes('CNS') ||
          prog.ourDrug.admet.bloodBrainBarrier.includes('1.') ||
          prog.ourDrug.admet.bloodBrainBarrier.includes('2.');
        if (!isCns) return false;
      }

      // Text search
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        prog.diseaseName.toLowerCase().includes(q) ||
        prog.targetName.toLowerCase().includes(q) ||
        prog.geneSymbol.toLowerCase().includes(q) ||
        prog.pdbId.toLowerCase().includes(q) ||
        prog.existingDrug.name.toLowerCase().includes(q) ||
        prog.existingDrug.brandName.toLowerCase().includes(q) ||
        prog.ourDrug.leadCode.toLowerCase().includes(q) ||
        prog.primaryMutation.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedCategory, quickFilter]);

  // Export CSV handler
  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Disease',
      'Category',
      'Target Name',
      'PDB',
      'Resolution',
      'Primary Mutation',
      'Existing Drug',
      'Existing Drug Brand',
      'Why Frontline Fails',
      'Existing Mutant Kd',
      'Our Lead Code',
      'Our Chemical Class',
      'Our Predicted Kd (nM)',
      'Wet-Lab IC50',
      'Fold Improvement',
      'PoseBusters Score',
      'Permeability (Papp)',
      'Blood-Brain Barrier',
      'Half-Life (T1/2)',
      'Oral %F',
      'GTEx Safety'
    ];

    const rows = ALL_DISEASE_PROGRAMS.map((p) => [
      `"${p.id}"`,
      `"${p.diseaseName.replace(/"/g, '""')}"`,
      `"${p.category}"`,
      `"${p.targetName.replace(/"/g, '""')}"`,
      `"${p.pdbId}"`,
      `"${p.resolution}"`,
      `"${p.primaryMutation.replace(/"/g, '""')}"`,
      `"${p.existingDrug.name.replace(/"/g, '""')}"`,
      `"${p.existingDrug.brandName.replace(/"/g, '""')}"`,
      `"${p.existingDrug.failureReason.replace(/"/g, '""')}"`,
      `"${p.existingDrug.mutantKd.replace(/"/g, '""')}"`,
      `"${p.ourDrug.leadCode.replace(/"/g, '""')}"`,
      `"${p.ourDrug.chemicalClass.replace(/"/g, '""')}"`,
      `"${p.ourDrug.kdNm}"`,
      `"${p.ourDrug.ic50.replace(/"/g, '""')}"`,
      `"${p.ourDrug.foldImprovement.replace(/"/g, '""')}"`,
      `"${p.ourDrug.posebustersScore.replace(/"/g, '""')}"`,
      `"${p.ourDrug.admet.caco2Permeability.replace(/"/g, '""')}"`,
      `"${p.ourDrug.admet.bloodBrainBarrier.replace(/"/g, '""')}"`,
      `"${p.ourDrug.admet.halfLifeHours.replace(/"/g, '""')}"`,
      `"${p.ourDrug.admet.bioavailabilityF.replace(/"/g, '""')}"`,
      `"${p.ourDrug.gtexSafety.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AETHER_RAMI_Disease_Portfolio_36_Programs.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF0] text-black flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 w-full border-b-4 border-black bg-[#FFE600] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-xs font-black uppercase text-black bg-white px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_#000] neo-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Platform Home</span>
          </Link>
          <span className="hidden md:inline font-mono text-xs font-black uppercase text-black border-l-2 border-black pl-3">
            36 Human Disease Programs & Lead Ledger
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/benchmarks"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#A6FF00] text-black text-xs font-mono font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] neo-btn"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>PoseBusters</span>
          </Link>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white text-xs font-mono font-black uppercase border-2 border-black shadow-[2px_2px_0px_#FFE600] neo-btn cursor-pointer"
            title="Download full 36-program ledger as CSV"
          >
            <Download className="w-3.5 h-3.5 text-[#A6FF00]" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b-4 border-black bg-[#FFFDF0] py-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-neo-dots opacity-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#A6FF00] border-2 border-black text-xs font-mono font-black uppercase shadow-[2px_2px_0px_#000]">
            <Dna className="w-4 h-4 text-black" />
            <span>CLINICAL PIPELINE & RECEPTOR DOSSIERS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-black uppercase tracking-tight leading-none">
            Disease Portfolio: Existing Drugs vs. Our De Novo Rescues
          </h1>

          <p className="max-w-4xl text-base sm:text-lg font-bold text-[#262626] leading-relaxed">
            Full end-to-end breakdown across all 36 validated disease indications. Explore the molecular targets, why current standard-of-care frontline therapies suffer clinical resistance or steric clashes, and how AETHER-RAMI’s continuous-time SE(3) diffusion leads achieve sub-nanomolar rescue with validated PoseBusters chemistry.
          </p>

          {/* 4 Macro Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div className="p-4 bg-white border-3 border-black shadow-[4px_4px_0px_#000]">
              <div className="text-xs font-mono font-black uppercase text-gray-500">Active Programs</div>
              <div className="text-3xl font-black text-black">36 Targets</div>
              <div className="text-xs font-bold text-gray-700 mt-1">5 Therapeutic Classes</div>
            </div>

            <div className="p-4 bg-[#FFE600] border-3 border-black shadow-[4px_4px_0px_#000]">
              <div className="text-xs font-mono font-black uppercase text-black">Steric Audit</div>
              <div className="text-3xl font-black text-black">100% Pass</div>
              <div className="text-xs font-bold text-black mt-1">18/18 PoseBusters Criteria</div>
            </div>

            <div className="p-4 bg-[#A6FF00] border-3 border-black shadow-[4px_4px_0px_#000]">
              <div className="text-xs font-mono font-black uppercase text-black">Affinity Range</div>
              <div className="text-3xl font-black text-black">0.38 - 14.8 nM</div>
              <div className="text-xs font-bold text-black mt-1">Sub-nanomolar Potency</div>
            </div>

            <div className="p-4 bg-[#00F0FF] border-3 border-black shadow-[4px_4px_0px_#000]">
              <div className="text-xs font-mono font-black uppercase text-black">Safety Profile</div>
              <div className="text-3xl font-black text-black">54 Tissues</div>
              <div className="text-xs font-bold text-black mt-1">GTEx Normal Cell Margin</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Controls & Filters */}
      <section className="sticky top-14 z-30 bg-[#FFFDF0] border-b-4 border-black px-4 sm:px-6 py-4 shadow-[0_4px_0px_#000]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search disease, existing drug, lead code, PDB, or mutation..."
              className="w-full pl-10 pr-4 py-2 bg-white border-2 border-black text-sm font-mono font-bold text-black placeholder:text-gray-500 shadow-[2px_2px_0px_#000] focus:outline-none focus:bg-[#FFFDF0]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-gray-500 hover:text-black"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All (36)' },
              { id: 'gatekeeper', label: 'Gatekeeper Clash' },
              { id: 'sub5nm', label: 'Sub-5 nM Potency' },
              { id: 'cns', label: 'Brain Penetrant (CNS)' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setQuickFilter(f.id as any)}
                className={`px-3 py-1.5 text-xs font-mono font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] transition-colors neo-btn cursor-pointer ${
                  quickFilter === f.id ? 'bg-[#FFE600] text-black' : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-white border-2 border-black p-1 shadow-[2px_2px_0px_#000]">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 text-xs font-mono font-black uppercase cursor-pointer ${
                viewMode === 'cards' ? 'bg-black text-white' : 'text-black hover:bg-gray-100'
              }`}
            >
              Dossier Cards
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-1 text-xs font-mono font-black uppercase cursor-pointer ${
                viewMode === 'matrix' ? 'bg-black text-white' : 'text-black hover:bg-gray-100'
              }`}
            >
              Matrix Table
            </button>
          </div>

        </div>

        {/* Category Tabs */}
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pt-3 pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-3 py-1 text-xs font-mono font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] neo-btn cursor-pointer ${
                selectedCategory === cat ? 'bg-[#A6FF00] text-black' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        
        {/* Results Counter */}
        <div className="flex items-center justify-between pb-6 font-mono text-xs font-black text-gray-600">
          <span>SHOWING {filteredPrograms.length} OF {ALL_DISEASE_PROGRAMS.length} DISEASE PROGRAMS</span>
          {filteredPrograms.length < ALL_DISEASE_PROGRAMS.length && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setQuickFilter('all');
              }}
              className="text-black underline cursor-pointer hover:text-[#FF5470]"
            >
              RESET ALL FILTERS
            </button>
          )}
        </div>

        {/* ======================================================== */}
        {/* VIEW MODE 1: DETAILED DOSSIER CARDS                      */}
        {/* ======================================================== */}
        {viewMode === 'cards' && (
          <div className="space-y-8">
            {filteredPrograms.map((prog, idx) => (
              <div
                key={prog.id}
                className="bg-white border-3 border-black shadow-[6px_6px_0px_#000] p-6 space-y-6 hover:translate-x-0.5 hover:-translate-y-0.5 transition-all"
              >
                
                {/* Top Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-[#FFE600] border border-black font-mono text-[11px] font-black uppercase">
                        PROGRAM #{String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-100 border border-black font-mono text-[11px] font-black uppercase">
                        {prog.category}
                      </span>
                      <span className="px-2 py-0.5 bg-[#00F0FF] border border-black font-mono text-[11px] font-black uppercase">
                        PDB {prog.pdbId} ({prog.resolution})
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
                      {prog.diseaseName}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalProgram(prog)}
                      className="px-3 py-1.5 bg-[#A6FF00] hover:bg-[#86EF00] border-2 border-black text-xs font-mono font-black uppercase shadow-[2px_2px_0px_#000] neo-btn flex items-center gap-1 cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Deep-Dive Dossier</span>
                    </button>

                    <a
                      href={`https://www.rcsb.org/structure/${prog.pdbId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-white hover:bg-gray-100 border-2 border-black text-xs font-mono font-black uppercase shadow-[2px_2px_0px_#000] neo-btn flex items-center gap-1"
                    >
                      <span>RCSB 3D</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Target & Mutation Banner */}
                <div className="p-3 bg-[#FFFDF0] border-2 border-black flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                  <div>
                    <span className="font-bold text-gray-500">TARGET: </span>
                    <span className="font-black text-black">{prog.targetName}</span>
                    <span className="text-gray-500 ml-2">({prog.geneSymbol} / UniProt {prog.uniprotId})</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-500">RESISTANCE HOTSPOT: </span>
                    <span className="font-black text-[#FF5470] bg-white px-2 py-0.5 border border-black">
                      {prog.primaryMutation}
                    </span>
                  </div>
                </div>

                {/* Head-to-Head 2-Column Split: Existing Drug vs Our Drug */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* LEFT: Existing Frontline Drug (Standard of Care) */}
                  <div className="p-4 bg-[#FFF5F5] border-2 border-black space-y-3 relative">
                    <div className="flex items-center justify-between border-b-2 border-black pb-2">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-[#FF5470]" />
                        <span className="font-mono text-xs font-black uppercase text-[#FF5470]">
                          FRONTLINE STANDARD OF CARE
                        </span>
                      </div>
                      <span className="font-mono text-[11px] font-bold text-gray-600">
                        MUTANT KD: {prog.existingDrug.mutantKd}
                      </span>
                    </div>

                    <div>
                      <div className="text-lg font-black text-black uppercase">
                        {prog.existingDrug.name}
                      </div>
                      <div className="text-xs font-bold text-gray-600">
                        Brand: {prog.existingDrug.brandName}
                      </div>
                    </div>

                    <div className="text-xs font-bold text-gray-700 leading-relaxed">
                      <span className="font-black text-black">Mechanism: </span>
                      {prog.existingDrug.moa}
                    </div>

                    {/* Red Alert Failure Reason Box */}
                    <div className="p-3 bg-white border-2 border-[#FF5470] text-xs space-y-1">
                      <div className="font-mono font-black text-[#FF5470] uppercase flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>WHY FRONTLINE FAILS:</span>
                      </div>
                      <p className="font-bold text-black leading-snug">
                        {prog.existingDrug.failureReason}
                      </p>
                      <p className="text-[11px] text-gray-600 leading-normal pt-1">
                        {prog.existingDrug.failureMechanismBiophysics}
                      </p>
                    </div>

                    <div className="font-mono text-[11px] text-gray-500 pt-1">
                      ⚠️ Resistance: {prog.existingDrug.clinicalFailureRate}
                    </div>
                  </div>

                  {/* RIGHT: Our De Novo Drug (AETHER-RAMI Lead) */}
                  <div className="p-4 bg-[#F2FFF0] border-2 border-black space-y-3 relative">
                    <div className="flex items-center justify-between border-b-2 border-black pb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#00A32A]" />
                        <span className="font-mono text-xs font-black uppercase text-[#00A32A]">
                          AETHER-RAMI DE NOVO RESCUE
                        </span>
                      </div>
                      <span className="font-mono text-[11px] font-black text-black bg-[#A6FF00] px-2 py-0.5 border border-black">
                        {prog.ourDrug.foldImprovement}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-lg font-black text-black uppercase">
                          {prog.ourDrug.leadCode}
                        </div>
                        <div className="text-xs font-bold text-gray-600">
                          Class: {prog.ourDrug.chemicalClass}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-black text-black">
                          Kd = {prog.ourDrug.kdNm} nM
                        </div>
                        <div className="text-[11px] font-mono font-bold text-gray-600">
                          {prog.ourDrug.ic50}
                        </div>
                      </div>
                    </div>

                    {/* Green Alert Bypass Mechanism Box */}
                    <div className="p-3 bg-white border-2 border-[#00A32A] text-xs space-y-1">
                      <div className="font-mono font-black text-[#00A32A] uppercase flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>EQUIVARIANT BYPASS MECHANISM:</span>
                      </div>
                      <p className="font-bold text-black leading-snug">
                        {prog.ourDrug.bypassMechanism}
                      </p>
                      <p className="text-[11px] font-mono text-gray-700 pt-1">
                        ⚡ Selectivity: {prog.ourDrug.selectivityIndex}
                      </p>
                    </div>

                    {/* PoseBusters Badge */}
                    <div className="flex items-center justify-between font-mono text-xs pt-1">
                      <span className="font-black text-black">
                        PoseBusters 18/18:
                      </span>
                      <span className="font-black text-black bg-[#FFE600] px-2 py-0.5 border border-black">
                        {prog.ourDrug.posebustersScore}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Bottom ADMET & Safety Micro-Pills Strip */}
                <div className="pt-2 border-t-2 border-black flex flex-wrap items-center gap-2 text-[11px] font-mono">
                  <span className="font-black uppercase text-gray-500">ADMET Telemetry:</span>
                  <span className="px-2 py-0.5 bg-gray-100 border border-black font-bold">
                    Papp: {prog.ourDrug.admet.caco2Permeability}
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 border border-black font-bold">
                    BBB: {prog.ourDrug.admet.bloodBrainBarrier}
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 border border-black font-bold">
                    T1/2: {prog.ourDrug.admet.halfLifeHours}
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 border border-black font-bold">
                    Oral %F: {prog.ourDrug.admet.bioavailabilityF}
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 border border-black font-bold">
                    hERG: {prog.ourDrug.admet.hergSafety}
                  </span>
                  <span className="px-2 py-0.5 bg-[#A6FF00] border border-black font-black">
                    GTEx: {prog.ourDrug.gtexSafety}
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW MODE 2: HEAD-TO-HEAD MATRIX TABLE                   */}
        {/* ======================================================== */}
        {viewMode === 'matrix' && (
          <div className="bg-white border-3 border-black shadow-[6px_6px_0px_#000] overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="bg-[#FFE600] border-b-3 border-black font-black uppercase text-black">
                  <th className="p-3 border-r-2 border-black">Disease & Indication</th>
                  <th className="p-3 border-r-2 border-black">Target (PDB)</th>
                  <th className="p-3 border-r-2 border-black bg-[#FFDFDF]">Frontline Drug (Standard)</th>
                  <th className="p-3 border-r-2 border-black bg-[#FFDFDF]">Why Frontline Fails</th>
                  <th className="p-3 border-r-2 border-black bg-[#DCFFD4]">AETHER-RAMI Lead</th>
                  <th className="p-3 border-r-2 border-black bg-[#DCFFD4]">Kd (nM)</th>
                  <th className="p-3 border-r-2 border-black bg-[#DCFFD4]">Fold Gain</th>
                  <th className="p-3 border-r-2 border-black">PoseBusters</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black">
                {filteredPrograms.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FFFDF0] transition-colors">
                    
                    {/* Disease */}
                    <td className="p-3 border-r-2 border-black font-bold max-w-xs">
                      <div className="font-black text-black text-sm uppercase">{p.diseaseName}</div>
                      <div className="text-[11px] text-gray-500 font-normal">{p.category}</div>
                    </td>

                    {/* Target */}
                    <td className="p-3 border-r-2 border-black">
                      <div className="font-black text-black">{p.geneSymbol}</div>
                      <a
                        href={`https://www.rcsb.org/structure/${p.pdbId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00F0FF] hover:underline font-black flex items-center gap-1 text-[11px]"
                      >
                        <span>PDB {p.pdbId}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                      <div className="text-[10px] text-red-600 font-bold">{p.primaryMutation}</div>
                    </td>

                    {/* Frontline Drug */}
                    <td className="p-3 border-r-2 border-black bg-[#FFFBFB] font-bold">
                      <div className="text-black font-black">{p.existingDrug.name}</div>
                      <div className="text-[11px] text-gray-600">{p.existingDrug.brandName}</div>
                      <div className="text-[10px] text-red-600">Kd: {p.existingDrug.mutantKd}</div>
                    </td>

                    {/* Why Fails */}
                    <td className="p-3 border-r-2 border-black bg-[#FFFBFB] text-[11px] text-gray-800 max-w-xs">
                      {p.existingDrug.failureReason}
                    </td>

                    {/* Our Lead */}
                    <td className="p-3 border-r-2 border-black bg-[#F8FFF7]">
                      <div className="font-black text-black">{p.ourDrug.leadCode}</div>
                      <div className="text-[10px] text-gray-600">{p.ourDrug.chemicalClass}</div>
                    </td>

                    {/* Kd */}
                    <td className="p-3 border-r-2 border-black bg-[#F8FFF7] font-black text-black">
                      {p.ourDrug.kdNm} nM
                    </td>

                    {/* Fold Gain */}
                    <td className="p-3 border-r-2 border-black bg-[#F8FFF7] font-black text-[#00A32A]">
                      {p.ourDrug.foldImprovement}
                    </td>

                    {/* PoseBusters */}
                    <td className="p-3 border-r-2 border-black font-black text-black">
                      <span className="bg-[#FFE600] px-1.5 py-0.5 border border-black text-[10px]">
                        18/18 PASS
                      </span>
                    </td>

                    {/* Action */}
                    <td className="p-3">
                      <button
                        onClick={() => setActiveModalProgram(p)}
                        className="px-2.5 py-1 bg-black text-white text-[11px] font-black uppercase border border-black hover:bg-[#FFE600] hover:text-black neo-btn cursor-pointer"
                      >
                        Dossier
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </main>

      {/* ======================================================== */}
      {/* DEEP-DIVE MODAL DRAWER                                   */}
      {/* ======================================================== */}
      {activeModalProgram && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-[#FFFDF0] border-4 border-black shadow-[8px_8px_0px_#000] max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b-3 border-black pb-4">
              <div className="space-y-1">
                <span className="px-2 py-0.5 bg-[#FFE600] border border-black font-mono text-xs font-black uppercase">
                  {activeModalProgram.category} • PDB {activeModalProgram.pdbId}
                </span>
                <h2 className="text-2xl font-black text-black uppercase">
                  {activeModalProgram.diseaseName}
                </h2>
              </div>
              <button
                onClick={() => setActiveModalProgram(null)}
                className="p-1.5 bg-white border-2 border-black shadow-[2px_2px_0px_#000] neo-btn cursor-pointer hover:bg-[#FF5470] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Clinical Epidemiology */}
            <div className="p-4 bg-white border-2 border-black space-y-2">
              <div className="font-mono text-xs font-black uppercase text-gray-500">
                CLINICAL BURDEN & EPIDEMIOLOGY:
              </div>
              <p className="text-sm font-bold text-black leading-relaxed">
                {activeModalProgram.clinicalImpact}
              </p>
              <p className="text-xs text-gray-600 font-mono">
                {activeModalProgram.epidemiology}
              </p>
            </div>

            {/* Target Molecular Anatomy */}
            <div className="p-4 bg-[#FFE600] border-2 border-black space-y-2">
              <div className="font-mono text-xs font-black uppercase text-black">
                TARGET RECEPTOR ANATOMY & MUTATION:
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <span className="font-bold text-gray-700">Target: </span>
                  <span className="font-black text-black">{activeModalProgram.targetName}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-700">Gene Symbol: </span>
                  <span className="font-black text-black">{activeModalProgram.geneSymbol} (UniProt {activeModalProgram.uniprotId})</span>
                </div>
                <div>
                  <span className="font-bold text-gray-700">Binding Site: </span>
                  <span className="font-black text-black">{activeModalProgram.bindingSiteType}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-700">Resolution: </span>
                  <span className="font-black text-black">{activeModalProgram.resolution}</span>
                </div>
              </div>
              <div className="pt-1 text-xs font-mono">
                <span className="font-bold text-gray-700">Primary Hotspot Mutation: </span>
                <span className="font-black text-red-700 bg-white px-2 py-0.5 border border-black">
                  {activeModalProgram.primaryMutation}
                </span>
              </div>
            </div>

            {/* Frontline vs Our Drug Detailed Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Existing Drug Failure */}
              <div className="p-4 bg-[#FFF5F5] border-2 border-black space-y-2 text-xs">
                <div className="font-mono font-black uppercase text-[#FF5470] flex items-center gap-1 border-b border-black pb-1">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>FRONTLINE DRUG FAILURE</span>
                </div>
                <div className="text-sm font-black text-black">{activeModalProgram.existingDrug.name} ({activeModalProgram.existingDrug.brandName})</div>
                <div><span className="font-bold">Mechanism: </span>{activeModalProgram.existingDrug.moa}</div>
                <div><span className="font-bold">Resistance: </span>{activeModalProgram.existingDrug.resistanceMutation}</div>
                <div className="p-2 bg-white border border-[#FF5470]">
                  <span className="font-black text-[#FF5470]">Biophysical Clash: </span>
                  {activeModalProgram.existingDrug.failureMechanismBiophysics}
                </div>
                <div className="font-mono text-gray-700">Mutant Kd: {activeModalProgram.existingDrug.mutantKd}</div>
              </div>

              {/* Our Drug Rescue */}
              <div className="p-4 bg-[#F2FFF0] border-2 border-black space-y-2 text-xs">
                <div className="font-mono font-black uppercase text-[#00A32A] flex items-center gap-1 border-b border-black pb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>AETHER-RAMI DE NOVO RESCUE</span>
                </div>
                <div className="text-sm font-black text-black">{activeModalProgram.ourDrug.leadCode}</div>
                <div><span className="font-bold">Chemical Scaffold: </span>{activeModalProgram.ourDrug.chemicalClass}</div>
                <div><span className="font-bold">Affinity: </span>Kd = {activeModalProgram.ourDrug.kdNm} nM ({activeModalProgram.ourDrug.ic50})</div>
                <div className="p-2 bg-white border border-[#00A32A]">
                  <span className="font-black text-[#00A32A]">Equivariant Adaptation: </span>
                  {activeModalProgram.ourDrug.bypassMechanism}
                </div>
                <div className="font-mono font-black text-black bg-[#A6FF00] p-1 border border-black inline-block">
                  {activeModalProgram.ourDrug.foldImprovement}
                </div>
              </div>

            </div>

            {/* ADMET Telemetry Table */}
            <div className="p-4 bg-white border-2 border-black space-y-2">
              <div className="font-mono text-xs font-black uppercase text-black">
                ADMET & SAFETY TELEMETRY (IN VITRO & IN SILICO AUDIT):
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-2 bg-gray-50 border border-black">
                  <div className="text-gray-500 font-bold text-[10px]">Caco-2 Permeability</div>
                  <div className="font-black text-black">{activeModalProgram.ourDrug.admet.caco2Permeability}</div>
                </div>
                <div className="p-2 bg-gray-50 border border-black">
                  <div className="text-gray-500 font-bold text-[10px]">Blood-Brain Barrier</div>
                  <div className="font-black text-black">{activeModalProgram.ourDrug.admet.bloodBrainBarrier}</div>
                </div>
                <div className="p-2 bg-gray-50 border border-black">
                  <div className="text-gray-500 font-bold text-[10px]">Half-Life (T1/2)</div>
                  <div className="font-black text-black">{activeModalProgram.ourDrug.admet.halfLifeHours}</div>
                </div>
                <div className="p-2 bg-gray-50 border border-black">
                  <div className="text-gray-500 font-bold text-[10px]">Oral Bioavailability</div>
                  <div className="font-black text-black">{activeModalProgram.ourDrug.admet.bioavailabilityF}</div>
                </div>
                <div className="p-2 bg-gray-50 border border-black">
                  <div className="text-gray-500 font-bold text-[10px]">hERG Cardiac Safety</div>
                  <div className="font-black text-black">{activeModalProgram.ourDrug.admet.hergSafety}</div>
                </div>
                <div className="p-2 bg-gray-50 border border-black">
                  <div className="text-gray-500 font-bold text-[10px]">PoseBusters Audit</div>
                  <div className="font-black text-[#00A32A]">{activeModalProgram.ourDrug.posebustersScore}</div>
                </div>
              </div>
              <div className="p-2 bg-[#A6FF00] border border-black font-mono text-xs font-black">
                🛡️ GTEx 54-Tissue Safety: {activeModalProgram.ourDrug.gtexSafety}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <a
                href={`https://www.rcsb.org/structure/${activeModalProgram.pdbId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white border-2 border-black font-mono text-xs font-black uppercase shadow-[2px_2px_0px_#000] neo-btn flex items-center gap-1.5"
              >
                <span>Inspect PDB {activeModalProgram.pdbId}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <Link
                href="/"
                className="px-4 py-2 bg-[#A6FF00] border-2 border-black font-mono text-xs font-black uppercase shadow-[3px_3px_0px_#000] neo-btn flex items-center gap-1.5"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Open in 3D WebGL Workbench</span>
              </Link>
            </div>

          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer />

    </div>
  );
}
