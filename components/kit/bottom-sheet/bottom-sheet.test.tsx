import React, { useCallback, useState } from 'react';

import { Pressable, Text, View } from 'react-native';

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { Gesture, PanGesture } from 'react-native-gesture-handler';

import { BottomSheet } from '@/components/kit';
import { PanGestureMock, mockOnTapGestureEnd } from '@/test/test-utils';

const panSpy = jest
  .spyOn(Gesture, 'Pan')
  .mockImplementation(() => PanGestureMock as unknown as PanGesture);

jest.mock('react', () => {
  const actual = jest.requireActual('react');

  return {
    ...actual,
  };
});

jest.mock('react-native-gesture-handler', () => {
  const original = jest.requireActual('react-native-gesture-handler');

  return {
    ...original,
    GestureDetector: ({ children }: { children: string }) => <>{children}</>,
    Gesture: {
      Tap: () => {
        return {
          onEnd: jest.fn((cb) => {
            mockOnTapGestureEnd.mockImplementation(cb);
          }),
        };
      },
      Pan: () => jest.fn(),
    },
  };
});

const TestModalContent = () => {
  const [visible, setVisible] = useState(false);
  const showBottomSheet = () => setVisible(true);
  const handleOnRequestClose = useCallback(() => setVisible(false), []);

  return (
    <>
      <Pressable testID="show-bottom-sheet-pressable" onPress={showBottomSheet}></Pressable>
      <BottomSheet visible={visible} onRequestClose={handleOnRequestClose}>
        <View testID="test-bottom-sheet-content">
          <Text>Test Modal Content</Text>
        </View>
      </BottomSheet>
    </>
  );
};

const renderTestComponent = () => {
  return render(<TestModalContent />);
};

describe('BottomSheet', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockOnTapGestureEnd.mockReset();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('when visible', () => {
    beforeEach(async () => {
      renderTestComponent();

      const pressable = screen.getByTestId('show-bottom-sheet-pressable');

      await act(async () => {
        fireEvent.press(pressable);
      });
    });

    it('should reveal the bottom sheet and the content', async () => {
      const modal = screen.getByTestId('bottom-sheet-modal');
      const backDrop = screen.getByTestId('modal-backdrop');
      const content = screen.getByTestId('test-bottom-sheet-content');

      expect(modal).toBeOnTheScreen();
      expect(backDrop).toBeOnTheScreen();
      expect(content).toBeOnTheScreen();
    });

    describe('when backdrop is pressed', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          mockOnTapGestureEnd();
        });
      });

      it('should close the modal', async () => {
        const modal = screen.queryByTestId('bottom-sheet-modal');

        expect(modal).not.toBeOnTheScreen();

        panSpy.mockClear();
      });
    });
  });

  describe('when the forwardRef is not set', () => {
    it('should close the modal', async () => {
      renderTestComponent();

      await act(async () => {
        mockOnTapGestureEnd();
      });

      await waitFor(() => {
        expect(screen.queryByTestId('test-bottom-sheet-content')).toBeNull();
      });
    });
  });
});
