import { useColorScheme } from 'react-native';

import { renderHook } from '@testing-library/react-native';

import { ColorSchemeMode } from '@/theme/constants';
import { useTheme } from '@/theme/index';

const mockUseColorScheme = useColorScheme as jest.Mock;
describe('useTheme', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when the color scheme is light', () => {
    beforeEach(() => {
      mockUseColorScheme.mockReturnValue(ColorSchemeMode.light);
    });

    it('should return the theme in light mode', () => {
      const { result } = renderHook(() => useTheme());

      expect(result.current.mode).toEqual(ColorSchemeMode.light);
    });
  });

  describe('when the color scheme is light', () => {
    beforeEach(() => {
      mockUseColorScheme.mockReturnValue(ColorSchemeMode.dark);
    });

    it('should return the theme in light mode', () => {
      const { result } = renderHook(() => useTheme());

      expect(result.current.mode).toEqual(ColorSchemeMode.dark);
    });
  });
});
