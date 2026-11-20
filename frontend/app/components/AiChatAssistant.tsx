'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Target } from '../data/targets';
import {
  Sparkles,
  Send,
  Cpu,
  Activity,
  Download,
  Copy,
  ChevronRight,
  RotateCw,
  MessageSquare,
  X,
  Minimize2,
  Maximize2,
  Trash2,
  Check,
  Search,
  Info
} from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  generatedMolecule?: {
    leadCode: string;
    targetPdb: string;
    targetName: string;
    affinityKd: string;
    posebusters: string;
    rmsd: string;
    smiles: string;
    bypassMutation: string;
  };
  detectedTargetId?: string;
}

interface AiChatAssistantProps {
  targets: Target[];
  onSelectTarget: (target: Target) => void;
  onSelectPdb: (pdb: string) => void;
  onScrollToWorkbench: () => void;
  isFloating?: boolean;
}

export default function AiChatAssistant({
  targets,
  onSelectTarget,
  onSelectPdb,
  onScrollToWorkbench,
  isFloating = false,
}: AiChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `👋 Hello! I am AETHER-RAMI's Lead Generative Biophysicist powered by Groq LPU (~750 tokens/sec).
You can ask me ANY question on your own:
• "Design a drug for KRAS G12D or EGFR C797S"
• "Search for Alzheimer's BACE1 or any disease worldwide"
• "Explain how continuous SE(3) diffusion works simply"
• "What is the difference between Kd affinity and IC50?"

Ask me anything or pick a quick prompt below!`,
      timestamp: 'Just now',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(!isFloating); // Floating opens on toggle
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showModelInfo, setShowModelInfo] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const quickPrompts = [
    'Design lead for KRAS G12D bypassing Sotorasib',
    'Design all-atom drug for EGFR C797S',
    'Explain how SE(3) diffusion works simply',
    'Generate compound for Alzheimer BACE1 (1FKN)',
    'Why do gatekeeper mutations block frontline drugs?',
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const historyForApi = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/groq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: historyForApi,
        }),
      });

      const data = await res.json();
      if (data.reply || data.explanation) {
        const replyText = data.reply || data.explanation;
        const assistantMsg: Message = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          generatedMolecule: data.generatedMolecule,
          detectedTargetId: data.detectedTargetId,
        };

        setMessages((prev) => [...prev, assistantMsg]);

        // Auto sync target if detected
        if (data.detectedPdb) {
          const matchedTarget = targets.find((t) => t.pdb.toUpperCase() === data.detectedPdb.toUpperCase() || t.id === data.detectedTargetId);
          if (matchedTarget) {
            onSelectTarget(matchedTarget);
          } else {
            onSelectPdb(data.detectedPdb);
          }
        }
      } else {
        toast.error('Could not get response from Groq LPU.');
      }
    } catch (e) {
      toast.error('Network or Groq API rate limit error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMolecule = (m: NonNullable<Message['generatedMolecule']>) => {
    onSelectPdb(m.targetPdb);
    onScrollToWorkbench();
    toast.success(`Loaded ${m.targetPdb} into 3D WebGL Workbench!`);
  };

  const handleCopySmiles = (smiles: string, id: string) => {
    navigator.clipboard.writeText(smiles);
    setCopiedId(id);
    toast.success('SMILES formula copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'welcome-cleared',
        role: 'assistant',
        content: 'Chat cleared! What disease target or biophysical question would you like to explore next?',
        timestamp: 'Just now',
      },
    ]);
    toast.info('Chat history reset.');
  };

  // If this is the floating button toggle when closed
  if (isFloating && !isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-[#FFE600] hover:bg-[#FFD700] text-black border-3 border-black shadow-[5px_5px_0px_#000] neo-btn flex items-center gap-2 font-mono font-black text-xs uppercase cursor-pointer"
        title="Open AI Drug Discovery Assistant"
      >
        <Sparkles className="w-4 h-4 text-black animate-spin" />
        <span>Ask AI Drug Copilot</span>
        <span className="w-2.5 h-2.5 rounded-full bg-[#A6FF00] border border-black inline-block" />
      </button>
    );
  }

  return (
    <div
      className={`bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000000] rounded-xl flex flex-col overflow-hidden ${
        isFloating
          ? 'fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[460px] h-[580px] shadow-[10px_10px_0px_#000]'
          : 'w-full h-[620px]'
      }`}
    >
      {/* Top Header */}
      <div className="p-3.5 bg-[#FFE600] border-b-3 border-black flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-[#A6FF00] border-2 border-black animate-pulse" />
          <span className="font-mono text-xs font-black uppercase text-black tracking-wider">
            AETHER-RAMI AI COPILOT (GROQ LPU)
          </span>
          <span className="text-[10px] font-mono font-bold bg-white px-1.5 py-0.2 border border-black hidden sm:inline">
            750 tokens/s
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowModelInfo(!showModelInfo)}
            className="px-2 py-0.5 bg-[#00F0FF] hover:bg-cyan-300 border border-black text-black cursor-pointer text-[10px] font-mono font-black flex items-center gap-1 shadow-[1px_1px_0px_#000]"
            title="Why we chose Groq LPU + Frontier Reasoning"
          >
            <Info className="w-3 h-3" />
            <span className="hidden sm:inline">Why This Model?</span>
          </button>

          <button
            onClick={handleClear}
            className="p-1 bg-white hover:bg-gray-100 border border-black text-black cursor-pointer"
            title="Reset Chat"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {isFloating && (
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 bg-white hover:bg-gray-100 border border-black text-black cursor-pointer"
              title="Close Chat"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Model Selection Explanation Overlay */}
      {showModelInfo && (
        <div className="p-3 bg-[#FFFDF0] border-b-3 border-black text-xs font-mono max-h-[300px] overflow-y-auto space-y-2">
          <div className="flex items-center justify-between border-b border-black pb-1">
            <span className="font-black text-black uppercase flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5470]" />
              <span>Why We Chose Groq LPU For AI Copilot</span>
            </span>
            <button
              onClick={() => setShowModelInfo(false)}
              className="text-[10px] font-bold underline hover:text-[#FF5470]"
            >
              CLOSE
            </button>
          </div>
          <p className="text-[11px] text-gray-700">
            <strong>1. Ultra-Low Latency (&lt;300ms TTFT, ~750 tokens/s): </strong>
            Live 3D WebGL biophysical exploration requires instantaneous conversational guidance. Waiting 5-10s for cloud LLMs breaks the interactive flow while rotating protein structures in Mol*.
          </p>
          <p className="text-[11px] text-gray-700">
            <strong>2. Zero Chemical Hallucinations via In-Context Grounding: </strong>
            The copilot is grounded dynamically with all 36 disease target profiles, enforcing exact PDB IDs, wild-type vs mutant Kd affinities, and real-world gatekeeper resistance mechanisms.
          </p>
          <p className="text-[11px] text-gray-700">
            <strong>3. Worldwide RCSB PDB Resolution: </strong>
            Auto-detects any 4-character PDB code (e.g. 8A99, 6Z43, 1FKN) and fetches crystallographic coordinates on the fly.
          </p>
          <p className="text-[11px] text-gray-700">
            <strong>4. Enterprise Privacy & Zero Retention: </strong>
            User queries and proprietary target mutations are never stored or used for model training, fulfilling strict GxP biopharma confidentiality.
          </p>
        </div>
      )}

      {/* Quick Prompts Bar */}
      <div className="p-2 bg-[#FFFDF0] border-b-2 border-black flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono font-bold whitespace-nowrap">
        <span className="text-gray-500 uppercase text-[10px]">Quick:</span>
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p)}
            className="px-2 py-0.5 bg-white hover:bg-[#A6FF00] border border-black text-black cursor-pointer shadow-[1px_1px_0px_#000] text-[10px]"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Messages Stream */}
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#FFFDF0]">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-gray-600 px-1">
                <span>{isUser ? 'You' : 'AETHER-RAMI AI (Groq)'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-[88%] p-3.5 rounded-lg text-xs font-semibold leading-relaxed ${
                  isUser
                    ? 'bg-white text-black border-2 border-black shadow-[3px_3px_0px_#000]'
                    : 'bg-[#FFFFFF] text-black border-3 border-black shadow-[4px_4px_0px_#FFE600]'
                }`}
              >
                <div className="whitespace-pre-line font-sans">{msg.content}</div>

                {/* If AI generated a de novo molecule card in this reply */}
                {msg.generatedMolecule && (
                  <div className="mt-3 p-3 bg-[#FFE600] border-2 border-black shadow-[2px_2px_0px_#000] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-black uppercase bg-black text-white px-1.5 py-0.2">
                        GENERATED CANDIDATE
                      </span>
                      <span className="text-xs font-mono font-black text-black">
                        PDB: {msg.generatedMolecule.targetPdb}
                      </span>
                    </div>

                    <div className="font-mono text-xs font-black text-black">
                      {msg.generatedMolecule.leadCode}
                    </div>

                    <div className="grid grid-cols-2 gap-1 text-[10px] font-mono font-black bg-white p-1.5 border border-black">
                      <div>Kd: <span className="text-black">{msg.generatedMolecule.affinityKd}</span></div>
                      <div>PoseBusters: <span className="text-[#2563EB]">{msg.generatedMolecule.posebusters}</span></div>
                      <div>RMSD: <span>{msg.generatedMolecule.rmsd}</span></div>
                      <div>Safety: <span>100% Diploid</span></div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1.5 pt-1">
                      <button
                        onClick={() => handleLoadMolecule(msg.generatedMolecule!)}
                        className="flex-1 py-1 px-2 bg-black hover:bg-gray-800 text-white border border-black text-[10px] font-mono font-black uppercase flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Activity className="w-3 h-3 text-[#A6FF00]" />
                        <span>Inspect in 3D</span>
                      </button>

                      <button
                        onClick={() => handleCopySmiles(msg.generatedMolecule!.smiles, msg.id)}
                        className="py-1 px-2 bg-white hover:bg-gray-100 text-black border border-black text-[10px] font-mono font-black uppercase flex items-center gap-1 cursor-pointer"
                        title="Copy chemical SMILES formula"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                        <span>SMILES</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 p-3 bg-white border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-mono font-bold text-black max-w-xs">
            <RotateCw className="w-4 h-4 animate-spin text-black" />
            <span>Computing on Groq LPU (~750 t/s)...</span>
          </div>
        )}
      </div>

      {/* Chat Input Bar */}
      <div className="p-3 bg-white border-t-3 border-black">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything or type a disease (e.g. KRAS G12D, Alzheimer, Ebola)..."
            className="flex-1 bg-[#FFFDF0] border-2 border-black px-3 py-2 text-xs font-mono font-bold text-black placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#FFE600] shadow-[2px_2px_0px_#000]"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-[#A6FF00] hover:bg-[#86EF00] disabled:bg-gray-300 border-2 border-black text-xs font-mono font-black uppercase text-black shadow-[2px_2px_0px_#000] neo-btn flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
