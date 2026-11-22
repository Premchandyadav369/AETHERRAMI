import os
import shutil
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

workspace_dir = r"c:\Users\PREMCHANDYADAV\.gemini\antigravity\scratch\AETHERRAMI"
nmi_dir = os.path.join(workspace_dir, "paper_latex_nmi")
artifacts_dir = r"C:\Users\PREMCHANDYADAV\.gemini\antigravity\brain\d53ad909-c2a8-4f5d-80be-4406743e446c"

# 1. Plain text cover letter
cover_txt = """To:
The Editorial Team
Nature Communications
Springer Nature, London, United Kingdom

Subject: Resubmission of Manuscript ID: NCOMMS-26-098541-T v1.0
Title: "De novo mixture of experts overcomes targeted drug resistance"

Dear Editors,

We thank the editorial office for completing the Technical Check of our manuscript. In strict accordance with the instructions for Double-Anonymous Peer Review, we provide all eight mandatory author and institutional details, ethical statements, and data disclosures below. All identifying author names, institutional affiliations, personal repository usernames, and self-identifying statements have been removed from the main manuscript and supplementary files.

======================================================================
1. FULL AUTHOR NAMES AND AFFILIATIONS
======================================================================

1. V. C. Premchand Yadav (Lead Author, Student Researcher)
   School of Computer Science and Engineering (SCOPE),
   VIT-AP University, Beside AP Secretariat, Near Vijayawada,
   Amaravati, Andhra Pradesh 522237, India.
   Email: premchand.23bce7167@vitapstudent.ac.in

2. Dr. Madala Guru Brahmam (Corresponding Author, Project Guide)
   Assistant Professor (Senior Grade 1),
   School of Computer Science and Engineering (SCOPE),
   VIT-AP University, Beside AP Secretariat, Near Vijayawada,
   Amaravati, Andhra Pradesh 522237, India.
   Email: gurubrahmam.m@vitap.ac.in

3. Dr. S. Bharath Bhushan (Faculty Mentor & Co-Author)
   Associate Professor (Grade 1), Department of Networking and Security,
   School of Computer Science and Engineering (SCOPE),
   VIT-AP University, Beside AP Secretariat, Near Vijayawada,
   Amaravati, Andhra Pradesh 522237, India.
   Email: bharathbhushan.s@vitap.ac.in

4. Dr. Pranjal Kumar (Faculty Mentor & Co-Author)
   Assistant Professor (Senior Grade 2),
   School of Bio Sciences and Technology (SBST),
   VIT-AP University, Beside AP Secretariat, Near Vijayawada,
   Amaravati, Andhra Pradesh 522237, India.
   Email: pranjal.k@vitap.ac.in

5. K. SriHarsha Vardhan (Co-Author)
   School of Computer Science and Engineering (SCOPE),
   VIT-AP University, Beside AP Secretariat, Near Vijayawada,
   Amaravati, Andhra Pradesh 522237, India.
   Email: harsha.23bce8747@vitapstudent.ac.in

6. Edupulapati Sai Praneeth (Co-Author)
   School of Computer Science and Engineering (SCOPE),
   VIT-AP University, Beside AP Secretariat, Near Vijayawada,
   Amaravati, Andhra Pradesh 522237, India.
   Email: praneeth.23bce8762@vitapstudent.ac.in

7. Yamala Liel Stephen (Co-Author)
   School of Computer Science and Engineering (SCOPE),
   VIT-AP University, Beside AP Secretariat, Near Vijayawada,
   Amaravati, Andhra Pradesh 522237, India.
   Email: stephen.23bce20073@vitapstudent.ac.in

8. P. R. Kiran Kumar Reddy (Co-Author)
   School of Computer Science and Engineering (SCOPE),
   VIT-AP University, Beside AP Secretariat, Near Vijayawada,
   Amaravati, Andhra Pradesh 522237, India.
   Email: kiran.23mic7224@vitapstudent.ac.in

======================================================================
2. CORRESPONDING AUTHOR EMAIL ADDRESS
======================================================================
Dr. Madala Guru Brahmam
Email: gurubrahmam.m@vitap.ac.in
Institutional Address: School of Computer Science and Engineering (SCOPE),
VIT-AP University, Amaravati, Andhra Pradesh 522237, India.

======================================================================
3. AUTHOR CONTRIBUTIONS STATEMENT
======================================================================
V.C.P.Y. conceived the study, formulated the continuous-time SE(3) Riemannian flow-matching framework, designed the 8-expert sparse mixture-of-experts (MoE) architecture, developed the model training pipeline, and wrote the initial manuscript. M.G.B. supervised the research, verified computational methodologies, reviewed mathematical proofs, and coordinated manuscript submission as corresponding author. S.B.B. provided mentorship on distributed neural network training and high-performance computing infrastructure. P.K. provided biological mentorship on oncogenic resistance mutations (EGFR C797S, KRAS G12C/Y96D, BCR-ABL1 T315I), target engagement, and safety counter-screening. K.S.V. implemented the PoseBusters physical chemistry audit suite, stereochemical verification, and MMFF94s energy minimization. E.S.P. curated and benchmarked datasets across DUD-E, LIT-PCBA, BindingDTA, and TDC ADMET. Y.L.S. formulated the reaction-SMARTS retrosynthesis pipeline (AETHER-SynthonSpace) and mapped leads to commercial building-block catalogs. P.R.K.K.R. conducted virtual screening benchmarks, hyperparameter optimization, and statistical validation. All authors reviewed and approved the final manuscript.

======================================================================
4. COMPETING INTERESTS STATEMENT
======================================================================
The authors declare no competing financial or non-financial interests.

======================================================================
5. FUNDING STATEMENT
======================================================================
This research was conducted within the School of Computer Science and Engineering (SCOPE) and the School of Bio Sciences and Technology (SBST) at VIT-AP University, Amaravati, Andhra Pradesh, India. Computational GPU resources were provided by internal institutional computing facilities. The authors declare that no external commercial or direct grant funding influenced the study design, data collection, analysis, or decision to publish.

======================================================================
6. ETHICS STATEMENT
======================================================================
This computational study did not involve human participants, living human subjects, human tissue sampling, or experimental vertebrate animals. All crystallographic structures, bioactivity assays, and transcriptomic profiles were obtained from public scientific repositories (Protein Data Bank, ChEMBL, Therapeutics Data Commons, and NCBI GEO). No ethical review board approval was required.

======================================================================
7. ACKNOWLEDGEMENT
======================================================================
The authors express their gratitude to VIT-AP University, Amaravati, Andhra Pradesh, India, for providing academic infrastructure, high-performance computing facilities, and research mentorship through the School of Computer Science and Engineering (SCOPE) and the School of Bio Sciences and Technology (SBST). The authors also acknowledge the open-source scientific software communities for RDKit, PyTorch, PyMOL, and Mol*.

======================================================================
8. DATA AVAILABILITY STATEMENT
======================================================================
All primary datasets supporting the findings of this study are available from public scientific repositories: Protein Data Bank (https://www.rcsb.org), ChEMBL 33 (https://www.ebi.ac.uk/chembl/), Therapeutics Data Commons (https://tdcommons.ai/), and DUD-E (http://dude.docking.org/). Curated benchmarking splits, coordinates, and trained model weights (117.81 MB SafeTensors) are deposited on the Hugging Face Hub at https://huggingface.co/Premchan369/aether-rami-esm2-diffsbdd under the Apache-2.0 License.

======================================================================
CODE AVAILABILITY STATEMENT
======================================================================
The complete Python and PyTorch codebase for AETHER-RAMI, including SE(3) flow-matching generators, calibrated ADMET scoring modules, retrosynthetic planners, and reproduction scripts, is openly hosted on GitHub at https://github.com/Premchandyadav369/AETHERRAMI under the Apache-2.0 License.

Sincerely on behalf of all authors,

Dr. Madala Guru Brahmam (Corresponding Author)
Assistant Professor (Senior Grade 1), School of Computer Science and Engineering (SCOPE),
VIT-AP University, Amaravati, Andhra Pradesh 522237, India.
Email: gurubrahmam.m@vitap.ac.in
"""

txt_path = os.path.join(workspace_dir, "Nature_Communications_Cover_Letter.txt")
with open(txt_path, "w", encoding="utf-8") as f:
    f.write(cover_txt)
print("[+] Wrote plain text cover letter to:", txt_path)

# 2. LaTeX cover letter
tex_content = r"""\documentclass[11pt]{letter}
\usepackage[margin=1in]{geometry}
\usepackage{hyperref}
\usepackage{setspace}
\onehalfspacing

\begin{document}

\begin{letter}{%
    The Editorial Team,\\
    \textit{Nature Communications},\\
    Springer Nature,\\
    London, United Kingdom
}

\opening{Dear Editors,}

\textbf{Re: Resubmission of Manuscript ID: NCOMMS-26-098541-T v1.0}\\
\textbf{Title: "De novo mixture of experts overcomes targeted drug resistance"}

We thank the editorial office for completing the Technical Check of our manuscript. In strict accordance with the instructions for \textbf{Double-Anonymous Peer Review}, we provide all eight mandatory author and institutional details, ethical statements, and data disclosures below. All identifying author names, institutional affiliations, personal repository usernames, and self-identifying statements have been removed from the main manuscript and supplementary files.

\vspace{0.5em}
\hrule
\vspace{0.8em}

\section*{1. Full Author Names and Affiliations}
\begin{enumerate}\setlength{\itemsep}{0.5em}
    \item \textbf{V.~C.~Premchand~Yadav} (Lead Author, Student Researcher)\\
    School of Computer Science and Engineering (SCOPE), VIT-AP University,\\
    Beside AP Secretariat, Near Vijayawada, Amaravati, Andhra Pradesh 522237, India.\\
    Email: \texttt{premchand.23bce7167@vitapstudent.ac.in}

    \item \textbf{Dr.~Madala~Guru~Brahmam} (\textbf{Corresponding Author}, Project Guide)\\
    Assistant Professor (Senior Grade--1), School of Computer Science and Engineering (SCOPE),\\
    VIT-AP University, Beside AP Secretariat, Near Vijayawada, Amaravati, Andhra Pradesh 522237, India.\\
    Email: \texttt{gurubrahmam.m@vitap.ac.in}

    \item \textbf{Dr.~S.~Bharath~Bhushan} (Faculty Mentor \& Co-Author)\\
    Associate Professor (Grade-1), Department of Networking and Security,\\
    School of Computer Science and Engineering (SCOPE), VIT-AP University,\\
    Beside AP Secretariat, Near Vijayawada, Amaravati, Andhra Pradesh 522237, India.\\
    Email: \texttt{bharathbhushan.s@vitap.ac.in}

    \item \textbf{Dr.~Pranjal~Kumar} (Faculty Mentor \& Co-Author)\\
    Assistant Professor (Senior Grade 2), School of Bio Sciences and Technology (SBST),\\
    VIT-AP University, Beside AP Secretariat, Near Vijayawada, Amaravati, Andhra Pradesh 522237, India.\\
    Email: \texttt{pranjal.k@vitap.ac.in}

    \item \textbf{K.~SriHarsha~Vardhan} (Co-Author)\\
    School of Computer Science and Engineering (SCOPE), VIT-AP University,\\
    Beside AP Secretariat, Near Vijayawada, Amaravati, Andhra Pradesh 522237, India.\\
    Email: \texttt{harsha.23bce8747@vitapstudent.ac.in}

    \item \textbf{Edupulapati~Sai~Praneeth} (Co-Author)\\
    School of Computer Science and Engineering (SCOPE), VIT-AP University,\\
    Beside AP Secretariat, Near Vijayawada, Amaravati, Andhra Pradesh 522237, India.\\
    Email: \texttt{praneeth.23bce8762@vitapstudent.ac.in}

    \item \textbf{Yamala~Liel~Stephen} (Co-Author)\\
    School of Computer Science and Engineering (SCOPE), VIT-AP University,\\
    Beside AP Secretariat, Near Vijayawada, Amaravati, Andhra Pradesh 522237, India.\\
    Email: \texttt{stephen.23bce20073@vitapstudent.ac.in}

    \item \textbf{P.~R.~Kiran~Kumar~Reddy} (Co-Author)\\
    School of Computer Science and Engineering (SCOPE), VIT-AP University,\\
    Beside AP Secretariat, Near Vijayawada, Amaravati, Andhra Pradesh 522237, India.\\
    Email: \texttt{kiran.23mic7224@vitapstudent.ac.in}
\end{enumerate}

\section*{2. Corresponding Author's Email Address}
\textbf{Dr.~Madala~Guru~Brahmam}\\
Assistant Professor (Senior Grade--1), School of Computer Science and Engineering (SCOPE),\\
VIT-AP University, Amaravati, Andhra Pradesh 522237, India.\\
Email: \texttt{gurubrahmam.m@vitap.ac.in}

\section*{3. Author Contributions Statement}
V.C.P.Y. conceived the study, formulated the continuous-time $\mathrm{SE}(3)$ Riemannian flow-matching framework, designed the 8-expert sparse mixture-of-experts (MoE) architecture, developed the model training pipeline, and wrote the initial manuscript. M.G.B. supervised the research, verified computational methodologies, reviewed mathematical proofs, and coordinated manuscript submission as corresponding author. S.B.B. provided mentorship on distributed neural network training and high-performance computing infrastructure. P.K. provided biological mentorship on oncogenic resistance mutations (EGFR C797S, KRAS G12C/Y96D, BCR-ABL1 T315I), target engagement, and safety counter-screening. K.S.V. implemented the PoseBusters physical chemistry audit suite, stereochemical verification, and MMFF94s energy minimization. E.S.P. curated and benchmarked datasets across DUD-E, LIT-PCBA, BindingDTA, and TDC ADMET. Y.L.S. formulated the reaction-SMARTS retrosynthesis pipeline (AETHER-SynthonSpace) and mapped leads to commercial building-block catalogs. P.R.K.K.R. conducted virtual screening benchmarks, hyperparameter optimization, and statistical validation. All authors reviewed and approved the final manuscript.

\section*{4. Competing Interests Statement}
The authors declare no competing financial or non-financial interests.

\section*{5. Funding Statement}
This research was conducted within the School of Computer Science and Engineering (SCOPE) and the School of Bio Sciences and Technology (SBST) at VIT-AP University, Amaravati, Andhra Pradesh, India. Computational GPU resources were provided by internal institutional computing facilities. The authors declare that no external commercial or direct grant funding influenced the study design, data collection, analysis, or decision to publish.

\section*{6. Ethics Statement}
This computational study did not involve human participants, living human subjects, human tissue sampling, or experimental vertebrate animals. All crystallographic structures, bioactivity assays, and transcriptomic profiles were obtained from public scientific repositories (Protein Data Bank, ChEMBL, Therapeutics Data Commons, and NCBI GEO). No ethical review board approval was required.

\section*{7. Acknowledgement}
The authors express their gratitude to VIT-AP University, Amaravati, Andhra Pradesh, India, for providing academic infrastructure, high-performance computing facilities, and research mentorship through the School of Computer Science and Engineering (SCOPE) and the School of Bio Sciences and Technology (SBST). The authors also acknowledge the open-source scientific software communities for RDKit, PyTorch, PyMOL, and Mol*.

\section*{8. Data Availability Statement}
All primary datasets supporting the findings of this study are available from public scientific repositories: Protein Data Bank (\url{https://www.rcsb.org}), ChEMBL 33 (\url{https://www.ebi.ac.uk/chembl/}), Therapeutics Data Commons (\url{https://tdcommons.ai/}), and DUD-E (\url{http://dude.docking.org/}). Curated benchmarking splits, coordinates, and trained model weights (117.81\,MB SafeTensors) are deposited on the Hugging Face Hub at \url{https://huggingface.co/Premchan369/aether-rami-esm2-diffsbdd} under the Apache-2.0 License.

\section*{Code Availability Statement}
The complete Python and PyTorch codebase for AETHER-RAMI, including $\mathrm{SE}(3)$ flow-matching generators, calibrated ADMET scoring modules, retrosynthetic planners, and reproduction scripts, is openly hosted on GitHub at \url{https://github.com/Premchandyadav369/AETHERRAMI} under the Apache-2.0 License.

\vspace{1.5em}
\closing{Sincerely on behalf of all authors,}

\noindent
\textbf{Dr.~Madala~Guru~Brahmam} (Corresponding Author)\\
Assistant Professor (Senior Grade--1), School of Computer Science and Engineering (SCOPE),\\
VIT-AP University, Amaravati, Andhra Pradesh 522237, India.\\
Email: \texttt{gurubrahmam.m@vitap.ac.in}

\end{letter}
\end{document}
"""

tex_path_root = os.path.join(workspace_dir, "Nature_Communications_Cover_Letter.tex")
tex_path_nmi = os.path.join(nmi_dir, "Nature_Communications_Cover_Letter.tex")
with open(tex_path_root, "w", encoding="utf-8") as f:
    f.write(tex_content)
with open(tex_path_nmi, "w", encoding="utf-8") as f:
    f.write(tex_content)
print("[+] Wrote LaTeX cover letter to:", tex_path_root, "and", tex_path_nmi)

# 3. ReportLab PDF Generation
pdf_path_root = os.path.join(workspace_dir, "Nature_Communications_Cover_Letter.pdf")
pdf_path_art = os.path.join(artifacts_dir, "Nature_Communications_Cover_Letter.pdf")

doc = SimpleDocTemplate(
    pdf_path_root,
    pagesize=letter,
    leftMargin=44,
    rightMargin=44,
    topMargin=44,
    bottomMargin=44
)

styles = getSampleStyleSheet()

header_style = ParagraphStyle(
    "CoverHeader",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=13,
    leading=16,
    textColor=colors.HexColor("#0f2d59")
)

meta_style = ParagraphStyle(
    "CoverMeta",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=9,
    leading=13,
    textColor=colors.HexColor("#222222")
)

h1_style = ParagraphStyle(
    "CoverH1",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=10,
    leading=13.5,
    textColor=colors.HexColor("#0f2d59"),
    spaceBefore=7,
    spaceAfter=2
)

body_style = ParagraphStyle(
    "CoverBody",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.5,
    leading=12,
    textColor=colors.HexColor("#2b2b2b"),
    alignment=4
)

author_style = ParagraphStyle(
    "CoverAuthor",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.5,
    leading=11.5,
    textColor=colors.HexColor("#1a1a1a")
)

story = []

story.append(Paragraph("NATURE COMMUNICATIONS &mdash; EDITORIAL COVER LETTER", header_style))
story.append(Spacer(1, 3))
story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#0f2d59"), spaceAfter=6))

story.append(Paragraph("<b>To:</b> The Editorial Team, <i>Nature Communications</i>, Springer Nature, London, UK<br/>"
                       "<b>Date:</b> November 22, 2026<br/>"
                       "<b>Manuscript ID:</b> NCOMMS-26-098541-T v1.0<br/>"
                       "<b>Title:</b> De novo mixture of experts overcomes targeted drug resistance", meta_style))
story.append(Spacer(1, 4))

intro_p = ("Dear Editors,<br/><br/>"
           "We thank the editorial office for completing the Technical Check of our manuscript. "
           "In strict accordance with the guidelines for <b>Double-Anonymous Peer Review</b>, "
           "we provide all eight mandatory author and institutional details, ethical statements, "
           "and data disclosures herein. All identifying author names, institutional affiliations, "
           "personal repository usernames, and self-identifying citations have been removed from the "
           "main manuscript and supplementary files.")
story.append(Paragraph(intro_p, body_style))
story.append(Spacer(1, 4))

story.append(Paragraph("1. FULL AUTHOR NAMES AND AFFILIATIONS", h1_style))
authors = [
    ("1. V. C. Premchand Yadav (Lead Author, Student Researcher)",
     "School of Computer Science and Engineering (SCOPE), VIT-AP University, Amaravati, Andhra Pradesh 522237, India.<br/>Email: premchand.23bce7167@vitapstudent.ac.in"),
    ("2. Dr. Madala Guru Brahmam (Corresponding Author, Project Guide)",
     "Assistant Professor (Senior Grade 1), School of Computer Science and Engineering (SCOPE), VIT-AP University, Amaravati, Andhra Pradesh 522237, India.<br/>Email: gurubrahmam.m@vitap.ac.in"),
    ("3. Dr. S. Bharath Bhushan (Faculty Mentor &amp; Co-Author)",
     "Associate Professor (Grade 1), Department of Networking and Security, SCOPE, VIT-AP University, Amaravati, Andhra Pradesh 522237, India.<br/>Email: bharathbhushan.s@vitap.ac.in"),
    ("4. Dr. Pranjal Kumar (Faculty Mentor &amp; Co-Author)",
     "Assistant Professor (Senior Grade 2), School of Bio Sciences and Technology (SBST), VIT-AP University, Amaravati, Andhra Pradesh 522237, India.<br/>Email: pranjal.k@vitap.ac.in"),
    ("5. K. SriHarsha Vardhan (Co-Author)",
     "School of Computer Science and Engineering (SCOPE), VIT-AP University, Amaravati, Andhra Pradesh 522237, India.<br/>Email: harsha.23bce8747@vitapstudent.ac.in"),
    ("6. Edupulapati Sai Praneeth (Co-Author)",
     "School of Computer Science and Engineering (SCOPE), VIT-AP University, Amaravati, Andhra Pradesh 522237, India.<br/>Email: praneeth.23bce8762@vitapstudent.ac.in"),
    ("7. Yamala Liel Stephen (Co-Author)",
     "School of Computer Science and Engineering (SCOPE), VIT-AP University, Amaravati, Andhra Pradesh 522237, India.<br/>Email: stephen.23bce20073@vitapstudent.ac.in"),
    ("8. P. R. Kiran Kumar Reddy (Co-Author)",
     "School of Computer Science and Engineering (SCOPE), VIT-AP University, Amaravati, Andhra Pradesh 522237, India.<br/>Email: kiran.23mic7224@vitapstudent.ac.in")
]

for name, affil in authors:
    story.append(Paragraph(f"<b>{name}</b><br/>{affil}", author_style))
    story.append(Spacer(1, 2.5))

story.append(Paragraph("2. CORRESPONDING AUTHOR DETAILS", h1_style))
story.append(Paragraph("<b>Dr. Madala Guru Brahmam</b><br/>"
                       "Email: <b>gurubrahmam.m@vitap.ac.in</b><br/>"
                       "School of Computer Science and Engineering (SCOPE), VIT-AP University, Beside AP Secretariat, Near Vijayawada, Amaravati, Andhra Pradesh 522237, India.", body_style))

story.append(Paragraph("3. AUTHOR CONTRIBUTIONS STATEMENT", h1_style))
story.append(Paragraph("V.C.P.Y. conceived the study, formulated the continuous-time SE(3) Riemannian flow-matching framework, designed the 8-expert sparse mixture-of-experts (MoE) architecture, developed the model training pipeline, and wrote the initial manuscript. M.G.B. supervised the research, verified computational methodologies, reviewed mathematical proofs, and coordinated manuscript submission as corresponding author. S.B.B. provided mentorship on distributed neural network training and high-performance computing infrastructure. P.K. provided biological mentorship on oncogenic resistance mutations (EGFR C797S, KRAS G12C/Y96D, BCR-ABL1 T315I), target engagement, and safety counter-screening. K.S.V. implemented the PoseBusters physical chemistry audit suite, stereochemical verification, and MMFF94s energy minimization. E.S.P. curated and benchmarked datasets across DUD-E, LIT-PCBA, BindingDTA, and TDC ADMET. Y.L.S. formulated the reaction-SMARTS retrosynthesis pipeline (AETHER-SynthonSpace) and mapped leads to commercial building-block catalogs. P.R.K.K.R. conducted virtual screening benchmarks, hyperparameter optimization, and statistical validation. All authors reviewed and approved the final manuscript.", body_style))

story.append(Paragraph("4. COMPETING INTERESTS STATEMENT", h1_style))
story.append(Paragraph("The authors declare no competing financial or non-financial interests.", body_style))

story.append(Paragraph("5. FUNDING STATEMENT", h1_style))
story.append(Paragraph("This research was conducted within the School of Computer Science and Engineering (SCOPE) and the School of Bio Sciences and Technology (SBST) at VIT-AP University, Amaravati, Andhra Pradesh, India. Computational GPU resources were provided by internal institutional computing facilities. The authors declare that no external commercial or direct grant funding influenced the study design, data collection, analysis, or decision to publish.", body_style))

story.append(Paragraph("6. ETHICS STATEMENT", h1_style))
story.append(Paragraph("This computational study did not involve human participants, living human subjects, human tissue sampling, or experimental vertebrate animals. All crystallographic structures, bioactivity assays, and transcriptomic profiles were obtained from public scientific repositories (Protein Data Bank, ChEMBL, Therapeutics Data Commons, and NCBI GEO). No ethical review board approval was required.", body_style))

story.append(Paragraph("7. ACKNOWLEDGEMENT", h1_style))
story.append(Paragraph("The authors express their gratitude to VIT-AP University, Amaravati, Andhra Pradesh, India, for providing academic infrastructure, high-performance computing facilities, and research mentorship through the School of Computer Science and Engineering (SCOPE) and the School of Bio Sciences and Technology (SBST). The authors also acknowledge the open-source scientific software communities for RDKit, PyTorch, PyMOL, and Mol*.", body_style))

story.append(Paragraph("8. DATA AND CODE AVAILABILITY STATEMENTS", h1_style))
story.append(Paragraph("<b>Data Availability:</b> All primary datasets supporting the findings of this study are available from public scientific repositories: Protein Data Bank (https://www.rcsb.org), ChEMBL 33 (https://www.ebi.ac.uk/chembl/), Therapeutics Data Commons (https://tdcommons.ai/), and DUD-E (http://dude.docking.org/). Curated benchmarking splits, coordinates, and trained model weights (117.81 MB SafeTensors) are deposited on the Hugging Face Hub at https://huggingface.co/Premchan369/aether-rami-esm2-diffsbdd under the Apache-2.0 License.<br/><br/>"
                       "<b>Code Availability:</b> The complete Python and PyTorch codebase for AETHER-RAMI, including SE(3) flow-matching generators, calibrated ADMET scoring modules, retrosynthetic planners, and reproduction scripts, is openly hosted on GitHub at https://github.com/Premchandyadav369/AETHERRAMI under the Apache-2.0 License.", body_style))

story.append(Spacer(1, 8))
story.append(Paragraph("Sincerely on behalf of all authors,<br/><br/>"
                       "<b>Dr. Madala Guru Brahmam</b> (Corresponding Author)<br/>"
                       "Assistant Professor (Senior Grade 1), School of Computer Science and Engineering (SCOPE),<br/>"
                       "VIT-AP University, Amaravati, Andhra Pradesh 522237, India.<br/>"
                       "Email: <b>gurubrahmam.m@vitap.ac.in</b>", meta_style))

doc.build(story)
print("[+] Built PDF at:", pdf_path_root)

shutil.copyfile(pdf_path_root, pdf_path_art)
print("[+] Copied PDF to artifacts directory:", pdf_path_art)
