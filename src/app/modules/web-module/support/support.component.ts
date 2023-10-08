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

  onClickWaBtn() {
    window.open('https://wa.me/+94742873712?text=Welcome%20to%20dpuremaths%20Support!%20We%20are%20here%20to%20support%20your%20learning%20journey.%20For%20app%20related%20questions,%20issues,%20or%20assistance,%20Please%20reach%20out%20to%20us,%20we%20will%20get%20to%20you%20as%20soon%20as%20possible.%20');
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

    if (title == "" && message == "") {
      this.presentAlert("Empty Fields Detected", "Please FILL BOTH Field")
    } else if (title == "") {
      this.presentAlert("Empty Fields Detected.", "Title is Required.");
    } else if (message == "") {
      this.presentAlert("Empty Fields Detected.", "Message is Required.");
    } else {
      this.supportMessage.emailAddress = sessionStorage.getItem("emailAddress");
      this.supportMessage.title = title;
      this.supportMessage.message = message;
      this.supportMessage.token = sessionStorage.getItem("authToken");

      this.supportService.addClientSupportmessage(this.supportMessage).subscribe((resp: any) => {
        if (resp.code === 1) {
          this.presentAlert("User Support Request Submitted Successfully ", "Expect Response via Email.");

          this.clientSupportForm.controls['title'].setValue('');
          this.clientSupportForm.controls['message'].setValue('');
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
