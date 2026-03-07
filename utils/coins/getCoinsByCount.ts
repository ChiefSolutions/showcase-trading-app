import { Coin } from '@/components/coins/types';

export const getCoinsByCount = (coins: Coin[], count: number) => {
  return coins.slice(0, count);
};
