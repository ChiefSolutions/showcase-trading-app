import { FC, memo } from 'react';

import Svg, { Path } from 'react-native-svg';

import { IconProps } from '@/components/kit/icons/icons.types';

const RemoveIconComponent: FC<IconProps> = ({ height, width, color = '#1f1f1f' }) => {
  return (
    <Svg viewBox="0 -960 960 960" height={height} width={width} fill={color}>
      <Path d="M200-440v-80h560v80H200Z" />
    </Svg>
  );
};

export const Remove = memo(RemoveIconComponent);
