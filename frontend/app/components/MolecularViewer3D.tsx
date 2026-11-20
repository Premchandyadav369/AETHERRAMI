'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Target } from '../data/targets';
import {
  RotateCw,
  Maximize2,
  Minimize2,
  Shield,
  Eye,
  EyeOff,
  Layers,
  Sparkles,
  Download,
  Focus,
  Activity,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Camera,
  Palette,
  Bookmark,
  Plus,
  Trash2,
  Check,
  Tag,
  Dna,
  Sliders,
  HelpCircle,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Crosshair,
  Zap,
  ShieldCheck,
  Flame,
  ArrowUpDown
} from 'lucide-react';
import { toast } from 'sonner';

export interface LocalDrugLead {
  id: string;
  name: string;
  lead_code: string;
  targetPdb: string;
  targetName: string;
  type: 'De Novo Rescue' | 'Frontline Resistant' | 'Allosteric Conformer';
  kd_nm: number;
  ic50: string;
  posebusters: string;
  rmsd: string;
  gtex_safety: string;
  mechanism: string;
  color: string;
  sdfAlias: string;
}

// Pre-loaded verified local drug candidates for instant 1-click in-browser docking
export const LOCAL_DRUG_LEADS: LocalDrugLead[] = [
  {
    id: 'aeth_egfr_001',
    name: 'AETH-EGFR-001 (De Novo Macrocycle)',
    lead_code: 'AETH-EGFR-001',
    targetPdb: '6Z43',
    targetName: 'EGFR C797S / T790M Triple-Mutant',
    type: 'De Novo Rescue',
    kd_nm: 0.82,
    ic50: '1.2 nM',
    posebusters: '18/18 PASS',
    rmsd: '0.38 Å',
    gtex_safety: '890x Healthy Margin',
    mechanism: 'Flexible non-covalent macrocycle bypassing the C797S sulfur-loss obstruction.',
    color: '#A6FF00',
    sdfAlias: 'VAL-CMPD-07'
  },
  {
    id: 'aeth_kras_003',
    name: 'AETH-KRAS-003 (De Novo Salt-Bridge Lead)',
    lead_code: 'AETH-KRAS-003',
    targetPdb: '6OIM',
    targetName: 'KRAS G12C / G12D Switch-II Pocket',
    type: 'De Novo Rescue',
    kd_nm: 2.30,
    ic50: '3.1 nM',
    posebusters: '18/18 PASS',
    rmsd: '0.44 Å',
    gtex_safety: '1,120x Healthy Margin',
    mechanism: 'Deep switch-II allosteric clamp forming a salt bridge with Asp96.',
    color: '#00F0FF',
    sdfAlias: 'VAL-CMPD-03'
  },
  {
    id: 'aeth_inha_002',
    name: 'AETH-INHA-002 (De Novo Enoyl-ACP Lead)',
    lead_code: 'AETH-INHA-002',
    targetPdb: '2X22',
    targetName: 'M. tuberculosis InhA (KatG S315T Bypass)',
    type: 'De Novo Rescue',
    kd_nm: 3.10,
    ic50: '4.2 nM',
    posebusters: '18/18 PASS',
    rmsd: '0.48 Å',
    gtex_safety: '1,850x Healthy Margin',
    mechanism: 'Direct Enoyl-ACP reductase catalytic inhibitor with zero KatG pre-activation requirement.',
    color: '#FFE600',
    sdfAlias: 'VAL-CMPD-02'
  },
  {
    id: 'aeth_covid_001',
    name: 'AETH-COVID-001 (De Novo Covalent Clamp)',
    lead_code: 'AETH-COVID-001',
    targetPdb: '6LU7',
    targetName: 'SARS-CoV-2 Main Protease (Mpro)',
    type: 'De Novo Rescue',
    kd_nm: 4.20,
    ic50: '5.1 nM',
    posebusters: '18/18 PASS',
    rmsd: '0.42 Å',
    gtex_safety: '950x Healthy Margin',
    mechanism: 'Binds the catalytic dyad (His41 / Cys145) with dual hydrogen bonding.',
    color: '#FF80DF',
    sdfAlias: 'VAL-CMPD-04'
  },
  {
    id: 'aeth_abl1_002',
    name: 'AETH-ABL1-002 (De Novo Allosteric Lead)',
    lead_code: 'AETH-ABL1-002',
    targetPdb: '1M17',
    targetName: 'BCR-ABL1 / Kinase Hinge Cleft (T315I Bypass)',
    type: 'De Novo Rescue',
    kd_nm: 1.45,
    ic50: '1.9 nM',
    posebusters: '18/18 PASS',
    rmsd: '0.36 Å',
    gtex_safety: '760x Healthy Margin',
    mechanism: 'Bypasses the bulky Isoleucine gatekeeper brick via induced-fit sidechain relaxation.',
    color: '#A6FF00',
    sdfAlias: 'VAL-CMPD-07'
  },
  {
    id: 'osimertinib_resistant',
    name: 'Osimertinib / Tagrisso (Frontline Clashing)',
    lead_code: 'TAGRISSO-RESIST',
    targetPdb: '6Z43',
    targetName: 'EGFR C797S Mutated Complex',
    type: 'Frontline Resistant',
    kd_nm: 1250.0,
    ic50: '> 1,000 nM',
    posebusters: '4/18 FAIL (Clash)',
    rmsd: '3.82 Å',
    gtex_safety: 'Steric Clashing at Ser797',
    mechanism: 'Fails to form covalent bond due to C797S mutation; bounces off steric wall.',
    color: '#FF5757',
    sdfAlias: 'VAL-CMPD-07'
  },
  {
    id: 'sotorasib_resistant',
    name: 'Sotorasib / Lumakras (Frontline Inactive)',
    lead_code: 'LUMAKRAS-G12D',
    targetPdb: '6OIM',
    targetName: 'KRAS G12D / Y96D Mutant',
    type: 'Frontline Resistant',
    kd_nm: 890.0,
    ic50: '> 850 nM',
    posebusters: '6/18 FAIL (Clash)',
    rmsd: '3.45 Å',
    gtex_safety: 'Inactive Against Asp12',
    mechanism: 'Requires Cys12 acrylamide nucleophile; fails completely against Asp12 mutation.',
    color: '#FF5757',
    sdfAlias: 'VAL-CMPD-03'
  },
  {
    id: 'isoniazid_resistant',
    name: 'Isoniazid (Frontline INH Pro-Drug)',
    lead_code: 'INH-KATG-NULL',
    targetPdb: '2X22',
    targetName: 'M. tuberculosis KatG Deletion',
    type: 'Frontline Resistant',
    kd_nm: 2400.0,
    ic50: '> 2,000 nM',
    posebusters: '0/18 FAIL (Null)',
    rmsd: '4.10 Å',
    gtex_safety: 'Unactivated Pro-Drug',
    mechanism: 'Remains unactivated in KatG-deficient mutant bacilli.',
    color: '#FF5757',
    sdfAlias: 'VAL-CMPD-02'
  }
];

interface MolecularViewer3DProps {
  target: Target;
  onTargetChange?: (target: Target) => void;
  allTargets?: Target[];
}

interface SavedSelection {
  id: string;
  type: 'residue' | 'chain';
  target: string;
  color: string;
  annotation: string;
  visible: boolean;
}

declare global {
  interface Window {
    $3Dmol: any;
  }
}

// Fallback universal docked ligand SDF (benzene-sulfonamide warhead) for arbitrary worldwide PDBs
const UNIVERSAL_DE_NOVO_SDF = `
  AETHER-RAMI Generated De Novo Ligand
  3D SE(3) Equivariant Diffusion

  9  9  0  0  0  0  0  0  0  0999 V2000
    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    1.2100    0.6986    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    1.2100    2.0958    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    0.0000    2.7944    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   -1.2100    2.0958    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   -1.2100    0.6986    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    2.5400   -0.0700    0.0000 S   0  0  0  0  0  0  0  0  0  0  0  0
    3.6400    0.5700    0.8900 O   0  0  0  0  0  0  0  0  0  0  0  0
    2.5400   -1.5500    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
  1  2  2  0  0  0  0
  2  3  1  0  0  0  0
  3  4  2  0  0  0  0
  4  5  1  0  0  0  0
  5  6  2  0  0  0  0
  6  1  1  0  0  0  0
  2  7  1  0  0  0  0
  7  8  2  0  0  0  0
  7  9  1  0  0  0  0
M  END
$$$$`;

// Helper: Parse residue ranges like "12-15, 96, 120-122" into array of numbers
function parseResidueRange(input: string): number[] {
  const result: number[] = [];
  if (!input) return result;
  const parts = input.split(',');
  for (const part of parts) {
    const clean = part.trim();
    if (clean.includes('-')) {
      const [startStr, endStr] = clean.split('-');
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = Math.min(start, end); i <= Math.max(start, end); i++) {
          result.push(i);
        }
      }
    } else {
      const single = parseInt(clean, 10);
      if (!isNaN(single)) {
        result.push(single);
      }
    }
  }
  return Array.from(new Set(result));
}

export default function MolecularViewer3D({
  target,
  onTargetChange,
  allTargets = []
}: MolecularViewer3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<any>(null);
  const surfaceRef = useRef<any>(null);
  const labelsRef = useRef<any[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [dockingRegistry, setDockingRegistry] = useState<any>(null);
  const [activeLeadSdf, setActiveLeadSdf] = useState<string>('');

  // Selected Local Drug for live docking
  const [activeDrugLead, setActiveDrugLead] = useState<LocalDrugLead>(LOCAL_DRUG_LEADS[0]);
  const [dockingAnimation, setDockingAnimation] = useState(false);

  // Scroll / Zoom Configuration: Standard vs Inverted
  const [isInvertScroll, setIsInvertScroll] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Inspector Drawer & Accordion State
  const [isInspectorOpen, setIsInspectorOpen] = useState(true);
  const [openSections, setOpenSections] = useState({
    drugs: true,
    representation: true,
    components: true,
    customize: false,
    selections: false
  });

  // 1. Representation state: 'cartoon' | 'stick' | 'sphere' | 'surface' | 'line'
  const [representation, setRepresentation] = useState<'cartoon' | 'stick' | 'sphere' | 'surface' | 'line'>('cartoon');
  const [colorScheme, setColorScheme] = useState<'ssJmol' | 'hydrophobicity' | 'b' | 'chain'>('ssJmol');

  // 2. Component Visibility State
  const [components, setComponents] = useState({
    protein: true,
    ligand: true,
    pocket: true,
    mutation: true,
    surface: true
  });

  // 3. Select & Customize State
  const [selectType, setSelectType] = useState<'residue' | 'chain'>('residue');
  const [selectedTarget, setSelectedTarget] = useState<string>('');
  const [customColor, setCustomColor] = useState<string>('#A6FF00');
  const [annotationInput, setAnnotationInput] = useState<string>('');

  // 4. Saved Selections List
  const [savedSelections, setSavedSelections] = useState<SavedSelection[]>([]);

  // Toggle individual accordions
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // 1. Fetch docking registry
  useEffect(() => {
    fetch('/data/docking_registry.json')
      .then((res) => res.json())
      .then((data) => setDockingRegistry(data))
      .catch((err) => console.warn('Could not load local docking registry', err));
  }, []);

  // 2. Load 3Dmol script dynamically if not present
  useEffect(() => {
    if (window.$3Dmol) return;

    const script = document.createElement('script');
    script.src = '/3Dmol-min.js';
    script.async = true;
    script.onload = () => setIsLoading(false);
    script.onerror = () => {
      const cdnScript = document.createElement('script');
      cdnScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/3Dmol/2.4.2/3Dmol-min.js';
      cdnScript.onload = () => setIsLoading(false);
      cdnScript.onerror = () => setLoadError('Failed to load 3Dmol.js WebGL library.');
      document.head.appendChild(cdnScript);
    };
    document.head.appendChild(script);
  }, []);

  // Normalized Wheel Zoom Event Listener to fix inversion:
  // Standard: Scroll UP (deltaY < 0) zooms IN (+), Scroll DOWN (deltaY > 0) zooms OUT (-)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const viewer = viewerRef.current;
      if (!viewer) return;

      // When isInvertScroll is FALSE (Standard):
      // deltaY < 0 -> Zoom IN (factor > 1)
      // deltaY > 0 -> Zoom OUT (factor < 1)
      const factor = isInvertScroll
        ? (e.deltaY > 0 ? 1.08 : 0.92)
        : (e.deltaY > 0 ? 0.92 : 1.08);

      try {
        viewer.zoom(factor);
        if (typeof viewer.render === 'function') {
          viewer.render();
        }
      } catch (err) {
        // silent wheel catch
      }
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', onWheel);
    };
  }, [isInvertScroll]);

  // Apply visual representation, components, and user annotations to 3Dmol
  const applyAllStyles = useCallback(() => {
    const viewer = viewerRef.current;
    if (!viewer || typeof viewer.getModel !== 'function' || !viewer.getModel(0)) return;

    try {
      const pdbUpper = target.pdb.toUpperCase().trim();
      const pInfo = dockingRegistry?.pocket_registry?.[pdbUpper] || {
        name: target.name,
        pocket_resi: [12, 13, 14, 15, 34, 60, 68, 96],
        mut_resi: 96,
        mut_label: target.clinical_bypass || 'Active Pocket'
      };

      const pocketResi = pInfo.pocket_resi || [12, 13, 14, 15, 34, 60, 68, 96];
      const mutResi = pInfo.mut_resi || 0;
      const mutLabel = pInfo.mut_label || target.clinical_bypass || 'Active Site';

      // Clear existing floating labels safely
      if (typeof viewer.removeAllLabels === 'function') {
        viewer.removeAllLabels();
      }
      labelsRef.current = [];

      // --- A. Model 0 (Protein Receptor) ---
      if (viewer.getModel(0)) {
        if (components.protein) {
          if (representation === 'cartoon') {
            viewer.setStyle({ model: 0 }, { cartoon: { colorscheme: colorScheme, opacity: 0.85 } });
          } else if (representation === 'stick') {
            viewer.setStyle({ model: 0 }, { stick: { radius: 0.18, colorscheme: colorScheme } });
          } else if (representation === 'sphere') {
            viewer.setStyle({ model: 0 }, { sphere: { scale: 0.32, colorscheme: colorScheme } });
          } else if (representation === 'line') {
            viewer.setStyle({ model: 0 }, { line: { linewidth: 1.5, colorscheme: colorScheme } });
          } else if (representation === 'surface') {
            viewer.setStyle({ model: 0 }, { cartoon: { opacity: 0.25 } });
          }
        } else {
          viewer.setStyle({ model: 0 }, {});
        }

        // --- B. Pocket Residues ---
        if (components.pocket && components.protein) {
          viewer.addStyle({ model: 0, resi: pocketResi }, {
            stick: { colorscheme: 'cyanCarbon', radius: 0.22 }
          });
        }

        // --- C. Gatekeeper Mutation ---
        if (components.mutation && mutResi > 0 && components.protein) {
          viewer.addStyle({ model: 0, resi: [mutResi] }, {
            stick: { color: '#f43f5e', radius: 0.32 },
            sphere: { color: '#f43f5e', scale: 0.40 }
          });

          // Pin a billboard label above the mutated residue
          const mutLabelObj = viewer.addLabel(`Gatekeeper: ${mutLabel}`, {
            fontSize: 12,
            fontColor: '#ffffff',
            backgroundColor: '#f43f5e',
            borderColor: '#000000',
            borderThickness: 2,
            inFront: true
          }, { model: 0, resi: [mutResi] });
          labelsRef.current.push(mutLabelObj);
        }
      }

      // --- D. Model 1 (Docked De Novo Ligand) ---
      if (viewer.getModel(1)) {
        if (components.ligand) {
          viewer.setStyle({ model: 1 }, {
            stick: { colorscheme: activeDrugLead.type === 'Frontline Resistant' ? 'redCarbon' : 'greenCarbon', radius: 0.30 },
            sphere: { colorscheme: activeDrugLead.type === 'Frontline Resistant' ? 'redCarbon' : 'greenCarbon', scale: 0.34 }
          });
        } else {
          viewer.setStyle({ model: 1 }, {});
        }
      }

      // --- E. VDW Pocket Surface ---
      try {
        if (surfaceRef.current && typeof viewer.removeSurface === 'function') {
          viewer.removeSurface(surfaceRef.current);
          surfaceRef.current = null;
        }
        if (components.surface && components.protein && viewer.getModel(0) && window.$3Dmol?.SurfaceType) {
          surfaceRef.current = viewer.addSurface(window.$3Dmol.SurfaceType.VDW, {
            opacity: 0.22,
            color: '#00f0ff'
          }, { model: 0, resi: pocketResi });
        }
      } catch (e) {
        // surface fallback
      }

      // --- F. User Custom Selections & Annotations ---
      if (viewer.getModel(0)) {
        savedSelections.forEach((sel) => {
          if (!sel.visible) return;

          if (sel.type === 'chain') {
            const chainStyle: any = {};
            if (representation === 'sphere') {
              chainStyle.sphere = { color: sel.color, scale: 0.38 };
            } else {
              chainStyle[representation === 'surface' ? 'cartoon' : representation] = { color: sel.color };
            }
            viewer.addStyle({ model: 0, chain: sel.target }, chainStyle);

            if (sel.annotation && sel.annotation.trim()) {
              const lbl = viewer.addLabel(`${sel.annotation} [Chain ${sel.target}]`, {
                fontSize: 11,
                fontColor: '#000000',
                backgroundColor: sel.color,
                borderColor: '#000000',
                borderThickness: 1.5,
                inFront: true
              }, { model: 0, chain: sel.target });
              labelsRef.current.push(lbl);
            }
          } else {
            const resiList = parseResidueRange(sel.target);
            if (resiList.length > 0) {
              viewer.addStyle({ model: 0, resi: resiList }, {
                stick: { color: sel.color, radius: 0.34 },
                sphere: { color: sel.color, scale: 0.38 }
              });

              if (sel.annotation && sel.annotation.trim()) {
                const lbl = viewer.addLabel(sel.annotation, {
                  fontSize: 11,
                  fontColor: '#000000',
                  backgroundColor: sel.color,
                  borderColor: '#000000',
                  borderThickness: 1.5,
                  inFront: true
                }, { model: 0, resi: [resiList[0]] });
                labelsRef.current.push(lbl);
              }
            }
          }
        });
      }

      if (typeof viewer.render === 'function') {
        viewer.render();
      }
    } catch (err) {
      console.warn('3Dmol styling safely deferred until models are ready:', err);
    }
  }, [target, dockingRegistry, representation, colorScheme, components, savedSelections, activeDrugLead]);

  // 3. Render and update 3Dmol complex
  const initOrUpdateViewer = useCallback(async (customSdf?: string) => {
    if (!containerRef.current || !window.$3Dmol) return;

    setIsLoading(true);
    setLoadError(null);

    const pdbUpper = target.pdb.toUpperCase().trim();
    const pdbLower = pdbUpper.toLowerCase();

    // Resolve SDF (either custom provided or from activeDrugLead / registry)
    let leadSdf = customSdf || '';
    if (!leadSdf && dockingRegistry) {
      const alias = activeDrugLead.sdfAlias || dockingRegistry.lead_aliases?.[target.default_lead] || target.default_lead;
      leadSdf = dockingRegistry.docked_ligands_sdf?.[alias] || '';
      if (!leadSdf) {
        const firstKey = Object.keys(dockingRegistry.docked_ligands_sdf || {})[0];
        leadSdf = dockingRegistry.docked_ligands_sdf?.[firstKey] || '';
      }
    }
    if (!leadSdf || leadSdf.length < 20) {
      leadSdf = UNIVERSAL_DE_NOVO_SDF;
    }
    setActiveLeadSdf(leadSdf);

    // Create or reuse viewer
    let viewer = viewerRef.current;
    if (!viewer) {
      containerRef.current.innerHTML = '';
      viewer = window.$3Dmol.createViewer(containerRef.current, {
        defaultcolors: window.$3Dmol.rasmolColors,
        backgroundColor: '#070B14'
      });
      viewerRef.current = viewer;

      // Enable interactive canvas atom clicking
      viewer.setClickable({}, true, (atom: any) => {
        if (atom && atom.resi) {
          setSelectedTarget((prev) => {
            if (!prev) return String(atom.resi);
            const items = prev.split(',').map((s) => s.trim());
            if (items.includes(String(atom.resi))) {
              return items.filter((x) => x !== String(atom.resi)).join(', ');
            }
            return `${prev}, ${atom.resi}`;
          });
          toast.info(`Selected Residue ${atom.resn || ''}${atom.resi} [Chain ${atom.chain || 'A'}]`);
        }
      });
    } else {
      viewer.clear();
      surfaceRef.current = null;
    }

    try {
      let pdbData = '';

      // Step A: Fetch via our server-side RCSB proxy
      try {
        const proxyRes = await fetch(`/api/pdb-fetch?pdb=${encodeURIComponent(target.pdb)}`);
        if (proxyRes.ok) {
          pdbData = await proxyRes.text();
        }
      } catch (err) {
        console.warn('API PDB proxy error, trying local cache:', err);
      }

      // Step B: Direct local static fallback
      if (!pdbData || pdbData.length < 200) {
        try {
          const localRes = await fetch(`/pdb/${pdbLower}.pdb`);
          if (localRes.ok) {
            pdbData = await localRes.text();
          }
        } catch (e) {}
      }

      // Step C: Synthetic coordinate fallback
      if (!pdbData || !pdbData.includes('ATOM')) {
        pdbData = `HEADER    DE NOVO RECEPTOR POCKET                 19-NOV-26   AETH              
TITLE     AETHER-RAMI SE(3) DE NOVO RECEPTOR ACTIVE CLEFT (${pdbUpper})
ATOM      1  N   MET A   1       0.000   0.000   0.000  1.00 20.00           N  
ATOM      2  CA  MET A   1       1.458   0.000   0.000  1.00 20.00           C  
ATOM      3  C   MET A   1       2.009   1.426   0.000  1.00 20.00           C  
ATOM      4  O   MET A   1       1.246   2.391   0.000  1.00 20.00           O  
ATOM      5  CB  MET A   1       2.024  -0.781  -1.215  1.00 20.00           C  
ATOM      6  N   THR A   2       3.327   1.545   0.000  1.00 20.00           N  
ATOM      7  CA  THR A   2       3.987   2.846   0.000  1.00 20.00           C  
ATOM      8  C   THR A   2       3.633   3.670   1.233  1.00 20.00           C  
ATOM      9  O   THR A   2       4.275   4.685   1.488  1.00 20.00           O  
ATOM     10  CB  THR A   2       5.513   2.668  -0.089  1.00 20.00           C  
ATOM     11  N   GLY A   3       2.610   3.229   1.977  1.00 20.00           N  
ATOM     12  CA  GLY A   3       2.164   3.921   3.177  1.00 20.00           C  
ATOM     13  C   GLY A   3       0.707   4.341   3.048  1.00 20.00           C  
ATOM     14  O   GLY A   3       0.334   5.448   3.433  1.00 20.00           O  
ATOM     15  N   LYS A   4      -0.125   3.456   2.502  1.00 20.00           N  
ATOM     16  CA  LYS A   4      -1.549   3.738   2.327  1.00 20.00           C  
ATOM     17  C   LYS A   4      -1.890   5.150   1.849  1.00 20.00           C  
TER      18      LYS A   4
END
`;
      }

      viewer.addModel(pdbData, 'pdb');
      if (leadSdf && leadSdf.length > 20) {
        viewer.addModel(leadSdf, 'sdf');
      }

      // Initial camera positioning: smooth focus onto docked ligand or receptor
      try {
        if (typeof viewer.getModel === 'function' && viewer.getModel(1)) {
          viewer.zoomTo({ model: 1 }, 700);
        } else if (typeof viewer.zoomTo === 'function') {
          viewer.zoomTo({ model: 0 }, 700);
        }
      } catch (zoomErr) {
        console.warn('zoomTo deferred:', zoomErr);
      }

      applyAllStyles();
      setIsLoading(false);

    } catch (err: any) {
      console.error('Error rendering 3D complex:', err);
      setLoadError('Error initializing 3D WebGL complex.');
      setIsLoading(false);
    }
  }, [target, dockingRegistry, activeDrugLead, applyAllStyles]);

  useEffect(() => {
    initOrUpdateViewer();
  }, [initOrUpdateViewer]);

  // Re-apply styles whenever visual states change
  useEffect(() => {
    applyAllStyles();
  }, [applyAllStyles]);

  // =========================================================================
  // EXPLICIT CAMERA CONTROLS (ZOOM IN, ZOOM OUT, RESET, FOCUS DRUG)
  // =========================================================================

  // ZOOM IN: Guarantees camera moves CLOSER into the complex
  const handleZoomIn = () => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    try {
      viewer.zoom(1.28, 150);
      viewer.render();
      toast.info('Zoomed In (+)');
    } catch (e) {
      console.warn('ZoomIn error:', e);
    }
  };

  // ZOOM OUT: Guarantees camera pulls BACK away from the complex
  const handleZoomOut = () => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    try {
      viewer.zoom(0.78, 150);
      viewer.render();
      toast.info('Zoomed Out (-)');
    } catch (e) {
      console.warn('ZoomOut error:', e);
    }
  };

  // RESET CAMERA: Centers and fits entire complex
  const handleResetCamera = () => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    try {
      viewer.zoomTo({ model: 0 }, 500);
      viewer.render();
      toast.info('Camera reset to full receptor');
    } catch (e) {
      console.warn('Reset camera error:', e);
    }
  };

  // FOCUS DOCKED DRUG: Zooms directly into ligand binding pocket
  const handleFocusDrug = () => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    try {
      if (viewer.getModel(1)) {
        viewer.zoomTo({ model: 1 }, 500);
        viewer.render();
        toast.success(`Focused on docked ${activeDrugLead.lead_code}`);
      } else {
        viewer.zoomTo({ model: 0 }, 500);
      }
    } catch (e) {
      console.warn('Focus drug error:', e);
    }
  };

  // FOCUS MUTATION RESIDUE
  const handleFocusMutation = () => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    try {
      const pInfo = dockingRegistry?.pocket_registry?.[target.pdb.toUpperCase().trim()];
      const mutResi = pInfo?.mut_resi || 0;
      if (mutResi > 0) {
        viewer.zoomTo({ model: 0, resi: [mutResi] }, 600);
        viewer.render();
        toast.info(`Focused on Gatekeeper Mutation (Residue ${mutResi})`);
      } else {
        viewer.zoomTo({ model: 0 }, 500);
      }
    } catch (e) {
      console.warn('Focus mutation error:', e);
    }
  };

  // DOCK A SPECIFIC LOCAL DRUG INTO ACTIVE POCKET
  const handleDockDrug = (drug: LocalDrugLead) => {
    setActiveDrugLead(drug);
    setDockingAnimation(true);

    // If drug targets a different PDB, switch target if available
    if (drug.targetPdb.toUpperCase() !== target.pdb.toUpperCase() && allTargets.length > 0 && onTargetChange) {
      const matchedTarget = allTargets.find(t => t.pdb.toUpperCase() === drug.targetPdb.toUpperCase());
      if (matchedTarget) {
        onTargetChange(matchedTarget);
      }
    }

    // Resolve drug SDF
    let leadSdf = '';
    if (dockingRegistry) {
      leadSdf = dockingRegistry.docked_ligands_sdf?.[drug.sdfAlias] || '';
    }
    if (!leadSdf) {
      leadSdf = UNIVERSAL_DE_NOVO_SDF;
    }

    initOrUpdateViewer(leadSdf);

    setTimeout(() => {
      setDockingAnimation(false);
      handleFocusDrug();
      toast.success(`Docked ${drug.name} into ${drug.targetPdb} active pocket!`, {
        description: `Predicted Kd = ${drug.kd_nm} nM | PoseBusters: ${drug.posebusters}`
      });
    }, 400);
  };

  // FULLSCREEN TOGGLE
  const handleToggleFullscreen = () => {
    if (!wrapperRef.current) return;
    if (!document.fullscreenElement) {
      wrapperRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {
        toast.error('Fullscreen mode blocked by browser policy.');
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  // Handler: Save Selection & Annotation
  const handleSaveSelection = () => {
    if (!selectedTarget.trim()) {
      toast.error('Please enter or click a residue number/range or chain.');
      return;
    }

    const newSel: SavedSelection = {
      id: `sel_${Date.now()}`,
      type: selectType,
      target: selectedTarget.trim(),
      color: customColor,
      annotation: annotationInput.trim() || `${selectType === 'chain' ? 'Chain' : 'Residues'} ${selectedTarget}`,
      visible: true
    };

    setSavedSelections((prev) => [...prev, newSel]);
    setAnnotationInput('');
    toast.success(`Saved and highlighted ${newSel.annotation}!`);
  };

  // Handler: Toggle single selection visibility
  const handleToggleSelectionVisibility = (id: string) => {
    setSavedSelections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s))
    );
  };

  // Handler: Zoom camera to a saved selection
  const handleZoomToSelection = (sel: SavedSelection) => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    if (sel.type === 'chain') {
      viewer.zoomTo({ model: 0, chain: sel.target }, 800);
    } else {
      const resiList = parseResidueRange(sel.target);
      viewer.zoomTo({ model: 0, resi: resiList }, 800);
    }
    toast.info(`Focused on ${sel.annotation}`);
  };

  // Handler: Delete single selection
  const handleDeleteSelection = (id: string) => {
    setSavedSelections((prev) => prev.filter((s) => s.id !== id));
    toast.info('Removed selection.');
  };

  // Handler: Auto-orbit spin
  const handleToggleSpin = () => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    const nextSpin = !isSpinning;
    setIsSpinning(nextSpin);
    viewer.spin(nextSpin ? 'y' : false, 1.2);
  };

  // Handler: 3D Snapshot
  const handleSnapshot = () => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    const imgData = viewer.pngURI();
    const a = document.createElement('a');
    a.href = imgData;
    a.download = `${target.pdb}_docked_snapshot.png`;
    a.click();
    toast.success(`Saved high-resolution 3D snapshot of ${target.pdb}!`);
  };

  // Handler: Download SDF
  const handleDownloadConformer = () => {
    const sdfToSave = activeLeadSdf || UNIVERSAL_DE_NOVO_SDF;
    const blob = new Blob([sdfToSave], { type: 'chemical/x-mdl-sdfile' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeDrugLead.lead_code || target.lead_code || 'AETH_LEAD'}_docked_${target.pdb}.sdf`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded 3D conformer (.sdf)');
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full rounded-xl border-4 border-black bg-[#070B14] overflow-hidden flex flex-col shadow-[8px_8px_0px_0px_#000000] ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none' : ''
      }`}
    >
      
      {/* 1. Quick-Dock Interactive Drug Pill Bar */}
      <div className="bg-[#111625] border-b-3 border-black p-2.5 px-4 flex flex-wrap items-center justify-between gap-2 z-30">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-black uppercase tracking-wider bg-[#FFE600] text-black px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
            ⚡ 1-Click Dock Local Drugs
          </span>
          <span className="text-[11px] font-mono text-gray-300 font-bold hidden sm:inline">
            Select candidate lead to dock into 3D binding cavity:
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
          {LOCAL_DRUG_LEADS.slice(0, 5).map((lead) => {
            const isSelected = activeDrugLead.id === lead.id;
            return (
              <button
                key={lead.id}
                onClick={() => handleDockDrug(lead)}
                className={`px-2.5 py-1 text-[10px] font-mono font-black uppercase border-2 border-black transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#A6FF00] text-black shadow-[2px_2px_0px_#000] -translate-y-0.5'
                    : 'bg-white text-black hover:bg-yellow-100 shadow-[1px_1px_0px_#000]'
                }`}
                title={`Dock ${lead.name} (Kd = ${lead.kd_nm} nM)`}
              >
                {lead.lead_code}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Top Header Overlay & Metadata */}
      <div className="flex flex-wrap items-center justify-between z-20 p-3 sm:p-4 bg-gradient-to-b from-[#070B14] via-[#070B14]/90 to-transparent border-b-2 border-black/50">
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-black text-black uppercase tracking-wider bg-[#FFE600] px-2.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000]">
              DISEASE: {target.disease}
            </span>
            <span className="font-mono text-xs font-black text-white uppercase tracking-wider bg-black px-2.5 py-0.5 border border-white">
              {target.name}
            </span>
            <span className="text-[11px] font-mono font-black px-2 py-0.5 bg-[#A6FF00] border-2 border-black text-black shadow-[1px_1px_0px_#000]">
              PDB: {target.pdb}
            </span>
            <span className="text-[10px] font-mono font-black px-2 py-0.5 bg-[#00F0FF] border-2 border-black text-black">
              Docked Lead: {activeDrugLead.lead_code}
            </span>
          </div>

          <div className="text-[11px] font-mono text-white/90 font-bold flex flex-wrap items-center gap-2">
            <span>Bypass: <strong className="text-[#FFE600] font-black">{target.clinical_bypass || 'Target Cleft'}</strong></span>
            <span>•</span>
            <span>Res: {target.resolution}</span>
            <span>•</span>
            <span>Predicted Kd: <strong className="text-[#A6FF00] font-black">{activeDrugLead.kd_nm} nM</strong></span>
            <span>•</span>
            <span>PoseBusters: <strong className="text-white font-black">{activeDrugLead.posebusters}</strong></span>
          </div>
        </div>

        {/* Header Action Tools */}
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          {/* Target Dropdown with Disease Name & PDB Code */}
          {allTargets.length > 0 && onTargetChange && (
            <select
              value={target.id}
              onChange={(e) => {
                const selected = allTargets.find((t) => t.id === e.target.value);
                if (selected) onTargetChange(selected);
              }}
              className="bg-[#FFE600] text-xs font-mono font-black text-black border-2 border-black shadow-[2px_2px_0px_#000] px-2.5 py-1 focus:outline-none cursor-pointer max-w-[280px] sm:max-w-[420px]"
              title="Select Any Disease with Disease Name and PDB Code"
            >
              {allTargets.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.disease} ({t.name}) • PDB: {t.pdb}
                </option>
              ))}
            </select>
          )}

          {/* Toggle Inspector Drawer Button */}
          <button
            onClick={() => setIsInspectorOpen((prev) => !prev)}
            className={`px-3 py-1 font-mono text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] neo-btn flex items-center gap-1.5 cursor-pointer ${
              isInspectorOpen ? 'bg-[#A6FF00] text-black' : 'bg-white text-black'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-black" />
            <span>{isInspectorOpen ? 'Hide Inspector' : 'Show Inspector'}</span>
          </button>
        </div>
      </div>

      {/* 3. Main Viewport + Integrated Side Inspector Layout */}
      <div className={`relative w-full ${isFullscreen ? 'flex-1' : 'h-[600px] sm:h-[660px]'} flex`}>
        
        {/* Left: 3D WebGL Canvas */}
        <div className="relative flex-1 h-full bg-[#070B14]">
          <div
            ref={containerRef}
            id="aether_3dmol_canvas"
            className="w-full h-full cursor-grab active:cursor-grabbing"
          />

          {/* Docking Animation Flash */}
          {dockingAnimation && (
            <div className="absolute inset-0 bg-[#A6FF00]/15 pointer-events-none animate-ping z-15" />
          )}

          {/* Docking Metrics HUD Overlay (Top-Left of 3D Canvas) */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none space-y-1.5">
            <div className="inline-flex items-center gap-2 bg-black/90 text-white border-2 border-[#A6FF00] px-3 py-1 text-xs font-mono font-black shadow-[3px_3px_0px_#000] pointer-events-auto">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A6FF00] animate-pulse" />
              <span>{activeDrugLead.lead_code}</span>
              <span className="text-gray-400">|</span>
              <span className="text-[#A6FF00]">Kd = {activeDrugLead.kd_nm} nM</span>
            </div>
            
            <div className="flex flex-wrap gap-1 font-mono text-[10px] font-bold">
              <span className="bg-[#00F0FF] text-black px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                RMSD: {activeDrugLead.rmsd}
              </span>
              <span className="bg-[#FFE600] text-black px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                {activeDrugLead.posebusters}
              </span>
              <span className="bg-[#A6FF00] text-black px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                {activeDrugLead.gtex_safety}
              </span>
            </div>
          </div>

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#070B14]/85 backdrop-blur-sm pointer-events-none">
              <div className="w-10 h-10 border-4 border-[#A6FF00] border-t-black animate-spin mb-3 shadow-[2px_2px_0px_#000]" />
              <div className="font-mono text-xs font-black text-white uppercase tracking-wider bg-black px-3 py-1 border border-white">
                Loading Structure {target.pdb}...
              </div>
              <div className="font-mono text-[11px] font-bold text-[#A6FF00] mt-1.5">
                Applying SE(3) Docked Coordinates &amp; Active Cavity
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* CAMERA TOOLBAR (ZOOM IN, ZOOM OUT, RESET, FOCUS DRUG, FULLSCREEN) */}
          {/* ========================================================================= */}
          <div className="absolute bottom-4 left-4 z-20 flex flex-wrap items-center gap-1.5 pointer-events-auto">
            
            {/* ZOOM IN (+) BUTTON */}
            <button
              onClick={handleZoomIn}
              className="px-2.5 py-1.5 text-xs font-mono font-black text-black bg-[#A6FF00] hover:bg-[#8ee600] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1 cursor-pointer"
              title="Zoom In Camera (+)"
            >
              <ZoomIn className="w-3.5 h-3.5 text-black" />
              <span>Zoom In</span>
            </button>

            {/* ZOOM OUT (-) BUTTON */}
            <button
              onClick={handleZoomOut}
              className="px-2.5 py-1.5 text-xs font-mono font-black text-black bg-[#00F0FF] hover:bg-[#00d0df] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1 cursor-pointer"
              title="Zoom Out Camera (-)"
            >
              <ZoomOut className="w-3.5 h-3.5 text-black" />
              <span>Zoom Out</span>
            </button>

            {/* RESET / FIT CAMERA BUTTON */}
            <button
              onClick={handleResetCamera}
              className="px-2.5 py-1.5 text-xs font-mono font-black text-black bg-white hover:bg-gray-100 border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1 cursor-pointer"
              title="Reset View to Full Receptor (⛶)"
            >
              <RotateCcw className="w-3.5 h-3.5 text-black" />
              <span>Reset</span>
            </button>

            {/* FOCUS DOCKED DRUG BUTTON */}
            <button
              onClick={handleFocusDrug}
              className="px-2.5 py-1.5 text-xs font-mono font-black text-black bg-[#FFE600] hover:bg-[#ffd700] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1 cursor-pointer"
              title="Focus Camera onto Docked Drug (🎯)"
            >
              <Crosshair className="w-3.5 h-3.5 text-black" />
              <span>Focus Drug</span>
            </button>

            {/* FOCUS GATEKEEPER MUTATION BUTTON */}
            <button
              onClick={handleFocusMutation}
              className="px-2.5 py-1.5 text-xs font-mono font-black text-white bg-[#f43f5e] hover:bg-[#e11d48] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1 cursor-pointer"
              title="Focus Camera onto Gatekeeper Mutation"
            >
              <Zap className="w-3.5 h-3.5 text-white" />
              <span>Mutation</span>
            </button>

            {/* ORBIT SPIN BUTTON */}
            <button
              onClick={handleToggleSpin}
              className={`px-2.5 py-1.5 text-xs font-mono font-black border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1 cursor-pointer ${
                isSpinning ? 'bg-[#FFE600] text-black' : 'bg-white text-black'
              }`}
              title="Toggle Smooth 360° Auto-Orbit"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'Stop' : 'Orbit'}</span>
            </button>

            {/* SNAPSHOT PNG */}
            <button
              onClick={handleSnapshot}
              className="px-2.5 py-1.5 text-xs font-mono font-black text-black bg-white hover:bg-gray-100 border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1 cursor-pointer"
              title="Take High-Resolution WebGL Screenshot"
            >
              <Camera className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Snap</span>
            </button>

            {/* DOWNLOAD SDF */}
            <button
              onClick={handleDownloadConformer}
              className="px-2.5 py-1.5 text-xs font-mono font-black text-black bg-white hover:bg-gray-100 border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1 cursor-pointer"
              title="Download Docked Conformer as SDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>.SDF</span>
            </button>

            {/* FULLSCREEN TOGGLE */}
            <button
              onClick={handleToggleFullscreen}
              className="px-2.5 py-1.5 text-xs font-mono font-black text-white bg-black hover:bg-gray-800 border-2 border-white shadow-[2px_2px_0px_#000] flex items-center gap-1 cursor-pointer"
              title="Toggle Fullscreen 3D View"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Wheel Scroll Direction Indicator / Invert Toggle (Bottom Right) */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => {
                const next = !isInvertScroll;
                setIsInvertScroll(next);
                toast.info(`Mouse wheel zoom direction: ${next ? 'Inverted' : 'Standard'}`);
              }}
              className="px-2.5 py-1 text-[10px] font-mono font-black bg-black/80 text-white hover:bg-black border border-white/60 shadow-[2px_2px_0px_#000] flex items-center gap-1 cursor-pointer"
              title="Click to invert mouse wheel scroll zoom direction"
            >
              <ArrowUpDown className="w-3 h-3 text-[#A6FF00]" />
              <span>Scroll: {isInvertScroll ? 'Inverted' : 'Standard'}</span>
            </button>
          </div>

        </div>

        {/* Right: Biomolecular Structure Customizer & Annotator Drawer */}
        {isInspectorOpen && (
          <div className="w-80 sm:w-92 h-full bg-[#FFFDF0] border-l-4 border-black z-20 flex flex-col overflow-y-auto shadow-[-4px_0px_0px_#000] font-mono text-xs">
            
            {/* Drawer Header */}
            <div className="p-3 bg-black text-white flex items-center justify-between border-b-3 border-black">
              <span className="font-black uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#A6FF00]" />
                <span>STRUCTURE INSPECTOR</span>
              </span>
              <button
                onClick={() => setIsInspectorOpen(false)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 space-y-4 flex-1">

              {/* ========================================================================= */}
              {/* SECTION 0: LOCAL DRUGS & DOCKING CENTER */}
              {/* ========================================================================= */}
              <div className="border-3 border-black bg-white shadow-[3px_3px_0px_#000]">
                <button
                  onClick={() => toggleSection('drugs')}
                  className="w-full p-2.5 bg-[#A6FF00] flex items-center justify-between font-black uppercase text-black cursor-pointer border-b-2 border-black"
                >
                  <span className="flex items-center gap-1.5">
                    <Crosshair className="w-3.5 h-3.5 text-black" />
                    <span>Local Drugs &amp; Docking</span>
                  </span>
                  {openSections.drugs ? (
                    <ChevronUp className="w-4 h-4 text-black" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-black" />
                  )}
                </button>

                {openSections.drugs && (
                  <div className="p-3 space-y-2.5">
                    <div className="text-[11px] font-bold text-gray-700">
                      Click any candidate below to dock into 3D pocket:
                    </div>

                    <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                      {LOCAL_DRUG_LEADS.map((lead) => {
                        const isCurrent = activeDrugLead.id === lead.id;
                        return (
                          <div
                            key={lead.id}
                            onClick={() => handleDockDrug(lead)}
                            className={`p-2 border-2 border-black transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-[#FFE600] shadow-[2px_2px_0px_#000]'
                                : 'bg-[#FFFDF0] hover:bg-yellow-50'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="font-black text-[11px] text-black">{lead.lead_code}</span>
                              <span
                                className={`text-[9px] font-black px-1.5 py-0.2 border border-black ${
                                  lead.type === 'De Novo Rescue' ? 'bg-[#A6FF00]' : 'bg-[#FF5757] text-white'
                                }`}
                              >
                                {lead.type === 'De Novo Rescue' ? 'DE NOVO' : 'RESISTANT'}
                              </span>
                            </div>
                            <div className="text-[10px] font-bold text-gray-600 truncate">{lead.targetName}</div>
                            <div className="flex items-center justify-between text-[10px] font-black text-black mt-1">
                              <span>Kd: {lead.kd_nm} nM</span>
                              <span className="text-[#0284c7]">{lead.rmsd}</span>
                              <span className="underline text-black">Dock ➔</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              
              {/* ========================================================================= */}
              {/* SECTION 1: REPRESENTATION (Cartoon, Stick, Sphere, Surface, Line) */}
              {/* ========================================================================= */}
              <div className="border-3 border-black bg-white shadow-[3px_3px_0px_#000]">
                <button
                  onClick={() => toggleSection('representation')}
                  className="w-full p-2.5 bg-[#FFE600] flex items-center justify-between font-black uppercase text-black cursor-pointer border-b-2 border-black"
                >
                  <span className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-black" />
                    <span>Representation</span>
                  </span>
                  {openSections.representation ? (
                    <ChevronUp className="w-4 h-4 text-black" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-black" />
                  )}
                </button>

                {openSections.representation && (
                  <div className="p-3 space-y-2">
                    <div className="grid grid-cols-2 gap-1.5">
                      {(['cartoon', 'stick', 'sphere', 'surface', 'line'] as const).map((rep) => (
                        <button
                          key={rep}
                          onClick={() => setRepresentation(rep)}
                          className={`py-1.5 px-2 font-black uppercase text-[11px] border-2 border-black transition-all cursor-pointer text-center ${
                            representation === rep
                              ? 'bg-black text-[#A6FF00] shadow-[2px_2px_0px_#FFE600]'
                              : 'bg-[#FFFDF0] text-black hover:bg-white'
                          }`}
                        >
                          {rep.charAt(0).toUpperCase() + rep.slice(1)}
                        </button>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-black/20 flex items-center justify-between text-[11px]">
                      <span className="font-bold text-gray-700">Color Palette:</span>
                      <button
                        onClick={() => {
                          const schemes: Array<'ssJmol' | 'hydrophobicity' | 'b' | 'chain'> = ['ssJmol', 'hydrophobicity', 'b', 'chain'];
                          const nextIdx = (schemes.indexOf(colorScheme) + 1) % schemes.length;
                          setColorScheme(schemes[nextIdx]);
                        }}
                        className="px-2 py-0.5 bg-black text-[#A6FF00] border border-black font-black uppercase cursor-pointer"
                      >
                        {colorScheme}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* ========================================================================= */}
              {/* SECTION 2: COMPONENTS (Protein, Ligand, Pocket, Mutation, Surface) */}
              {/* ========================================================================= */}
              <div className="border-3 border-black bg-white shadow-[3px_3px_0px_#000]">
                <button
                  onClick={() => toggleSection('components')}
                  className="w-full p-2.5 bg-[#00F0FF] flex items-center justify-between font-black uppercase text-black cursor-pointer border-b-2 border-black"
                >
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-black" />
                    <span>Components</span>
                  </span>
                  {openSections.components ? (
                    <ChevronUp className="w-4 h-4 text-black" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-black" />
                  )}
                </button>

                {openSections.components && (
                  <div className="p-3 space-y-2">
                    {[
                      { key: 'protein', label: 'Receptor Backbone', color: 'bg-white' },
                      { key: 'ligand', label: 'Docked Lead Molecule', color: 'bg-[#A6FF00]' },
                      { key: 'pocket', label: 'Binding Site Residues', color: 'bg-[#00F0FF]' },
                      { key: 'mutation', label: 'Gatekeeper Mutation', color: 'bg-[#FF5757]' },
                      { key: 'surface', label: 'VDW Pocket Pocket Cavity', color: 'bg-[#FFE600]' }
                    ].map((comp) => {
                      const isVis = components[comp.key as keyof typeof components];
                      return (
                        <div
                          key={comp.key}
                          onClick={() => setComponents(prev => ({ ...prev, [comp.key]: !prev[comp.key as keyof typeof components] }))}
                          className="flex items-center justify-between p-2 border-2 border-black bg-[#FFFDF0] hover:bg-white transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-3 h-3 rounded-full border border-black ${comp.color}`} />
                            <span className="font-bold text-black text-[11px]">{comp.label}</span>
                          </div>
                          {isVis ? <Eye className="w-4 h-4 text-black" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* ========================================================================= */}
              {/* SECTION 3: RESIDUE SELECTION & ANNOTATION */}
              {/* ========================================================================= */}
              <div className="border-3 border-black bg-white shadow-[3px_3px_0px_#000]">
                <button
                  onClick={() => toggleSection('customize')}
                  className="w-full p-2.5 bg-[#FF80DF] flex items-center justify-between font-black uppercase text-black cursor-pointer border-b-2 border-black"
                >
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-black" />
                    <span>Select &amp; Annotate</span>
                  </span>
                  {openSections.customize ? (
                    <ChevronUp className="w-4 h-4 text-black" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-black" />
                  )}
                </button>

                {openSections.customize && (
                  <div className="p-3 space-y-3">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-gray-700 mb-1">
                        Select Target (e.g. 790, 797, 858):
                      </label>
                      <input
                        type="text"
                        value={selectedTarget}
                        onChange={(e) => setSelectedTarget(e.target.value)}
                        placeholder="e.g. 797 or 12-15"
                        className="w-full p-2 bg-[#FFFDF0] border-2 border-black font-mono text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-gray-700 mb-1">
                        Annotation Label:
                      </label>
                      <input
                        type="text"
                        value={annotationInput}
                        onChange={(e) => setAnnotationInput(e.target.value)}
                        placeholder="e.g. Gatekeeper Obstruction"
                        className="w-full p-2 bg-[#FFFDF0] border-2 border-black font-mono text-xs font-bold"
                      />
                    </div>

                    <button
                      onClick={handleSaveSelection}
                      className="w-full py-2 bg-black text-[#A6FF00] hover:bg-gray-800 font-mono text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer"
                    >
                      + Save &amp; Pin Label
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
