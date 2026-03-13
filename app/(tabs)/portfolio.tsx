import { StyleSheet, View } from 'react-native';

import { Balance } from '@/components/balance';

export default function PortfolioScreen() {
  return (
    <View style={styles.container}>
      <Balance />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
