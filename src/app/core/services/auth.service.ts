import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";
import { Observable } from "rxjs";
import { loginSuccess } from "src/app/store/auth/auth.actions";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store) {}

  getAuth(email: string, password: string): Observable<User> {
    return this.http.post<User>("http://localhost:8080/auth/login", {
      email,
      password,
    });
  }

  signUp(newUser: User): Observable<User> {
    return this.http.post<User>("http://localhost:8080/auth/signup", newUser);
  }


  handleAuth(user: User):void {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    const userData: User = JSON.parse(localStorage.getItem('userData') ?? '{}');
    if (!userData) {
      return;
    }
   this.store.dispatch(loginSuccess({ authUser: userData }));
  
  }

}