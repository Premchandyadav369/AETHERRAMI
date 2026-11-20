const fs = require('fs');
const targetsFile = fs.readFileSync('frontend/app/data/targets.ts', 'utf-8');

// match "id": "..."
const targetMatches = [...targetsFile.matchAll(/"id":\s*"([^"]+)"/g)].map(m => m[1]);
console.log('Total targets in TARGETS_DATA:', targetMatches.length);
console.log('Target IDs:', targetMatches);

const drugLibraryFile = fs.readFileSync('frontend/app/drug-library/drugLibraryData.ts', 'utf-8');
const drugMatches = [...drugLibraryFile.matchAll(/id:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
console.log('Total in drugLibraryData:', drugMatches.length);
console.log('Drug IDs:', drugMatches);
