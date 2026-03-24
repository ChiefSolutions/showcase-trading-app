import { SvgIcon } from '@/components/kit/svg-icon';

import { TabIconProps } from '../icons.types';

export const MarketsTabIcon = ({ color }: TabIconProps) => {
  return <SvgIcon testID="markets-tab-icon" name={'markets'} height={28} width={28} color={color} />;
};
