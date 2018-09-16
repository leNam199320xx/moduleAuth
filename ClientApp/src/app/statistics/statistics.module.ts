import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StatisticsComponent } from './statistics.component';
import { StatisticsService } from './statistics.service';
import { StatisticPeopleComponent } from './people/people.componen';
import { StatisticsGraphComponent } from './graph/graph.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([{
            path: '',
            component: StatisticsComponent
        },
        {
            path: 'graph',
            component: StatisticsGraphComponent
        }])
    ],
    exports: [RouterModule],
    declarations: [StatisticsComponent, StatisticPeopleComponent, StatisticsGraphComponent],
    providers: [StatisticsService]
})
export class StatisticsModule { }
