import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Subscription } from 'rxjs';
import { RouterService } from './core/router.service';
import { Router } from '@angular/router';
import { ConfigsService } from './core/configs.service';
import { NavService } from './nav/nav.service';
import { AppService } from './app.service';
import { Type } from './core/db.model';

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
        public configsService: ConfigsService,
        public navService: NavService,
        public appService: AppService
    ) {
        this.navService.sourceSubject.subscribe(res => console.log(1, res));
    }
    ngOnInit() {
        this.logoutSubscription = this.authService.checkLoginNow().subscribe(res => {
            this.authService.loginResponse = res;
        });

        this.configSubscription = this.configsService.getConfigsFromJson();
        this.appService.getNavConfig().subscribe(res => {
            this.appService.navs = res;
            this.appService.navsSub.next(res);
        });

    }

    ngOnDestroy() {
        this.logoutSubscription ? this.logoutSubscription.unsubscribe() : this.logoutSubscription = null;
        this.configSubscription ? this.configSubscription.unsubscribe() : this.configSubscription = null;
    }
}
