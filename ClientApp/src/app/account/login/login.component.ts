import { Component, OnDestroy } from '@angular/core';
import { AccountModel } from '../acc.model';
import { AuthService } from '../../core/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: 'login.html'
})
export class LoginComponent implements OnDestroy {
    account: AccountModel = new AccountModel();
    loginSubscription: Subscription;
    constructor(private authService: AuthService, private router: Router) { }
    login() {
        this.account.returnUrl = '/';
        this.loginSubscription = this.authService.login(this.account).subscribe(res => {
            this.router.navigateByUrl(res.returnUrl).then(() => {
                console.log('nav', res);
                this.authService.loginResponse = res;
            });
        });
    }

    loginSocial(provider: string) {
        // this.loginSubscription = this.authService.loginSocial(provider).subscribe(res => {
        //     console.log(1);
        // }, errors => {
        //     console.log(errors);
        // });
        const returnUrl = encodeURIComponent('/login');
        console.log(returnUrl);
        const requestUrl = '/api/account/sociallogin?provider=' + provider + '&returnUrl=' + returnUrl;
        window.location.href = requestUrl;
    }

    ngOnDestroy() {
        this.loginSubscription ? this.loginSubscription.unsubscribe() : this.loginSubscription = null;
    }
}
