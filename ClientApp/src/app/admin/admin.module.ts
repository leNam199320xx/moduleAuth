import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminCurrencyUnitComponent } from './currency-unit/currency-unit.component';
import { AdminProviderComponent } from './provider/provider.component';
import { AdminComponent } from './admin.component';
import { AdminPostTypeComponent } from './post-type/post-type.component';
import { AdminHistoryComponent } from './history/history.component';
import { AdminPostComponent } from './post/post.component';
import { AdminCategoryComponent } from './category/category.component';
import { AdminService } from './admin.service';
import { AdminCategoryCreateComponent } from './category/create/create.component';
import { AdminStatisticsComponent } from './+statistics/+statistics.component';
import { SharedModule } from '../shared/shared.module';
import { StatisticsService } from '../statistics/statistics.service';
import { AdminStatisticsCreatePeopleComponent } from './+statistics/+create-people/+create-people.component';
import { AdminPeopleAddSocialComponent } from './+statistics/+add-social/+add-social.component';

@NgModule({
    declarations: [
        AdminCurrencyUnitComponent,
        AdminProviderComponent,
        AdminPostTypeComponent,
        AdminPostComponent,
        AdminCategoryComponent,
        AdminCategoryCreateComponent,
        AdminHistoryComponent,
        AdminStatisticsComponent,
        AdminStatisticsCreatePeopleComponent,
        AdminPeopleAddSocialComponent,
        AdminComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: '', redirectTo: '', pathMatch: 'full' },
            { path: 'statistics', component: AdminStatisticsComponent }
        ])
    ],
    exports: [RouterModule],
    providers: [AdminService, StatisticsService]
})
export class AdminModule {

}
