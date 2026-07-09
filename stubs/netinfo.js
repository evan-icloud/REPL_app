// Stub for unused optional module
module.exports = {
  fetch: () => Promise.resolve({ isConnected: true, type: 'unknown' }),
  addEventListener: () => () => {},
  default: { fetch: () => Promise.resolve({ isConnected: true }) },
};
