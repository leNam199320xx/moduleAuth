import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PeopleSocials, Social } from '../../../../core/statistics.model';
import { StatisticsService } from '../../../../statistics/statistics.service';
@Component({
    selector: 'app-admin-people-social',
    templateUrl: '+social.html'
})
export class AdminPeopleSocialComponent {
    @Input() social = new PeopleSocials();
    @Input() socials: Social[] = [];
    @Input() peopleSocials: PeopleSocials[] = [];
    @Input() isUpdate = false;
    @Input() peopleId: number;
    @Output() closeEvent: EventEmitter<boolean> = new EventEmitter();
    constructor(private statisticsService: StatisticsService) {

    }
    saveSocialBtn() {
        if (!this.peopleId) {
            return;
        }
        this.social.peopleId = this.peopleId;
        if (this.isUpdate) {

        } else {
            this.statisticsService.saveSocialForPeople(this.social).subscribe(res => {
                console.log(res);
            });
        }
    }

    closeBtn() {
        this.closeEvent.emit(true);
    }

    chechSocialBtn($p: PeopleSocials) {
        if ($p) {
            this.statisticsService.GetDataFromFacebook($p).subscribe(res => {
                console.log(res);
                $p.like = res.like;
                $p.follow = res.follow;
            });
        }
    }

    editSocialBtn($p: PeopleSocials) {
        this.social = $p;
    }
}
