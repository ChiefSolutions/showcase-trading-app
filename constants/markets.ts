export const MARKET_TREND = {
  up: 'up',
  down: 'down',
} as const;

export const DEFAULT_RESPONSE_NOT_OK_ERROR = 'Failed to fetch popular markets';
export const DEFAULT_FETCH_ABORTED_REASON = 'Fetch aborted';
export const MARKET_CATEGORY_DESCRIPTION: { [key: string]: string } = {
  Forex: 'Buy and sell company shares with real-time market pricing',
  Equities: 'Shares in listed companies traded on stock markets',
  Crypto: 'Digital assets traded on blockchain networks',
};
