import React from 'react';

import '@testing-library/jest-native/extend-expect';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import coins from '@/data/crypto.json';

import { Coin } from '../types';
import { CoinListItem } from './index';

const data = coins.data as Coin[];
const renderTestCoinListItem = (coin?: Coin) => {
  render(<CoinListItem coin={coin || data[0]} />);
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

describe('CoinListItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('when rendered', () => {
    beforeEach(() => {
      renderTestCoinListItem();
    });

    it('renders the coin data', () => {
      const pressable = screen.getByTestId('coin-pressable');
      const image = screen.getByTestId('coin-image');
      const name = screen.getByTestId('coin-name');
      const symbol = screen.getByTestId('coin-name');
      const lineChart = screen.getByTestId('coin-line-chart');
      const currentPrice = screen.getByTestId('coin-current-price');
      const priceChangePercentage = screen.getByTestId('coin-price-change-percentage');
      const priceChangeArrow = screen.getByTestId('coin-price-change-arrow');

      expect(pressable).toBeOnTheScreen();
      expect(image).toBeOnTheScreen();
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
      renderTestCoinListItem({ ...data[0], price_change_percentage_24h: 2 });
    });

    it('reflects the price change going up', () => {
      const priceChangePercentage = screen.getByTestId('coin-price-change-percentage');

      expect(priceChangePercentage).toHaveTextContent('▲ 2.00%');
    });
  });

  describe('reflects the price change going down', () => {
    beforeEach(() => {
      renderTestCoinListItem();
    });

    it('renders the coin data', () => {
      const priceChangePercentage = screen.getByTestId('coin-price-change-percentage');

      expect(priceChangePercentage).toHaveTextContent('▼ 0.93%');
    });
  });

  describe('when the watchlist icon is pressed', () => {
    beforeEach(() => {
      mockIsWatched.mockReturnValue(true);
      renderTestCoinListItem();
    });

    it('should add the coin to watchlist and change the icon', () => {
      const pressable = screen.getByTestId('watchlist-icon-pressable');

      act(() => {
        fireEvent.press(pressable);
      });

      expect(screen.getByTestId('watchlist-icon-selected')).toBeOnTheScreen();
      expect(mockToggle).toHaveBeenCalledWith(data[0].id);
    });
  });
});
