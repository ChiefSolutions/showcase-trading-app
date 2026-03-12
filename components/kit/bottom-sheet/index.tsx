import React, { FC, memo, useRef } from 'react';

import { Modal, StyleSheet, View } from 'react-native';

import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { scheduleOnRN } from 'react-native-worklets';

import { BottomSheetProps, BottomSheetRef } from '@/components/kit/bottom-sheet/bottom-sheet.types';
import { BottomSheetSlidingContent } from '@/components/kit/bottom-sheet/sliding-content';
import { useStyles } from '@/theme';
import { ThemeDefinitionColors } from '@/theme/types';

// TODO - refactor
const BottomSheetComponent: FC<BottomSheetProps> = ({
  visible,
  onRequestClose,
  isFullScreen = false,
  children,
}) => {
  const sheetRef = useRef<BottomSheetRef>(null);
  const styles = useStyles(_styles);

  const handBackdropTapDismiss = () => {
    if (sheetRef.current) {
      sheetRef.current.dismiss();
      return;
    }

    onRequestClose();
  };

  const backdropTap = Gesture.Tap().onEnd(() => {
    scheduleOnRN(handBackdropTapDismiss);
  });

  return (
    <Modal
      testID={'bottom-sheet-modal'}
      animationType="none"
      visible={visible}
      transparent
      onRequestClose={onRequestClose}
    >
      <GestureHandlerRootView>
        <GestureDetector gesture={backdropTap}>
          <View style={styles.overlay} testID="modal-backdrop" collapsable={false}>
            {/* The content container is now a child of the overlay */}
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <GestureDetector gesture={Gesture.Tap()}>
                <BottomSheetSlidingContent
                  ref={sheetRef}
                  visible={visible}
                  onRequestClose={onRequestClose}
                  isFullScreen={isFullScreen}
                >
                  {children}
                </BottomSheetSlidingContent>
              </GestureDetector>
            </View>
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
};

export const BottomSheet = memo(BottomSheetComponent);

const _styles = (color: ThemeDefinitionColors) => {
  return StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: color.modalOverlay,
    },
  });
};
