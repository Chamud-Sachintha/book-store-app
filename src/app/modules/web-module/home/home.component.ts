import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SwiperComponent, SwiperModule } from 'swiper/angular';
import {  SlideToConfirmModule } from 'ngx-slide-to-confirm';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [IonicModule, SwiperModule, SlideToConfirmModule],
  standalone: true
})
export class HomeComponent  implements OnInit {

  @ViewChild('swiper') swiper!: SwiperComponent;

  config = {
    slidesPerView: 1,
    spaceBetween: 3,
    centeredSlides: true,
    loop: true,
  }

  animationInProgress = false;

  moreText = "පාඩම් අනුව වර්ගීකරණය කොට ඇති මෙම ගැටලු 2017 සංයුක්ත ගණිතය විෂය නිර්දේශයේ අඩංගු වන අන්තර්ගතයන් භාවිතයෙන් විසඳන අයුරුද අනුක්‍රමිකව සාරාංශගත කොට ඇත.ගැටලු විසඳීම සඳහා  \"ඔබ ගත යුතු පියවර මොනවාද?\" හෝ \"ඔබ මෙම නිශ්චිත ප්‍රවේශය තෝරාගත යුත්තේ ඇයි?\"  යන්න පැහැදිලි කිරීම මගින් සිසුන්ට ගැටලු විසඳීමේ ක්‍රියාවලිය ගැන මෙනෙහි කිරීමට මෙන්ම ඔවුන්ගේ චින්තනය පිළිබඳ ගැඹුරු අවබෝධයක් වර්ධනය කරගැනීමට සිසුන් දිරිමත් කොට, එමගින් ඔවුන්ගේ සාර්ථකත්වයන්ගෙන් මෙන්ම ඔවුන්ගේ  අසාර්ථකත්වයන්ගෙන්ද ඔවුන්ට ඉගෙනීමට අවස්ථාව සලසා ඇත. නිතිපතා පුහුණුවීම් සංකල්ප ශක්තිමත් කොට ගැටලු විසඳීමේ ක්‍රම වැඩිදියුණු කරගැනීමට සහ                  ආත්ම විශ්වාසය ගොඩනඟා ගැනීමට ඔබත් අදම එක්වන්න."

  constructor(private router: Router) { 
    const getTabBar = document.getElementById("testYYU");
    
    if (getTabBar != null) {
      getTabBar.style.display = "none";
    }
  }

  ngOnInit() {
    this.startAnimation();

    let t = document.getElementById("slide-to-confirm-wrapper");
    if (t != null) {
      console.log(t.style);
      t.removeAttribute("style")
      // t.style.cssText = null;
      // t.style.background = "";
      // t.style.backgroundImage = "";

      console.log(t.style)
    }
  }

  startAnimation() {
    if(this.animationInProgress) return;
    this.animationInProgress = true;
    setTimeout(() => {
      this.swiper.swiperRef.slideNext(2000);
      this.animationInProgress = false;
      this.startAnimation();
    }, 3000);
  }

  next() {
    this.swiper.swiperRef.slideNext(1000);
  }

  onConfirm() {
    const authToken = sessionStorage.getItem("authToken");

    if (authToken != null) {
      this.router.navigate(['/book-list']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  onClickSeeMoreLink() {
    const getId = document.getElementById("moreText");
    const moreBtnEl = document.getElementById("moreBtn");
    const lessBtn = document.getElementById("lessBtn");

    if (getId != null && moreBtnEl != null && lessBtn != null) {
      getId.style.display = "";
      getId.innerHTML = this.moreText;
      moreBtnEl.style.display = "none";
      lessBtn.style.display = "";
    }
    
  }

  onClickSeeLessLink() {
    const getId = document.getElementById("moreText");
    const moreBtnEl = document.getElementById("moreBtn");
    const lessBtn = document.getElementById("lessBtn");

    if (getId != null && moreBtnEl != null && lessBtn != null) {
      getId.style.display = "none";
      moreBtnEl.style.display = "";
      lessBtn.style.display = "none";
    }
  }

  onClickSigninBtn() {
    this.router.navigate(['/auth/login']);
  }

}
