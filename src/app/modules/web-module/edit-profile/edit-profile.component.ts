import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule, NavController } from '@ionic/angular';
import { Profile } from 'src/app/models/Profile/profile';
import { Request } from 'src/app/models/Request/request';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule]
})
export class EditProfileComponent implements OnInit {

  editprofileForm!: FormGroup;
  profileInfo = new Profile();
  requestModel = new Request();

  constructor(private router: Router, private formBuilder: FormBuilder, private profileService: ProfileService
    , private alertController: AlertController, private navCtrl: NavController) { }

  ngOnInit() {
    this.initEditProfileForm();
    this.getProfileInformations();
  }

  onClickProfileSection() {
    this.router.navigate(['/profile']);
  }

  onClickBackBtn() {
    this.navCtrl.back();
  }

  onSubmitEditProfileForm() {
    const firstName = this.editprofileForm.controls['firstName'].value;
    const lastName = this.editprofileForm.controls['lastName'].value;

    const age = this.editprofileForm.controls['age'].value;
    const sex = this.editprofileForm.controls['sex'].value;
    const nicNumber = this.editprofileForm.controls['nicNumber'].value;
    const mobileNumber = this.editprofileForm.controls['mobileNumber'].value;
    const schoolName = this.editprofileForm.controls['schoolName'].value;
    const grade = this.editprofileForm.controls['grade'].value;
    const district = this.editprofileForm.controls['district'].value;

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

          //location.reload();
        }
      }, (err) => {
        this.presentAlert("Update Profile Informatioms", err.message);
      })

      this.profileInfo.clientId = sessionStorage.getItem("clientId");
      this.profileInfo.age = age;
      this.profileInfo.gender = sex;
      this.profileInfo.nicNumber = nicNumber;
      this.profileInfo.mobileNumber = mobileNumber;
      this.profileInfo.schoolName = schoolName;
      this.profileInfo.grade = grade;
      this.profileInfo.district = district;

      this.profileService.saveProfileAditionalInfo(this.profileInfo).subscribe((resp: any) => {
        const dataList = JSON.parse(JSON.stringify(resp));

        if (resp.code === 1) {
          this.presentAlert("Update Profile Informatioms", "user data are safe in our DB and will not be shared with any third parties.");
        }
      }, (err) => {

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
      age: ['', Validators.required],
      sex: ['', Validators.required],
      nicNumber: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      schoolName: ['', Validators.required],
      grade: ['', Validators.required],
      district: ['', Validators.required]
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
        // this.editprofileForm.controls['mobileNumber'].setValue(dataList.data[0].mobileNumber)
      }
    }, (err) => {

    })

    this.requestModel.clientId = sessionStorage.getItem("clientId");
    this.requestModel.token = sessionStorage.getItem("authToken");

    this.profileService.getAditionalProfileInfo(this.requestModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.editprofileForm.controls['age'].setValue(dataList.data[0].age)
        this.editprofileForm.controls['sex'].setValue(dataList.data[0].gender)
        this.editprofileForm.controls['mobileNumber'].setValue(dataList.data[0].mobileNumber)
        this.editprofileForm.controls['nicNumber'].setValue(this.profileInfo.firstName)
        this.editprofileForm.controls['schoolName'].setValue(this.profileInfo.lastName)
        this.editprofileForm.controls['grade'].setValue(dataList.data[0].mobileNumber)
        this.editprofileForm.controls['district'].setValue(dataList.data[0].district)
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
