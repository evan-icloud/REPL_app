const fs = require('fs');
const path = require('path');

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.bin') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.js')) out.push(full);
  }
  return out;
}

const roots = [
  'D:/safe/invest-app-taro/node_modules/@tarojs/taro-rn/dist',
  'D:/safe/invest-app-taro/node_modules/@tarojs/runtime-rn/dist',
  'D:/safe/invest-app-taro/node_modules/@tarojs/components-rn/dist',
];

// Old broken paths to find
const oldPaths = [
  'D:\\safe\\invest-app-taro\\stubs\\\\',
  'D:\\safe\\invest-app-taro\\stubs\\',
  'D:safeinvest-app-tarostubs\\\\',
  'D:safeinvest-app-tarostubs\\',
  'D:/safe/invest-app-taro/stubs\\\\',
];

// Map stub file name -> new correct path
const stubFiles = [
  'expo-camera.js', 'expo-av.js', 'expo.js', 'react-native-maps.js',
  'react-native-webview.js', 'react-native-image-zoom-viewer.js',
  'react-native-pager-view.js', 'image-resizer.js', 'camera-roll.js',
  'clipboard.js', 'geolocation.js', 'netinfo.js', 'slider.js',
  'ant-design-rn.js',
];

let patched = 0;
for (const root of roots) {
  if (!fs.existsSync(root)) continue;
  for (const file of walk(root)) {
    let text = fs.readFileSync(file, 'utf8');
    let original = text;
    for (const stub of stubFiles) {
      // Find any quote + any path + stub + .js + quote
      const escapedStub = stub.replace(/[/.]/g, '\\$&');
      const re = new RegExp(`(['"])([^'"]*?)${escapedStub}(['"])`, 'g');
      text = text.replace(re, `$1D:/safe/invest-app-taro/stubs/${stub}$3`);
    }
    if (text !== original) {
      fs.writeFileSync(file, text);
      patched++;
      console.log('re-patched', file);
    }
  }
}
console.log('total re-patches:', patched);
