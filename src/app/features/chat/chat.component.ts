import { Component, HostListener, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { AuthService } from "src/app/core/services/auth.service";
import { isSelectedChat } from "src/app/store/chat/chat.selectors";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  isOpenChat:Observable<boolean> = this.store.select(isSelectedChat);
  isMobile = false;
  topicSubscription!: Subscription;

  constructor( private store: Store, private authService: AuthService){}

  ngOnInit(): void {
    this.onResize();  
    this.authService.autoLogin()
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    window.innerWidth < 960 ? this.isMobile = true : this.isMobile = false;
  }
}
