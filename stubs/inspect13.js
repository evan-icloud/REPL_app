const fs = require('fs');
const content = fs.readFileSync('D:/safe/investApp/android/app/src/main/assets/index.android.bundle', 'utf8');

// Find which modules reference module 1268 (the RNSVGCircle requireNativeComponent call)
const modulePattern = /__d\(function\([^)]*\)\{([\s\S]*?)\},(\d+),(\[[^\]]*\])\)/g;
let m;
const modules = {};
while ((m = modulePattern.exec(content)) !== null) {
  modules[m[2]] = { body: m[1] };
}

// Find module 1268's body
const m1268 = modules['1268'];
console.log('Module 1268 body:');
console.log(m1268.body);

// Find what uses 1268
for (const [id, mod] of Object.entries(modules)) {
  if (mod.body.includes('1268)') || mod.body.includes(',1268,') || mod.body.includes('1268]')) {
    // Quick check
    const idx = mod.body.indexOf('1268');
    if (idx > 0 && (mod.body[idx+4] === ')' || mod.body[idx+4] === ',' || mod.body[idx+4] === ']')) {
      console.log(`Module ${id} references 1268: ${mod.body.substring(Math.max(0, idx-30), idx+30)}`);
    }
  }
}
