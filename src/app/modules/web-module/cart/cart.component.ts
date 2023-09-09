import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { Book } from 'src/app/models/Book/book';
import { CartItem } from 'src/app/models/Cart/cart-item';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class CartComponent  implements OnInit {

  allCartItemsList: Book[] = [];
  cart = new CartItem();
  cartId!: number;

  constructor(private router: Router, private cartService: CartService, private alertController: AlertController) { }

  ngOnInit() {
    this.getAllCartItems();
  }

  getAllCartItems() {
    this.cart.token = sessionStorage.getItem("authToken");
    this.cart.clientId = sessionStorage.getItem("clientId");

    this.cartService.getAllCartItemsList(this.cart).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].body.forEach((el: Book) => {
          this.allCartItemsList.push(el);
        });

        this.cartId = dataList.data[0].cartId;
      }
    }, (err) => {

    })
  }

  onClickRemoveItemFromCart(bookId: number) {
    this.cart.token = sessionStorage.getItem("authToken");
    this.cart.bookId = bookId
    this.cart.cartId = this.cartId;

    this.cartService.removeItemFromCartById(this.cart).subscribe((resp: any) => {
      if (resp.code === 1) {
        this.presentAlert("Remove Item From Cart", "Item Removed Successfully.")
        location.reload();
      }
    }, (err) => {
      this.presentAlert("Remove Item From Cart", err.message)
    })
  }

  async presentAlert(subHeader: string, alertMessage: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: subHeader,
      message: alertMessage,
      buttons: ['OK'],
    });

    await alert.present();
  }

  onClickCartPage() {
    this.router.navigate(['/cart']);
  }

  onClickProfileSection() {
    this.router.navigate(['/profile']);
  }

}
