import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book/book.service';
import { Book } from 'src/app/models/Book/book';
import { Review } from 'src/app/models/ClientReview/review';
import { CartService } from 'src/app/services/cart/cart.service';
import { CartItem } from 'src/app/models/Cart/cart-item';

@Component({
  selector: 'app-inside-book',
  templateUrl: './inside-book.component.html',
  styleUrls: ['./inside-book.component.scss'],
  standalone: true,
  imports: [IonicModule ,CommonModule, NgxStarRatingModule, FormsModule, ReactiveFormsModule]
})
export class InsideBookComponent  implements OnInit {

  bookId!: number;
  startRating!: number;
  bookInfo =  new Book();
  clientReview = new Review();
  cartItem = new CartItem();

  public ratingForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private activateRoute: ActivatedRoute, private bookService: BookService
              , private alertController: AlertController, private cartService: CartService) { }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: Params) => this.bookId = params['bookId']);
    this.initRatingForm();
    this.getBookdetailsByBookId();
  }

  onClickAddItemsToCart() {
    this.cartItem.token = sessionStorage.getItem("authToken");
    this.cartItem.bookId = this.bookId;
    this.cartItem.clientId = sessionStorage.getItem("clientId");
    this.cartItem.quantity = 1;

    this.cartService.addItemsToCart(this.cartItem).subscribe((resp: any) => {
      if (resp.code === 1) {
        this.presentAlert("Add Item to Cart", "Book Successfully Added to Cart.");
      }
    }, (err) => {
      this.presentAlert("Add to Cart", err.message);
    })
  }

  onSubmitClientReview() {
    const rating = this.ratingForm.controls['rating'].value;
    const feedback = this.ratingForm.controls['feedback'].value;
    
    this.clientReview.token = sessionStorage.getItem("authToken");
    this.clientReview.clientId = sessionStorage.getItem("clientId");
    this.clientReview.bookId = this.bookId;
    this.clientReview.rating = rating;
    this.clientReview.feedback = feedback;

    this.bookService.submitClientReviewForBook(this.clientReview).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.presentAlert("Submit Client Review", "Successfully Added a Review");
      }
    }, (err) => {
      this.presentAlert("Submit Client Review", err);
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

  getBookdetailsByBookId() {
    const requestBody = {
      token: sessionStorage.getItem("authToken"),
      bookId: this.bookId
    }
    this.bookService.getBookDetailsByBookId(requestBody).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.bookInfo.bookName = dataList.data[0].bookName;
        this.bookInfo.authorName = dataList.data[0].authorName;
        this.bookInfo.bookDescription = dataList.data[0].bookDescription;
      }

    }, (err) => {

    })
  }

  initRatingForm() {
    this.ratingForm = this.formBuilder.group({
      rating: ['', Validators.required],
      feedback: ['', Validators.required]
    })
  }

  onClickProfileSection() {
    this.router.navigate(['/profile']);
  }

  onClickCartPage() {
    this.router.navigate(['/cart']);
  }

}
