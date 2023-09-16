import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class PrivacyComponent  implements OnInit {


  constructor(private router: Router, private navCtrl: NavController) { }

  ngOnInit() {}

  onClickBackBtn() {
    this.navCtrl.back();
  }

  onClickProfileSection() {
    this.router.navigate(['/profile'])
  }

  onClickCartPage() {
    this.router.navigate(['/cart'])
  }

}
