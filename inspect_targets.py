import json

with open('scratch/enriched_targets_36.json', 'r', encoding='utf-8') as f:
    targets = json.load(f)

print(f"Total targets: {len(targets)}")
for i, t in enumerate(targets):
    name = t.get('name') or t.get('target') or t.get('target_name')
    pdb = t.get('pdb') or t.get('pdb_id')
    disease = t.get('disease') or t.get('indication') or t.get('disease_area')
    category = t.get('category') or t.get('class')
    print(f"{i+1:2d}. {name:20s} | PDB: {str(pdb):6s} | Disease: {str(disease):30s} | Class: {str(category)}")
