import { render, screen } from '@testing-library/react-native';

import { Balance } from '@/components/balance/index';

const renderTestComponent = () => {
  render(<Balance />);
};

describe('Balance', () => {
  describe('when rendered', () => {
    beforeEach(() => {
      renderTestComponent();
    });

    it('should show the account balance', () => {
      const heading = screen.getByText('Account Balance');
      const copy = screen.getByText('Some funds may be reserved for trades or pending withdrawals.');
      const amount = screen.getByTestId('balance-amount');
      const period = screen.getByText('LAST 24H');
      const periodAmount = screen.getByText('$0.00');
      const rateOfReturn = screen.getByText('RATE OF RETURN');
      const rateOfReturnPercentage = screen.getByText('0.0%');
      const depositButton = screen.getByTestId('deposit-button');
      const withdrawButton = screen.getByTestId('withdraw-button');

      expect(heading).toBeOnTheScreen();
      expect(copy).toBeOnTheScreen();
      expect(amount).toHaveTextContent('$53,450.00');
      expect(period).toBeOnTheScreen();
      expect(periodAmount).toBeOnTheScreen();
      expect(rateOfReturn).toBeOnTheScreen();
      expect(rateOfReturnPercentage).toBeOnTheScreen();
      expect(depositButton).toBeOnTheScreen();
      expect(withdrawButton).toBeOnTheScreen();
    });
  });
});
