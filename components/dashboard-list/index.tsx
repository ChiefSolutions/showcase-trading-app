import { useCallback } from 'react';

import { StyleSheet, View } from 'react-native';

import { FlashList } from '@shopify/flash-list';

import { CoinListItem } from '@/components/coins/coin';
import { AnimatedLogo } from '@/components/kit';
import { DASHBOARD_SECTION_TYPE } from '@/constants';
import { useDashboardSectionList } from '@/hooks';
import { dashboardListKeyExtractor } from '@/utils';

import { DashboardSectionListItem, RenderDashboardListItem } from './dashboard.types';
import { DashboardListEmptyState } from './empty-state';
import { DashboardListSectionHeader } from './header';

export const DashboardList = () => {
  const data = useDashboardSectionList();

  const renderItem: RenderDashboardListItem = useCallback(({ item }) => {
    const { type } = item;

    switch (type) {
      case DASHBOARD_SECTION_TYPE.SECTION_HEADER:
        return <DashboardListSectionHeader {...item} />;
      case DASHBOARD_SECTION_TYPE.ITEM_ROW:
        return item.data ? <CoinListItem key={item.data.id} coin={item.data} /> : null;
      case DASHBOARD_SECTION_TYPE.EMPTY_STATE:
        return <DashboardListEmptyState message={item.message ?? ''} />;
      default:
        return null;
    }
  }, []);

  const getItemType = useCallback((item: DashboardSectionListItem) => item.type, []);

  return (
    <View style={styles.flashListContainer}>
      <FlashList
        data={data}
        renderItem={renderItem}
        getItemType={getItemType}
        keyExtractor={dashboardListKeyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flashListContent}
        ListHeaderComponent={<AnimatedLogo height={100} width={'100%'} />}
      ></FlashList>
    </View>
  );
};

const styles = StyleSheet.create({
  flashListContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  flashListContent: {
    paddingBottom: 40,
  },
});
