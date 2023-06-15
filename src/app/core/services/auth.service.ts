import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";
import { Observable } from "rxjs";
import { loginSuccess } from "src/app/store/auth/auth.actions";
import { Store } from "@ngrx/store";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store) {}

  getAuth(email: string, password: string): Observable<{token: string}> {
    return this.http.post<{token:string}>("http://localhost:8080/auth/login", {
      email,
      password
    })
  }

  signUp(newUser: User): Observable<User> {
    return this.http.post<User>("http://localhost:8080/auth/signup", newUser);
  }


  handleAuth(accessToken:string):void {
    localStorage.setItem('accessToken', accessToken);
  }

  autoLogin() {
    const accessToken = localStorage.getItem('accessToken') as string;  
    if (!accessToken) {
      return;
    }
    const authUser:User = jwtDecode(accessToken);
    console.log(authUser);
   this.store.dispatch(loginSuccess({ authUser }));
  
  }

}