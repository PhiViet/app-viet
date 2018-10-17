import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
  public usersOnTyping;

  @ViewChild("inputmess") inputChat: ElementRef;

  constructor(
    private chatService: ChatService,
  ) { }

  ngOnInit() {

    this.account = JSON.parse(localStorage.getItem('account'));
    this.getMessage();
    this.onTyping();
    this.unTyping();

  }

  focusInput() {
    document.getElementById('textarea').classList.add('box');
  }

  focusOutInput() {
    document.getElementById('textarea').classList.remove('box');
    this.chatService.outTyping();

  }

  detectInputChange() {
    return (this.message.length > 0)
      ? this.chatService.inTyping(this.account)
      : this.chatService.outTyping();
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
    if(this.message != ''){
      this.chatService.sendMessage(this.message);
      this.message = '';
    }
  }

  public emojis = [
    { codePoint: '\u{1F642}', codeReg: ':)' }, { codePoint: '\u{1F603}', codeReg: ':D' },
    { codePoint: '\u{1F641}', codeReg: ':(' }, { codePoint: '\u{1F61B}', codeReg: ':P' },
    { codePoint: '\u{1F62E}', codeReg: ':O' }, { codePoint: '\u{1F610}', codeReg: ':|' },
    { codePoint: '\u{1F600}', codeReg: ':D' }, { codePoint: '\u{1F618}', codeReg: ':X' },
    { codePoint: '\u{1F602}' }, { codePoint: '\u{1F923}' }, { codePoint: '\u{1F604}' },
    { codePoint: '\u{1F605}' }, { codePoint: '\u{1F606}' }, { codePoint: '\u{1F607}' },
    { codePoint: '\u{1F608}' }, { codePoint: '\u{1F609}' }, { codePoint: '\u{1F611}' },
    { codePoint: '\u{1F612}' }, { codePoint: '\u{1F613}' }, { codePoint: '\u{1F614}' },
    { codePoint: '\u{1F615}' }, { codePoint: '\u{1F616}' }, { codePoint: '\u{1F617}' },
    { codePoint: '\u{1F619}' },
    // '\u{1F620}', '\u{1F621}', '\u{1F622}', '\u{1F623}',
    // '\u{1F624}', '\u{1F625}', '\u{1F626}', '\u{1F627}', '\u{1F628}', '\u{1F629}', '\u{1F630}', '\u{1F631}'
  ]

  addEmojiToInput(emoji) {
    // this.inputChat.nativeElement.focus();

    this.message = this.message + emoji.codePoint;
  }

  private awaitReplaceEmoji = false;

  detectInput(value: any) {

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

  onTyping() {
    this.chatService.onTyping().subscribe(username => {
      this.usersOnTyping = username;
    });
  }

  unTyping() {
    this.chatService.unTyping().subscribe(username => {
      this.usersOnTyping = null;
    })
  }
}