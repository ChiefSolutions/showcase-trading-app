import { FC, memo, useMemo } from 'react';

import { StyleSheet } from 'react-native';

import { LineChart } from 'react-native-chart-kit';

import { LineChartData } from '@/types';

interface CoinChartLineComponentProps {
  chartData: LineChartData;
  isUp: boolean;
}

const CoinChartLineComponent: FC<CoinChartLineComponentProps> = ({ chartData, isUp }) => {
  const chartConfig = useMemo(() => {
    return {
      backgroundGradientFromOpacity: 0,
      backgroundGradientToOpacity: 0,
      color: (opacity = 1) => (isUp ? `rgba(0,255,128,${opacity})` : `rgba(255,50,50,${opacity})`),
    };
  }, [isUp]);

  return (
    <LineChart
      style={styles.chartStyle}
      data={chartData}
      width={100}
      height={40}
      withDots={false}
      withVerticalLabels={false}
      withHorizontalLabels={false}
      withInnerLines={false}
      withOuterLines={false}
      fromZero={false}
      chartConfig={chartConfig}
      bezier
    />
  );
};

export const CoinChartLine = memo(CoinChartLineComponent);

const styles = StyleSheet.create({
  chartStyle: {
    paddingRight: 0,
    paddingLeft: 0,
    marginLeft: 0,
    marginTop: -10,
  },
});
