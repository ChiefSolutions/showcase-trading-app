import React, { memo, useEffect, useRef, useState } from 'react';

import { Animated, Dimensions, Modal, PanResponder, StyleSheet, View } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const MAX_HEIGHT = SCREEN_HEIGHT * 0.9;

// TODO - refactor
const BottomSheetComponent = ({
  visible,
  onClose,
  isFullScreen = true,
  height = '50%',
  showBackDrop = true,
  style,
  children,
}: any) => {
  // 1. Start "off-screen" using screen height as a safe initial buffer
  const panY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [modalHeight, setModalHeight] = useState(0);
  const childRef = useRef<View | null>(null);

  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeAnim = Animated.timing(panY, {
    toValue: SCREEN_HEIGHT,
    duration: 300,
    useNativeDriver: true,
  });

  const handleDismiss = () => closeAnim.start(onClose);

  // 2. Capture the height once the children render
  const onLayout = () => {
    setModalHeight(500);
  };

  useEffect(() => {
    if (visible) {
      resetPositionAnim.start();
    }
  }, [resetPositionAnim, visible]);

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only take control if the user is swiping down
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: Animated.event([null, { dy: panY }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gs) => {
        // 3. Logic: If dragged down more than 20% of its OWN height, close it
        if (gs.dy > modalHeight * 0.2 || gs.vy > 1.5) {
          return handleDismiss();
        }
        return resetPositionAnim.start();
      },
    }),
  ).current;

  return (
    <Modal animationType="fade" visible={true} transparent onRequestClose={handleDismiss}>
      <View style={styles.overlay}>
        {/* The TouchableWithoutFeedback could be added here to close on backdrop tap */}
        <Animated.View
          style={[
            styles.container,
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
          ]}
          onLayout={onLayout}
        >
          <View style={styles.sliderIndicatorRow} {...panResponders.panHandlers}>
            <View style={styles.sliderIndicator} />
          </View>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

export const BottomSheet = memo(BottomSheetComponent);

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'flex-end', // Aligns modal to bottom
  },
  container: {
    backgroundColor: 'white',
    paddingTop: 12,
    paddingBottom: 20,
    paddingHorizontal: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    // minHeight: 200, // Optional: prevents it looking too squished with tiny content
    maxHeight: MAX_HEIGHT, // Lead Dev Tip: Always cap it so it doesn't cover the whole screen
  },
  sliderIndicatorRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderIndicator: {
    backgroundColor: '#CECECE',
    height: 5,
    width: 40,
    borderRadius: 10,
  },
});
