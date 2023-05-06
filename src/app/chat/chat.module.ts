import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatMessengerComponent } from './chat-messenger/chat-messenger.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ChatComponent,
    ChatListComponent,
    ChatMessengerComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ChatModule { }
