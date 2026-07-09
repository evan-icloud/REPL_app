const fs = require('fs');
const content = fs.readFileSync('D:/safe/investApp/android/app/src/main/assets/index.android.bundle', 'utf8');
const modulePattern = /__d\(function\([^)]*\)\{([\s\S]*?)\},(\d+),(\[[^\]]*\])\)/g;
let m;
const modules = {};
while ((m = modulePattern.exec(content)) !== null) {
  modules[m[2]] = { start: m.index, body: m[1], deps: m[3] };
}

const m1306 = modules['1306'];
const start = m1306.start;
const end = content.indexOf('])', start) + 2;
const body = content.substring(start, end);
console.log('Body length:', body.length);
console.log('Has .Constants:', body.includes('.Constants'));
console.log('Has Constants:', body.includes('Constants'));
console.log('All .Constants occurrences:');
let idx = 0;
let count = 0;
while ((idx = body.indexOf('.Constants', idx)) > 0 && count < 5) {
  console.log(`  At ${idx}:`, body.substring(Math.max(0, idx - 200), idx + 200));
  idx += 10;
  count++;
}
