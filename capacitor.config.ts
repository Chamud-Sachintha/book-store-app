import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'lk.dpuremaths.app',
  appName: 'book-store-app',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    PrivacyScreen: {
      enable: true,
    },
  },
};

export default config;
