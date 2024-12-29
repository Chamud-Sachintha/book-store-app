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
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId: "169973751650-040tu26o25sn2uekc93cp4vs361471i9.apps.googleusercontent.com",
      forceCodeForRefreshToken: true
    },
    SplashScreen: {
      // launchAutoHide: false
    }
  },
};

export default config;
