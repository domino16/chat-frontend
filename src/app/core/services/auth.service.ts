import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getAuth(email: string, password: string): Observable<User> {
    return this.http.post<User>("http://localhost:8080/auth/login", {
      email,
      password,
    });
  }

  signUp(newUser: User): Observable<User> {
    return this.http.post<User>("http://localhost:8080/auth/signup", newUser);
  }
}
