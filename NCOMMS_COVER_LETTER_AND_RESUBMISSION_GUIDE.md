# Nature Communications Resubmission Guide & Cover Letter
## Manuscript ID: NCOMMS-26-098541-T v1.0
## Title: De novo mixture of experts overcomes targeted drug resistance

---

### Executive Summary: What This Editorial Notification Means

The email you received from <i>Nature Communications</i> is a standard <b>Editorial Technical Check</b>, not a rejection.

When submitting under <b>Double-Anonymous Peer Review</b>, the peer reviewers must evaluate the scientific merits of the manuscript without knowing the identities, institutions, or personal affiliations of the authors. However, the journal editors still require full legal, ethical, authorship, and funding records on file.

Therefore, Springer Nature requires a strict <b>two-sided separation</b>:
1. <b>Cover Letter (Editor-Facing Only):</b> Must contain all unblinded author details, full affiliations, corresponding author email, author contributions, competing interests, funding, ethics, acknowledgements, and data/code availability. Peer reviewers never see the cover letter.
2. <b>Manuscript & Supplementary Files (Reviewer-Facing):</b> Must have all author names, institutional names, faculty mentor mentions, personal GitHub/HuggingFace usernames, and self-identifying statements completely removed.

The files have been prepared and formatted for direct submission within your 2-day revision window.

---

### 1. Ready-to-Submit Files in Your Workspace

All necessary files are located in `paper_latex_nmi/`:
- [cover_letter_nature_double_blind.tex](file:///c:/Users/PREMCHANDYADAV/.gemini/antigravity/scratch/AETHERRAMI/paper_latex_nmi/cover_letter_nature_double_blind.tex): Complete LaTeX cover letter containing all 8 mandatory unblinded sections.
- [cover_letter.tex](file:///c:/Users/PREMCHANDYADAV/.gemini/antigravity/scratch/AETHERRAMI/paper_latex_nmi/cover_letter.tex): Updated default cover letter.
- [main_anonymized.tex](file:///c:/Users/PREMCHANDYADAV/.gemini/antigravity/scratch/AETHERRAMI/paper_latex_nmi/main_anonymized.tex): Main manuscript with author blocks, affiliations, self-citations, and repository links fully blinded.
- [supplementary_anonymized.tex](file:///c:/Users/PREMCHANDYADAV/.gemini/antigravity/scratch/AETHERRAMI/paper_latex_nmi/supplementary_anonymized.tex): Supplementary information with all affiliations and author names fully blinded.

---

### 2. Full Unblinded Cover Letter (Plain Text to Copy-Paste into Portal)

Copy the text below directly into the <b>Cover Letter</b> field or upload as a document in the submission system:

```text
To:
The Editorial Team
Nature Communications
Springer Nature, London, United Kingdom

Subject: Resubmission of Manuscript ID: NCOMMS-26-098541-T v1.0
Title: "De novo mixture of experts overcomes targeted drug resistance"

Dear Editors,

We thank the editorial office for completing the Technical Check of our manuscript. In strict accordance with the instructions for Double-Anonymous Peer Review, we provide all eight mandatory author and institutional details, ethical statements, and data disclosures below. All identifying author names, institutional attributions, mentor recognitions, personal repository usernames, and self-identifying statements have been removed from the revised main manuscript and supplementary information files.

1. FULL AUTHOR NAMES AND AFFILIATIONS

• V. C. Premchand Yadav (Lead Author, Student Researcher)
  Department of Computer Science and Engineering (Artificial Intelligence and Machine Learning),
  School of Computer Science and Engineering (SCOPE), VIT-AP University,
  Beside AP Secretariat, Near Vijayawada, Amaravati, Andhra Pradesh 522237, India.
  Email: premchand.23bce7167@vitapstudent.ac.in

• K. SriHarsha Vardhan (Co-Author)
  School of Computer Science and Engineering (SCOPE), VIT-AP University,
  Beside AP Secretariat, Near Vijayawada, Amaravati, Andhra Pradesh 522237, India.
  Email: sriharsha.23bce7168@vitapstudent.ac.in

• Edupulapati Sai Praneeth (Co-Author)
  School of Computer Science and Engineering (SCOPE), VIT-AP University,
  Beside AP Secretariat, Near Vijayawada, Amaravati, Andhra Pradesh 522237, India.
  Email: saipraneeth.23bce7169@vitapstudent.ac.in

• Yamala Liel Stephen (Co-Author)
  School of Computer Science and Engineering (SCOPE), VIT-AP University,
  Beside AP Secretariat, Near Vijayawada, Amaravati, Andhra Pradesh 522237, India.
  Email: lielstephen.23bce7170@vitapstudent.ac.in

• P. R. Kiran Kumar Reddy (Co-Author)
  School of Computer Science and Engineering (SCOPE), VIT-AP University,
  Beside AP Secretariat, Near Vijayawada, Amaravati, Andhra Pradesh 522237, India.
  Email: kirankumar.23bce7171@vitapstudent.ac.in

• Dr. Madala Guru Brahmam (Corresponding Author, Project Guide)
  Assistant Professor (Senior Grade 1),
  School of Computer Science and Engineering (SCOPE), VIT-AP University,
  Beside AP Secretariat, Near Vijayawada, Amaravati, Andhra Pradesh 522237, India.
  Email: gurubrahmam.m@vitap.ac.in

• Dr. S. Bharath Bhushan (Faculty Mentor & Co-Author)
  Associate Professor (Grade 1), Department of Networking and Security (DNS),
  School of Computer Science and Engineering (SCOPE), VIT-AP University,
  Beside AP Secretariat, Near Vijayawada, Amaravati, Andhra Pradesh 522237, India.
  Email: bharath.s@vitap.ac.in

• Dr. Pranjal Kumar (Faculty Mentor & Co-Author)
  Assistant Professor (Senior Grade 2), School of Bio Sciences and Technology (SBST),
  VIT-AP University,
  Beside AP Secretariat, Near Vijayawada, Amaravati, Andhra Pradesh 522237, India.
  Email: pranjal.k@vitap.ac.in


2. CORRESPONDING AUTHOR'S EMAIL ADDRESS

Dr. Madala Guru Brahmam
Email: gurubrahmam.m@vitap.ac.in
Institutional Address: School of Computer Science and Engineering (SCOPE), VIT-AP University, Amaravati, Andhra Pradesh 522237, India.


3. AUTHOR CONTRIBUTIONS STATEMENT

V.C.P.Y. conceived the core study, designed the continuous-time SE(3) Riemannian flow-matching formulation and the 8-expert sparse mixture-of-experts (MoE) architecture, developed the PyTorch training codebase, and authored the initial manuscript. K.S.V. implemented the PoseBusters physical chemistry audit suite, stereochemical constraint enforcers, and MMFF94s potential minimization. E.S.P. curated and benchmarked the molecular datasets (DUD-E, LIT-PCBA, BindingDTA, TDC ADMET) and managed data preprocessing. Y.L.S. formulated the reaction-SMARTS retrosynthesis pipeline (AETHER-SynthonSpace) and mapped candidate leads to commercial Enamine REAL synthon catalogs. P.R.K.K.R. contributed to empirical screening evaluations, hyperparameter optimization, and statistical validation. Dr. M.G.B. supervised the project, verified computational methodologies, reviewed mathematical proofs, and coordinated manuscript submission as corresponding author. Dr. S.B.B. provided technical mentorship on distributed neural computing and model scalability. Dr. P.K. provided biological mentorship on oncogenic resistance mutations (EGFR C797S, KRAS G12C/Y96D, BCR-ABL1 T315I), target engagement, and safety counter-screening. All authors read, reviewed, and approved the final manuscript.


4. COMPETING INTERESTS STATEMENT

The authors declare no competing financial or non-financial interests.


5. FUNDING STATEMENT

This research was conducted within the School of Computer Science and Engineering (SCOPE) and the School of Bio Sciences and Technology (SBST) at VIT-AP University, Amaravati, Andhra Pradesh, India. Computational GPU resources (NVIDIA Tesla T4 and workstation hardware) were supported by internal institutional computing facilities. The authors declare that no external commercial or direct grant funding influenced the design of the study, data collection, analysis, or decision to publish.


6. ETHICS STATEMENT

This computational study did not involve human participants, living human subjects, human tissue sampling, or experimental vertebrate animals. All crystallographic macromolecular assemblies, biological activity assays, and transcriptomic data were obtained from open-access, public scientific repositories (Protein Data Bank, ChEMBL, Therapeutics Data Commons, and NCBI GEO). No ethical review board approval was required.


7. ACKNOWLEDGEMENT

The authors gratefully acknowledge VIT-AP University, Amaravati, Andhra Pradesh, India, for providing academic infrastructure, high-performance computing facilities, and research mentorship through the School of Computer Science and Engineering (SCOPE) and the School of Bio Sciences and Technology (SBST). The authors also acknowledge open-source scientific software communities for RDKit, PyTorch, PyMOL, and Mol*.


8. DATA AVAILABILITY STATEMENT

All primary datasets supporting the findings of this study are publicly available from standard scientific repositories: Protein Data Bank (https://www.rcsb.org), ChEMBL 33 (https://www.ebi.ac.uk/chembl/), Therapeutics Data Commons (https://tdcommons.ai/), and DUD-E (http://dude.docking.org/). The curated benchmarking datasets, chemical structures, and trained model weights (117.81 MB SafeTensors) are openly deposited on the Hugging Face Hub at https://huggingface.co/Premchan369/aether-rami-esm2-diffsbdd under the Apache-2.0 License.


CODE AVAILABILITY STATEMENT

The complete, end-to-end Python and PyTorch codebase for AETHER-RAMI, including SE(3) flow-matching generators, calibrated ADMET engines, retrosynthetic planners, and reproduction scripts, is openly hosted on GitHub at https://github.com/Premchandyadav369/AETHERRAMI under the Apache-2.0 License.

Sincerely on behalf of all authors,

Dr. Madala Guru Brahmam (Corresponding Author)
Assistant Professor (Senior Grade 1), School of Computer Science and Engineering (SCOPE),
VIT-AP University, Amaravati, Andhra Pradesh 522237, India.
Email: gurubrahmam.m@vitap.ac.in
```

---

### 3. Step-by-Step Portal Resubmission Instructions

Follow these steps on the Springer Nature Manuscript Tracking System:

1. <b>Log in to the Portal:</b>
   Log into the Nature Communications manuscript tracking system using the submitting author account.

2. <b>Locate the Manuscript:</b>
   Under the <i>Author Tasks</i> or <i>Submissions</i> menu, look for <b>"Submissions Sent Back to Author"</b> or <b>"Manuscripts Placed Back in Menu of Submitting Author"</b>.
   Click on manuscript ID: `NCOMMS-26-098541-T v1.0`.

3. <b>Step 1 - Cover Letter:</b>
   - Navigate to the <b>Cover Letter</b> step.
   - Paste the complete text from Section 2 above into the Cover Letter text box, OR upload the compiled PDF / document of `paper_latex_nmi/cover_letter_nature_double_blind.tex`.
   - Note: The submission system specifically flags that this section is restricted to the editorial office and will <b>not</b> be seen by peer reviewers.

4. <b>Step 2 - Replace Manuscript Files:</b>
   - Remove the previous main manuscript file and replace it with `main_anonymized.tex` (or compile it to PDF using Overleaf or your preferred LaTeX editor and upload the resulting PDF).
   - Remove the previous supplementary file and replace it with `supplementary_anonymized.tex` (or compiled PDF).
   - Verify that all figures, if uploaded separately, contain no author names or institutional footers.

5. <b>Step 3 - Verify Metadata:</b>
   - Review the co-authors list in the submission portal system metadata.
   - Ensure all 8 authors are present with their exact email addresses and affiliations as listed in Section 2:
     1. V. C. Premchand Yadav (premchand.23bce7167@vitapstudent.ac.in)
     2. K. SriHarsha Vardhan (sriharsha.23bce7168@vitapstudent.ac.in)
     3. Edupulapati Sai Praneeth (saipraneeth.23bce7169@vitapstudent.ac.in)
     4. Yamala Liel Stephen (lielstephen.23bce7170@vitapstudent.ac.in)
     5. P. R. Kiran Kumar Reddy (kirankumar.23bce7171@vitapstudent.ac.in)
     6. Dr. Madala Guru Brahmam (gurubrahmam.m@vitap.ac.in) [Corresponding Author]
     7. Dr. S. Bharath Bhushan (bharath.s@vitap.ac.in)
     8. Dr. Pranjal Kumar (pranjal.k@vitap.ac.in)

6. <b>Step 4 - Build PDF & Approve Submission:</b>
   - Generate the submission proof.
   - Inspect the compiled proof to confirm that the manuscript displays `[Authors Blinded for Double-Anonymous Peer Review]`.
   - Approve the submission before the 2-day deadline.
