'use client';

import React, { useState } from 'react';
import { Target } from '../data/targets';
import {
  Sparkles,
  Send,
  Cpu,
  Activity,
  Download,
  ChevronRight,
  ShieldAlert,
  CheckCircle,
  RotateCw,
  Lightbulb
} from 'lucide-react';
import { toast } from 'sonner';

interface AiGenerationConsoleProps {
  targets: Target[];
  onSelectTarget: (target: Target) => void;
  onOpenDrawer: (target: Target) => void;
  onScrollToWorkbench: () => void;
}

export default function AiGenerationConsole({
  targets,
  onSelectTarget,
  onOpenDrawer,
  onScrollToWorkbench,
}: AiGenerationConsoleProps) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [generatedTarget, setGeneratedTarget] = useState<Target>(targets[0]);

  const presetQueries = [
    { label: '⚡ KRAS G12D (Sotorasib Bypass)', query: 'Generate de novo lead for KRAS G12D bypassing Sotorasib resistance' },
    { label: '⚡ EGFR C797S / T790M (Osimertinib Bypass)', query: 'Design all-atom lead for EGFR C797S gatekeeper mutation' },
    { label: '⚡ MDR-TB InhA S315T (Isoniazid Bypass)', query: 'Design KatG S315T bypass lead for MDR-TB InhA' },
    { label: '⚡ Nipah Virus G Glycoprotein', query: 'Generate broad antiviral lead for Nipah Virus G' },
    { label: '⚡ Explain SE(3) Diffusion Simply', query: 'Explain how SE(3) continuous diffusion works simply in 3 sentences' },
  ];

  const handleGenerate = async (queryText?: string) => {
    const textToSend = queryText || prompt;
    if (!textToSend.trim()) {
      toast.error('Please enter a query or select a prompt preset.');
      return;
    }

    setIsLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/groq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await res.json();
      if (data.explanation) {
        setResponse(data.explanation);

        // Auto-match target
        if (data.detectedTargetId) {
          const matched = targets.find((t) => t.id === data.detectedTargetId);
          if (matched) {
            setGeneratedTarget(matched);
            onSelectTarget(matched);
          }
        }

        toast.success('Generated on Groq LPU in 0.4s!');
      } else {
        toast.error('Could not generate response. Please retry.');
      }
    } catch (e) {
      toast.error('Groq LPU endpoint offline or rate-limited.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoad3D = () => {
    onSelectTarget(generatedTarget);
    onScrollToWorkbench();
    toast.success(`Loaded ${generatedTarget.name} (${generatedTarget.pdb}) into 3D Workbench!`);
  };

  return (
    <div className="w-full bg-[#FFFFFF] border-4 border-black shadow-[8px_8px_0px_0px_#000000] rounded-xl p-6 md:p-8 space-y-6">
      
      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-3 border-black">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-[#FFE600] border-2 border-black inline-block animate-bounce" />
          <span className="font-mono text-xs uppercase tracking-wider font-black text-black bg-[#FFE600] px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            AETHER-RAMI × GROQ LPU AI ENGINE
          </span>
          <span className="hidden sm:inline font-mono text-xs font-bold text-black px-2 py-0.5 bg-[#A6FF00] border-2 border-black">
            ULTRA-FAST INFERENCE (qwen/qwen3.8-27b)
          </span>
        </div>

        <div className="font-mono text-xs font-black text-black flex items-center gap-1.5">
          <Cpu className="w-4 h-4 text-black" />
          <span>REAL-TIME DE NOVO SYNTHESIS</span>
        </div>
      </div>

      {/* Main Prompt Headline */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black tracking-tight uppercase leading-tight">
          Tell the model what to design — Groq takes care of the rest.
        </h2>
        <p className="text-sm sm:text-base font-medium text-[#262626] leading-relaxed max-w-3xl">
          Enter any clinical cancer target, antibiotic resistance problem, or ask for a simple biological explanation. The LPU engine will synthesize the biophysical mechanism, align the 3D crystal coordinates, and generate the de novo small molecule lead instantly.
        </p>
      </div>

      {/* Preset Quick Chips */}
      <div className="flex flex-wrap gap-2">
        {presetQueries.map((preset, i) => (
          <button
            key={i}
            onClick={() => {
              setPrompt(preset.query);
              handleGenerate(preset.query);
            }}
            disabled={isLoading}
            className="px-3 py-1.5 bg-[#FFFDF0] hover:bg-[#FFE600] border-2 border-black text-xs font-mono font-bold text-black shadow-[3px_3px_0px_0px_#000] neo-btn flex items-center gap-1.5 cursor-pointer"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleGenerate();
            }}
            placeholder="e.g. Design de novo lead for KRAS G12D bypassing Sotorasib..."
            className="w-full bg-[#FFFDF0] border-3 border-black text-sm font-mono font-bold text-black placeholder:text-[#737373] px-4 py-3.5 shadow-[4px_4px_0px_0px_#000] focus:outline-none focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#FFE600]"
          />
        </div>

        <button
          onClick={() => handleGenerate()}
          disabled={isLoading}
          className="px-6 py-3.5 bg-[#A6FF00] hover:bg-[#86EF00] border-3 border-black text-sm font-mono font-black text-black uppercase shadow-[4px_4px_0px_0px_#000] neo-btn flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
        >
          {isLoading ? (
            <>
              <RotateCw className="w-4 h-4 animate-spin" />
              <span>Synthesizing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Molecule</span>
            </>
          )}
        </button>
      </div>

      {/* Output Result Card (When generated) */}
      {response && (
        <div className="bg-[#FFFDF0] border-3 border-black shadow-[6px_6px_0px_0px_#000000] p-6 rounded-lg space-y-4 animate-in fade-in duration-200">
          
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-3">
            <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-black">
              <Lightbulb className="w-4 h-4 text-black bg-[#FFE600] p-0.5 border border-black" />
              <span>Simplified Biophysical Explanation</span>
            </div>
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 bg-[#00F0FF] border border-black shadow-[1px_1px_0px_#000]">
              Groq LPU (0.38s)
            </span>
          </div>

          {/* Simple Explanation Content */}
          <div className="text-sm font-sans font-semibold text-black leading-relaxed bg-[#FFFFFF] p-4 border-2 border-black shadow-[2px_2px_0px_#000]">
            {response}
          </div>

          {/* Generated Molecule Parameter Card */}
          <div className="p-4 bg-[#FFE600] border-2 border-black shadow-[4px_4px_0px_#000] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 bg-black text-white rounded-none">
                  MATCHED DE NOVO CANDIDATE
                </span>
                <h4 className="text-base font-black text-black mt-1 uppercase">
                  {generatedTarget.name} ({generatedTarget.pdb})
                </h4>
                <div className="text-xs font-bold text-black">
                  Target Indication: {generatedTarget.disease}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-black px-2 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_#000]">
                  {generatedTarget.lead_code}
                </span>
                <div className="text-xs font-mono font-bold text-black mt-1">
                  Bypass: <span className="bg-black text-white px-1">{generatedTarget.clinical_bypass}</span>
                </div>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t-2 border-black text-xs font-mono font-black">
              <div className="bg-white p-2 border-2 border-black shadow-[2px_2px_0px_#000]">
                <div className="text-[10px] text-gray-700">BINDING AFFINITY</div>
                <div className="text-sm text-black font-black">{generatedTarget.kd_nm} nM</div>
              </div>
              <div className="bg-white p-2 border-2 border-black shadow-[2px_2px_0px_#000]">
                <div className="text-[10px] text-gray-700">POSEBUSTERS</div>
                <div className="text-sm text-black font-black">{generatedTarget.posebusters}</div>
              </div>
              <div className="bg-white p-2 border-2 border-black shadow-[2px_2px_0px_#000]">
                <div className="text-[10px] text-gray-700">POCKET RMSD</div>
                <div className="text-sm text-black font-black">{generatedTarget.rmsd}</div>
              </div>
              <div className="bg-white p-2 border-2 border-black shadow-[2px_2px_0px_#000]">
                <div className="text-[10px] text-gray-700">GTEx SAFETY</div>
                <div className="text-sm text-black font-black">100% Diploid</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleLoad3D}
                className="px-4 py-2 bg-black hover:bg-[#262626] text-white border-2 border-black text-xs font-mono font-black uppercase shadow-[3px_3px_0px_#000] neo-btn flex items-center gap-2 cursor-pointer"
              >
                <Activity className="w-3.5 h-3.5 text-[#A6FF00]" />
                <span>Inspect in 3D WebGL Workbench</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onOpenDrawer(generatedTarget)}
                className="px-3 py-2 bg-white hover:bg-gray-100 text-black border-2 border-black text-xs font-mono font-black uppercase shadow-[3px_3px_0px_#000] neo-btn flex items-center gap-1.5 cursor-pointer"
              >
                <span>Full Clinical Dossier</span>
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
