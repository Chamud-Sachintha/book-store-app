import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
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
