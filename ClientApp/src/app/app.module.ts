import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
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
import { AccountModule } from './account/acc.module';
import { ConfigsService } from './core/configs.service';
import { NavService } from './nav/nav.service';
import { PageService } from './page/page.service';
import { AppService } from './app.service';
import { WindowService } from './core/window.service';
const routes: Route[] = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [LoginAuthGuardService] },
    { path: 'register', component: RegisterComponent, canActivate: [LoginAuthGuardService] },
    { path: 'creater', loadChildren: './creater/creater.module#CreaterModule', canLoad: [AuthGuardService] },
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canLoad: [AuthGuardService] }
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
    providers: [
        AuthGuardService,
        AuthService,
        LoginAuthGuardService,
        RouterService,
        ConfigsService,
        NavService,
        AppService,
        WindowService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
