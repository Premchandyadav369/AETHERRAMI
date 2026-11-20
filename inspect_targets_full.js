const fs = require('fs');
const content = fs.readFileSync('frontend/app/data/targets.ts', 'utf-8');

const marker = 'export const TARGETS_DATA: Target[] = ';
const idx = content.indexOf(marker);
console.log('marker idx:', idx);
if (idx !== -1) {
  const afterMarker = content.substring(idx + marker.length);
  const endIdx = afterMarker.lastIndexOf('];');
  const jsonStr = afterMarker.substring(0, endIdx + 1);
  console.log('jsonStr starts with:', jsonStr.slice(0, 50));
  console.log('jsonStr ends with:', jsonStr.slice(-50));
  try {
    const data = JSON.parse(jsonStr);
    console.log('Successfully parsed TARGETS_DATA! Length:', data.length);
    console.log('Categories:', [...new Set(data.map(d => d.category))]);
    console.log('First target:', data[0].name, data[0].disease, data[0].frontline_drug, data[0].lead_code);
  } catch (e) {
    console.error('Parse error:', e.message);
  }
}
