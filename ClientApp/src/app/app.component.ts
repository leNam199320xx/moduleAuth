import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Subscription } from 'rxjs';
import { RouterService } from './core/router.service';
import { Router } from '@angular/router';
import { ConfigsService } from './core/configs.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
    title = 'app';

    logoutSubscription: Subscription;
    configSubscription: Subscription;
    constructor(
        public authService: AuthService,
        public configsService: ConfigsService
    ) { }
    ngOnInit() {
        this.logoutSubscription = this.authService.checkLoginNow().subscribe(res => {
            this.authService.loginResponse = res;
        });

        this.configSubscription = this.configsService.getConfigsFromJson();
    }

    ngOnDestroy() {
        this.logoutSubscription ? this.logoutSubscription.unsubscribe() : this.logoutSubscription = null;
        this.configSubscription ? this.configSubscription.unsubscribe() : this.configSubscription = null;
    }
}
