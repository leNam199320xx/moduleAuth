import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminCurrencyUnitComponent } from './currency-unit/currency-unit.component';
import { AdminProviderComponent } from './provider/provider.component';
import { AdminComponent } from './admin.component';
import { AdminPostTypeComponent } from './post-type/post-type.component';
import { AdminHistoryComponent } from './history/history.component';
import { AdminPostComponent } from './post/post.component';
import { CommonModule } from '@angular/common';
import { AdminCategoryComponent } from './category/category.component';
import { AdminService } from './admin.service';
import { FormsModule } from '@angular/forms';
import { AdminCategoryCreateComponent } from './category/create/create.component';

@NgModule({
    declarations: [
        AdminCurrencyUnitComponent,
        AdminProviderComponent,
        AdminPostTypeComponent,
        AdminPostComponent,
        AdminCategoryComponent,
        AdminCategoryCreateComponent,
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
    providers: [AdminService]
})
export class AdminModule {

}
