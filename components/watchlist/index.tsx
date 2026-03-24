import { FC, memo, useCallback } from 'react';

import { StyleSheet, View } from 'react-native';

import { FlashList } from '@shopify/flash-list';

import { Heading } from '@/components/kit';
import { MarketListItem } from '@/components/markets/list-tem';
import { Market } from '@/components/markets/markets.types';
import { useStyles } from '@/theme';

const WatchListComponent: FC = () => {
  const styles = useStyles(_styles);

  const keyExtractor = (item: Market) => item.id;
  const renderCoinItem = useCallback(({ item }: { item: Market }) => {
    return <MarketListItem market={item} toggle={jest.fn} isWatched={false} />;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Heading testID="watchlist-heading" title={'My Watchlist'} copy={'Markets that have been added to your watchlist.'} />
      </View>
      <FlashList
        testID={'watchlist-flash-list'}
        data={[]}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderCoinItem}
      />
    </View>
  );
};

export const WatchList = memo(WatchListComponent);

const _styles = () => {
  return StyleSheet.create({
    container: {
      marginTop: 16,
      flex: 1,
    },
    headingContainer: {
      paddingBottom: 16,
    },
  });
};
