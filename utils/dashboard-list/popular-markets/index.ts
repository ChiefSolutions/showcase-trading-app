import { Market } from '@/components/markets/markets.types';
import { DASHBOARD_SECTION_TYPE } from '@/constants';
import { DASHBOARD_SECTION_NAME } from '@/constants/dashboard-list';
import { getRows } from '@/utils/dashboard-list/get-rows';

export const getPopularMarketListSection = (popular: Market[], watchedMarketIds: string[]) => {
  return [
    {
      type: DASHBOARD_SECTION_TYPE.SECTION_HEADER,
      title: 'Most Popular',
      copy: 'The most popular markets.',
    },
    ...getRows(DASHBOARD_SECTION_NAME.POPULAR, popular, watchedMarketIds),
  ];
};
