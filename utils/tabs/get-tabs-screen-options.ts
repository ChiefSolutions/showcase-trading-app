import { JSX } from 'react';

import { BottomTabBarButtonProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import { ThemeDefinitionColors } from '@/theme/types';

type GetTabsScreenOptions = (
  colors: ThemeDefinitionColors,
  tabBarButton: (props: BottomTabBarButtonProps) => JSX.Element,
) => BottomTabNavigationOptions;

export const getTabsScreenOptions: GetTabsScreenOptions = (colors, tabBarButton) => {
  return {
    tabBarActiveTintColor: colors.emphasis,
    tabBarInactiveTintColor: colors.subtle,
    headerShown: true,
    tabBarButton,
    tabBarStyle: {
      height: 60,
      paddingTop: 5,
      borderTopWidth: 1,
      borderTopColor: colors.onSurface,
      elevation: 0,
    },
  };
};
