import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeneralConfigModel } from '../../../core/config.model';
import { ResponseModel } from '../../../core/response.model';
import { CategoryModel, Type } from '../../../core/db.model';
import { AuthService } from '../../../core/auth.service';
import { ConfigsService } from '../../../core/configs.service';
import { MessageModel, MessageType } from '../../../shared/message-dialog/message.model';

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
    errorMessage: MessageModel;

    constructor(
        public authService: AuthService,
        public configsService: ConfigsService
    ) {
        this.authService.loginSub.subscribe((res) => {
            this.loginResponse = res;
            // console.log(res);
        });
        this.configsService.configsSubject.subscribe(res => {
            // this.configNav = res.header.children[0] || new GeneralConfigModel();
        });
    }
    logout() {
        this.logoutSubscription = this.authService.logout().subscribe(res => this.authService.loginResponse = res);
    }
    ngOnDestroy() {
        this.logoutSubscription ? this.logoutSubscription.unsubscribe() : this.logoutSubscription = null;
    }
    getSearchResults($val: string) {
        if ($val && $val !== '') {
            // search
        } else {
            // error message
            this.errorMessage = new MessageModel();
            this.errorMessage.key = 404;
            this.errorMessage.message = 'Not found';
            this.errorMessage.type = MessageType.error;
        }
    }

}
