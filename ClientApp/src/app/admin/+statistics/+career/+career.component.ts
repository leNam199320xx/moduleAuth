import { Component, Input } from '@angular/core';
import { Career } from '../../../core/statistics.model';
import { AdminCareerService } from './+career.service';
@Component({
    selector: 'app-admin-career',
    templateUrl: '+career.html'
})
export class AdminCareerComponent {
    @Input() newCareer = new Career();
    careers: Career[] = [];
    careersSub = this.careerService.getCareers();
    constructor(private careerService: AdminCareerService) {
        this.getSocials();
    }
    saveBtn() {
        this.careerService.saveCareer(this.newCareer).subscribe(res => {
            this.getSocials();
        });
    }

    getSocials() {
        this.careersSub.subscribe(res => {
            this.careers = res;
        });
    }
}
