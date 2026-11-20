const ts = require('./frontend/node_modules/typescript');
const fs = require('fs');

const code = `
export const hello: string = "world";
`;

const res = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
console.log('Transpiled result:', res.outputText);
