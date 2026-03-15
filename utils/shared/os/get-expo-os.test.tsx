import { getExpoOS } from '@/utils';

describe('getExpoOS', () => {
  describe('when called', () => {
    it('should return the correct OS', () => {
      expect(getExpoOS()).toEqual('ios');
    });
  });
});
