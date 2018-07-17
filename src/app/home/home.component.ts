import { ToastrService } from 'ngx-toastr';
import { ChatService } from './../chat.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'util';

@Component({
    selector: 'app-ho',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

    // test = '<img src="assets/1.gif" alt="">';
    public account;
    public message;
    public messages = [];
    public listusers = [];
    public connection;
    constructor(
        private chatService: ChatService,
        private toastService: ToastrService,
        private router: Router) { }

    ngOnInit() {
        this.account = JSON.parse(localStorage.getItem('account'));
        this.getMessage();
        this.listOnlineUsers();
        // 
        this.checkRegisterSuccess();
    }

    sendMessage() {
        this.message = this.formatStringToYahooIcon(this.message);
        this.chatService.sendMessage(this.message);
        // this.messages.push()
        this.message = '';

        let divMessContent = document.getElementById('content-mess');
        divMessContent.scrollTop = divMessContent.scrollHeight;
    }

    filterStringToYahooIcon(message) {
        this.message = this.formatStringToYahooIcon(message);
    }

    formatStringToYahooIcon(message) {
        return message
            // .replace(';))', ' <img src="assets/61.gif"  >')
            .replace(';;)', ' <img src="assets/5.gif"')
            .replace('/:)', ' <img src="assets/23.gif"')
            .replace('=))', ' <img src="assets/24.gif"')
            .replace('>:)', ' <img src="assets/19.gif"')
            .replace(':((', ' <img src="assets/20.gif"')
            .replace(':))', ' <img src="assets/21.gif"')
            .replace(':)', ' <img src="assets/1.gif">')
            .replace(':(', ' <img src="assets/2.gif">')
            .replace(';)', ' <img src="assets/3.gif">')
            .replace('>:D<', ' <img src="assets/6.gif">')
            .replace(':D', ' <img src="assets/4.gif">')
            .replace(':-/', ' <img src="assets/7.gif">')
            .replace(':x', ' <img src="assets/8.gif">')
            .replace(':">', ' <img src="assets/9.gif">')
            .replace(':P', ' <img src="assets/10.gif">')
            .replace(':-*', ' <img src="assets/11.gif">')
            .replace('=((', ' <img src="assets/12.gif">')
            .replace(':-O', ' <img src="assets/13.gif">')
            .replace('X(', ' <img src="assets/14.gif">')
            .replace(':>', ' <img src="assets/15.gif">')
            .replace('B-)', ' <img src="assets/16.gif">')
            .replace('#:-S', ' <img src="assets/18.gif">')
            .replace(':-S', ' <img src="assets/17.gif">')
            .replace(':|', ' <img src="assets/22.gif">')
            .replace('O:-)', ' <img src="assets/25.gif">')
            .replace(':-B', ' <img src="assets/26.gif">')
            .replace('=;', ' <img src="assets/27.gif">')
            .replace('I-)', ' <img src="assets/28.gif">')
            .replace('8-|', ' <img src="assets/29.gif">')
            .replace('L-)', ' <img src="assets/30.gif">')
            .replace(':-&', ' <img src="assets/31.gif">')
            .replace(':-$', ' <img src="assets/32.gif">')
            .replace('[-(', ' <img src="assets/33.gif">')
            .replace(':O)', ' <img src="assets/34.gif">')
            .replace('8-}', ' <img src="assets/35.gif">')
            .replace('<:-P', ' <img src="assets/36.gif">')
            .replace(':-)|', ' <img src="assets/37.gif">')
            .replace('=P~', ' <img src="assets/38.gif">')
            .replace(':-?', ' <img src="assets/39.gif">')
            .replace('#-o', ' <img src="assets/40.gif">')
            .replace('=D>', ' <img src="assets/41.gif">')
            .replace(':-SS)', ' <img src="assets/42.gif">')
            .replace('@-)', ' <img src="assets/43.gif">')
            .replace(':^o', ' <img src="assets/44.gif">')
            .replace(':-w', ' <img src="assets/45.gif">')
            .replace(':-<', ' <img src="assets/46.gif">')
            .replace('>:P', ' <img src="assets/47.gif">')
            .replace('<):)', ' <img src="assets/48.gif">')
            .replace(':@)', ' <img src="assets/49.gif">')
            .replace('3:-O', ' <img src="assets/50.gif">')
            .replace(':(\)', ' <img src="assets/51.gif">')
            .replace('~:>)', ' <img src="assets/52.gif">')
            .replace('@};-', ' <img src="assets/53.gif">')
            .replace('%%-', ' <img src="assets/54.gif">')
            .replace('**==', ' <img src="assets/55.gif">')
            .replace('(~~)', ' <img src="assets/56.gif">')
            .replace('~O)', ' <img src="assets/57.gif">')
            .replace('*-:)', ' <img src="assets/58.gif">')
            .replace('8-X', ' <img src="assets/59.gif">')
            .replace('=:)', ' <img src="assets/60.gif">')
            .replace('>-)', ' <img src="assets/61.gif">')
            .replace(':-L', ' <img src="assets/62.gif">')
            .replace('[-O<', ' <img src="assets/63.gif">')
            .replace('$-)', ' <img src="assets/54.gif">')
            .replace(':-"', ' <img src="assets/55.gif">')
            .replace('b-(', ' <img src="assets/56.gif">')
            .replace(':)>-', ' <img src="assets/57.gif">')
            .replace('[-X', ' <img src="assets/58.gif">')
            .replace('\:D/', ' <img src="assets/59.gif">')
            .replace('>:/', ' <img src="assets/60.gif">')
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
        // .replace(':(', ' <img src="assets/78.gif"  >')
        // .replace(';)', ' <img src="assets/79.gif"  >')

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
            // this.listusers = data;
            this.listusers = data.filter(e => e !== this.account.nameAccount);
            // this.listusers = data;
        });
    }

    checkRegisterSuccess() {
        // this.chatService.registerSuccess().subscribe((data) => {
        //     this.toastService.success('Đăng nhập thành công !', '', {
        //         timeOut: 2000
        //     });
        // });
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

    ngOnDestroy() {
        // this.connection.unsubscribe();
    }
}