const fs = require('fs');
const content = fs.readFileSync('D:/safe/investApp/android/app/src/main/assets/index.android.bundle', 'utf8');

// Find "Constants" and "SearchBar" usage locations
['SearchBar', 'Constants', 'enableScreens'].forEach(keyword => {
  const positions = [];
  let idx = 0;
  while ((idx = content.indexOf(keyword, idx)) > 0) {
    positions.push(idx);
    idx += keyword.length;
  }
  console.log(`\n=== "${keyword}" appears ${positions.length} times ===`);
  for (const p of positions.slice(0, 3)) {
    const start = Math.max(0, p - 200);
    const end = Math.min(content.length, p + 200);
    console.log('---');
    console.log(content.substring(start, end));
  }
});
