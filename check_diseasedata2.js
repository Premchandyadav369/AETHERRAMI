const fs = require('fs');
const content = fs.readFileSync('frontend/app/diseases/diseaseData.ts', 'utf-8');

const exportMatches = [...content.matchAll(/export const ([a-zA-Z0-9_]+)/g)];
console.log('Exports found in diseaseData.ts:', exportMatches.map(m => m[1]));

// Let's see how ALL_DISEASE_PROGRAMS is defined
const idx = content.indexOf('export const ALL_DISEASE_PROGRAMS');
if (idx !== -1) {
  console.log(content.slice(idx, idx + 1500));
}
