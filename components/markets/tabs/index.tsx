import { FC, memo, useEffect, useState, useTransition } from 'react';

import { ActivityIndicator, View } from 'react-native';

import { useIsFocused } from '@react-navigation/core';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RouteProp, useRoute } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { ListRenderItemInfo } from '@shopify/flash-list/src/FlashListProps';

import { Text } from '@/components/kit';
import { MarketListItem } from '@/components/markets/list-tem';
import { Market } from '@/components/markets/markets.types';
import { Config } from '@/configurations/env-var';
import { TEXT_TYPE } from '@/constants';
import { useFetch } from '@/hooks/fetch';
import { useMarketsStore, useWatchlistStore } from '@/stores';

export interface TabItem {
  id: string;
  name: string;
  nam_upper: string;
}

interface TabsProps {
  items: TabItem[];
}

const Tab = createMaterialTopTabNavigator();

const mapper: { [key: string]: string } = {
  Equities: 'equity',
  Forex: 'fx',
  Crypto: 'crypto',
};
const MarketCategoryScreen = () => {
  const isFocused = useIsFocused();
  const { params } = useRoute<RouteProp<Record<string, { tab: TabItem }>, string>>();
  const [isPending, startTransition] = useTransition();
  const [tabData, setTabData] = useState<Market[] | null>(null);
  const tab = params.tab;
  const { loading, data, fetchData } = useFetch<Market[]>(`${Config.apiUrl}markets/all?category=${mapper[tab.name]}`, [], false);
  const setMarkets = useMarketsStore((s) => s.setMarkets);
  const { watchedMarketIds, toggle } = useWatchlistStore((s) => ({ watchedMarketIds: s.marketIds, toggle: s.toggle }));

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      if (isFocused) {
        await fetchData({ controller });
        return;
      }
    })();
  }, [fetchData, isFocused]);

  useEffect(() => {
    startTransition(async () => {
      setTabData(() => data as Market[]);
      setMarkets(data as Market[]);
    });
  }, [data, setMarkets]);

  if (loading || isPending) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text type={TEXT_TYPE.copy}>Loading…</Text>
      </View>
    );
  }

  const renderItem = (render: ListRenderItemInfo<Market>) => {
    const { item } = render;
    return <MarketListItem key={item.id} market={item} isWatched={watchedMarketIds.includes(item.id)} toggle={toggle} />;
  };

  const keyExtractor = (item: Market) => item.id;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginVertical: 16 }}>
        <Text type={TEXT_TYPE.copyLarge}>Buy and sell company shares with real-time market pricing</Text>
      </View>
      {tabData && (
        <FlashList data={tabData} renderItem={renderItem} keyExtractor={keyExtractor} showsVerticalScrollIndicator={false}></FlashList>
      )}
    </View>
  );
};

export const MarketTabsComponent: FC<TabsProps> = ({ items }) => {
  return (
    <Tab.Navigator>
      {items.map((item) => {
        return <Tab.Screen initialParams={{ tab: item }} key={item.id} name={item.name} component={MarketCategoryScreen} />;
      })}
    </Tab.Navigator>
  );
};

export const MarketTabs = memo(MarketTabsComponent);
