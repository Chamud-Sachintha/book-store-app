import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-inside-book',
  templateUrl: './inside-book.component.html',
  styleUrls: ['./inside-book.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class InsideBookComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  onClickProfileSection() {
    this.router.navigate(['/profile']);
  }

}
