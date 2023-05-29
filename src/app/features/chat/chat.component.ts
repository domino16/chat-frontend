import { Component, HostListener, OnInit } from "@angular/core";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  isOpenChat = false;
  isMobile = false;

  ngOnInit(): void {
    this.onResize();
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    window.innerWidth < 960 ? (this.isMobile = true) : (this.isMobile = false);
  }
}
