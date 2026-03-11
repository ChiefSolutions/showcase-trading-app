import { JSX } from 'react';

import { ViewStyle } from 'react-native';

import { ListRenderItemInfo } from '@shopify/flash-list/src/FlashListProps';

import { Coin } from '@/components/coins/types';
import { HeadingProps } from '@/components/kit/heading';
import { DASHBOARD_SECTION_TYPE } from '@/constants';

export type DashboardSectionType =
  (typeof DASHBOARD_SECTION_TYPE)[keyof typeof DASHBOARD_SECTION_TYPE];
export type DashboardSectionItemRow = { type: DashboardSectionType; data: Coin };

export type RenderDashboardListItem = (
  info: ListRenderItemInfo<DashboardSectionListItem>,
) => JSX.Element | null;

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
  items: Coin[];
  emptyState?: DashboardSectionEmptyState;
}

export interface DashboardSectionListItem extends DashboardListHeaderProps {
  type: DashboardSectionType;
  data?: Coin;
  message?: string;
}

export interface DashboardListHeaderProps extends Omit<HeadingProps, 'title'> {
  title?: string;
  style?: ViewStyle;
}
