import { Component, OnInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { Location } from '@angular/common'; 
import { ProfileService } from './services/profile/profile.service';
import { Request } from './models/Request/request';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  requestBody = new Request();

  constructor(private platform: Platform, private location: Location, private toastController: ToastController, private authService: AuthService) {
    this.initializeApp();
  }

  ngOnInit(): void {
    App.addListener('appStateChange', (state) => {
      if (state.isActive) {
        // The app is in the foreground (active)
        console.log('App is active');
      } else {
        // The app is in the background or closed

        this.requestBody.clientId = sessionStorage.getItem("clientId");

        this.authService.updateLogOutTime(this.requestBody).subscribe((resp) => {
          console.log(resp);
        })
      }
    });
  }

  initializeApp() {
    const _this = this;
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(9999, () => {
        document.addEventListener('backbutton', function (event) {
          event.preventDefault();
          event.stopPropagation();
          
          _this.presentToast('bottom', "Please go Back through App.")
        }, false);
      });
    });
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
}
