const fs = require('fs');
const content = fs.readFileSync('D:/safe/investApp/android/app/src/main/assets/index.android.bundle', 'utf8');

const inspect = (id) => {
  const markerIdx = content.indexOf(`,${id},[`);
  if (markerIdx < 0) return null;
  const start = content.lastIndexOf('__d(', markerIdx);
  const endIdx = content.indexOf(');', markerIdx) + 2;
  return content.substring(start, endIdx);
};

const targets = ['1169', '1296', '1268', '1292', '1337', '1400'];
for (const t of targets) {
  const body = inspect(t);
  if (body) {
    console.log(`=== Module ${t} ===`);
    console.log(body.substring(0, 1500));
    console.log('---');
  } else {
    console.log(`Module ${t} not found`);
  }
}
