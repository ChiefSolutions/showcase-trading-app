import { ReactNode } from 'react';

export interface BottomSheetProps {
  visible: boolean;
  onRequestClose: () => void;
  isFullScreen?: boolean;
  children: ReactNode;
}

export interface BottomSheetRef {
  dismiss: () => void;
}
