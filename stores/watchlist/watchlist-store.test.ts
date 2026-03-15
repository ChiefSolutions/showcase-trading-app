import { resetStores } from '@/__mocks__/test-utils';
import { Coin } from '@/components/coins/types';
import response from '@/data/crypto.json';
import { useCoinStore, useWatchlistStore } from '@/stores';

const coins = response.data.slice(0, 5) as Coin[];

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
        getWatchedCoins: expect.any(Function),
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

    it('should add the coin to watchlist', () => {
      const updatedState = useWatchlistStore.getState();

      expect(updatedState.watched.has('bitcoin')).toBe(true);
      expect(updatedState.isWatched('bitcoin')).toBe(true);
      expect(updatedState.getWatchedIds().length).toBe(1);
      expect(updatedState.getWatchedIds().includes('bitcoin')).toBe(true);
    });

    describe('when adding the same coin id more than once', () => {
      beforeEach(() => {
        const state = useWatchlistStore.getState();

        state.add('bitcoin');
      });

      it('should not add the coin to watchlist', () => {
        const updatedState = useWatchlistStore.getState();
        expect(updatedState.getWatchedIds().length).toBe(1);
      });
    });
  });

  describe('when getting watched coins', () => {
    const state = useWatchlistStore.getState();

    beforeEach(() => {
      useCoinStore.getState().setCoins(coins);

      state.add('bitcoin');
      state.add('ethereum');
      state.add('tether');
      state.add('ripple');
    });

    it('should return the specified count for watched coins', () => {
      const updatedState = useWatchlistStore.getState();
      const coinsState = useCoinStore.getState();

      expect(updatedState.watched.size).toEqual(4);
      expect(updatedState.getWatchedCoins(2, coinsState.coinsById).length).toEqual(2);
    });

    describe('when removing', () => {
      beforeEach(() => {
        state.remove('ripple');
      });

      it('should remove the coin from watched', () => {
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

        expect(updatedState.watched.size).toEqual(4);
        expect(updatedState.getWatchedIds().length).toEqual(4);
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
