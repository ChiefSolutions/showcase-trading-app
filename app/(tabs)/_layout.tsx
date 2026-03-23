import React from 'react';

import { Tabs } from 'expo-router';

import { HapticTab } from '@/components/haptic-tab';
import { tabItems } from '@/configurations/tab-items';
import { useTheme } from '@/theme';
import { getTabsScreenOptions } from '@/utils';

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs screenOptions={getTabsScreenOptions(colors, HapticTab)}>
      {tabItems.map((item) => {
        return <Tabs.Screen key={item.id} name={item.name} options={item.options} />;
      })}
    </Tabs>
  );
}
