const fs = require('fs');
const content = fs.readFileSync('frontend/app/diseases/diseaseData.ts', 'utf-8');
console.log('diseaseData.ts length:', content.length);
console.log('First 600 chars of diseaseData.ts:');
console.log(content.slice(0, 600));

// Count programs
const progMatches = [...content.matchAll(/id:\s*['"]([^'"]+)['"]/g)];
console.log('Matches for id:', progMatches.length);
