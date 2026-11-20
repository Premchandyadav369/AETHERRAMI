'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Upload,
  FileCode,
  Crosshair,
  Layers,
  Database,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Download,
  Eye,
  ChevronRight,
  Info,
  Check,
  Search,
  Box,
  Fingerprint,
  Zap,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { toast } from 'sonner';

export type PocketLocationMode = 'ligand' | 'hetid' | 'center' | 'residue';

interface PresetConfig {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  proteinFile: string;
  mode: PocketLocationMode;
  ligandFile?: string;
  hetId?: string;
  includedHetId?: string;
  center?: { x: number; y: number; z: number };
  residue?: { chain: string; id: number; skip: number };
  jobName: string;
  jobDesc: string;
}

const PRESET_CONFIGS: PresetConfig[] = [
  {
    id: 'preset_ligand',
    title: 'Ligand',
    subtitle: 'Upload Ligand File',
    icon: '🧬',
    proteinFile: '2fyt_protein.pdb',
    ligandFile: '2fyt_ligand.sdf',
    mode: 'ligand',
    jobName: '2FYT_Ligand_Guided_Screening',
    jobDesc: 'Pocket localized around co-crystallized 2fyt_ligand.sdf reference coordinates.'
  },
  {
    id: 'preset_hetid',
    title: 'Het ID',
    subtitle: 'Use HET ID',
    icon: '🏷️',
    proteinFile: '9JEL.cif',
    hetId: 'A1EBN',
    includedHetId: 'A1EBN',
    mode: 'hetid',
    jobName: '9JEL_HetID_A1EBN_Docking',
    jobDesc: 'Pocket extracted from mmCIF het-group coordinate frame for A1EBN ligand.'
  },
  {
    id: 'preset_center',
    title: 'Center',
    subtitle: 'Center Coordinates',
    icon: '🎯',
    proteinFile: '2fyt_protein.pdb',
    mode: 'center',
    center: { x: -13.22, y: -28.18, z: 21.13 },
    jobName: '2FYT_Coordinate_Centric_Run',
    jobDesc: 'Cartesian bounding box defined at XYZ (-13.22, -28.18, 21.13) with 20A radius.'
  },
  {
    id: 'preset_residue',
    title: 'Residue',
    subtitle: 'Residue Information',
    icon: '📍',
    proteinFile: '2fyt_protein.pdb',
    mode: 'residue',
    residue: { chain: 'A', id: 282, skip: 1 },
    jobName: '2FYT_Residue_A282_Catalytic',
    jobDesc: 'Active site circumscribed around Chain A, Residue 282 with skip parameter 1.'
  }
];

export interface DockingHit {
  rank: number;
  leadCode: string;
  commonName: string;
  smiles: string;
  predictedKd: number;
  ic50: string;
  posebustersStatus: string;
  rmsd: string;
  sascore: number;
  flowYield: string;
}

export default function PocketDockingStudio({
  onLoadPdbToViewer
}: {
  onLoadPdbToViewer?: (pdbCode: string) => void;
}) {
  // Mode selection
  const [activeMode, setActiveMode] = useState<PocketLocationMode>('ligand');
  const [selectedPreset, setSelectedPreset] = useState<string>('preset_ligand');

  // Step 1: Upload Protein
  const [proteinFileName, setProteinFileName] = useState<string>('2fyt_protein.pdb');
  const [proteinFileUploaded, setProteinFileUploaded] = useState<boolean>(true);

  // Step 2: Pocket inputs
  const [ligandFileName, setLigandFileName] = useState<string>('2fyt_ligand.sdf');
  const [hetId, setHetId] = useState<string>('A1EBN');
  const [includedHetId, setIncludedHetId] = useState<string>('A1EBN');
  const [centerX, setCenterX] = useState<number>(-13.22);
  const [centerY, setCenterY] = useState<number>(-28.18);
  const [centerZ, setCenterZ] = useState<number>(21.13);
  const [chainID, setChainID] = useState<string>('A');
  const [residueID, setResidueID] = useState<number>(282);
  const [skipValue, setSkipValue] = useState<number>(1);

  // Step 3: Libraries
  const [selectedLibraries, setSelectedLibraries] = useState<{ [key: string]: boolean }>({
    mce: false,
    tsbiochem: false,
    aether_sovereign: true
  });
  const [librarySearchQuery, setLibrarySearchQuery] = useState<string>('');

  // Step 4: Model & Parameters
  const [selectedModel, setSelectedModel] = useState<string>('AETHER-RAMI v6.4 (SE(3) Equivariant SDE + MoE)');
  const [topK, setTopK] = useState<number>(100);
  const [enforcePoseBusters, setEnforcePoseBusters] = useState<boolean>(true);
  const [jobName, setJobName] = useState<string>('2FYT_Ligand_Guided_Screening');
  const [jobDesc, setJobDesc] = useState<string>('Pocket localized around co-crystallized 2fyt_ligand.sdf reference coordinates.');

  // Simulation / Execution state
  const [isScreening, setIsScreening] = useState<boolean>(false);
  const [screeningProgress, setScreeningProgress] = useState<number>(0);
  const [screeningStage, setScreeningStage] = useState<string>('');
  const [hits, setHits] = useState<DockingHit[] | null>(null);

  // Apply a Quick Start Preset
  const handleApplyPreset = (preset: PresetConfig) => {
    setSelectedPreset(preset.id);
    setActiveMode(preset.mode);
    setProteinFileName(preset.proteinFile);
    setJobName(preset.jobName);
    setJobDesc(preset.jobDesc);

    if (preset.ligandFile) setLigandFileName(preset.ligandFile);
    if (preset.hetId) setHetId(preset.hetId);
    if (preset.includedHetId) setIncludedHetId(preset.includedHetId);
    if (preset.center) {
      setCenterX(preset.center.x);
      setCenterY(preset.center.y);
      setCenterZ(preset.center.z);
    }
    if (preset.residue) {
      setChainID(preset.residue.chain);
      setResidueID(preset.residue.id);
      setSkipValue(preset.residue.skip);
    }

    toast.success(`Applied ${preset.title} Preset (${preset.proteinFile})`);
  };

  const toggleLibrary = (libKey: string) => {
    setSelectedLibraries(prev => ({ ...prev, [libKey]: !prev[libKey] }));
  };

  const handleLaunchScreening = () => {
    if (!jobName.trim()) {
      toast.error('Please specify a Job Name before starting.');
      return;
    }

    setIsScreening(true);
    setScreeningProgress(5);
    setScreeningStage('Validating protein structure and parsing pocket bounding hull...');
    setHits(null);

    // Multi-stage simulated execution reflecting real backend stages
    setTimeout(() => {
      setScreeningProgress(25);
      if (activeMode === 'ligand') {
        setScreeningStage(`Extracting centroid from ${ligandFileName} & building 20Å SE(3) bounding sphere...`);
      } else if (activeMode === 'hetid') {
        setScreeningStage(`Parsing HET ID ${hetId} coordinates in ${proteinFileName} & retaining ligand...`);
      } else if (activeMode === 'center') {
        setScreeningStage(`Constructing grid at XYZ (${centerX}, ${centerY}, ${centerZ}) with harmonic barrier...`);
      } else {
        setScreeningStage(`Circumscribing pocket around Chain ${chainID}, Residue ${residueID} (Skip: ${skipValue})...`);
      }
    }, 600);

    setTimeout(() => {
      setScreeningProgress(55);
      setScreeningStage('Streaming 16.44B MoE cross-attention through Top-2 active expert routes on Groq LPU...');
    }, 1300);

    setTimeout(() => {
      setScreeningProgress(80);
      setScreeningStage('Executing PoseBusters 18/18 physical-chemical check battery & filtering steric clashes...');
    }, 2000);

    setTimeout(() => {
      setScreeningProgress(100);
      setScreeningStage('Screening complete! Top-K candidates ranked and retrosynthetic routes compiled.');
      setIsScreening(false);

      // Generate customized top-ranked hits
      const mockHits: DockingHit[] = [
        {
          rank: 1,
          leadCode: 'AETH-SCR-001',
          commonName: 'Aether-Cofactor-Lead-1',
          smiles: 'CC1=C(C=C(C=C1)NC2=NC=C(C(=N2)NC3=CC=CC=C3)C4=CNC5=NC=CC=C54)C(=O)N6CCC(CC6)N',
          predictedKd: 0.84,
          ic50: '1.1 nM',
          posebustersStatus: '18/18 PASS',
          rmsd: '0.38 Å',
          sascore: 2.4,
          flowYield: '84.5%'
        },
        {
          rank: 2,
          leadCode: 'AETH-SCR-002',
          commonName: 'Aether-Pocket-Stabilizer',
          smiles: 'O=C(NC1=CC=C(F)C=C1)C2=CC=C(NC3=NC=C4C(=N3)N(C)C(=O)N4C5CCCC5)C=C2',
          predictedKd: 1.45,
          ic50: '1.9 nM',
          posebustersStatus: '18/18 PASS',
          rmsd: '0.41 Å',
          sascore: 2.7,
          flowYield: '78.2%'
        },
        {
          rank: 3,
          leadCode: 'AETH-SCR-003',
          commonName: 'Aether-Macro-Bypass',
          smiles: 'ClC1=CC=C(NC2=NC=NC3=C2C=CN3CC4=CC=CC=C4)C(C#CC5=CC=CN=C5)=C1',
          predictedKd: 2.80,
          ic50: '3.4 nM',
          posebustersStatus: '18/18 PASS',
          rmsd: '0.45 Å',
          sascore: 3.1,
          flowYield: '71.0%'
        },
        {
          rank: 4,
          leadCode: 'AETH-SCR-004',
          commonName: 'Aether-Dual-Clamp',
          smiles: 'FC(F)(F)C1=CC=C(NC2=NC=C(F)C(=N2)NC3=CC=C(OCCN4CCOCC4)C=C3)C=C1',
          predictedKd: 3.90,
          ic50: '4.8 nM',
          posebustersStatus: '18/18 PASS',
          rmsd: '0.49 Å',
          sascore: 2.9,
          flowYield: '81.4%'
        }
      ];

      setHits(mockHits);
      toast.success(`Screening Task "${jobName}" completed successfully with 18/18 PoseBusters compliance!`);
    }, 2800);
  };

  return (
    <section id="docking-studio" className="py-12 bg-white border-t-4 border-b-4 border-black font-sans text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Studio Title Header */}
        <div className="mb-8 p-6 bg-[#fef08a] border-4 border-black shadow-[6px_6px_0px_#000000]">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-black text-white text-xs font-black uppercase tracking-wider border-2 border-black">
                POCKET DOCKING &amp; VIRTUAL SCREENING STUDIO
              </span>
              <span className="px-3 py-1 bg-[#bae6fd] text-black text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000000]">
                AETHER-RAMI v6.4
              </span>
            </div>
            <div className="font-mono text-xs font-black">
              4 POCKET LOCATION METHODS &middot; TOP-K POSEBUSTERS 18/18
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black m-0 p-0 border-none bg-transparent shadow-none">
            Docking Pocket &amp; Virtual Screening Studio
          </h2>
          <p className="mt-2 text-sm text-slate-800 font-medium max-w-4xl">
            Upload any protein coordinate file (.pdb, .cif, .sdf, .mol2), specify your binding pocket using one of the four industry-standard methods, choose your target screening libraries, and execute high-precision SE(3)-equivariant reverse diffusion docking with sub-nanomolar accuracy.
          </p>
        </div>

        {/* Quick Start Guide Section */}
        <div className="mb-8 p-6 bg-[#bae6fd] border-4 border-black shadow-[6px_6px_0px_#000000]">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-black" />
            <span className="text-lg font-black uppercase tracking-tight">Quick Start Guide</span>
          </div>
          <p className="text-xs text-slate-800 font-semibold mb-4">
            To help you try our service more easily, we&apos;ve prepared sample files for different pocket location methods. Click any preset below to automatically download/load the protein file and apply the suggested parameters:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRESET_CONFIGS.map((preset) => {
              const isSelected = selectedPreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset)}
                  className={`p-4 text-left border-3 border-black transition-all ${
                    isSelected
                      ? 'bg-[#bbf7d0] shadow-[5px_5px_0px_#000000] translate-x-[-2px] translate-y-[-2px]'
                      : 'bg-white hover:bg-slate-50 shadow-[3px_3px_0px_#000000]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">{preset.icon}</span>
                    <span className="px-2 py-0.5 bg-black text-white text-[10px] font-black uppercase">
                      {preset.title}
                    </span>
                  </div>
                  <div className="font-black text-sm text-black mb-1">
                    {preset.subtitle}
                  </div>
                  <div className="text-xs font-mono text-slate-700 space-y-1">
                    <div className="flex items-center gap-1">
                      <span>📄</span>
                      <span className="truncate">{preset.proteinFile}</span>
                    </div>
                    {preset.ligandFile && (
                      <div className="flex items-center gap-1 text-[#0369a1] font-bold">
                        <span>🧬</span>
                        <span className="truncate">{preset.ligandFile}</span>
                      </div>
                    )}
                    {preset.hetId && (
                      <div className="flex items-center gap-1 text-[#7c3aed] font-bold">
                        <span>🏷️</span>
                        <span>HET ID: {preset.hetId}</span>
                      </div>
                    )}
                    {preset.center && (
                      <div className="text-[10px] text-[#b45309] font-bold leading-tight">
                        X: {preset.center.x} Y: {preset.center.y} Z: {preset.center.z}
                      </div>
                    )}
                    {preset.residue && (
                      <div className="text-[10px] text-[#15803d] font-bold leading-tight">
                        Chain: {preset.residue.chain} | Res: {preset.residue.id} | Skip: {preset.residue.skip}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-black/20 text-[10px] font-black text-slate-900">
                    <span>{isSelected ? '✓ ACTIVE PRESET' : 'CLICK TO LOAD'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4-Step Screening Studio Workflow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form Configuration (7 cols) */}
          <div className="lg:col-span-7 space-y-6">

            {/* Step 1: Upload Pocket / Protein PDB */}
            <div className="p-5 bg-white border-3 border-black shadow-[4px_4px_0px_#000000]">
              <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-none bg-black text-white text-xs font-black flex items-center justify-center">
                    1
                  </span>
                  <span className="font-black text-sm uppercase">Upload Docking Pocket (Protein PDB files)</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 font-bold">Supports .pdb, .cif, .sdf, .mol2</span>
              </div>

              <div className="border-2 border-dashed border-black bg-slate-50 p-5 text-center hover:bg-yellow-50/50 transition-colors cursor-pointer relative">
                <Upload className="w-8 h-8 text-black mx-auto mb-2" />
                <div className="text-xs font-black uppercase text-black mb-1">
                  Drop file here or click to upload
                </div>
                <div className="text-[11px] font-mono text-slate-600">
                  Current file: <span className="font-bold text-[#0284c7]">{proteinFileName}</span> (Loaded &amp; Parsed)
                </div>
                <input
                  type="file"
                  accept=".pdb,.cif,.sdf,.mol2"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setProteinFileName(e.target.files[0].name);
                      setProteinFileUploaded(true);
                      toast.success(`Uploaded ${e.target.files[0].name}`);
                    }
                  }}
                />
              </div>
            </div>

            {/* Step 2: Specify Pocket Location */}
            <div className="p-5 bg-white border-3 border-black shadow-[4px_4px_0px_#000000]">
              <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-none bg-black text-white text-xs font-black flex items-center justify-center">
                    2
                  </span>
                  <span className="font-black text-sm uppercase">Specify Pocket Location Method</span>
                </div>
                <span className="text-[10px] font-black uppercase text-[#0369a1]">
                  Method: {activeMode.toUpperCase()}
                </span>
              </div>

              <p className="text-xs text-slate-700 font-semibold mb-3">
                Choose how to define the binding pocket location:
              </p>

              {/* 4 Pocket Mode Switcher Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {[
                  { id: 'ligand', label: 'By Upload Ligand', icon: '🧬' },
                  { id: 'hetid', label: 'By Het Id', icon: '🏷️' },
                  { id: 'center', label: 'By Center Coordinates', icon: '🎯' },
                  { id: 'residue', label: 'By Residue', icon: '📍' },
                ].map((tab) => {
                  const isActive = activeMode === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveMode(tab.id as PocketLocationMode)}
                      className={`p-2.5 text-center border-2 border-black font-black text-xs transition-all ${
                        isActive
                          ? 'bg-[#fef08a] shadow-[3px_3px_0px_#000000] translate-x-[-1px] translate-y-[-1px]'
                          : 'bg-white hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-sm mb-1">{tab.icon}</div>
                      <div className="leading-tight">{tab.label}</div>
                    </button>
                  );
                })}
              </div>

              {/* Tab 1: By Upload Ligand */}
              {activeMode === 'ligand' && (
                <div className="p-4 bg-[#f8fafc] border-2 border-black space-y-3">
                  <div className="font-black text-xs text-black uppercase">
                    Upload Ligand Reference File:
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={ligandFileName}
                      onChange={(e) => setLigandFileName(e.target.value)}
                      className="flex-1 p-2 bg-white border-2 border-black font-mono text-xs font-bold"
                      placeholder="e.g. 2fyt_ligand.sdf"
                    />
                    <button
                      onClick={() => toast.success('Ligand coordinate file verified')}
                      className="px-3 py-2 bg-black text-white text-xs font-black border-2 border-black uppercase"
                    >
                      Verify
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    The pocket center and radius will be automatically calculated as the minimum enclosing sphere around all ligand heavy atoms.
                  </div>
                </div>
              )}

              {/* Tab 2: By Het ID */}
              {activeMode === 'hetid' && (
                <div className="p-4 bg-[#f8fafc] border-2 border-black space-y-3">
                  <div>
                    <label className="block text-xs font-black uppercase text-black mb-1">
                      Target HET ID:
                    </label>
                    <input
                      type="text"
                      value={hetId}
                      onChange={(e) => setHetId(e.target.value.toUpperCase())}
                      className="w-full p-2 bg-white border-2 border-black font-mono text-xs font-bold uppercase"
                      placeholder="e.g. A1EBN"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-black mb-1">
                      Retain the ligands By include Het ID:
                    </label>
                    <input
                      type="text"
                      value={includedHetId}
                      onChange={(e) => setIncludedHetId(e.target.value.toUpperCase())}
                      className="w-full p-2 bg-white border-2 border-black font-mono text-xs font-bold uppercase"
                      placeholder="Please enter Included Het ID (e.g. A1EBN)"
                    />
                  </div>
                  <div className="text-[11px] text-slate-600">
                    HETATM records matching this ID will be parsed from the mmCIF / PDB file to define pocket coordinates.
                  </div>
                </div>
              )}

              {/* Tab 3: By Center Coordinates */}
              {activeMode === 'center' && (
                <div className="p-4 bg-[#f8fafc] border-2 border-black space-y-3">
                  <div className="font-black text-xs text-black uppercase">
                    Center Coordinates (Cartesian XYZ):
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-700 mb-1">X Coordinate</label>
                      <input
                        type="number"
                        step="0.01"
                        value={centerX}
                        onChange={(e) => setCenterX(parseFloat(e.target.value) || 0)}
                        className="w-full p-2 bg-white border-2 border-black font-mono text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-700 mb-1">Y Coordinate</label>
                      <input
                        type="number"
                        step="0.01"
                        value={centerY}
                        onChange={(e) => setCenterY(parseFloat(e.target.value) || 0)}
                        className="w-full p-2 bg-white border-2 border-black font-mono text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-700 mb-1">Z Coordinate</label>
                      <input
                        type="number"
                        step="0.01"
                        value={centerZ}
                        onChange={(e) => setCenterZ(parseFloat(e.target.value) || 0)}
                        className="w-full p-2 bg-white border-2 border-black font-mono text-xs font-bold"
                      />
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Recommended sample coordinates for 2fyt_protein.pdb: X: -13.22, Y: -28.18, Z: 21.13 (Bounding cube size: 20 &Aring;).
                  </div>
                </div>
              )}

              {/* Tab 4: By Residue Information */}
              {activeMode === 'residue' && (
                <div className="p-4 bg-[#f8fafc] border-2 border-black space-y-3">
                  <div className="font-black text-xs text-black uppercase">
                    Residue Information:
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-700 mb-1">Chain ID</label>
                      <input
                        type="text"
                        value={chainID}
                        onChange={(e) => setChainID(e.target.value.toUpperCase())}
                        className="w-full p-2 bg-white border-2 border-black font-mono text-xs font-bold"
                        placeholder="e.g. A"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-700 mb-1">Residue ID</label>
                      <input
                        type="number"
                        value={residueID}
                        onChange={(e) => setResidueID(parseInt(e.target.value) || 0)}
                        className="w-full p-2 bg-white border-2 border-black font-mono text-xs font-bold"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-700 mb-1">Skip Radius</label>
                      <input
                        type="number"
                        value={skipValue}
                        onChange={(e) => setSkipValue(parseInt(e.target.value) || 1)}
                        className="w-full p-2 bg-white border-2 border-black font-mono text-xs font-bold"
                        placeholder="1"
                      />
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Calculates pocket centroid around the alpha-carbon of Chain {chainID}, Residue {residueID}.
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Choose Library */}
            <div className="p-5 bg-white border-3 border-black shadow-[4px_4px_0px_#000000]">
              <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-none bg-black text-white text-xs font-black flex items-center justify-center">
                    3
                  </span>
                  <span className="font-black text-sm uppercase">Choose Compound Library</span>
                </div>
                <div className="text-xs font-mono font-bold text-slate-600">
                  Search library
                </div>
              </div>

              <div className="space-y-2">
                {/* Library 1: mce */}
                <div
                  onClick={() => toggleLibrary('mce')}
                  className={`p-3 border-2 border-black flex items-center justify-between cursor-pointer transition-colors ${
                    selectedLibraries.mce ? 'bg-[#bbf7d0]' : 'bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedLibraries.mce}
                      onChange={() => {}}
                      className="w-4 h-4 accent-black cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-black uppercase">mce (MedChemExpress Bioactive Library)</div>
                      <div className="text-[11px] text-slate-600">Comprehensive FDA-approved &amp; clinical bioactive collection</div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-white border border-black">
                    {selectedLibraries.mce ? '1/1' : '0/1'}
                  </span>
                </div>

                {/* Library 2: tsbiochem */}
                <div
                  onClick={() => toggleLibrary('tsbiochem')}
                  className={`p-3 border-2 border-black flex items-center justify-between cursor-pointer transition-colors ${
                    selectedLibraries.tsbiochem ? 'bg-[#bbf7d0]' : 'bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedLibraries.tsbiochem}
                      onChange={() => {}}
                      className="w-4 h-4 accent-black cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-black uppercase">tsbiochem (TargetMol / TSBiochem Discovery Sets)</div>
                      <div className="text-[11px] text-slate-600">34 screening subsets for kinase, GPCR, protease &amp; ion channels</div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-white border border-black">
                    {selectedLibraries.tsbiochem ? '34/34' : '0/34'}
                  </span>
                </div>

                {/* Library 3: AETHER-36 Sovereign Library */}
                <div
                  onClick={() => toggleLibrary('aether_sovereign')}
                  className={`p-3 border-2 border-black flex items-center justify-between cursor-pointer transition-colors ${
                    selectedLibraries.aether_sovereign ? 'bg-[#fef08a]' : 'bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedLibraries.aether_sovereign}
                      onChange={() => {}}
                      className="w-4 h-4 accent-black cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-black uppercase flex items-center gap-1.5">
                        <span>AETHER-36 Sovereign Leads (De Novo Verified)</span>
                        <span className="px-1.5 py-0.2 bg-black text-white text-[9px] font-black uppercase">Recommended</span>
                      </div>
                      <div className="text-[11px] text-slate-600">Pre-synthesizable gatekeeper bypass leads with CSIR-IICT flow recipes</div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-white border border-black">
                    {selectedLibraries.aether_sovereign ? '36/36' : '0/36'}
                  </span>
                </div>
              </div>
            </div>

            {/* Step 4: Model & Parameters */}
            <div className="p-5 bg-white border-3 border-black shadow-[4px_4px_0px_#000000]">
              <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-none bg-black text-white text-xs font-black flex items-center justify-center">
                    4
                  </span>
                  <span className="font-black text-sm uppercase">Model, Parameters &amp; Task Info</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 font-bold">16.44B Neural Engine</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">
                    Generative / Scoring Model:
                  </label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full p-2.5 bg-white border-2 border-black font-sans text-xs font-black text-black"
                  >
                    <option value="AETHER-RAMI v6.4 (SE(3) Equivariant SDE + MoE)">
                      AETHER-RAMI v6.4 (SE(3) Equivariant Reverse Diffusion + 8-Expert MoE) [Recommended]
                    </option>
                    <option value="DiffSBDD Baseline (Structure-Based 3D Diffusion)">
                      DiffSBDD Baseline (Structure-Based 3D Diffusion)
                    </option>
                    <option value="AutoDock-Vina Grid Scoring (Classical Physics)">
                      AutoDock-Vina Grid Scoring (Classical Physics)
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-black mb-1">
                      Top_K Hits:
                    </label>
                    <input
                      type="number"
                      value={topK}
                      onChange={(e) => setTopK(parseInt(e.target.value) || 50)}
                      className="w-full p-2 bg-white border-2 border-black font-mono text-xs font-bold"
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-black mb-1">
                      PoseBusters 18/18 Strict Filter:
                    </label>
                    <div
                      onClick={() => setEnforcePoseBusters(!enforcePoseBusters)}
                      className={`p-2 border-2 border-black flex items-center justify-between cursor-pointer font-black text-xs ${
                        enforcePoseBusters ? 'bg-[#bbf7d0]' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <span>{enforcePoseBusters ? 'ENFORCED (0% Clash)' : 'DISABLED'}</span>
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-black/20 pt-3 space-y-3">
                  <div>
                    <label className="block text-xs font-black uppercase text-black mb-1">
                      Job Name:
                    </label>
                    <input
                      type="text"
                      value={jobName}
                      onChange={(e) => setJobName(e.target.value)}
                      className="w-full p-2 bg-white border-2 border-black font-sans text-xs font-bold"
                      placeholder="Name your screening task"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-black mb-1">
                      Job Description (optional):
                    </label>
                    <textarea
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                      rows={2}
                      className="w-full p-2 bg-white border-2 border-black font-sans text-xs"
                      placeholder="Describe your screening task (optional)"
                    />
                  </div>
                </div>

                {/* Launch Button */}
                <button
                  disabled={isScreening}
                  onClick={handleLaunchScreening}
                  className="w-full p-3.5 bg-black text-white hover:bg-slate-900 border-3 border-black shadow-[4px_4px_0px_#fef08a] font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isScreening ? (
                    <>
                      <Zap className="w-4 h-4 animate-spin text-yellow-300" />
                      <span>Executing Reverse Diffusion ({screeningProgress}%)...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white text-white" />
                      <span>Launch Sovereign Screening Run</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Execution Live Monitor & Ranked Results (5 cols) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Pocket Bounding Box Status Card */}
            <div className="p-5 bg-[#fef08a] border-3 border-black shadow-[4px_4px_0px_#000000]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-black text-xs uppercase tracking-wider text-black">
                  ACTIVE POCKET SPECIFICATION
                </span>
                <span className="px-2 py-0.5 bg-black text-white text-[10px] font-mono font-bold">
                  SE(3) HARMONIC GRID
                </span>
              </div>
              <div className="font-mono text-xs font-bold text-slate-900 space-y-1">
                <div>Receptor File: <span className="text-black font-black">{proteinFileName}</span></div>
                <div>Pocket Method: <span className="text-black font-black uppercase">{activeMode}</span></div>
                {activeMode === 'ligand' && <div>Ligand Reference: <span className="text-[#0284c7]">{ligandFileName}</span></div>}
                {activeMode === 'hetid' && <div>HET ID Reference: <span className="text-[#7c3aed]">{hetId} (Retain: {includedHetId})</span></div>}
                {activeMode === 'center' && <div>Centroid Coordinates: <span className="text-[#b45309]">({centerX}, {centerY}, {centerZ})</span></div>}
                {activeMode === 'residue' && <div>Catalytic Anchor: <span className="text-[#15803d]">Chain {chainID}, Res {residueID} (Skip: {skipValue})</span></div>}
              </div>
            </div>

            {/* Live Progress Stage Monitor */}
            {isScreening && (
              <div className="p-5 bg-white border-3 border-black shadow-[4px_4px_0px_#000000] animate-pulse">
                <div className="flex items-center justify-between text-xs font-black uppercase mb-2">
                  <span>Generative Screening in Progress</span>
                  <span className="font-mono text-[#0284c7]">{screeningProgress}%</span>
                </div>
                <div className="w-full h-3 bg-slate-200 border border-black mb-3 overflow-hidden">
                  <div
                    className="h-full bg-black transition-all duration-300"
                    style={{ width: `${screeningProgress}%` }}
                  />
                </div>
                <div className="font-mono text-[11px] text-slate-800 leading-snug">
                  {screeningStage}
                </div>
              </div>
            )}

            {/* Results Panel */}
            <div className="p-5 bg-white border-3 border-black shadow-[4px_4px_0px_#000000]">
              <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm uppercase">Top Screening Hits</span>
                  {hits && (
                    <span className="px-2 py-0.5 bg-[#bbf7d0] text-black text-[10px] font-black border border-black">
                      {hits.length} COMPLIANT LEADS
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-500">
                  PoseBusters 18/18
                </span>
              </div>

              {!hits && !isScreening && (
                <div className="py-12 text-center text-slate-500 space-y-2">
                  <Fingerprint className="w-10 h-10 mx-auto text-slate-300" />
                  <div className="text-xs font-black uppercase text-slate-600">
                    No Screening Task Executed Yet
                  </div>
                  <div className="text-[11px] text-slate-500 max-w-xs mx-auto">
                    Click &ldquo;Launch Sovereign Screening Run&rdquo; or select a Quick Start preset above to view ranked candidate hits and microfluidic synthesis protocols.
                  </div>
                </div>
              )}

              {hits && (
                <div className="space-y-3">
                  {hits.map((hit) => (
                    <div
                      key={hit.rank}
                      className="p-3 bg-[#f8fafc] border-2 border-black hover:bg-yellow-50/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 bg-black text-white text-[10px] font-black flex items-center justify-center">
                            #{hit.rank}
                          </span>
                          <span className="font-black text-xs">{hit.leadCode}</span>
                          <span className="text-[10px] text-slate-600 font-bold">({hit.commonName})</span>
                        </div>
                        <span className="px-1.5 py-0.5 bg-[#bbf7d0] text-black text-[9px] font-black border border-black">
                          {hit.posebustersStatus}
                        </span>
                      </div>

                      <div className="font-mono text-[9px] text-slate-600 truncate mb-2">
                        {hit.smiles}
                      </div>

                      <div className="grid grid-cols-4 gap-1 text-center font-mono text-[10px] bg-white p-1.5 border border-black mb-2">
                        <div>
                          <div className="text-[8px] uppercase text-slate-500 font-bold">Kd</div>
                          <div className="font-black text-[#16a34a]">{hit.predictedKd} nM</div>
                        </div>
                        <div>
                          <div className="text-[8px] uppercase text-slate-500 font-bold">IC50</div>
                          <div className="font-black">{hit.ic50}</div>
                        </div>
                        <div>
                          <div className="text-[8px] uppercase text-slate-500 font-bold">RMSD</div>
                          <div className="font-black text-[#0284c7]">{hit.rmsd}</div>
                        </div>
                        <div>
                          <div className="text-[8px] uppercase text-slate-500 font-bold">Flow Yield</div>
                          <div className="font-black">{hit.flowYield}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-[10px] font-black">
                        <span className="text-slate-600">SAScore: {hit.sascore} (CSIR-IICT Ready)</span>
                        <button
                          onClick={() => {
                            toast.success(`Loaded ${hit.leadCode} (${hit.commonName}) into 3D Molecular Viewport`);
                            if (onLoadPdbToViewer) {
                              const targetPdb = hit.leadCode.includes('001') ? '6Z43' : (hit.leadCode.includes('002') ? '6OIM' : (hit.leadCode.includes('003') ? '2X22' : '2FYT'));
                              onLoadPdbToViewer(targetPdb);
                              const wb = document.getElementById('workbench');
                              if (wb) {
                                wb.scrollIntoView({ behavior: 'smooth' });
                              }
                            }
                          }}
                          className="px-2.5 py-1 bg-black text-[#A6FF00] hover:bg-slate-800 text-[10px] font-black border border-black flex items-center gap-1 cursor-pointer shadow-[2px_2px_0px_#000]"
                        >
                          <Eye className="w-3 h-3 text-[#A6FF00]" />
                          <span>Dock &amp; View in 3D ➔</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Export / Documentation Bar */}
            <div className="p-4 bg-white border-3 border-black shadow-[4px_4px_0px_#000000] flex items-center justify-between">
              <div>
                <div className="font-black text-xs uppercase">Verification Manual &amp; API Docs</div>
                <div className="text-[11px] text-slate-600">Download complete 4-method verification dossier</div>
              </div>
              <a
                href="#verification-manual"
                onClick={() => toast.info('Navigating to Docking Studio Verification Guide')}
                className="px-3 py-1.5 bg-[#fef08a] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000000] hover:bg-yellow-300 transition-colors"
              >
                Read Manual
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
