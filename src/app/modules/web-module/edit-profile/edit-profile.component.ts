import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { Profile } from 'src/app/models/Profile/profile';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule]
})
export class EditProfileComponent  implements OnInit {

  editprofileForm!: FormGroup;
  profileInfo = new Profile();

  constructor(private router: Router,private formBuilder: FormBuilder, private profileService: ProfileService
              , private alertController: AlertController) { }

  ngOnInit() {
    this.initEditProfileForm();
    this.getProfileInformations();
  }

  onSubmitEditProfileForm() {
    const firstName = this.editprofileForm.controls['firstName'].value;
    const lastName = this.editprofileForm.controls['lastName'].value;
    const mobileNumber = this.editprofileForm.controls['mobileNumber'].value;

    if (firstName == "") {
      this.presentAlert("Empty Feilds Founed.", "First Name is Required.")
    } else if (lastName == "") {  
      this.presentAlert("Empty Feilds Founed.", "Last Name is Required.")
    } else if (mobileNumber == "") {
      this.presentAlert("Empty Feilds Founed.", "Mobile Number is Required.")
    } else {
      this.profileInfo.firstName = firstName;
      this.profileInfo.lastName = lastName;
      this.profileInfo.mobileNumber = mobileNumber;
      this.profileInfo.email = sessionStorage.getItem("emailAddress");
      this.profileInfo.token = sessionStorage.getItem("authToken");

      this.profileService.updateProfileInfo(this.profileInfo).subscribe((resp: any) => {
        if (resp.code === 1) {
          this.presentAlert("Update Profile Informatioms", "Profile Informations Updated Successfully.");
          location.reload();
        }
      }, (err) => {
        this.presentAlert("Update Profile Informatioms", err.message);
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

  initEditProfileForm() {
    this.editprofileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', Validators.required]
    })
  }

  getProfileInformations() {
    this.profileInfo.token = sessionStorage.getItem("authToken");
    this.profileInfo.email = sessionStorage.getItem("emailAddress");

    this.profileService.getProfileInformations(this.profileInfo).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.profileInfo.firstName = dataList.data[0].firstName;
        this.profileInfo.lastName = dataList.data[0].lastName;
        this.profileInfo.email = dataList.data[0].emailAddress;

        this.editprofileForm.controls['firstName'].setValue(this.profileInfo.firstName)
        this.editprofileForm.controls['lastName'].setValue(this.profileInfo.lastName)
        this.editprofileForm.controls['mobileNumber'].setValue(dataList.data[0].mobileNumber)
      }
    }, (err) => {

    })
  }

  onClickEditProfileBtn() {
    this.router.navigate(['/edit-profile']);
  }

  onClickCartPage() {
    this.router.navigate(['/cart']);
  }

}
