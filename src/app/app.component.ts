import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private location: Location, private toastController: ToastController) {
    this.initializeApp();
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
