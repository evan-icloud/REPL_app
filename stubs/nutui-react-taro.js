// Comprehensive stub for @nutui/nutui-react-taro
console.warn('[STUB] @nutui/nutui-react-taro loaded');
// Provides View-based fallbacks for all nutui components used by Taro business code
const React = require('react');
const { View, Text, ScrollView } = require('react-native');

const Stub = (props) => {
  const { children, style, ...rest } = props || {};
  return React.createElement(View, { style, ...rest }, children);
};
const TextStub = (props) => {
  const { children, style, ...rest } = props || {};
  return React.createElement(Text, { style, ...rest }, children);
};

const components = {
  // Form
  Button: Stub,
  Cell: Stub,
  CellGroup: Stub,
  Form: Stub,
  FormItem: Stub,
  Input: Stub,
  InputNumber: Stub,
  TextArea: Stub,
  Switch: Stub,
  Checkbox: Stub,
  CheckboxGroup: Stub,
  Radio: Stub,
  RadioGroup: Stub,
  Picker: Stub,
  Rate: Stub,
  Slider: Stub,
  Stepper: Stub,
  Uploader: Stub,
  SearchBar: Stub,
  // Display
  Tag: TextStub,
  Badge: Stub,
  Avatar: Stub,
  Empty: Stub,
  Image: Stub,
  ImagePreview: Stub,
  Card: Stub,
  Collapse: Stub,
  CollapseItem: Stub,
  Descriptions: Stub,
  EmptyImage: Stub,
  Indicator: Stub,
  NoticeBar: Stub,
  Price: Stub,
  Progress: Stub,
  Result: Stub,
  Skeleton: Stub,
  Steps: Stub,
  Swipe: Stub,
  SwipeItem: Stub,
  Table: Stub,
  Tag: TextStub,
  Timeline: Stub,
  TrendArrow: Stub,
  VirtualList: Stub,
  Watermark: Stub,
  // Feedback
  ActionSheet: Stub,
  Dialog: Stub,
  Dropdown: Stub,
  DropdownItem: Stub,
  Menu: Stub,
  MenuItem: Stub,
  Notify: Stub,
  Toast: Stub,
  // Layout
  Row: Stub,
  Col: Stub,
  Divider: Stub,
  Grid: Stub,
  GridItem: Stub,
  Layout: Stub,
  Space: Stub,
  Sticky: Stub,
  // Navigation
  Elevator: Stub,
  FixedNav: Stub,
  Indicator: Stub,
  Menu: Stub,
  NavBar: Stub,
  Pagination: Stub,
  SideNav: Stub,
  SideNavItem: Stub,
  Tab: Stub,
  Tabbar: Stub,
  TabbarItem: Stub,
  Tabs: Stub,
  TabsPane: Stub,
  // Action
  Calendar: Stub,
  Cascader: Stub,
  DatePicker: Stub,
  Signature: Stub,
  TimePicker: Stub,
  TimeSelect: Stub,
  TreeSelect: Stub,
  Uploader: Stub,
  // Config provider
  ConfigProvider: Stub,
  Locale: Stub,
  // Animations
  Animate: Stub,
};

const exports_ = components;
exports_.default = Stub;
exports_.Tag = TextStub;
module.exports = exports_;
module.exports.default = Stub;
module.exports.Tag = TextStub;
