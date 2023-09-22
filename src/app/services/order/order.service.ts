import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/Order/order';
import { Request } from 'src/app/models/Request/request';
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

  buyEachBook(requestBody: Request) {
    const path = environment.appUrl + "buy-book";
    return this.http.post(path, requestBody);
  }
}
