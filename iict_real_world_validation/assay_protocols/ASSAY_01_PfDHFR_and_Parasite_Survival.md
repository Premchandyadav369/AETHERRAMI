# Assay Protocol: PfDHFR Enzymatic & Plasmodium falciparum In Vitro Growth Inhibition
**Protocol ID:** PROTO-IICT-BIO-MAL-001
**Facilities:** BSL-2 Malaria Culture Laboratory, Centre for Chemical Biology, CSIR-IICT

---

## 1. Part A: Recombinant PfDHFR-TS Spectrophotometric Enzymatic Assay
1. **Principle:** Measures dihydrofolate reductase activity by monitoring the decrease in absorbance at 340 nm ($A_{340}$) corresponding to NADPH oxidation to $\text{NADP}^+$ (extinction coefficient $\Delta \varepsilon_{340} = 6.22\ \text{mM}^{-1}\text{cm}^{-1}$).
2. **Enzyme Preparations Tested in Parallel:**
   - Wild-Type recombinant PfDHFR-TS.
   - S108N single mutant (pyrimethamine-resistant).
   - N51I / C59R / S108N / I164L quadruple mutant (highly resistant clinical strain).
3. **Reaction Buffer:** 50 mM TES (pH 7.0), 75 mM $\beta$-mercaptoethanol, 1.0 mM EDTA, 10% glycerol, 0.1 mg/mL BSA.
4. **Substrates:** Dihydrofolic acid ($\text{H}_2\text{folate}$, 50 $\mu$M), NADPH (100 $\mu$M).
5. **Procedure:**
   - Dispense 180 $\mu$L buffer containing enzyme and test compound in 96-well UV-transparent microplates (Corning 3635).
   - Pre-incubate at 25 °C for 10 minutes to reach binding equilibrium.
   - Initiate reaction by adding 20 $\mu$L substrate cocktail.
   - Read $A_{340}$ continuously for 5 minutes (kinetic mode, 10-second intervals) on SpectraMax i3x.
   - Calculate initial velocities ($v_0$) and plot % inhibition vs log[compound] to compute $IC_{50}$ and $K_i$ via Cheng-Prusoff equation:
     $$K_i = \frac{IC_{50}}{1 + \frac{[S]}{K_m}}$$

---

## 2. Part B: In Vitro Plasmodium falciparum Growth Inhibition (SYBR Green I)
1. **Parasite Strains:**
   - 3D7 (Chloroquine-sensitive reference strain).
   - Dd2 (Chloroquine/Pyrimethamine resistant, Indochina).
   - W2 (Multidrug-resistant, Southeast Asia).
2. **Culture Conditions:** Human $O^+$ erythrocytes in RPMI-1640 supplemented with 25 mM HEPES, 0.5% Albumax II, 50 mg/L hypoxanthine at 2% hematocrit under hypoxic gas mixture ($5\%\ \text{O}_2$, $5\%\ \text{CO}_2$, $90\%\ \text{N}_2$) at 37 °C.
3. **Assay Execution:**
   - Synchronize cultures to ring stage using 5% D-sorbitol.
   - Adjust parasitemia to 0.5% rings at 2% final hematocrit.
   - Dispense into black, optical-bottom 96-well plates containing 10-point 3-fold serial dilutions of test compound (100 $\mu$L final volume; compound concentration range: 0.05 nM to 10,000 nM).
   - Controls: Untreated infected RBCs (100% growth) and 10 $\mu$M chloroquine (100% kill baseline).
   - Incubate plates for 72 hours at 37 °C.
   - Add 100 $\mu$L lysis buffer (20 mM Tris-HCl, pH 7.5, 5 mM EDTA, 0.008% saponin, 0.08% Triton X-100) containing $2\times$ SYBR Green I dye.
   - Incubate in the dark at 25 °C for 60 minutes.
   - Measure fluorescence at Ex 485 nm / Em 535 nm on Tecan Infinite M200 Pro.
   - Compute non-linear dose-response curves using 4-parameter logistic sigmoidal fitting in GraphPad Prism.
