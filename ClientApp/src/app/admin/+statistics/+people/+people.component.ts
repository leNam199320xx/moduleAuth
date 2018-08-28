import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { People } from '../../../core/statistics.model';
import { AdminPeopleService } from './+people.service';

@Component({
    selector: 'app-admin-people',
    templateUrl: '+people.html'
})
export class AdminPeopleComponent implements OnInit {
    @Input() newPeople = new People();
    @Input() careerId: number;
    @Input() isUpdate = false;
    @Output() closeEvent: EventEmitter<boolean> = new EventEmitter();
    constructor(private peopleService: AdminPeopleService) {

    }
    ngOnInit() {
    }
    saveBtn() {
        if (!this.careerId) {
            return;
        }
        this.newPeople.careerId = this.careerId;
        if (this.isUpdate) {
            this.peopleService.saveUpdatedPeople(this.newPeople).subscribe(res => {
                this.closeEvent.emit(true);
            });
        } else {
            this.peopleService.savePeople(this.newPeople).subscribe(res => {
                this.closeEvent.emit(true);
            });
        }
    }
}
