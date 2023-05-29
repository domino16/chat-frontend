import { Component } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  // true, when menu is open
  isMenuActive = false;

  // true, when page is scrolled
  isScrolled = false;

  onScroll() {
    window.scrollY > 40 ? (this.isScrolled = true) : (this.isScrolled = false);
  }
}
