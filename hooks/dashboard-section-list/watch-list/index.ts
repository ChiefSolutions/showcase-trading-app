import { useMemo } from 'react';

import { useShallow } from 'zustand/react/shallow';

import { useWatchlistStore } from '@/stores';
import { getWatchlistSection } from '@/utils/dashboard-list/watchlist';

const COUNT = 6;
export const useWatchlistDashboardList = () => {
  const markets = useWatchlistStore(useShallow((s) => s.getWatchedMarkets()));
  const watchedMarketIds = useWatchlistStore(useShallow((s) => s.marketIds));

  return useMemo(() => {
    const limitedWatchlist = markets.slice(0, COUNT);
    return getWatchlistSection(limitedWatchlist, watchedMarketIds);
  }, [markets, watchedMarketIds]);
};
