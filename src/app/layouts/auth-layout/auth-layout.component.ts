import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class AuthLayoutComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
