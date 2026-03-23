import { render, screen } from '@testing-library/react-native';

import { IconName, SvgIcon } from '@/components/kit/svg-icon/index';

const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
const renderTestComponent = (name = 'EUR/USD') => {
  render(<SvgIcon name={name as IconName} testID={'test-eur-usd'} />);
};

describe('SvgIcon', () => {
  describe('when the icon name exists', () => {
    beforeEach(() => {
      renderTestComponent();
    });

    it('should render the svg icon', () => {
      expect(screen.getByTestId('test-eur-usd')).toBeDefined();
    });
  });

  describe('when the icon name does not exist', () => {
    beforeEach(() => {
      renderTestComponent('uknown');
    });

    it('should render the svg icon', () => {
      expect(screen.queryByTestId('test-eur-usd')).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith('SvgIcon: No icon found for name "uknown"');

      consoleSpy.mockClear();
    });
  });
});
