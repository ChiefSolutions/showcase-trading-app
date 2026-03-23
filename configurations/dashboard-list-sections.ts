import { DashboardSection } from '@/components/dashboard-list/dashboard.types';
import { DASHBOARD_SECTION_TYPE } from '@/constants';

export const dashboardListSections: DashboardSection[] = [
  {
    name: 'popular',
    header: {
      type: DASHBOARD_SECTION_TYPE.SECTION_HEADER,
      title: 'Most Popular',
      copy: 'The most popular markets.',
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
      copy: 'Markets that have been added to your watchlist.',
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
