import { render, screen } from '@testing-library/react-native';

import { Logo } from '.';

const renderTestComponent = (props = {}) => {
  render(<Logo testID="logo-icon" {...props} />);
};

describe('LogoIcon', () => {
  describe('when no props are provided', () => {
    beforeEach(() => {
      renderTestComponent();
    });

    it('renders the icon with default props', () => {
      const icon = screen.getByTestId('logo-icon');

      expect(icon).toBeOnTheScreen();
      expect(icon.props.height).toBe(200);
      expect(icon.props.width).toBe(200);
    });
  });

  describe('when props are provided', () => {
    beforeEach(() => {
      renderTestComponent({ width: 24, height: 24 });
    });

    it('renders the icon with default props', () => {
      const icon = screen.getByTestId('logo-icon');

      expect(icon.props.height).toBe(24);
      expect(icon.props.width).toBe(24);
    });
  });
});
