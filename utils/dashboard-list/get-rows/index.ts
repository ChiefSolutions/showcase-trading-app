import { DashboardSectionItemRow, DashboardSectionName } from '@/components/dashboard-list/dashboard.types';
import { Market } from '@/components/markets/markets.types';
import { DASHBOARD_SECTION_TYPE, dashboardEmptyState } from '@/constants';

export const getRows = (name: DashboardSectionName, items: Market[], watchedMarketIds: string[]) => {
  if (items.length === 0) {
    return [dashboardEmptyState[name]];
  }

  return items.map((item) => {
    return {
      type: DASHBOARD_SECTION_TYPE.ITEM_ROW,
      data: item,
      section: name,
      isWatched: watchedMarketIds.includes(item.id),
    } as DashboardSectionItemRow;
  });
};
