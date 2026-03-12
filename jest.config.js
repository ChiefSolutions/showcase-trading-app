module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  testPathIgnorePatterns: [
    '/assets/',
    '/node_modules/',
    '/.expo/',
    '/docs/',
    '/examples/',
    '/packages/',
    '/scripts/',
    '/website/',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|expo.*|@expo.*|@shopify/flash-list|recyclerlistview|@react-navigation.*|@react-native-community.*|react-native-chart-kit|react-native-svg|react-native-reanimated|react-native-worklets|react-native-gesture-handler)/)',
  ],
};
