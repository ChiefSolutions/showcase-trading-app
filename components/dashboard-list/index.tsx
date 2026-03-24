import { useMemo } from 'react';

import { DashboardSectionListItem } from '@/components/dashboard-list/dashboard.types';
import { DashboardListItems } from '@/components/dashboard-list/list';
import { usePopularMarketsDashboardList } from '@/hooks/dashboard-section-list/popular-markets';
import { useWatchlistDashboardList } from '@/hooks/dashboard-section-list/watch-list';

export const DashboardList = () => {
  const popularMarkets = usePopularMarketsDashboardList();
  const watchlist = useWatchlistDashboardList();

  const data = useMemo(() => {
    return [...popularMarkets, ...watchlist] as DashboardSectionListItem[];
  }, [popularMarkets, watchlist]);

  return <DashboardListItems data={data} />;
};
