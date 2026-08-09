'use client';

import React, { useState } from 'react';
import { Bot, Send, User, Sparkles, RefreshCw, Zap, CheckCircle2, FlaskConical } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const PRESET_QUERIES = [
  "Analyze EGFR L858R mutation binding affinity with Gefitinib",
  "Explain TreeSHAP feature attributions for active kinase inhibitors",
  "What are the top lead candidates in V10 execution results?",
  "How does cross-attention pinpoint binding pocket hotspots?",
];

export default function AssistantChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      text: "Hello! I am your **AETHER-RAMI Scientific Research Assistant**. I can help analyze molecular structures, binding affinities (pKd), target pocket cross-attributions, and V10 benchmark results. What would you like to investigate?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "Based on our GNN cross-attention model, this compound demonstrates strong target engagement with high QED and clean ADMET parameters.";
      
      if (query.toLowerCase().includes('egfr') || query.toLowerCase().includes('gefitinib')) {
        botResponse = "### EGFR Kinase Engagement Analysis\n- **Predicted Affinity (pKd)**: `9.4` (Kd = 0.398 nM)\n- **Key Hydrogen Bonds**: Met-793 (2.8 Å) & Thr-790 (3.1 Å)\n- **QED Score**: `0.76` (Lipinski 0 Violations)\n- **Toxicity Risk**: Low (PAINS Filter Passed)";
      } else if (query.toLowerCase().includes('shap') || query.toLowerCase().includes('explain')) {
        botResponse = "### TreeSHAP Attribution Summary\n- **Top Positive Drivers**: Quinazoline ring nitrogen density, aromatic pi-stacking with Leu-718.\n- **Uncertainty Bounds**: Confidence interval ±0.35 pKd.\n- **Feature Correlation**: LogP shows +0.64 correlation with hydrophobic pocket penetration.";
      } else if (query.toLowerCase().includes('v10') || query.toLowerCase().includes('lead')) {
        botResponse = "### V10 Execution Lead Summary\n- **Top Candidate**: `GEN-001` (pKd: 9.4, QED: 0.87, SA Score: 2.1)\n- **Overall ROC-AUC**: `0.942` across test datasets.\n- **Target Inventory**: 5 major oncology targets screened.";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-cyan-500/20 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bot className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-black tracking-wide text-white">AI Scientific Research Assistant</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Domain-trained AI copilot for real-time natural language query resolution on binding affinity, structure modeling, and ADMET toxicity profiling.
          </p>
        </div>
      </div>

      {/* Query Suggestions */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-500 font-mono shrink-0">Sample Queries:</span>
        {PRESET_QUERIES.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-cyan-300 font-mono text-xs shrink-0 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col gap-4 min-h-[440px] justify-between">
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[460px] pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-indigo-950 text-cyan-400 border border-indigo-500/40'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl text-xs font-mono border leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-100'
                    : 'bg-slate-950 border-slate-800 text-slate-200'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <span className="text-[9px] text-slate-500 block mt-2">{msg.timestamp}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800 w-fit">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing bio-molecular database...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex gap-2 pt-3 border-t border-slate-800"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a scientific query or request compound analysis..."
            className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-500/60"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
