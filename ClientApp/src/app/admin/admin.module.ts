import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminCurrencyUnitComponent } from './currency-unit/currency-unit.component';
import { AdminProviderComponent } from './provider/provider.component';
import { AdminComponent } from './admin.component';
import { AdminPostTypeComponent } from './post-type/post-type.component';
import { AdminHistoryComponent } from './history/history.component';
import { AdminPostComponent } from './post/post.component';
import { NavService } from '../nav/nav.service';
import { CommonModule } from '../../../node_modules/@angular/common';

@NgModule({
    declarations: [
        AdminCurrencyUnitComponent,
        AdminProviderComponent,
        AdminPostTypeComponent,
        AdminPostComponent,
        AdminHistoryComponent,
        AdminComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(
        [
            { path: '', pathMatch: 'full', component: AdminComponent },
            { path: ':page', component: AdminComponent }

        ]
    )],
    providers: [NavService]
})
export class AdminModule {

}
