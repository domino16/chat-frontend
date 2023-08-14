import { Component, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { loginFailure, loginStart} from "src/app/store/auth/auth.actions";
import { errorMessage } from "src/app/store/auth/auth.selectors";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnDestroy {

  errorMessage = this.store.select(errorMessage)
  
  constructor(private store: Store) {}

  loginForm: FormGroup = new FormGroup({
    emailFormControl: new FormControl("", [Validators.required, Validators.email]),
    passwordFormControl: new FormControl("", [Validators.required]),
  });



  logInClick() {
    const email: string = this.loginForm.controls["emailFormControl"].value;
    const password: string = this.loginForm.controls["passwordFormControl"].value;
    this.store.dispatch(loginStart({email, password}));
  }

  ngOnDestroy(): void {
    this.store.dispatch(loginFailure({error:""}))
  }
}
