import os
import re

base_dir = os.path.dirname(os.path.abspath(__file__))
nmi_dir = os.path.join(base_dir, "paper_latex_nmi")

# -------------------------------------------------------------
# 1. UPDATE ANONYMIZED MAIN MANUSCRIPT (main_anonymized.tex)
# -------------------------------------------------------------
with open(os.path.join(nmi_dir, "main.tex"), "r", encoding="utf-8") as f:
    main_txt = f.read()

with open(os.path.join(nmi_dir, "supplementary_information.tex"), "r", encoding="utf-8") as f:
    supp_txt = f.read()

# Anonymize author block in main_txt
anonymized_author_block = "\\author{\n    \\normalsize\n    \\textbf{[Authors Blinded for Double-Anonymous Peer Review]}\n}\n\n\\date{}"
main_clean = re.sub(r"\\author\{[\s\S]*?\\date\{\}", lambda m: anonymized_author_block, main_txt)

anonymized_affil_block = "\\begin{center}\n\\footnotesize\n\\textit{[Institutional affiliations and corresponding author details blinded for double-anonymous peer review]}\n\\end{center}"
main_clean = re.sub(r"\\begin\{center\}\s*\\footnotesize[\s\S]*?\\end\{center\}", lambda m: anonymized_affil_block, main_clean)

# Replace self-identifying citation in Introduction
self_id_target = r"building upon our foundational biopharmaceutical framework \cite{yadav2026aether} and open model releases \cite{yadav2026model,yadav2026space,yadav2026code}, we present AETHER-RAMI"
self_id_replacement = r"building upon recent advances in geometric deep learning and open foundation architectures \cite{lipman2023flow,albergo2023building}, we present AETHER-RAMI"
main_clean = main_clean.replace(self_id_target, self_id_replacement)

# Remove Data Availability and Code Availability sections completely from manuscript
da_pos = main_clean.find(r"\section*{Data Availability}")
bib_pos = main_clean.find(r"\begin{thebibliography}")
if da_pos != -1 and bib_pos != -1:
    main_clean = main_clean[:da_pos] + main_clean[bib_pos:]

# Remove Acknowledgements, Author Contributions, Competing Interests completely from manuscript
bib_end = main_clean.find(r"\end{thebibliography}")
if bib_end != -1:
    bib_end += len(r"\end{thebibliography}")
fig_leg_pos = main_clean.find(r"\section*{Figure Legends}")
if bib_end != -1 and fig_leg_pos != -1:
    main_clean = main_clean[:bib_end] + "\n\n\\newpage\n\\clearpage\n\n" + main_clean[fig_leg_pos:]

# Clean self-citation bibliography entries
main_clean = re.sub(
    r"\\bibitem\{yadav2026aether\}[\s\S]*?\\bibitem\{yadav2026model\}[\s\S]*?\\bibitem\{yadav2026space\}[\s\S]*?\\bibitem\{yadav2026code\}[\s\S]*?(?=\\bibitem\{|\s*\\end\{thebibliography\})",
    lambda m: "\\bibitem{blinded_refs}\n\\newblock [Self-citations blinded for double-anonymous peer review; details provided in cover letter.]\n\n",
    main_clean
)

# Extract Extended Data Figure 1 from supp_txt
ed_fig_match = re.search(r"(\\begin\{figure\*?\}[\s\S]*?Extended Data Figure 1[\s\S]*?\\end\{figure\*?\})", supp_txt)
ed_fig_latex = ed_fig_match.group(1) if ed_fig_match else ""

# Extract Extended Data Tables 1-10 from supp_txt
ed_tables_start = supp_txt.find(r"\section*{Extended Data Tables}")
supp_tables_start = supp_txt.find(r"\section*{Supplementary Tables}")
ed_tables_latex = supp_txt[ed_tables_start:supp_tables_start].strip()

# Append Extended Data Figures right after Figure 3
fig3_pos = main_clean.find(r"\label{fig:3}")
if fig3_pos != -1:
    fig3_end = main_clean.find(r"\end{figure}", fig3_pos) + len(r"\end{figure}")
    ed_fig_section = "\n\n\\clearpage\n\\section*{Extended Data Figures}\n\n" + ed_fig_latex + "\n"
    main_clean = main_clean[:fig3_end] + ed_fig_section + main_clean[fig3_end:]

# Append Extended Data Tables right before \end{document}
end_doc_pos = main_clean.rfind(r"\end{document}")
if end_doc_pos != -1:
    ed_tables_section = "\n\n\\clearpage\n" + ed_tables_latex + "\n\n"
    main_clean = main_clean[:end_doc_pos] + ed_tables_section + main_clean[end_doc_pos:]

# Replace explicit URLs
main_clean = main_clean.replace("https://huggingface.co/Premchan369/aether-rami-esm2-diffsbdd", "[Repository link blinded for peer review]")
main_clean = main_clean.replace("https://huggingface.co/spaces/Premchan369/aether-rami-drug-discovery-demo", "[Demo link blinded for peer review]")
main_clean = main_clean.replace("https://github.com/Premchandyadav369/AETHERRAMI", "[Codebase link blinded for peer review]")
main_clean = main_clean.replace("https://github.com/Premchandyadav369/AETHER", "[Codebase link blinded for peer review]")

anon_main_path = os.path.join(nmi_dir, "main_anonymized.tex")
with open(anon_main_path, "w", encoding="utf-8") as f:
    f.write(main_clean)
print("[+] Wrote updated main_anonymized.tex with Extended Data display items and without back-matter sections.")


# -------------------------------------------------------------
# 2. UPDATE ANONYMIZED SUPPLEMENTARY INFORMATION
# -------------------------------------------------------------
supp_anon = re.sub(
    r"\\author\{[\s\S]*?\\date\{\}",
    lambda m: anonymized_author_block,
    supp_txt
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
print("[+] Wrote updated supplementary_anonymized.tex with blinded author information.")

print("\nAll files successfully prepared for Nature Double-Anonymous Resubmission.")
