import { Component, Output, EventEmitter } from '@angular/core';
import { People } from '../../../statistics/statistics.model';

@Component({
    selector: 'app-admin-statistics-createpeople',
    templateUrl: '+create-people.html'
})
export class AdminStatisticsCreatePeopleComponent {
    @Output() saveEvent: EventEmitter<People> = new EventEmitter();
    @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter();

    newPeople: People = new People();
}
