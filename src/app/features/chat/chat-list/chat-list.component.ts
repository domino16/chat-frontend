import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Observable, switchMap } from "rxjs";
import { User } from "src/app/core/interfaces/user";
import { ChatService } from "src/app/core/services/chat.service";
import { UserService } from "src/app/core/services/user.service";

@Component({
  selector: "app-chat-list",
  templateUrl: "./chat-list.component.html",
  styleUrls: ["./chat-list.component.scss"],
})
export class ChatListComponent {
  faSearch = faSearch;
  searchControl: FormControl = new FormControl("");
  users: User[] = [];
  filteredAllUsers$: Observable<User[]> = this.searchControl.valueChanges.pipe(
    switchMap((value) => {
      return this.userService.searchUsersByLetter(value);
    }),
  );
  showLine = false;

  constructor(private userService: UserService, private chatService: ChatService) {}

  onUserSelect(recipientId: string, recipientName: string) {
    this.chatService.getOrCreateChat(recipientId, recipientName).subscribe();
  }

  onScroll(e: Event) {
    const scrolledPixels = (e.target as Element).scrollTop;
    scrolledPixels > 0 ? (this.showLine = true) : (this.showLine = false);
  }
}
