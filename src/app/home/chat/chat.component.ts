import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChatService } from '../../chat.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  host: {
    '(document:click)': 'onClickScreen($event)'
  }
})
export class ChatComponent implements OnInit {

  public account;
  public popupImgSrc = 'assets/emoji.png';
  public message = '';
  public messages = [];
  public listusers = [];
  public connection;
  private isOpenpopup = document.getElementsByClassName('hidden');


  constructor(
    private chatService: ChatService,
  ) { }

  ngOnInit() {

    this.account = JSON.parse(localStorage.getItem('account'));

    this.getMessage();
    this.listOnlineUsers();
  }

  onClickScreen(event) {
    // case input
    // if (event.target.id === 'input') {
    //   alert(1);
    // }


    // case emoji
    if (event.target.id === 'popupsetup') {

      return (this.isOpenpopup.length > 0)
        ? this.openPopUpEmoji()
        : this.closePopUpEmoji()
    }

    else if (event.target.id !== 'popup') {
      document.getElementById('row-popup').classList.add('hidden');
      this.popupImgSrc = 'assets/emoji.png';
    }

  }

  openPopUpEmoji() {
    document.getElementById('row-popup').classList.remove('hidden');
    this.popupImgSrc = 'assets/smile_emoticons.png';
  }

  closePopUpEmoji() {
    document.getElementById('row-popup').classList.add('hidden');
    this.popupImgSrc = 'assets/emoji.png';
  }

  getMessage() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
    })
  }

  sendMessage() {
    try {
      this.formatStringToYahooIcon(this.message);
    }
    catch {
      this.message = '';
    }

    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  public emojis = [
    { code: ':(', codeReg: ':[(]', img: '2' },
    { code: ';)', codeReg: ';[)]', img: '3' },
    { code: ';;)', codeReg: ';;[)]', img: '5' },
    { code: ';))', codeReg: ';[)][)]', img: '71' },

    { code: ':D', codeReg: ':D', img: '4' },
    { code: ':P', codeReg: ':P', img: '10' },
    { code: ':-*', codeReg: ':-[*]', img: '11' },
    { code: '=((', codeReg: '=[(][(]', img: '12' },
    { code: ':-O~', codeReg: ':-O~', img: '61' },

    { code: ':-O', codeReg: ':-O', img: '13' },
    { code: '/:)', codeReg: '/:[)]', img: '23' },
    { code: ':))', codeReg: ':[)][)]', img: '21' },

    { code: ':)', codeReg: ':[)]', img: '1' },



    { code: ':|', codeReg: ':[|]', img: '22' },
    { code: '=;', codeReg: '=;', img: '27' },
    { code: '8-|', codeReg: '8-[|]', img: '29' },
    // { code: ':P', codeReg: ':P', img: '32' },
    { code: '[-(', codeReg: '[[]-[(]', img: '33' },
    { code: '=P~', codeReg: '=P~', img: '38' },
    { code: ':-?', codeReg: ':-[?]', img: '39' },
    // { code: '<):)', codeReg: '[<][)][:][)]', img: '48' },
    // { code: ':)', codeReg: ':[)]', img: '49' },
    // { code: ':)', codeReg: ':[)]', img: '50' },
    // { code: ':))', codeReg: ':[)][)]', img: '52' },
    // { code: ':)', codeReg: ':[)]', img: '53' },
    // { code: ':)', codeReg: ':[)]', img: '54' },
    // { code: ':))', codeReg: ':[)][)]', img: '56' },
    // { code: ':)', codeReg: ':[)]', img: '57' },
    // { code: '', codeReg: ':[)]', img: '59' },
    // { code: ':)', codeReg: ':[)]', img: '62' },
    // { code: ':))', codeReg: ':[)][)]', img: '72' },
    // { code: ':)', codeReg: ':[)]', img: '73' },
    // { code: ':)', codeReg: ':[)]', img: '74' },
    // { code: ':)', codeReg: ':[)]', img: '75' },
    { code: '(*)', codeReg: '[(][*][)]', img: '79' },
    // { code: '>:)', codeReg: '>:[)]', img: '25' },        
    // { code: ';;)', codeReg: ';;[)]', img: '5' },
    // { code: '=))', codeReg: '=[)][)]', img: '24' },
  ];

  formatStringToYahooIcon(message: string) {
    this.emojis.forEach(emoji => {
      if (message.indexOf(emoji.code) > -1) {
        message = message.replace(new RegExp(emoji.codeReg, 'g'), `<img src="assets/${emoji.img}.gif">`)
      }
    })

    this.message = message;
  }

  listOnlineUsers() {
    this.chatService.listOnlineUsersFromSoket().subscribe((data: any) => {
      this.listusers = data.filter(e => e !== this.account.nameAccount);
    });
  }

  chooseEmoji(imgemoji) {
    let emo = this.emojis.filter(em => {
      return em && em.img == imgemoji;
    })
    this.message = this.message + emo[0].code;
  }

}