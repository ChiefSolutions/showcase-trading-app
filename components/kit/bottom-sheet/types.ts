import { ReactNode } from 'react';

import { StyleProp, ViewStyle } from 'react-native';

import { PanResponderCallbacks } from 'react-native/Libraries/Interaction/PanResponder';

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  height?: number; // optional now, can auto-measure
  showBackDrop?: boolean;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}
export type OnMoveShouldSetPanResponder = PanResponderCallbacks['onMoveShouldSetPanResponder'];
export type OnPanResponderMove = PanResponderCallbacks['onPanResponderMove'];
export type OnPanResponderRelease = PanResponderCallbacks['onPanResponderRelease'];
