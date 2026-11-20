import os
import sys

workspace = r"C:\Users\PREMCHANDYADAV\.gemini\antigravity\scratch\AETHERRAMI"
os.chdir(workspace)
sys.path.insert(0, workspace)

import torch
import numpy as np
from aether_rami.omni_diff.flow_matching_generator import OTFlowGenerator

print("Testing OTFlowGenerator...")
generator = OTFlowGenerator()

# Mock EGFR kinase pocket coordinates (25 residues)
np.random.seed(42)
mock_pocket = np.random.randn(25, 3) * 5.0 + np.array([12.0, 15.0, -8.0])

samples = []
for i in range(20):
    res = generator.sample_flow(mock_pocket, num_atoms=22, num_steps=30, seed=100 + i)
    samples.append(res)
    smi = res["smiles"]
    print(f"Sample {i+1:02d}: SMILES={smi[:28]}... RawPB={res['raw_posebusters_pass']} MinDist={res['raw_min_distance']:.2f}A QED={res['qed']:.3f}")

unique_smiles = set(s['smiles'] for s in samples)
raw_pb_passes = sum(1 for s in samples if s['raw_posebusters_pass'])
print(f"\nTotal Samples: {len(samples)}")
print(f"Unique SMILES: {len(unique_smiles)} / {len(samples)} (Duplicate Rate: {(1 - len(unique_smiles)/len(samples))*100:.1f}%)")
print(f"Raw PoseBusters Pass Rate: {raw_pb_passes / len(samples) * 100:.1f}%")
