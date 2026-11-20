import re
import json

with open('frontend/app/drug-library/drugLibraryData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's see the structure of drugLibraryData.ts
print("First 500 chars of drugLibraryData.ts:")
print(text[:500])

with open('frontend/app/data/targets.ts', 'r', encoding='utf-8') as f:
    t_text = f.read()

print("\nFirst 500 chars of targets.ts:")
print(t_text[:500])
