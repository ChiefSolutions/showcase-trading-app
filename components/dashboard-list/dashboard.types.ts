import { JSX } from 'react';

import { ViewStyle } from 'react-native';

import { ListRenderItemInfo } from '@shopify/flash-list/src/FlashListProps';

import { DASHBOARD_SECTION_TYPE } from '@/constants';
import { dashboardSectionNames } from '@/constants/dashboard-list';

import { HeadingProps } from '../kit/heading';
import { Market } from '../markets/markets.types';

export type DashboardSectionType = (typeof DASHBOARD_SECTION_TYPE)[keyof typeof DASHBOARD_SECTION_TYPE];
export type DashboardSectionItemRow = { type: DashboardSectionType; data: Market };

export type RenderDashboardListItem = (info: ListRenderItemInfo<DashboardSectionListItem>) => JSX.Element | null;

export type DashboardSectionName = (typeof dashboardSectionNames)[number];

// export type DashboardSectionDataMap = {
//   [K in DashboardSectionName]: Coin[];
// };

export type DashboardSectionDataMap = {
  [K in DashboardSectionName]: Market[];
};

export interface DashboardSectionHeader extends HeadingProps {
  type: DashboardSectionType;
  style?: ViewStyle;
}

export interface DashboardSectionEmptyState {
  type: DashboardSectionType;
  message: string;
}

export interface DashboardSection {
  name: string;
  header: DashboardSectionHeader;
  hasItems: boolean;
  items: Market[];
  emptyState?: DashboardSectionEmptyState;
}

export interface DashboardSectionListItem extends DashboardListHeaderProps {
  type: DashboardSectionType;
  data?: Market;
  message?: string;
}

export interface DashboardListHeaderProps extends Omit<HeadingProps, 'title'> {
  title?: string;
  style?: ViewStyle;
}
