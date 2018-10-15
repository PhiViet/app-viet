import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { Router } from '../../node_modules/@angular/router';

@Injectable()
export class ChatService {

    // private dataonl;
    private socket;
    // private username;

    // private url = 'https://app-vietchat.herokuapp.com';
    private url = 'http://localhost:8080';
    constructor(private router: Router, ) {
        this.socket = io(this.url);
    }

    registerAUser(username: String) {
        return this.socket.emit('register-a-user', username);
    }

    registerSuccess() {
        let observableUsername = new Observable(observer => {
            this.socket.on('register-success', (username) => {
                observer.next(username);
            });
        });

        return observableUsername;
    }

    registerFail() {
        let observableUsername = new Observable(observer => {
            this.socket.on('register-fail', (name) => {
                observer.next(name);
            });
        });

        return observableUsername;
    }

    reRegister(username) {
        return this.socket.emit('re-register-a-user', username.nameAccount);
    }

    reRegisterSuccess() {
        let observableUsername = new Observable(obserer => {
            this.socket.on('re-register-success', () => {
                obserer.next(true);
            });
        });

        return observableUsername;
    }

    reRegisterFail() {
        let observableUsername = new Observable(observer => {
            this.socket.on('re-register-fail', (name) => {
                observer.next(name);
            });
        });

        return observableUsername;
    }

    addAUserToListOnline() {
        // if(this.username != null){
        // console.log('vao');
        this.socket.emit('add-user');
        // }
    }

    listUserOnline() {
        let obsListOnline = new Observable(observer => {
            this.socket.on('list-online', (listOnline) => {
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

    checkLogout() {
        this.socket.emit('logout');
    }

    inTyping(username) {
        console.log(username);
        this.socket.emit('client-typing', username);
    }

    outTyping() {
        this.socket.emit('client-untyping');
    }

    onTyping() {
        let observable = new Observable(observer => {
            this.socket.on('status-typing', (data) => {
                observer.next(data);
            });
        });
        return observable;
    }

    unTyping() {
        let observable = new Observable(observer => {
            this.socket.on('status-untyping', () => {
                observer.next(null);
            });
        });
        return observable;
    }
}