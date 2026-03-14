import { render, screen } from '@testing-library/react-native';

import { StarIcon } from '.';

describe('StarIcon', () => {
  describe('when no props are provided', () => {
    beforeEach(() => {
      render(<StarIcon testID="logo-icon" />);
    });

    it('renders the icon with default props', () => {
      const icon = screen.getByTestId('logo-icon');

      expect(icon).toBeOnTheScreen();
      expect(icon.props.height).toBe(24);
      expect(icon.props.width).toBe(24);
    });
  });

  describe('when props are provided', () => {
    beforeEach(() => {
      render(<StarIcon testID="logo-icon" width={20} height={20} color={'red'} />);
    });

    it('renders the icon with default props', () => {
      const icon = screen.getByTestId('logo-icon');

      expect(icon.props.height).toBe(20);
      expect(icon.props.width).toBe(20);
      expect(icon.props.fill).toBe('red');
    });
  });
});

describe('StarIconFilled', () => {
  describe('when no props are provided', () => {
    beforeEach(() => {
      render(<StarIcon testID="logo-icon" />);
    });

    it('renders the icon with default props', () => {
      const icon = screen.getByTestId('logo-icon');

      expect(icon).toBeOnTheScreen();
      expect(icon.props.height).toBe(24);
      expect(icon.props.width).toBe(24);
    });
  });

  describe('when props are provided', () => {
    beforeEach(() => {
      render(<StarIcon testID="logo-icon" width={20} height={20} color={'blue'} />);
    });

    it('renders the icon with default props', () => {
      const icon = screen.getByTestId('logo-icon');

      expect(icon.props.height).toBe(20);
      expect(icon.props.width).toBe(20);
    });
  });
});
