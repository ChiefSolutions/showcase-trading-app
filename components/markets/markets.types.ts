import { MARKET_TREND } from '@/constants/markets';

export type MarketTrend = (typeof MARKET_TREND)[keyof typeof MARKET_TREND];

export interface Market {
  id: string;
  symbol: string;
  short_name: string;
  long_name: string;
  asset_type: string;
  is_popular: boolean;
  current_price: number;
  open_price: number;
  high_price: number;
  low_price: number;
  high_24h: number;
  low_24h: number;
  volume: number;
  last_updated: string;
  price_change_percentage_24h: number;
  trend: MarketTrend;
  sparkline_7d: number[];
}

export interface MarketListItemProps {
  market: Market;
}
