import { FC, memo, useMemo, useState } from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';

import { CoinListItem } from '@/components/coins/coin';
import { Coin } from '@/components/coins/types';
import { Heading } from '@/components/kit';
import coins from '@/data/crypto.json';
import { useStyles } from '@/theme';
import { ThemeDefinitionColors } from '@/theme/types';
import { getCoinsByCount } from '@/utils';

const PopularCoinsComponent: FC = () => {
  //TODO: replace with API CALL
  const [data] = useState<Coin[]>(coins.data as Coin[]);
  const styles = useStyles(_styles);
  const popularCoins = useMemo(() => {
    return getCoinsByCount(data, 20);
  }, [data]);

  return (
    <>
      <View style={styles.heading}>
        <Heading title={'Most Popular'} copy={'The most popular coins sorted by market cap rank'} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View>
          {popularCoins.map((coin) => {
            return <CoinListItem key={coin.id} coin={coin} />;
          })}
        </View>
      </ScrollView>
    </>
  );
};

export const PopularCoins = memo(PopularCoinsComponent);

export const _styles = (colors: ThemeDefinitionColors) => {
  return StyleSheet.create({
    content: {
      flexGrow: 1,
    },
    heading: {
      marginBottom: 20,
    },
  });
};
