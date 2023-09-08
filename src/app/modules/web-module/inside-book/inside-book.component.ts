import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book/book.service';
import { Book } from 'src/app/models/Book/book';

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

  public ratingForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private activateRoute: ActivatedRoute, private bookService: BookService) { }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: Params) => this.bookId = params['bookId']);
    this.initRatingForm();
    this.getBookdetailsByBookId();
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
      rating: ['', Validators.required]
    })
  }

  onClickProfileSection() {
    this.router.navigate(['/profile']);
  }

  onClickCartPage() {
    this.router.navigate(['/cart']);
  }

}
