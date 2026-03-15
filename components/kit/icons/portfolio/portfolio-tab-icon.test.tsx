import { render, screen } from '@testing-library/react-native';

import { TabIconProps } from '../icons.types';
import { PortfolioTabIcon } from './tab';

const renderTestComponent = (props: TabIconProps) => {
  return render(<PortfolioTabIcon {...props} />);
};

describe('PortfolioTab', () => {
  describe('when rendered', () => {
    beforeEach(() => {
      renderTestComponent({ color: 'red' });
    });

    it('should display the dashboard tab icon', () => {
      const icon = screen.getByTestId('portfolio-tab-icon');

      expect(icon).toBeOnTheScreen();
      expect(icon.props.fill).toBe('red');
      expect(icon.props.height).toBe(28);
      expect(icon.props.width).toBe(28);
    });
  });
});
