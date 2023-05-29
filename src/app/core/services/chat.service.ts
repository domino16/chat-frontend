import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, first, switchMap } from "rxjs";
import { Chat } from "../interfaces/chat";
import { Store } from "@ngrx/store";
import { authUser } from "src/app/store/auth/auth.selectors";

export interface createChatRequest {
  senderId: string;
  senderName: string;
  recipientId: string;
  recipientName: string;
}

@Injectable({
  providedIn: "root",
})
export class ChatService {
  url = "http://localhost:8081";
  authUser$ = this.store.select(authUser);

  constructor(private http: HttpClient, private store: Store) {}

  getChats(id: string): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.url + "/chats/" + id );
  }

  getOrCreateChat(recipientId: string, recipientName: string): Observable<Chat> {
    return this.store.select(authUser).pipe(
      first(),
      switchMap((user) => {
        return this.http.post<Chat>(this.url + "/chats", {
          senderId: user?.email,
          senderName: user?.firstName,
          recipientId: recipientId,
          recipientName: recipientName,
        });
      }),
    );
  }

  getMessages(senderId: string, recipientId: string, limit: number) {
    return this.http.get(this.url + "/messages/" + senderId + "/" + recipientId + "/" + limit);
  }

  countReceivedMessages(senderId: string, recipientId: string) {
    return this.http.get(this.url + "/messages/count/" + senderId + "/" + recipientId);
  }

  deleteMessage(messageId: string) {
    return this.http.delete(this.url + "/messages/" + messageId);
  }
}
