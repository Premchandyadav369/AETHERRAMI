"""
AETHER-RAMI Scientific Figure Generation Suite
Generates publication-quality, 300-DPI multi-panel figures grounded in actual experimental benchmark CSVs.
"""

import os
import sys
import shutil
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import matplotlib.gridspec as gridspec
from matplotlib.lines import Line2D

# Chem
import torch
from rdkit import Chem
from rdkit.Chem import Draw
from rdkit.Chem import AllChem

BASE_DIR = r"C:\Users\PREMCHANDYADAV\.gemini\antigravity\scratch\AETHERRAMI"
BRAIN_DIR = r"C:\Users\PREMCHANDYADAV\.gemini\antigravity\brain\0bb02a7b-91ec-4301-aceb-c0e199a26e13"
FIGURES_DIR = os.path.join(BASE_DIR, "figures")
BRAIN_FIGURES_DIR = os.path.join(BRAIN_DIR, "figures")

os.makedirs(FIGURES_DIR, exist_ok=True)
os.makedirs(BRAIN_FIGURES_DIR, exist_ok=True)

# Publication styling
plt.rcParams['font.family'] = 'DejaVu Sans'
plt.rcParams['font.size'] = 10
plt.rcParams['axes.titlesize'] = 11
plt.rcParams['axes.labelsize'] = 10
plt.rcParams['xtick.labelsize'] = 9
plt.rcParams['ytick.labelsize'] = 9
plt.rcParams['legend.fontsize'] = 9
plt.rcParams['figure.titlesize'] = 13
plt.rcParams['figure.dpi'] = 300
plt.rcParams['savefig.dpi'] = 300
plt.rcParams['axes.spines.top'] = False
plt.rcParams['axes.spines.right'] = False

# Consistent color palette
COLOR_OURS = '#1E88E5'      # Deep Blue
COLOR_SOTA = '#004D40'      # Teal
COLOR_BASELINE = '#D81B60'  # Magenta / Coral
COLOR_ACCENT = '#FFC107'    # Amber
COLOR_MUTED = '#757575'     # Slate Grey

print("Style initialized. Beginning figure generation...")
