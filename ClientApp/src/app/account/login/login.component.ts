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
                this.authService.loginResponse = res;
            });
        });
    }

    loginSocial(provider: string) {
        const returnUrl = encodeURIComponent('/login');
        const requestUrl = '/api/account/sociallogin?provider=' + provider + '&returnUrl=' + returnUrl;
        window.location.href = requestUrl;
    }

    ngOnDestroy() {
        this.loginSubscription ? this.loginSubscription.unsubscribe() : this.loginSubscription = null;
    }
}
