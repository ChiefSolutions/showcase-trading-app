import { JSX } from 'react';

import { ViewStyle } from 'react-native';

import { ListRenderItemInfo } from '@shopify/flash-list/src/FlashListProps';

import { DASHBOARD_SECTION_NAME, DASHBOARD_SECTION_TYPE } from '@/constants';

import { HeadingProps } from '../kit/heading';
import { Market } from '../markets/markets.types';

export type DashboardSectionType = (typeof DASHBOARD_SECTION_TYPE)[keyof typeof DASHBOARD_SECTION_TYPE];
export type DashboardSectionItemRow = { type: DashboardSectionType; data: Market; section: DashboardSectionName; isWatched?: boolean };

export type RenderDashboardListItem = (info: ListRenderItemInfo<DashboardSectionListItem>) => JSX.Element | null;

export type DashboardSectionName = (typeof DASHBOARD_SECTION_NAME)[keyof typeof DASHBOARD_SECTION_NAME];

export type DashboardEmptyState = {
  [K in DashboardSectionName]: DashboardSectionEmptyState;
};

export interface DashboardSectionHeader extends HeadingProps {
  type: DashboardSectionType;
  style?: ViewStyle;
}

export interface DashboardSectionEmptyState {
  type: DashboardSectionType;
  message: string;
}

export interface DashboardListProps {
  data: DashboardSectionListItem[];
}

export interface DashboardSectionListItem extends DashboardListHeaderProps {
  type: DashboardSectionType;
  data?: Market;
  message?: string;
  isWatched?: boolean;
}

export interface DashboardListHeaderProps extends Omit<HeadingProps, 'title'> {
  title?: string;
  style?: ViewStyle;
}
