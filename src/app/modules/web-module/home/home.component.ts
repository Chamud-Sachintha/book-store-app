import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [IonicModule],
  standalone: true
})
export class HomeComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
