import { Injectable } from '@angular/core';
import { Capacitor, Plugins } from '@capacitor/core';
import { FirebaseAnalytics } from "@capacitor-community/firebase-analytics";
import { environment } from 'src/environments/environment';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  analyticsEnabled = true;

  constructor(private router: Router) { 
    // this.setScreenName(this.router.url);
  }

  initFB() {
    console.log(Capacitor.getPlatform())
    if (Capacitor.getPlatform() == 'web') {
      FirebaseAnalytics.initializeFirebase(environment.firebaseConfig);
    }
  }

  setUser(userId: string) {
    FirebaseAnalytics.setUserId({
      userId: userId
    })
  }

  setProperty(propertyInfo: any) {
    FirebaseAnalytics.setUserProperty({
      name: propertyInfo.name,
      value: propertyInfo.value
    })
  }

  logEvent() {
    this.initFB();
    FirebaseAnalytics.logEvent({
      name: "login",
      params: {
        method: "email"
      }
    })
  }

  setScreenName(screenName: any) {
    FirebaseAnalytics.setScreenName({
      screenName
    });
  }

  toggleAnalytics() {
    this.analyticsEnabled = !this.analyticsEnabled;
    FirebaseAnalytics.setCollectionEnabled({
      enabled: this.analyticsEnabled,
    });
  }
}
