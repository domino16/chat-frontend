import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChatComponent } from "./chat.component";
import { ChatListComponent } from "./chat-list/chat-list.component";
import { ChatMessengerComponent } from "./chat-messenger/chat-messenger.component";
import { ChatUserInfoComponent } from "./chat-user-info/chat-user-info.component";
import { SharedModule } from "src/app/shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { chatReducer } from "src/app/store/chat/chat.reducer";
import { EffectsModule } from "@ngrx/effects";
import { ChatEffects } from "src/app/store/chat/chat.effects";

@NgModule({
  declarations: [ChatComponent, ChatListComponent, ChatMessengerComponent, ChatUserInfoComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('chat', chatReducer),
    EffectsModule.forFeature(ChatEffects),

  ],
})
export class ChatModule {}
