import { render, screen } from '@testing-library/react-native';

import { Remove } from '@/components/kit';

describe('RemoveIcon', () => {
  describe('when no props are provided', () => {
    beforeEach(() => {
      render(<Remove testID="remove-icon" />);
    });

    it('renders the icon with default props', () => {
      const icon = screen.getByTestId('remove-icon');

      expect(icon).toBeOnTheScreen();
      expect(icon.props.height).toBe(24);
      expect(icon.props.width).toBe(24);
    });
  });

  describe('when props are provided', () => {
    beforeEach(() => {
      render(<Remove testID="remove-icon" width={20} height={20} color={'red'} />);
    });

    it('renders the icon with default props', () => {
      const icon = screen.getByTestId('remove-icon');

      expect(icon.props.height).toBe(20);
      expect(icon.props.width).toBe(20);
      expect(icon.props.fill).toBe('red');
    });
  });
});
