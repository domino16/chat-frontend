import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map, switchMap } from "rxjs/operators";
import { ChatService } from "src/app/core/services/chat.service";
import {
  loadChats,
  allChatsLoaded,
  allMessagesLoaded,
  loadMessages,
  sendMessage,
  sendMessageSucess,
} from "./chat.actions";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { selectAuthUserId } from "../auth/auth.selectors";
import { getSelectedChat } from "./chat.selectors";
import { Chat } from "src/app/core/interfaces/chat";
import { RxStompService } from "src/app/core/services/rx-stomp.service";
import { v4 as uuidv4 } from 'uuid';

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
      switchMap((action) => this.chatService.getMessages(action.senderId, action.recipientId, action.limit)),
      map((messages) => allMessagesLoaded({ messages })),
    ),
  );

  sendMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendMessage),
      concatLatestFrom(() => [of(uuidv4()), this.selectedChat$, this.authUserId$, of(new Date())]),
      map(([action,uuidv4, selectedChat, authUserId, creationDate]) => {
        const message = {
          id:uuidv4,
          senderId: authUserId as string,
          recipientId: selectedChat?.recipientId as string,
          content: action.messageContent,
          creationDate: creationDate,
        };
         this.rxStompService.publish({ destination: '/app/messages', body:JSON.stringify(message) })
      return sendMessageSucess({ message });
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private chatService: ChatService,
    private store: Store,
    private rxStompService: RxStompService,
  ) {}
}
