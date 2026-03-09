import { IconSymbol } from '@/components/ui/icon-symbol';

import { TabIconProps } from './types';

export const PortfolioTab = ({ color }: TabIconProps) => {
  return <IconSymbol size={28} name="paperplane.fill" color={color} />;
};
