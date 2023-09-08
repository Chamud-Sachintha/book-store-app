import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from 'src/app/models/Clinet/client';
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
}
