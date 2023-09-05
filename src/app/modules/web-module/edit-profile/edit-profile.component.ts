import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class EditProfileComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  onClickEditProfileBtn() {
    this.router.navigate(['/edit-profile']);
  }

  onClickCartPage() {
    this.router.navigate(['/cart']);
  }

}
