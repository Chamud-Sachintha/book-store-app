import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {}

  onSubmitClientLoginForm() {
    
  }

}
