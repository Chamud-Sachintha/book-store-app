import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule, NavController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupportMessage } from 'src/app/models/Support/support-message';
import { SupportService } from 'src/app/services/support/support.service';
import { Request } from 'src/app/models/Request/request';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule]
})
export class SupportComponent  implements OnInit {

  supportMessage = new SupportMessage();
  clientSupportForm!: FormGroup;
  requestBody = new Request();

  constructor(private router: Router, private formBuilder: FormBuilder, private alertController: AlertController
            , private supportService: SupportService, private navCtrl: NavController, private profileService: ProfileService) { 
    this.checkProfileIsFilled();
  }

  ngOnInit() {
    this.initClientSupportForm();
  }

  checkProfileIsFilled() {
    this.requestBody.clientId = sessionStorage.getItem("clientId");
    this.requestBody.token = sessionStorage.getItem("authToken");

    this.profileService.checkProfileInfo(this.requestBody).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));
      console.log(resp.code)
      if (resp.code === 1) {
        if (!dataList.data[0].isProfileOk) {
          this.router.navigate(['edit-profile']);
        }
      }
    })
  }

  onClickBackBtn() {
    this.navCtrl.back();
  }

  onSubmitClientSupportForm() {
    const title = this.clientSupportForm.controls['title'].value;
    const message = this.clientSupportForm.controls['message'].value;

    if (title == "") {
      this.presentAlert("Empty Feilds Founded.", "Title is required.");
    } else if (message == "") {
      this.presentAlert("Empty Feilds Founded.", "Message is required.");
    } else {
      this.supportMessage.emailAddress = sessionStorage.getItem("emailAddress");
      this.supportMessage.title = title;
      this.supportMessage.message = message;
      this.supportMessage.token = sessionStorage.getItem("authToken");

      this.supportService.addClientSupportmessage(this.supportMessage).subscribe((resp: any) => {
        if (resp.code === 1) {
          this.presentAlert("Client Support Message", "Client Support Message Added Successfully.");
        }
      }, (err) => {
        this.presentAlert("Client Support Message", err.message);
      })
    }
  }

  async presentAlert(subHeader: string, alertMessage: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: subHeader,
      message: alertMessage,
      buttons: ['OK'],
    });

    await alert.present();
  }

  initClientSupportForm() {
    this.clientSupportForm = this.formBuilder.group({
      title: ['', Validators.required],
      message: ['', Validators.required]
    })
  }

  onClickProfileSection() {
    this.router.navigate(['/profile'])
  }

  onClickCartPage() {
    this.router.navigate(['/cart'])
  }

}
