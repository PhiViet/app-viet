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
  public listBoxMessage:IUser[] = [];
  public listusers: IUser[] = [];

  public messages = [];
  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.account = JSON.parse(localStorage.getItem('account'));
    this.listUserOnline();
    this.chatService.getMessageToUser().subscribe((data:IUser) => {
        this.TakeAMessage(data);
      this.messages.push(data);

    });
  }

  listUserOnline() {
    this.chatService.listUserOnline().subscribe((data: IUser[]) => {
      this.listusers = data.filter(e => e.username !== this.account.nameAccount);
    });
  }

  TakeAMessage(user:IUser) {
    if (this.listBoxMessage.findIndex(e => e.username === user.username) == -1) {
      this.listBoxMessage.unshift({
        socketid: user.socketid,
        username: user.username,
        message: ''
      });
    }
  }

  closeBox(name) {
    this.listBoxMessage = this.listBoxMessage.filter(e => {
      return e.username !== name
    });
  }

  sendMessage(user) {
    let data = Object.assign({},user);
    data.from = this.account;
    
    if (user.message != '') {
      this.messages.push(data);
      
      this.listBoxMessage.filter(e => {
        e.username === name;
        e.message = '';
      });

      this.chatService.sendMessageToUser(data);
    }
  }
}
