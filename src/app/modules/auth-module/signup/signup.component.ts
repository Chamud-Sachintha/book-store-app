import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class SignupComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  onSubmitCreateAccount() {

  }

}
