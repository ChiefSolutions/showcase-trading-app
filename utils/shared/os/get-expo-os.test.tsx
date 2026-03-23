import { getExpoOS } from '@/utils';

describe('getExpoOS', () => {
  beforeEach(() => {
    (getExpoOS as jest.Mock).mockReturnValue('ios');
  });

  describe('when called', () => {
    it('should return the correct OS', () => {
      expect(getExpoOS()).toEqual('ios');
    });
  });
});
