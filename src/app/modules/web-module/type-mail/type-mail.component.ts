import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { Request } from 'src/app/models/Request/request';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-type-mail',
  templateUrl: './type-mail.component.html',
  styleUrls: ['./type-mail.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule]
})
export class TypeMailComponent  implements OnInit {

  requestModel = new Request();
  sendOTPForm!: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private alertController: AlertController
            , private router: Router) { }

  ngOnInit() {
    this.initSendOTPForm();
  }

  initSendOTPForm() {
    this.sendOTPForm = this.formBuilder.group({
      emailAddress: ['', Validators.required]
    })
  }

  sendOTP() {
    const emailAddress = this.sendOTPForm.controls['emailAddress'].value;

    if (emailAddress == "") {
      this.presentAlert("Empty Feilds Founded", "Email Address is required.");
    } else {
      this.requestModel.emailAddress = emailAddress;

      this.authService.sendOTP(this.requestModel).subscribe((resp: any) => {
        if (resp.code === 1) {
          this.presentAlert("Send OTP to Mail", "Successfully Sent the OTP");
          sessionStorage.setItem("otpMail", emailAddress);
          this.router.navigate(['validate-otp']);
        } else {
          this.presentAlert("Send OTP to Mail", resp.message);
        }
      }, (err) => {
        this.presentAlert("Send OTP to Mail", err.message);
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

}
