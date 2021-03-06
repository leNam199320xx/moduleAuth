import { NgModule } from '@angular/core';
import { HeaderNormalComponent } from './normal/header-normal.component';
import { HeaderComponent } from './header.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderInfoComponent } from './info/header-info.component';
import { HeaderStaticComponent } from './static/header-static.component';
import { ConfigsService } from '../core/configs.service';
import { NavFixedComponent } from './nav/nav-fixed/nav-fixed.component';

@NgModule({
    declarations: [
        HeaderNormalComponent,
        HeaderComponent,
        HeaderInfoComponent,
        NavFixedComponent,
        HeaderStaticComponent
    ],
    exports: [
        HeaderComponent
    ],
    imports: [
        SharedModule
    ],
    providers: [
        ConfigsService
    ]
})
export class HeaderModule {
}
