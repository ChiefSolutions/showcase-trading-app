import { mockMarketsData } from '@/__mocks__/market-data';
import { resetStores } from '@/__mocks__/test-utils';
import { useMarketsStore, useWatchlistStore } from '@/stores';

const markets = mockMarketsData.slice(0, 3);
const market = markets[0];
describe('useWatchlistStore', () => {
  afterEach(() => {
    resetStores();
  });

  describe('when getting the state', () => {
    it('should return the initial watchlist state', () => {
      const state = useWatchlistStore.getState();

      expect(state).toEqual({
        markets: {},
        marketIds: [],
        isWatched: expect.any(Function),
        getWatchedMarkets: expect.any(Function),
        toggle: expect.any(Function),
        clear: expect.any(Function),
      });
    });
  });

  describe('when adding to watchlist', () => {
    beforeEach(() => {
      const state = useWatchlistStore.getState();

      state.toggle(market);
    });

    it('should add the market to watchlist', () => {
      const updatedState = useWatchlistStore.getState();

      expect(updatedState.markets[market.id]).toEqual(market);
      expect(updatedState.isWatched(market.id)).toBe(true);
      expect(updatedState.marketIds.length).toBe(1);
      expect(updatedState.marketIds.includes(market.id)).toBe(true);
    });

    describe.skip('when adding the same market id more than once', () => {
      beforeEach(() => {
        const state = useWatchlistStore.getState();

        state.toggle(market);
      });

      it('should not add the market to watchlist', () => {
        const updatedState = useWatchlistStore.getState();
        // expect(updatedState.getWatchedIds().length).toBe(1);
      });
    });
  });

  describe('when getting watched markets', () => {
    const state = useWatchlistStore.getState();

    beforeEach(() => {
      useMarketsStore.getState().setMarkets(markets);

      state.toggle(markets[0]);
      state.toggle(markets[1]);
      state.toggle(markets[2]);
    });

    it('should return the specified count for watched coins', () => {
      const updatedState = useWatchlistStore.getState();

      expect(updatedState.marketIds.length).toEqual(3);
      expect(updatedState.getWatchedMarkets().length).toEqual(3);
    });

    describe.skip('when removing', () => {
      beforeEach(() => {
        state.toggle(markets[1]);
      });

      it('should remove the market from watched', () => {
        const updatedState = useWatchlistStore.getState();

        expect(updatedState.marketIds.length).toEqual(2);
        expect(updatedState.getWatchedMarkets().length).toEqual(2);
      });
    });
  });

  describe('when toggling', () => {
    const state = useWatchlistStore.getState();

    beforeEach(() => {
      state.toggle(market);
    });

    it('should and and remove', () => {
      const updatedState = useWatchlistStore.getState();

      expect(updatedState.isWatched(market.id)).toBe(true);

      state.toggle(market);

      expect(updatedState.isWatched(market.id)).toBe(false);
    });
  });

  describe('when clear', () => {
    const state = useWatchlistStore.getState();

    beforeEach(() => {
      state.toggle(market);
    });

    it('should clear', () => {
      let updatedState = useWatchlistStore.getState();

      expect(updatedState.marketIds.length).toBe(1);
      expect(updatedState.marketIds.includes(market.id)).toBe(true);

      // clear the watchlist
      updatedState.clear();

      // get the updated state
      updatedState = useWatchlistStore.getState();
      expect(updatedState.marketIds.length).toBe(0);
    });
  });
});
