import { Button, View } from 'react-native';

import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { ModalName } from '@/components/modals/modals.types';
import { MODAL_NAMES } from '@/constants/modals';

import { useModal } from '../hook';
import { ModalContextProvider } from './index';

const mockCloseCallback = jest.fn();
const ModalTestComponent = ({ modalName, cb }: { modalName: ModalName; cb?: () => void }) => {
  const { show, close } = useModal();

  const openModal = () => show(modalName, { id: 'bitcoin', name: 'BitCoin' });
  const closeModal = () => {
    close(cb ? cb : undefined);
  };

  return (
    <View>
      <Button title="Open" onPress={openModal} />
      <Button title="Close" onPress={closeModal} />
    </View>
  );
};

const renderTestComponent = (modalName = MODAL_NAMES.COIN, cb?: () => void) => {
  render(
    <ModalContextProvider>
      <ModalTestComponent modalName={modalName} cb={cb} />
    </ModalContextProvider>,
  );
};

describe('ModalContextProvider', () => {
  describe('when show is called', () => {
    beforeEach(() => {
      renderTestComponent();
    });

    it('should show the modal', () => {
      const open = screen.getByText('Open');

      act(() => {
        fireEvent.press(open);
      });

      expect(screen.getByText('BitCoin')).toBeOnTheScreen();
    });
  });

  describe('when close is called', () => {
    beforeEach(() => {
      renderTestComponent();
    });

    it('should not show the modal', () => {
      const open = screen.getByText('Open');
      const close = screen.getByText('Close');

      act(() => {
        fireEvent.press(open);
      });

      act(() => {
        fireEvent.press(close);
      });

      expect(screen.queryByText('BitCoin')).not.toBeOnTheScreen();
    });
  });

  describe('when an invalid modal name is provided', () => {
    beforeEach(() => {
      renderTestComponent('test' as ModalName);
    });

    it('should not show the modal', () => {
      const open = screen.getByText('Open');

      act(() => {
        fireEvent.press(open);
      });

      expect(screen.queryByText('BitCoin')).not.toBeOnTheScreen();
    });
  });

  describe('when a close callback is provided', () => {
    beforeEach(() => {
      renderTestComponent(MODAL_NAMES.COIN, mockCloseCallback);
    });

    it('should not show the modal', () => {
      const open = screen.getByText('Open');
      const close = screen.getByText('Close');

      act(() => {
        fireEvent.press(open);
      });

      act(() => {
        fireEvent.press(close);
      });

      expect(mockCloseCallback).toHaveBeenCalled();
    });
  });
});
