import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Profile } from 'src/app/models/Profile/profile';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class ProfileComponent  implements OnInit {

  profileInfo = new Profile();

  constructor(private router: Router, private profileService: ProfileService) { }

  ngOnInit() {
    this.getProfileInformations();
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
