import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule]
})
export class SigninComponent  implements OnInit {

  clientLoginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createSigninForm();
  }

  createSigninForm() {
    this.clientLoginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmitClientLoginForm() {
    this.router.navigate(['/book-list']);
  }

}
