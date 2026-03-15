import { Home } from '../home';
import { TabIconProps } from '../icons.types';

export const DashboardTabIcon = ({ color }: TabIconProps) => {
  return <Home testID="dashboard-tab-icon" height={28} width={28} color={color} />;
};
