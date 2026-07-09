const fs = require('fs');
const content = fs.readFileSync('D:/safe/investApp/android/app/src/main/assets/index.android.bundle', 'utf8');
const modulePattern = /__d\(function\([^)]*\)\{([\s\S]*?)\},(\d+),(\[[^\]]*\])\)/g;
let m;
const modules = {};
while ((m = modulePattern.exec(content)) !== null) {
  modules[m[2]] = { start: m.index, body: m[1], deps: m[3] };
}

// Find module 782 (uses SearchBar)
const m782 = modules['782'];
if (m782) {
  // Get full body
  const startIdx = m782.start;
  const endIdx = content.indexOf('])', startIdx) + 2;
  const full = content.substring(startIdx, endIdx);
  console.log('Module 782 head (first 1500 chars):');
  console.log(full.substring(0, 1500));
  console.log('...');
  console.log('Module 782 SearchBar area:');
  const sbIdx = full.indexOf('.SearchBar,');
  if (sbIdx > 0) {
    console.log(full.substring(Math.max(0, sbIdx - 100), sbIdx + 400));
  }
}
