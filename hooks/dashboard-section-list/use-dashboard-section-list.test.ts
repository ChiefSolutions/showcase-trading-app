import { act, renderHook } from '@testing-library/react-native';

import { useDashboardSectionList } from '@/hooks';
import { useWatchlistStore } from '@/stores';
import { resetStores } from '@/test/test-utils';

describe('useDashboardSectionList', () => {
  beforeEach(() => resetStores());

  describe('when the hook is called', () => {
    it('should return the list', () => {
      const { result } = renderHook(() => useDashboardSectionList());

      expect(result.current).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'SECTION_HEADER',
            title: 'Most Popular',
            copy: 'The most popular coins sorted by market cap rank.',
          }),
          expect.objectContaining({
            type: 'ITEM_ROW',
            data: expect.objectContaining({
              id: 'ethereum',
              symbol: 'eth',
            }),
          }),
          expect.objectContaining({
            type: 'SECTION_HEADER',
            title: 'My Watchlist',
            copy: 'Coins that have been added to your watchlist.',
          }),
          expect.objectContaining({
            type: 'EMPTY_STATE',
            message: "You don't have any coins in your watchlist.",
          }),
        ]),
      );
    });
  });

  describe('when no empty state', () => {
    beforeEach(() => {
      act(() => {
        useWatchlistStore.getState().add('bitcoin');
      });
    });

    it('should not return empty state', () => {
      const { result } = renderHook(() => useDashboardSectionList());

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
