import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AuthGuardService, LoginAuthGuardService } from './core/auth-guard.service';
import { AuthService } from './core/auth.service';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from './shared/shared.module';
import { HeaderModule } from './header/header.module';
import { AccountModule } from './account/acc.module';
import { ConfigsService } from './core/configs.service';
import { WindowService } from './core/window.service';
import { MaterialModule } from './material.module';
import { NavMenuComponent } from './header/nav/nav-menu/nav-menu.component';
import { NavService } from './header/nav/nav.service';
import { AppCustomPreloader } from './app.preload';
import { SharedService } from './shared/shared.service';
const routes: Route[] = [
    { path: 'login', component: LoginComponent, canActivate: [LoginAuthGuardService] },
    { path: 'register', component: RegisterComponent, canActivate: [LoginAuthGuardService] },
    { path: 'creater', loadChildren: './creater/creater.module#CreaterModule', canLoad: [AuthGuardService] },
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canLoad: [AuthGuardService] },
    {
        path: '',
        loadChildren: './statistics/statistics.module#StatisticsModule',
        data: { preload: true }
    }
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
        BrowserAnimationsModule,
        SharedModule.forRoot(),
        MaterialModule,
        HeaderModule,
        AccountModule,
        RouterModule.forRoot(routes, { preloadingStrategy: AppCustomPreloader })
    ],
    exports: [],
    providers: [
        AuthGuardService,
        AuthService,
        LoginAuthGuardService,
        ConfigsService,
        NavService,
        WindowService,
        SharedService,
        AppCustomPreloader
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
