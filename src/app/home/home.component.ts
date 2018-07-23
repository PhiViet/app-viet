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
    public listmenu = [
        {
            name: 'Home',
            route: '/home'
        },
        {
            name: 'Music',
            route: '/music'
        },
        {
            name: 'News',
            route: '/news'
        }
    ];
    public popupImgSrc = 'assets/emoji.png';
    public account;
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
        this.checkExistedAccount();
    }

    logout() {
        localStorage.removeItem('account');

        this.router.navigate(['/login']);
        this.chatService.checkLogout();

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
    }
}