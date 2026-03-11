import { Theme } from '@react-navigation/native';

export type ThemeDefinitionColors = {
  emphasis: string;
  highEmphasis: string;
  ink: string;
  onSurface: string;
  modalBackground: string;
  modalOverlay: string;
  modalBorder: string;
  secondary: string;
  subtle: string;
  surface: string;
} & Theme['colors'];

interface ThemeDefinitionMode {
  dark: boolean;
  colors: ThemeDefinitionColors;
  fonts: Theme['fonts'];
}

export type ThemeDefinition = {
  dark: ThemeDefinitionMode;
  light: ThemeDefinitionMode;
};

export type UseThemeResult = {
  colors: ThemeDefinitionColors;
  mode: 'light' | 'dark';
  theme: Theme;
};
