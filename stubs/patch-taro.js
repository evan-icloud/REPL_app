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
  'D:\\safe\\invest-app-taro\\node_modules\\@tarojs\\taro-rn\\dist',
  'D:\\safe\\invest-app-taro\\node_modules\\@tarojs\\runtime-rn\\dist',
  'D:\\safe\\invest-app-taro\\node_modules\\@tarojs\\components-rn\\dist',
];

const skip = new Set([
  'react', 'react-dom', 'react-native',
  'react/jsx-runtime', 'react/jsx-dev-runtime',
  '@tarojs/shared', '@tarojs/components-rn',
]);

const stubsDir = 'D:/safe/invest-app-taro/stubs';
const stubByName = {
  'expo-camera': 'expo-camera.js',
  'expo-av': 'expo-av.js',
  'expo-barcode-scanner': 'expo.js',
  'expo-brightness': 'expo.js',
  'expo-file-system': 'expo.js',
  'expo-image-picker': 'expo.js',
  'expo-keep-awake': 'expo.js',
  'expo-location': 'expo.js',
  'expo-sensors': 'expo.js',
  'react-native-maps': 'react-native-maps.js',
  'react-native-webview': 'react-native-webview.js',
  'react-native-image-zoom-viewer': 'react-native-image-zoom-viewer.js',
  'react-native-pager-view': 'react-native-pager-view.js',
  '@bam.tech/react-native-image-resizer': 'image-resizer.js',
  '@react-native-camera-roll/camera-roll': 'camera-roll.js',
  '@react-native-clipboard/clipboard': 'clipboard.js',
  '@react-native-community/geolocation': 'geolocation.js',
  '@react-native-community/netinfo': 'netinfo.js',
  '@react-native-community/slider': 'slider.js',
  '@ant-design/react-native': 'ant-design-rn.js',
};

let patched = 0;
for (const root of roots) {
  if (!fs.existsSync(root)) continue;
  for (const file of walk(root)) {
    let text = fs.readFileSync(file, 'utf8');
    let changed = false;
    for (const [name, stub] of Object.entries(stubByName)) {
      // match: import ... from 'name'  or  from "name"
      const escaped = name.replace(/[/.]/g, '\\$&');
      const re1 = new RegExp(`(from\\s+['"])${escaped}(['"])`, 'g');
      const newText = text.replace(re1, `$1${stubsDir}\\\\${stub}$2`);
      if (newText !== text) {
        text = newText;
        changed = true;
        patched++;
      }
    }
    if (changed) {
      fs.writeFileSync(file, text);
      console.log('patched', file);
    }
  }
}
console.log('total patches:', patched);
