'use client';

import React, { useState } from 'react';
import { Search, Database, FileText, Zap } from 'lucide-react';
import { fetchDrugDictionary } from '../lib/api';

export default function DrugDictionary() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const data = await fetchDrugDictionary(query);
      setResults(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full max-w-5xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl glass-panel border border-cyan-500/30">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-400" />
            <span>Enterprise Drug & Docking Knowledge Dictionary</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Real-time querying of PubChem and ClinicalTrials for target insights.
          </p>
        </div>
      </div>

      <div className="rounded-2xl glass-panel p-6 border border-slate-800 flex-1 overflow-y-auto">
        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search for drugs, targets, or molecular structures (e.g., Osimertinib, EGFR)..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <span className="animate-spin text-xl leading-none">⟳</span> : <Search className="w-4 h-4" />}
            <span>Search</span>
          </button>
        </div>

        {results && results.results && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-300 font-mono border-b border-slate-800 pb-2">
              Results for "{results.query}"
            </h3>
            {results.results.map((res: any, idx: number) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-950 text-indigo-400 border border-indigo-800/50">
                        {res.source}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{res.type}</span>
                    </div>
                    <h4 className="text-base font-bold text-white mb-2">{res.title}</h4>
                    <p className="text-xs text-slate-400 font-mono">ID: <span className="text-cyan-400">{res.id}</span></p>
                  </div>
                  <div className="text-right flex flex-col items-end">
                     <div className="text-xs text-slate-400 font-mono mb-1">Relevance</div>
                     <div className="text-lg font-black text-emerald-400">{(res.relevance * 100).toFixed(0)}%</div>
                  </div>
                </div>
              </div>
            ))}
            {results.results.length === 0 && (
              <div className="text-center p-8 text-slate-500 font-mono">
                No verified records found in active registries.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
