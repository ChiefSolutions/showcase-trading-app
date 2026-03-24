import { create } from 'zustand';

import { Market } from '@/components/markets/markets.types';
import { Config } from '@/configurations/env-var';
import { DEFAULT_RESPONSE_NOT_OK_ERROR } from '@/constants/markets';

interface MarketState {
  error: string | null;
  fetchPopularMarkets: (options?: RequestInit) => Promise<void>;
  getMarket: (id: string) => Market | undefined;
  markets: Record<string, Market>;
  allIds: string[];
  popular: Market[];
  loading: boolean;
  setMarkets: (markets: Market[]) => void;
  clear: () => void;
}

export const useMarketsStore = create<MarketState>((set, get) => ({
  allIds: [],
  markets: {},
  popular: [],
  loading: false,
  error: null,

  getMarket: (id) => get().markets[id],

  fetchPopularMarkets: async (options) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${Config.apiUrl}markets/popular`, options);

      if (!response.ok) {
        set({ loading: false, error: DEFAULT_RESPONSE_NOT_OK_ERROR });

        return;
      }

      const popular = (await response.json()) as Market[];
      const byId: Record<string, Market> = {};
      const ids: string[] = [];

      for (const market of popular) {
        byId[market.id] = market;
        ids.push(market.id);
      }

      set({ popular, loading: false, markets: byId, allIds: ids });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },
  setMarkets: (markets) => {
    const byId: Record<string, Market> = {};
    const ids: string[] = [];

    for (const market of markets) {
      byId[market.id] = market;
      ids.push(market.id);
    }

    set({
      markets: byId,
      allIds: ids,
    });
  },

  clear: () =>
    set({
      markets: {},
      allIds: [],
    }),
}));
