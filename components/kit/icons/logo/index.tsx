import React, { FC, memo } from 'react';

import Svg, { Path } from 'react-native-svg';

import { IconProps } from '@/components/kit/icons/icons.types';

const LogoComponent: FC<IconProps> = ({ width = 200, height = 200, color = '#ffffff', testID }) => {
  return (
    <Svg testID={testID} width={width} height={height} viewBox="0 0 64 64" fill="none" preserveAspectRatio="xMidYMid meet">
      {/* Left bar */}
      <Path
        d="M25.55,60c2.61,0,4.73-2.12,4.73-4.73V5.5c0-.59-.35-1.13-.89-1.37-.55-.24-1.18-.14-1.62.26L9.78,20.85c-.98.9-1.54,2.18-1.53,3.52.02,1.33.6,2.6,1.6,3.48,1.66,1.47,4.08,1.58,5.87.28l5.1-3.71v30.85c0,2.61,2.13,4.73,4.73,4.73Z"
        fill={color}
      />
      {/* Right bar */}
      <Path
        d="M38.45,4c-2.61,0-4.73,2.12-4.73,4.73v49.77c0,.59.35,1.13.89,1.37.2.09.4.13.61.13.37,0,.73-.14,1.01-.39l17.99-16.46c.98-.9,1.54-2.18,1.53-3.52-.02-1.33-.6-2.6-1.6-3.48-1.66-1.46-4.07-1.58-5.87-.28l-5.1,3.71V8.73c0-2.61-2.13-4.73-4.73-4.73Z"
        fill={color}
      />
    </Svg>
  );
};

export const Logo = memo(LogoComponent);
