import re
import os
import shutil
import zipfile

nm_title_catchy = r"\title{\LARGE\textbf{Outsmarting acquired drug resistance with an all-atom flow matching foundation model}}"
nmi_title_catchy = r"\title{\textbf{All-atom flow matching outsmarts acquired drug resistance}}"

hf_model_url = "https://huggingface.co/Premchan369/aether-rami-esm2-diffsbdd"
hf_spaces_url = "https://huggingface.co/spaces/Premchan369/aether-rami-drug-discovery-demo"

# Update preamble to include needspace and anti-orphan penalties
preamble_addition = r"""\usepackage{needspace}
\raggedbottom
\clubpenalty=10000
\widowpenalty=10000
\displaywidowpenalty=10000
"""

for d in ['paper_latex_nature_methods', 'paper_latex_nmi']:
    main_p = os.path.join(d, 'main.tex')
    with open(main_p, 'r', encoding='utf-8') as f:
        text = f.read()

    # 1. Update Title to catchy
    chosen_title = nm_title_catchy if 'nature_methods' in d else nmi_title_catchy
    text = re.sub(r'\\title\{.*?\}', lambda m: chosen_title, text, flags=re.DOTALL)

    # 2. Add preamble packages if not present
    if r'\usepackage{needspace}' not in text:
        text = text.replace(r'\usepackage{bm}', r'\usepackage{bm}' + '\n' + preamble_addition)

    # 3. Add \needspace{6\baselineskip} before all \subsection* to keep headings with their text
    sub_pattern = r'(\\subsection\*\{[^\}]+\})'
    text = re.sub(sub_pattern, r'\\needspace{6\\baselineskip}\n\1', text)
    # Avoid duplicate needspace if already inserted
    text = text.replace(r'\needspace{6\baselineskip}' + '\n' + r'\needspace{6\baselineskip}', r'\needspace{6\baselineskip}')

    # 4. Replace GitHub with Hugging Face in Abstract
    text = re.sub(
        r'The complete (codebase and model checkpoints|trained foundation weights).*?at \\url\{https?://github\.com/[^\}]+\}\.',
        f'The complete trained foundation weights, interactive 3D inference workstations, and evaluation suites are publicly accessible on the Hugging Face Hub at \\\\url{{{hf_model_url}}}.',
        text
    )

    # 5. Replace GitHub with Hugging Face in Code Availability
    new_code_avail = f"""\\section*{{Code Availability}}
The complete foundation model checkpoints, inference pipelines, and interactive 3D workstations for AETHER-RAMI are openly accessible on Hugging Face under the Apache-2.0 License:
\\begin{{itemize}}
    \\item Pretrained Model Weights and Checkpoints: \\url{{{hf_model_url}}}
    \\item Interactive 3D Molecular Discovery Workstation: \\url{{{hf_spaces_url}}}
    \\item Core Pipeline Code and Evaluation Suite: \\url{{{hf_model_url}}}
\\end{{itemize}}"""
    text = re.sub(r'\\section\*\{Code Availability\}.*?(?=\\begin\{thebibliography\})', lambda m: new_code_avail + '\n\n', text, flags=re.DOTALL)

    # 6. Replace GitHub in bibitem yadav2026code
    text = text.replace(
        r'\emph{GitHub} \url{https://github.com/Premchandyadav369/AETHER.git}',
        f'\\emph{{Hugging Face Hub}} \\url{{{hf_model_url}}}'
    )

    # 7. Clean any remaining github.com/Premchandyadav369 in text
    text = text.replace('https://github.com/Premchandyadav369/AETHER.git', hf_model_url)
    text = text.replace('https://github.com/Premchandyadav369/AETHER', hf_model_url)

    with open(main_p, 'w', encoding='utf-8') as f:
        f.write(text)
    print(f"Updated {main_p} with catchy title, Hugging Face links, and needspace controls!")

    # Update supplementary_information.tex
    supp_p = os.path.join(d, 'supplementary_information.tex')
    with open(supp_p, 'r', encoding='utf-8') as f:
        supp_t = f.read()

    supp_title = "\\title{\\textbf{Supplementary Information for:\\\\Outsmarting acquired drug resistance with an all-atom flow matching foundation model}}" if 'nature_methods' in d else "\\title{\\textbf{Supplementary Information for:\\\\All-atom flow matching outsmarts acquired drug resistance}}"
    supp_t = re.sub(r'\\title\{.*?\}', lambda m: supp_title, supp_t, flags=re.DOTALL)
    supp_t = supp_t.replace('https://github.com/Premchandyadav369/AETHER.git', hf_model_url)
    supp_t = supp_t.replace('https://github.com/Premchandyadav369/AETHER', hf_model_url)

    with open(supp_p, 'w', encoding='utf-8') as f:
        f.write(supp_t)
    print(f"Updated {supp_p}!")

    # Update cover_letter.tex
    cl_p = os.path.join(d, 'cover_letter.tex')
    with open(cl_p, 'r', encoding='utf-8') as f:
        cl_t = f.read()

    cl_title = "Outsmarting acquired drug resistance with an all-atom flow matching foundation model" if 'nature_methods' in d else "All-atom flow matching outsmarts acquired drug resistance"
    cl_t = re.sub(r'manuscript titled \\textbf\{"[^"]*"\}', lambda m: f'manuscript titled \\textbf{{"{cl_title}"}}', cl_t)
    
    # Replace github in cover letter with Hugging Face
    cl_t = re.sub(
        r'all code, model configurations, trained weights, and benchmark datasets are publicly accessible.*?on GitHub at \\url\{[^\}]+\}\.',
        f'all trained foundation weights, inference pipelines, model checkpoints, and interactive 3D discovery workstations are deposited and publicly accessible on the Hugging Face Hub under the Apache-2.0 License: \\\\url{{{hf_model_url}}} and \\\\url{{{hf_spaces_url}}}.',
        cl_t
    )
    cl_t = cl_t.replace('https://github.com/Premchandyadav369/AETHER.git', hf_model_url)
    cl_t = cl_t.replace('https://github.com/Premchandyadav369/AETHER', hf_model_url)

    with open(cl_p, 'w', encoding='utf-8') as f:
        f.write(cl_t)
    print(f"Updated {cl_p}!")

    # Update HTML Previews
    html_p = os.path.join(d, 'preview_nature_methods.html' if 'nature_methods' in d else 'preview_nmi.html')
    with open(html_p, 'r', encoding='utf-8') as f:
        html = f.read()

    disp_title = "Outsmarting acquired drug resistance with an all-atom flow matching foundation model" if 'nature_methods' in d else "All-atom flow matching outsmarts acquired drug resistance"
    html = re.sub(r'<h1 class="paper-title">.*?</h1>', f'<h1 class="paper-title">{disp_title}</h1>', html, flags=re.DOTALL)
    html = re.sub(r'<title>.*?</title>', f'<title>{disp_title} - Submission Preview</title>', html, flags=re.DOTALL)

    # CSS break-after avoid for subheadings
    if 'break-after: avoid;' not in html:
        html = html.replace(
            '.subsection-title {',
            '.subsection-title {\n            break-after: avoid;\n            page-break-after: avoid;'
        )

    # Replace github links with Hugging Face in abstract and text
    html = re.sub(
        r'Public Code & Models: <a href="https?://github\.com/[^"]*".*?</a>',
        f'Public Model & Workstation: <a href="{hf_model_url}" target="_blank" style="color:#0284c7;font-weight:600;">Hugging Face Hub</a> &bull; <a href="{hf_spaces_url}" target="_blank" style="color:#0284c7;font-weight:600;">Interactive Space</a>',
        html
    )
    html = html.replace('https://github.com/Premchandyadav369/AETHER.git', hf_model_url)
    html = html.replace('https://github.com/Premchandyadav369/AETHER', hf_model_url)
    html = html.replace('github.com/Premchandyadav369/AETHER', 'huggingface.co/Premchan369/aether-rami-esm2-diffsbdd')

    with open(html_p, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Updated {html_p}!")

print("All files updated with catchy titles, Hugging Face primacy, and flow controls!")
