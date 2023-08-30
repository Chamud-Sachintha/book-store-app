import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'book-store-app',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
