import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User} from "../interfaces/user";
import { Observable} from "rxjs";

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

  updateImg(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    

    const req = new HttpRequest('POST', `http://localhost:8080/users/update`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }


}
