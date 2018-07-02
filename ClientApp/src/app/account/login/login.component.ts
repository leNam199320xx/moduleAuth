import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountModel } from '../acc.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Component({
  selector: 'app-login',
  templateUrl: 'login.html'
})
export class LoginComponent {
  account: AccountModel = new AccountModel();
  constructor(private http: HttpClient) { }
  login() {
    this.account.returnUrl = '/';
    const resp = this.http.post('api/account/login',
      this.account
    ).subscribe(res => {
      console.log(res);
    });
  }
}
