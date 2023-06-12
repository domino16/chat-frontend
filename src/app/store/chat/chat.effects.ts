import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { concatMap, filter, map, switchMap } from "rxjs/operators";
import { ChatService } from "src/app/core/services/chat.service";
import {
  loadChats,
  allChatsLoaded,
  allMessagesLoaded,
  loadMessages,
  sendMessage,
  selectChat,
} from "./chat.actions";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { selectAuthUserId } from "../auth/auth.selectors";
import { getSelectedChat } from "./chat.selectors";
import { Chat } from "src/app/core/interfaces/chat";
import { RxStompService } from "src/app/core/services/rx-stomp.service";

@Injectable()
export class ChatEffects {
  authUserId$: Observable<string | undefined> = this.store.select(selectAuthUserId);
  selectedChat$: Observable<Chat | null> = this.store.select(getSelectedChat);

  loadChats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadChats),
      concatMap((action) => this.chatService.getChats(action.userEmail)),
      map((chats) => allChatsLoaded({ chats })),
    ),
  );

  loadMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMessages),
      concatLatestFrom(() => [this.authUserId$, this.selectedChat$]),
      switchMap(([, authUserId, selectedChat]) => this.chatService.getMessages(authUserId as string, selectedChat?.recipientId as string, 20)),
      map((messages) => allMessagesLoaded({ messages })),
    ),
  );

  sendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendMessage),
      concatLatestFrom(() => [this.selectedChat$, this.authUserId$, of(new Date())]),
      map(([action, selectedChat, authUserId, creationDate]) => {
        const message = {
          senderId: authUserId as string,
          recipientId: selectedChat?.recipientId as string,
          content: action.messageContent,
          creationDate: creationDate,
        };
         this.rxStompService.publish({ destination: '/app/messages', body:JSON.stringify(message)})
         setTimeout(() => {
           this.store.dispatch(loadMessages())
         },400);
         return loadMessages()
      }),
    )
  );

  selectChat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectChat),
      filter(action => !!action.selectedChat),
      map(() => {
        return loadMessages()}),
    ),
  );


  constructor(
    private actions$: Actions,
    private chatService: ChatService,
    private store: Store,
    private rxStompService: RxStompService,
  ) {}
}
