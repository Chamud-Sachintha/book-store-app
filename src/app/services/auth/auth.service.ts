import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from 'src/app/models/Clinet/client';
import { GoogleAuth } from 'src/app/models/GoogleAuth/google-auth';
import { Request } from 'src/app/models/Request/request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerNewClient(clientInfo: Client) {
    const path = environment.appUrl + "register";
    
    return this.http.post(path, clientInfo);
  }

  authenticateClientInfo(clientInfo: Client) {
    const path = environment.appUrl + "login";

    return this.http.post(path, clientInfo);
  }

  googleAuth(gAuthModel: GoogleAuth) {
    const path = environment.appUrl + "googleAuth";
    return this.http.post(path, gAuthModel);
  }

  isClientLoggedIn() {
    return sessionStorage.getItem("emailAddress") != null;
  }

  sendOTP(requestBody: Request) {
    const path = environment.appUrl + "send-otp";
    return this.http.post(path, requestBody);
  }

  validateOTP(requestBody: Request) {
    const path = environment.appUrl + "validate-otp";
    return this.http.post(path, requestBody);
  }

  addLoginTimeLog(requestBody: Request) {
    const path = environment.appUrl + "login-time";
    return this.http.post(path, requestBody);
  }

  updateLogOutTime(requestBody: Request) {
    console.log('kk ' + requestBody.clientId);
    const path = environment.appUrl + "update-logout-time";
    return this.http.post(path, requestBody);
  }
}
