import { act } from 'react';

import { Animated, PanResponder, Text, View } from 'react-native';

import { render, screen } from '@testing-library/react-native';

import { BottomSheetSlidingContent } from '@/components/kit/bottom-sheet/sliding-content/index';
import { MAX_HEIGHT, SCREEN_HEIGHT } from '@/constants';

const mockHandleDismiss = jest.fn();
const panY = new Animated.Value(SCREEN_HEIGHT);

const renderTestComponent = (visible = false, isFullScreen = false) => {
  render(
    <BottomSheetSlidingContent
      handleDismiss={mockHandleDismiss}
      panY={panY}
      visible={visible}
      isFullScreen={isFullScreen}
    >
      <View testID="test-sliding-content-container">
        <Text>Test Modal Content</Text>
      </View>
    </BottomSheetSlidingContent>,
  );
};

describe('BottomSheetSlidingContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('when is visible', () => {
    beforeEach(() => {
      renderTestComponent(true);
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
    beforeEach(() => {
      renderTestComponent(true, true);
    });

    it('should show the modal in full screen mode', () => {
      const slidingContainer = screen.getByTestId('bottom-sheet-sliding-content');

      expect(slidingContainer.props.style.height).toBe(MAX_HEIGHT);
    });
  });

  describe('when the modal is dragged down', () => {
    beforeEach(() => {
      jest.spyOn(PanResponder, 'create').mockImplementation((config) => {
        return {
          panHandlers: {
            onResponderRelease: (event) => {
              if (config?.onPanResponderRelease) {
                config.onPanResponderRelease(event, { dy: 2, vy: 2 } as any);
              }
            },
          },
        };
      });

      renderTestComponent(true, true);
    });

    it('should close the modal', async () => {
      const handle = screen.getByTestId('bottom-sheet-indicator-row');

      act(() => {
        handle.props.onResponderRelease({}, { dy: 200, vy: 2.0 });
      });

      expect(mockHandleDismiss).toHaveBeenCalled();
    });
  });
});
