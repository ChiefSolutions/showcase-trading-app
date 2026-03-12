import React from 'react';

import '@testing-library/jest-native/extend-expect';
import { render, screen, waitFor } from '@testing-library/react-native';

import { WatchList } from './index';

const renderComponent = () => {
  render(<WatchList />);
};

describe('WatchList', () => {
  beforeEach(() => {
    waitFor(() => {
      renderComponent();
    });
  });

  describe('when rendered', () => {
    it('should render the elements for watchlist', () => {
      const heading = screen.getByTestId('watchlist-heading');
      const flashList = screen.getByTestId('watchlist-flash-list');

      expect(heading).toBeOnTheScreen();
      expect(flashList).toBeOnTheScreen();
    });
  });
});
