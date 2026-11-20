import re

def analyze_tex(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # Strip comments
    lines = [l for l in text.split('\n') if not l.strip().startswith('%')]
    text_clean = '\n'.join(lines)
    
    # Extract sections
    abstract = re.search(r'\\begin\{abstract\}(.*?)\\end\{abstract\}', text_clean, re.DOTALL)
    abstract_words = len(abstract.group(1).split()) if abstract else 0
    
    # Body text (strip math, environments)
    body_text = re.sub(r'\\[a-zA-Z]+(\[[^\]]*\])?(\{[^}]*\})?', ' ', text_clean)
    body_text = re.sub(r'[\$\&\\_\{\}\^]', ' ', body_text)
    words = len(body_text.split())
    
    num_equations = len(re.findall(r'\\begin\{(equation|align|gather)\}', text_clean)) + len(re.findall(r'\$\$', text_clean))
    num_tables = len(re.findall(r'\\begin\{table\}', text_clean))
    num_figures = len(re.findall(r'\\begin\{figure\}', text_clean))
    num_bibitems = len(re.findall(r'\\bibitem', text_clean))
    
    return {
        'total_words': words,
        'abstract_words': abstract_words,
        'num_equations': num_equations,
        'num_tables': num_tables,
        'num_figures': num_figures,
        'num_bibitems': num_bibitems,
        'lines_of_tex': len(lines)
    }

for d in ['paper_latex_nature_methods', 'paper_latex_nmi']:
    print(f"=== {d} ===")
    main_stats = analyze_tex(f"{d}/main.tex")
    supp_stats = analyze_tex(f"{d}/supplementary_information.tex")
    print(f"Main Text: {main_stats['total_words']} words, {main_stats['abstract_words']} abstract words, {main_stats['num_equations']} eqs, {main_stats['num_tables']} tables, {main_stats['num_bibitems']} refs, {main_stats['lines_of_tex']} lines")
    print(f"Supp Info: {supp_stats['total_words']} words, {supp_stats['num_equations']} eqs, {supp_stats['num_tables']} tables, {supp_stats['lines_of_tex']} lines")
