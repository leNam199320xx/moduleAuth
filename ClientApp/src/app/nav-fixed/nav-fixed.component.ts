import { Component, Input } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { ResponseModel } from '../core/response.model';

@Component({
    selector: 'app-nav-fixed',
    templateUrl: 'nav-fixed.html',
    styleUrls: ['nav-fixed.css']
})

export class NavFixedComponent {
    loginResponse: ResponseModel = new ResponseModel();
    constructor(public authService: AuthService) {
        this.authService.loginSub.subscribe((res) => {
            this.loginResponse = res;
        });
    }
}
