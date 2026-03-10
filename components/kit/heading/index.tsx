import { FC, memo } from 'react';

import { View } from 'react-native';

import { TEXT_TYPE } from '@/constants';

import { Text } from '../text';

export interface HeadingProps {
  title: string;
  copy?: string;
  testID?: string;
}

const HeadingComponent: FC<HeadingProps> = ({ title, copy, testID }) => {
  return (
    <View testID={testID}>
      <Text type={TEXT_TYPE.heading}>{title}</Text>
      {!!copy && <Text type={TEXT_TYPE.copy}>{copy}</Text>}
    </View>
  );
};

export const Heading = memo(HeadingComponent);
