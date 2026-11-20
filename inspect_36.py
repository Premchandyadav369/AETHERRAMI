import json

with open('scratch/enriched_targets_36.json', 'r', encoding='utf-8') as f:
    targets = json.load(f)

for i, t in enumerate(targets):
    name = t.get('name') or t.get('target') or 'Unknown'
    pdb = t.get('pdb') or 'None'
    cat = t.get('category') or t.get('class') or 'General'
    dis = t.get('disease') or t.get('indication') or 'None'
    print(f"{i+1:02d}. {name} (PDB: {pdb}) - Category: {cat} - Indication: {dis}")
