import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../../services/chat.service";

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.page.html',
  styleUrls: ['./chatlist.page.scss'],
})
export class ChatlistPage implements OnInit {
  chats: any[] = [];

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatService.chatList().subscribe(list => {
      if (list && list.status == "ok") {
        for (let item in list.data){
          this.chats.push(list.data[item])
        }
      }
    })
  }

  date2ago(date) {
    let seconds = Math.floor(((Date.now()/1000) - Date.parse(date)/1000)),
      interval = Math.floor(seconds / 31536000);

    if (interval > 1) return interval + "y";

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return interval + "m";

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + "d";

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + "h";

    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + "m ";

    return Math.floor(seconds) + "s";
  }

}
