import { BASE_PRECISION } from '@/constants';
import { FormatLineChartData } from '@/utils/market/market-utils.types';

export const getPriceChangePercentage = (value: number) => {
  return `${Math.abs(value).toFixed(BASE_PRECISION)}%`;
};

export const getPriceChangePercentIndicator = (value: number) => {
  return value > 0 ? '▲ ' : '▼ ';
};

export const formatLineChartData: FormatLineChartData = (sparkline, isUp) => ({
  labels: [],
  datasets: [
    {
      data: sparkline,
      color: (opacity = 1) => (isUp ? `rgba(0,255,128,${opacity})` : `rgba(255,50,50,${opacity})`),
      strokeWidth: 2,
    },
  ],
});
