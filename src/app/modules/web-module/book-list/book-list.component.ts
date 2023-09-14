import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Book } from 'src/app/models/Book/book';
import { BookService } from 'src/app/services/book/book.service';
import { SwiperComponent, SwiperModule } from 'swiper/angular';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { Profile } from 'src/app/models/Profile/profile';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  standalone: true,
  imports: [IonicModule, SwiperModule, CommonModule]
})
export class BookListComponent  implements OnInit {

  @ViewChild('swiper') swiper!: SwiperComponent;
  animationInProgress = false;

  bookInfoList: Book[] = [];

  config = {
    slidesPerView: 1.2,
    spaceBetween: 5,
    centeredSlides: true,
    loop: true,
  }

  coverFlowConfig = {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  }

  profileInfo = new Profile();

  constructor(private router: Router, private bookService: BookService, private profileService: ProfileService) { }

  ngOnInit() {
    this.startAnimation();
    this.getBookList();
    this.getProfileInfo();
  }

  getProfileInfo() {
    this.profileInfo.token = sessionStorage.getItem("authToken");
    this.profileInfo.email = sessionStorage.getItem("emailAddress");

    this.profileService.getProfileInformations(this.profileInfo).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.profileInfo.firstName = dataList.data[0].firstName;
        this.profileInfo.lastName = dataList.data[0].lastName;
        this.profileInfo.email = dataList.data[0].emailAddress;
      }
    }, (err) => {

    })
  }

  getBookList() {
    const requestBody = {
      token: sessionStorage.getItem("authToken")
    }
    this.bookService.getBookList(requestBody).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        resp.data[0].forEach((eachBook: any) => {
          this.bookInfoList.push(eachBook);
        });
      }
    }, (err) => {
      console.log(err)
    })
  }

  startAnimation() {
    if(this.animationInProgress) return;
    this.animationInProgress = true;
    setTimeout(() => {
      this.swiper.swiperRef.slideNext(2000);
      this.animationInProgress = false;
      this.startAnimation();
    }, 5000);
  }

  onClickProfileSection() {
    this.router.navigate(['/profile']);
  }

  onClickEachBook(bookId: number) {
    this.router.navigate(['/book', bookId]);
  }

  onClickCartPage() {
    this.router.navigate(['/cart']);
  }

}
