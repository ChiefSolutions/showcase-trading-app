import { FormatLineChartData } from '@/components/coins/types';
import { BASE_PRECISION } from '@/constants';

export const getPriceChangePercentage = (value: number) => {
  return `${Math.abs(value).toFixed(BASE_PRECISION)}%`;
};

export const getPriceChangePercentIndicator = (value: number) => {
  return value > 0 ? '▲ ' : '▼ ';
};

export const formatLineChartData: FormatLineChartData = (sparkline: any, isUp: boolean) => ({
  labels: [], // empty for mini charts
  datasets: [
    {
      data: sparkline.price,
      color: (opacity = 1) => (isUp ? `rgba(0,255,128,${opacity})` : `rgba(255,50,50,${opacity})`),
      strokeWidth: 2,
    },
  ],
});
