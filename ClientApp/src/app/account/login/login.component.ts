import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountModel } from '../acc.model';

@Component({
    selector: 'app-login',
    templateUrl: 'login.html'
})
export class LoginComponent {
    account: AccountModel = new AccountModel();
    constructor(private http: HttpClient) { }
    login() {
        const resp = this.http.post('api/account/login', this.account);
        resp.subscribe(res => {
            console.log(res);
        });
    }
}
