import { Market } from '@/components/markets/markets.types';
import { DASHBOARD_SECTION_NAME, DASHBOARD_SECTION_TYPE } from '@/constants';
import { getRows } from '@/utils/dashboard-list/get-rows';

export const getWatchlistSection = (watchlist: Market[], watchedMarketIds: string[]) => {
  return [
    {
      type: DASHBOARD_SECTION_TYPE.SECTION_HEADER,
      title: 'My Watchlist',
      copy: 'Markets that have been added to your watchlist.',
      style: {
        marginTop: 20,
      },
    },
    ...getRows(DASHBOARD_SECTION_NAME.WATCHLIST, watchlist, watchedMarketIds),
  ];
};
