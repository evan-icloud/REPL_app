// Comprehensive stub for react-native-root-siblings
// Provides Portal.Host and RootSiblingsManager needed by Taro/nutui on RN
const React = require('react');
const { View, Text, AppRegistry } = require('react-native');

class FakeRootSiblings {
  constructor(_children) {}
  destroy() {}
  update(_children) {}
}

const RootSiblingsManager = {
  createRootSibling: (children) => new FakeRootSiblings(children),
  rootSibling: (children) => new FakeRootSiblings(children),
};

const PortalHost = ({ children }) => {
  return React.createElement(View, { style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } }, children);
};

const PortalProvider = PortalHost;
const Portal = PortalHost;
const Host = PortalHost;

class RootSiblings extends React.Component {
  render() {
    return React.createElement(PortalHost, null, this.props.children);
  }
}

module.exports = {
  RootSiblings,
  RootSiblingsManager,
  Portal,
  PortalProvider,
  PortalHost,
  Host,
  default: { Portal, PortalHost, PortalProvider, Host, RootSiblings, RootSiblingsManager },
};
