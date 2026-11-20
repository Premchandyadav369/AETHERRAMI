# AETHER-OmniDiff-MoE — GENERATION TRAINING REPORT
### Pillar 1: Pretraining, Fine-Tuning & Generative Convergence Protocols
**Subsystem:** `AETHER-OmniDiff-MoE` | **Release:** `v4.2.0-Landed`  
**Date:** November 1, 2026

---

## 1. Training Datasets & Preprocessing

The generative models in AETHER-RAMI leverage two distinct training tiers:

1. **Pretraining Foundation Tier (`GraphCL_Pretrain_v4`, `Multitask_GraphTransformer_v4`):**
   * **Source Dataset:** Filtered subset of ChEMBL 34 and ZINC-250k (~100,000 diverse drug-like molecules).
   * **Preprocessing:** Standardized with RDKit MolStandardize, desalting, neutral charge state, heavy atom count between 12 and 45, Lipinski rule-of-5 compliance.
   * **Objective:** Self-supervised graph contrastive learning via subgraph masking and node attribute perturbation.
2. **Pocket-Conditioned SDE Diffusion Tier (`cross_attention.pt`, `prot_cond_vae.pt`):**
   * **Source Dataset:** CrossDocked2020 dataset (22.5M docked poses, filtered to RMSD $< 1.0$ Å and sequence identity $< 30\%$ against test pockets).
   * **Pocket Cutoff:** Residues within 8.0 Å radius of the bound co-crystallized ligand.

---

## 2. Loss Formulations & Training Curves

### Denoising Score Matching Loss
The score network is optimized using the continuous denoising score matching objective:

$$\mathcal{L}_{\text{score}}(\theta) = \mathbb{E}_{t \sim \mathcal{U}(0, T), \mathbf{R}_0, \mathbf{\epsilon} \sim \mathcal{N}(0, \mathbf{I})} \left[ \left\| \mathbf{s}_\theta(\alpha_t \mathbf{R}_0 + \sigma_t \mathbf{\epsilon}, t, \mathcal{P}) + \frac{\mathbf{\epsilon}}{\sigma_t} \right\|^2 \right]$$

### Multitask Graph-Attention Training Dynamics
* **Optimizer:** AdamW ($\beta_1 = 0.9, \beta_2 = 0.999$, weight decay $= 10^{-4}$).
* **Learning Rate Schedule:** Cosine annealing with linear warmup (initial $\text{lr} = 10^{-4}$, warmup 2,000 steps, minimum $\text{lr} = 10^{-6}$).
* **Batch Size:** 64 protein-ligand pairs per gradient step.
* **Early Stopping:** Monitored on validation loss with a patience of 15 epochs.
* **Convergence:** Final training loss: $0.0421$; validation loss: $0.0538$; no signs of mode collapse or representation degeneration.
