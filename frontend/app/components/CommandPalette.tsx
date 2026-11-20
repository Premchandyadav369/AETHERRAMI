'use client';

import React, { useEffect } from 'react';
import { Command } from 'cmdk';
import { Target } from '../data/targets';
import { Search, Database, ExternalLink, Activity, Target as TargetIcon } from 'lucide-react';

interface CommandPaletteProps {
  targets: Target[];
  isOpen: boolean;
  onClose: () => void;
  onSelectTarget: (target: Target) => void;
  onOpenDrawer: (target: Target) => void;
}

export default function CommandPalette({
  targets,
  isOpen,
  onClose,
  onSelectTarget,
  onOpenDrawer,
}: CommandPaletteProps) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/75">
      <div className="relative w-full max-w-xl">
        <Command
          className="w-full bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden font-sans"
        >
          <div className="flex items-center px-4 border-b-3 border-black bg-[#FFE600]">
            <Search className="w-5 h-5 text-black mr-2 shrink-0" />
            <Command.Input
              placeholder="Search target, PDB ID (e.g. 2X22), mutation, or lead..."
              className="w-full bg-transparent py-4 text-sm font-mono font-black text-black placeholder:text-gray-700 focus:outline-none"
              autoFocus
            />
            <kbd className="text-xs font-mono font-black px-2 py-0.5 bg-white border-2 border-black shadow-[1px_1px_0px_#000]">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-80 overflow-y-auto p-3 divide-y-2 divide-black font-mono text-xs">
            <Command.Empty className="py-6 text-center text-xs text-black font-mono font-black">
              No matching clinical targets found.
            </Command.Empty>

            <Command.Group heading="36 Clinical Disease Targets" className="text-black font-black py-1">
              {targets.map((t) => (
                <Command.Item
                  key={t.id}
                  value={`${t.name} ${t.disease} ${t.pdb} ${t.clinical_bypass} ${t.frontline_drug} ${t.lead_code}`}
                  onSelect={() => {
                    onSelectTarget(t);
                    onOpenDrawer(t);
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 my-1 border-2 border-transparent hover:border-black hover:bg-[#A6FF00] cursor-pointer transition-all text-black font-bold"
                >
                  <div className="flex items-center gap-2.5">
                    <TargetIcon className="w-4 h-4 text-black shrink-0" />
                    <div>
                      <span className="font-black text-black text-sm">{t.name}</span>
                      <span className="text-xs font-bold text-gray-700 ml-2 bg-white px-1 border border-black">
                        PDB: {t.pdb}
                      </span>
                      <div className="text-[11px] text-gray-800">{t.disease}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="bg-[#FF5470] text-white px-1.5 py-0.2 border border-black font-black text-[11px]">
                      {t.clinical_bypass}
                    </span>
                    <div className="text-xs font-black text-black mt-0.5">{t.kd_nm} nM</div>
                  </div>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>

          <div className="p-3 bg-[#FFFDF0] border-t-3 border-black flex items-center justify-between text-[11px] font-mono font-black text-black">
            <span>Navigation: ↑↓ to navigate • ↵ to select</span>
            <span className="bg-black text-white px-1.5 py-0.2">AETHER-RAMI</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
