import { useEffect, useMemo } from 'react';

import { useShallow } from 'zustand/shallow';

import { Coin } from '@/components/coins/types';
import { DashboardSectionDataMap, DashboardSectionItemRow, DashboardSectionListItem } from '@/components/dashboard-list/dashboard.types';
import { dashboardListSections } from '@/configurations/dashboard-list-sections';
import { dashboardSectionNames } from '@/constants/dashboard-list';
import coins from '@/data/crypto.json';
import { useCoinStore, useWatchlistStore } from '@/stores';

type UseDashboardSectionList = () => DashboardSectionListItem[];

const MAX_DASHBOARD_COIN_COUNT = 5;
export const useDashboardSectionList: UseDashboardSectionList = () => {
  useEffect(() => {
    useCoinStore.getState().setCoins(coins.data as Coin[]);
  }, []);

  // TODO: coinsById fine for now. Any coin update changes the object reference. Refactor - Per‑coin subscriptions in rows Or a selector that only pulls watched IDs
  const coinsById = useCoinStore((s) => s.coinsById);
  const popular = useCoinStore(useShallow((s) => s.getPopularCoins(MAX_DASHBOARD_COIN_COUNT)));
  const watchlist = useWatchlistStore(useShallow((s) => s.getWatchedCoins(MAX_DASHBOARD_COIN_COUNT, coinsById)));

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
