import { FC, memo, useEffect, useMemo, useRef, useState } from 'react';

import { Animated, PanResponder, StyleSheet, View } from 'react-native';

import {
  BottomSheetSlidingContentProps,
  OnMoveShouldSetPanResponder,
  OnPanResponderRelease,
} from '@/components/kit/bottom-sheet/bottom-sheet.types';
import { MAX_HEIGHT } from '@/constants';
import { useStyles } from '@/theme';
import { ThemeDefinitionColors } from '@/theme/types';

const BottomSheetSlidingContentComponent: FC<BottomSheetSlidingContentProps> = ({
  children,
  panY,
  handleDismiss,
  visible,
  isFullScreen,
}) => {
  const [modalHeight] = useState<number>(0);
  const styles = useStyles(_styles);

  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const animatedViewStyles = useMemo(() => {
    return [
      styles.container,
      isFullScreen && { height: MAX_HEIGHT },
      {
        transform: [
          {
            translateY: panY.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: [0, 0, 1], // Prevents pulling the modal UP past its height
            }),
          },
        ],
      },
    ];
  }, [isFullScreen, panY, styles.container]);

  useEffect(() => {
    if (visible) {
      resetPositionAnim.start();
    }
  }, [resetPositionAnim, visible]);

  const onStartShouldSetPanResponder = () => true;
  const onMoveShouldSetPanResponder: OnMoveShouldSetPanResponder = (_, gestureState) => {
    return Math.abs(gestureState.dy) > 5;
  };
  const onPanResponderRelease: OnPanResponderRelease = (_, gs) => {
    if (gs.dy > modalHeight * 0.2 || gs.vy > 1.5) {
      return handleDismiss();
    }
    return resetPositionAnim.start();
  };

  const panResponders = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder,
      onPanResponderRelease,
      onStartShouldSetPanResponder,
      onPanResponderMove: Animated.event([null, { dy: panY }], {
        useNativeDriver: false,
      }),
    }),
  ).current;

  return (
    <Animated.View style={animatedViewStyles}>
      <View style={styles.sliderIndicatorRow} {...panResponders.panHandlers}>
        <View style={styles.sliderIndicator} />
      </View>
      {children}
    </Animated.View>
  );
};

export const BottomSheetSlidingContent = memo(BottomSheetSlidingContentComponent);
const _styles = (colors: ThemeDefinitionColors) => {
  return StyleSheet.create({
    overlay: {
      backgroundColor: colors.modalOverlay,
      flex: 1,
      justifyContent: 'flex-end',
    },
    container: {
      backgroundColor: colors.modalBackground,
      borderWidth: 1,
      borderColor: colors.modalBorder,
      paddingBottom: 20,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
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
