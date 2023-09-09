import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SupportMessage } from 'src/app/models/Support/support-message';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  constructor(private http: HttpClient) { }

  addClientSupportmessage(supportMessage: SupportMessage) {
    const path = environment.appUrl + "addClientSupportMessage";
    return this.http.post(path, supportMessage);
  }
}
