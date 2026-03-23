import { useEffect, useState } from 'react';

import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { Easing, FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Splash from '@/components/splash';
import { ContextProviders } from '@/contexts';
import { withContext } from '@/contexts/with-context';
import { useTheme } from '@/theme';

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().catch((err) => console.error(err));

function RootLayout() {
  const { theme } = useTheme();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    SplashScreen.hideAsync().catch(console.error);

    const timeoutId = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider value={theme}>
          {showSplash && (
            <Animated.View style={[{ flex: 1 }]} exiting={FadeOut.duration(500).easing(Easing.ease)}>
              <Splash />
            </Animated.View>
          )}
          {!showSplash && (
            <Animated.View style={{ flex: 1 }} entering={FadeIn.duration(500).easing(Easing.ease)}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
            </Animated.View>
          )}
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export { ErrorBoundary } from 'expo-router';
export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default withContext(ContextProviders)(RootLayout);
