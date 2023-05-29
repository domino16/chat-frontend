import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChatComponent } from "./chat.component";
import { ChatListComponent } from "./chat-list/chat-list.component";
import { ChatMessengerComponent } from "./chat-messenger/chat-messenger.component";
import { ChatUserInfoComponent } from "./chat-user-info/chat-user-info.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [ChatComponent, ChatListComponent, ChatMessengerComponent, ChatUserInfoComponent],
  imports: [CommonModule, SharedModule],
})
export class ChatModule {}
