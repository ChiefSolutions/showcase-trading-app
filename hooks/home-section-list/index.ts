import { useMemo, useState } from 'react';

import { Coin } from '@/components/coins/types';
import { HomeSectionItemRow, HomeSectionListItemInfo } from '@/components/home-list/home.types';
import coins from '@/data/crypto.json';
import { getCoinsByCount, getHomeListSections } from '@/utils';
import { sectionNames } from '@/utils/home/getHomeListSections';

type UseHomeSectionList = () => HomeSectionListItemInfo[];

export const useHomeSectionList: UseHomeSectionList = () => {
  //TODO: replace with API CALL
  const [coinsData] = useState<Coin[]>(coins.data as Coin[]);
  const popular = useMemo(() => {
    return getCoinsByCount(coinsData, 5);
  }, [coinsData]);

  const watchlist = useMemo(() => {
    return getCoinsByCount(coinsData, 5);
  }, [coinsData]);

  return useMemo(() => {
    const list: HomeSectionListItemInfo[] = [];
    const sections = getHomeListSections(popular, watchlist);

    sections.forEach((section) => {
      if (sectionNames.includes(section.name)) {
        list.push(section.header);

        if (section.hasItems && section.items) {
          list.push(
            ...section.items.map(
              (item) => ({ type: 'ITEM_ROW' as const, data: item }) as HomeSectionItemRow,
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
