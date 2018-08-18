import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PeopleSocials, Social } from '../../../../core/statistics.model';
@Component({
    selector: 'app-admin-people-addsocial',
    templateUrl: '+social.html'
})
export class AdminPeopleSocialComponent {
    @Input() social = new PeopleSocials();
    @Input() socials: Social[] = [];
    @Input() isUpdate = false;
    @Output() closeEvent: EventEmitter<boolean> = new EventEmitter();
    saveSocial() {
        if (this.isUpdate) {

        } else {

        }
    }

    closeBtn() {
        this.closeEvent.emit(true);
    }
}
