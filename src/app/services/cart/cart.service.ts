import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/Book/book';
import { CartItem } from 'src/app/models/Cart/cart-item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  addItemsToCart(cartItem: CartItem) {
    const path = environment.appUrl + "addToCart";
    return this.http.post(path, cartItem);
  }

  getAllCartItemsList(requestBody: CartItem):Observable<Book[]> {
    const path = environment.appUrl + "allCartItems";
    return this.http.post<Book[]>(path, requestBody);
  }

  removeItemFromCartById(cartItem: CartItem) {
    const path = environment.appUrl + "removeItmeFromCart";
    return this.http.post(path, cartItem);
  }
}
