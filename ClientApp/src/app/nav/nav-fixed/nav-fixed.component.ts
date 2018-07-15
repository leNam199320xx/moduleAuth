import { Component, Input, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { ResponseModel } from '../../core/response.model';
import { ConfigsService } from '../../core/configs.service';
import { GeneralConfigModel } from '../../core/config.model';
import { Subscription } from 'rxjs';
import { AppService } from '../../app.service';
import { Type, CategoryModel } from '../../core/db.model';

@Component({
    selector: 'app-nav-fixed',
    templateUrl: 'nav-fixed.html',
    styleUrls: ['nav-fixed.scss']
})

export class NavFixedComponent implements OnDestroy {
    loginResponse: ResponseModel = new ResponseModel();
    logoutSubscription: Subscription;
    configNav: GeneralConfigModel = new GeneralConfigModel();
    navs: Type[] = [];
    categories: CategoryModel[] = [];

    constructor(
        public authService: AuthService,
        public configsService: ConfigsService,
        public appService: AppService
    ) {
        this.authService.loginSub.subscribe((res) => {
            this.loginResponse = res;
        });
        this.configsService.configsSubject.subscribe(res => {
            // this.configNav = res.header.children[0] || new GeneralConfigModel();
        });

        this.appService.getCategories('category').subscribe(res => {
            this.categories = res.results as CategoryModel[];

        });

    }
    logout() {
        this.logoutSubscription = this.authService.logout().subscribe(res => this.authService.loginResponse = res);
    }
    ngOnDestroy() {
        this.logoutSubscription ? this.logoutSubscription.unsubscribe() : this.logoutSubscription = null;
    }
}
