import { render, screen } from '@testing-library/react-native';

import { HomeListEmptyState } from '@/components/home-list/empty-state/index';

describe('HomeListEmptyState', () => {
  describe('when rendered', () => {
    beforeEach(() => {
      render(<HomeListEmptyState message={'Nothing to show here'} />);
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
