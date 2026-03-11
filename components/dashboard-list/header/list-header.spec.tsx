import { render, screen } from '@testing-library/react-native';

import { DashboardListSectionHeader } from '@/components/dashboard-list/header/index';

const titleText = 'This is a header title';
const copyText = 'This is a header copy';
const style = { backgroundColor: 'red' };

describe('DashboardListEmptyState', () => {
  describe('when rendered', () => {
    beforeEach(() => {
      render(<DashboardListSectionHeader copy={copyText} title={titleText} style={style} />);
    });

    it('should display the heading', () => {
      const titleRegex = new RegExp(titleText, 'i');
      const copyRegex = new RegExp(titleText, 'i');
      const container = screen.getByTestId('list-header-container');
      const title = screen.getByText(titleRegex);
      const copy = screen.getByText(copyRegex);

      expect(container).toBeOnTheScreen();
      expect(container).toHaveStyle(style);
      expect(title).toBeOnTheScreen();
      expect(copy).toBeOnTheScreen();
    });
  });
});
