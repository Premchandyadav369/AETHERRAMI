'use client';

import React, { useRef, useEffect, useState } from 'react';
import { RotateCw, Play, Pause, ZoomIn, ZoomOut, Layers, Sparkles } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  z: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
}

export default function InteractiveMoleculeCanvas({ proteinName = "1M17 (EGFR Kinase Domain)" }: { proteinName?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedAtom, setSelectedAtom] = useState<string | null>("N1 - Lys745 (Active Site Anchor)");
  const [renderMode, setRenderMode] = useState<'ribbon' | 'ball-and-stick' | 'surface'>('ribbon');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    // Create 30 3D atoms/nodes
    const numNodes = 36;
    const nodes: { x: number; y: number; z: number; color: string; label: string }[] = [];
    
    for (let i = 0; i < numNodes; i++) {
      const theta = (i / numNodes) * Math.PI * 4;
      const radius = 90;
      const height = (i - numNodes / 2) * 8;
      nodes.push({
        x: Math.cos(theta) * radius,
        y: height,
        z: Math.sin(theta) * radius,
        color: i % 3 === 0 ? '#00F0FF' : i % 3 === 1 ? '#F59E0B' : '#F43F5E',
        label: `Atom #${i + 1} (${i % 3 === 0 ? 'N' : i % 3 === 1 ? 'C' : 'O'})`
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      if (isRotating) angle += 0.015;

      // Sort nodes by rotated Z depth
      const rotatedNodes = nodes.map(node => {
        const rad = angle;
        const rx = node.x * Math.cos(rad) - node.z * Math.sin(rad);
        const rz = node.x * Math.sin(rad) + node.z * Math.cos(rad);
        return { ...node, rx, ry: node.y, rz };
      }).sort((a, b) => a.rz - b.rz);

      // Draw connecting backbone bonds
      ctx.lineWidth = 2.5 * zoomLevel;
      for (let i = 0; i < rotatedNodes.length - 1; i++) {
        const n1 = rotatedNodes[i];
        const n2 = rotatedNodes[i + 1];
        const scale1 = (300 / (300 + n1.rz)) * zoomLevel;
        const scale2 = (300 / (300 + n2.rz)) * zoomLevel;

        const x1 = cx + n1.rx * scale1;
        const y1 = cy + n1.ry * scale1;
        const x2 = cx + n2.rx * scale2;
        const y2 = cy + n2.ry * scale2;

        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, n1.color);
        grad.addColorStop(1, n2.color);

        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Draw 3D Spherical Atoms with Lighting Glow
      rotatedNodes.forEach((node) => {
        const scale = (300 / (300 + node.rz)) * zoomLevel;
        const x = cx + node.rx * scale;
        const y = cy + node.ry * scale;
        const r = Math.max(3, 8 * scale);

        const radialGrad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r * 1.5);
        radialGrad.addColorStop(0, '#FFFFFF');
        radialGrad.addColorStop(0.4, node.color);
        radialGrad.addColorStop(1, '#050716');

        ctx.fillStyle = radialGrad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowColor = node.color;
        ctx.shadowBlur = 12 * scale;
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isRotating, zoomLevel]);

  return (
    <div className="relative w-full h-80 rounded-2xl overflow-hidden glass-panel-bioscript border border-amber-500/30 bg-slate-950/90 flex flex-col justify-between p-4 shadow-[0_0_40px_rgba(245,158,11,0.15)]">
      {/* Canvas Controls Header */}
      <div className="flex items-center justify-between z-10 font-mono text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="font-bold text-white tracking-wide">{proteinName}</span>
          <span className="px-2 py-0.5 rounded-full text-[9px] bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold">
            Interactive WebGL 3D
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="p-2 rounded-lg bg-slate-900 hover:bg-amber-500/20 border border-slate-700 text-slate-300 transition-all"
            title="Toggle 3D Rotation"
          >
            {isRotating ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.8))}
            className="p-2 rounded-lg bg-slate-900 hover:bg-amber-500/20 border border-slate-700 text-slate-300 transition-all"
          >
            <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.6))}
            className="p-2 rounded-lg bg-slate-900 hover:bg-amber-500/20 border border-slate-700 text-slate-300 transition-all"
          >
            <ZoomOut className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        width={600}
        height={260}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Interactive Telemetry Overlay */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-slate-400 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="text-slate-500">Render Mode:</span>
          {(['ribbon', 'ball-and-stick', 'surface'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setRenderMode(mode)}
              className={`px-2 py-0.5 rounded capitalize ${renderMode === mode ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold' : 'hover:text-slate-200'}`}
            >
              {mode}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Active Atom:</span>
          <span className="text-cyan-300 font-bold">{selectedAtom}</span>
        </div>
      </div>
    </div>
  );
}
