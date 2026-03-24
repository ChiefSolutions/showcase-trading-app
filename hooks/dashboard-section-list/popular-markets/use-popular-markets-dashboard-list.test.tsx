import { act, renderHook, waitFor } from '@testing-library/react-native';

import { mockMarketsData } from '@/__mocks__/market-data';
import { resetStores } from '@/__mocks__/test-utils';
import { DASHBOARD_SECTION_NAME, DASHBOARD_SECTION_TYPE } from '@/constants';
import { usePopularMarketsDashboardList } from '@/hooks';

describe('use', () => {
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
      const { result } = renderHook(() => usePopularMarketsDashboardList());

      await waitFor(() => {
        expect(result.current).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              type: 'SECTION_HEADER',
              title: 'Most Popular',
              copy: 'The most popular markets.',
            }),
            expect.objectContaining({
              type: DASHBOARD_SECTION_TYPE.ITEM_ROW,
              data: mockMarketsData[0],
              section: DASHBOARD_SECTION_NAME.POPULAR,
              isWatched: false,
            }),
          ]),
        );
      });
    });
  });
});
