import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {

    private socket;
    public profile = {
        name: ''
    };
    // private url = 'https://app-vietchat.herokuapp.com';
    private url = 'http://localhost:8080';
    constructor() {
        this.socket = io(this.url,{'multiplex': false});
    }

    sendMessage(message) {
        this.socket.emit("client-send-message", message);
        // this.socket.emit('send-message', message);
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

    registerFail() {
        let observable = new Observable(observer => {
            // observer.next(true);
            this.socket.on('server-send-register-fail', () => {
                observer.next(false);
            });

            return () => {
                this.socket.disconnect();
            }
        });

        return observable;
    }


    registerSuccess() {
        let observable = new Observable(observer => {
            this.socket.on('server-send-register-success', (data) => {

                this.profile.name = data;
                observer.next(data);
            });
        });

        return observable;
    }

    registerAUser(username) {
        this.socket.emit('client-send-username', username);
        // return () => {
        //     this.socket.disconnect();
        // }
    }

    listOnlineUsersFromSoket() {
        let observable = new Observable(observer => {
            this.socket.on('server-send-users', (data) => {
                observer.next(data);
            });

        });

        return observable;
    }

    
    checkLogout() {
        this.socket.emit('logout');
    }

    // list() {
    //     this.socket.on('server-send-online',(data) => {
    //     })
    // }

}


            // return () => {
            //     this.socket.disconnect();
            // }    