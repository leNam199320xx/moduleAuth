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
    constructor(
        public authService: AuthService,
        private router: Router,
        private routerService: RouterService,
        public configsService: ConfigsService
    ) { }
    ngOnInit() {
        this.logoutSubscription = this.authService.checkLoginNow().subscribe(res => {
            this.authService.loginResponse = res;
        });
        this.routerService.getConfig().subscribe(rts => {
            this.router.config = this.router.config.concat(rts);
            this.router.resetConfig(this.router.config);
        });
        this.configsService.getConfigsFromJson().subscribe(cf => {
            this.configsService.configs = cf;
        }, error => {
            console.log(error);
        });
    }

    ngOnDestroy() {
        this.logoutSubscription ? this.logoutSubscription.unsubscribe() : this.logoutSubscription = null;
    }
}
