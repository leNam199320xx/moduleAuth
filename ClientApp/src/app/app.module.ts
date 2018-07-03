import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AccountModule } from './account/acc.module';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AuthGuardService, LoginAuthGuardService } from './core/auth-guard.service';
import { AuthService } from './core/auth.service';
import { NavFixedComponent } from './nav-fixed/nav-fixed.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        NavFixedComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        AccountModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'login', component: LoginComponent, canActivate: [LoginAuthGuardService]  },
            { path: 'register', component: RegisterComponent, canActivate: [LoginAuthGuardService] },
            { path: 'creater', loadChildren: './creater/creater.module#CreaterModule', canLoad: [AuthGuardService] }
        ])
    ],
    exports: [
    ],
    providers: [AuthGuardService, AuthService, LoginAuthGuardService],
    bootstrap: [AppComponent]
})
export class AppModule { }
