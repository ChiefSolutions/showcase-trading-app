import { Home } from './home';
import { TabIconProps } from './icons.types';

export const DashboardTab = ({ color }: TabIconProps) => {
  return <Home height={28} width={28} color={color} />;
};
