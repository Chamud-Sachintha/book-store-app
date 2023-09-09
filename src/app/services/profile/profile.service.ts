import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from 'src/app/models/Profile/profile';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfileInformations(clientInfo: Profile) {
    const path = environment.appUrl + "profile";
    return this.http.post(path, clientInfo);
  }

  updateProfileInfo(profileInfo: Profile) {
    const path = environment.appUrl + "update-profile";
    return this.http.post(path, profileInfo);
  }
}
