import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanLoad,
    Route
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/Operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {
    constructor(private authService: AuthService) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        const url: string = state.url;

        return this.authService.checkLoginNow().pipe(
            map(res => res.isSignedIn)
        );
    }

    canLoad(route: Route): Observable<boolean> | boolean {
        return this.authService.checkLoginNow().pipe(
            map(res => res.isSignedIn)
        );
    }

}

export class LoginAuthGuardService implements CanActivate {
    constructor(private authService: AuthService) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        const url: string = state.url;

        return this.authService.checkLoginNow().pipe(
            map(res => !res.isSignedIn)
        );
    }
}
