import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService {

    private url = 'https://app-vietchat.herokuapp.com';
    // private url = 'http://localhost:8080/api';
    constructor(
        private http: HttpClient
    ) { }

    addUsersToOnline(name) {
        const body = {
            name:name
        };
        return this.http.post(this.url+ '/api/addUserToListOnline', body);
    }

    // offline
    // deleteUserOnline(name) {
    //     return this.http.delete(this.url+ '/api/deleteUserOnline/'+name);
    // }
}