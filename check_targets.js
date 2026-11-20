const fs = require('fs');
const targetsFile = fs.readFileSync('frontend/app/data/targets.ts', 'utf-8');
console.log('targets.ts slice(500, 2000):');
console.log(targetsFile.slice(500, 2000));
