// Stub for expo-camera-like module imported by @tarojs/taro-rn/dist/lib/scanCode
// Mirrors expo-camera API surface needed by Taro scanCode runtime
const { PermissionsAndroid } = require('react-native');

const PermissionStatus = {
  GRANTED: 'granted',
  DENIED: 'denied',
  UNDETERMINED: 'undetermined',
};

async function requestPermissionsAsync() {
  try {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'Allow camera access to scan codes',
        buttonPositive: 'OK',
      }
    );
    const granted = result === PermissionsAndroid.RESULTS.GRANTED;
    return {
      granted,
      status: granted ? PermissionStatus.GRANTED : PermissionStatus.DENIED,
    };
  } catch (e) {
    return { granted: false, status: PermissionStatus.DENIED };
  }
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

module.exports = {
  BarCodeScanner,
  BarCodeType,
  PermissionStatus,
  requestPermissionsAsync,
};
module.exports.default = module.exports;