import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class ProfileComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  onClickEditProfileBtn() {
    this.router.navigate(['/profile/edit']);
  }

}
