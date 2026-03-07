import { HapticTab } from '@/components/haptic-tab';
import { ThemeDefinitionColors } from '@/theme/types';

export const getTabsScreenOptions = (colors: ThemeDefinitionColors) => {
  return {
    tabBarActiveTintColor: colors.emphasis,
    tabBarInactiveTintColor: colors.subtle,
    headerShown: true,
    tabBarButton: HapticTab,
    tabBarStyle: {
      height: 60,
      paddingTop: 5,
      borderTopWidth: 1,
      borderTopColor: colors.onSurface,
      elevation: 0,
    },
  };
};
