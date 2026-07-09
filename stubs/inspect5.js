const fs = require('fs');
const content = fs.readFileSync('D:/safe/investApp/android/app/src/main/assets/index.android.bundle', 'utf8');
const modulePattern = /__d\(function\([^)]*\)\{([\s\S]*?)\},(\d+),(\[[^\]]*\])\)/g;
let m;
const modules = {};
while ((m = modulePattern.exec(content)) !== null) {
  modules[m[2]] = { start: m.index, body: m[1] + '||END||', deps: m[3] };
}

// Find module that contains the SearchBar usage in JSX
for (const [id, mod] of Object.entries(modules)) {
  if (mod.body.includes('.SearchBar,{placeholder')) {
    console.log(`SearchBar used in module ${id} (deps ${mod.deps})`);
    // Get the full module body
    const fullMatch = content.substring(mod.start, mod.start + 50000);
    const end = fullMatch.indexOf('||END||');
    if (end > 0) {
      const body = fullMatch.substring(0, end);
      // Find d[11] context
      const match = body.match(/var\s+\w+=r\(d\[11\]\)|d\[11\][^,;]{0,80}SearchBar/);
      if (match) {
        console.log('Context:', match[0]);
      }
      // Find all d[11] usage
      const d11uses = body.match(/r\(d\[11\]\)\.SearchBar|d\[11\][^,;]{0,40}/g);
      if (d11uses) console.log('d[11] uses:', d11uses.slice(0, 5));
    }
  }
}
