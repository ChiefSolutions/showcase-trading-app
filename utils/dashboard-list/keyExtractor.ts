import { DashboardSectionListItem } from '@/components/dashboard-list/dashboard.types';

export const dashboardListKeyExtractor = (item: DashboardSectionListItem, index: number) => {
  return `${item.type}-${index}`;
};
