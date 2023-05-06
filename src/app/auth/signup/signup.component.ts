import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Validation } from './repeat-password-validation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm: FormGroup = new FormGroup({
    firstname:new FormControl('', [Validators.required]),
    lastname:new FormControl('', [Validators.required]),
    email:new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('', [Validators.required]),
    repassword:new FormControl('', [Validators.required])
  },
    Validation.match('password', 'repassword')
  )

}
