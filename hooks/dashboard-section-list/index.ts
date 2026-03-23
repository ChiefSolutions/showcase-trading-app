import { useEffect, useMemo } from 'react';

import { useShallow } from 'zustand/react/shallow';

import { DashboardSectionDataMap, DashboardSectionItemRow, DashboardSectionListItem } from '@/components/dashboard-list/dashboard.types';
import { dashboardListSections } from '@/configurations/dashboard-list-sections';
import { dashboardSectionNames } from '@/constants/dashboard-list';
import { useMarketsStore, useWatchlistStore } from '@/stores';

type UseDashboardSectionList = () => DashboardSectionListItem[];

const MAX_DASHBOARD_COIN_COUNT = 5;
export const useDashboardSectionList: UseDashboardSectionList = () => {
  const { loading, error, fetchPopularMarkets } = useMarketsStore();

  useEffect(() => {
    (async () => {
      await fetchPopularMarkets();
    })();
  }, [fetchPopularMarkets]);

  // TODO: coinsById fine for now. Any coin update changes the object reference. Refactor - Per‑coin subscriptions in rows Or a selector that only pulls watched IDs
  const marketsById = useMarketsStore(useShallow((s) => s.marketsById));

  const popular = useMarketsStore(useShallow((s) => s.popular));
  const watchlist = useWatchlistStore(useShallow((s) => s.getWatchedMarkets(MAX_DASHBOARD_COIN_COUNT, marketsById)));

  return useMemo(() => {
    const list: DashboardSectionListItem[] = [];
    const dataMap: DashboardSectionDataMap = {
      popular,
      watchlist,
    };

    dashboardListSections.forEach((section) => {
      if (dashboardSectionNames.includes(section.name)) {
        const data = dataMap[section.name as keyof typeof dataMap];

        list.push(section.header);
        section.hasItems = !!data.length;
        section.items = data;

        if (section.hasItems) {
          list.push(...section.items.map((item) => ({ type: 'ITEM_ROW' as const, data: item }) as DashboardSectionItemRow));
          return;
        }

        if (!section.hasItems && section.emptyState) {
          list.push(section.emptyState);
          return;
        }

        return;
      }
    });

    return list;
  }, [popular, watchlist]);
};
