import { renderHook } from '@testing-library/react-native';

import { useMount } from '@/hooks';

const useMountCallback = jest.fn();

describe('useMount', () => {
  afterEach(() => {
    useMountCallback.mockClear();
  });

  describe('when called with a callback', () => {
    beforeEach(() => {
      renderHook(() => useMount(useMountCallback));
    });

    it('should invoke the callback', () => {
      expect(useMountCallback).toHaveBeenCalled();
    });
  });
});
