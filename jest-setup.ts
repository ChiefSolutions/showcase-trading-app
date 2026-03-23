import '@shopify/flash-list/jestSetup';
import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jest-utils';
import 'react-native-gesture-handler/jestSetup';

// Mock: @expo/vector-icons/MaterialIcons
jest.mock('@expo/vector-icons/MaterialIcons', () => 'MaterialIcons');

// Mock: react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = jest.requireActual('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return {
    ...Reanimated,
    useSharedValue: jest.fn(() => ({ value: 0 })),
    withTiming: jest.fn((value, _config, cb) => {
      cb?.(); // immediately finish animation
      return value;
    }),
  };
});

// Mock: react-native-worklets
jest.mock('react-native-worklets', () => ({
  ...jest.requireActual('react-native-worklets'),
  scheduleOnRN: (cb: () => void) => cb(),
}));

jest.mock('@/utils/shared/os', () => {
  return {
    __esModule: true,
    getExpoOS: jest.fn(),
  };
});

jest.mock('@/utils/shared/env-config', () => {
  return {
    __esModule: true,
    getEnvVarConfig: jest.fn().mockReturnValue({
      apiUrl: 'https://tradingapp.com/api/',
      isProduction: false,
      version: '0.1.0',
    }),
  };
});

global.fetch = jest.fn();
