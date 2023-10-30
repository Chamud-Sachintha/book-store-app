import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { IonicModule, NavController, Platform, ToastController } from '@ionic/angular';
import { Book } from 'src/app/models/Book/book';
import { Request } from 'src/app/models/Request/request';
import { BookService } from 'src/app/services/book/book.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { environment } from 'src/environments/environment';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

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
  requestBody = new Request();

  constructor(private router: Router, private bookService: BookService, private platform: Platform, private navCtrl: NavController
            , private toastController: ToastController, private profileService: ProfileService, private analyticsService: AnalyticsService) { 

      this.analyticsService.setScreenName("Book List Page");
  }

  ngOnInit() {
    this.getMyPaidBookList();
    this.checkProfileIsFilled();
  }

  checkProfileIsFilled() {
    this.requestBody.clientId = sessionStorage.getItem("clientId");
    this.requestBody.token = sessionStorage.getItem("authToken");

    this.profileService.checkProfileInfo(this.requestBody).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));
      console.log(resp.code)
      if (resp.code === 1) {
        if (!dataList.data[0].isProfileOk) {
          this.router.navigate(['edit-profile']);
        }
      }
    })
  }

  onClickBackBtn() {
    this.router.navigate(['book-list']);
  }

  getMyPaidBookList() {
    this.requestModel.cid = sessionStorage.getItem("clientId");
    this.requestModel.token = sessionStorage.getItem("authToken");

    this.bookService.getPaidBooksList(this.requestModel).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((el: Book) => {
          const coverImage = environment.imageServer + "public/public/CoverImages/" + el.bookCover;
          el.bookCover = coverImage;
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
