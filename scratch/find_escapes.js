const fs = require('fs');
const html = fs.readFileSync('frontend/index.html', 'utf8');

const matches = html.match(/\\`/g);
console.log('Count of literal backslash backtick (\\`):', matches ? matches.length : 0);

const dollarBraceMatches = html.match(/\\\${/g);
console.log('Count of literal backslash dollar brace (\\${):', dollarBraceMatches ? dollarBraceMatches.length : 0);

// Let's print out lines containing \`
const lines = html.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('\\`') || line.includes('\\${')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
