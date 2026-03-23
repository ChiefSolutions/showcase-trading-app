import { create } from 'zustand';

import { Market } from '@/components/markets/markets.types';

type WatchlistState = {
  watched: Set<string>;
  isWatched: (id: string) => boolean;
  add: (id: string) => void;
  getWatchedIds: () => string[];
  getWatchedMarkets: (count: number, marketsById: Record<string, Market>) => Market[];
  remove: (id: string) => void;
  toggle: (id: string) => void;
  clear: () => void;
};

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  watched: new Set(),

  isWatched: (id) => get().watched.has(id),

  add: (id) =>
    set((state) => {
      if (state.watched.has(id)) {
        return state;
      }

      const next = new Set(state.watched);

      next.add(id);

      return { watched: next };
    }),

  getWatchedIds: () => Array.from(get().watched),

  getWatchedMarkets: (count, marketsById) => {
    return Array.from(get().watched)
      .slice(0, count)
      .map((id) => marketsById[id])
      .filter(Boolean);
  },

  remove: (id) =>
    set((state) => {
      if (!state.watched.has(id)) {
        return state;
      }

      const next = new Set(state.watched);

      next.delete(id);

      return { watched: next };
    }),

  toggle: (id) =>
    set((state) => {
      const next = new Set(state.watched);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return { watched: next };
    }),

  clear: () => set({ watched: new Set() }),
}));
