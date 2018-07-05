import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Route } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav/nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AuthGuardService, LoginAuthGuardService } from './core/auth-guard.service';
import { AuthService } from './core/auth.service';
import { FooterComponent } from './footer/footer.component';
import { RouterService } from './core/router.service';
import { SharedModule } from './shared.module';
import { HeaderModule } from './header/header.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountModule } from './account/acc.module';
const routes: Route[] = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [LoginAuthGuardService] },
    { path: 'register', component: RegisterComponent, canActivate: [LoginAuthGuardService] },
    { path: 'creater', loadChildren: './creater/creater.module#CreaterModule', canLoad: [AuthGuardService] }
];

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        SharedModule,
        HeaderModule,
        AccountModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
    providers: [AuthGuardService, AuthService, LoginAuthGuardService, RouterService],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
    }
}
