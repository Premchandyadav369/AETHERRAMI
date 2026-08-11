'use client';

import React, { useState } from 'react';
import { Key, ShieldCheck, Lock, CheckCircle2, Copy, Check } from 'lucide-react';
import { useTab } from '../TabContext';

interface IpRecord {
  txHash: string;
  moleculeName: string;
  sha256: string;
  priorityDate: string;
  status: 'Anchored on Ledger' | 'Pending Block';
}

const IP_RECORDS: IpRecord[] = [
  { txHash: '0x9f8b...41e2', moleculeName: 'Osimertinib Mesylate Derivative Core', sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', priorityDate: '2026-08-11 09:12:00', status: 'Anchored on Ledger' },
  { txHash: '0x4a12...880c', moleculeName: 'PROTAC ARV-110 Analog Linker Core', sha256: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', priorityDate: '2026-08-10 14:45:22', status: 'Anchored on Ledger' },
];

export default function IpVaultStudio() {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-cyan-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Key className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-black tracking-wide text-white">Cryptographic Blockchain Intellectual Property (IP) Priority Vault</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Immutable SHA-256 cryptographic timestamping of lead molecular structures and patent claims onto an enterprise private ledger.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
          SHA-256 Ledger Active
        </span>
      </div>

      <div className="space-y-3 font-mono text-xs">
        {IP_RECORDS.map((r, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-white text-xs">{r.moleculeName}</span>
                <span className="px-2 py-0.5 rounded text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-700/50 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{r.status}</span>
                </span>
              </div>
              <span className="text-[10px] text-slate-500 block truncate max-w-lg">SHA-256: {r.sha256}</span>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <span className="text-[10px]">{r.priorityDate}</span>
              <button
                onClick={() => handleCopy(r.sha256)}
                className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 transition-colors"
              >
                {copiedHash === r.sha256 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
