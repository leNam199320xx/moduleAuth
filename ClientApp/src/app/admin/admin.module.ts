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
import { AdminCategoryComponent } from './category/category.component';
import { AdminService } from './admin.service';
import { FormsModule } from '../../../node_modules/@angular/forms';

@NgModule({
    declarations: [
        AdminCurrencyUnitComponent,
        AdminProviderComponent,
        AdminPostTypeComponent,
        AdminPostComponent,
        AdminCategoryComponent,
        AdminHistoryComponent,
        AdminComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(
        [
            { path: '', pathMatch: 'full', component: AdminComponent },
            { path: ':page', component: AdminComponent }

        ]
    )],
    providers: [NavService, AdminService]
})
export class AdminModule {

}
