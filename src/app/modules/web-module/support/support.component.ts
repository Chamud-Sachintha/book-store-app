import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class SupportComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  onClickProfileSection() {
    this.router.navigate(['/profile'])
  }

  onClickCartPage() {
    this.router.navigate(['/cart'])
  }

}
