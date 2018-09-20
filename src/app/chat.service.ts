import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { Router } from '../../node_modules/@angular/router';

@Injectable()
export class ChatService {

    // private dataonl;
    private socket;
    private username;

    // private url = 'https://app-vietchat.herokuapp.com';
    private url = 'http://localhost:8080';
    constructor(private router: Router,) {
        this.socket = io(this.url);
        // this.listOnlineUsersFromSoket().subscribe(data => {
        //         // this.dataonl = data;
        //         console.log('vo');
        // });
    }

    registerAUser(username: String) {
        return this.socket.emit('register-a-user', username);
    }

    registerSuccess(){
        let observableUsername = new Observable(observer => {
            this.socket.on('register-success', (username) => {
                console.log('dang ki thanh cong');
                this.username = username;
                observer.next(username);
            });
        });

        return observableUsername;
    }

    addAUserToListOnline(){
        // if(this.username != null){
            // console.log('vao');
            this.socket.emit('add-user');
        // }
    }

    listUserOnline(){
        let obsListOnline = new Observable(observer => {
            this.socket.on('list-online',(listOnline) => {
                observer.next(listOnline);
            })
        })
        return obsListOnline;
    }

    sendMessage(message) {
        this.socket.emit("client-send-message", message);
    }

    getMessages() {
        let observable = new Observable(observer => {
            this.socket.on('server-send-message', (data) => {
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            }

        });

        return observable;
    }

    // registerFail() {
    //     let observable = new Observable(observer => {
    //         // observer.next(true);
    //         this.socket.on('server-send-register-fail', () => {
    //             observer.next(false);
    //         });

    //         return () => {
    //             this.socket.disconnect();
    //         }
    //     });

    //     return observable;
    // }


    // registerSuccess() {

    //     let observable = new Observable(observer => {
    //         this.socket.on('server-send-register-success', (data) => {
              
    //             this.profile.name = data;
    //             observer.next(data);
    //             this.router.navigate(['/dashboard/chat']);
    //             console.log('vao 1');
    //         });
    //     });

    //     return observable;
    // }

    // registerAUser(username) {
    //     return this.socket.emit('client-send-username', username);
    // }

    // listOnlineUsersFromSoket() {
    //     // this.socket.emit('logout');
      
    //     let observable = new Observable(observer => {
    //         console.log('vao 2');
    //         this.socket.on('server-send-users', (data) => {
    //             console.log('vao');
    //             observer.next(data);
    //         }); 

    //     });
    //     return observable;
    // }

    // listOnlineFirst(){
    //     this.socket.emit('list-online');
    // }

    checkLogout() {
        this.socket.emit('logout');
    }

}

    // return () => {
    //     this.socket.disconnect();
    // }    