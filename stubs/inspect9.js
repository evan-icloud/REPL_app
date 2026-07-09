const fs = require('fs');
const content = fs.readFileSync('D:/safe/investApp/android/app/src/main/assets/index.android.bundle', 'utf8');
const modulePattern = /__d\(function\([^)]*\)\{([\s\S]*?)\},(\d+),(\[[^\]]*\])\)/g;
let m;
const modules = {};
while ((m = modulePattern.exec(content)) !== null) {
  modules[m[2]] = { start: m.index, body: m[1], deps: m[3] };
}

// Find module 1306 - get full body
const m1306 = modules['1306'];
const start = m1306.start;
const end = content.indexOf('])', start) + 2;
const body = content.substring(start, end);
// Find the .Constants usage and surrounding context
const constantsIdx = body.indexOf('.Constants,');
if (constantsIdx > 0) {
  console.log('Module 1306 .Constants, context:');
  console.log(body.substring(Math.max(0, constantsIdx - 500), constantsIdx + 300));
}
