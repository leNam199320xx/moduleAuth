import { NgModule } from '@angular/core';
import { HeaderNormalComponent } from './normal/header-normal.component';
import { HeaderComponent } from './header.component';
import { NavFixedComponent } from '../nav/nav-fixed/nav-fixed.component';
import { SharedModule } from '../shared.module';
import { HeaderInfoComponent } from './info/header-info.component';

@NgModule({
    declarations: [
        HeaderNormalComponent,
        HeaderComponent,
        HeaderInfoComponent,
        NavFixedComponent
    ],
    exports: [
        HeaderComponent
    ],
    imports: [
        SharedModule
    ]
})
export class HeaderModule {
}
