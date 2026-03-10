import { FC, memo, useMemo, useState } from 'react';

import { StyleSheet } from 'react-native';

import { CoinListItem } from '@/components/coins/coin';
import { Coin } from '@/components/coins/types';
import coins from '@/data/crypto.json';
import { useStyles } from '@/theme';
import { getCoinsByCount } from '@/utils';

const PopularCoinsComponent: FC = () => {
  //TODO: replace with API CALL
  const [data] = useState<Coin[]>(coins.data as Coin[]);
  const styles = useStyles(_styles);
  const popularCoins = useMemo(() => {
    return getCoinsByCount(data, 20);
  }, [data]);

  // return (
  //   <>
  //     <View style={styles.heading}>
  //       <Heading title={'Most Popular'} copy={'The most popular coins sorted by market cap rank'} />
  //     </View>
  //
  //     <ScrollView contentContainerStyle={styles.content}>
  //       <View>
  //         {popularCoins.map((coin) => {
  //           return <CoinListItem key={coin.id} coin={coin} />;
  //         })}
  //       </View>
  //     </ScrollView>
  //   </>
  // );

  return (
    <>
      {popularCoins.map((coin) => {
        return <CoinListItem key={coin.id} coin={coin} />;
      })}
    </>
  );
};

export const PopularCoins = memo(PopularCoinsComponent);

export const _styles = () => {
  return StyleSheet.create({
    content: {
      flexGrow: 1,
    },
    heading: {
      marginBottom: 20,
    },
  });
};
