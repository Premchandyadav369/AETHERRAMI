import re

with open('paper_latex_nature_methods/main.tex', 'r', encoding='utf-8') as f:
    text = f.read()

headings = re.findall(r'\\(section|subsection)\*?\{([^}]+)\}', text)
print(f"Total headings found: {len(headings)}")
for htype, htitle in headings:
    print(f"  [{htype}] {htitle}")

tables = re.findall(r'\\begin\{table\}.*?\\caption\{([^}]+)\}', text, re.DOTALL)
print(f"\nTotal main tables: {len(tables)}")
for i, cap in enumerate(tables):
    print(f"  Table {i+1}: {cap[:80]}...")
