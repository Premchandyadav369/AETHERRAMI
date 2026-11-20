const fs = require('fs');
const content = fs.readFileSync('frontend/app/drug-library/drugLibraryData.ts', 'utf-8');

const marker = 'export const DRUG_LIBRARY: DrugRecord[] = ';
const idx = content.indexOf(marker);
console.log('drugLibrary marker idx:', idx);
if (idx !== -1) {
  const afterMarker = content.substring(idx + marker.length);
  // Note that drugLibraryData is typescript with unquoted keys, let's inspect the first 2000 chars of afterMarker
  console.log(afterMarker.slice(0, 1500));
}
