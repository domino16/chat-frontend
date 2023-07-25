import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";
import { Observable } from "rxjs";
import { loginSuccess } from "src/app/store/auth/auth.actions";
import { Store } from "@ngrx/store";
import jwtDecode from "jwt-decode";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store, private router: Router) {}

  getAuth(email: string, password: string): Observable<{token: string}> {
    return this.http.post<{token:string}>("http://localhost:8080/auth/login", {
      email,
      password
    })
  }

  signUp(newUser: User): Observable<{token: string}> {
    return this.http.post<{token:string}>("http://localhost:8080/auth/signup", newUser);
  }


  handleAuth(accessToken:string):void {
    localStorage.setItem('accessToken', accessToken);
    const authUser:User = jwtDecode(accessToken);

    const timestamp:number = new Date().getTime()
    const tokenExpirationTimestamp = (authUser.exp as number)*1000

    if(timestamp > tokenExpirationTimestamp){
      this.logout()
      return
    }
  
   this.store.dispatch(loginSuccess({ authUser }));
   this.autoLogout(tokenExpirationTimestamp - timestamp)
  }

  autoLogin() {
    const accessToken = localStorage.getItem('accessToken') as string;  
    if (!accessToken) {
      return;
    }
    this.handleAuth(accessToken)
  }

  logout() {
  localStorage.removeItem('accessToken');
    this.router.navigate(['/']);
  }

  autoLogout(expirationDuration: number) {
    setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

}