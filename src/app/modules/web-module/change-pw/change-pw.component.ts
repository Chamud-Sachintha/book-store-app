import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotPw } from 'src/app/models/ForgotPw/forgot-pw';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-pw',
  templateUrl: './change-pw.component.html',
  styleUrls: ['./change-pw.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule]
})
export class ChangePwComponent  implements OnInit {

  forgotPwModel = new ForgotPw();
  changePwForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private alertController: AlertController, private authService: AuthService
            , private router: Router) { }

  ngOnInit() {
    this.initChangePwForm();
  }

  initChangePwForm() {
    this.changePwForm = this.formBuilder.group({
      newPassword: ['', Validators.required],
      confPassword: ['', Validators.required]
    })
  }

  changePw() {
    const newPassword = this.changePwForm.controls['newPassword'].value;
    const confPass = this.changePwForm.controls['confPassword'].value;

    if (newPassword == "" && confPass == "") {
      this.presentAlert("Empty Fields Detected", "Please FILL BOTH Fields.")
    } else if (newPassword == "") {
      this.presentAlert("Empty Field Detected", "New Password is Required .")
    } else if (confPass == "") {
      this.presentAlert("Empty Field Detected", "Password Confirmation Required.")
    } else if (newPassword != confPass) {
      this.presentAlert("Unable to Create Password", "Password Fields Don’t Match.")
    } else {
      this.forgotPwModel.authCode = sessionStorage.getItem("otpCode");
      this.forgotPwModel.newPassword = newPassword;

      this.authService.changePw(this.forgotPwModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.presentAlert("Password Updated Successfully.", "Sign in Using New Password.");

          this.router.navigate(['auth']);
        }
      }, (err) => {
        this.presentAlert("Change Password", err.message);
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
