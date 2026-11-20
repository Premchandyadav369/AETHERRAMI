'use client';

import React from 'react';
import { Search, ExternalLink, Activity, Database, Sparkles, Sliders, FlaskConical, Crosshair } from 'lucide-react';
import Link from 'next/link';
import Logo from './Logo';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenWorkbench: () => void;
}

export default function Navbar({ onOpenSearch, onOpenWorkbench }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b-4 border-black bg-[#FFFDF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Mark (Neobrutalism) */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <Logo size={34} />
            <span className="font-mono text-sm sm:text-base font-black tracking-wider text-black uppercase bg-[#FFE600] px-2.5 py-1 border-2 border-black shadow-[3px_3px_0px_#000] neo-btn">
              AETHER-RAMI
            </span>
          </Link>
        </div>

        {/* Global Navigation Links */}
        <nav className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono font-black">
            <button
              onClick={onOpenWorkbench}
              className="px-2.5 py-1 text-black hover:bg-[#FFE600] border-2 border-transparent hover:border-black hover:shadow-[2px_2px_0px_#000] transition-all cursor-pointer flex items-center gap-1"
            >
              <Activity className="w-3.5 h-3.5 text-black" />
              <span>3D Workbench</span>
            </button>

            <Link
              href="/diseases"
              className="px-2.5 py-1 text-black hover:bg-[#00F0FF] border-2 border-transparent hover:border-black hover:shadow-[2px_2px_0px_#000] transition-all flex items-center gap-1"
            >
              <Database className="w-3.5 h-3.5 text-black" />
              <span>36 Diseases</span>
            </Link>

            <Link
              href="/drug-library"
              className="px-2.5 py-1 text-black hover:bg-[#FFE600] border-2 border-transparent hover:border-black hover:shadow-[2px_2px_0px_#000] transition-all flex items-center gap-1"
            >
              <FlaskConical className="w-3.5 h-3.5 text-black" />
              <span>Drug Library</span>
            </Link>

            <Link
              href="/benchmarks"
              className="px-2.5 py-1 text-black bg-[#A6FF00] border-2 border-black shadow-[2px_2px_0px_#000] neo-btn flex items-center gap-1"
            >
              <Sliders className="w-3.5 h-3.5 text-black" />
              <span>Benchmarks</span>
            </Link>

            <a
              href="#docking-studio"
              className="px-2.5 py-1 text-black hover:bg-[#00F0FF] border-2 border-transparent hover:border-black hover:shadow-[2px_2px_0px_#000] transition-all flex items-center gap-1"
            >
              <Crosshair className="w-3.5 h-3.5 text-black" />
              <span>Docking Studio</span>
            </a>

            <a
              href="#gamechanger"
              className="px-2.5 py-1 text-black hover:bg-[#FFE600] border-2 border-transparent hover:border-black hover:shadow-[2px_2px_0px_#000] transition-all flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Studio</span>
            </a>

            <a
              href="#architecture"
              className="px-2.5 py-1 text-black hover:bg-[#FF5470] hover:text-white border-2 border-transparent hover:border-black hover:shadow-[2px_2px_0px_#000] transition-all"
            >
              MoE Engine
            </a>
          </div>

          <div className="flex items-center gap-2">
            {/* Search Trigger (cmdk) */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-mono font-black text-black bg-white hover:bg-[#FFFDF0] border-2 border-black shadow-[2px_2px_0px_#000] neo-btn cursor-pointer"
              title="Search targets and drugs (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="text-[10px] px-1 bg-[#FFE600] border border-black font-black">⌘K</kbd>
            </button>

            {/* Hugging Face Hub Links */}
            <a
              href="https://huggingface.co/Premchan369/aether-rami-esm2-diffsbdd"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-black text-black bg-[#FFE600] border-2 border-black shadow-[2px_2px_0px_#000] neo-btn"
              title="Hugging Face Model Hub SafeTensors"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Model Hub</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>

            {/* Launch 3D Workbench Action */}
            <button
              onClick={onOpenWorkbench}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-black text-black bg-[#A6FF00] hover:bg-[#86EF00] border-2 border-black shadow-[3px_3px_0px_#000] neo-btn cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>3D Lab</span>
            </button>
          </div>
        </nav>

      </div>
    </header>
  );
}
