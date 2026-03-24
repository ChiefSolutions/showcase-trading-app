import { FC, memo, useCallback } from 'react';

import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/components/kit';
import * as Icons from '@/components/kit/icons';
import { ChartLine } from '@/components/kit/line-chart';
import { IconName, SvgIcon } from '@/components/kit/svg-icon';
import { TEXT_TYPE } from '@/constants';
import { staticColors, useStyles } from '@/theme';
import { ThemeDefinitionColors } from '@/theme/types';
import { formatCurrency, formatLineChartData, getPriceChangePercentIndicator, getPriceChangePercentage } from '@/utils';

import { MarketListItemProps } from '../markets.types';

const ATTRIBUTE_CLEARANCE = 3;
const MarketListItemComponent: FC<MarketListItemProps> = ({ market, isWatched, toggle }) => {
  const styles = useStyles(_styles);
  const isUp = market.price_change_percentage_24h >= 0;
  const chartData = formatLineChartData(market.sparkline_7d, isUp);

  const pressableStyles = useCallback(
    ({ pressed }: { pressed: boolean }) => {
      const { pressable, pressableDefault, pressablePressed } = styles;
      return {
        ...pressable,
        backgroundColor: pressed ? pressablePressed.backgroundColor : pressableDefault.backgroundColor,
      };
    },
    [styles],
  );

  const getPriceChangeIndicatorStyles = useCallback((value: number) => {
    const defaultStyles = { color: '', marginRight: 5, fontSize: 10 };
    return value > 0 ? { ...defaultStyles, color: 'green' } : { ...defaultStyles, color: 'red' };
  }, []);

  const handleToggleWatchlist = useCallback(() => {
    toggle(market);
  }, [market, toggle]);

  return (
    <Pressable testID="market-pressable" style={pressableStyles}>
      <View style={styles.leftContainer}>
        <SvgIcon name={market.short_name as IconName} />
        <View style={styles.symbolAndName}>
          <Text testID="market-name" type={TEXT_TYPE.copy} style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {market.short_name}
          </Text>
          <Text testID="market-symbol" type={TEXT_TYPE.copy} style={styles.symbol}>
            {market.symbol}
          </Text>
        </View>
      </View>
      <View testID="market-line-chart" style={styles.middleContainer}>
        <ChartLine chartData={chartData} isUp={isUp} />
      </View>
      <View>
        <Text testID="market-current-price" type={TEXT_TYPE.copy} style={{ textAlign: 'right' }}>
          {formatCurrency(market.current_price)}
        </Text>
        <Text type={TEXT_TYPE.copy} style={styles.priceChangePercentage} testID="market-price-change-percentage">
          <Text
            testID="market-price-change-arrow"
            type={TEXT_TYPE.copy}
            style={getPriceChangeIndicatorStyles(market.price_change_percentage_24h)}
          >
            {getPriceChangePercentIndicator(market.price_change_percentage_24h)}
          </Text>

          {getPriceChangePercentage(market.price_change_percentage_24h)}
        </Text>
      </View>
      <View style={{ marginLeft: 8 }}>
        <Pressable testID="watchlist-icon-pressable" onPress={handleToggleWatchlist}>
          {!isWatched && <Icons.StarIcon testID="watchlist-icon" height={30} width={30} color={styles.watchlistIcon.color} />}
          {isWatched && <Icons.StarIconFilled testID="watchlist-icon-selected" height={30} width={30} color={staticColors.gold} />}
        </Pressable>
      </View>
    </Pressable>
  );
};

export const MarketListItem = memo(MarketListItemComponent);
const _styles = (colors: ThemeDefinitionColors) => {
  return StyleSheet.create({
    pressable: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 8,
      justifyContent: 'space-between',
      marginBottom: 5,
      padding: 12,
    },
    pressableDefault: {
      backgroundColor: colors.surface,
    },
    pressablePressed: {
      backgroundColor: colors.onSurface,
    },
    leftContainer: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      flex: 1,
    },
    coinImage: {
      width: 30,
      height: 30,
    },
    symbolAndName: {
      flexDirection: 'column',
      left: 8,
      width: 70,
    },
    middleContainer: {
      flex: 1,
      marginHorizontal: 8,
    },
    name: {
      fontWeight: 'bold',
    },
    symbol: {
      color: colors.secondary,
      marginTop: ATTRIBUTE_CLEARANCE,
      fontSize: 10,
    },
    priceChangePercentage: {
      textAlign: 'right',
      marginTop: ATTRIBUTE_CLEARANCE,
    },
    watchlistIcon: {
      color: colors.subtle,
    },
  });
};
