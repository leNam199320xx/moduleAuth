import { NgModule } from '@angular/core';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StatisticsComponent } from './statistics.component';
import { StatisticsService } from './statistics.service';
import { StatisticPeopleComponent } from './people/people.componen';

@NgModule({
  imports: [
    SharedModule,
    StatisticsRoutingModule
  ],
  declarations: [StatisticsComponent, StatisticPeopleComponent],
  providers: [StatisticsService]
})
export class StatisticsModule { }
