'use client';

import React, { useState } from 'react';
import { Network, Code, Server, ShieldCheck, Copy, Check, Download, ExternalLink } from 'lucide-react';
import { useTab } from '../TabContext';

interface ApiEndpoint {
  method: 'GET' | 'POST' | 'GRAPHQL';
  path: string;
  description: string;
  rateLimit: string;
  status: 'Active' | 'Deprecated';
}

const ENDPOINTS: ApiEndpoint[] = [
  { method: 'POST', path: '/api/v1/predict/binding', description: 'Run GATv2 cross-attention affinity prediction for SMILES + PDB ID', rateLimit: '10,000 req/min', status: 'Active' },
  { method: 'POST', path: '/api/v1/quantum/dft', description: 'Calculate B3LYP electronic energy, SASA, and dipole moment', rateLimit: '2,500 req/min', status: 'Active' },
  { method: 'POST', path: '/api/v1/md/simulate', description: 'Execute 100ns explicit solvent trajectory with MM-PBSA free energy', rateLimit: '500 req/min', status: 'Active' },
  { method: 'GET', path: '/api/v1/targets/chembl', description: 'Query ChEMBL bioactivity cards, IC50 values, and approved drugs', rateLimit: '50,000 req/min', status: 'Active' },
  { method: 'GRAPHQL', path: '/graphql/v1/query', description: 'Unified GraphQL endpoint for multi-omics target and PDB structures', rateLimit: '25,000 req/min', status: 'Active' },
];

export default function ApiGatewayStudio() {
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const handleCopy = (path: string) => {
    navigator.clipboard.writeText(`https://api.aetherrami.org${path}`);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-cyan-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Network className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-black tracking-wide text-white">AI Microservices REST & GraphQL API Gateway</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            High-throughput enterprise API gateway with OpenAPI 3.0 specification, GraphQL playground, and rate-limiting telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
            100k req/min Rate Limit Active
          </span>
        </div>
      </div>

      {/* Endpoints List */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col gap-4">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
          Public REST & GraphQL Endpoints ({ENDPOINTS.length})
        </span>

        <div className="space-y-3">
          {ENDPOINTS.map((ep, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded font-bold text-[10px] ${
                  ep.method === 'POST' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50' :
                  ep.method === 'GET' ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/50' :
                  'bg-purple-950 text-purple-300 border border-purple-700/50'
                }`}>
                  {ep.method}
                </span>
                <code className="text-white font-bold text-xs">{ep.path}</code>
              </div>

              <div className="flex items-center gap-4 text-slate-400 text-xs">
                <span className="truncate max-w-md text-slate-300">{ep.description}</span>
                <span className="text-slate-500 text-[10px]">{ep.rateLimit}</span>
                <button
                  onClick={() => handleCopy(ep.path)}
                  className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 transition-colors"
                >
                  {copiedPath === ep.path ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
