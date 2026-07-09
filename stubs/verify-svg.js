const fs = require('fs');
const c = fs.readFileSync('D:/safe/invest-app-taro/dist/index.bundle', 'utf8');
console.log('Has codegenNativeComponent:', c.includes('codegenNativeComponent'));
console.log('Has RNSVGCircle string:', c.includes('RNSVGCircle'));
console.log('Has requireNativeComponent RNSVG:', c.includes('requireNativeComponent') && c.includes('RNSVG'));
console.log('Bundle size:', c.length);
