const fs = require('fs');
const content = fs.readFileSync('D:/safe/investApp/android/app/src/main/assets/index.android.bundle', 'utf8');

// Metro bundle format: __d(function(...) { ... }, MODULE_ID, [deps]);
// The body is a string, not actual code in our regex
// Use a simpler approach - find __d( ... ,1306, deps)

const m1306Idx = content.indexOf(',1306,[');
console.log('Module 1306 marker at:', m1306Idx);
if (m1306Idx > 0) {
  // Module starts at the last __d( before this position
  const start = content.lastIndexOf('__d(', m1306Idx);
  // Find matching ]) at end - need to count brackets carefully
  let pos = content.indexOf('])', m1306Idx) + 2;
  // Wait - the ) before ] is the __d close. Let me re-search
  // Actually format is: __d(function...{...},1306,[deps]);
  // Find the closing __d:
  // Look for ); after the deps ]
  let endPos = content.indexOf(');', m1306Idx);
  if (endPos > 0) {
    endPos += 2;
    const body = content.substring(start, endPos);
    console.log('Body length:', body.length);
    const constIdx = body.indexOf('.Constants');
    console.log('Has .Constants:', constIdx > 0);
    if (constIdx > 0) {
      console.log('Context around .Constants:');
      console.log(body.substring(Math.max(0, constIdx - 300), constIdx + 300));
    }
    // Save snippet
    fs.writeFileSync('D:/safe/invest-app-taro/stubs/m1306.js', body);
  }
}
