import { ToastrService } from 'ngx-toastr';
import { ChatService } from './../chat.service';
import { Component, OnInit, OnDestroy, SystemJsNgModuleLoader, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'util';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
// import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

    public loadComplete = false;
    // public listmenu = [
    //     {
    //         name: 'Home',
    //         route: 'chat'
    //     },
    //     {
    //         name: 'Music',
    //         route: 'music'
    //     },
    //     {
    //         name: 'News',
    //         route: 'news'
    //     }
    // ];

    public popupImgSrc = 'assets/emoji.png';
    public account;
    private registerSuccess;
    private registerFail;

    constructor(
        private chatService: ChatService,
        private toastService: ToastrService,
        private router: Router) { }

    ngOnInit() {
        this.account = JSON.parse(localStorage.getItem('account'));
        this.chatService.reRegister(this.account);

        this.reRegisterSuccess();
        this.reRegisterFail();
    }

    reRegisterSuccess() {
        this.registerSuccess = this.chatService.reRegisterSuccess().subscribe((data) => {
            return this.toastService.success('Đăng nhập thành công  !!!');
        }).unsubscribe();
    }

    reRegisterFail() {
        this.registerFail = this.chatService.reRegisterFail().subscribe((data) => {
            localStorage.removeItem('account');
            return this.toastService.warning('Nickname ' + data + ' đang được người khác sử dụng !!!');
        }).unsubscribe();
    }

    logout() {
        localStorage.removeItem('account');

        this.router.navigate(['/login']);
        this.chatService.checkLogout();

    }

    ngAfterViewInit() {

    }

    ngOnDestroy() {
    }
}