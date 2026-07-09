const fs = require('fs');
const content = fs.readFileSync('D:/safe/investApp/android/app/src/main/assets/index.android.bundle', 'utf8');

// Find all SearchBar,{} usage and identify the parent page
const idx = content.indexOf('SearchBar,{placeholder:');
console.log('Context around first SearchBar:');
console.log(content.substring(Math.max(0, idx - 1500), idx + 100));
