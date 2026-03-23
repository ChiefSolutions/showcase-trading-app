import React from 'react';

import { StyleSheet, View } from 'react-native';

import { AnimatedLogo } from '@/components/kit';

export const SplashScreen: React.FC = () => {
  return (
    <View testID="splash-screen" style={styles.container}>
      <AnimatedLogo width={'100%'} height={120} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
