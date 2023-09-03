import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class MyBooksComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

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
