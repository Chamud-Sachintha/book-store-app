import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule, Platform, isPlatform } from '@ionic/angular';
import { Client } from 'src/app/models/Clinet/client';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Location } from '@angular/common';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { GoogleAuth as gAuthModel } from '../../../models/GoogleAuth/google-auth';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule]
})
export class SigninComponent  implements OnInit {

  clientLoginForm!: FormGroup;
  client = new Client();
  googleAuthInfo = new gAuthModel();

  isAlertOpen = false;
  public alertButtons = ['OK'];
  user !: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private alertController: AlertController, private authService: AuthService
              , private platform: Platform, private location: Location) { 
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.location.back();
    });

    if (!isPlatform('capacitor')) {
      GoogleAuth.initialize();
    }
  }

  ngOnInit() {
    this.createSigninForm();
  }

  async signIn() {
    this.user = await GoogleAuth.signIn();
    
    if (this.user) {
      this.googleAuthInfo.emailAddress = this.user.email;
      this.googleAuthInfo.firstName = this.user.givenName;
      this.googleAuthInfo.lastName = this.user.familyName;

      this.authService.googleAuth(this.googleAuthInfo).subscribe((resp: any) => {
        
        const dataList = JSON.parse(JSON.stringify(resp));

        if (resp.code === 1) {
          sessionStorage.setItem("authToken", resp.token);
          sessionStorage.setItem("clientId", resp.data[0].id);
          sessionStorage.setItem("emailAddress", resp.data[0].email);
          
          setTimeout(() => {
            this.router.navigate(['book-list'])
          }, 1000);
        }
      })
    }
  }

  async refresh() {
    const authCode = GoogleAuth.refresh();
    console.log(authCode);
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

  createSigninForm() {
    this.clientLoginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmitClientLoginForm() {

    const userName = this.clientLoginForm.controls['userName'].value;
    const password = this.clientLoginForm.controls['password'].value;

    if (userName === "" || password === "") {
      this.presentAlert("Empty Feilds Founded.", "Invalid Username or Password");
    } else {
      this.client.userName = userName;
      this.client.password = password;

      this.authService.authenticateClientInfo(this.client).subscribe((resp: any) => {
        console.log(resp.code)
        if (resp.code === 1) {
          sessionStorage.setItem("authToken", resp.token);
          sessionStorage.setItem("clientId", resp.data[0].id);
          sessionStorage.setItem("emailAddress", resp.data[0].email);
          
          // this.presentAlert("User Signin", "User Login Successfully.");
          this.router.navigate(['/book-list']);
        } else {
          this.presentAlert("User Signin", resp.message);
        }
      }, (error) => {
        this.presentAlert("User Signin", error);
      })
    }
  }

}
