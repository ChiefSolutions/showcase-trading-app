import { FC } from 'react';

import { ThemeProvider } from '@react-navigation/native';

import { useTheme } from '@/theme';

import { withContext } from './with-context';

export const RootWithContexts = (Root: FC) => {
  const { theme } = useTheme();

  return withContext([
    {
      Provider: ThemeProvider,
      props: {
        value: theme,
      },
    },
  ])(Root);
};
