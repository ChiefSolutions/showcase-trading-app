import { ReactNode } from 'react';

import { Animated } from 'react-native';

import { PanResponderCallbacks } from 'react-native/Libraries/Interaction/PanResponder';

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  isFullScreen?: boolean;
  children: ReactNode;
}

export interface BottomSheetSlidingContentProps extends Omit<BottomSheetProps, 'onClose'> {
  handleDismiss: () => void;
  panY: Animated.Value;
}

export type OnMoveShouldSetPanResponder = PanResponderCallbacks['onMoveShouldSetPanResponder'];
export type OnPanResponderRelease = PanResponderCallbacks['onPanResponderRelease'];
