import { ChatService } from './../chat.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CurrencyIndex } from '@angular/common/src/i18n/locale_data';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
    public arrPlaceholerName = ["Sói xám", "Cừu non", "Gà con", "Vịt bầu", "Thỏ nâu"];
    public currentPlaceholerName;
    public currentShowText;

    public account;
    public nameAccount: string = '';
    constructor(
        private toastService: ToastrService,
        private router: Router,
        private chatService: ChatService) {

    }

    ngOnInit() {
        this.account = JSON.parse(localStorage.getItem('account'));
        if (this.account) {
            this.chatService.registerAUser(this.account.nameAccount);
        }

        this.setNamePlaceholder();
        this.checkRegisterSuccess();
        this.checkRegisterFail();
    }

    i: number = 0;
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
            this.chatService.registerAUser(this.nameAccount);
        }
        else {
            this.invalidName();
        }
        // return (this.nameAccount.length > 0)
        //     //register success
        //     ? this.chatService.registerAUser(this.nameAccount)
        //     // register fail
        //     : this.invalidName();

    }

    invalidName() {
        this.toastService.error('Chưa điền nickname !', '', {
            timeOut: 2000
        });
    }

    checkRegisterFail(): boolean {
        this.chatService.registerFail().subscribe(() => {
            this.toastService.error('Tên đã tồn tại !', '', {
                timeOut: 2000
            });

            return true;
        });
        return false;
    }

    checkRegisterSuccess() {
        this.chatService.registerSuccess().subscribe((data) => {
            this.toastService.success('Đăng nhập thành công !', '', {
                timeOut: 2000
            });
            localStorage.setItem('account', JSON.stringify({ nameAccount: data }));
            this.router.navigate(['/home']);
        });
    }
}