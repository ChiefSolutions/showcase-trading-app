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
