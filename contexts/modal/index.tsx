import { createContext } from 'react';

import { ModalName, ModalProps } from '@/components/modals/modals.types';

export interface ModalContextValue {
  show: (name: ModalName, props: ModalProps) => void;
  close: (cb?: () => void) => void;
}

export const ModalContext = createContext<ModalContextValue>({
  show: (_name: ModalName, _props: ModalProps) => {},
  close: (_cb?: () => void) => {},
});
