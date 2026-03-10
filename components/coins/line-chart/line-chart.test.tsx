import { render } from '@testing-library/react-native';

import { CoinChartLine } from '@/components/coins/line-chart/index';

jest.mock('react-native-chart-kit', () => ({
  LineChart: (props: any) => {
    const { View, Text } = require('react-native');
    return (
      <View testID="mock-line-chart">
        {/* We call the color function to see its output in the snapshot */}
        <Text>Line Color: {props.chartConfig.color(1)}</Text>
        <Text>Width: {props.width}</Text>
        <Text>Bezier: {String(props.bezier)}</Text>
      </View>
    );
  },
}));

const renderLineChartTestComponent = (
  isUp = true,
  chartData = { labels: [], datasets: [{ data: [1, 2] }] },
) => {
  return render(<CoinChartLine isUp={isUp} chartData={chartData} />);
};

describe('CoinChartLineComponent', () => {
  // beforeEach(() => jest.clearAllMocks());

  describe('when the trend is up', () => {
    it('matches snapshot when trend is up', () => {
      const { toJSON } = renderLineChartTestComponent(true);
      expect(toJSON()).toMatchSnapshot();
    });
  });

  describe('when the trend is down', () => {
    it('matches snapshot when trend is down', () => {
      const { toJSON } = renderLineChartTestComponent(false);
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
