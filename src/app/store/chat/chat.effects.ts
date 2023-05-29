import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatMap, map} from 'rxjs/operators';
import { ChatService } from 'src/app/core/services/chat.service';
import { loadChats, allChatsLoaded } from './chat.actions';



@Injectable()
export class ChatEffects {

    loadChats$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(loadChats),
                concatMap(action =>
                    this.chatService.getChats(action.userEmail)),
                map(chats => allChatsLoaded({chats}))

            )
    );

    constructor(private actions$: Actions,
                private chatService: ChatService) {
    }

}