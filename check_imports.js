const fs = require('fs');
const content = fs.readFileSync('frontend/app/drug-library/drugLibraryData.ts', 'utf-8');

const matches = [...content.matchAll(/ALL_DISEASE_PROGRAMS/g)];
console.log('ALL_DISEASE_PROGRAMS occurrences:', matches.length);

// See imports
console.log('First 50 lines of drugLibraryData.ts:');
console.log(content.split('\n').slice(0, 50).join('\n'));
