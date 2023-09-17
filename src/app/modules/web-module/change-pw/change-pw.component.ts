import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-pw',
  templateUrl: './change-pw.component.html',
  styleUrls: ['./change-pw.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule]
})
export class ChangePwComponent  implements OnInit {

  changePwForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initChangePwForm();
  }

  initChangePwForm() {
    this.changePwForm = this.formBuilder.group({
      newPassword: ['', Validators.required],
      confPassword: ['', Validators.required]
    })
  }

  changePw() {
    const newPassword = this.changePwForm.controls['newPassword'].value;
    const confPass = this.changePwForm.controls['confPassword'].value;

    if (newPassword == "") {

    } else if (confPass == "") {

    } else if (newPassword != confPass) {

    } else {

    }
  }

}
