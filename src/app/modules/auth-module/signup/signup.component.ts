import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { Client } from 'src/app/models/Clinet/client';
import { AuthService } from 'src/app/services/auth/auth.service';

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

  constructor(private formBuilder: FormBuilder, private alertController: AlertController, private authService: AuthService) { }

  ngOnInit() {
    this.initClientRegisterForm();
  }

  initClientRegisterForm() {
    this.clientRegisterForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      emailAddress: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmitCreateAccount() {
    const firstName = this.clientRegisterForm.controls['firstName'].value;
    const lastName = this.clientRegisterForm.controls['lastName'].value;
    const mobileNumber = this.clientRegisterForm.controls['mobileNumber'].value;
    const emailAddress = this.clientRegisterForm.controls['emailAddress'].value;
    const password = this.clientRegisterForm.controls['password'].value;

    if (firstName === "") {
      this.presentAlert("Empty Feilds Founded.", "First Name is Required.")
    } else if (lastName === "") {
      this.presentAlert("Empty Feilds Founded.", "Last Name is Required.")
    } else if (mobileNumber === "") {
      this.presentAlert("Empty Feilds Founded.", "Mobile Number is Required.")
    } else if (emailAddress === "") {
      this.presentAlert("Empty Feilds Founded.", "Email Address is Required.")
    } else if (password === "") {
      this.presentAlert("Empty Feilds Founded.", "Password is Required.")
    } else {
      this.client.firstName = firstName;
      this.client.lastName = lastName;
      this.client.mobileNumber = mobileNumber;
      this.client.email = emailAddress;
      this.client.password = password;

      this.authService.registerNewClient(this.client).subscribe((resp: any) => {
        console.log(resp.code)
        if (resp.code === 1) {
          this.presentAlert("User Registation", "User Registration Successfully.");
        } else {
          this.presentAlert("User Registation", resp.message);
        }
      }, (err) => {
        this.presentAlert("User Registation", err);
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
