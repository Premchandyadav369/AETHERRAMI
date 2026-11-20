import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export default function Logo({ size = 32, className = '', showText = false }: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform group-hover:scale-105"
      >
        {/* Outer Heavy Border Box */}
        <rect x="4" y="4" width="92" height="92" fill="#000000" rx="4" />
        <rect x="8" y="8" width="84" height="84" fill="#FFFDF0" stroke="#000000" strokeWidth="3" rx="2" />

        {/* SE(3) Equivariant Chiral Manifold Hexagon */}
        <g transform="translate(50, 50)">
          {/* Hexagon Outline */}
          <polygon
            points="0,-32 27.7,-16 27.7,16 0,32 -27.7,16 -27.7,-16"
            fill="none"
            stroke="#000000"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Top Left Face (Lime) */}
          <polygon
            points="0,0 0,-32 -27.7,-16"
            fill="#A6FF00"
            stroke="#000000"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Top Right Face (Yellow) */}
          <polygon
            points="0,0 27.7,-16 0,-32"
            fill="#FFE600"
            stroke="#000000"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Bottom Face (Black) */}
          <polygon
            points="0,0 27.7,16 0,32 -27.7,16"
            fill="#000000"
            stroke="#000000"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Central Chiral Node */}
          <circle cx="0" cy="0" r="6" fill="#FFFFFF" stroke="#000000" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="2" fill="#00F0FF" />

          {/* Vertex Anchors */}
          <circle cx="0" cy="-32" r="3.5" fill="#000000" />
          <circle cx="27.7" cy="16" r="3.5" fill="#000000" />
          <circle cx="-27.7" cy="16" r="3.5" fill="#000000" />
        </g>
      </svg>

      {showText && (
        <span className="font-mono text-sm sm:text-base font-black tracking-wider text-black uppercase bg-[#FFE600] px-2.5 py-1 border-2 border-black shadow-[3px_3px_0px_#000] neo-btn">
          AETHER-RAMI
        </span>
      )}
    </div>
  );
}
