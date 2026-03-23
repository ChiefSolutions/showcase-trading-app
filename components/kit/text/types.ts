import { ReactNode } from 'react';

import { TextProps as RNTextProps, StyleProp, TextStyle } from 'react-native';

import { TEXT_TYPE } from '@/constants';

export type TextType = (typeof TEXT_TYPE)[keyof typeof TEXT_TYPE];

export interface TextProps extends RNTextProps {
  type: TextType;
  children: ReactNode;
  style?: StyleProp<TextStyle>;
  testID?: string;
}
