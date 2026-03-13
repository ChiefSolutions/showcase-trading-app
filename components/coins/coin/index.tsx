import { FC, memo, useCallback } from 'react';

import { Image, Pressable, StyleSheet, View } from 'react-native';

import * as Icons from '@/components/kit/icons';
import { Text } from '@/components/kit/text';
import { TEXT_TYPE } from '@/constants';
import { useWatchlistStore } from '@/stores';
import { useStyles } from '@/theme';
import { ThemeDefinitionColors } from '@/theme/types';
import { staticColors } from '@/theme/useTheme';
import { formatCurrency, formatLineChartData, getPriceChangePercentIndicator, getPriceChangePercentage } from '@/utils';

import { CoinChartLine } from '../line-chart';
import { Coin } from '../types';

interface CoinListItemProps {
  coin: Coin;
}

const COIN_ATTRIBUTE_CLEARANCE = 3;
const CoinListItemComponent: FC<CoinListItemProps> = ({ coin }) => {
  const styles = useStyles(_styles);
  const isUp = coin.price_change_percentage_24h >= 0;
  const chartData = formatLineChartData(coin.sparkline_in_7d, isUp);
  const isWatched = useWatchlistStore((s) => s.isWatched(coin.id));
  const toggle = useWatchlistStore((s) => {
    return s.toggle;
  });

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
    toggle(coin.id);
  }, [coin.id, toggle]);

  return (
    <Pressable testID="coin-pressable" style={pressableStyles}>
      <View style={styles.leftContainer}>
        <Image testID="coin-image" source={{ uri: coin.image }} style={styles.coinImage} />
        <View style={styles.coinNameAndSymbol}>
          <Text testID="coin-name" type={TEXT_TYPE.copy} style={styles.coinName}>
            {coin.name}
          </Text>
          <Text testID="coin-symbol" type={TEXT_TYPE.copy} style={styles.coinSymbol}>
            {coin.symbol}
          </Text>
        </View>
      </View>
      <View testID="coin-line-chart" style={styles.middleContainer}>
        <CoinChartLine chartData={chartData} isUp={isUp} />
      </View>
      <View>
        <Text testID="coin-current-price" type={TEXT_TYPE.copy} style={{ textAlign: 'right' }}>
          {formatCurrency(coin.current_price)}
        </Text>
        <Text type={TEXT_TYPE.copy} style={styles.priceChangePercentage} testID="coin-price-change-percentage">
          <Text
            testID="coin-price-change-arrow"
            type={TEXT_TYPE.copy}
            style={getPriceChangeIndicatorStyles(coin.price_change_percentage_24h)}
          >
            {getPriceChangePercentIndicator(coin.price_change_percentage_24h)}
          </Text>

          {getPriceChangePercentage(coin.price_change_percentage_24h)}
        </Text>
      </View>
      <View style={{ marginLeft: 14 }}>
        <Pressable testID="watchlist-icon-pressable" onPress={handleToggleWatchlist}>
          {!isWatched && <Icons.StarIcon testID="watchlist-icon" height={30} width={30} color={styles.watchlistIcon.color} />}
          {isWatched && <Icons.StarIconFilled testID="watchlist-icon-selected" height={30} width={30} color={staticColors.gold} />}
        </Pressable>
      </View>
    </Pressable>
  );
};

export const CoinListItem = memo(CoinListItemComponent);
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
    coinNameAndSymbol: {
      flexDirection: 'column',
      left: 16,
    },
    middleContainer: {
      flex: 1,
    },
    coinName: {
      fontWeight: 'bold',
    },
    coinSymbol: {
      color: colors.secondary,
      marginTop: COIN_ATTRIBUTE_CLEARANCE,
    },
    priceChangePercentage: {
      textAlign: 'right',
      marginTop: COIN_ATTRIBUTE_CLEARANCE,
    },
    watchlistIcon: {
      color: colors.subtle,
    },
  });
};
