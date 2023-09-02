import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SwiperComponent, SwiperModule } from 'swiper/angular';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  standalone: true,
  imports: [IonicModule, SwiperModule]
})
export class BookListComponent  implements OnInit {

  @ViewChild('swiper') swiper!: SwiperComponent;
  animationInProgress = false;

  config = {
    slidesPerView: 2,
    spaceBetween: 0,
    pagination: true,
    loop: true,
  }

  constructor(private router: Router) { }

  ngOnInit() {
    this.startAnimation();
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

  onClickEachBook() {
    this.router.navigate(['/book']);
  }

}
