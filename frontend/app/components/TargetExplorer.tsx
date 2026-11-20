'use client';

import React, { useState, useMemo } from 'react';
import { Target } from '../data/targets';
import { Search, ChevronRight, Eye, ShieldCheck, Sparkles, Activity } from 'lucide-react';

interface TargetExplorerProps {
  targets: Target[];
  activeTarget: Target;
  onSelectTarget: (target: Target) => void;
  onOpenDrawer: (target: Target) => void;
}

export default function TargetExplorer({
  targets,
  activeTarget,
  onSelectTarget,
  onOpenDrawer,
}: TargetExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'High-Burden India', 'Global Oncology', 'Infectious & AMR', 'Neurology & Metabolic', 'Cardiovascular'];

  const filteredTargets = useMemo(() => {
    return targets.filter((t) => {
      const matchCat = selectedCategory === 'All' || t.category === selectedCategory;
      const matchSearch =
        searchQuery === '' ||
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.disease.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.pdb.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.lead_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.clinical_bypass.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [targets, selectedCategory, searchQuery]);

  const handleSelectAndScroll = (t: Target) => {
    onSelectTarget(t);
    const el = document.getElementById('workbench');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="targets" className="py-20 border-b-4 border-black bg-[#FFFDF0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Section Masthead */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#A6FF00] border-2 border-black text-xs font-mono font-black uppercase shadow-[2px_2px_0px_#000]">
              <span>CLINICAL PIPELINE • 36 VALIDATED TARGETS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight uppercase leading-tight">
              Gatekeeper Resistance Bypass Catalog
            </h2>
            <p className="text-sm sm:text-base font-bold text-[#262626] max-w-xl">
              All-atom small-molecule leads optimized to maneuver around steric mutations and restore high-affinity binding without off-target cytotoxicity.
            </p>
          </div>

          {/* Inline Filter Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-black absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter targets, PDB, leads..."
              className="w-full bg-white border-3 border-black pl-10 pr-4 py-2.5 text-xs font-mono font-black text-black placeholder:text-gray-500 shadow-[3px_3px_0px_#000] focus:outline-none focus:ring-2 focus:ring-[#FFE600]"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const count = cat === 'All' ? targets.length : targets.filter(t => t.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 text-xs font-mono font-black uppercase border-2 border-black transition-all cursor-pointer neo-btn flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#FFE600] text-black shadow-[4px_4px_0px_#000]'
                    : 'bg-white text-black hover:bg-gray-100 shadow-[2px_2px_0px_#000]'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 border border-black ${isSelected ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dense Tabular Target Directory */}
        <div className="overflow-x-auto rounded-xl border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b-3 border-black bg-[#FFE600] text-black font-mono font-black uppercase text-xs tracking-wider">
                <th className="py-3.5 px-4 w-12 border-r-2 border-black">#</th>
                <th className="py-3.5 px-4 border-r-2 border-black">Disease Target & Indication</th>
                <th className="py-3.5 px-3 w-20 border-r-2 border-black text-center">PDB</th>
                <th className="py-3.5 px-4 border-r-2 border-black">Resistance Mutation</th>
                <th className="py-3.5 px-4 border-r-2 border-black">Frontline Drug Lost</th>
                <th className="py-3.5 px-4 border-r-2 border-black">AETHER-RAMI Lead</th>
                <th className="py-3.5 px-4 text-right border-r-2 border-black">Affinity (K<sub>D</sub>)</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black font-mono">
              {filteredTargets.map((t, idx) => {
                const isActive = activeTarget.id === t.id;
                return (
                  <tr
                    key={t.id}
                    className={`transition-colors duration-100 hover:bg-[#FFFDF0] ${
                      isActive ? 'bg-[#FFF9D2] border-l-4 border-l-[#A6FF00]' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 font-black text-black border-r-2 border-black">{idx + 1}</td>
                    
                    <td className="py-3.5 px-4 font-sans border-r-2 border-black">
                      <div className="font-black text-black text-sm flex items-center gap-2">
                        <span>{t.name}</span>
                        {t.category === 'High-Burden India' && (
                          <span className="text-[10px] font-mono font-black px-1.5 py-0.5 bg-[#FFE600] text-black border border-black shadow-[1px_1px_0px_#000]">
                            India Priority
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-semibold text-gray-700 mt-0.5">{t.disease}</div>
                    </td>

                    <td className="py-3.5 px-3 border-r-2 border-black text-center">
                      <button
                        onClick={() => handleSelectAndScroll(t)}
                        title="Load in 3D Workbench"
                        className="px-2 py-0.5 bg-black text-white hover:bg-[#FFE600] hover:text-black font-mono font-black text-xs border border-black shadow-[1px_1px_0px_#000] cursor-pointer"
                      >
                        {t.pdb}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 border-r-2 border-black">
                      <span className="bg-[#FF5470] text-white px-2 py-0.5 font-mono font-black border border-black shadow-[1px_1px_0px_#000]">
                        {t.clinical_bypass}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-gray-800 border-r-2 border-black">
                      {t.frontline_drug}
                    </td>

                    <td className="py-3.5 px-4 border-r-2 border-black">
                      <div className="text-black font-black">{t.lead_code}</div>
                      <div className="text-[10px] font-black text-[#2563EB]">{t.posebusters}</div>
                    </td>

                    <td className="py-3.5 px-4 text-right font-black text-black border-r-2 border-black tabular-nums">
                      <span className="bg-[#A6FF00] px-2 py-0.5 border border-black">
                        {t.kd_nm} nM
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleSelectAndScroll(t)}
                          className="px-2.5 py-1.5 bg-[#A6FF00] hover:bg-[#86EF00] border-2 border-black text-xs font-mono font-black text-black shadow-[2px_2px_0px_#000] neo-btn flex items-center gap-1 cursor-pointer"
                          title="Open in 3D Workbench"
                        >
                          <Activity className="w-3.5 h-3.5" />
                          <span>3D Lab</span>
                        </button>

                        <button
                          onClick={() => onOpenDrawer(t)}
                          className="px-2.5 py-1.5 bg-white hover:bg-gray-100 border-2 border-black text-xs font-mono font-black text-black shadow-[2px_2px_0px_#000] neo-btn flex items-center gap-1 cursor-pointer"
                          title="Open Detailed Target Dossier"
                        >
                          <span>Dossier</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
