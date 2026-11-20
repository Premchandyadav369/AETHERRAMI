const fs = require('fs');
const content = fs.readFileSync('frontend/app/drug-library/drugLibraryData.ts', 'utf-8');
const exportMatches = [...content.matchAll(/export const ([a-zA-Z0-9_]+)/g)];
console.log('Exports found in drugLibraryData.ts:', exportMatches.map(m => m[1]));
