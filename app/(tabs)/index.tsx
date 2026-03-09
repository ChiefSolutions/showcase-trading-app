import { StyleSheet, View } from 'react-native';

import { PopularCoins } from '@/components/coins/popular';
import * as Icons from '@/components/kit/icons';
import { useTheme } from '@/theme';

export default function HomeScreen() {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Icons.Logo height={100} width={100} color={colors.primary} />
      </View>
      <PopularCoins />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  logoContainer: {
    alignSelf: 'center',
    marginBottom: 40,
    height: 100,
    top: 20,
    width: 100,
  },
});
