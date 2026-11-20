const fs = require('fs');

const targetsFile = fs.readFileSync('frontend/app/data/targets.ts', 'utf-8');
const drugLibraryFile = fs.readFileSync('frontend/app/drug-library/drugLibraryData.ts', 'utf-8');

console.log('targetsFile length:', targetsFile.length);
console.log('drugLibraryFile length:', drugLibraryFile.length);

// Count target occurrences
const targetMatches = [...targetsFile.matchAll(/id:\s*['"]([^'"]+)['"]/g)];
console.log('Targets count in targets.ts:', targetMatches.length);

const drugMatches = [...drugLibraryFile.matchAll(/id:\s*['"]([^'"]+)['"]/g)];
console.log('DrugRecords count in drugLibraryData.ts:', drugMatches.length);

