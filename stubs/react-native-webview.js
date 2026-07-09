// Stub for unused optional module
const React = require('react');
const { View } = require('react-native');
class WebView extends React.Component {
  render() { return React.createElement(View, this.props, this.props.children); }
}
module.exports = WebView;
module.exports.default = WebView;
