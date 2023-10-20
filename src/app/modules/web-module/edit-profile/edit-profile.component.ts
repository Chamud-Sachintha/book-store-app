import { CommonModule } from '@angular/common';
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
  imports: [IonicModule, FormsModule, ReactiveFormsModule, CommonModule]
})
export class EditProfileComponent implements OnInit {

  editprofileForm!: FormGroup;
  profileInfo = new Profile();
  requestModel = new Request();
  gender: any;

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

  isValidNumber(str: any) {

    const txtPrefix = str.substring(0, 2);

    if ((!isNaN(str)) && (txtPrefix == "07") && (str.length == 10)) {
      return true;
    } else {
      return false;
    }
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

    if (firstName == "" || lastName == "" || age == "" || sex == "" || nicNumber == "" || mobileNumber == "" || schoolName == "" || grade == "" || district == "") {
      this.presentAlert("Empty Field/s Detected", "Please FILL ALL Listed Fields")
      // } if (firstName == "") {
      //   this.presentAlert("Empty Feilds Founed.", "First Name is Required.")
      // } else if (lastName == "") {
      //   this.presentAlert("Empty Feilds Founed.", "Last Name is Required.")
      // } else if (mobileNumber == "") {
      //   this.presentAlert("Empty Feilds Founed.", "Mobile Number is Required.")
      // } else if (!this.isValidNumber(mobileNumber)) {
      //   this.presentAlert("Invalid Input Format.", "Enter Valid Mobile Number.")
      // } else if (nicNumber == "") {
      //   this.presentAlert("Empty Feilds Founed.", "NIC Number is Required.")
      // } else if (schoolName == "") {
      //   this.presentAlert("Empty Feilds Founed.", "School Name is Required.")
      // } else if (age == "") {
      //   this.presentAlert("Empty Feilds Founed.", "Age is Required.")
      // } else if (sex == "") {
      //   this.presentAlert("Empty Feilds Founed.", "Gender is Required.")
      // } else if (grade == "") {
      //   this.presentAlert("Empty Feilds Founed.", "Grade is Required.")
      // } else if (district == "") {
      //   this.presentAlert("Empty Feilds Founed.", "District is Required.")
    } else {

      if (!this.isValidNumber(mobileNumber)) {
        this.presentAlert("Invalid Input Format", "Enter Valid Mobile Number")
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
          this.presentAlert("Profile Updated Successfully", err.message);
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
            this.editprofileForm.controls['firstName'].setValue("");
            this.editprofileForm.controls['lastName'].setValue("");

            this.editprofileForm.controls['age'].setValue("");
            this.editprofileForm.controls['sex'].setValue("");
            this.editprofileForm.controls['nicNumber'].setValue("");
            this.editprofileForm.controls['mobileNumber'].setValue("");
            this.editprofileForm.controls['schoolName'].setValue("");
            this.editprofileForm.controls['grade'].setValue("");
            this.editprofileForm.controls['district'].setValue("");

            this.presentAlert("Profile Updated Successfully", "Thank you !!!");
            this.router.navigate(['my-books']);
          }
        }, (err) => {

        })
      }
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
        this.gender = dataList.data[0].gender;
        this.editprofileForm.controls['mobileNumber'].setValue(dataList.data[0].mobileNumber)
        this.editprofileForm.controls['nicNumber'].setValue(dataList.data[0].nicNumber)
        this.editprofileForm.controls['schoolName'].setValue(dataList.data[0].schoolName)
        // console.log((dataList.data[0].grade == 1));
        if (dataList.data[0].grade == 11) {
          this.editprofileForm.controls['grade'].setValue("11")
        } else if (dataList.data[0].grade == 12) {
          this.editprofileForm.controls['grade'].setValue("12")
        } else if (dataList.data[0].grade == 13) {
          this.editprofileForm.controls['grade'].setValue("13")
        } else {
          this.editprofileForm.controls['grade'].setValue("1")
        }

        //this.editprofileForm.controls['grade'].setValue(dataList.data[0].grade)
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
