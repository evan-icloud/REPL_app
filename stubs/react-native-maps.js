// Stub for unused optional module
const React = require('react');
const { View } = require('react-native');
class MapView extends React.Component {
  render() { return React.createElement(View, this.props, this.props.children); }
}
module.exports = MapView;
module.exports.default = MapView;
module.exports.Callout = View;
module.exports.Circle = View;
module.exports.Marker = View;
module.exports.Polygon = View;
module.exports.Polyline = View;
