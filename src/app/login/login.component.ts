import { UsersService } from './../users.service';
import { ChatService } from './../chat.service';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

    public subcribeRegisterSuccess;
    public subcribeRegisterFail;
    public arrPlaceholerName = ["Sói xám", "Cừu non", "Gà con", "Vịt bầu", "Thỏ nâu"];
    public currentShowText;

    public account;
    public nameAccount: string = '';
    constructor(
        private toastService: ToastrService,
        private router: Router,
        private chatService: ChatService,
        private userService: UsersService
    ) {
    }

    ngOnInit() {

        this.account = JSON.parse(localStorage.getItem('account'));
        if (this.account) {
            this.chatService.registerAUser(this.account.nameAccount );
        }

        this.checkRegisterSuccess();
        this.checRegisterFail();

        this.setNamePlaceholder();

    }

    checkRegisterSuccess() {
        this.subcribeRegisterSuccess = this.chatService.registerSuccess().subscribe(data => {
            this.toastService.success('Đăng nhập thành công !!!', '', {
                timeOut: 1000
            });
            localStorage.setItem('account', JSON.stringify({ nameAccount: data }));
            this.router.navigate(['dashboard/chat']);
        })
    }

    checRegisterFail() {
        this.subcribeRegisterFail = this.chatService.registerFail().subscribe((data) => {
            this.toastService.warning('Nickname ' + data + ' đang được người khác sử dụng !!! !!!', '', {
                timeOut: 2000
            });
        });
    }

    setNamePlaceholder() {
        let i = 1;
        let currentArrIndex = 0;
        this.addString(i, currentArrIndex);

    }

    addCurrentString;
    subCurrentString;
    addString(i, currentArrIndex) {
        this.addCurrentString = setInterval(() => {
            if (currentArrIndex === this.arrPlaceholerName.length) {
                currentArrIndex = 0;
            }
            this.currentShowText = this.arrPlaceholerName[currentArrIndex].substring(0, i);
            i++;
            if (this.currentShowText.length === this.arrPlaceholerName[currentArrIndex].length) {
                clearInterval(this.addCurrentString);
                this.subString(i, currentArrIndex);
            }
        }, 140);
    }

    subString(i, currentArrIndex) {
        this.subCurrentString = setInterval(() => {
            i--;
            this.currentShowText = this.currentShowText.substring(0, i);
            if (i == 0) {
                clearInterval(this.subCurrentString);
                this.addString(i, currentArrIndex + 1);
            }
        }, 140);
    }

    register() {

        if (this.nameAccount.length > 0) {
            // this.chatService.registerAUser(this.nameAccount);
            this.chatService.registerAUser(this.nameAccount);

            // this.userService.addUsersToOnline(this.nameAccount).subscribe(data => {
            // })
        }
        else {
            this.invalidName();
        }
    }

    invalidName() {
        this.toastService.error('Chưa điền nickname !', '', {
            timeOut: 2000
        });
    }

    // checkRegisterFail(): boolean {
    //     this.chatService.registerFail().subscribe(() => {
    //         this.toastService.error('Tên đã tồn tại !', '', {
    //             timeOut: 2000
    //         });

    //         return true;
    //     });
    //     return false;
    // }

    // checkRegisterSuccess() {
    //     this.subcribeRegisterSuccess = this.chatService.registerSuccess().subscribe((data) => {
    //         localStorage.setItem('account', JSON.stringify({ nameAccount: data }));
    //         this.toastService.success('Đăng nhập thành công !', '', {
    //             timeOut: 2000
    //         });
    //         // this.router.navigate(['/dashboard/chat']);
    //     });
    // }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
        this.subcribeRegisterSuccess.unsubscribe();
        this.subcribeRegisterFail.unsubscribe();
    }
}