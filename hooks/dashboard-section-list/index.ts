import { useEffect, useMemo } from 'react';

import { useShallow } from 'zustand/shallow';

import { Coin } from '@/components/coins/types';
import { DashboardSectionItemRow, DashboardSectionListItem } from '@/components/dashboard-list/dashboard.types';
import coins from '@/data/crypto.json';
import { useCoinStore, useWatchlistStore } from '@/stores';
import { getDashboardListSections } from '@/utils';
import { sectionNames } from '@/utils/dashboard-list/getDashboardListSections';

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
    const sections = getDashboardListSections(popular, watchlist);

    sections.forEach((section) => {
      if (sectionNames.includes(section.name)) {
        list.push(section.header);

        if (section.hasItems && section.items) {
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
