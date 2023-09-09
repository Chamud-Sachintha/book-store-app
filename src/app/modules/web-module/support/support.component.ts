import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupportMessage } from 'src/app/models/Support/support-message';
import { SupportService } from 'src/app/services/support/support.service';

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

  constructor(private router: Router, private formBuilder: FormBuilder, private alertController: AlertController
            , private supportService: SupportService) { }

  ngOnInit() {
    this.initClientSupportForm();
  }

  onSubmitClientSupportForm() {
    const firstName = this.clientSupportForm.controls['firstName'].value;
    const lastName = this.clientSupportForm.controls['lastName'].value;
    const message = this.clientSupportForm.controls['message'].value;

    if (firstName == "") {
      this.presentAlert("Empty Feilds Founded.", "First name is required.");
    } else if (lastName == "") {
      this.presentAlert("Empty Feilds Founded.", "Last name is required.");
    } else if (message == "") {
      this.presentAlert("Empty Feilds Founded.", "Message is required.");
    } else {
      this.supportMessage.emailAddress = sessionStorage.getItem("emailAddress");
      this.supportMessage.firstName = firstName;
      this.supportMessage.lastName = lastName;
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
      firstName: ['', Validators.required],
      lastName:  ['', Validators.required],
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
