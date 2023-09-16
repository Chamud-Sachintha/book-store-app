import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { IonicModule, NavController, Platform, ToastController } from '@ionic/angular';
import { Book } from 'src/app/models/Book/book';
import { Request } from 'src/app/models/Request/request';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class MyBooksComponent  implements OnInit {

  paidBookInfoList: Book[] = [];
  requestModel = new Request();

  constructor(private router: Router, private bookService: BookService, private platform: Platform, private navCtrl: NavController
            , private toastController: ToastController) { }

  ngOnInit() {
    this.getMyPaidBookList();
  }

  onClickBackBtn() {
    this.navCtrl.back();
  }

  getMyPaidBookList() {
    this.requestModel.cid = sessionStorage.getItem("clientId");
    this.requestModel.token = sessionStorage.getItem("authToken");

    this.bookService.getPaidBooksList(this.requestModel).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((el: Book) => {
          this.paidBookInfoList.push(el)
        });
      }
    }, (err) => {

    })
  }

  onClickVisitChapters(bookId: any) {
    this.router.navigate(['/chapters', bookId])
  }

  onClickReadBook() {
    this.router.navigate(['/read']);
  }

  onClickCartPage() {
    this.router.navigate(['/cart']);
  }

  onClickProfileSection() {
    this.router.navigate(['/profile']);
  }
}
