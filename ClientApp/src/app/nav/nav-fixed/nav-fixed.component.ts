import { Component, Input } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { ResponseModel } from '../../core/response.model';
import { ConfigsService } from '../../core/configs.service';
import { GeneralConfigModel } from '../../core/config.model';

@Component({
    selector: 'app-nav-fixed',
    templateUrl: 'nav-fixed.html',
    styleUrls: ['nav-fixed.css']
})

export class NavFixedComponent {
    loginResponse: ResponseModel = new ResponseModel();
    configNav: GeneralConfigModel = new GeneralConfigModel();
    constructor(public authService: AuthService, public configsService: ConfigsService) {
        this.authService.loginSub.subscribe((res) => {
            this.loginResponse = res;
        });
        this.configsService.configsSubject.subscribe(res => {
            this.configNav = res.header.children[0] || new GeneralConfigModel();
        });
    }
}
