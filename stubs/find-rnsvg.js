const fs = require('fs');
const content = fs.readFileSync('D:/safe/invest-app-taro/dist/index.bundle', 'utf8');

// Find "requireNativeComponent" and "RNSVG" within 100 chars
let idx = 0;
let count = 0;
while ((idx = content.indexOf('requireNativeComponent', idx)) > 0 && count < 10) {
  const context = content.substring(Math.max(0, idx - 50), Math.min(content.length, idx + 200));
  if (context.includes('RNSVG')) {
    console.log(`At ${idx}:`);
    console.log(context);
    console.log('---');
    count++;
  }
  idx += 20;
}
