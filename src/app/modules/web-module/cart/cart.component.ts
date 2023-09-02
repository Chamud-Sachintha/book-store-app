import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class CartComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  onClickCartPage() {
    this.router.navigate(['/cart']);
  }

}
