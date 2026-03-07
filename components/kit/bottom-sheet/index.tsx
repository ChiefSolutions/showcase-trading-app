import React, { memo, useEffect, useMemo, useRef } from 'react';

import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
// const SHEET_HEIGHT = SCREEN_HEIGHT * 0.5;

const BottomSheetComponent = ({
  visible,
  onClose,
  height = '50%',
  showBackDrop = true,
  style,
  children,
}: any) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  // Convert height prop → px
  const sheetHeight = useMemo(() => {
    if (typeof height === 'string' && height.includes('%')) {
      return (parseFloat(height) / 100) * SCREEN_HEIGHT;
    }
    return height; // number = px
  }, [height]);

  const OPEN_POSITION = SCREEN_HEIGHT - sheetHeight;

  // Animate open/close
  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: OPEN_POSITION,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(translateY, {
        toValue: SCREEN_HEIGHT,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, OPEN_POSITION, translateY]);

  // Drag logic
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => {
        return Math.abs(gesture.dy) > 5;
      },

      onPanResponderMove: (_, gesture) => {
        const newPosition = OPEN_POSITION + gesture.dy;

        if (gesture.dy > 0) {
          translateY.setValue(newPosition);
        }
      },

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > sheetHeight * 0.25) {
          // close if dragged 25% down
          Animated.spring(translateY, {
            toValue: SCREEN_HEIGHT,
            useNativeDriver: true,
          }).start(() => onClose());
        } else {
          // snap back
          Animated.spring(translateY, {
            toValue: OPEN_POSITION,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <>
      {/* Overlay */}
      {visible && showBackDrop && (
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      {/* Bottom Sheet */}
      <Animated.View
        style={[
          styles.sheet,
          style, // 👈 allow overrides
          {
            transform: [{ translateY }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        {/* Handle */}
        <View style={styles.handle} />

        {children}
      </Animated.View>
    </>
  );
};

export const BottomSheet = memo(BottomSheetComponent);
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT, // full height container, we translate it
    backgroundColor: '#121212',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#666',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
});
