import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User} from "../interfaces/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  searchUsersByLetter(letter: string) {
    if (letter) {
      return this.http.get<User[]>(`http://localhost:8080/users/search/${letter}`);
    } else {
      return [];
    }
  }
}
