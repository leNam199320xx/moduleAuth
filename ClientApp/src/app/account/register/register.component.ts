import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountRegisterModel } from './register.model';

@Component({
    selector: 'app-register',
    styleUrls: ['register.css'],
    templateUrl: 'register.html'
})

export class RegisterComponent {
    public accountRegister: AccountRegisterModel;
    constructor(private http: HttpClient) {

    }
    btnRegister() {
        this.http.post<any>('api/register', {
            Email: this.accountRegister.email,
            Phone: this.accountRegister.phone,
            Password: this.accountRegister.password,
            ConfirmPassword: this.accountRegister.confirmPassword
        }).subscribe(res => {
            console.log(res);
        });
    }
}
