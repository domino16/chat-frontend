import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private authService: AuthService) {}

  loginForm: FormGroup = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    passwordFormControl: new FormControl('', [Validators.required]),
  });

  logInClick() {
    const email: string = this.loginForm.controls['emailFormControl'].value;
    const password: string =
      this.loginForm.controls['passwordFormControl'].value;
    this.authService
      .getAuth(email, password)
      .subscribe((data) => console.log(data));
  }
}
