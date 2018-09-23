import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChatService } from '../../chat.service';
import 'emojionearea/dist/emojionearea.min.js'


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  host: {
    '(document:click)': 'onClickScreen($event)'
  },
})
export class ChatComponent implements OnInit {

  public account;
  public popupImgSrc = 'assets/emoji.png';
  public message = '';
  public messages = [];
  public connection;
  private isOpenpopup = document.getElementsByClassName('hidden-emoji');
  private box = document.getElementsByClassName('box');

  // private listBoxMessage = [];

  constructor(
    private chatService: ChatService,
  ) { }

  ngOnInit() {

    this.account = JSON.parse(localStorage.getItem('account'));

    this.getMessage();
  }

  focusInput() {

    document.getElementById('textarea').classList.add('box');
  }

  focusOutInput() {
    document.getElementById('textarea').classList.remove('box');
  }

  onClickScreen(event) {
    if (event.target.id !== 'popup' && event.target.id !== 'popupsetup') {
      this.closePopUpEmoji();
    }
  }

  setupPopup() {
    return (this.isOpenpopup.length > 0)
      ? this.openPopUpEmoji()
      : this.closePopUpEmoji()
  }

  openPopUpEmoji() {
    document.getElementById('row-popup').classList.remove('hidden-emoji');
    this.popupImgSrc = 'assets/smile_emoticons.png';
  }

  closePopUpEmoji() {
    document.getElementById('row-popup').classList.add('hidden-emoji');
    this.popupImgSrc = 'assets/emoji.png';
  }

  getMessage() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
    })
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  public emojis = [
    { codePoint: '\u{1F642}', codeReg: ':)' },{ codePoint: '\u{1F603}', codeReg: ':D' },
    { codePoint: '\u{1F641}', codeReg: ':(' },{ codePoint: '\u{1F61B}', codeReg: ':P' },
    { codePoint: '\u{1F62E}', codeReg: ':O' },{ codePoint: '\u{1F610}', codeReg: ':|' },
    { codePoint: '\u{1F600}', codeReg: ':D' },{ codePoint: '\u{1F618}', codeReg: ':X' },
    { codePoint: '\u{1F602}' }, { codePoint: '\u{1F923}' },{ codePoint: '\u{1F604}' }, 
    { codePoint: '\u{1F605}' }, { codePoint: '\u{1F606}' },{ codePoint: '\u{1F607}' }, 
    { codePoint: '\u{1F608}' }, { codePoint: '\u{1F609}' },{ codePoint: '\u{1F611}' }, 
    { codePoint: '\u{1F612}' },{ codePoint: '\u{1F613}' }, { codePoint: '\u{1F614}' }, 
    { codePoint: '\u{1F615}' },{ codePoint: '\u{1F616}' }, { codePoint: '\u{1F617}' },
    { codePoint: '\u{1F619}'}, 
    // '\u{1F620}', '\u{1F621}', '\u{1F622}', '\u{1F623}',
    // '\u{1F624}', '\u{1F625}', '\u{1F626}', '\u{1F627}', '\u{1F628}', '\u{1F629}', '\u{1F630}', '\u{1F631}'
  ]

  addEmojiToInput(emoji) {
    this.message = this.message + emoji.codePoint;
  }

  private awaitReplaceEmoji = false;

  detectEmoji(value: any) {
    if (value.keyCode == 186) {
      this.awaitReplaceEmoji = true;
    }

    if (this.awaitReplaceEmoji) {
      this.formatEmoji();
    }

  }

  formatEmoji() {
    let i;
    for (i = 0; i < this.emojis.length; i++) {
      if (this.message.indexOf(this.emojis[i].codeReg) > -1) {
        this.message = this.message.replace(this.emojis[i].codeReg, this.emojis[i].codePoint);
        this.awaitReplaceEmoji = false;
        break;
      }
    }

  }

}

  // try {
    //   this.formatStringToYahooIcon(this.message);
    // }
    // catch {
    //   this.message = '';
    // }


  // public emojis = [
  //   '&#x1F600', '&#x1F602', '&#x1F923', '&#x1F603', '&#x1F604', '&#x1F605', '&#x1F606', '&#x1F607',
  //   '&#x1F608', '&#x1F609', '&#x1F610', '&#x1F611', '&#x1F612', '&#x1F613', '&#x1F614', '&#x1F615',
  //   '&#x1F616', '&#x1F617', '&#x1F618', '&#x1F619', '&#x1F620', '&#x1F621', '&#x1F622', '&#x1F623',
  //   '&#x1F624', '&#x1F625', '&#x1F626', '&#x1F627', '&#x1F628', '&#x1F629', '&#x1F630', '&#x1F631',
  //   '&#x1F632', '&#x1F633', '&#x1F634', '&#x1F635', '&#x1F636', '&#x1F637', '&#x1F638', '&#x1F639'
  // ]

  // public emojisYahoo = [
  //   { code: ':(', codeReg: ':[(]', img: '2' },
  //   { code: ';)', codeReg: ';[)]', img: '3' },
  //   { code: ';;)', codeReg: ';;[)]', img: '5' },
  //   { code: ';))', codeReg: ';[)][)]', img: '71' },

  //   { code: ':D', codeReg: ':D', img: '4' },
  //   { code: ':P', codeReg: ':P', img: '10' },
  //   { code: ':-*', codeReg: ':-[*]', img: '11' },
  //   { code: '=((', codeReg: '=[(][(]', img: '12' },
  //   { code: ':-O~', codeReg: ':-O~', img: '61' },

  //   { code: ':-O', codeReg: ':-O', img: '13' },
  //   { code: '/:)', codeReg: '/:[)]', img: '23' },
  //   { code: ':))', codeReg: ':[)][)]', img: '21' },

  //   { code: ':)', codeReg: ':[)]', img: '1' },
  //   { code: ':|', codeReg: ':[|]', img: '22' },
  //   { code: '=;', codeReg: '=;', img: '27' },
  //   { code: '8-|', codeReg: '8-[|]', img: '29' },
  //   { code: '[-(', codeReg: '[[]-[(]', img: '33' },
  //   { code: '=P~', codeReg: '=P~', img: '38' },
  //   { code: ':-?', codeReg: ':-[?]', img: '39' },
  //   { code: '(*)', codeReg: '[(][*][)]', img: '79' },
  // ];

  // formatStringToYahooIcon(message: string) {
  //   this.emojisYahoo.forEach(emoji => {
  //     if (message.indexOf(emoji.code) > -1) {
  //       message = message.replace(new RegExp(emoji.codeReg, 'g'), `<img src="assets/${emoji.img}.gif">`)
  //     }
  //   })

  //   this.message = message;
  // }

  // chooseEmojiYahoo(imgemoji) {
  //   let emo = this.emojisYahoo.filter(em => {
  //     return em && em.img == imgemoji;
  //   })
  //   this.message = this.message + emo[0].code;
  // }
