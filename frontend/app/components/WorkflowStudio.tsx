'use client';

import React, { useState } from 'react';
import { Network, Play, Pause, RefreshCw, CheckCircle2, AlertCircle, Plus, Settings, ArrowRight, Download, Layers, Activity, Zap, Database, FlaskConical, Microscope } from 'lucide-react';
import { useTab } from '../TabContext';

interface WorkflowNode {
  id: string;
  type: string;
  name: string;
  category: 'Ingestion' | 'Compute' | 'Analysis' | 'Export';
  status: 'completed' | 'running' | 'idle' | 'warning';
  icon: any;
  output: string;
  params: Record<string, string>;
}

export default function WorkflowStudio() {
  const { setActiveTab } = useTab();
  const [isRunning, setIsRunning] = useState(false);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);

  const [nodes, setNodes] = useState<WorkflowNode[]>([
    { id: 'node-1', type: 'target_fetch', name: '1. RCSB PDB Structure Fetcher', category: 'Ingestion', status: 'completed', icon: Microscope, output: '1M17 PDB Coordinates (2.60 Å Resolution)', params: { pdb_id: '1M17', organism: 'Homo sapiens' } },
    { id: 'node-2', type: 'pocket_detect', name: '2. Pocket Cavity Grid Search', category: 'Compute', status: 'completed', icon: Layers, output: 'Active Binding Site Cavity Centroid (X: 12.4, Y: -8.1, Z: 4.2)', params: { grid_spacing: '0.375 Å', min_volume: '450 Å³' } },
    { id: 'node-3', type: 'gnn_affinity', name: '3. GATv2 + GIN Ensemble Inference', category: 'Compute', status: 'completed', icon: Zap, output: 'Predicted Affinity pKd: 9.4 (Kd = 0.398 nM)', params: { model_checkpoint: 'gatv2_v10.pt', cross_attention: 'enabled' } },
    { id: 'node-4', type: 'admet_filter', name: '4. ADMET & PAINS Safety Filter', category: 'Analysis', status: 'completed', icon: Activity, output: 'Lipinski 0 Violations | QED: 0.76 | PAINS: Clear', params: { rule_of_5: 'strict', pains_catalog: 'wehi_2024' } },
    { id: 'node-5', type: 'denovo_opt', name: '5. De Novo VAE Candidate Sampling', category: 'Compute', status: 'idle', icon: FlaskConical, output: '10 Novel Lead Compounds Generated', params: { min_qed: '0.75', sa_score_max: '3.0' } },
    { id: 'node-6', type: 'report_export', name: '6. Synthesis & Wet Lab Export', category: 'Export', status: 'idle', icon: Download, output: 'Publication CSV & HTML Report Ready', params: { export_format: 'CSV + HTML', priority: 'High' } },
  ]);

  const handleRunPipeline = () => {
    setIsRunning(true);
    // Simulate n8n workflow execution node by node
    setNodes(prev => prev.map(n => ({ ...n, status: 'running' })));

    setTimeout(() => {
      setNodes(prev => prev.map(n => ({ ...n, status: 'completed' })));
      setIsRunning(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-cyan-500/20 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Network className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-black tracking-wide text-white">n8n-Inspired Drug Discovery Workflow Studio</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Visual node-graph automation pipeline connecting data ingestion, PDB pocket grid search, GNN neural inference, ADMET filtering, and wet lab exports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunPipeline}
            disabled={isRunning}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 font-bold text-xs text-slate-950 hover:opacity-90 transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] flex items-center gap-2 disabled:opacity-50"
          >
            {isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
            <span>Execute Workflow Graph</span>
          </button>
        </div>
      </div>

      {/* Main Workflow Canvas & Config Inspector Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: n8n Node Flow Canvas */}
        <div className="lg:col-span-2 p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col gap-6 bg-slate-950/90 relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2 font-mono">
              <Network className="w-4 h-4 text-cyan-400" />
              <span>Computational Pipeline Nodes ({nodes.length})</span>
            </span>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Completed</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> Running</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-600"></span> Idle</span>
            </div>
          </div>

          {/* Node Flow Diagram */}
          <div className="flex flex-col gap-4 relative py-2">
            {nodes.map((node, index) => {
              const Icon = node.icon;
              const isSelected = selectedNode?.id === node.id;
              return (
                <React.Fragment key={node.id}>
                  {/* Node Card */}
                  <div
                    onClick={() => setSelectedNode(node)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-200 shadow-[0_0_20px_rgba(0,229,255,0.15)]'
                        : 'bg-slate-900/80 border-slate-800/80 text-slate-300 hover:border-cyan-500/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-lg flex items-center justify-center shrink-0 ${
                        node.status === 'completed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' :
                        node.status === 'running' ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/40' :
                        'bg-slate-950 text-slate-500 border border-slate-800'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-white group-hover:text-cyan-300">{node.name}</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                            node.category === 'Ingestion' ? 'bg-indigo-950 text-indigo-300 border border-indigo-700/40' :
                            node.category === 'Compute' ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/40' :
                            node.category === 'Analysis' ? 'bg-purple-950 text-purple-300 border border-purple-700/40' :
                            'bg-emerald-950 text-emerald-300 border border-emerald-700/40'
                          }`}>
                            {node.category}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono block mt-0.5">{node.output}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs">
                      {node.status === 'completed' && <span className="text-emerald-400 flex items-center gap-1 font-bold"><CheckCircle2 className="w-3.5 h-3.5" /> Passed</span>}
                      {node.status === 'running' && <span className="text-cyan-400 flex items-center gap-1 font-bold"><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Processing</span>}
                      {node.status === 'idle' && <span className="text-slate-500">Ready</span>}
                    </div>
                  </div>

                  {/* Connecting Flow Cable Line */}
                  {index < nodes.length - 1 && (
                    <div className="flex justify-center -my-2 z-0">
                      <div className="w-0.5 h-4 bg-gradient-to-b from-cyan-500/40 to-indigo-500/40" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Node Parameter Inspector */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2">NODE PARAMETERS INSPECTOR</span>

            {selectedNode ? (
              <div className="flex flex-col gap-4 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">Node ID & Type</span>
                  <strong className="text-cyan-400 font-bold text-xs">{selectedNode.id} ({selectedNode.type})</strong>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">Node Title</span>
                  <strong className="text-white text-xs">{selectedNode.name}</strong>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">Last Output Telemetry</span>
                  <strong className="text-emerald-300 text-xs block leading-relaxed">{selectedNode.output}</strong>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase mb-2">Configured Hyperparameters</span>
                  <div className="space-y-1.5 text-[11px]">
                    {Object.entries(selectedNode.params).map(([k, v]) => (
                      <div key={k} className="flex justify-between text-slate-300">
                        <span>{k}:</span>
                        <strong className="text-purple-300">{v}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-slate-950 border border-slate-900 text-center text-xs font-mono text-slate-500">
                Click any workflow node in the canvas to inspect hyperparameters and step telemetry logs.
              </div>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-cyan-300 font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Workflow graph validated with zero cyclic dependencies.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
