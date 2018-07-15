import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {
    public account;

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.account = localStorage.getItem('account');
        if (this.account) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}