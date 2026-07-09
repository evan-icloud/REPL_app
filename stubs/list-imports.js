const fs = require('fs');
const path = require('path');

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.bin') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.js')) out.push(full);
  }
  return out;
}

const roots = [
  'D:\\safe\\invest-app-taro\\node_modules\\@tarojs\\taro-rn\\dist',
  'D:\\safe\\invest-app-taro\\node_modules\\@tarojs\\runtime-rn\\dist',
  'D:\\safe\\invest-app-taro\\node_modules\\@tarojs\\components-rn\\dist',
  'D:\\safe\\invest-app-taro\\node_modules\\@tarojs\\taro\\dist',
];

const external = new Set();
for (const root of roots) {
  if (!fs.existsSync(root)) continue;
  for (const file of walk(root)) {
    const text = fs.readFileSync(file, 'utf8');
    const re = /import\s+[^'"]*['"]([^'"./][^'"]*)['"]/g;
    let m;
    while ((m = re.exec(text)) !== null) {
      // resolve scoped to root
      let name = m[1];
      if (name.startsWith('@')) {
        const parts = name.split('/');
        name = parts.slice(0, 2).join('/');
      } else {
        name = name.split('/')[0];
      }
      external.add(name);
    }
  }
}

// Filter out built-ins and react/taro aliases
const skip = new Set([
  'react', 'react-dom', 'react-native',
  'react/jsx-runtime', 'react/jsx-dev-runtime',
]);
const filtered = [...external].filter(n => !skip.has(n)).sort();
console.log(filtered.join('\n'));
