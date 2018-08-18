import { Component } from '@angular/core';
import { StatisticsService } from '../../statistics/statistics.service';
import { Career, People, PeopleSocials, Social } from '../../core/statistics.model';

@Component({
    selector: 'app-admin-statistics',
    templateUrl: '+statistics.html'
})
export class AdminStatisticsComponent {
    data: Career[] = [];
    newCareer: Career;
    currentCareer: Career;
    enabledSocialPanel = false;
    enabledCareerPanel = false;
    socials: Social[] = [];
    constructor(private dataService: StatisticsService
    ) {
        this.dataService.getAllPeoples().subscribe(res => {
            this.data = res.results;
        });

        this.dataService.getSocials().subscribe(res => {
            this.socials = res;
        });
    }

    openSocialPanel() {
        this.enabledSocialPanel = !this.enabledSocialPanel;
    }

    openCareerPanel() {
        this.enabledCareerPanel = !this.enabledCareerPanel;
    }

    openAddPeoplePanel ($item: Career) {
        $item._enabledAddPeople = !$item._enabledAddPeople;
    }
}
