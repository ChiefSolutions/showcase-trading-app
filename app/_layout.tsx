import { useEffect } from 'react';

import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().catch((err) => console.error(err));

function RootLayout() {
  const { theme } = useTheme();
  useEffect(() => {
    // Once the layout mounts, hide the splash screen
    SplashScreen.hideAsync().catch((err) => console.error(err));
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider value={theme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export { ErrorBoundary } from 'expo-router';
export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default RootLayout;
