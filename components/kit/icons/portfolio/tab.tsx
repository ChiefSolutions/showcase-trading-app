import { TabIconProps } from '../icons.types';
import { Portfolio } from './index';

export const PortfolioTab = ({ color }: TabIconProps) => {
  return <Portfolio height={28} width={28} color={color} />;
};
