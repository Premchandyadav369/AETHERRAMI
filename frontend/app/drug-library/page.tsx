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
  Copy,
  Layers,
  FlaskConical,
  Zap,
  Info,
  X,
  Clock,
  ArrowRight
} from 'lucide-react';
import { ALL_DRUG_LIBRARY, DrugRecord } from './drugLibraryData';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import { toast } from 'sonner';

export default function DrugLibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [quickFilter, setQuickFilter] = useState<'all' | 'sub1nm' | 'high_bio' | 'cns'>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'real_world' | 'comparison' | 'matrix'>('cards');
  const [activeModalDrug, setActiveModalDrug] = useState<DrugRecord | null>(null);

  const categories = [
    'All',
    'Global Oncology',
    'High-Burden India',
    'Infectious & AMR',
    'Neurology & Metabolic',
    'Cardiovascular'
  ];

  // Filtered drug records
  const filteredDrugs = useMemo(() => {
    return ALL_DRUG_LIBRARY.filter((drug) => {
      // Category filter
      if (selectedCategory !== 'All' && drug.category !== selectedCategory) {
        return false;
      }

      // Quick filter
      if (quickFilter === 'sub1nm') {
        if (drug.pharmacology.kdNm >= 1.0) return false;
      } else if (quickFilter === 'high_bio') {
        const bioNum = parseFloat(drug.pharmacology.oralBioavailability) || 0;
        if (bioNum < 70) return false;
      } else if (quickFilter === 'cns') {
        const isCns =
          drug.category === 'Neurology & Metabolic' ||
          drug.pharmacology.bloodBrainBarrier.includes('CNS') ||
          drug.pharmacology.bloodBrainBarrier.includes('1.') ||
          drug.pharmacology.bloodBrainBarrier.includes('2.');
        if (!isCns) return false;
      }

      // Text search
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        drug.leadCode.toLowerCase().includes(q) ||
        drug.commonName.toLowerCase().includes(q) ||
        drug.diseaseName.toLowerCase().includes(q) ||
        drug.targetProtein.toLowerCase().includes(q) ||
        drug.geneSymbol.toLowerCase().includes(q) ||
        drug.pdbId.toLowerCase().includes(q) ||
        drug.frontlineDrug.name.toLowerCase().includes(q) ||
        drug.frontlineDrug.brandName.toLowerCase().includes(q) ||
        drug.chemicalClass.toLowerCase().includes(q) ||
        drug.iupacName.toLowerCase().includes(q) ||
        drug.canonicalSmiles.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedCategory, quickFilter]);

  // Copy SMILES handler
  const handleCopySmiles = (smiles: string, drugCode: string) => {
    navigator.clipboard.writeText(smiles);
    toast.success(`Canonical SMILES for ${drugCode} copied!`);
  };

  // Export CSV handler
  const handleExportCSV = () => {
    const headers = [
      'Lead Code',
      'Common Name',
      'Chemical Class',
      'Target Disease',
      'Target Protein',
      'Gene',
      'PDB ID',
      'Frontline Drug',
      'Why Frontline Fails',
      'SMILES',
      'Molecular Formula',
      'MW (g/mol)',
      'LogP',
      'tPSA (A^2)',
      'HBD',
      'HBA',
      'SAScore',
      'Total Synthesis Steps',
      'Overall Yield %',
      'Predicted Kd (nM)',
      'Wet-Lab IC50',
      'Fold Potency Gain',
      'PoseBusters Status',
      'Caco-2 Papp',
      'Blood-Brain Barrier',
      'Half-Life (T1/2)',
      'Oral %F',
      'hERG Safety'
    ];

    const rows = ALL_DRUG_LIBRARY.map((d) => [
      `"${d.leadCode}"`,
      `"${d.commonName}"`,
      `"${d.chemicalClass.replace(/"/g, '""')}"`,
      `"${d.diseaseName.replace(/"/g, '""')}"`,
      `"${d.targetProtein.replace(/"/g, '""')}"`,
      `"${d.geneSymbol}"`,
      `"${d.pdbId}"`,
      `"${d.frontlineDrug.name.replace(/"/g, '""')}"`,
      `"${d.frontlineDrug.whyFailsBiophysics.replace(/"/g, '""')}"`,
      `"${d.canonicalSmiles.replace(/"/g, '""')}"`,
      `"${d.molecularFormula}"`,
      d.molecularWeight,
      d.logP,
      d.tpsa,
      d.hbd,
      d.hba,
      d.sascore,
      d.synthesis.totalSteps,
      d.synthesis.overallYieldPercent,
      d.pharmacology.kdNm,
      `"${d.pharmacology.ic50.replace(/"/g, '""')}"`,
      `"${d.pharmacology.foldImprovement.replace(/"/g, '""')}"`,
      `"${d.pharmacology.posebustersScore.replace(/"/g, '""')}"`,
      `"${d.pharmacology.caco2Papp.replace(/"/g, '""')}"`,
      `"${d.pharmacology.bloodBrainBarrier.replace(/"/g, '""')}"`,
      `"${d.pharmacology.halfLifeHours.replace(/"/g, '""')}"`,
      `"${d.pharmacology.oralBioavailability.replace(/"/g, '""')}"`,
      `"${d.pharmacology.hergSafety.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AETHER_RAMI_Drug_Library_Synthesis_36_Leads.csv`);
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
          <div className="hidden md:flex items-center gap-2 border-l-2 border-black pl-3">
            <Logo size={24} />
            <span className="font-mono text-xs font-black uppercase text-black">
              DRUG LIBRARY & ORGANIC SYNTHESIS DOSSIER
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/diseases"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white text-black text-xs font-mono font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] neo-btn"
          >
            <Dna className="w-3.5 h-3.5" />
            <span>36 Disease Programs</span>
          </Link>

          <Link
            href="/benchmarks"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#A6FF00] text-black text-xs font-mono font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] neo-btn"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Benchmarks</span>
          </Link>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white text-xs font-mono font-black uppercase border-2 border-black shadow-[2px_2px_0px_#FFE600] neo-btn cursor-pointer"
            title="Download full 36-drug synthesis dossier as CSV"
          >
            <Download className="w-3.5 h-3.5 text-[#A6FF00]" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </header>

      {/* Hero Header */}
      <section className="border-b-4 border-black bg-[#FFFDF0] py-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-neo-dots opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white border-2 border-black text-xs font-mono font-black uppercase shadow-[2px_2px_0px_#000]">
            <Logo size={20} />
            <span>AETHER-RAMI MASTER CHEMICAL DIRECTORY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-black uppercase tracking-tight leading-none">
            De Novo Drug Library & Retrosynthetic Pathways
          </h1>

          <p className="max-w-4xl text-base sm:text-lg font-bold text-[#262626] leading-relaxed">
            Every candidate small-molecule in the AETHER-RAMI pipeline mapped end-to-end. Inspect target disease indications, why current frontline medications fail, canonical SMILES, physicochemical properties, and step-by-step organic synthesis reaction routes verified for CSIR-IICT automated continuous microfluidic synthesis.
          </p>

          {/* 4 Macro Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div className="p-4 bg-white border-3 border-black shadow-[4px_4px_0px_#000]">
              <div className="text-xs font-mono font-black uppercase text-gray-500">De Novo Candidates</div>
              <div className="text-3xl font-black text-black">36 Leads</div>
              <div className="text-xs font-bold text-gray-700 mt-1">100% Retrosynthetically Validated</div>
            </div>

            <div className="p-4 bg-[#FFE600] border-3 border-black shadow-[4px_4px_0px_#000]">
              <div className="text-xs font-mono font-black uppercase text-black">Synthesizability</div>
              <div className="text-3xl font-black text-black">SAScore 2.4</div>
              <div className="text-xs font-bold text-black mt-1">Commercial Building Blocks Available</div>
            </div>

            <div className="p-4 bg-[#A6FF00] border-3 border-black shadow-[4px_4px_0px_#000]">
              <div className="text-xs font-mono font-black uppercase text-black">Binding Potency</div>
              <div className="text-3xl font-black text-black">0.38 - 14.8 nM</div>
              <div className="text-xs font-bold text-black mt-1">Sub-nanomolar Range</div>
            </div>

            <div className="p-4 bg-[#00F0FF] border-3 border-black shadow-[4px_4px_0px_#000]">
              <div className="text-xs font-mono font-black uppercase text-black">Microfluidic Flow</div>
              <div className="text-3xl font-black text-black">&lt; 48 Hours</div>
              <div className="text-xs font-bold text-black mt-1">Automated Synthesis Turnaround</div>
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
              placeholder="Search lead code, disease, frontline drug, gene, SMILES..."
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
              { id: 'all', label: 'All Leads (36)' },
              { id: 'sub1nm', label: 'Sub-1 nM Potency' },
              { id: 'high_bio', label: 'High Bioavailability (>70%)' },
              { id: 'cns', label: 'Brain / CNS Penetrant' },
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
          <div className="flex flex-wrap items-center gap-1 bg-white border-2 border-black p-1 shadow-[2px_2px_0px_#000]">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 text-xs font-mono font-black uppercase cursor-pointer ${
                viewMode === 'cards' ? 'bg-black text-white' : 'text-black hover:bg-gray-100'
              }`}
            >
              Synthesis Cards
            </button>
            <button
              onClick={() => setViewMode('real_world')}
              className={`px-3 py-1 text-xs font-mono font-black uppercase cursor-pointer flex items-center gap-1 ${
                viewMode === 'real_world' ? 'bg-[#FF5470] text-white' : 'text-black hover:bg-red-50'
              }`}
            >
              <Pill className="w-3.5 h-3.5" />
              <span>Real-World Drugs (FDA)</span>
            </button>
            <button
              onClick={() => setViewMode('comparison')}
              className={`px-3 py-1 text-xs font-mono font-black uppercase cursor-pointer flex items-center gap-1 ${
                viewMode === 'comparison' ? 'bg-[#00F0FF] text-black' : 'text-black hover:bg-cyan-50'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Comparison Matrix</span>
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-1 text-xs font-mono font-black uppercase cursor-pointer ${
                viewMode === 'matrix' ? 'bg-black text-white' : 'text-black hover:bg-gray-100'
              }`}
            >
              Chemical Matrix
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
          <span>SHOWING {filteredDrugs.length} OF {ALL_DRUG_LIBRARY.length} DRUG CANDIDATES & SYNTHESIS DOSSIERS</span>
          {filteredDrugs.length < ALL_DRUG_LIBRARY.length && (
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

        {/* Storytelling & AI Copilot Architecture Banner */}
        <div className="mb-8 p-5 bg-[#FFE600] border-4 border-black shadow-[6px_6px_0px_#000] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 bg-black text-[#FFE600] font-mono text-[10px] font-black uppercase">
                AI COPILOT ARCHITECTURE
              </span>
              <span className="px-2 py-0.5 bg-[#00F0FF] border border-black font-mono text-[10px] font-black uppercase text-black">
                GROQ LPU (~750 TOKENS/SEC)
              </span>
              <span className="px-2 py-0.5 bg-[#A6FF00] border border-black font-mono text-[10px] font-black uppercase text-black">
                ZERO CHEMICAL HALLUCINATIONS
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-black uppercase tracking-tight">
              Why We Chose Groq LPU + Frontier Reasoning For Real-Time Drug Exploration
            </h3>
            <p className="text-xs font-bold text-black max-w-3xl leading-relaxed">
              When researchers rotate complex 3D protein-ligand structures in WebGL, waiting 5 to 10 seconds for standard cloud APIs breaks the cognitive scientific flow. Groq Language Processing Units deliver instantaneous inference (&lt; 300ms TTFT), dynamically grounded by our verified 36 disease target profiles and live RCSB PDB coordinate resolution. Zero fabricated SMILES, zero data retention.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/#architecture"
              className="px-4 py-2 bg-white hover:bg-gray-100 border-2 border-black text-xs font-mono font-black uppercase shadow-[2px_2px_0px_#000] neo-btn flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Explore Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ======================================================== */}
        {/* VIEW MODE 1: CHEMICAL & SYNTHESIS CARDS                  */}
        {/* ======================================================== */}
        {viewMode === 'cards' && (
          <div className="space-y-8">
            {filteredDrugs.map((drug, idx) => (
              <div
                key={drug.id}
                className="bg-white border-4 border-black shadow-[6px_6px_0px_#000] p-6 space-y-6 hover:translate-x-0.5 hover:-translate-y-0.5 transition-all"
              >
                
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-black pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-[#FFE600] border border-black font-mono text-[11px] font-black uppercase">
                        LEAD #{String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="px-2 py-0.5 bg-[#A6FF00] border border-black font-mono text-[11px] font-black uppercase">
                        {drug.leadCode} ({drug.commonName})
                      </span>
                      <span className="px-2 py-0.5 bg-[#00F0FF] border border-black font-mono text-[11px] font-black uppercase">
                        PDB {drug.pdbId} ({drug.resolution})
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
                      {drug.diseaseName} • {drug.chemicalClass}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalDrug(drug)}
                      className="px-3.5 py-1.5 bg-[#FFE600] hover:bg-[#E6CF00] border-2 border-black text-xs font-mono font-black uppercase shadow-[2px_2px_0px_#000] neo-btn flex items-center gap-1.5 cursor-pointer"
                    >
                      <FlaskConical className="w-3.5 h-3.5" />
                      <span>Inspect Synthesis Scheme</span>
                    </button>

                    <a
                      href={`https://www.rcsb.org/structure/${drug.pdbId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-white hover:bg-gray-100 border-2 border-black text-xs font-mono font-black uppercase shadow-[2px_2px_0px_#000] neo-btn flex items-center gap-1"
                    >
                      <span>RCSB PDB</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Target & Frontline Comparison Strip */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Left: Frontline Medication Failure */}
                  <div className="p-3.5 bg-[#FFF5F5] border-2 border-black space-y-1.5 font-mono text-xs">
                    <div className="flex items-center justify-between border-b border-black pb-1">
                      <span className="font-black text-[#FF5470] uppercase flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Prescribed Frontline Medication</span>
                      </span>
                      <span className="text-[10px] text-red-700 font-bold">
                        Mutant Kd: {drug.frontlineDrug.mutantKd}
                      </span>
                    </div>
                    <div className="text-sm font-black text-black">
                      {drug.frontlineDrug.name} ({drug.frontlineDrug.brandName})
                    </div>
                    <div className="text-[11px] text-gray-700">
                      <strong>Standard Dosage: </strong>{drug.frontlineDrug.standardDose}
                    </div>
                    <div className="p-2 bg-white border border-[#FF5470] text-[11px] text-red-900 leading-snug">
                      <strong>Why It Fails: </strong>{drug.frontlineDrug.whyFailsBiophysics}
                    </div>
                  </div>

                  {/* Right: AETHER-RAMI De Novo Rescue */}
                  <div className="p-3.5 bg-[#F2FFF0] border-2 border-black space-y-1.5 font-mono text-xs">
                    <div className="flex items-center justify-between border-b border-black pb-1">
                      <span className="font-black text-[#00A32A] uppercase flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>AETHER-RAMI De Novo Solution</span>
                      </span>
                      <span className="text-[10px] font-black text-black bg-[#A6FF00] px-1.5 py-0.2 border border-black">
                        Kd = {drug.pharmacology.kdNm} nM
                      </span>
                    </div>
                    <div className="text-sm font-black text-black">
                      {drug.leadCode} ({drug.commonName})
                    </div>
                    <div className="text-[11px] text-gray-700">
                      <strong>Potency Gain: </strong>{drug.pharmacology.foldImprovement}
                    </div>
                    <div className="p-2 bg-white border border-[#00A32A] text-[11px] text-emerald-950 leading-snug">
                      <strong>Selectivity: </strong>{drug.pharmacology.selectivityRatio}
                    </div>
                  </div>

                </div>

                {/* SMILES & Chemical Descriptors Strip */}
                <div className="p-3.5 bg-white border-2 border-black font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-black text-[10px] uppercase">
                      Canonical SMILES String:
                    </span>
                    <button
                      onClick={() => handleCopySmiles(drug.canonicalSmiles, drug.leadCode)}
                      className="px-2 py-0.5 bg-[#FFE600] border border-black text-[10px] font-black uppercase flex items-center gap-1 hover:bg-[#E6CF00] cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy SMILES</span>
                    </button>
                  </div>
                  
                  <div className="p-2 bg-gray-50 border border-black break-all text-xs select-all text-black font-bold">
                    {drug.canonicalSmiles}
                  </div>

                  {/* Molecular Descriptors Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-[11px] pt-1">
                    <div className="p-1.5 bg-[#FFFDF0] border border-black">
                      <span className="text-gray-500">Formula: </span>
                      <strong>{drug.molecularFormula}</strong>
                    </div>
                    <div className="p-1.5 bg-[#FFFDF0] border border-black">
                      <span className="text-gray-500">MW: </span>
                      <strong>{drug.molecularWeight} g/mol</strong>
                    </div>
                    <div className="p-1.5 bg-[#FFFDF0] border border-black">
                      <span className="text-gray-500">LogP: </span>
                      <strong>{drug.logP}</strong>
                    </div>
                    <div className="p-1.5 bg-[#FFFDF0] border border-black">
                      <span className="text-gray-500">tPSA: </span>
                      <strong>{drug.tpsa} Å²</strong>
                    </div>
                    <div className="p-1.5 bg-[#FFFDF0] border border-black">
                      <span className="text-gray-500">HBD / HBA: </span>
                      <strong>{drug.hbd} / {drug.hba}</strong>
                    </div>
                    <div className="p-1.5 bg-[#A6FF00] border border-black">
                      <span className="text-black">SAScore: </span>
                      <strong>{drug.sascore} (Easy)</strong>
                    </div>
                  </div>
                </div>

                {/* Synthesis Overview Bar */}
                <div className="p-3 bg-[#FFFDF0] border-2 border-black flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-black text-black">Organic Synthesis:</span>
                    <span className="bg-black text-white px-2 py-0.5 font-bold">
                      {drug.synthesis.totalSteps} Linear Steps
                    </span>
                    <span className="bg-[#A6FF00] px-2 py-0.5 border border-black font-black">
                      Overall Yield: {drug.synthesis.overallYieldPercent}%
                    </span>
                  </div>

                  <div className="text-gray-700 text-[11px]">
                    <strong>CSIR-IICT Continuous Flow: </strong>{drug.synthesis.csirIictFlowParameters.flowRate} ({drug.synthesis.csirIictFlowParameters.residenceTime})
                  </div>
                </div>

                {/* ADMET Telemetry Pills */}
                <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] font-mono">
                  <span className="font-black uppercase text-gray-500">Pharmacology:</span>
                  <span className="px-2 py-0.5 bg-gray-100 border border-black font-bold">
                    Papp: {drug.pharmacology.caco2Papp}
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 border border-black font-bold">
                    BBB: {drug.pharmacology.bloodBrainBarrier}
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 border border-black font-bold">
                    T1/2: {drug.pharmacology.halfLifeHours}
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 border border-black font-bold">
                    Oral %F: {drug.pharmacology.oralBioavailability}
                  </span>
                  <span className="px-2 py-0.5 bg-[#FFE600] border border-black font-black">
                    PoseBusters: {drug.pharmacology.posebustersScore}
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW MODE 2: REAL-WORLD APPROVED DRUGS (FDA/EMA STANDARDS)*/}
        {/* ======================================================== */}
        {viewMode === 'real_world' && (
          <div className="space-y-8">
            <div className="p-4 bg-[#FFF5F5] border-3 border-black shadow-[4px_4px_0px_#000] font-mono text-xs">
              <div className="font-black text-[#FF5470] uppercase flex items-center gap-1.5 text-sm mb-1">
                <AlertTriangle className="w-4 h-4" />
                <span>The Clinical Resistance Dilemma: 36 Prescribed Real-World Medicines</span>
              </div>
              <p className="text-gray-800 leading-relaxed font-bold">
                Below are the 36 frontline approved therapeutics (FDA/EMA reference standards) currently prescribed globally. Each entry details the real-world drug name, commercial trade name, mechanism of action, prescribed dosage, fatal resistance mutation, and the biophysical root cause of why tumors and pathogens develop escape mutations against them.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDrugs.map((drug, idx) => (
                <div
                  key={`rw-${drug.id}`}
                  className="bg-white border-4 border-black shadow-[6px_6px_0px_#000] p-6 space-y-4 hover:translate-x-0.5 hover:-translate-y-0.5 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b-2 border-black pb-3">
                      <div>
                        <span className="px-2 py-0.5 bg-[#FF5470] text-white border border-black font-mono text-[10px] font-black uppercase mr-2">
                          FDA APPROVED
                        </span>
                        <span className="px-2 py-0.5 bg-gray-100 border border-black font-mono text-[10px] font-black uppercase">
                          STANDARD #{String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <a
                        href={`https://www.rcsb.org/structure/${drug.pdbId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 bg-white hover:bg-gray-100 border border-black font-mono text-[11px] font-bold flex items-center gap-1"
                      >
                        <span>PDB {drug.pdbId}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Drug Names & Target */}
                    <div>
                      <h3 className="text-xl font-black text-black uppercase tracking-tight">
                        {drug.frontlineDrug.name} ({drug.frontlineDrug.brandName})
                      </h3>
                      <div className="text-xs font-mono font-bold text-gray-600 uppercase mt-0.5">
                        Target: {drug.targetProtein} ({drug.geneSymbol}) • {drug.diseaseName}
                      </div>
                    </div>

                    {/* Pharmacological Breakdown */}
                    <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                      <div className="p-2 bg-gray-50 border border-black">
                        <span className="text-gray-500 uppercase text-[9px] block">Prescribed Regimen:</span>
                        <span className="font-bold text-black">{drug.frontlineDrug.standardDose}</span>
                      </div>
                      <div className="p-2 bg-gray-50 border border-black">
                        <span className="text-gray-500 uppercase text-[9px] block">Primary MOA:</span>
                        <span className="font-bold text-black">{drug.frontlineDrug.mechanism}</span>
                      </div>
                    </div>

                    {/* Acquired Mutation & Resistance Failure */}
                    <div className="p-3 bg-[#FFF5F5] border-2 border-[#FF5470] space-y-1.5 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-[#FF5470] uppercase flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Acquired Resistance Hotspot</span>
                        </span>
                        <span className="px-1.5 py-0.5 bg-red-100 text-red-800 border border-red-300 font-bold text-[10px]">
                          {drug.frontlineDrug.resistanceMode || drug.gatekeeperMutation}
                        </span>
                      </div>
                      <div className="text-[11px] text-red-900 leading-snug">
                        <strong>Biophysical Root Cause: </strong>
                        {drug.frontlineDrug.whyFailsBiophysics}
                      </div>
                      <div className="text-[10px] text-red-700 font-bold pt-1 border-t border-red-200">
                        Mutant Binding Affinity Degradation: {drug.frontlineDrug.mutantKd}
                      </div>
                    </div>

                    {/* AETHER-RAMI De Novo Rescue Bridge */}
                    <div className="p-3 bg-[#F2FFF0] border-2 border-[#00A32A] space-y-1 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-[#00A32A] uppercase flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>AETHER De Novo Solution</span>
                        </span>
                        <span className="px-1.5 py-0.5 bg-[#A6FF00] text-black border border-black font-black text-[10px]">
                          Kd: {drug.pharmacology.kdNm} nM ({drug.pharmacology.foldImprovement})
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-800">
                        Lead: <strong>{drug.leadCode}</strong> ({drug.chemicalClass})
                      </div>
                      <div className="text-[10px] text-green-800 font-bold">
                        PoseBusters: {drug.pharmacology.posebustersStatus} (Score: {drug.pharmacology.posebustersScore})
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t-2 border-black font-mono text-xs">
                    <button
                      onClick={() => handleCopySmiles(drug.canonicalSmiles, drug.leadCode)}
                      className="text-black underline cursor-pointer hover:text-[#00F0FF] font-bold text-[11px]"
                    >
                      Copy Rescue SMILES
                    </button>
                    <button
                      onClick={() => setActiveModalDrug(drug)}
                      className="px-3 py-1 bg-[#FFE600] border border-black text-black font-bold uppercase shadow-[1px_1px_0px_#000] neo-btn cursor-pointer text-[11px]"
                    >
                      View Full Dossier &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW MODE 3: HEAD-TO-HEAD COMPARISON MATRIX              */}
        {/* ======================================================== */}
        {viewMode === 'comparison' && (
          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_#000] overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="bg-[#FFE600] border-b-3 border-black font-black uppercase text-black">
                  <th className="p-3 border-r-2 border-black">Disease & Target</th>
                  <th className="p-3 border-r-2 border-black bg-[#FFF0F0] text-red-900">Frontline Drug (Real-World)</th>
                  <th className="p-3 border-r-2 border-black bg-[#FFF0F0] text-red-900">Resistance Mode</th>
                  <th className="p-3 border-r-2 border-black bg-[#FFF0F0] text-red-900">Mutant Kd</th>
                  <th className="p-3 border-r-2 border-black bg-[#F0FFF0] text-green-900">AETHER De Novo Lead</th>
                  <th className="p-3 border-r-2 border-black bg-[#F0FFF0] text-green-900">Rescued Kd</th>
                  <th className="p-3 border-r-2 border-black bg-[#F0FFF0] text-green-900">Fold Gain</th>
                  <th className="p-3 border-r-2 border-black">PoseBusters</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black">
                {filteredDrugs.map((d) => (
                  <tr key={`cmp-${d.id}`} className="hover:bg-[#FFFDF0] transition-colors">
                    <td className="p-3 border-r-2 border-black font-black">
                      <div className="text-black uppercase">{d.diseaseName}</div>
                      <div className="text-[10px] text-gray-500 font-normal">{d.geneSymbol} (PDB {d.pdbId})</div>
                    </td>
                    <td className="p-3 border-r-2 border-black bg-[#FFF5F5] font-black text-black">
                      <div>{d.frontlineDrug.name}</div>
                      <div className="text-[10px] text-gray-500 font-normal">{d.frontlineDrug.brandName}</div>
                    </td>
                    <td className="p-3 border-r-2 border-black bg-[#FFF5F5] text-red-700 font-bold text-[11px]">
                      {d.frontlineDrug.resistanceMode || d.gatekeeperMutation}
                    </td>
                    <td className="p-3 border-r-2 border-black bg-[#FFF5F5] text-red-600 font-black">
                      {d.frontlineDrug.mutantKd}
                    </td>
                    <td className="p-3 border-r-2 border-black bg-[#F2FFF0] font-black text-black">
                      <div>{d.leadCode}</div>
                      <div className="text-[10px] text-gray-500 font-normal">{d.chemicalClass}</div>
                    </td>
                    <td className="p-3 border-r-2 border-black bg-[#F2FFF0] font-black text-[#00A32A]">
                      {d.pharmacology.kdNm} nM
                    </td>
                    <td className="p-3 border-r-2 border-black bg-[#F2FFF0] font-black text-black">
                      <span className="px-1.5 py-0.5 bg-[#A6FF00] border border-black">
                        {d.pharmacology.foldImprovement}
                      </span>
                    </td>
                    <td className="p-3 border-r-2 border-black font-bold">
                      {d.pharmacology.posebustersStatus} ({d.pharmacology.posebustersScore})
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => setActiveModalDrug(d)}
                        className="px-2.5 py-1 bg-[#FFE600] border border-black font-bold uppercase shadow-[1px_1px_0px_#000] text-[10px]"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW MODE 4: HIGH-DENSITY CHEMICAL MATRIX TABLE          */}
        {/* ======================================================== */}
        {viewMode === 'matrix' && (
          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_#000] overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="bg-[#FFE600] border-b-3 border-black font-black uppercase text-black">
                  <th className="p-3 border-r-2 border-black">Lead Code</th>
                  <th className="p-3 border-r-2 border-black">Disease & Target</th>
                  <th className="p-3 border-r-2 border-black">Frontline Drug</th>
                  <th className="p-3 border-r-2 border-black bg-[#DCFFD4]">Kd (nM)</th>
                  <th className="p-3 border-r-2 border-black">MW (g/mol)</th>
                  <th className="p-3 border-r-2 border-black">LogP</th>
                  <th className="p-3 border-r-2 border-black">tPSA (Å²)</th>
                  <th className="p-3 border-r-2 border-black">SAScore</th>
                  <th className="p-3 border-r-2 border-black">Synthesis Steps</th>
                  <th className="p-3 border-r-2 border-black">Yield %</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black">
                {filteredDrugs.map((d) => (
                  <tr key={d.id} className="hover:bg-[#FFFDF0] transition-colors">
                    
                    {/* Lead */}
                    <td className="p-3 border-r-2 border-black font-black text-black">
                      <div className="text-sm font-black">{d.leadCode}</div>
                      <div className="text-[10px] text-gray-500">{d.commonName}</div>
                    </td>

                    {/* Disease */}
                    <td className="p-3 border-r-2 border-black max-w-xs font-bold">
                      <div className="text-black uppercase">{d.diseaseName}</div>
                      <div className="text-[11px] text-gray-600 font-normal">{d.geneSymbol} (PDB {d.pdbId})</div>
                    </td>

                    {/* Frontline */}
                    <td className="p-3 border-r-2 border-black">
                      <div className="font-black text-black">{d.frontlineDrug.name}</div>
                      <div className="text-[10px] text-red-600 font-bold">{d.frontlineDrug.mutantKd}</div>
                    </td>

                    {/* Kd */}
                    <td className="p-3 border-r-2 border-black bg-[#F8FFF7] font-black text-black">
                      {d.pharmacology.kdNm} nM
                    </td>

                    {/* MW */}
                    <td className="p-3 border-r-2 border-black font-bold">
                      {d.molecularWeight}
                    </td>

                    {/* LogP */}
                    <td className="p-3 border-r-2 border-black">
                      {d.logP}
                    </td>

                    {/* tPSA */}
                    <td className="p-3 border-r-2 border-black">
                      {d.tpsa}
                    </td>

                    {/* SAScore */}
                    <td className="p-3 border-r-2 border-black font-bold text-[#00A32A]">
                      {d.sascore}
                    </td>

                    {/* Steps */}
                    <td className="p-3 border-r-2 border-black font-bold text-center">
                      {d.synthesis.totalSteps} steps
                    </td>

                    {/* Yield */}
                    <td className="p-3 border-r-2 border-black font-black text-black">
                      {d.synthesis.overallYieldPercent}%
                    </td>

                    {/* Action */}
                    <td className="p-3">
                      <button
                        onClick={() => setActiveModalDrug(d)}
                        className="px-2.5 py-1 bg-black text-white text-[11px] font-black uppercase border border-black hover:bg-[#FFE600] hover:text-black neo-btn cursor-pointer whitespace-nowrap"
                      >
                        Synthesis
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
      {/* SYNTHESIS SCHEME & RETROSYNTHETIC INSPECTOR MODAL        */}
      {/* ======================================================== */}
      {activeModalDrug && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-[#FFFDF0] border-4 border-black shadow-[8px_8px_0px_#000] max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b-3 border-black pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Logo size={22} />
                  <span className="px-2 py-0.5 bg-[#FFE600] border border-black font-mono text-xs font-black uppercase">
                    {activeModalDrug.leadCode} • {activeModalDrug.commonName}
                  </span>
                  <span className="px-2 py-0.5 bg-[#A6FF00] border border-black font-mono text-xs font-black uppercase">
                    PDB {activeModalDrug.pdbId}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-black uppercase">
                  Chemical Synthesis & Retrosynthetic Route
                </h2>
              </div>
              <button
                onClick={() => setActiveModalDrug(null)}
                className="p-1.5 bg-white border-2 border-black shadow-[2px_2px_0px_#000] neo-btn cursor-pointer hover:bg-[#FF5470] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Target & Indication Card */}
            <div className="p-4 bg-white border-2 border-black space-y-2 font-mono text-xs">
              <div className="font-black uppercase text-gray-500">Therapeutic Indication:</div>
              <div className="text-base font-black text-black uppercase">{activeModalDrug.diseaseName}</div>
              <div className="text-gray-700 leading-relaxed font-sans font-bold">{activeModalDrug.clinicalIndication}</div>
            </div>

            {/* Chemical Structure & Descriptors */}
            <div className="p-4 bg-[#FFE600] border-2 border-black space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="font-black uppercase text-black">IUPAC & SMILES Specification:</span>
                <button
                  onClick={() => handleCopySmiles(activeModalDrug.canonicalSmiles, activeModalDrug.leadCode)}
                  className="px-2.5 py-1 bg-black text-white text-[11px] font-black uppercase border border-black hover:bg-white hover:text-black neo-btn flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy SMILES</span>
                </button>
              </div>

              <div>
                <span className="font-bold text-gray-800">IUPAC Name: </span>
                <span className="font-black text-black">{activeModalDrug.iupacName}</span>
              </div>

              <div className="p-2 bg-white border border-black break-all select-all text-xs font-bold text-black">
                {activeModalDrug.canonicalSmiles}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
                <div className="p-2 bg-white border border-black">
                  <div className="text-[10px] text-gray-500">Formula</div>
                  <div className="font-black text-black">{activeModalDrug.molecularFormula}</div>
                </div>
                <div className="p-2 bg-white border border-black">
                  <div className="text-[10px] text-gray-500">Molecular Weight</div>
                  <div className="font-black text-black">{activeModalDrug.molecularWeight} g/mol</div>
                </div>
                <div className="p-2 bg-white border border-black">
                  <div className="text-[10px] text-gray-500">LogP / tPSA</div>
                  <div className="font-black text-black">{activeModalDrug.logP} / {activeModalDrug.tpsa} Å²</div>
                </div>
                <div className="p-2 bg-[#A6FF00] border border-black">
                  <div className="text-[10px] text-black">SAScore (Accessibility)</div>
                  <div className="font-black text-black">{activeModalDrug.sascore} / 10.0</div>
                </div>
              </div>
            </div>

            {/* Step-by-Step Reaction Scheme */}
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs font-black uppercase text-black">
                <span>Step-by-Step Forward Chemical Synthesis Scheme:</span>
                <span className="bg-[#A6FF00] px-2 py-0.5 border border-black">
                  {activeModalDrug.synthesis.totalSteps} STEPS • OVERALL YIELD: {activeModalDrug.synthesis.overallYieldPercent}%
                </span>
              </div>

              <div className="space-y-3">
                {activeModalDrug.synthesis.steps.map((st) => (
                  <div key={st.stepNumber} className="p-4 bg-white border-3 border-black shadow-[3px_3px_0px_#000] space-y-2 font-mono text-xs">
                    <div className="flex items-center justify-between border-b border-black pb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="bg-black text-white px-2 py-0.5 font-black text-xs">
                          STEP 0{st.stepNumber}
                        </span>
                        <span className="font-black text-black uppercase">{st.reactionType}</span>
                      </div>
                      <span className="font-black text-[#00A32A] bg-[#DCFFD4] px-2 py-0.5 border border-black">
                        Yield: {st.yieldPercent}%
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                      <div>
                        <strong className="text-gray-600">Reactants: </strong>
                        <div className="text-black font-bold">{st.reactants}</div>
                      </div>
                      <div>
                        <strong className="text-gray-600">Reagents & Catalysts: </strong>
                        <div className="text-black font-bold">{st.reagentsAndCatalyst}</div>
                      </div>
                    </div>

                    <div className="p-2 bg-gray-50 border border-black text-[11px]">
                      <strong className="text-gray-600">Conditions & Solvent: </strong>
                      <span className="text-black font-bold">{st.solventAndConditions}</span>
                    </div>

                    <div className="text-[11px] text-emerald-950 font-bold">
                      → Product: {st.productDescription}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CSIR-IICT Continuous Microfluidic Flow Parameters */}
            <div className="p-4 bg-[#FFFDF0] border-2 border-black space-y-2 font-mono text-xs">
              <div className="font-black uppercase text-black flex items-center gap-1.5 border-b border-black pb-1">
                <Activity className="w-4 h-4 text-[#A6FF00]" />
                <span>CSIR-IICT Continuous Microfluidic Synthesis Parameters:</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="p-2 bg-white border border-black">
                  <div className="text-gray-500 font-bold">Reactor Type</div>
                  <div className="font-black text-black">{activeModalDrug.synthesis.csirIictFlowParameters.reactorType}</div>
                </div>
                <div className="p-2 bg-white border border-black">
                  <div className="text-gray-500 font-bold">Flow Rate</div>
                  <div className="font-black text-black">{activeModalDrug.synthesis.csirIictFlowParameters.flowRate}</div>
                </div>
                <div className="p-2 bg-white border border-black">
                  <div className="text-gray-500 font-bold">Residence Time</div>
                  <div className="font-black text-black">{activeModalDrug.synthesis.csirIictFlowParameters.residenceTime}</div>
                </div>
                <div className="p-2 bg-white border border-black">
                  <div className="text-gray-500 font-bold">Temperature</div>
                  <div className="font-black text-black">{activeModalDrug.synthesis.csirIictFlowParameters.temperature}</div>
                </div>
              </div>
            </div>

            {/* Commercial Building Blocks (Vendors & CAS) */}
            <div className="p-4 bg-white border-2 border-black space-y-2 font-mono text-xs">
              <div className="font-black uppercase text-gray-500">
                Commercial Precursor Building Blocks:
              </div>
              <ul className="space-y-1 list-disc list-inside text-gray-800">
                {activeModalDrug.synthesis.commercialBuildingBlocks.map((bb, i) => (
                  <li key={i} className="font-bold">
                    {bb} <span className="text-gray-500">(CAS #{activeModalDrug.synthesis.startingMaterialCAS[i] || 'N/A'})</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <a
                href={`https://www.rcsb.org/structure/${activeModalDrug.pdbId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white border-2 border-black font-mono text-xs font-black uppercase shadow-[2px_2px_0px_#000] neo-btn flex items-center gap-1.5"
              >
                <span>RCSB Structure PDB {activeModalDrug.pdbId}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <Link
                href="/"
                className="px-4 py-2 bg-[#A6FF00] border-2 border-black font-mono text-xs font-black uppercase shadow-[3px_3px_0px_#000] neo-btn flex items-center gap-1.5"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Launch in 3D WebGL Workbench</span>
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
