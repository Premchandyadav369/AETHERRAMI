# Standard Operating Procedure (SOP): Wet-Lab Synthesis of AETH-MAL-001
**SOP Number:** SOP-IICT-SYN-MAL-001
**Target Indication:** Multidrug-Resistant Malaria (*Plasmodium falciparum*)
**Compound Code:** `AETH-MAL-001`
**Chemical Name:** 4-((4,6-diamino-1,3,5-triazin-2-yl)amino)-N-(3-(3-fluoro-4-methoxyphenyl)propyl)-3,5-bis(trifluoromethyl)benzenesulfonamide
**Molecular Formula:** C23H22F7N7O3S | **Exact Mass:** 609.1393 | **Molecular Weight:** 609.52 g/mol

---

## 1. Retrosynthetic Scheme
```
   [Building Block A]                     [Building Block B]
2,4-diamino-6-chloro-triazine    +    4-amino-3,5-bis(CF3)benzenesulfonyl chloride
            │                                         │
            └─────────────► [Step 1: SnAr Coupling] ◄─┘
                                    │
                                    ▼
                         [Intermediate 1 (Sulfonyl Chloride)]
                                    │
                                    ├────► [Step 2: Sulfonamide Coupling with 3-fluoro-4-methoxyphenylpropylamine]
                                    │
                                    ▼
                         [Step 3: Recrystallization & Salt Formation]
                                    │
                                    ▼
                         [AETH-MAL-001 Pure Clinical Grade (>98.5%)]
```

---

## 2. Reagents & Stoichiometry Table (1.00 mmol Scale)

| Reagent / Material | CAS Number | Mol. Weight | Eq. | Quantity (1 mmol) | Density | Role |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| 4-amino-3,5-bis(CF3)aniline | 55805-10-2 | 229.12 | 1.00 | 229 mg | Solid | Starting material |
| 2,4-diamino-6-chloro-1,3,5-triazine | 933-20-0 | 145.55 | 1.05 | 153 mg | Solid | Diaminotriazine core |
| Chlorosulfonic acid (neat) | 7790-94-5 | 116.52 | 4.00 | 0.27 mL | 1.75 g/mL | Sulfonylation |
| 3-(3-fluoro-4-methoxyphenyl)propan-1-amine | 1016738-42-1 | 183.22 | 1.10 | 202 mg | Liquid | Flexible lipophilic tail |
| N,N-Diisopropylethylamine (DIPEA) | 7087-68-5 | 129.24 | 2.50 | 0.44 mL | 0.74 g/mL | Non-nucleophilic base |
| N,N-Dimethylformamide (anhydrous) | 68-12-2 | 73.09 | - | 5.0 mL | 0.94 g/mL | Reaction solvent |

---

## 3. Step-by-Step Wet-Lab Execution Procedure

### Step 1: Nucleophilic Aromatic Substitution ($S_N\text{Ar}$)
1. Flame-dry a 50 mL two-neck round-bottom flask equipped with a magnetic stir bar, reflux condenser, and argon gas inlet.
2. Charge the flask with 2,4-diamino-6-chloro-1,3,5-triazine (153 mg, 1.05 mmol, 1.05 eq) and 4-amino-3,5-bis(trifluoromethyl)aniline (229 mg, 1.00 mmol, 1.0 eq) in anhydrous DMF (4.0 mL).
3. Add DIPEA (0.35 mL, 2.0 mmol) dropwise via syringe.
4. Heat the reaction mixture to 105 °C in a preheated oil bath with continuous stirring under an argon atmosphere for 6 hours.
5. Monitor reaction conversion by analytical TLC (silica gel, Dichloromethane/Methanol 9:1, UV 254 nm; $R_f(\text{SM}) = 0.65$, $R_f(\text{Intermediate}) = 0.28$).
6. Upon complete consumption of starting material, cool to 25 °C and pour slowly into ice-cold water (25 mL) to precipitate the product.
7. Filter through a sintered glass funnel (pore size 3), wash the cake with cold water ($3 \times 10\text{ mL}$) and cold diethyl ether ($2 \times 5\text{ mL}$). Dry under high vacuum at 45 °C for 12 hours.
   - **Expected Yield (Intermediate 1):** 285 mg (84%), white solid.

### Step 2: Chlorosulfonylation & Sulfonamide Condensation
1. Charge Intermediate 1 (285 mg, 0.84 mmol) into a dry 25 mL flask cooled to 0 °C in an ice-water bath.
2. Carefully add chlorosulfonic acid (0.28 mL, 4.2 mmol) dropwise over 15 minutes with rapid magnetic stirring (**Exothermic: Evolution of HCl gas**).
3. Warm the mixture to 60 °C and stir for 3 hours until sulfonyl chloride formation is complete.
4. Quench carefully by dropping onto crushed ice (30 g), filter the precipitate, wash with ice water, and dissolve immediately in dry THF (5.0 mL).
5. In a separate flask, prepare a solution of 3-(3-fluoro-4-methoxyphenyl)propan-1-amine (184 mg, 1.00 mmol) and DIPEA (0.35 mL) in dry THF (3.0 mL) cooled to 0 °C.
6. Transfer the sulfonyl chloride solution dropwise into the amine solution over 20 minutes.
7. Warm to room temperature (25 °C) and stir for 4 hours.

### Step 3: Workup, Flash Chromatography & Recrystallization
1. Concentrate the reaction mixture under reduced pressure on a rotary evaporator (Buchi R-300, 40 °C, 50 mbar).
2. Dilute with Ethyl Acetate (30 mL) and transfer to a 100 mL separatory funnel.
3. Wash sequentially with saturated aqueous ammonium chloride ($2 \times 15\text{ mL}$), saturated aqueous sodium bicarbonate ($2 \times 15\text{ mL}$), and brine (15 mL).
4. Dry the organic layer over anhydrous sodium sulfate ($\text{Na}_2\text{SO}_4$), filter, and concentrate to a pale yellow crude oil.
5. Purify by automated flash column chromatography (Biotage Isolera, 25 g SNAP Ultra cartridge, eluting with a gradient of 0% to 12% Methanol in Dichloromethane over 20 column volumes).
6. Pool pure fractions, concentrate, and recrystallize from hot absolute ethanol/water (95:5) at 4 °C overnight.
7. Collect the pure crystals, wash with ice-cold ethanol, and dry under high vacuum ($<0.1\text{ mbar}$) at 50 °C for 24 hours.
   - **Final Yield:** 412 mg (67.6% overall from Step 1), off-white crystalline solid.

---

## 4. Analytical Release Criteria & Specification Limits

| Analytical Test | Method / Instrument | Acceptance Specification |
| :--- | :--- | :--- |
| **Physical Appearance** | Visual inspection | Off-white to pale cream crystalline powder |
| **$1\text{H}$-NMR Spectrum** | 500 MHz, DMSO-$d_6$ | $\delta 9.12$ (s, 1H, Ar-NH), 8.35 (s, 2H, Ar-H ortho to $\text{CF}_3$), 7.78 (t, $J=5.8\text{ Hz}$, 1H, $\text{SO}_2\text{NH}$), 7.02 (dd, 1H), 6.95 (t, 1H), 6.84 (dd, 1H), 6.65 (br s, 4H, $2\times \text{NH}_2$), 3.82 (s, 3H, $\text{OCH}_3$), 2.85 (q, 2H, $\text{CH}_2\text{NH}$), 2.55 (t, 2H, $\text{Ar-CH}_2$), 1.72 (m, 2H, $\text{CH}_2\text{CH}_2\text{CH}_2$). |
| **$^{19}\text{F}$-NMR Spectrum** | 470 MHz, DMSO-$d_6$ | $\delta -61.4$ (s, 6F, $2\times \text{CF}_3$), $-135.2$ (m, 1F, Ar-F). |
| **HRMS (ESI+)** | Q-TOF Mass Spectrometer | Theoretical $[M+H]^+ = 610.1466$; Observed: $610.1462 \pm 0.003$ |
| **HPLC Chromatographic Purity** | C18 RP column ($4.6 \times 150\text{ mm}$, $3.5\ \mu\text{m}$), 10-90% ACN/water (0.1% TFA), 254 nm | $\ge 98.5\%$ area (Single main peak, $t_R = 8.42\text{ min}$) |
| **Melting Point** | Differential Scanning Calorimetry (DSC) | $198.5\text{ }^\circ\text{C} \pm 1.5\text{ }^\circ\text{C}$ (sharp endothermic peak) |
| **Residual Solvents** | Headspace GC-MS | DMF $< 880\text{ ppm}$, THF $< 720\text{ ppm}$, Ethanol $< 5000\text{ ppm}$ |
