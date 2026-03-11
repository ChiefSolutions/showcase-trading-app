import { useMemo, useState } from 'react';

import { Coin } from '@/components/coins/types';
import {
  DashboardSectionItemRow,
  DashboardSectionListItem,
} from '@/components/dashboard-list/dashboard.types';
import coins from '@/data/crypto.json';
import { getCoinsByCount, getDashboardListSections } from '@/utils';
import { sectionNames } from '@/utils/dashboard-list/getDashboardListSections';

type UseDashboardSectionList = () => DashboardSectionListItem[];

export const useDashboardSectionList: UseDashboardSectionList = () => {
  //TODO: replace with API CALL
  const [coinsData] = useState<Coin[]>(coins.data as Coin[]);
  const popular = useMemo(() => {
    return getCoinsByCount(coinsData, 5);
  }, [coinsData]);

  const watchlist = useMemo(() => {
    return getCoinsByCount(coinsData, 5);
  }, [coinsData]);

  return useMemo(() => {
    const list: DashboardSectionListItem[] = [];
    const sections = getDashboardListSections(popular, watchlist);

    sections.forEach((section) => {
      if (sectionNames.includes(section.name)) {
        list.push(section.header);

        if (section.hasItems && section.items) {
          list.push(
            ...section.items.map(
              (item) => ({ type: 'ITEM_ROW' as const, data: item }) as DashboardSectionItemRow,
            ),
          );
          return;
        }

        if (section.emptyState) {
          list.push(section.emptyState);
        }
      }
    });

    return list;
  }, [popular, watchlist]);
};
