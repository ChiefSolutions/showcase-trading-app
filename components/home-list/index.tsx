import { useCallback } from 'react';

import { StyleSheet, View } from 'react-native';

import { FlashList } from '@shopify/flash-list';

import { CoinListItem } from '@/components/coins/coin';
import { AnimatedLogo } from '@/components/kit';
import { HOME_SECTION_TYPE } from '@/constants';
import { useHomeSectionList } from '@/hooks';

import { HomeListEmptyState } from './empty-state';
import { HomeListHeader } from './header';
import { RenderHomeListItem } from './home.types';

export const HomeList = () => {
  const data = useHomeSectionList();

  const renderItem: RenderHomeListItem = useCallback(({ item }) => {
    const { type } = item;

    switch (type) {
      case HOME_SECTION_TYPE.SECTION_LOGO:
        return <AnimatedLogo height={100} width={'100%'} />;
      case HOME_SECTION_TYPE.SECTION_HEADER:
        return <HomeListHeader {...item} />;
      case HOME_SECTION_TYPE.ITEM_ROW:
        return item.data ? <CoinListItem key={item.data.id} coin={item.data} /> : null;
      case HOME_SECTION_TYPE.EMPTY_STATE:
        return <HomeListEmptyState message={item.message ?? ''} />;
      default:
        return null;
    }
  }, []);

  return (
    <View style={styles.flashListContainer}>
      <FlashList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      ></FlashList>
    </View>
  );
};

const styles = StyleSheet.create({
  flashListContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
