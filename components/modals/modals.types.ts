import { ComponentType } from 'react';

import { MODAL_NAMES } from '@/constants/modals';

import { CoinModalProps } from './coin';

export type ModalComponentProps = CoinModalProps;
export type ModalComponents = ModalComponent<ModalComponentProps>;
export type ModalProps = CoinModalProps;
export type ModalComponent<P extends ModalProps = ModalProps> = ComponentType<P>;
export type ModalName = (typeof MODAL_NAMES)[keyof typeof MODAL_NAMES];
export type ModalRegistry = Record<ModalName, ModalComponents | undefined>;
