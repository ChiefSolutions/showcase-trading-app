import { Coin } from '@/components/coins/types';
import { HomeSection } from '@/components/home-list/home.types';
import { HOME_SECTION_TYPE } from '@/constants';

export const sectionNames = ['logo', 'popular', 'watchlist'];

export const getHomeListSections = (popular: Coin[], watchlist: Coin[]): HomeSection[] => {
  return [
    {
      name: 'logo',
      header: {
        type: HOME_SECTION_TYPE.SECTION_LOGO,
        title: 'Welcome to Trading App',
      },
      hasItems: false,
      items: [],
    },
    {
      name: 'popular',
      header: {
        type: HOME_SECTION_TYPE.SECTION_HEADER,
        title: 'Most Popular',
        copy: 'The most popular coins sorted by market cap rank.',
      },
      hasItems: popular.length > 0,
      items: popular,
      emptyState: { type: HOME_SECTION_TYPE.EMPTY_STATE, message: 'No popular coins right now.' },
    },
    {
      name: 'watchlist',
      header: {
        type: HOME_SECTION_TYPE.SECTION_HEADER,
        title: 'My Watchlist',
        copy: 'Coins that have been added to your watchlist.',
        style: {
          marginTop: 20,
        },
      },
      hasItems: watchlist.length > 0,
      items: watchlist,
      emptyState: {
        type: HOME_SECTION_TYPE.EMPTY_STATE,
        message: "You don't have any coins in your watchlist.",
      },
    },
  ];
};
