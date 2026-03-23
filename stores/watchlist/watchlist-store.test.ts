import { mockMarketsData } from '@/__mocks__/market-data';
import { resetStores } from '@/__mocks__/test-utils';
import { Market } from '@/components/markets/markets.types';
import { useMarketsStore, useWatchlistStore } from '@/stores';

describe('useWatchlistStore', () => {
  afterEach(() => {
    resetStores();
  });

  describe('when getting the state', () => {
    it('should return the initial watchlist state', () => {
      const state = useWatchlistStore.getState();

      expect(state).toEqual({
        watched: new Set(),
        isWatched: expect.any(Function),
        add: expect.any(Function),
        getWatchedIds: expect.any(Function),
        getWatchedMarkets: expect.any(Function),
        remove: expect.any(Function),
        toggle: expect.any(Function),
        clear: expect.any(Function),
      });
    });
  });

  describe('when adding to watchlist', () => {
    beforeEach(() => {
      const state = useWatchlistStore.getState();

      state.add('bitcoin');
    });

    it('should add the market to watchlist', () => {
      const updatedState = useWatchlistStore.getState();

      expect(updatedState.watched.has('bitcoin')).toBe(true);
      expect(updatedState.isWatched('bitcoin')).toBe(true);
      expect(updatedState.getWatchedIds().length).toBe(1);
      expect(updatedState.getWatchedIds().includes('bitcoin')).toBe(true);
    });

    describe('when adding the same market id more than once', () => {
      beforeEach(() => {
        const state = useWatchlistStore.getState();

        state.add('bitcoin');
      });

      it('should not add the market to watchlist', () => {
        const updatedState = useWatchlistStore.getState();
        expect(updatedState.getWatchedIds().length).toBe(1);
      });
    });
  });

  describe('when getting watched coins', () => {
    const state = useWatchlistStore.getState();

    beforeEach(() => {
      useMarketsStore.getState().setMarkets(mockMarketsData.slice(0, 3) as Market[]);

      state.add('1002e6ef-808f-450a-bd5b-15067c9a6814');
      state.add('36e69848-85e0-43b9-bfc1-101e747f412e');
      state.add('b2404ab1-ef5e-4de3-bb59-758b42df0e14');
    });

    it('should return the specified count for watched coins', () => {
      const updatedState = useWatchlistStore.getState();
      const coinsState = useMarketsStore.getState();

      expect(updatedState.watched.size).toEqual(3);
      expect(updatedState.getWatchedMarkets(2, coinsState.marketsById).length).toEqual(2);
    });

    describe('when removing', () => {
      beforeEach(() => {
        state.remove('ripple');
      });

      it('should remove the market from watched', () => {
        const updatedState = useWatchlistStore.getState();

        expect(updatedState.watched.size).toEqual(3);
        expect(updatedState.getWatchedIds().length).toEqual(3);
      });
    });

    describe('when removing an item that does not exist', () => {
      beforeEach(() => {
        state.remove('apple');
      });

      it('should return existing state', () => {
        const updatedState = useWatchlistStore.getState();

        expect(updatedState.watched.size).toEqual(3);
        expect(updatedState.getWatchedIds().length).toEqual(3);
      });
    });
  });

  describe('when toggling', () => {
    const state = useWatchlistStore.getState();

    beforeEach(() => {
      state.toggle('bitcoin');
    });

    it('should and and remove', () => {
      const updatedState = useWatchlistStore.getState();

      expect(updatedState.isWatched('bitcoin')).toBe(true);

      state.toggle('bitcoin');

      expect(updatedState.isWatched('bitcoin')).toBe(false);
    });
  });

  describe('when clear', () => {
    const state = useWatchlistStore.getState();

    beforeEach(() => {
      state.add('bitcoin');
    });

    it('should clear', () => {
      let updatedState = useWatchlistStore.getState();

      expect(updatedState.watched.size).toBe(1);
      expect(updatedState.watched.has('bitcoin')).toBe(true);

      // clear the watchlist
      updatedState.clear();

      // get the **fresh state** snapshot
      updatedState = useWatchlistStore.getState();
      expect(updatedState.watched.size).toBe(0);
    });
  });
});
