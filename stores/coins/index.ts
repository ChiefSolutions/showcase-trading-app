import { create } from 'zustand';

import { Coin } from '@/components/coins/types';

interface CoinState {
  coinsById: Record<string, Coin>;
  allIds: string[];
  getCoin: (id: string) => Coin | undefined;
  getPopularCoins: (count: number) => Coin[];
  setCoins: (markets: Coin[]) => void;
  upsertCoin: (coin: Coin) => void;
  clear: () => void;
}

export const useCoinStore = create<CoinState>((set, get) => ({
  coinsById: {},
  allIds: [],

  getCoin: (id) => get().coinsById[id],

  getPopularCoins: (count) => {
    const { allIds, coinsById } = get();

    return allIds
      .slice(0, count)
      .map((id) => coinsById[id])
      .filter(Boolean);
  },

  setCoins: (coins) => {
    const byId: Record<string, Coin> = {};
    const ids: string[] = [];

    for (const coin of coins) {
      byId[coin.id] = coin;
      ids.push(coin.id);
    }

    set({
      coinsById: byId,
      allIds: ids,
    });
  },

  upsertCoin: (coin) =>
    set((state) => {
      const exists = Boolean(state.coinsById[coin.id]);

      return {
        coinsById: {
          ...state.coinsById,
          [coin.id]: coin,
        },
        allIds: exists ? state.allIds : [...state.allIds, coin.id],
      };
    }),

  clear: () =>
    set({
      coinsById: {},
      allIds: [],
    }),
}));
