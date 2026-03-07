import { ReactNode } from 'react';

import { StyleProp, TextStyle } from 'react-native';

import { TEXT_TYPE } from '@/constants/text';

export type TextType = (typeof TEXT_TYPE)[keyof typeof TEXT_TYPE];

export interface TextProps {
  type: TextType;
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}
