import React from 'react';

import '@testing-library/jest-native/extend-expect';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { mockMarketsData } from '@/__mocks__/market-data';
import { MarketListItem } from '@/components/markets/list-tem/index';
import { Market } from '@/components/markets/markets.types';

const mockMarketData = mockMarketsData[5] as Market;

const renderComponent = (market = mockMarketData) => {
  render(<MarketListItem market={market} />);
};

const mockToggle = jest.fn();
const mockIsWatched = jest.fn();

jest.mock('@/stores/watchlist', () => {
  return {
    __esModule: true,
    useWatchlistStore: jest.fn((selector) =>
      selector({
        toggle: mockToggle,
        isWatched: mockIsWatched,
      }),
    ),
  };
});

describe('Market', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('when rendered', () => {
    beforeEach(() => {
      renderComponent();
    });

    it('renders the coin data', () => {
      const pressable = screen.getByTestId('market-pressable');
      const name = screen.getByTestId('market-name');
      const symbol = screen.getByTestId('market-name');
      const lineChart = screen.getByTestId('market-line-chart');
      const currentPrice = screen.getByTestId('market-current-price');
      const priceChangePercentage = screen.getByTestId('market-price-change-percentage');
      const priceChangeArrow = screen.getByTestId('market-price-change-arrow');

      expect(pressable).toBeOnTheScreen();
      expect(name).toBeOnTheScreen();
      expect(symbol).toBeOnTheScreen();
      expect(lineChart).toBeOnTheScreen();
      expect(currentPrice).toBeOnTheScreen();
      expect(priceChangePercentage).toBeOnTheScreen();
      expect(priceChangeArrow).toBeOnTheScreen();
    });
  });

  describe('when the price change is up', () => {
    beforeEach(() => {
      renderComponent({ ...mockMarketData, price_change_percentage_24h: 2 });
    });

    it('reflects the price change going up', () => {
      const priceChangePercentage = screen.getByTestId('market-price-change-percentage');

      expect(priceChangePercentage).toHaveTextContent('▲ 2.00%');
    });
  });

  describe('reflects the price change going down', () => {
    beforeEach(() => {
      renderComponent();
    });

    it('renders the coin data', () => {
      const priceChangePercentage = screen.getByTestId('market-price-change-percentage');

      expect(priceChangePercentage).toHaveTextContent('▼ 0.88%');
    });
  });

  describe('when the watchlist icon is pressed', () => {
    beforeEach(() => {
      mockIsWatched.mockReturnValue(true);
      renderComponent();
    });

    it('should add the coin to watchlist and change the icon', () => {
      const pressable = screen.getByTestId('watchlist-icon-pressable');

      act(() => {
        fireEvent.press(pressable);
      });

      expect(screen.getByTestId('watchlist-icon-selected')).toBeOnTheScreen();
      expect(mockToggle).toHaveBeenCalledWith(mockMarketData.id);
    });
  });
});
