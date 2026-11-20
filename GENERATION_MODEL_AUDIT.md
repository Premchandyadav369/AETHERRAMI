# AETHER-OmniDiff-MoE — GENERATION MODEL AUDIT REPORT
### Pillar 1: SE(3)-Equivariant Continuous Diffusion & Pocket-Conditioned Graph Generation
**Subsystem:** `AETHER-OmniDiff-MoE` | **Release:** `v4.2.0-Landed`  
**Date:** November 1, 2026 | **Audit Authority:** DeepMind Science Standards

---

## 1. Architectural Architecture & Coordinate SDE Formulation

`AETHER-OmniDiff-MoE` combines continuous reverse-diffusion stochastic differential equations (SDE) with discrete molecular graph reconstruction.

### Geometric Coordinate Diffusion SDE
The forward noising process adds continuous Gaussian noise to atomic coordinates $\mathbf{R}_t \in \mathbb{R}^{N \times 3}$:

$$d\mathbf{R}_t = f(t) \mathbf{R}_t dt + g(t) d\mathbf{w}_t$$

where $f(t) = -\frac{1}{2}\beta(t)$ and $g(t) = \sqrt{\beta(t)}$ represent the variance-preserving (VP) noise schedule.

The reverse generative trajectory is modeled by learning the vector score function $\mathbf{s}_\theta(\mathbf{R}_t, t, \mathcal{P})$ conditioned on the protein binding pocket coordinates $\mathcal{P} \in \mathbb{R}^{M \times 3}$:

$$d\mathbf{R}_t = \left[ f(t)\mathbf{R}_t - g(t)^2 \mathbf{s}_\theta(\mathbf{R}_t, t, \mathcal{P}) \right] dt + g(t) d\mathbf{\bar{w}}_t$$

### $\mathrm{SE}(3)$-Equivariance Guarantee
To guarantee strict rotation and translation equivariance, the score network implements `SE3EquivariantGNNLayer`:
* **Coordinate Update:**
  $$\mathbf{R}_i^{(l+1)} = \mathbf{R}_i^{(l)} + \sum_{j \in \mathcal{N}(i)} (\mathbf{R}_i^{(l)} - \mathbf{R}_j^{(l)}) \phi_x\left(\mathbf{h}_i^{(l)}, \mathbf{h}_j^{(l)}, \|\mathbf{R}_i^{(l)} - \mathbf{R}_j^{(l)}\|^2\right)$$
* **Feature Update:**
  $$\mathbf{h}_i^{(l+1)} = \phi_h\left(\mathbf{h}_i^{(l)}, \sum_{j \in \mathcal{N}(i)} \mathbf{m}_{ij}^{(l)}\right)$$

Any spatial rotation $\mathbf{Q} \in \mathrm{SO}(3)$ and translation $\mathbf{t} \in \mathbb{R}^3$ applied to input coordinates transforms the output coordinates by the identical rotation and translation:

$$\mathbf{s}_\theta(\mathbf{Q}\mathbf{R} + \mathbf{t}, t, \mathbf{Q}\mathcal{P} + \mathbf{t}) = \mathbf{Q} \mathbf{s}_\theta(\mathbf{R}, t, \mathcal{P})$$

---

## 2. Pocket Conditioning Audit

The conditioning mechanism was audited across three representative targets:
1. **EGFR Kinase (T790M Gatekeeper, PDB: `3W2S`):** Pocket centered on `[22.4, 31.8, 15.2]` Å. Conditioned generation yields pyrimidine and quinazoline cores that fit the hydrophobic ATP cleft.
2. **InhA Tuberculosis (PDB: `2X22`):** Pocket centered on `[18.5, 4.2, 12.6]` Å. Incorporates the essential NADH cofactor in the active site boundary.
3. **KRAS G12C (Switch-II Covalent, PDB: `6OIM`):** Pocket centered on `[12.8, -1.5, 24.1]` Å. Coordinates ARS-1620 warhead geometry with Cys12 thiolate nucleophile.

---

## 3. Chemical Validity & Valency Safeguards

* **Scaffold Fragmentation & Assembly:** Employs `ChemicalValidator` to enforce standard aromaticity rules and prevent unkekulizable radical intermediates.
* **Valence Checks:** Standard valence limits strictly enforced ($C \le 4$, $N \le 3$ or 4 quaternized, $O \le 2$, $S \le 6$, $P \le 5$, Halogens $\le 1$).
* **Disconnection Prevention:** Graph reconstruction requires single connected component topology. Unconnected fragments or isolated atomic artifacts are discarded during sampling.
