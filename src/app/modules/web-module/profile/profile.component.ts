import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { Profile } from 'src/app/models/Profile/profile';
import { Request } from 'src/app/models/Request/request';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ProfileComponent  implements OnInit {

  requestModel = new Request();
  profileInfo = new Profile();
  gender: any;

  constructor(private router: Router, private profileService: ProfileService, private navCtrl: NavController) { }

  ngOnInit() {
    this.getProfileInformations();
  }

  onClickBackBtn() {
    this.navCtrl.back();
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
      }

      this.requestModel.token = sessionStorage.getItem("authToken");
      this.requestModel.clientId = sessionStorage.getItem("clientId");

      this.profileService.getAditionalProfileInfo(this.requestModel).subscribe((info: any) => {

        const infoList = JSON.parse(JSON.stringify(info));

        if (info.code === 1) {
          this.gender = infoList.data[0].gender;
        }
      });
    }, (err) => {

    })
  }

  onClickSignOutBtn() {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("emailAddress");
    location.reload();
  }

  onClickEditProfileBtn() {
    this.router.navigate(['/edit-profile']);
  }

  onClickCartPage() {
    this.router.navigate(['/cart']);
  }

}
