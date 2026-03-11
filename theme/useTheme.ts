import { useCallback, useMemo } from 'react';

import { useColorScheme } from 'react-native';

import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';

import { ColorSchemeMode } from '@/theme/constants';
import { ThemeDefinition, ThemeDefinitionColors, UseThemeResult } from '@/theme/types';

export const staticColors = {
  ink: '#111827',
  neutral100: '#E2E8F0',
};
const THEME: ThemeDefinition = {
  light: {
    ...DarkTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFFFFF',
      border: '#C7C7CC',
      card: '#FFFFFF',
      emphasis: '#4A5568',
      highEmphasis: '#333333',
      ink: '#111827',
      modalOverlay: 'rgba(0,0,0,0.6)',
      modalBorder: 'rgba(0, 0, 0, 0.08)',
      modalBackground: '#FFFFFF',
      onSurface: '#F2F2F2',
      primary: '#333333',
      secondary: '#696969',
      subtle: '#9DA3A4',
      surface: '#F2F2F7', //#F2F2F7 #F8F9FB
      text: '#333333',
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#000000',
      border: 'hsl(220 20% 42%)',
      card: '#000000',
      emphasis: '#E5E5E7',
      highEmphasis: '#E1E1E1',
      ink: '#E2E8F0',
      modalBackground: '#1C1C1E',
      modalBorder: 'rgba(255, 255, 255, 0.1)',
      modalOverlay: 'rgba(0,0,0,0.6)',

      onSurface: '#1E1E1E',
      primary: '#E1E1E1',
      secondary: '#9A9A9A',
      subtle: '#636366',
      surface: '#121212',
      text: '#FFFFFF',
    },
  },
};

export const useTheme: () => UseThemeResult = () => {
  const colorScheme = useColorScheme();
  const colors = colorScheme === ColorSchemeMode.light ? THEME.light.colors : THEME.dark.colors;
  const theme: Theme = colorScheme === ColorSchemeMode.light ? THEME.light : THEME.dark;
  const mode = colorScheme === ColorSchemeMode.light ? ColorSchemeMode.light : ColorSchemeMode.dark;

  return useMemo(() => {
    return {
      colors,
      mode,
      theme,
    };
  }, [colors, mode, theme]);
};

export const useStyles = <T>(cb: (colors: ThemeDefinitionColors) => T) => {
  const colorScheme = useColorScheme();

  return useCallback(() => {
    const colors = colorScheme === ColorSchemeMode.light ? THEME.light.colors : THEME.dark.colors;

    return cb(colors);
  }, [cb, colorScheme])();
};
