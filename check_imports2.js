const fs = require('fs');
const content = fs.readFileSync('frontend/app/drug-library/drugLibraryData.ts', 'utf-8');
console.log(content.split('\n').slice(50, 95).join('\n'));
