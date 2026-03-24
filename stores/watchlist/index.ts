import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Market } from '@/components/markets/markets.types';

interface WatchedState {
  watched: Set<string>;
}

type WatchlistState = {
  markets: Record<string, Market>;
  marketIds: string[];
  isWatched: (id: string) => boolean;
  getWatchedMarkets: () => Market[];
  toggle: (market: Market) => void;
  clear: () => void;
};

export const useWatchlistStore = create(
  persist<WatchlistState>(
    (set, get) => {
      return {
        markets: {},
        marketIds: [],

        isWatched: (id) => {
          return get().marketIds.includes(id);
        },

        getWatchedMarkets: () => {
          return Object.values(get().markets);
        },

        toggle: (market) =>
          set((state) => {
            const exists = state.marketIds.includes(market.id);

            if (exists) {
              const resultIds = state.marketIds.filter((id) => id !== market.id);
              const { [market.id]: _, ...markets } = state.markets;

              return { ...state, marketIds: resultIds, markets };
            }

            const marketIds = [...state.marketIds, market.id];
            const markets = {
              ...state.markets,
              [market.id]: market,
            };

            return { ...state, markets, marketIds };
          }),

        clear: () => set({ markets: {}, marketIds: [] }),
      };
    },
    {
      name: 'watchlist-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        ...state,
      }),
      merge: (persistedState, currentState) => {
        return {
          ...currentState,
          ...(persistedState as WatchedState),
          watched: new Set((persistedState as WatchedState).watched || []),
        };
      },
    },
  ),
);
