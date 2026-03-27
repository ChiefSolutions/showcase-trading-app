import { memo, useEffect, useMemo, useState, useTransition } from 'react';

import { ActivityIndicator, Keyboard, Pressable, View } from 'react-native';

import { useIsFocused, useRoute } from '@react-navigation/core';
import { RouteProp } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { ListRenderItemInfo } from '@shopify/flash-list/src/FlashListProps';
import { useShallow } from 'zustand/react/shallow';

import { Text } from '@/components/kit';
import { MarketListItem } from '@/components/markets/list-tem';
import { Market, MarketTabItem } from '@/components/markets/markets.types';
import { MarketSearch } from '@/components/markets/search';
import { Config } from '@/configurations/env-var';
import { TEXT_TYPE } from '@/constants';
import { DEFAULT_FETCH_ABORTED_REASON, MARKET_CATEGORY_DESCRIPTION } from '@/constants/markets';
import { useFetch } from '@/hooks/fetch';
import { useMarketsStore, useWatchlistStore } from '@/stores';

const mapper: { [key: string]: string } = {
  Equities: 'equity',
  Forex: 'fx',
  Crypto: 'crypto',
};

const MarketCategoryScreen = () => {
  const isFocused = useIsFocused();
  const { params } = useRoute<RouteProp<Record<string, { tab: MarketTabItem }>, string>>();
  const [search, setSearch] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const [tabData, setTabData] = useState<Market[] | null>(null);
  const tab = params.tab;
  const { loading, data, fetchData } = useFetch<Market[]>(`${Config.apiUrl}markets/all?category=${mapper[tab.name]}`, [], false);
  const setMarkets = useMarketsStore(useShallow((s) => s.setMarkets));
  const { watchedMarketIds, toggle } = useWatchlistStore(useShallow((s) => ({ watchedMarketIds: s.marketIds, toggle: s.toggle })));

  const list = useMemo(() => {
    if (!search && tabData) {
      return tabData;
    }

    if (!search || !tabData) {
      return [];
    }

    const value = search.toLowerCase();

    return tabData.filter(
      (item) =>
        item.short_name.toLowerCase().includes(value) ||
        item.long_name.toLowerCase().includes(value) ||
        item.symbol.toLowerCase().includes(value),
    );
  }, [search, tabData]);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      if (isFocused) {
        await fetchData({ controller });
        return;
      }
    })();

    return () => {
      controller.abort(DEFAULT_FETCH_ABORTED_REASON);
      setSearch('');
    };
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
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <View style={{ marginTop: 16 }}>
        <MarketSearch onChange={setSearch} value={search} placeholder={`Search for ${tab.name}`} />
      </View>
      <View style={{ marginVertical: 16, width: '100%', height: 32 }}>
        <Text type={TEXT_TYPE.copyLarge}>{MARKET_CATEGORY_DESCRIPTION[tab.name]}</Text>
      </View>
      {tabData && (
        <FlashList data={list} renderItem={renderItem} keyExtractor={keyExtractor} showsVerticalScrollIndicator={false}></FlashList>
      )}
    </Pressable>
  );
};

export const MarketCategory = memo(MarketCategoryScreen);
