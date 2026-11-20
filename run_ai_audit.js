const fs = require('fs');
const path = require('path');
const AIDetector = require('./.agents/skills/avoid-ai-writing/detector/patterns.js');

const filesToAudit = [
  'paper_latex_nature_methods/cover_letter.tex',
  'paper_latex_nature_methods/main.tex',
  'paper_latex_nature_methods/supplementary_information.tex',
  'paper_latex_nmi/cover_letter.tex',
  'paper_latex_nmi/main.tex',
  'paper_latex_nmi/supplementary_information.tex'
];

console.log('========================================================================');
console.log('AVOID-AI-WRITING DETECTOR AUDIT REPORT (DETECTION PASS 1)');
console.log('========================================================================\n');

for (const relPath of filesToAudit) {
  const fullPath = path.resolve(relPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`[SKIP] File not found: ${relPath}`);
    continue;
  }

  let text = fs.readFileSync(fullPath, 'utf8');

  // Strip bibliography from prose analysis per academic standards
  if (text.includes('\\begin{thebibliography}')) {
    text = text.split('\\begin{thebibliography}')[0];
  }

  // Strip LaTeX comments for prose analysis
  const lines = text.split('\n').filter(l => !l.trim().startsWith('%'));
  const cleanText = lines.join('\n');

  const result = AIDetector.analyzeText(cleanText, { context: 'technical' });

  console.log(`FILE: ${relPath}`);
  console.log(`  Score: ${result.score}/100 | Label: ${result.label} | Issues Count: ${result.issues ? result.issues.length : 0}`);

  if (result.issues && result.issues.length > 0) {
    // Group by severity or type
    const issuesByType = {};
    for (const issue of result.issues) {
      const key = `${issue.type} (${issue.severity || 'unspecified'})`;
      if (!issuesByType[key]) issuesByType[key] = [];
      issuesByType[key].push(issue);
    }

    for (const [key, issues] of Object.entries(issuesByType)) {
      console.log(`    - ${key}: ${issues.length} occurrence(s)`);
      for (const iss of issues.slice(0, 3)) {
        const snippet = iss.match || iss.text || (cleanText.substring(Math.max(0, iss.offset - 15), Math.min(cleanText.length, iss.offset + 30)));
        console.log(`        Match: "${snippet.replace(/\n/g, ' ')}" -> Suggestion: ${iss.suggestion || 'rewrite'}`);
      }
    }
  }
  console.log('------------------------------------------------------------------------\n');
}
