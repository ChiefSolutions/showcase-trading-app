import { FC, memo } from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { MarketCategory } from '../category';
import { MarketTabsProps } from '../markets.types';

const Tab = createMaterialTopTabNavigator();

export const MarketTabsComponent: FC<MarketTabsProps> = ({ items }) => {
  return (
    <Tab.Navigator>
      {items.map((item) => {
        return <Tab.Screen initialParams={{ tab: item }} key={item.id} name={item.name} component={MarketCategory} />;
      })}
    </Tab.Navigator>
  );
};

export const MarketTabs = memo(MarketTabsComponent);
