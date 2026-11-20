const fs = require('fs');
const content = fs.readFileSync('frontend/app/drug-library/drugLibraryData.ts', 'utf-8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('import')) console.log(`Line ${i+1}: ${l}`);
  if (l.includes('ALL_DISEASE_PROGRAMS')) console.log(`Line ${i+1}: ${l}`);
});
