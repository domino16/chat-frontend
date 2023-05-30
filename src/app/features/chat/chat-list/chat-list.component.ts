import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Store } from "@ngrx/store";
import { Observable, debounceTime, switchMap } from "rxjs";
import { Chat } from "src/app/core/interfaces/chat";
import { User } from "src/app/core/interfaces/user";
import { ChatService } from "src/app/core/services/chat.service";
import { UserService } from "src/app/core/services/user.service";
import { selectAllChats } from "src/app/store/chat/chat.selectors";

@Component({
  selector: "app-chat-list",
  templateUrl: "./chat-list.component.html",
  styleUrls: ["./chat-list.component.scss"],
})
export class ChatListComponent { 

  // true when divide line is visible
  showLine = false;

  // fontawesome icon
  faSearch = faSearch;

  // users search control
  searchControl: FormControl = new FormControl("");

  // users displayed in search field
  filteredAllUsers$: Observable<User[]> = this.searchControl.valueChanges.pipe(debounceTime(300),
    switchMap((value) => {
      return this.userService.searchUsersByLetter(value);
    }),
  );

// take list of chats
  userChats$:Observable<Chat[]> = this.store.select(selectAllChats)

  constructor(private userService: UserService, private chatService: ChatService, private store: Store) {}

  onUserSelect(recipientId: string, recipientName: string) {
    this.chatService.getOrCreateChat(recipientId, recipientName).subscribe();
  }

  onScroll(e: Event) {
    const scrolledPixels = (e.target as Element).scrollTop;
    scrolledPixels > 0 ? (this.showLine = true) : (this.showLine = false);
  }

}
