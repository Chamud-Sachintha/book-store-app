import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/Order/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  placeOrderRequest(orderInfo: Order) {
    const path = environment.appUrl + "placeOrder";
    return this.http.post(path, orderInfo);
  }
}
