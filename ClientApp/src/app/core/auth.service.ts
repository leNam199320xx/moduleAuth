import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountModel } from '../account/acc.model';
import { ResponseModel } from './response.model';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {

    }

    checkLogin() {
        return this.http.post<ResponseModel>('api/account/checklogin', {});
    }

    login(account: AccountModel) {
        return this.http.post<ResponseModel>('api/account/login', account);
    }

    logout() {
        return this.http.post<ResponseModel>('api/account/logout', {});
    }

    register(account: AccountModel) {
        return this.http.post<ResponseModel>('api/account/register', account);
    }

    confirm(code: string) {

    }
}
