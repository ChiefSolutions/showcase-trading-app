import React, { FC, memo, useCallback, useRef } from 'react';

import { Animated, Modal, StyleSheet, View } from 'react-native';

import { BottomSheetProps } from '@/components/kit/bottom-sheet/bottom-sheet.types';
import { BottomSheetSlidingContent } from '@/components/kit/bottom-sheet/sliding-content';
import { SCREEN_HEIGHT } from '@/constants';

// TODO - refactor
const BottomSheetComponent: FC<BottomSheetProps> = ({
  visible,
  onClose,
  isFullScreen = false,
  children,
}) => {
  const panY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const closeAnim = Animated.timing(panY, {
    toValue: SCREEN_HEIGHT,
    duration: 300,
    useNativeDriver: true,
  });

  const handleDismiss = useCallback(() => closeAnim.start(onClose), [closeAnim, onClose]);

  return (
    <Modal animationType="fade" visible={visible} transparent onRequestClose={handleDismiss}>
      <View style={styles.overlay}>
        {/* TODO: The TouchableWithoutFeedback could be added here to close on backdrop tap */}
        <BottomSheetSlidingContent
          visible={visible}
          handleDismiss={handleDismiss}
          panY={panY}
          isFullScreen={isFullScreen}
        >
          {children}
        </BottomSheetSlidingContent>
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
});
