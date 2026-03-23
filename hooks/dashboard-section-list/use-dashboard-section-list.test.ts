import { act, renderHook, waitFor } from '@testing-library/react-native';

import { mockMarketsData } from '@/__mocks__/market-data';
import { resetStores } from '@/__mocks__/test-utils';
import { useDashboardSectionList } from '@/hooks';
import { useWatchlistStore } from '@/stores';

describe('useDashboardSectionList', () => {
  beforeEach(() => {
    act(() => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockMarketsData),
      });
    });
    resetStores();
  });

  describe('when the hook is called', () => {
    it('should return the list', async () => {
      const { result } = renderHook(() => useDashboardSectionList());

      await waitFor(() => {
        expect(result.current).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              type: 'SECTION_HEADER',
              title: 'Most Popular',
              copy: 'The most popular markets.',
            }),
            expect.objectContaining({
              type: 'ITEM_ROW',
              data: expect.objectContaining({
                id: '1728e804-9bba-479e-a8b9-d085d03de334',
                symbol: 'ETH-USD',
              }),
            }),
            expect.objectContaining({
              type: 'SECTION_HEADER',
              title: 'My Watchlist',
              copy: 'Markets that have been added to your watchlist.',
            }),
            expect.objectContaining({
              type: 'EMPTY_STATE',
              message: "You don't have any coins in your watchlist.",
            }),
          ]),
        );
      });
    });
  });

  describe('when no empty state', () => {
    beforeEach(() => {
      act(() => {
        useWatchlistStore.getState().add('131a0e7a-d094-4bef-88c0-3227db519300');
      });
    });

    it('should not return empty state', async () => {
      const { result } = renderHook(() => useDashboardSectionList());

      await waitFor(() => {
        expect(result.current).not.toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              type: 'EMPTY_STATE',
              message: "You don't have any coins in your watchlist.",
            }),
          ]),
        );
      });
    });
  });
});
