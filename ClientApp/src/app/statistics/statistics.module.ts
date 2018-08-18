import { NgModule } from '@angular/core';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StatisticsComponent } from './statistics.component';
import { StatisticsService } from './statistics.service';

@NgModule({
  imports: [
    SharedModule,
    StatisticsRoutingModule
  ],
  declarations: [StatisticsComponent],
  providers: [StatisticsService]
})
export class StatisticsModule { }
