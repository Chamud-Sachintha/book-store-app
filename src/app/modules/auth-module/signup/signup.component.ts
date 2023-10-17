import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, Platform } from '@ionic/angular';
import { Client } from 'src/app/models/Clinet/client';
import { AuthService } from 'src/app/services/auth/auth.service';
import { App as CapacitorApp } from '@capacitor/app';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule]
})
export class SignupComponent  implements OnInit {

  clientRegisterForm!: FormGroup;
  client = new Client();
  userEmailRegEx = new RegExp("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}");
  mobileNumberRegEx = new RegExp("");

  constructor(private formBuilder: FormBuilder, private alertController: AlertController, private authService: AuthService
              , private location: Location, private platform: Platform, private router: Router) { 

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.location.back();
    });
  }

  ngOnInit() {
    this.initClientRegisterForm();
  }

  initClientRegisterForm() {
    this.clientRegisterForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      password: ['', Validators.required],
      confPassword: ['', Validators.required]
    })
  }

  onSubmitCreateAccount() {
    const firstName = this.clientRegisterForm.controls['firstName'].value;
    const lastName = this.clientRegisterForm.controls['lastName'].value;
    const emailAddress = this.clientRegisterForm.controls['emailAddress'].value;
    const password = this.clientRegisterForm.controls['password'].value;
    const confPassword = this.clientRegisterForm.controls['confPassword'].value;

    if (!this.userEmailRegEx.test(emailAddress)) {
      this.presentAlert("Invalid Input Format", "Enter Valid Email Address.");
    } else if (firstName === "") {
      this.presentAlert("Empty Field/s Detected", "Please FILL ALL Listed Fields")
    } else if (lastName === "") {
      this.presentAlert("Empty Field/s Detected", "Please FILL ALL Listed Fields")
    } else if (emailAddress === "") {
      this.presentAlert("Empty Field/s Detected", "Please FILL ALL Listed Fields")
    } else if (password === "") {
      this.presentAlert("Empty Field/s Detected", "Please FILL ALL Listed Fields")
    } else if (password !== confPassword) {
      this.presentAlert("Unable to Create Password", "Password Fields Don’t Match");
    } else {
      this.client.firstName = firstName;
      this.client.lastName = lastName;
      this.client.email = emailAddress;
      this.client.password = password;

      this.authService.registerNewClient(this.client).subscribe((resp: any) => {
        console.log(resp.code)
        if (resp.code === 1) {
          this.presentAlert("Profile Created Successfully", "Please Sign in to Your Account");

          this.router.navigate(['/auth/login']);
        } else if (resp.code === 3) {
          this.presentAlert("Account Detected For Email", "Please Sign in to Your Account");
        }
      }, (err) => {
        this.presentAlert("Unable to Sign in", "Please Check Your Connection");
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
