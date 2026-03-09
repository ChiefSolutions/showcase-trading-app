import { TabIconProps } from '@/components/kit/icons/types';
import { IconSymbol } from '@/components/ui/icon-symbol';

export const HomeTab = ({ color }: TabIconProps) => {
  return <IconSymbol size={28} name="house.fill" color={color} />;
};
