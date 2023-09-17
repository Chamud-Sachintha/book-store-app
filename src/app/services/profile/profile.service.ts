import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from 'src/app/models/Profile/profile';
import { Request } from 'src/app/models/Request/request';
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

  checkProfileInfo(requestBody: Request) {
    const path = environment.appUrl + "check-profile";
    return this.http.post(path, requestBody);
  }

}
