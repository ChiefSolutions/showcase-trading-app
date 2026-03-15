import { render, screen } from '@testing-library/react-native';

import { TabIconProps } from '@/components/kit/icons/icons.types';

import { DashboardTabIcon } from '.';

const renderTestComponent = (props: TabIconProps) => {
  return render(<DashboardTabIcon {...props} />);
};

describe('DashboardTab', () => {
  describe('when rendered', () => {
    beforeEach(() => {
      renderTestComponent({ color: 'red' });
    });

    it('should display the dashboard tab icon', () => {
      const icon = screen.getByTestId('dashboard-tab-icon');

      expect(icon).toBeOnTheScreen();
      expect(icon.props.fill).toBe('red');
      expect(icon.props.height).toBe(28);
      expect(icon.props.width).toBe(28);
    });
  });
});
