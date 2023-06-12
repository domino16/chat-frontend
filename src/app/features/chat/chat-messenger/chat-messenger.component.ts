import { Component} from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Chat } from "src/app/core/interfaces/chat";
import { getSelectedChat, isMessagesLoaded, selectAllMessages } from "src/app/store/chat/chat.selectors";
import { Message } from "src/app/core/interfaces/message";
import { FormControl } from "@angular/forms";
import { selectChat, sendMessage } from "src/app/store/chat/chat.actions";

@Component({
  selector: "app-chat-messenger",
  templateUrl: "./chat-messenger.component.html",
  styleUrls: ["./chat-messenger.component.scss"],
})
export class ChatMessengerComponent {
  sendMessageControl = new FormControl('');
  selectedChat:Observable<Chat | null> = this.store.select(getSelectedChat);
  messages:Observable<Message[]> = this.store.select(selectAllMessages);
  isMessagesLoaded:Observable<boolean> = this.store.select(isMessagesLoaded)

  constructor(private store: Store) {}
  

  // const handleScroll = (event) => {
  //   const { scrollHeight, scrollTop, clientHeight } = event.target;
  //   const scroll = scrollHeight - scrollTop - clientHeight;
  //   if (scroll > (scrollHeight - clientHeight) * 0.95) {
  //       setMessageLimit(messageLimit+10);
  //   }

//   const scrollToBottom = () => {
//     messageBoxRef.current?.scrollIntoView({behavior: "smooth"});
// };

  onSendMessage():void {
    if(!this.sendMessageControl.value) return
      this.store.dispatch(sendMessage({messageContent: this.sendMessageControl.value}));
      this.sendMessageControl.setValue('');
  }

  onArrowClick(){
    this.store.dispatch(selectChat({selectedChat:null}))
  }
}
