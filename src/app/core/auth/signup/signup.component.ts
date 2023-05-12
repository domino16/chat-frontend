import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Validation } from './repeat-password-validation';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private authService: AuthService) {
    
  }

  signupForm: FormGroup = new FormGroup({
    firstname:new FormControl('', [Validators.required]),
    lastname:new FormControl('', [Validators.required]),
    email:new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('', [Validators.required]),
    repassword:new FormControl('', [Validators.required])
  },
    Validation.match('password', 'repassword')
  )

  logInClick(){
    const email: string = this.signupForm.controls['username'].value;
    const password: string = this.signupForm.controls['password'].value;

    this.authService.getAuth(email, password).subscribe((data)=> console.log(data))
  };
}
