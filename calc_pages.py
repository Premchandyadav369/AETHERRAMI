import os, re, math

def est_latex_pages(tex_path):
    with open(tex_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Strip comments
    lines = [l for l in content.split('\n') if not l.strip().startswith('%')]
    text = '\n'.join(lines)
    
    # Count words
    words = len(re.findall(r'\b[a-zA-Z0-9_-]+\b', text))
    
    # Count display equations
    eqs = len(re.findall(r'\\begin\{(equation|align)\*?\}', text)) + len(re.findall(r'\$\$.*?\$\$', text, re.DOTALL))
    
    # Count tables
    tables = len(re.findall(r'\\begin\{table\*?\}', text))
    
    # Count figures
    figures = len(re.findall(r'\\begin\{figure\*?\}', text)) + len(re.findall(r'\\textbf\{Fig\.\s*\d', text))
    
    # Count bibitems
    bibs = len(re.findall(r'\\bibitem', text))
    
    prose_pages = words / 380.0
    eq_pages = eqs * 0.12
    tab_pages = tables * 0.55
    fig_pages = figures * 0.55
    bib_pages = bibs / 18.0
    
    total_est = prose_pages + eq_pages + tab_pages + fig_pages + bib_pages
    return {
        'words': words,
        'eqs': eqs,
        'tables': tables,
        'figures': figures,
        'bibs': bibs,
        'est_pages': round(total_est, 1),
        'page_range': f"{math.floor(total_est)} to {math.ceil(total_est) + 1}"
    }

print("=== LATEX MANUSCRIPT ESTIMATES ===")
for p in [
    'paper_latex_nature_methods/main.tex',
    'paper_latex_nature_methods/supplementary_information.tex',
    'paper_latex_nature_methods/cover_letter.tex',
    'paper_latex_nmi/main.tex',
    'paper_latex_nmi/supplementary_information.tex',
    'paper_latex_nmi/cover_letter.tex'
]:
    e = est_latex_pages(p)
    print(f"{p}:")
    print(f"  Words: {e['words']}, Tables: {e['tables']}, Figs: {e['figures']}, Eqs: {e['eqs']}, Est Pages: {e['est_pages']} ({e['page_range']} pages)")
