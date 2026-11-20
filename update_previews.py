import re

for p in ['paper_latex_nature_methods/preview_nature_methods.html', 'paper_latex_nmi/preview_nmi.html']:
    with open(p, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Fix tab imes
    html = html.replace('\times', '&times;').replace('\tymes', '&times;').replace('\times', '&times;')
    html = re.sub(r'>206\s*imes', '>206&times;', html)
    html = re.sub(r'>206\t*imes', '>206&times;', html)
    
    # Fix Title for Nature Methods preview
    if 'nature_methods' in p:
        html = html.replace(
            '<h1 class="paper-title">All-atom mixture of experts model overcomes acquired drug resistance</h1>',
            '<h1 class="paper-title">All-atom flow matching foundation model for resistance-resilient molecular design</h1>'
        )
        html = html.replace(
            '<title>Nature Methods Submission Preview - All-atom mixture of experts model overcomes acquired drug resistance</title>',
            '<title>Nature Methods Submission Preview - All-atom flow matching foundation model for resistance-resilient molecular design</title>'
        )

    with open(p, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Updated {p} preview HTML!")
