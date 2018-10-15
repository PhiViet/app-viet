import { ChatService } from './../../chat.service';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../../IUser';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.scss']
})
export class OnlineComponent implements OnInit {

  private account;
  public listBoxMessage = [];
  public listusers: IUser[] = [];
  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.account = JSON.parse(localStorage.getItem('account'));
    this.listUserOnline();
  }

  listUserOnline() {
    // this.chatService.addAUserToListOnline();
    this.chatService.listUserOnline().subscribe((data: IUser[]) => {
      this.listusers = data.filter(e => e.username !== this.account.nameAccount);
    });
  }

  TakeAMessage(user) {
    if (this.listBoxMessage.findIndex(e => e.name === user.username) == -1) {
      this.listBoxMessage.unshift({
        name: user.username
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
