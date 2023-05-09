import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent {
  faSearch = faSearch;
  searchControl: FormControl = new FormControl('');
  users: string[] = ['One', 'Two', 'Three'];
  showLine: boolean = false;


onScroll(e:Event){
  const scrolledPixels = (e.target as Element).scrollTop
  scrolledPixels > 0 ? this.showLine = true : this.showLine = false;
}



}