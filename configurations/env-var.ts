import { getEnvVarConfig } from '@/utils';

export interface EnvVarConfig {
  apiUrl: string;
  isProduction: boolean;
  version: string | undefined;
}

const _config: EnvVarConfig = getEnvVarConfig();

// Validate required variables at startup
if (!_config.apiUrl) {
  throw new Error('Missing api url in configuration');
}

export const Config = Object.freeze(_config) as EnvVarConfig;
