import { HapticTab } from '@/components/haptic-tab';
import { ThemeDefinitionColors } from '@/theme/types';
import { getTabsScreenOptions } from '@/utils';

describe('getTabsScreenOptions', () => {
  describe('when called', () => {
    it('should return the tabs screen options', () => {
      const result = getTabsScreenOptions({ emphasis: 'red', subtle: 'blue', onSurface: 'green' } as ThemeDefinitionColors, HapticTab);

      expect(result).toMatchObject({
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'blue',
        tabBarStyle: {
          borderTopColor: 'green',
        },
      });
    });
  });
});
