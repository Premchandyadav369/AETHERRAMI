import re

text = open('frontend/app/data/targets.ts', encoding='utf-8').read()
names = re.findall(r'"name":\s*"([^"]+)"', text)
diseases = re.findall(r'"disease":\s*"([^"]+)"', text)
pdbs = re.findall(r'"pdb":\s*"([^"]+)"', text)
print(f"Total targets: {len(names)}")
for i, (n, d, p) in enumerate(zip(names, diseases, pdbs), 1):
    print(f"{i}. {d} ({n}) -> PDB: {p}")
