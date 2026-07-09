const fs = require('fs');
const content = fs.readFileSync('D:/safe/investApp/android/app/src/main/assets/index.android.bundle', 'utf8');
const modulePattern = /__d\(function\([^)]*\)\{([\s\S]*?)\},(\d+),(\[[^\]]*\])\)/g;
let m;
const modules = {};
while ((m = modulePattern.exec(content)) !== null) {
  modules[m[2]] = { start: m.index, body: m[1], deps: m[3] };
}
const targets = ['1305', '1306', '1307', '1308', '1309', '1075', '218', '1220', '1337', '1400'];
for (const t of targets) {
  if (modules[t]) {
    console.log(`=== Module ${t} (deps ${modules[t].deps}) ===`);
    console.log(modules[t].body.substring(0, 500));
    console.log('---');
  }
}
