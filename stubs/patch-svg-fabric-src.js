const fs = require('fs');
const path = require('path');

const fabricDir = 'D:/safe/invest-app-taro/node_modules/react-native-svg/src/fabric';

const files = fs.readdirSync(fabricDir).filter(f => f.endsWith('NativeComponent.ts'));
let patched = 0;
for (const f of files) {
  const full = path.join(fabricDir, f);
  let content = fs.readFileSync(full, 'utf8');
  if (!content.includes('codegenNativeComponent')) continue;
  // Replace the entire file with a View-based stub
  const stub = `import * as React from 'react';
import { View } from 'react-native';

const Stub = (props: any) => {
  const { children, style, ...rest } = props || {};
  return React.createElement(View, { style, ...rest }, children);
};
Stub.displayName = 'RNSVGStub';
export default Stub;
`;
  fs.writeFileSync(full, stub);
  patched++;
}
console.log(`Patched ${patched} files in ${fabricDir}`);
