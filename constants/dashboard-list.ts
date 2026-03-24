import { DashboardEmptyState } from '@/components/dashboard-list/dashboard.types';

export const DASHBOARD_SECTION_TYPE = {
  SECTION_HEADER: 'SECTION_HEADER',
  ITEM_ROW: 'ITEM_ROW',
  EMPTY_STATE: 'EMPTY_STATE',
} as const;

export const DASHBOARD_SECTION_NAME = {
  POPULAR: 'popular',
  WATCHLIST: 'watchlist',
} as const;

export const dashboardEmptyState: DashboardEmptyState = {
  popular: {
    type: DASHBOARD_SECTION_TYPE.EMPTY_STATE,
    message: 'No popular markets right now.',
  },
  watchlist: {
    type: DASHBOARD_SECTION_TYPE.EMPTY_STATE,
    message: "You don't have any coins in your watchlist.",
  },
};
