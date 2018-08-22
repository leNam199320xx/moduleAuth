import { Component, Input } from '@angular/core';
import { Social } from '../../../../core/statistics.model';
import { StatisticsService } from '../../../../statistics/statistics.service';

@Component({
    selector: 'app-admin-social-edit',
    templateUrl: '+edit.html'
})
export class AdminSocialEditComponent {
    @Input() social: Social;
    constructor(private statisticsService: StatisticsService) {
    }
    saveBtn() {
        this.statisticsService.updateSocial(this.social).subscribe(res => {
            console.log('update social - ', res);
        });
    }

    cancelBtn() {
        this.social._enableEditPanel = false;
    }
}
