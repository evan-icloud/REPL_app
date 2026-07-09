const fs = require('fs');
const content = fs.readFileSync('D:/safe/invest-app-taro/dist/index.bundle', 'utf8');

// Find RNSVG occurrences
let idx = 0;
let count = 0;
while ((idx = content.indexOf('RNSVG', idx)) > 0 && count < 10) {
  console.log(`At ${idx}:`);
  console.log(content.substring(Math.max(0, idx - 80), Math.min(content.length, idx + 200)));
  console.log('---');
  idx += 5;
  count++;
}
