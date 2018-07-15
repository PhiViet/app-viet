import { ToastrService } from 'ngx-toastr';
import { ChatService } from './../chat.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-ho',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

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
        // this.checkRegisterSuccess();
    }

    sendMessage() {
        this.chatService.sendMessage(this.message);
        this.message = '';
    }

    getMessage() {
        this.connection = this.chatService.getMessages().subscribe(message => {
            this.messages.push(message);
        })
    }

    logout() {
        localStorage.removeItem('account');
        location.reload();
        this.router.navigate(['/login']);
    }

    listOnlineUsers() {
        this.chatService.listOnlineUsers().subscribe((data: any) => {
            // this.listusers = data;
            this.listusers = data.filter(e => e !== this.account.nameAccount);
            // this.listusers = data;
        });
    }

    checkRegisterSuccess() {
        this.chatService.registerSuccess().subscribe((data) => {
            this.toastService.success('Đăng nhập thành công !', '', {
                timeOut: 2000
            });
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

    ngOnDestroy() {
        this.connection.unsubscribe();
    }
}