import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeneralConfigModel } from '../../../core/config.model';
import { ResponseModel } from '../../../core/response.model';
import { CategoryModel, Type } from '../../../core/db.model';
import { AuthService } from '../../../core/auth.service';
import { ConfigsService } from '../../../core/configs.service';
import { AppService } from '../../../app.service';

@Component({
    selector: 'app-nav-fixed',
    templateUrl: 'nav-fixed.html'
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
            console.log(res);
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
