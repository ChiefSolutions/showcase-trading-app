import { HomeSectionListItem } from '@/components/home-list/home.types';

export const homeListKeyExtractor = (item: HomeSectionListItem, index: number) => {
  return `${item.type}-${index}`;
};
