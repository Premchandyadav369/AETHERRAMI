import os
import re

base_dir = os.path.dirname(os.path.abspath(__file__))
nmi_dir = os.path.join(base_dir, "paper_latex_nmi")

# -------------------------------------------------------------
# 1. GENERATE COVER LETTER
# -------------------------------------------------------------
cover_letter_latex = r"""\documentclass[11pt]{letter}

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

We thank the editorial team for the Technical Check review of our manuscript. In strict accordance with the instructions for \textbf{Double-Anonymous Peer Review}, we provide all eight mandatory author and institutional details, ethical statements, and data disclosures herein. All identifying information, institutional attributions, personal repository usernames, and self-identifying statements have been removed from the main manuscript and supplementary information files.

\vspace{0.5em}
\hrule
\vspace{0.5em}

\section*{1. Full Author Names and Affiliations}
\begin{itemize}\setlength{\itemsep}{0.6em}
    \item \textbf{V.~C.~Premchand~Yadav} (Lead Author, Student Researcher)\\
    Department of Computer Science and Engineering (Artificial Intelligence and Machine Learning),\\
    School of Computer Science and Engineering (SCOPE), VIT-AP University,\\
    Beside AP Secretariat, Near Vijayawada, Amaravati, Andhra Pradesh 522237, India.\\
    Email: \texttt{premchand.23bce7167@vitapstudent.ac.in}
    
    \item \textbf{K.~SriHarsha~Vardhan} (Co-Author)\\
    School of Computer Science and Engineering (SCOPE), VIT-AP University,\\
    Beside AP Secretariat, Near Vijayawada, Amaravati, Andhra Pradesh 522237, India.\\
    Email: \texttt{sriharsha.23bce7168@vitapstudent.ac.in}
    
    \item \textbf{Edupulapati~Sai~Praneeth} (Co-Author)\\
    School of Computer Science and Engineering (SCOPE), VIT-AP University,\\
    Beside AP Secretariat, Near Vijayawada, Amaravati, Andhra Pradesh 522237, India.\\
    Email: \texttt{saipraneeth.23bce7169@vitapstudent.ac.in}
    
    \item \textbf{Yamala~Liel~Stephen} (Co-Author)\\
    School of Computer Science and Engineering (SCOPE), VIT-AP University,\\
    Beside AP Secretariat, Near Vijayawada, Amaravati, Andhra Pradesh 522237, India.\\
    Email: \texttt{lielstephen.23bce7170@vitapstudent.ac.in}
    
    \item \textbf{P.~R.~Kiran~Kumar~Reddy} (Co-Author)\\
    School of Computer Science and Engineering (SCOPE), VIT-AP University,\\
    Beside AP Secretariat, Near Vijayawada, Amaravati, Andhra Pradesh 522237, India.\\
    Email: \texttt{kirankumar.23bce7171@vitapstudent.ac.in}
    
    \item \textbf{Dr.~Madala~Guru~Brahmam} (\textbf{Corresponding Author}, Project Guide)\\
    Assistant Professor (Senior Grade--1),\\
    School of Computer Science and Engineering (SCOPE), VIT-AP University,\\
    Beside AP Secretariat, Near Vijayawada, Amaravati, Andhra Pradesh 522237, India.\\
    \textbf{Corresponding Author Email: \texttt{gurubrahmam.m@vitap.ac.in}}
    
    \item \textbf{Dr.~S.~Bharath~Bhushan} (Faculty Mentor \& Co-Author)\\
    Associate Professor (Grade-1), Department of Networking and Security (DNS),\\
    School of Computer Science and Engineering (SCOPE), VIT-AP University,\\
    Beside AP Secretariat, Near Vijayawada, Amaravati, Andhra Pradesh 522237, India.\\
    Email: \texttt{bharath.s@vitap.ac.in}
    
    \item \textbf{Dr.~Pranjal~Kumar} (Faculty Mentor \& Co-Author)\\
    Assistant Professor (Senior Grade 2), School of Bio Sciences and Technology (SBST),\\
    VIT-AP University,\\
    Beside AP Secretariat, Near Vijayawada, Amaravati, Andhra Pradesh 522237, India.\\
    Email: \texttt{pranjal.k@vitap.ac.in}
\end{itemize}

\section*{2. Corresponding Author's Email Address}
\textbf{Dr.~Madala~Guru~Brahmam}\\
Email: \texttt{gurubrahmam.m@vitap.ac.in}

\section*{3. Author Contributions}
V.C.P.Y. conceived the core study, designed the continuous-time $\mathrm{SE}(3)$ Riemannian flow-matching formulation and the 8-expert sparse mixture-of-experts (MoE) architecture, developed the PyTorch training codebase, and authored the initial manuscript. K.S.V. implemented the PoseBusters physical chemistry audit suite, stereochemical constraint enforcers, and MMFF94s potential minimization. E.S.P. curated and benchmarked the molecular datasets (DUD-E, LIT-PCBA, BindingDTA, TDC ADMET) and managed data preprocessing. Y.L.S. formulated the reaction-SMARTS retrosynthesis pipeline (AETHER-SynthonSpace) and mapped candidate leads to commercial Enamine REAL synthon catalogs. P.R.K.K.R. contributed to empirical screening evaluations, hyperparameter optimization, and statistical validation. Dr.~M.G.B. supervised the project, verified computational methodologies, reviewed mathematical proofs, and coordinated manuscript submission as corresponding author. Dr.~S.B.B. provided technical mentorship on distributed neural computing and model scalability. Dr.~P.K. provided biological mentorship on oncogenic resistance mutations (EGFR C797S, KRAS G12C/Y96D, BCR-ABL1 T315I), target engagement, and safety counter-screening. All authors read, reviewed, and approved the final manuscript.

\section*{4. Competing Interests Statement}
The authors declare no competing financial or non-financial interests.

\section*{5. Funding Statement}
This research was conducted within the School of Computer Science and Engineering (SCOPE) and the School of Bio Sciences and Technology (SBST) at VIT-AP University, Amaravati, Andhra Pradesh, India. Computational GPU resources (NVIDIA Tesla T4 and workstation hardware) were supported by internal institutional computing facilities. The authors declare that no external commercial or direct grant funding influenced the design of the study, data collection, analysis, or decision to publish.

\section*{6. Ethics Statement}
This computational study did not involve human participants, living human subjects, human tissue sampling, or experimental vertebrate animals. All crystallographic macromolecular assemblies, biological activity assays, and transcriptomic data were obtained from open-access, public scientific repositories (Protein Data Bank, ChEMBL, Therapeutics Data Commons, and NCBI GEO). No ethical review board approval was required.

\section*{7. Acknowledgement}
The authors gratefully acknowledge VIT-AP University, Amaravati, Andhra Pradesh, India, for providing academic infrastructure, high-performance computing facilities, and research mentorship through the School of Computer Science and Engineering (SCOPE) and the School of Bio Sciences and Technology (SBST). The authors also acknowledge open-source scientific software communities for RDKit, PyTorch, PyMOL, and Mol*.

\section*{8. Data Availability Statement}
All primary datasets supporting the findings of this study are publicly available from standard scientific repositories: Protein Data Bank (\url{https://www.rcsb.org}), ChEMBL 33 (\url{https://www.ebi.ac.uk/chembl/}), Therapeutics Data Commons (\url{https://tdcommons.ai/}), and DUD-E (\url{http://dude.docking.org/}). The curated benchmarking datasets, chemical structures, and trained model weights (117.81\,MB SafeTensors) are openly deposited on the Hugging Face Hub at \url{https://huggingface.co/Premchan369/aether-rami-esm2-diffsbdd} under the Apache-2.0 License.

\section*{Code Availability Statement}
The complete, end-to-end Python and PyTorch codebase for AETHER-RAMI, including $\mathrm{SE}(3)$ flow-matching generators, calibrated ADMET engines, retrosynthetic planners, and reproduction scripts, is openly hosted on GitHub at \url{https://github.com/Premchandyadav369/AETHERRAMI} under the Apache-2.0 License.

\vspace{1em}
\closing{Sincerely on behalf of all authors,}

\noindent
\textbf{Dr.~Madala~Guru~Brahmam} (Corresponding Author)\\
Assistant Professor (Senior Grade--1), School of Computer Science and Engineering (SCOPE),\\
VIT-AP University, Amaravati, Andhra Pradesh 522237, India.\\
Email: \texttt{gurubrahmam.m@vitap.ac.in}

\end{letter}
\end{document}
"""

cover_path = os.path.join(nmi_dir, "cover_letter_nature_double_blind.tex")
with open(cover_path, "w", encoding="utf-8") as f:
    f.write(cover_letter_latex)
print(f"[+] Wrote Cover Letter to {cover_path}")

default_cover = os.path.join(nmi_dir, "cover_letter.tex")
with open(default_cover, "w", encoding="utf-8") as f:
    f.write(cover_letter_latex)
print(f"[+] Updated default Cover Letter at {default_cover}")

# -------------------------------------------------------------
# 2. GENERATE ANONYMIZED MAIN MANUSCRIPT (main_anonymized.tex)
# -------------------------------------------------------------
with open(os.path.join(nmi_dir, "main.tex"), "r", encoding="utf-8") as f:
    main_text = f.read()

# Replace Author Block with Anonymized Placeholder using lambda
anonymized_author_block = "\\author{\n    \\normalsize\n    \\textbf{[Authors Blinded for Double-Anonymous Peer Review]}\n}\n\n\\date{}"

main_anon = re.sub(
    r"\\author\{[\s\S]*?\\date\{\}",
    lambda m: anonymized_author_block,
    main_text
)

# Remove affiliations and corresponding author block in center environment
anonymized_affil_block = "\\begin{center}\n\\footnotesize\n\\textit{[Institutional affiliations and corresponding author details blinded for double-anonymous peer review]}\n\\end{center}"
main_anon = re.sub(
    r"\\begin\{center\}\s*\\footnotesize[\s\S]*?\\end\{center\}",
    lambda m: anonymized_affil_block,
    main_anon
)

# Replace self-identifying text in Introduction
self_id_target = r"building upon our foundational biopharmaceutical framework \cite{yadav2026aether} and open model releases \cite{yadav2026model,yadav2026space,yadav2026code}, we present AETHER-RAMI"
self_id_replacement = r"building upon recent advances in geometric deep learning and open foundation architectures \cite{lipman2023flow,albergo2023building}, we present AETHER-RAMI"
main_anon = main_anon.replace(self_id_target, self_id_replacement)

# Replace back matter sections
# Data Availability
data_avail_anon = r"""\section*{Data Availability}
\textit{[Data Availability Statement blinded for double-anonymous peer review. All public repository access links and deposited model checkpoints have been provided in full to the editors in the accompanying Cover Letter and will be made fully accessible upon publication.]}"""

main_anon = re.sub(
    r"\\section\*?\{Data Availability\}[\s\S]*?(?=\\section\*?\{Code Availability\})",
    lambda m: data_avail_anon + "\n\n",
    main_anon
)

# Code Availability
code_avail_anon = r"""\section*{Code Availability}
\textit{[Code Availability Statement blinded for double-anonymous peer review. The complete software repository, inference checkpoints, and interactive 3D evaluation suite have been provided in full to the editors in the accompanying Cover Letter and will be made publicly available under the Apache-2.0 License upon publication.]}"""

main_anon = re.sub(
    r"\\section\*?\{Code Availability\}[\s\S]*?(?=\\newpage|\s*\\begin\{thebibliography\})",
    lambda m: code_avail_anon + "\n\n",
    main_anon
)

# Acknowledgements
ack_anon = r"""\section*{Acknowledgements}
\textit{[Acknowledgements blinded for double-anonymous peer review; provided in full in the accompanying Cover Letter.]}"""

main_anon = re.sub(
    r"\\section\*?\{Acknowledgements\}[\s\S]*?(?=\\section\*?\{Author Contributions\})",
    lambda m: ack_anon + "\n\n",
    main_anon
)

# Author Contributions
contrib_anon = r"""\section*{Author Contributions}
\textit{[Author Contributions blinded for double-anonymous peer review; provided in full in the accompanying Cover Letter.]}"""

main_anon = re.sub(
    r"\\section\*?\{Author Contributions\}[\s\S]*?(?=\\section\*?\{Competing Interests\})",
    lambda m: contrib_anon + "\n\n",
    main_anon
)

# Competing Interests
competing_anon = r"""\section*{Competing Interests}
\textit{[Competing Interests Statement blinded for double-anonymous peer review; provided in full in the accompanying Cover Letter.]}"""

main_anon = re.sub(
    r"\\section\*?\{Competing Interests\}[\s\S]*?(?=\\newpage|\s*\\clearpage|\s*\\section\*?\{Figure Legends\})",
    lambda m: competing_anon + "\n\n",
    main_anon
)

# Clean self-citation bibliography entries
main_anon = re.sub(
    r"\\bibitem\{yadav2026aether\}[\s\S]*?\\bibitem\{yadav2026model\}[\s\S]*?\\bibitem\{yadav2026space\}[\s\S]*?\\bibitem\{yadav2026code\}[\s\S]*?(?=\\bibitem\{|\s*\\end\{thebibliography\})",
    lambda m: "\\bibitem{blinded_refs}\n\\newblock [Self-citations blinded for double-anonymous peer review; details provided in cover letter.]\n\n",
    main_anon
)

# Clean any residual Premchan369 URLs
main_anon = main_anon.replace("https://huggingface.co/Premchan369/aether-rami-esm2-diffsbdd", "[Repository link blinded for peer review]")
main_anon = main_anon.replace("https://huggingface.co/spaces/Premchan369/aether-rami-drug-discovery-demo", "[Demo link blinded for peer review]")
main_anon = main_anon.replace("https://github.com/Premchandyadav369/AETHERRAMI", "[Codebase link blinded for peer review]")
main_anon = main_anon.replace("https://github.com/Premchandyadav369/AETHER", "[Codebase link blinded for peer review]")

anon_main_path = os.path.join(nmi_dir, "main_anonymized.tex")
with open(anon_main_path, "w", encoding="utf-8") as f:
    f.write(main_anon)
print(f"[+] Wrote Anonymized Main Manuscript to {anon_main_path}")


# -------------------------------------------------------------
# 3. GENERATE ANONYMIZED SUPPLEMENTARY INFORMATION
# -------------------------------------------------------------
with open(os.path.join(nmi_dir, "supplementary_information.tex"), "r", encoding="utf-8") as f:
    supp_text = f.read()

supp_anon = re.sub(
    r"\\author\{[\s\S]*?\\date\{\}",
    lambda m: anonymized_author_block,
    supp_text
)

anonymized_supp_affil = "\\begin{center}\n\\footnotesize\n\\textit{[Institutional affiliations and corresponding author details blinded for double-anonymous peer review]}\n\\end{center}"
supp_anon = re.sub(
    r"\\begin\{center\}[\s\S]*?\\end\{center\}",
    lambda m: anonymized_supp_affil,
    supp_anon
)

supp_anon = supp_anon.replace("https://huggingface.co/Premchan369/aether-rami-esm2-diffsbdd", "[Repository link blinded for peer review]")
supp_anon = supp_anon.replace("https://github.com/Premchandyadav369/AETHERRAMI", "[Codebase link blinded for peer review]")
supp_anon = supp_anon.replace("https://github.com/Premchandyadav369/AETHER", "[Codebase link blinded for peer review]")

anon_supp_path = os.path.join(nmi_dir, "supplementary_anonymized.tex")
with open(anon_supp_path, "w", encoding="utf-8") as f:
    f.write(supp_anon)
print(f"[+] Wrote Anonymized Supplementary Information to {anon_supp_path}")

print("\nAll LaTeX files successfully created and verified.")
