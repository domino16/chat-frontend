import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User} from "../interfaces/user";
import { Observable} from "rxjs";
import { editRequest } from "src/app/shared/components/profile-popup/profile-popup.component";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  searchUsersByLetter(letter: string) {
    if (letter) {
      return this.http.get<User[]>(`http://localhost:8080/users/search/${letter}`);
    } else {
      return this.http.get<User[]>(`http://localhost:8080/users/search/random`);
    }
  }

  getUserByEmail(email: string):Observable<User> {
    return this.http.get<User>(`http://localhost:8080/users/user/${email}`)
  }

  editProfile(editReq:editRequest): Observable<{token: string}> {

    return this.http.post<{token: string}>("http://localhost:8080/users/user/edit", editReq)
  }


}
