import { Component, OnDestroy } from '@angular/core';
import { AccountModel } from '../acc.model';
import { AuthService } from '../../core/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: 'login.html'
})
export class LoginComponent implements OnDestroy {
    account: AccountModel = new AccountModel();
    loginSubscription: Subscription;
    constructor(private authService: AuthService) { }
    login() {
        this.account.returnUrl = '/';
        this.loginSubscription = this.authService.login(this.account).subscribe(res => {
            console.log(res);
        });
    }

    ngOnDestroy() {
        this.loginSubscription ? this.loginSubscription.unsubscribe() : this.loginSubscription = null;
    }
}
