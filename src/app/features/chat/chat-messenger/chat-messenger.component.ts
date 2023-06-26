import {  Component, EventEmitter, Output} from "@angular/core";
import { Observable} from "rxjs";
import { Store } from "@ngrx/store";
import { Chat } from "src/app/core/interfaces/chat";
import { getSelectedChat, isMessagesLoaded, isMoreMesssageLoading, selectAllMessages } from "src/app/store/chat/chat.selectors";
import { Message } from "src/app/core/interfaces/message";
import { FormControl } from "@angular/forms";
import { incrementMessagesLimit, selectChat, sendMessage } from "src/app/store/chat/chat.actions";

@Component({
  selector: "app-chat-messenger",
  templateUrl: "./chat-messenger.component.html",
  styleUrls: ["./chat-messenger.component.scss"],
})
export class ChatMessengerComponent  {
  sendMessageControl = new FormControl('');
  selectedChat:Observable<Chat | null> = this.store.select(getSelectedChat);
  messages:Observable<Message[]> = this.store.select(selectAllMessages);
  isMessagesLoaded:Observable<boolean> = this.store.select(isMessagesLoaded);
  isMoreMessagesLoading:Observable<boolean> = this.store.select(isMoreMesssageLoading)

//toggle open/close right box with user information
  @Output() toggle = new EventEmitter();

  constructor(private store: Store) {}

// load more messages when user scroll messages box in 95% 
  onScroll(e: Event) {
    this.store.select(isMessagesLoaded).subscribe((isLoaded) => {
      if(isLoaded) return 
    })
    const { scrollHeight, scrollTop, clientHeight } = e.target as Element;
    const scroll = scrollHeight - scrollTop - clientHeight;
    if (scroll > (scrollHeight - clientHeight ) * 1.95) {
        this.store.dispatch(incrementMessagesLimit())
        
    }
  }

  onThreeDotClick():void{
    this.toggle.emit()
  }

  onSendMessage():void {
    if(!this.sendMessageControl.value) return
      this.store.dispatch(sendMessage({messageContent: this.sendMessageControl.value}));
      this.sendMessageControl.setValue('');
  }

  onArrowClick(){
    this.store.dispatch(selectChat({selectedChat:null}))
  }
}
