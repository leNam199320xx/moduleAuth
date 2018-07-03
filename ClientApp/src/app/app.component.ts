import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Subscription } from 'rxjs';
import { ResponseModel } from './core/response.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
    title = 'app';
    logoutSubscription: Subscription;
    constructor(public authService: AuthService) {

    }

    ngOnInit(): void {
        this.logoutSubscription = this.authService.checkLoginNow().subscribe(res => {
            this.authService.loginResponse = res;
        });
    }

    ngOnDestroy() {
        this.logoutSubscription ? this.logoutSubscription.unsubscribe() : this.logoutSubscription = null;
    }
}
