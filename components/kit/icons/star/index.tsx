import { FC, memo } from 'react';

import Svg, { Path } from 'react-native-svg';

import { IconProps } from '../icons.types';

const StarIconComponent: FC<IconProps> = ({ height = 24, width = 24, color = '#1f1f1f', ...props }) => {
  return (
    <Svg {...props} height={height} viewBox="0 -960 960 960" width={width} fill={color}>
      <Path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
    </Svg>
  );
};

const StarIconFilledComponent: FC<IconProps> = ({ height = 24, width = 24, color = '#1f1f1f', ...props }) => {
  return (
    <Svg {...props} height={height} viewBox="0 -960 960 960" width={width} fill={color}>
      <Path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
    </Svg>
  );
};

const StarIcon = memo(StarIconComponent);
const StarIconFilled = memo(StarIconFilledComponent);

export { StarIcon, StarIconFilled };
