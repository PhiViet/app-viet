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
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

    public loadComplete = false;
    public listmenu = [
        {
            name: 'Home',
            route: 'chat'
        },
        {
            name: 'Music',
            route: 'music'
        },
        {
            name: 'News',
            route: 'news'
        }
    ];
    
    public popupImgSrc = 'assets/emoji.png';
    public account;
    constructor(
        private chatService: ChatService,
        private toastService: ToastrService,
        private router: Router) { }

    ngOnInit() {
        this.account = JSON.parse(localStorage.getItem('account'));
        

        // this.checkExistedAccount();
    }

    logout() {
        localStorage.removeItem('account');

        this.router.navigate(['/login']);
        this.chatService.checkLogout();

    }

    // checkExistedAccount(): boolean {
    //     this.chatService.registerFail().subscribe(() => {
    //         this.toastService.error('Tên đã được người khác sử dụng !', '', {
    //             timeOut: 2000
    //         });
    //         localStorage.removeItem('account');
    //         this.router.navigate(['/login']);
    //         return true;
    //     });
    //     return false;
    // }

    ngAfterViewInit() {
       
    }

    ngOnDestroy() {
    }
}