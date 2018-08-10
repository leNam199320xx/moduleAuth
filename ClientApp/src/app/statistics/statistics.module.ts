import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StatisticsComponent } from './statistics.component';

@NgModule({
  imports: [
    SharedModule,
    StatisticsRoutingModule
  ],
  declarations: [StatisticsComponent]
})
export class StatisticsModule { }
