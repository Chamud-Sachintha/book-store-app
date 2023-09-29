import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule, Platform, isPlatform } from '@ionic/angular';
import { Client } from 'src/app/models/Clinet/client';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Location } from '@angular/common';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { GoogleAuth as gAuthModel } from '../../../models/GoogleAuth/google-auth';
import { Request } from 'src/app/models/Request/request';
import { FacebookLogin, FacebookLoginPlugin } from '@capacitor-community/facebook-login';
import { Plugins, registerWebPlugin } from '@capacitor/core';
import { FacebookAuthInfo } from 'src/app/models/FacebookAuthInfo/facebook-auth-info';

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
  facebookAuthInfo = new FacebookAuthInfo();
  requestModel = new Request();
  isShowPassword = false;

  isAlertOpen = false;
  public alertButtons = ['OK'];
  user !: any;

  fbLogin!: FacebookLoginPlugin;
  fbUser = null;
  token!: any;

  userEmailRegEx = new RegExp("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}");

  constructor(private formBuilder: FormBuilder, private router: Router, private alertController: AlertController, private authService: AuthService
              , private platform: Platform, private location: Location) { 
    
    this.setupFbLogin();
    this.checkSession();
    const getTabBar = document.getElementById("testYYU");

    if (getTabBar != null) {
      getTabBar.style.display = "";
    }
    
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

  async setupFbLogin() {
    if (isPlatform('desktop')) {
      this.fbLogin = FacebookLogin;
    } else {
      // const { FacebookLogin } = Plugins;
      await FacebookLogin.initialize({ appId: '997371431487868' });
      this.fbLogin = FacebookLogin;
    }
  }

  async facebookAuth() {
    const FACEBOOK_PERMISSIONS = ['email', 'public_profile',];
    const result = await this.fbLogin.login({ permissions: FACEBOOK_PERMISSIONS });

    console.log(result);

    if (result.accessToken && result.accessToken.userId) {
      this.token = result.accessToken;
      this.loadUserData(this.token);
    } else if (result.accessToken && !result.accessToken.userId) {
      // Web only gets the token but not the user ID
      // Directly call get token to retrieve it now
      this.getCurrentToken();
    } else {
      // Login failed
    }
  }

  loadUserData(token: any) {
    this.authService.loadUserData(token).subscribe((resp: any) => {
      if (resp) {
        const nameInfo = resp.name.split(" ");

        this.facebookAuthInfo.firstName = nameInfo[0];
        this.facebookAuthInfo.lastName = nameInfo[1];
        this.facebookAuthInfo.emailAddress = resp.email;

        this.authService.facebookAuth(this.facebookAuthInfo).subscribe((resp: any) => {

          if (resp.code === 1) {
            sessionStorage.setItem("authToken", resp.token);
            sessionStorage.setItem("clientId", resp.data[0].id);
            sessionStorage.setItem("emailAddress", resp.data[0].email);

            this.router.navigate(['book-list']);
          }
        }, (err) => {
          this.presentAlert("Facebook Authentication", err.message);
        })
      }
    })
  }

  async getCurrentToken() {
    const result = await this.fbLogin.getCurrentAccessToken();

    if (result.accessToken) {
      this.token = result.accessToken;
      this.loadUserData(this.token);
    } else {
      // Not logged in.
    }
  }

  onClickViewPassword() {
    const eyeOnIcon = document.getElementById("eyeOn");
    const eyeOffIcon = document.getElementById("eyeOff");

    if (this.isShowPassword) {
      this.isShowPassword = false;
      
      if (eyeOnIcon != null && eyeOffIcon != null) {
        eyeOnIcon.style.display = "";
        eyeOffIcon.style.display = "none";
      }
    } else {
      this.isShowPassword = true;
      
      if (eyeOnIcon != null && eyeOffIcon != null) {
        eyeOnIcon.style.display = "none";
        eyeOffIcon.style.display = "";
      }
    }
  }

  checkSession() {
    const authToken = sessionStorage.getItem("authToken");

    if (authToken != null) {
      this.router.navigate(['/book-list']);
    }
  }

  async signIn() {
    this.user = await GoogleAuth.signIn();
    this.callGoogleAuthServiceApi(this.user);
  }

  callGoogleAuthServiceApi(user: any) {
    this.googleAuthInfo.emailAddress = this.user.email;
    this.googleAuthInfo.firstName = this.user.givenName;
    this.googleAuthInfo.lastName = this.user.familyName;

    this.authService.googleAuth(this.googleAuthInfo).subscribe((resp: any) => {
      
      const dataList = JSON.parse(JSON.stringify(resp));
      
      if (resp.code === 1) {
        sessionStorage.setItem("authToken", resp.token);
        sessionStorage.setItem("clientId", resp.data[0].id);
        sessionStorage.setItem("emailAddress", resp.data[0].email);

        this.requestModel.clientId = resp.data[0].id;

        this.authService.addLoginTimeLog(this.requestModel).subscribe((resp: any) => {
          if (resp.code === 1) {
            this.router.navigate(['book-list'])
          }
        })
      }
    })
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
    } else if (!this.userEmailRegEx.test(userName)) {
      this.presentAlert("Invalid Input Format", "Invalid Email Format.");
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
          this.requestModel.clientId = resp.data[0].id;

          this.authService.addLoginTimeLog(this.requestModel).subscribe((resp: any) => {
            if (resp.code === 1) {
              this.router.navigate(['book-list'])
            }
          })
        } else {
          this.presentAlert("User Signin", resp.message);
        }
      }, (error) => {
        this.presentAlert("User Signin", error);
      })
    }
  }

}
