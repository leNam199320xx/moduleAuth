import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
    title = 'app';
    logoutSubscription: Subscription;
    constructor(private authService: AuthService) {
        this.logoutSubscription = this.authService.checkLogin().subscribe(res => console.log(res));
    }

    ngOnDestroy() {
        this.logoutSubscription ? this.logoutSubscription.unsubscribe() : this.logoutSubscription = null;
    }
}
