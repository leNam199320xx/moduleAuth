import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountModel } from '../account/acc.model';
import { ResponseModel } from './response.model';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class AuthService {
    loginInfo: ResponseModel = new ResponseModel();
    loginSub: Subject<ResponseModel> = new Subject();
    set loginResponse(val: ResponseModel) {
        this.loginInfo = val;
        this.loginSub.next(this.loginInfo);
    }
    constructor(private http: HttpClient) {
        this.loginResponse = new ResponseModel();
    }

    checkLogin() {
        this.checkLoginNow().subscribe(res => {
            this.loginResponse = res;
        }).unsubscribe();
    }

    checkLoginNow() {
        return this.http.post<ResponseModel>('api/account/checklogin', {});
    }

    login(account: AccountModel) {
        return this.http.post<ResponseModel>('api/account/login', account);
    }

    loginSocial(provider: string) {
        return this.http.get<any>('api/account/sociallogin?Provider=Facebook');
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
