import { Component } from '@angular/core';
import { StatisticsService } from '../../statistics/statistics.service';
import { Career, People } from '../../statistics/statistics.model';

@Component({
    selector: 'app-admin-statistics',
    templateUrl: '+statistics.html'
})
export class AdminStatisticsComponent {
    data: Career[] = [];
    newCareer: Career;
    currentCareer: Career;
    isAddNewCareer = false;
    constructor(private dataService: StatisticsService) {
        this.dataService.getDataStatistics().subscribe(res => {
            this.data = res;
        });
    }


    addNewCareer() {
        this.isAddNewCareer = true;
        this.newCareer = new Career();
    }

    addNewPeople($career: Career) {
        this.currentCareer = null;
        if ($career) {
            $career.enabledAddPeople = true;
            this.currentCareer = $career;
        }
    }

    saveNewPeople($newPeople: People) {
        if (this.currentCareer.data) {
            this.currentCareer.data.push($newPeople);
        } else {
            this.currentCareer.data = [];
            this.currentCareer.data.push($newPeople);
        }
        this.cancelNewPeople();
    }

    saveNewCareer() {
        if (this.newCareer) {
            this.data = [this.newCareer].concat(this.data);
        }
        this.cancelNewCareer();
    }

    cancelNewCareer() {
        this.isAddNewCareer = false;
        this.newCareer = null;
    }

    cancelNewPeople() {
        this.currentCareer.enabledAddPeople = false;
    }
}
