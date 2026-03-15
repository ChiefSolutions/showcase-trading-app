import { DASHBOARD_SECTION_TYPE } from '@/constants';
import { dashboardListKeyExtractor } from '@/utils';

describe('dashboardListKeyExtractor', () => {
  describe('when called', () => {
    it('should return the key', () => {
      const result = dashboardListKeyExtractor({ type: DASHBOARD_SECTION_TYPE.SECTION_HEADER }, 0);

      expect(result).toBe(`${DASHBOARD_SECTION_TYPE.SECTION_HEADER}-0`);
    });
  });
});
