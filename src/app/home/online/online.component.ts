import { ChatService } from './../../chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.scss']
})
export class OnlineComponent implements OnInit {

  private account;
  public listBoxMessage = [];
  public listusers = [];
  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.account = JSON.parse(localStorage.getItem('account'));

    this.listUserOnline();
    // this.listOnlineUsers();
  }

  // listOnlineUsers() {
  //   this.chatService.listOnlineUsersFromSoket().subscribe((data: any) => {
  //     this.listusers = data.filter(e => e !== this.account.nameAccount);
  //   });
  // }

  listUserOnline() {
    this.chatService.addAUserToListOnline();
    this.chatService.listUserOnline().subscribe((data: any) => {
      this.listusers = data.filter(e=> e!== this.account.nameAccount);
    });
  }

  TakeAMessage(name) {
    if (this.listBoxMessage.findIndex(e => e.name === name) == -1) {
      this.listBoxMessage.unshift({
        name: name
      });
    }
  }

  closeBox(name) {
    this.listBoxMessage = this.listBoxMessage.filter(e => {
      return e.name !== name
    });
  }

  sendMessage() {

  }
}
