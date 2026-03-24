import { act } from '@testing-library/react-native';

import { mockMarketsData } from '@/__mocks__/market-data';
import { resetStores } from '@/__mocks__/test-utils';
import { Market } from '@/components/markets/markets.types';
import { DEFAULT_RESPONSE_NOT_OK_ERROR } from '@/constants/markets';
import { useMarketsStore } from '@/stores';

describe('useMarketsStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    resetStores();
  });

  describe('when getting the state', () => {
    it('should return the initial market store state', () => {
      const state = useMarketsStore.getState();

      expect(state).toEqual({
        allIds: [],
        markets: {},
        popular: [],
        loading: false,
        error: null,
        getMarket: expect.any(Function),
        fetchPopularMarkets: expect.any(Function),
        setMarkets: expect.any(Function),
        clear: expect.any(Function),
      });
    });
  });

  describe('when fetching popular markets is called', () => {
    describe('when the response is ok', () => {
      beforeEach(async () => {
        act(() => {
          (global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockMarketsData),
          });
        });

        await act(async () => {
          await useMarketsStore.getState().fetchPopularMarkets();
        });
      });

      it('should get the popular markets data', () => {
        const popular = useMarketsStore.getState().popular;

        expect(popular.length).toEqual(6);
      });
    });

    describe('when the response is not ok', () => {
      beforeEach(async () => {
        act(() => {
          (global.fetch as jest.Mock).mockResolvedValue({
            ok: false,
          });
        });

        await act(async () => {
          await useMarketsStore.getState().fetchPopularMarkets();
        });
      });

      it('should set the error', () => {
        const popular = useMarketsStore.getState().popular;
        const error = useMarketsStore.getState().error;

        expect(error).toBe(DEFAULT_RESPONSE_NOT_OK_ERROR);
        expect(popular.length).toEqual(0);
      });
    });

    describe('when the api fails', () => {
      beforeEach(async () => {
        act(() => {
          (global.fetch as jest.Mock).mockRejectedValue(new Error('Failed to fetch popular markets'));
        });

        await act(async () => {
          await useMarketsStore.getState().fetchPopularMarkets();
        });
      });

      it('should throw an error', async () => {
        const popular = useMarketsStore.getState().popular;
        const error = useMarketsStore.getState().error;

        expect(error).toBe('Failed to fetch popular markets');
        expect(popular.length).toEqual(0);
      });
    });
  });
  describe('when the Markets are set', () => {
    const markets = mockMarketsData.slice(0, 4) as Market[];
    beforeEach(() => {
      useMarketsStore.getState().setMarkets(markets);
    });

    it('should store the Markets', () => {
      const state = useMarketsStore.getState();

      expect(state.allIds.length).toBe(4);
      expect(state.allIds).toEqual(markets.map((m) => m.id));
    });

    describe('when getting Market by id', () => {
      it('should return the Market', () => {
        const state = useMarketsStore.getState();

        const result = state.getMarket('131a0e7a-d094-4bef-88c0-3227db519300');

        expect(result).toBeDefined();
        expect(result).toEqual(mockMarketsData.find((m) => m.id === '131a0e7a-d094-4bef-88c0-3227db519300'));
      });
    });

    describe('when clear is called', () => {
      beforeEach(() => {
        useMarketsStore.getState().clear();
      });

      it('should clear the Market state', () => {
        const state = useMarketsStore.getState();

        expect(state.allIds).toEqual([]);
        expect(state.allIds).toEqual([]);
      });
    });
  });
});
