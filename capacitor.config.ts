import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'countdown.app',
  appName: 'countdown',
  webDir: 'public',
  server: {
    androidScheme: 'https'
  }
};

export default config;
