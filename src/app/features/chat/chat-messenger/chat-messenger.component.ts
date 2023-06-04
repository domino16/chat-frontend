import { Component} from "@angular/core";
import { RxStompService } from "src/app/core/services/rx-stomp.service";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Chat } from "src/app/core/interfaces/chat";
import { getSelectedChat, selectAllMessages } from "src/app/store/chat/chat.selectors";
import { Message } from "src/app/core/interfaces/message";
import { FormControl } from "@angular/forms";
import { sendMessage } from "src/app/store/chat/chat.actions";

@Component({
  selector: "app-chat-messenger",
  templateUrl: "./chat-messenger.component.html",
  styleUrls: ["./chat-messenger.component.scss"],
})
export class ChatMessengerComponent {
  sendMessageControl = new FormControl('');
  // receivedMessages: string[] = [];
  // private topicSubscription!: Subscription;
  selectedChat:Observable<Chat | null> = this.store.select(getSelectedChat);
  messages:Observable<Message[]> = this.store.select(selectAllMessages);

  constructor(private rxStompService: RxStompService, private store: Store) {}
  
 
  
  // ngOnInit() {
    // this.topicSubscription = this.rxStompService
    //   .watch('/user/messages')
    //   .subscribe((message: MessageStomp) => {
    //     this.receivedMessages.push(message.body);
    //   });
  // }

  
  // ngOnDestroy() {
  //   this.topicSubscription.unsubscribe();
  // }


  onSendMessage():void {
    if(!this.sendMessageControl.value) return
      this.store.dispatch(sendMessage({messageContent: this.sendMessageControl.value}));
      this.sendMessageControl.setValue('');
  }
}
