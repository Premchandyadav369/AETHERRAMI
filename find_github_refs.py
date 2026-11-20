import os, re

dirs = ['paper_latex_nature_methods', 'paper_latex_nmi']
for d in dirs:
    for root, _, files in os.walk(d):
        for f in files:
            if f.endswith(('.tex', '.html')):
                p = os.path.join(root, f)
                with open(p, 'r', encoding='utf-8') as fp:
                    c = fp.read()
                matches = re.findall(r'github\.com[^\s\}\"]*', c)
                if matches:
                    print(f'{p}: {len(matches)} github references:')
                    for m in matches:
                        print(f'   - {m}')
