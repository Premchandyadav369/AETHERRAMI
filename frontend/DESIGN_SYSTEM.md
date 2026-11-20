# AETHER-RAMI Frontend Design System
*Craft-Led, Opinionated Interface Engineering for Computational Biophysics*

This repository adheres to the craft-led, opinionated interface design philosophy, synthesizing principles from:
- **Base UI & shadcn/ui:** Accessible, unstyled, owned component foundation.
- **kindofUI (`xeyynon/kindofUI`):** 145 live UX patterns, decision trees (`decisions.md`), stale-while-revalidate data loading, Doherty threshold (<400ms).
- **react-bits (`DavidHDev/react-bits`):** Purposeful micro-components (`DecryptedText`, `LatticeLoader`, `StatusMark`, subtle `DotGrid`).
- **Emil Kowalski's motion principles:** Micro-interactions, never scale(0), snappy deceleration curves.

---

## 1. Core Principles
- **Intentional, not decorative:** Every element serves a scientific or interaction purpose. Zero ambient glow blobs, zero decorative gradients, zero arbitrary card borders.
- **Typography leads:** Distinctive typographic scale with generous whitespace and disciplined 68ch line lengths for prose.
- **Editorial composition:** Designed like an avant-garde science publication (*Isomorphic Labs, Stripe Press, Linear*).
- **Subtle interactions (Emil Kowalski principles):**
  - Origin-aware popovers and menus.
  - Never animate from `scale(0)` (use `scale(0.96) -> scale(1.0)`).
  - Transitions snappy (150ms-200ms) with `cubic-bezier(0.16, 1, 0.3, 1)`.
  - Tab switching and frequent interactions are near-instantaneous (<80ms).
- **Distinctive layouts:** Data-dense, asymmetric, tabular. Reject the generic *Hero -> 3 cards -> Pricing* template.
- **Functional minimalism:** High-density scientific information without visual clutter.
- **Locked consistency:** 4px/8px spatial scale, single border-radius ruleset (`rounded-lg` for panels, `rounded-md` for inputs/buttons, `rounded-sm` for badges).

---

## 2. Ingested Patterns & Component Stack

### From `kindofUI`:
1. **Decision Architectures:**
   - **Target Inspection:** Use **Drawer / Side-Sheet (`vaul`)** instead of modal dialogs to maintain context continuity while browsing targets.
   - **Telemetric Feedback:** Use **Toast (`sonner`)** for non-blocking notifications with immediate Undo capability.
   - **Power Search:** Use **Command Palette (`cmdk`)** with `Cmd+K` and `/` hotkeys.
2. **Data Stability: Stale-While-Revalidate ("Last Known Value"):**
   - Retain current binding metrics and PoseBusters values with an inline `"Recalculating..."` badge when toggling mutations, avoiding empty skeleton flashes.
3. **Doherty Threshold (<400ms):**
   - Immediate feedback (<80ms) for all interactive selections.

### From `react-bits`:
1. **`DecryptedText`:** Monospace cryptographic unveil for PDB accession IDs, FASTA sequences, and mutational loci.
2. **`LatticeLoader` & `StatusMark`:** Micro-crystallographic coordinate loaders and live inference status indicators.
3. **`DotGrid`:** Muted structural coordinate canvas (`rgba(255, 255, 255, 0.02)`).

---

## 3. Strict Anti-AI-Slop Checklist
- [x] No generic purple-blue gradients (`bg-gradient-to-r`).
- [x] No unnecessary glassmorphism or glowing cards (`backdrop-blur-xl`, neon borders).
- [x] No repetitive rounded-card grids for every section.
- [x] No oversized headlines without a strong reason.
- [x] No random icon collections or emojis as decoration.
- [x] No artificial animations that slow down navigation.
- [x] No fabricated testimonials, metrics, or client logos.
- [x] No excessive whitespace that hides actual content.
- [x] No inconsistent border radii and spacing.
- [x] No desktop-only layouts that break on mobile.
