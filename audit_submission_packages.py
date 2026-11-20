import os
import re

dirs = ['paper_latex_nature_methods', 'paper_latex_nmi']
forbidden_terms = ['CSIR-IICT', 'CSIR', 'IICT']

total_issues = 0

for d in dirs:
    print(f'=== AUDITING DIRECTORY: {d} ===')
    for root, _, files in os.walk(d):
        for file in files:
            if file.endswith(('.tex', '.html', '.bib', '.txt', '.py')):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                # Check 4.2
                matches_42 = list(re.finditer(r'4\.2', content))
                if matches_42:
                    print(f'  [FAIL] {filepath} contains 4.2 ({len(matches_42)} times):')
                    for m in matches_42[:5]:
                        start = max(0, m.start() - 25)
                        end = min(len(content), m.end() + 25)
                        print(f'    ...{content[start:end]}...')
                    total_issues += len(matches_42)
                
                # Check forbidden terms
                for term in forbidden_terms:
                    matches_term = list(re.finditer(re.escape(term), content, re.IGNORECASE))
                    if matches_term:
                        print(f'  [FAIL] {filepath} contains forbidden term "{term}" ({len(matches_term)} times)!')
                        total_issues += len(matches_term)
                
                # Check em-dash '---' in prose
                lines = content.split('\n')
                for idx, line in enumerate(lines):
                    if not line.strip().startswith('%') and '---' in line:
                        print(f'  [EM-DASH] {filepath}:{idx+1}: {line.strip()[:80]}')
                        total_issues += 1

print(f'\nTotal Issues Found: {total_issues}')
