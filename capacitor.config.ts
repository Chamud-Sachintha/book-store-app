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
      serverClientId: "350318496277-4949cv9612r4pk6ethuuit2hbr8poj1v.apps.googleusercontent.com",
      forceCodeForRefreshToken: true
    }
  },
};

export default config;
