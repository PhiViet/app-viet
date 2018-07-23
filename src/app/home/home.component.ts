import { ToastrService } from 'ngx-toastr';
import { ChatService } from './../chat.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'util';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-ho',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

    // test = '<img src="assets/1.gif" alt="">';
    public popupImgSrc = 'assets/emoji.png';
    public account;
    public message = '';
    public messages = [];
    public listusers = [];
    public connection;
    constructor(
        private titleService: Title,
        private chatService: ChatService,
        private toastService: ToastrService,
        private router: Router) { }

    ngOnInit() {
        this.account = JSON.parse(localStorage.getItem('account'));
        if (this.account.nameAccount) {
            this.titleService.setTitle(this.account.nameAccount);
        }
        this.getMessage();
        this.listOnlineUsers();
        // 
        this.checkExistedAccount();
        this.emojis.sort();
    }

    popupSetUp() {
        var popup = document.getElementById("popupsetup");
        var isOpenpopup = document.getElementsByClassName('hidden');
        if (isOpenpopup.length > 0) {
            document.getElementById('row-popup').classList.remove('hidden');
            this.popupImgSrc = 'assets/smile_emoticons.png';
        }
        else {
            document.getElementById('row-popup').classList.add('hidden');
            this.popupImgSrc = 'assets/emoji.png';
        }
    }

    focusEmojiPopup() {
        document.getElementById('row-popup').classList.add('hidden');
        this.popupImgSrc = 'assets/emoji.png';
        alert(1);
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

    /*
     <!-- <img src="assets/1.gif">
                        <img src="assets/2.gif">
                        <img src="assets/3.gif">
                        <img src="assets/4.gif">
                        <img src="assets/5.gif">
                        <img src="assets/10.gif">
                        <img src="assets/11.gif">
                        <img src="assets/12.gif">
                        <img src="assets/13.gif">
                        <img src="assets/15.gif">
                        <img src="assets/16.gif">
                        <img src="assets/17.gif">
                        <img src="assets/19.gif">
                        <img src="assets/21.gif">
                        <img src="assets/22.gif">
                        <img src="assets/23.gif">
                        <img src="assets/27.gif">
                        <img src="assets/29.gif">
                        <img src="assets/32.gif">
                        <img src="assets/33.gif">
                        <img src="assets/38.gif">
                        <img src="assets/39.gif">
                        <img src="assets/48.gif">
                        <img src="assets/49.gif">
                        <img src="assets/50.gif">
                        <img src="assets/52.gif">
                        <img src="assets/53.gif">
                        <img src="assets/54.gif">
                        <img src="assets/56.gif">
                        <img src="assets/57.gif">
                        <img src="assets/59.gif">
                        <img src="assets/61.gif">
                        <img src="assets/62.gif">
                        <img src="assets/71.gif">
                        <img src="assets/72.gif">
                        <img src="assets/73.gif">
                        <img src="assets/74.gif">
                        <img src="assets/75.gif">
                        <img src="assets/79.gif"> -->
    */
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

    getMessage() {
        this.connection = this.chatService.getMessages().subscribe(message => {
            this.messages.push(message);
        })
    }

    logout() {
        localStorage.removeItem('account');
        // location.reload();

        this.router.navigate(['/login']);
        this.chatService.checkLogout();

    }

    listOnlineUsers() {
        this.chatService.listOnlineUsersFromSoket().subscribe((data: any) => {
            this.listusers = data.filter(e => e !== this.account.nameAccount);
            // this.listusers = data;
        });
    }

    checkExistedAccount(): boolean {
        this.chatService.registerFail().subscribe(() => {
            this.toastService.error('Tên đã được người khác sử dụng !', '', {
                timeOut: 2000
            });
            localStorage.removeItem('account');
            this.router.navigate(['/login']);
            return true;
        });
        return false;
    }

    chooseEmoji(imgemoji) {
        let emo = this.emojis.filter(em => {
            return em && em.img == imgemoji;
        })
        this.message = this.message + emo[0].code;
    }
    ngOnDestroy() {
        // this.connection.unsubscribe();
    }
}

 // { code: ':[((]', img: '19.gif' }, { code: ':[))]', img: '20.gif' }, { code: ':[)]', img: '21.gif' },
        // { code: ':[(]', img: '1.gif' }, { code: ';[)]', img: '2.gif' }, { code: '>:D<', img: '3.gif' },
        // { code: ':x', img: '6.gif' }, { code: ':">', img: '4.gif' }, { code: ':P', img: '7.gif' },
        // { code: ':-*', img: '8.gif' }, { code: '=[((]', img: '9.gif' }, { code: ':-O', img: '10.gif' },
        // { code: 'X[(]', img: '11.gif' }, { code: ':>', img: '12.gif' }, { code: 'B-[)]', img: '13.gif' },
        // { code: '#:-S', img: '14.gif' }, { code: ':|', img: '15.gif' }, { code: ':-S', img: '16.gif' },
        // { code: ':|', img: '18.gif' }, { code: 'O:-[)]', img: '17.gif' }, { code: ':-B', img: '22.gif' },
        // { code: '8-|', img: '25.gif' }, { code: 'L-[)]', img: '26.gif' }, { code: ':-&', img: '27.gif' },
        // { code: ':-$', img: '28' }, { code: '[-[(]', img: '29.gif' }, { code: ':O[)]', img: '30.gif' },
        // { code: '8-}', img: '31.gif' }, { code: '<:-P', img: '32.gif' }, 
        // { code: ':-[)]|', img: '33.gif' },
        // { code: '=P~', img: '34.gif' }, { code: ':-?', img: '35.gif' }, { code: '#-o', img: '36.gif' },
        // { code: '=D>', img: '' }, { code: ':-SS[)]', img: '37.gif' },




  // .replace(new RegExp(this.emojis[1].code, 'g'), ' <img src="assets/23.gif">')
        // .replace(new RegExp(this.emojis[2].code, 'g'), ' <img src="assets/24.gif">')
        // .replace(new RegExp(this.emojis[3].code, 'g'), ' <img src="assets/19.gif">')
        // .replace(new RegExp(this.emojis[4].code, 'g'), ' <img src="assets/20.gif">')
        // .replace(new RegExp(this.emojis[5].code, 'g'), ' <img src="assets/21.gif">')
        // .replace(new RegExp(this.emojis[6].code, 'g'), ' <img src="assets/1.gif">')
        // .replace(new RegExp(this.emojis[7].code, 'g'), ' <img src="assets/2.gif">')
        // .replace(new RegExp(this.emojis[8].code, 'g'), ' <img src="assets/3.gif">')
        // .replace(new RegExp(this.emojis[9].code, 'g'), ' <img src="assets/6.gif">')
        // .replace(new RegExp(this.emojis[10].code, 'g'), ' <img src="assets/4.gif">')
        // .replace(new RegExp(this.emojis[11].code, 'g'), ' <img src="assets/7.gif">')
        // .replace(new RegExp(this.emojis[12].code, 'g'), ' <img src="assets/8.gif">')
        // .replace(new RegExp(this.emojis[13].code, 'g'), ' <img src="assets/9.gif">')
        // .replace(new RegExp(this.emojis[14].code, 'g'), ' <img src="assets/10.gif">')
        // .replace(new RegExp(this.emojis[15].code, 'g'), ' <img src="assets/11.gif">')
        // .replace(new RegExp(this.emojis[16].code, 'g'), ' <img src="assets/12.gif">')
        // .replace(new RegExp(this.emojis[17].code, 'g'), ' <img src="assets/13.gif">')
        // .replace(new RegExp(this.emojis[18].code, 'g'), ' <img src="assets/14.gif">')
        // .replace(new RegExp(this.emojis[19].code, 'g'), ' <img src="assets/15.gif">')
        // .replace(new RegExp(this.emojis[20].code, 'g'), ' <img src="assets/16.gif">')
        // .replace(new RegExp(this.emojis[21].code, 'g'), ' <img src="assets/18.gif">')
        // .replace(new RegExp(this.emojis[22].code, 'g'), ' <img src="assets/17.gif">')
        // .replace(new RegExp(this.emojis[23].code, 'g'), ' <img src="assets/22.gif">')
        // .replace(new RegExp(this.emojis[24].code, 'g'), ' <img src="assets/25.gif">')
        // .replace(new RegExp(this.emojis[25].code, 'g'), ' <img src="assets/26.gif">')
        // .replace(new RegExp(this.emojis[26].code, 'g'), ' <img src="assets/27.gif">')
        // .replace(new RegExp(this.emojis[27].code, 'g'), ' <img src="assets/28.gif">')
        // .replace(new RegExp(this.emojis[28].code, 'g'), ' <img src="assets/29.gif">')
        // .replace(new RegExp(this.emojis[29].code, 'g'), ' <img src="assets/30.gif">')
        // .replace(new RegExp(this.emojis[30].code, 'g'), ' <img src="assets/31.gif">')
        // .replace(new RegExp(this.emojis[31].code, 'g'), ' <img src="assets/32.gif">')
        // .replace(new RegExp(this.emojis[32].code, 'g'), ' <img src="assets/33.gif">')
        // .replace(new RegExp(this.emojis[33].code, 'g'), ' <img src="assets/34.gif">')
        // .replace(new RegExp(this.emojis[34].code, 'g'), ' <img src="assets/35.gif">')
        // .replace(new RegExp(this.emojis[35].code, 'g'), ' <img src="assets/36.gif">')
        // .replace(new RegExp(this.emojis[36].code, 'g'), ' <img src="assets/37.gif">')
        // .replace(new RegExp(this.emojis[37].code, 'g'), ' <img src="assets/38.gif">')
        // .replace(new RegExp(this.emojis[38].code, 'g'), ' <img src="assets/39.gif">')
        // .replace(new RegExp(this.emojis[39].code, 'g'), ' <img src="assets/40.gif">')
        // .replace(new RegExp(this.emojis[40].code, 'g'), ' <img src="assets/41.gif">')
        // .replace(new RegExp(this.emojis[41].code, 'g'), ' <img src="assets/42.gif">')
        // .replace(new RegExp(this.emojis[42].code, 'g'), ' <img src="assets/54.gif">')
        // .replace(new RegExp(this.emojis[43].code, 'g'), ' <img src="assets/55.gif">')
        // .replace(new RegExp(this.emojis[44].code, 'g'), ' <img src="assets/56.gif">')
        // .replace(new RegExp(this.emojis[45].code, 'g'), ' <img src="assets/57.gif">')
        // .replace(new RegExp(this.emojis[46].code, 'g'), ' <img src="assets/58.gif">')
        // .replace(new RegExp(this.emojis[7].code, 'g'), ' <img src="assets/59.gif">')
        // .replace(new RegExp(this.emojis[7].code, 'g'), ' <img src="assets/60.gif">')
        // .replace('>-)', ' <img src="assets/61.gif">')
        // .replace(':-L', ' <img src="assets/62.gif">')
        // .replace('[-O<', ' <img src="assets/63.gif">')
        // .replace('$-)', ' <img src="assets/54.gif">')
        // .replace(':-"', ' <img src="assets/55.gif">')
        // .replace('b-(', ' <img src="assets/56.gif">')
        // .replace(':)>-', ' <img src="assets/57.gif">')
        // .replace('[-X', ' <img src="assets/58.gif">')
        // .replace('\:D/', ' <img src="assets/59.gif">')
        // .replace('>:/', ' <img src="assets/60.gif">')
        // .replace(':(', ' <img src="assets/62.gif"  >')
        // .replace(';)', ' <img src="assets/63.gif"  >')
        // .replace(':(', ' <img src="assets/64.gif"  >')
        // .replace(':(', ' <img src="assets/65.gif"  >')
        // .replace(':(', ' <img src="assets/66.gif"  >')
        // .replace(':(', ' <img src="assets/67.gif"  >')
        // .replace(':(', ' <img src="assets/68.gif"  >')
        // .replace(':(', ' <img src="assets/69.gif"  >')
        // .replace(':(', ' <img src="assets/70.gif"  >')
        // .replace(';)', ' <img src="assets/71.gif"  >')
        // .replace(':(', ' <img src="assets/72.gif"  >')
        // .replace(';)', ' <img src="assets/73.gif"  >')
        // .replace(':(', ' <img src="assets/74.gif"  >')
        // .replace(';)', ' <img src="assets/75.gif"  >')
        // .replace(':(', ' <img src="assets/76.gif"  >')
        // .replace(';)', ' <img src="assets/77.gif"  >')
        // .replace(':(', ' <i  mg src="assets/78.gif"  >')
        // .replace(';)', ' <img src="assets/79.gif"  >')