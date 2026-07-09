// Stub for unused optional module
module.exports = {
  getCurrentPosition: () => Promise.resolve({ coords: { latitude: 0, longitude: 0 } }),
  watchPosition: () => ({ remove: () => {} }),
  default: { getCurrentPosition: () => Promise.resolve({ coords: {} }) },
};
