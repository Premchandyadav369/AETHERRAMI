'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home, Sparkles, Activity } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error for diagnostics
    console.error('AETHER-RAMI Client Exception Caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FFFDF0] flex flex-col items-center justify-center p-4 sm:p-6 font-mono text-black selection:bg-[#FFE600]">
      <div className="max-w-xl w-full bg-white border-4 border-black shadow-[8px_8px_0px_#000000] p-6 sm:p-8 space-y-6">
        
        {/* Error Header */}
        <div className="flex items-center gap-3 border-b-3 border-black pb-4">
          <div className="w-12 h-12 bg-[#FF5470] text-white border-2 border-black flex items-center justify-center font-black shadow-[2px_2px_0px_#000]">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-red-600 bg-red-100 px-1.5 py-0.5 border border-red-300 inline-block mb-1">
              CLIENT RUNTIME RECOVERY
            </div>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black">
              Biophysical Canvas Recovered
            </h1>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2 text-xs leading-relaxed text-gray-800">
          <p className="font-bold">
            A temporary client-side rendering exception was intercepted by the AETHER-RAMI safety boundary. All macromolecular coordinates, active targets, and docking sessions remain safely intact.
          </p>
          {error.message && (
            <div className="p-3 bg-[#FFF5F5] border-2 border-[#FF5470] text-red-950 font-bold overflow-x-auto text-[11px]">
              <code>{error.message}</code>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="px-4 py-2.5 bg-[#A6FF00] hover:bg-[#86EF00] text-black font-black uppercase text-xs border-2 border-black shadow-[3px_3px_0px_#000] neo-btn flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset &amp; Reload Canvas</span>
          </button>

          <Link
            href="/"
            className="px-4 py-2.5 bg-[#FFE600] hover:bg-[#E6CF00] text-black font-black uppercase text-xs border-2 border-black shadow-[3px_3px_0px_#000] neo-btn flex items-center justify-center gap-2 text-center"
          >
            <Home className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="pt-4 border-t-2 border-black flex items-center justify-between text-[11px] text-gray-600">
          <Link href="/drug-library" className="underline hover:text-black font-bold">
            Drug Library &rarr;
          </Link>
          <Link href="/benchmarks" className="underline hover:text-black font-bold">
            Benchmarks &rarr;
          </Link>
          <Link href="/diseases" className="underline hover:text-black font-bold">
            36 Diseases &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}
