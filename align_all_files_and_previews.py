import re
import os

hf_model_url = "https://huggingface.co/Premchan369/aether-rami-esm2-diffsbdd"
hf_spaces_url = "https://huggingface.co/spaces/Premchan369/aether-rami-drug-discovery-demo"

nm_title = r"\title{De novo all-atom flow matching with mixture of experts for designing inhibitors of drug-resistant targets}"
nmi_title = r"\title{All-atom flow-matching mixture of experts for drug-resistant targets}"

for d in ['paper_latex_nature_methods', 'paper_latex_nmi']:
    main_p = os.path.join(d, 'main.tex')
    with open(main_p, 'r', encoding='utf-8') as f:
        text = f.read()

    # Title
    chosen_title = nm_title if 'nature_methods' in d else nmi_title
    text = re.sub(r'\\title\{.*?\}', lambda m: chosen_title, text, flags=re.DOTALL)

    # Extended Data Table mapping alignments
    text = text.replace(
        '58,416 distinct compounds (Extended Data Table~5 and Extended Data Table~6)',
        '58,416 distinct compounds (Extended Data Table~3 and Extended Data Table~4)'
    )
    text = text.replace(
        '(Fig.~1b and Extended Data Table~3)',
        '(Fig.~1b and Table~1)'
    )
    text = text.replace(
        '(Fig.~2 and Extended Data Table~4)',
        '(Fig.~2 and Extended Data Table~6)'
    )
    text = text.replace(
        '(Fig.~3, Extended Data Table~7, and Extended Data Table~8)',
        '(Fig.~3 and Extended Data Table~7)'
    )
    text = text.replace(
        '(Table~2 and Extended Data Table~7)',
        '(Table~2 and Extended Data Table~5)'
    )
    text = text.replace(
        'across the 36-candidate portfolio (Extended Data Table~8)',
        'across the 36-candidate portfolio (Extended Data Table~8 and Extended Data Table~9)'
    )

    with open(main_p, 'w', encoding='utf-8') as f:
        f.write(text)
    print(f"Aligned {main_p} ED table references!")

    # Update cover_letter.tex title
    cl_p = os.path.join(d, 'cover_letter.tex')
    with open(cl_p, 'r', encoding='utf-8') as f:
        cl_t = f.read()
    cl_title = "De novo all-atom flow matching with mixture of experts for designing inhibitors of drug-resistant targets" if 'nature_methods' in d else "All-atom flow-matching mixture of experts for drug-resistant targets"
    cl_t = re.sub(r'manuscript titled \\textbf\{"[^"]*"\}', lambda m: f'manuscript titled \\textbf{{"{cl_title}"}}', cl_t)
    with open(cl_p, 'w', encoding='utf-8') as f:
        f.write(cl_t)
    print(f"Aligned {cl_p} title!")

    # Update supplementary_information.tex title
    supp_p = os.path.join(d, 'supplementary_information.tex')
    with open(supp_p, 'r', encoding='utf-8') as f:
        supp_t = f.read()
    supp_title = "\\title{\\textbf{Supplementary Information for:\\\\De novo all-atom flow matching with mixture of experts for designing inhibitors of drug-resistant targets}}" if 'nature_methods' in d else "\\title{\\textbf{Supplementary Information for:\\\\All-atom flow-matching mixture of experts for drug-resistant targets}}"
    supp_t = re.sub(r'\\title\{.*?\}', lambda m: supp_title, supp_t, flags=re.DOTALL)
    with open(supp_p, 'w', encoding='utf-8') as f:
        f.write(supp_t)
    print(f"Aligned {supp_p} title!")

    # Update HTML Previews
    html_p = os.path.join(d, 'preview_nature_methods.html' if 'nature_methods' in d else 'preview_nmi.html')
    with open(html_p, 'r', encoding='utf-8') as f:
        html = f.read()

    disp_title = "De novo all-atom flow matching with mixture of experts for designing inhibitors of drug-resistant targets" if 'nature_methods' in d else "All-atom flow-matching mixture of experts for drug-resistant targets"
    html = re.sub(r'<h1 class="paper-title">.*?</h1>', f'<h1 class="paper-title">{disp_title}</h1>', html, flags=re.DOTALL)
    html = re.sub(r'<title>.*?</title>', f'<title>{disp_title} - Submission Preview</title>', html, flags=re.DOTALL)

    with open(html_p, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Aligned {html_p} preview title!")

print("All files aligned!")
