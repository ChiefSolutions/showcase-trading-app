import { JSX } from 'react';

import { ViewStyle } from 'react-native';

import { ListRenderItemInfo } from '@shopify/flash-list/src/FlashListProps';

import { Coin } from '@/components/coins/types';
import { HeadingProps } from '@/components/kit/heading';
import { HOME_SECTION_TYPE } from '@/constants';

export type HomeSectionType = (typeof HOME_SECTION_TYPE)[keyof typeof HOME_SECTION_TYPE];
export type HomeSectionItemRow = { type: HomeSectionType; data: Coin };

export type RenderHomeListItem = (
  info: ListRenderItemInfo<HomeSectionListItem>,
) => JSX.Element | null;

export interface HomeSectionHeader extends HeadingProps {
  type: HomeSectionType;
  style?: ViewStyle;
}

export interface HomeSectionEmptyState {
  type: HomeSectionType;
  message: string;
}

export interface HomeSection {
  name: string;
  header: HomeSectionHeader;
  hasItems: boolean;
  items?: Coin[];
  emptyState?: HomeSectionEmptyState;
}

export interface HomeSectionListItem extends HomeListHeaderProps {
  type: HomeSectionType;
  data?: Coin;
  message?: string;
}

export interface HomeListHeaderProps extends Omit<HeadingProps, 'title'> {
  title?: string;
  style?: ViewStyle;
}
