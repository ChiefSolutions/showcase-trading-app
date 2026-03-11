import { render, screen } from '@testing-library/react-native';

import { DashboardListEmptyState } from '@/components/dashboard-list/empty-state/index';

describe('DashboardListEmptyState', () => {
  describe('when rendered', () => {
    beforeEach(() => {
      render(<DashboardListEmptyState message={'Nothing to show here'} />);
    });

    it('should display the empty state icon and message', () => {
      const icon = screen.getByTestId('empty-state-icon');
      const message = screen.getByTestId('empty-state-message');

      screen.debug();
      expect(icon).toBeOnTheScreen();
      expect(message).toBeOnTheScreen();
    });
  });
});
