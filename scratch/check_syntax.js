const fs = require('fs');
const html = fs.readFileSync('frontend/index.html', 'utf8');

const babelMatch = html.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);
if (!babelMatch) {
  console.log('No babel script found!');
  process.exit(1);
}

const babelCode = babelMatch[1];
console.log('Babel code length:', babelCode.length);

// Let's write the babel code to a temporary js file and run node --check or inspect
fs.writeFileSync('scratch/extracted_babel.jsx', babelCode, 'utf8');

// Also test if @babel/core can parse it
try {
  const babel = require('@babel/core');
  babel.transformSync(babelCode, {
    presets: ['@babel/preset-react']
  });
  console.log('Babel transform SUCCESS!');
} catch (err) {
  console.error('Babel transform ERROR:', err.message);
  if (err.loc) {
    console.error('At line:', err.loc.line, 'col:', err.loc.column);
    const lines = babelCode.split('\n');
    const start = Math.max(0, err.loc.line - 5);
    const end = Math.min(lines.length, err.loc.line + 5);
    for (let i = start; i < end; i++) {
      console.error((i + 1) + ': ' + lines[i]);
    }
  }
}
