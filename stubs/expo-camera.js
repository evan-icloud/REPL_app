// Comprehensive stub for expo-camera (used by Taro scanCode on RN)
const React = require('react');
const { View, Text, PermissionsAndroid } = require('react-native');

const PermissionStatus = {
  GRANTED: 'granted',
  DENIED: 'denied',
  UNDETERMINED: 'undetermined',
};

async function requestPermissionsAsync() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'Allow camera access to scan codes',
        buttonPositive: 'OK',
      }
    );
    return { granted: granted === PermissionsAndroid.RESULTS.GRANTED, status: granted === PermissionsAndroid.RESULTS.GRANTED ? PermissionStatus.GRANTED : PermissionStatus.DENIED };
  } catch (e) {
    return { granted: false, status: PermissionStatus.DENIED };
  }
}

async function getPermissionsAsync() {
  return { granted: true, status: PermissionStatus.GRANTED };
}

const BarCodeType = {
  aztec: 'AZTEC',
  codabar: 'CODABAR',
  code39: 'CODE_39',
  code93: 'CODE_93',
  code128: 'CODE_128',
  code39mod43: 'CODE_93',
  datamatrix: 'DATA_MATRIX',
  ean13: 'EAN_13',
  ean8: 'EAN_8',
  interleaved2of5: 'ITF',
  itf14: 'ITF_14',
  maxicode: 'MAXICODE',
  pdf417: 'PDF_417',
  qr: 'QR',
  rss14: 'RSS14',
  rssexpanded: 'RSS_EXPANDED',
  upc_a: 'UPC_A',
  upc_e: 'UPC_E',
  upc_ean: 'UPC_EAN',
};

const BarCodeScanner = {
  Constants: { BarCodeType },
  scanFromURLAsync: async () => [],
  scanFromURL: () => Promise.resolve([]),
};

const Camera = React.forwardRef((props, ref) => {
  return React.createElement(View, { ref, style: props.style, ...props }, props.children);
});
Camera.Constants = { BarCodeType, Type: { back: 'back', front: 'front' } };

module.exports = {
  Camera,
  BarCodeScanner,
  BarCodeType,
  PermissionStatus,
  requestPermissionsAsync,
  getPermissionsAsync,
};
module.exports.default = module.exports;