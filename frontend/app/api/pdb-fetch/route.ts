import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Minimal canonical synthetic alpha-helix PDB fallback for offline/unresolvable queries
const FALLBACK_SYNTHETIC_PDB = `HEADER    DE NOVO RECEPTOR POCKET                 19-NOV-26   AETH              
TITLE     AETHER-RAMI SE(3) DE NOVO RECEPTOR ACTIVE CLEFT
ATOM      1  N   MET A   1       0.000   0.000   0.000  1.00 20.00           N  
ATOM      2  CA  MET A   1       1.458   0.000   0.000  1.00 20.00           C  
ATOM      3  C   MET A   1       2.009   1.426   0.000  1.00 20.00           C  
ATOM      4  O   MET A   1       1.246   2.391   0.000  1.00 20.00           O  
ATOM      5  CB  MET A   1       2.024  -0.781  -1.215  1.00 20.00           C  
ATOM      6  N   THR A   2       3.327   1.545   0.000  1.00 20.00           N  
ATOM      7  CA  THR A   2       3.987   2.846   0.000  1.00 20.00           C  
ATOM      8  C   THR A   2       3.633   3.670   1.233  1.00 20.00           C  
ATOM      9  O   THR A   2       4.275   4.685   1.488  1.00 20.00           O  
ATOM     10  CB  THR A   2       5.513   2.668  -0.089  1.00 20.00           C  
ATOM     11  N   GLY A   3       2.610   3.229   1.977  1.00 20.00           N  
ATOM     12  CA  GLY A   3       2.164   3.921   3.177  1.00 20.00           C  
ATOM     13  C   GLY A   3       0.707   4.341   3.048  1.00 20.00           C  
ATOM     14  O   GLY A   3       0.334   5.448   3.433  1.00 20.00           O  
ATOM     15  N   LYS A   4      -0.125   3.456   2.502  1.00 20.00           N  
ATOM     16  CA  LYS A   4      -1.549   3.738   2.327  1.00 20.00           C  
ATOM     17  C   LYS A   4      -1.890   5.150   1.849  1.00 20.00           C  
ATOM     18  O   LYS A   4      -2.731   5.864   2.398  1.00 20.00           O  
ATOM     19  CB  LYS A   4      -2.313   3.447   3.626  1.00 20.00           C  
ATOM     20  N   LEU A   5      -1.218   5.540   0.776  1.00 20.00           N  
ATOM     21  CA  LEU A   5      -1.442   6.865   0.198  1.00 20.00           C  
ATOM     22  C   LEU A   5      -0.621   7.930   0.925  1.00 20.00           C  
ATOM     23  O   LEU A   5      -1.077   9.071   1.042  1.00 20.00           O  
ATOM     24  CB  LEU A   5      -1.121   6.877  -1.303  1.00 20.00           C  
TER      25      LEU A   5
END
`;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawPdb = searchParams.get('pdb')?.trim() || '';

    if (!rawPdb) {
      return new NextResponse('Missing ?pdb parameter', { status: 400 });
    }

    // Clean to 4-character PDB code
    const cleaned = rawPdb.replace(/^RCSB_/i, '').replace(/[^a-zA-Z0-9]/g, '');
    const pdbCode = cleaned.length >= 4 ? cleaned.slice(-4).toUpperCase() : rawPdb.toUpperCase();
    const pdbLower = pdbCode.toLowerCase();

    // 1. Check local public/pdb cache
    try {
      const localFilePath = path.join(process.cwd(), 'public', 'pdb', `${pdbLower}.pdb`);
      if (fs.existsSync(localFilePath)) {
        const localContent = fs.readFileSync(localFilePath, 'utf-8');
        if (localContent && localContent.length > 200) {
          return new NextResponse(localContent, {
            status: 200,
            headers: {
              'Content-Type': 'text/plain',
              'Cache-Control': 'public, max-age=86400, immutable',
              'X-PDB-Source': 'local-cache'
            }
          });
        }
      }
    } catch (e) {
      // Continue to remote fetch
    }

    // 2. Fetch from Worldwide RCSB PDB with timeout
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const rcsbUrl = `https://files.rcsb.org/download/${pdbCode}.pdb`;
      const response = await fetch(rcsbUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AETHER-RAMI/6.4'
        }
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const pdbText = await response.text();
        if (pdbText && pdbText.includes('ATOM')) {
          // Optionally save to public cache asynchronously for future instant hits
          try {
            const cachePath = path.join(process.cwd(), 'public', 'pdb', `${pdbLower}.pdb`);
            fs.writeFile(cachePath, pdbText, () => {});
          } catch (err) {}

          return new NextResponse(pdbText, {
            status: 200,
            headers: {
              'Content-Type': 'text/plain',
              'Cache-Control': 'public, max-age=86400',
              'X-PDB-Source': 'worldwide-rcsb'
            }
          });
        }
      }
    } catch (e) {
      console.warn(`RCSB remote fetch failed for ${pdbCode}, attempting fallback`);
    }

    // 3. Fallback: Return clean synthetic receptor coordinates so viewer never breaks
    return new NextResponse(FALLBACK_SYNTHETIC_PDB, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'X-PDB-Source': 'synthetic-fallback'
      }
    });

  } catch (err: any) {
    return new NextResponse(FALLBACK_SYNTHETIC_PDB, {
      status: 200,
      headers: { 'Content-Type': 'text/plain', 'X-PDB-Source': 'emergency-fallback' }
    });
  }
}
