import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController, IonicModule, NavController, Platform } from '@ionic/angular';
import { Book } from 'src/app/models/Book/book';
import { CartItem } from 'src/app/models/Cart/cart-item';
import { CartService } from 'src/app/services/cart/cart.service';
import { Order } from 'src/app/models/Order/order';
import { OrderService } from 'src/app/services/order/order.service';
import { environment } from 'src/environments/environment';

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
  orderInfo = new Order();
  cartId!: number;
  cartAmount: number = 0;

  constructor(private router: Router, private cartService: CartService, private alertController: AlertController
            , private orderService: OrderService, private platform: Platform, private navCtrl: NavController) { 

  }

  ngOnInit() {
    // if (!localStorage.getItem('foo')) { 
    //   localStorage.setItem('foo', 'no reload') 
    //   location.reload() 
    // } else {
    //   localStorage.removeItem('foo') 
    // }

    this.getAllCartItems();
  }

  onClickBackBtn() {
    this.navCtrl.back();
  }

  onClickCheckoutBtn() {
    this.orderInfo.token = sessionStorage.getItem("authToken");
    this.orderInfo.clientId = sessionStorage.getItem("clientId");
    this.orderInfo.cartId = this.cartId;

    this.orderService.placeOrderRequest(this.orderInfo).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.presentAlert("", "Order Placed Successfully");
        this.allCartItemsList = [];
        this.cartAmount = 0;
        
        this.router.navigate(['/my-books']);
      } else {
        this.presentAlert("", "Please Add Book/s to Cart");
      }
    }, (err) => {
      this.presentAlert("Place New Order", err.message);
    })
  }

  getAllCartItems() {
    this.cart.token = sessionStorage.getItem("authToken");
    this.cart.clientId = sessionStorage.getItem("clientId");

    this.cartService.getAllCartItemsList(this.cart).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].body.forEach((el: Book) => {
          const coverImage = environment.imageServer + "public/public/CoverImages/" + el.bookCover;
          el.bookCover = coverImage;
          
          this.allCartItemsList.push(el);
        });
        console.log(this.allCartItemsList)
        this.cartId = dataList.data[0].cartId;
        this.cartAmount = dataList.data[0].cartAmount;
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
        this.presentAlert("", "Removed from Cart Successfully")
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
