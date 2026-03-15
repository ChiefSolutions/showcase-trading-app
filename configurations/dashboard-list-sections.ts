import { DashboardSection } from '@/components/dashboard-list/dashboard.types';
import { DASHBOARD_SECTION_TYPE } from '@/constants';

export const dashboardListSections: DashboardSection[] = [
  {
    name: 'popular',
    header: {
      type: DASHBOARD_SECTION_TYPE.SECTION_HEADER,
      title: 'Most Popular',
      copy: 'The most popular coins sorted by market cap rank.',
    },
    hasItems: false,
    items: [],
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
    hasItems: false,
    items: [],
    emptyState: {
      type: DASHBOARD_SECTION_TYPE.EMPTY_STATE,
      message: "You don't have any coins in your watchlist.",
    },
  },
];
