import { FC, memo, useCallback } from 'react';

import { StyleSheet, View } from 'react-native';

import { FlashList } from '@shopify/flash-list';

import { DashboardListProps, DashboardSectionListItem, RenderDashboardListItem } from '@/components/dashboard-list/dashboard.types';
import { DashboardListEmptyState } from '@/components/dashboard-list/empty-state';
import { DashboardListSectionHeader } from '@/components/dashboard-list/header';
import { AnimatedLogo } from '@/components/kit';
import { MarketListItem } from '@/components/markets/list-tem';
import { DASHBOARD_SECTION_TYPE } from '@/constants';
import { useWatchlistStore } from '@/stores';
import { dashboardListKeyExtractor } from '@/utils';

const DashboardListComponent: FC<DashboardListProps> = ({ data }) => {
  const toggle = useWatchlistStore((s) => s.toggle);

  const renderItem: RenderDashboardListItem = useCallback(
    ({ item }) => {
      const { type } = item;

      switch (type) {
        case DASHBOARD_SECTION_TYPE.SECTION_HEADER:
          return <DashboardListSectionHeader {...item} />;
        case DASHBOARD_SECTION_TYPE.ITEM_ROW:
          return item.data ? <MarketListItem market={item.data} isWatched={item.isWatched} toggle={toggle} /> : null;
        case DASHBOARD_SECTION_TYPE.EMPTY_STATE:
          return <DashboardListEmptyState message={item.message ?? ''} />;
        default:
          return null;
      }
    },
    [toggle],
  );

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

export const DashboardListItems = memo(DashboardListComponent);

const styles = StyleSheet.create({
  flashListContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  flashListContent: {
    paddingBottom: 40,
  },
});
