import { resetStores } from '@/__mocks__/test-utils';
import { Coin } from '@/components/coins/types';
import response from '@/data/crypto.json';
import { useCoinStore } from '@/stores';

const coins = response.data.slice(0, 5) as Coin[];

describe('useCoinStore', () => {
  afterEach(() => {
    resetStores();
  });

  describe('when getting the state', () => {
    it('should return the initial coin state', () => {
      const state = useCoinStore.getState();

      expect(state).toEqual({
        coinsById: {},
        allIds: [],
        getCoin: expect.any(Function),
        getPopularCoins: expect.any(Function),
        setCoins: expect.any(Function),
        upsertCoin: expect.any(Function),
        clear: expect.any(Function),
      });
    });
  });

  describe('when the coins are set', () => {
    beforeEach(() => {
      useCoinStore.getState().setCoins(coins);
    });

    it('should store the coins', () => {
      const state = useCoinStore.getState();

      expect(state.allIds.length).toBe(5);
      expect(state.allIds).toEqual(coins.map((c) => c.id));
    });

    describe('when getting coin by id', () => {
      it('should return the coin', () => {
        const state = useCoinStore.getState();

        const result = state.getCoin('bitcoin');

        expect(result).toBeDefined();
        expect(result).toEqual(coins[0]);
      });
    });

    describe('when upserting coin', () => {
      it('inserts a new coin if it does not exist', () => {
        const state = useCoinStore.getState();

        state.upsertCoin({ id: 'chiefcoin', name: 'Chiefcoin' } as Coin);

        const updatedState = useCoinStore.getState();

        expect(updatedState.allIds.includes('chiefcoin')).toBe(true);
      });

      it('does not duplicate ID when updating an existing coin', () => {
        const state = useCoinStore.getState();

        state.upsertCoin({ id: 'bitcoin', name: 'Bitcoin Updated' } as Coin);

        const updatedState = useCoinStore.getState();

        expect(updatedState.coinsById['bitcoin'].name).toBe('Bitcoin Updated');
      });

      it('appends new coin IDs correctly', () => {
        const state = useCoinStore.getState();
        state.upsertCoin({ id: 'btc', name: 'Bitcoin' } as Coin);
        state.upsertCoin({ id: 'eth', name: 'Ethereum' } as Coin);

        const updatedState = useCoinStore.getState();
        expect(updatedState.allIds.length).toEqual(7);
        expect(updatedState.coinsById['eth']).toEqual({ id: 'eth', name: 'Ethereum' });
      });
    });

    describe('when clear is called', () => {
      beforeEach(() => {
        useCoinStore.getState().clear();
      });

      it('should clear the coin state', () => {
        const state = useCoinStore.getState();

        expect(state.allIds).toEqual([]);
        expect(state.allIds).toEqual([]);
      });
    });
  });
});
