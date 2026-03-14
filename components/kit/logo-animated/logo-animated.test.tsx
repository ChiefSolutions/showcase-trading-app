import React from 'react';

import { render, screen } from '@testing-library/react-native';
import { AnimatableValue } from 'react-native-reanimated';

import { AnimatedLogo } from '@/components/kit';

jest.mock('react-native-reanimated', () => {
  const ReanimatedMock = jest.requireActual('react-native-reanimated/mock');

  ReanimatedMock.withTiming = (value: AnimatableValue) => value;
  ReanimatedMock.withRepeat = (value: AnimatableValue) => value;
  ReanimatedMock.useSharedValue = (initial: number) => ({ value: initial });
  ReanimatedMock.useAnimatedProps = (fn: () => { transform: [] }) => fn();

  return ReanimatedMock;
});

describe('AnimatedLogo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('when rendered', () => {
    beforeEach(() => {
      render(<AnimatedLogo />);
    });

    it('renders without crashing', () => {
      const logoContainer = screen.getByTestId('animated-logo-container');
      const logo = screen.getByTestId('animated-logo');

      expect(logoContainer).toBeTruthy();
      expect(logo).toBeTruthy();
    });

    it('renders both animated paths', () => {
      const leftBar = screen.getByTestId('animated-logo-left-bar');
      const rightBar = screen.getByTestId('animated-logo-right-bar');

      expect(leftBar).toBeTruthy();
      expect(rightBar).toBeTruthy();
    });
  });
});
