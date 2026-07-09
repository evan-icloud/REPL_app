const fs = require('fs');
const path = require('path');
function walk(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name === 'node_modules') continue;
    const f = path.join(d, e.name);
    if (e.isDirectory()) walk(f, o);
    else if (e.name.endsWith('.js')) o.push(f);
  }
  return o;
}
const root = 'D:/safe/invest-app-taro/node_modules/react-native-svg';
const files = walk(root);
for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  if (c.includes('requireNativeComponent') && c.includes('RNSVG')) {
    console.log(f);
  }
}
console.log('---codegenNativeComponent files---');
for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  if (c.includes('codegenNativeComponent')) {
    console.log(f);
  }
}
