import { useEffect, useMemo } from 'react';

import { useShallow } from 'zustand/react/shallow';

import { DEFAULT_FETCH_ABORTED_REASON } from '@/constants/markets';
import { useMarketsStore, useWatchlistStore } from '@/stores';
import { getPopularMarketListSection } from '@/utils';

export const usePopularMarketsDashboardList = () => {
  const { fetchPopularMarkets, popular } = useMarketsStore();
  const watchedMarketIds = useWatchlistStore(useShallow((s) => s.marketIds));

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      await fetchPopularMarkets({ signal: controller.signal });
    })();

    return () => {
      controller.abort(DEFAULT_FETCH_ABORTED_REASON);
    };
  }, [fetchPopularMarkets]);

  return useMemo(() => {
    return getPopularMarketListSection(popular, watchedMarketIds);
  }, [popular, watchedMarketIds]);
};
