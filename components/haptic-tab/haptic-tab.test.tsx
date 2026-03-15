import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import * as Haptics from 'expo-haptics';

import { HapticTab } from '@/components/haptic-tab/index';
import { Home } from '@/components/kit';
import { getExpoOS } from '@/utils';

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'Light',
  },
}));

jest.mock('@/utils/shared/os', () => {
  return {
    __esModule: true,
    getExpoOS: jest.fn(),
  };
});

const onPressIn = jest.fn();

const renderTestComponent = () => {
  render(
    <ThemeProvider value={DefaultTheme}>
      <HapticTab onPressIn={onPressIn}>
        <Home></Home>
      </HapticTab>
    </ThemeProvider>,
  );
};

describe('HapticTab', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('when rendered', () => {
    beforeEach(() => {
      (getExpoOS as jest.Mock).mockReturnValue('ios');
      renderTestComponent();
    });

    it('renders correctly', () => {
      expect(screen.getByTestId('platform-pressable')).toBeTruthy();
    });
  });

  describe('when it is ios', () => {
    beforeEach(() => {
      (getExpoOS as jest.Mock).mockReturnValue('ios');
      renderTestComponent();
    });

    it('triggers haptic feedback on iOS', () => {
      act(() => {
        fireEvent(screen.getByTestId('platform-pressable'), 'pressIn');
      });

      expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);

      expect(onPressIn).toHaveBeenCalled();
    });
  });

  describe('when it is android', () => {
    beforeEach(() => {
      (getExpoOS as jest.Mock).mockReturnValue('android');
      renderTestComponent();
    });

    it('does not trigger haptic feedback on non-iOS', () => {
      act(() => {
        fireEvent(screen.getByTestId('platform-pressable'), 'pressIn');
      });

      expect(Haptics.impactAsync).not.toHaveBeenCalled();
      expect(onPressIn).toHaveBeenCalled();
    });
  });
});
