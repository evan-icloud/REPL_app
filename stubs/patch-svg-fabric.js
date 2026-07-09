const fs = require('fs');
const path = require('path');

// Find all files in fabric/ that use codegenNativeComponent and replace them with View stubs
const fabricDir = 'D:/safe/investApp/node_modules/react-native-svg/lib/commonjs/fabric';
const paperDir = 'D:/safe/investApp/node_modules/react-native-svg/lib/commonjs/lib';

if (!fs.existsSync(fabricDir)) {
  console.log('No fabric dir, skipping');
  process.exit(0);
}

const files = fs.readdirSync(fabricDir);
let patched = 0;
for (const f of files) {
  if (!f.endsWith('.js')) continue;
  const full = path.join(fabricDir, f);
  const content = fs.readFileSync(full, 'utf8');
  if (!content.includes('codegenNativeComponent')) continue;
  const stub = `"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));
var _View = require("react-native").View;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) return obj; var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor(obj, key); if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; } return newObj; }

var _default = (function () {
  function Stub(props) {
    var children = props.children, style = props.style, rest = {};
    for (var key in props) { if (key !== 'children' && key !== 'style') rest[key] = props[key]; }
    return React.createElement(_View, Object.assign({}, rest, { style: style }), children);
  }
  Stub.displayName = 'RNSVGStub';
  return Stub;
})();

exports.default = _default;
`;
  fs.writeFileSync(full, stub);
  patched++;
}
console.log(`Patched ${patched} fabric files in ${fabricDir}`);
