import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SwiperComponent, SwiperModule } from 'swiper/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [IonicModule, SwiperModule],
  standalone: true
})
export class HomeComponent  implements OnInit {

  config = {
    slidesPerView: 1.3,
    spaceBetween: 3,
    centeredSlides: true,
    loop: true,
  }

  moreText = "පාඩම් අනුව වර්ගීකරණය කොට ඇති මෙම ගැටලු 2017 සංයුක්ත ගණිතය විෂය නිර්දේශයේ අඩංගු වන අන්තර්ගතයන් භාවිතයෙන් විසඳන අයුරුද අනුක්‍රමිකව සාරාංශගත කොට ඇත.ගැටලු විසඳීම සඳහා  \"ඔබ ගත යුතු පියවර මොනවාද?\" හෝ \"ඔබ මෙම නිශ්චිත ප්‍රවේශය තෝරාගත යුත්තේ ඇයි?\"  යන්න පැහැදිලි කිරීම මගින් සිසුන්ට ගැටලු විසඳීමේ ක්‍රියාවලිය ගැන මෙනෙහි කිරීමට මෙන්ම ඔවුන්ගේ චින්තනය පිළිබඳ ගැඹුරු අවබෝධයක් වර්ධනය කරගැනීමට සිසුන් දිරිමත් කොට, එමගින් ඔවුන්ගේ සාර්ථකත්වයන්ගෙන් මෙන්ම ඔවුන්ගේ  අසාර්ථකත්වයන්ගෙන්ද ඔවුන්ට ඉගෙනීමට අවස්ථාව සලසා ඇත. නිතිපතා පුහුණුවීම් සංකල්ප ශක්තිමත් කොට ගැටලු විසඳීමේ ක්‍රම වැඩිදියුණු කරගැනීමට සහ                  ආත්ම විශ්වාසය ගොඩනඟා ගැනීමට ඔබත් අදම එක්වන්න."

  constructor(private router: Router) { }

  ngOnInit() {}

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
