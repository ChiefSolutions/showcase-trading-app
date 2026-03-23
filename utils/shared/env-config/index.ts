import Constants from 'expo-constants';

import { EnvVarConfig } from '@/configurations/env-var';

export const getEnvVarConfig = (): EnvVarConfig => {
  return {
    apiUrl: process.env.EXPO_PUBLIC_API_URL as string,
    isProduction: process.env.NODE_ENV === 'production',
    version: Constants.expoConfig?.version,
  };
};
