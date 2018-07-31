import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { AccountModel } from '../acc.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-register',
    styleUrls: ['register.css'],
    templateUrl: 'register.html'
})

export class RegisterComponent implements OnDestroy {
    registerAccount: AccountModel = new AccountModel();
    registerSubscription: Subscription;
    constructor(private authService: AuthService) {

    }
    btnRegister() {
        this.registerSubscription = this.authService.register(this.registerAccount).subscribe(res => {
        });
    }

    ngOnDestroy() {
        this.registerSubscription ? this.registerSubscription.unsubscribe() : this.registerSubscription = null;
    }
}
