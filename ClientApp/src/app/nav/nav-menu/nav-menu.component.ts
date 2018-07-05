import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnDestroy {
    isExpanded = false;

    logoutSubscription: Subscription;

    constructor(public authService: AuthService) { }

    collapse() {
        this.isExpanded = false;
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }

    logout() {
        this.logoutSubscription = this.authService.logout().subscribe(res => this.authService.loginResponse = res);
    }

    ngOnDestroy() {
        this.logoutSubscription ? this.logoutSubscription.unsubscribe() : this.logoutSubscription = null;
    }
}
