import { renderHook } from '@testing-library/react-native';

import { useModal } from '@/contexts/modal/hook/index';
import { ModalContextProvider } from '@/contexts/modal/provider';

describe('useModal', () => {
  describe('when the hook is called', () => {
    it('should return the modal context value', () => {
      const { result } = renderHook(() => useModal(), {
        wrapper: ModalContextProvider,
      });

      expect(result.current).toEqual({ show: expect.any(Function), close: expect.any(Function) });
    });
  });
});
