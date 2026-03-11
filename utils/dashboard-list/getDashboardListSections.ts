import { Coin } from '@/components/coins/types';
import { DashboardSection } from '@/components/dashboard-list/dashboard.types';
import { DASHBOARD_SECTION_TYPE } from '@/constants';

export const sectionNames = ['popular', 'watchlist'];

export const getDashboardListSections = (
  popular: Coin[],
  watchlist: Coin[],
): DashboardSection[] => {
  return [
    {
      name: 'popular',
      header: {
        type: DASHBOARD_SECTION_TYPE.SECTION_HEADER,
        title: 'Most Popular',
        copy: 'The most popular coins sorted by market cap rank.',
      },
      hasItems: popular.length > 0,
      items: popular,
      emptyState: {
        type: DASHBOARD_SECTION_TYPE.EMPTY_STATE,
        message: 'No popular coins right now.',
      },
    },
    {
      name: 'watchlist',
      header: {
        type: DASHBOARD_SECTION_TYPE.SECTION_HEADER,
        title: 'My Watchlist',
        copy: 'Coins that have been added to your watchlist.',
        style: {
          marginTop: 20,
        },
      },
      hasItems: watchlist.length > 0,
      items: watchlist,
      emptyState: {
        type: DASHBOARD_SECTION_TYPE.EMPTY_STATE,
        message: "You don't have any coins in your watchlist.",
      },
    },
  ];
};
