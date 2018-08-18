import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Social } from '../../../core/statistics.model';
import { StatisticsService } from '../../../statistics/statistics.service';
@Component({
    selector: 'app-admin-social',
    templateUrl: '+social.html'
})
export class AdminSocialComponent {
    @Input() newSocial = new Social();
    @Input() socials: Social[] = [];
    @Output() closeEvent: EventEmitter<boolean> = new EventEmitter();
    constructor(private socialService: StatisticsService) {
    }
    saveBtn() {
        this.socialService.saveSocials(this.newSocial).subscribe(res => {
            this.closeEvent.emit(true);
        });
    }
}
