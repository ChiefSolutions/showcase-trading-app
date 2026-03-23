import { FC, memo, useMemo } from 'react';

import { StyleSheet } from 'react-native';

import { LineChart } from 'react-native-chart-kit';

import { LINE_CHART_COLORS } from '@/constants';
import { LineChartData } from '@/types';

interface ChartLineComponentProps {
  chartData: LineChartData;
  isUp: boolean;
}

const ChartLineComponent: FC<ChartLineComponentProps> = ({ chartData, isUp }) => {
  const chartConfig = useMemo(() => {
    return {
      backgroundGradientFromOpacity: 0,
      backgroundGradientToOpacity: 0,
      color: (opacity = 1) => (isUp ? `rgba(${LINE_CHART_COLORS.isUp},${opacity})` : `rgba(${LINE_CHART_COLORS.isDown},${opacity})`),
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

export const ChartLine = memo(ChartLineComponent);

const styles = StyleSheet.create({
  chartStyle: {
    paddingRight: 0,
    paddingLeft: 0,
    marginLeft: 0,
    marginTop: -10,
  },
});
