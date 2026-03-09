import { FC, memo, useCallback, useMemo, useState } from 'react';

import { StyleSheet, View } from 'react-native';

import { FlashList } from '@shopify/flash-list';

import { CoinListItem } from '@/components/coins/coin';
import { Coin } from '@/components/coins/types';
import { Heading } from '@/components/kit';
import coins from '@/data/crypto.json';
import { useStyles } from '@/theme';
import { ThemeDefinitionColors } from '@/theme/types';
import { getCoinsByCount } from '@/utils';

const WatchListComponent: FC = () => {
  // TODO: replace with API Call
  const [data] = useState<Coin[]>(coins.data as Coin[]);
  const styles = useStyles(_styles);

  const list = useMemo(() => {
    return getCoinsByCount(data, 5);
  }, [data]);

  const keyExtractor = (item: Coin) => item.id;
  const renderCoinItem = useCallback(({ item }: { item: Coin }) => {
    return <CoinListItem coin={item} />;
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ paddingBottom: 16 }}>
        <Heading title={'My Watchlist'} copy={'Coins that have been added to your watchlist.'} />
      </View>
      <FlashList data={list} keyExtractor={keyExtractor} renderItem={renderCoinItem} />
    </View>
  );
};

export const WatchList = memo(WatchListComponent);

const _styles = (colors: ThemeDefinitionColors) => {
  return StyleSheet.create({
    container: {
      marginTop: 16,
      flex: 1,
    },
  });
};
