import { memo } from 'react';

import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { MarketTabs, TabItem } from '@/components/markets/tabs';
import { Config } from '@/configurations/env-var';
import { useFetch } from '@/hooks/fetch';

const TABS_URL = `${Config.apiUrl}markets/tabs`;
const MarketsComponent = () => {
  const { loading, error, data } = useFetch(TABS_URL, []);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {!loading && !!data?.length && !error && <MarketTabs items={data as TabItem[]} />}
    </View>
  );
};

export const Markets = memo(MarketsComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
