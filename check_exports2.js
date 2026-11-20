const fs = require('fs');
const content = fs.readFileSync('frontend/app/drug-library/drugLibraryData.ts', 'utf-8');

console.log('DRUG_LIBRARY_DATA pos:', content.indexOf('export const DRUG_LIBRARY_DATA'));
console.log('ALL_DRUG_LIBRARY pos:', content.indexOf('export const ALL_DRUG_LIBRARY'));

// Let's see the text around ALL_DRUG_LIBRARY
const idx2 = content.indexOf('export const ALL_DRUG_LIBRARY');
console.log(content.substring(idx2, idx2 + 1000));
