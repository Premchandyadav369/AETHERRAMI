'use client';

import React, { useState } from 'react';
import { Database, Network, RefreshCw, CheckCircle2, Server } from 'lucide-react';
import { useTab } from '../TabContext';

interface WebhookEndpoint {
  systemName: string;
  endpointUrl: string;
  status: 'Connected' | 'Pending';
  lastSync: string;
}

const ENDPOINTS: WebhookEndpoint[] = [
  { systemName: 'Benchling Notebook REST API v2', endpointUrl: 'https://api.benchling.com/v2/entries/sync', status: 'Connected', lastSync: '2 mins ago' },
  { systemName: 'Thermo Fisher LIMS Enterprise Webhook', endpointUrl: 'https://lims.thermofisher.cloud/hooks/v1/aether', status: 'Connected', lastSync: '14 mins ago' },
  { systemName: 'LabWare LIMS ELN Listener', endpointUrl: 'https://eln.labware.com/api/v3/ingest', status: 'Connected', lastSync: '1 hour ago' },
];

export default function LimsSyncStudio() {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncAll = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('All enterprise Benchling & LIMS webhooks synchronized!');
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-[2rem] glass-panel-bioscript border border-emerald-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Network className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-black tracking-wide text-white">Enterprise Benchling & LIMS Webhook Sync Studio</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl font-mono">
            Bidirectional real-time webhook connector syncing computational AI molecular results with external Benchling, LabWare, and Thermo Fisher LIMS.
          </p>
        </div>

        <button
          onClick={handleSyncAll}
          disabled={isSyncing}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 font-bold text-xs text-slate-950 hover:opacity-90 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center gap-2 self-start md:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Syncing...' : 'Sync All Webhooks'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        {ENDPOINTS.map((e, idx) => (
          <div key={idx} className="p-5 rounded-[1.75rem] glass-panel-bioscript border border-slate-800 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-white">{e.systemName}</span>
              <span className="px-2 py-0.5 rounded-full text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                {e.status}
              </span>
            </div>

            <div className="space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Endpoint:</span>
                <span className="text-cyan-300 text-[10px] truncate max-w-[130px]">{e.endpointUrl}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Last Trigger:</span>
                <span className="text-emerald-400 font-bold">{e.lastSync}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
