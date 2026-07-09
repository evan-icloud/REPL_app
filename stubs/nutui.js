// Catch-all stub for @nutui/* packages
// For sub-packages like @nutui/icons-react-taro etc.
const React = require('react');
const { View, Text } = require('react-native');
const Stub = (props) => {
  const { children, style, ...rest } = props || {};
  return React.createElement(View, { style, ...rest }, children);
};
module.exports = Stub;
module.exports.default = Stub;
