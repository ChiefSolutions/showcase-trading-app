import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';

import { LayoutChangeEvent, StyleSheet, View } from 'react-native';

import { GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { useStyles } from '@/theme';
import { ThemeDefinitionColors } from '@/theme/types';
import { createGesturePan, getWindowDimensions } from '@/utils';

import { BottomSheetProps, BottomSheetRef } from '../bottom-sheet.types';

const SCREEN_HEIGHT = getWindowDimensions().height;
export const MIN_HEIGHT = Math.floor(SCREEN_HEIGHT * 0.25);
export const MAX_HEIGHT = Math.floor(SCREEN_HEIGHT * 0.9);

const BottomSheetSlidingContentComponent = forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ children, onRequestClose, visible, isFullScreen }, ref) => {
    const styles = useStyles(_styles);
    const [modalHeight, setModalHeight] = useState<number>(MIN_HEIGHT);
    const translateY = useSharedValue(SCREEN_HEIGHT);

    // Define the slide-down function
    const animateDismiss = useCallback(() => {
      translateY.value = withTiming(
        modalHeight,
        {
          duration: 250,
        },
        () => {
          scheduleOnRN(onRequestClose);
        },
      );
    }, [modalHeight, onRequestClose, translateY]);

    // Expose this to enable slide down animation when backdrop is pressed
    useImperativeHandle(ref, () => ({
      dismiss: animateDismiss,
    }));

    // Trigger Entrance Animation
    useEffect(() => {
      if (visible) {
        // Use withTiming for a smooth slide-in without the bounce
        translateY.value = withTiming(0, {
          duration: 350,
          easing: Easing.out(Easing.exp),
        });

        return;
      }

      translateY.value = withTiming(modalHeight, {
        duration: 300,
      });
    }, [visible, modalHeight, translateY]);

    const gesture = createGesturePan(modalHeight, translateY, onRequestClose);

    const handleOnLayout = useCallback((event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout;
      setModalHeight(height);
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));

    const contentStyles = useMemo(() => {
      return [styles.container, isFullScreen && { height: MAX_HEIGHT }, animatedStyle];
    }, [animatedStyle, isFullScreen, styles.container]);

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View
          testID="bottom-sheet-sliding-content"
          style={contentStyles}
          onLayout={handleOnLayout}
        >
          <View testID="bottom-sheet-indicator-row" style={styles.sliderIndicatorRow}>
            <View style={styles.sliderIndicator} />
          </View>
          {children}
        </Animated.View>
      </GestureDetector>
    );
  },
);

BottomSheetSlidingContentComponent.displayName = 'BottomSheetSlidingContentComponent';
export const BottomSheetSlidingContent = memo(BottomSheetSlidingContentComponent);
const _styles = (colors: ThemeDefinitionColors) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.modalBackground,
      borderWidth: 1,
      borderColor: colors.modalBorder,
      paddingBottom: 20,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      minHeight: MIN_HEIGHT,
      maxHeight: MAX_HEIGHT,
    },
    sliderIndicatorRow: {
      flexDirection: 'row',
      marginBottom: 12,
      paddingVertical: 16,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    },
    sliderIndicator: {
      backgroundColor: '#CECECE',
      height: 5,
      width: 40,
      borderRadius: 10,
    },
  });
};
