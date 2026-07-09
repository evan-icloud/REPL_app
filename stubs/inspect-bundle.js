const fs = require('fs');
const content = fs.readFileSync('D:/safe/invest-app-taro/dist/index.bundle', 'utf8');

// Find module 1138
const modulePattern = /__d\(function\([^)]*\)\{([\s\S]*?)\},(\d+),(\[[^\]]*\])\)/g;
let m;
const modules = {};
while ((m = modulePattern.exec(content)) !== null) {
  modules[m[2]] = { body: m[1], deps: m[3] };
}

// Helper to find module by index
const targets = ['1138', '1083', '1166', '1167', '1168', '1155', '1252', '1153', '1154'];
for (const t of targets) {
  if (modules[t]) {
    console.log(`=== Module ${t} (deps ${modules[t].deps}) ===`);
    console.log(modules[t].body.substring(0, 600));
    console.log('---');
  } else {
    console.log(`Module ${t} not found`);
  }
}
