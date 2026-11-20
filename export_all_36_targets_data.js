const ts = require('./frontend/node_modules/typescript');
const fs = require('fs');
const path = require('path');

function transpileAndRequire(filePath, customModuleResolution = {}) {
  const code = fs.readFileSync(filePath, 'utf-8');
  const transpiled = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true
    }
  }).outputText;

  const m = { exports: {} };
  const customRequire = (reqPath) => {
    for (const [key, val] of Object.entries(customModuleResolution)) {
      if (reqPath.includes(key)) return val;
    }
    return require(reqPath);
  };

  const fn = new Function('exports', 'require', 'module', '__filename', '__dirname', transpiled);
  fn(m.exports, customRequire, m, filePath, path.dirname(filePath));
  return m.exports;
}

try {
  console.log('Loading targets.ts...');
  const targetsModule = transpileAndRequire('./frontend/app/data/targets.ts');
  console.log('TARGETS_DATA length:', targetsModule.TARGETS_DATA.length);

  console.log('Loading diseaseData.ts...');
  const diseaseModule = transpileAndRequire('./frontend/app/diseases/diseaseData.ts', {
    'targets': targetsModule
  });
  console.log('ALL_DISEASE_PROGRAMS length:', diseaseModule.ALL_DISEASE_PROGRAMS.length);

  console.log('Loading drugLibraryData.ts...');
  const drugModule = transpileAndRequire('./frontend/app/drug-library/drugLibraryData.ts', {
    'diseaseData': diseaseModule
  });
  console.log('ALL_DRUG_LIBRARY length:', drugModule.ALL_DRUG_LIBRARY.length);

  // Write out to json
  fs.writeFileSync('all_36_targets_and_drugs.json', JSON.stringify({
    targets: targetsModule.TARGETS_DATA,
    diseases: diseaseModule.ALL_DISEASE_PROGRAMS,
    drugs: drugModule.ALL_DRUG_LIBRARY
  }, null, 2), 'utf-8');

  console.log('Successfully wrote all_36_targets_and_drugs.json!');
} catch (e) {
  console.error('Error during extraction:', e);
}
