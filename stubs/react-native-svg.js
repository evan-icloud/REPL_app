// Stub for react-native-svg - provides View-based fallbacks for all SVG elements
// Used to avoid codegenNativeComponent / fabric view manager requirements
// that don't work reliably on Paper renderer with RN 0.74.
const React = require('react');
const { View, Text } = require('react-native');

const Stub = (props) => {
  const { children, style, ...rest } = props || {};
  return React.createElement(View, { style, ...rest }, children);
};
const TextStub = (props) => {
  const { children, style, ...rest } = props || {};
  return React.createElement(Text, { style, ...rest }, children);
};

// All shape elements become plain Views
const makeStub = (displayName) => {
  const C = (props) => {
    const { children, style, ...rest } = props || {};
    return React.createElement(View, { style, ...rest }, children);
  };
  C.displayName = displayName;
  return C;
};

const Svg = makeStub('Svg');
Svg.displayName = 'Svg';

module.exports = {
  Svg,
  default: Svg,
  // Shapes
  Circle: makeStub('Circle'),
  Ellipse: makeStub('Ellipse'),
  G: makeStub('G'),
  Line: makeStub('Line'),
  LinearGradient: makeStub('LinearGradient'),
  RadialGradient: makeStub('RadialGradient'),
  Rect: makeStub('Rect'),
  Defs: makeStub('Defs'),
  Path: makeStub('Path'),
  Polygon: makeStub('Polygon'),
  Polyline: makeStub('Polyline'),
  Text: TextStub,
  TSpan: TextStub,
  TextPath: makeStub('TextPath'),
  // Common
  ClipPath: makeStub('ClipPath'),
  Mask: makeStub('Mask'),
  Pattern: makeStub('Pattern'),
  Symbol: makeStub('Symbol'),
  Use: makeStub('Use'),
  // Stroke props noop
  // No-op functions
  parse: () => ({}),
};
