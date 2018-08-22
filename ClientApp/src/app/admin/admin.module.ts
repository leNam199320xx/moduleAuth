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
import { AdminSocialComponent } from './+statistics/+social/+social.component';
import { AdminCareerComponent } from './+statistics/+career/+career.component';
import { AdminCareerService } from './+statistics/+career/+career.service';
import { AdminPeopleComponent } from './+statistics/+people/+people.component';
import { AdminPeopleSocialComponent } from './+statistics/+people/+social/+social.component';
import { AdminPeopleService } from './+statistics/+people/+people.service';
import { AdminSocialEditComponent } from './+statistics/+social/+edit/+edit.component';

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
        AdminPeopleComponent,
        AdminPeopleSocialComponent,
        AdminSocialComponent,
        AdminSocialEditComponent,
        AdminCareerComponent,
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
    providers: [AdminService, StatisticsService, AdminCareerService, AdminPeopleService]
})
export class AdminModule {

}
