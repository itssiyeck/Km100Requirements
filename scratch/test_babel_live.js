const fs = require('fs');
const https = require('https');

const html = fs.readFileSync('frontend/index.html', 'utf8');
const babelMatch = html.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);
if (!babelMatch) {
  console.log('No babel script found');
  process.exit(1);
}
const code = babelMatch[1];

// Download babel standalone or load it
const url = 'https://unpkg.com/@babel/standalone/babel.min.js';
function fetchUrl(url, cb) {
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      const redirectUrl = res.headers.location.startsWith('http') ? res.headers.location : 'https://unpkg.com' + res.headers.location;
      fetchUrl(redirectUrl, cb);
      return;
    }
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => cb(data));
  });
}

fetchUrl(url, (data) => {
  console.log('Loaded Babel Standalone, size:', data.length);
  const vm = require('vm');
  const context = { window: {}, console: console };
  vm.createContext(context);
  vm.runInContext(data, context);
  const Babel = context.Babel || context.window.Babel;
  console.log('Babel available:', !!Babel);
  try {
    Babel.transform(code, { presets: ['react'] });
    console.log('TRANSFORM SUCCESSFUL! No syntax error in Babel script.');
  } catch (e) {
    console.error('SYNTAX ERROR IN BABEL SCRIPT:');
    console.error(e.message);
    if (e.loc) {
      console.error('Line:', e.loc.line, 'Col:', e.loc.column);
      const lines = code.split('\n');
      for (let i = Math.max(0, e.loc.line - 6); i < Math.min(lines.length, e.loc.line + 5); i++) {
        console.error(`${i + 1}: ${lines[i]}`);
      }
    }
  }
});
