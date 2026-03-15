import { ReactNode } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { Gesture, PanGesture } from 'react-native-gesture-handler';
import * as Reanimated from 'react-native-reanimated';

import { PanGestureMock, mockOnPanGestureEnd, mockOnPanGestureUpdate } from '@/__mocks__/test-utils';

import { BottomSheetSlidingContent, MAX_HEIGHT } from './index';

const mockHandleDismiss = jest.fn();

jest.mock('react-native-gesture-handler', () => {
  const actual = jest.requireActual('react-native-gesture-handler');
  return {
    ...actual,
    GestureDetector: ({ children }: { children: ReactNode }) => children,
  };
});

const panSpy = jest.spyOn(Gesture, 'Pan').mockImplementation(() => PanGestureMock as unknown as PanGesture);

jest.mock('@/utils/shared/get-window-dimensions', () => ({
  getWindowDimensions: () => ({ height: 800 }),
}));

const renderTestComponent = async (visible = false, isFullScreen = false) => {
  const renderResult = render(
    <BottomSheetSlidingContent onRequestClose={mockHandleDismiss} visible={visible} isFullScreen={isFullScreen}>
      <View testID="test-sliding-content-container">
        <Text>Test Modal Content</Text>
      </View>
    </BottomSheetSlidingContent>,
  );

  await waitFor(() => {
    expect(renderResult).toBeDefined();
  });
};

describe('BottomSheetSlidingContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockOnPanGestureUpdate.mockReset();
    mockOnPanGestureEnd.mockReset();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('when is visible', () => {
    beforeEach(async () => {
      await renderTestComponent(true);
    });

    it('should show the modal content', () => {
      const slidingContainer = screen.getByTestId('bottom-sheet-sliding-content');
      const dragIndicatorContainer = screen.getByTestId('bottom-sheet-indicator-row');
      const testContainer = screen.getByTestId('test-sliding-content-container');

      expect(slidingContainer).toBeOnTheScreen();
      expect(dragIndicatorContainer).toBeOnTheScreen();
      expect(testContainer).toBeOnTheScreen();
    });
  });

  describe('when is full screen', () => {
    beforeEach(async () => {
      await renderTestComponent(true, true);
    });

    it('should show the modal in full screen mode', () => {
      const slidingContainer = screen.getByTestId('bottom-sheet-sliding-content');
      const flattenedStyle = StyleSheet.flatten(slidingContainer.props.style);

      expect(flattenedStyle.height).toBe(MAX_HEIGHT);
    });
  });

  describe('when the modal is dragged down', () => {
    beforeEach(async () => {
      await renderTestComponent(true, true);
    });

    it('should close the modal', async () => {
      const slidingContainer = screen.getByTestId('bottom-sheet-sliding-content');
      const flattenedStyle = StyleSheet.flatten(slidingContainer.props.style);
      const modalHeight = flattenedStyle.height;

      act(() => {
        mockOnPanGestureUpdate({ translationY: 100 });
      });

      act(() => {
        mockOnPanGestureEnd({
          translationY: modalHeight * 0.3,
          velocityY: 0,
        });
      });

      expect(mockHandleDismiss).toHaveBeenCalled();
      panSpy.mockClear();
    });
  });

  describe('when is not visible', () => {
    beforeEach(async () => {
      await renderTestComponent(false);
    });

    it('should not show the modal content', () => {
      expect(Reanimated.withTiming).toHaveBeenCalledWith(200, { duration: 300 });
    });
  });

  describe('when on layout is called', () => {
    beforeEach(async () => {
      await renderTestComponent(true);
    });

    it('should show the modal content', async () => {
      const slidingContainer = screen.getByTestId('bottom-sheet-sliding-content');

      await waitFor(() => {
        fireEvent(slidingContainer, 'layout', {
          nativeEvent: {
            layout: {
              height: 420,
              width: 300,
              x: 0,
              y: 0,
            },
          },
        });
      });

      expect(Reanimated.withTiming).toHaveBeenCalledWith(0, expect.objectContaining({ duration: 350, easing: expect.any(Function) }));
    });
  });
});
