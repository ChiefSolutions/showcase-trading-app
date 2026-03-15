import { TabIconProps } from '../icons.types';
import { Portfolio } from './index';

export const PortfolioTabIcon = ({ color }: TabIconProps) => {
  return <Portfolio testID="portfolio-tab-icon" height={28} width={28} color={color} />;
};
