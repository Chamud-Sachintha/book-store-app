import { Component, OnInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { Location } from '@angular/common'; 
import { ProfileService } from './services/profile/profile.service';
import { Request } from './models/Request/request';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { BackgroundTask } from '@capawesome/capacitor-background-task';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit {

  isToastAppear = false;
  requestBody = new Request();

  constructor(private platform: Platform, private location: Location, private toastController: ToastController, private authService: AuthService) {
    this.initializeApp();

    App.addListener('appStateChange', async (state) => {
      console.log(state.isActive)
      if (state.isActive) {
        // The app is in the foreground (active)
        console.log('App is active');
      } else {
        // The app is in the background or closed

        console.log('close una');

        const taskId = await BackgroundTask.beforeExit(async () => {
          // Run your code...
          // Finish the background task as soon as everything is done.

          this.requestBody.clientId = sessionStorage.getItem("clientId");

          this.authService.updateLogOutTime(this.requestBody).subscribe((resp) => {
            console.log('nnm' + resp);
          })

          BackgroundTask.finish({ taskId });
        });
      }
    });
  }

  ngOnInit(): void {
    
  }

  initializeApp() {
    const _this = this;
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(9999, () => {
        document.addEventListener('backbutton', function (event) {
          event.preventDefault();
          event.stopPropagation();

          if (!_this.isToastAppear) {
            _this.presentToast('bottom', "Please Go Back Through App")
          }
          
        }, false);
      });
    });
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    this.isToastAppear = true;
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      cssClass: 'custom-toast', 
    }).then(toast => {
      toast.present();
      return toast.onDidDismiss();
    }).then(() => {
      this,this.isToastAppear = false;
    });
  }
}
