import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatMessengerComponent } from './chat-messenger/chat-messenger.component';
import { SharedModule } from '../shared/shared.module';
import { ChatUserInfoComponent } from './chat-user-info/chat-user-info.component';



@NgModule({
  declarations: [
    ChatComponent,
    ChatListComponent,
    ChatMessengerComponent,
    ChatUserInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ChatModule { }
