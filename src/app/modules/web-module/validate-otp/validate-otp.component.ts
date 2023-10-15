import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Request } from 'src/app/models/Request/request';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validate-otp',
  templateUrl: './validate-otp.component.html',
  styleUrls: ['./validate-otp.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule]
})
export class ValidateOtpComponent  implements OnInit {

  requestModel = new Request();
  validateOTPForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private alertController: AlertController, private authService: AuthService
            , private router: Router) { }

  ngOnInit() {
    this.initValidateOTPForm();
  }

  initValidateOTPForm() {
    this.validateOTPForm = this.formBuilder.group({
      otpCode: ['', Validators.required]
    })
  }

  validateOTP() {
    const otpCode = this.validateOTPForm.controls['otpCode'].value;

    if (otpCode == "") {
      this.presentAlert("Empty Feild Found", "OTP is Required");
    } else {
      this.requestModel.emailAddress = sessionStorage.getItem("otpMail");
      this.requestModel.authCode = otpCode;

      this.authService.validateOTP(this.requestModel).subscribe((resp: any) => {
        if (resp.code === 1) {
          sessionStorage.setItem("otpCode", otpCode);
          this.router.navigate(['change-pw']);
        } else {
          this.presentAlert("OTP Validation Failed", "Please Retry With Correct Code");
        }
      }, (err) => {
        this.presentAlert("OTP Validation Failed", err.message);
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
