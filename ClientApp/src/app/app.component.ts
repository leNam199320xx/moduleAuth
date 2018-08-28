import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Subscription } from 'rxjs';
import { ConfigsService } from './core/configs.service';
import { WindowService } from './core/window.service';
import { NavService } from './header/nav/nav.service';
import { SharedService } from './shared/shared.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy, OnInit {
    title = 'app';

    logoutSubscription: Subscription;
    configSubscription: Subscription;
    constructor(
        public authService: AuthService,
        public configsService: ConfigsService,
        private windowService: WindowService
    ) {
    }
    @HostListener('window:resize', ['$event']) onresize(_event: Event) {
        this.windowService.setBreakpoint();
    }
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
