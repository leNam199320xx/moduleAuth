import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';

@Component({
    selector: 'app-country',
    templateUrl: 'country.html'
})
export class CountryComponent implements OnInit {
    constructor(private sharedService: SharedService) {
    }

    ngOnInit(): void {
        this.sharedService.countriesSub.subscribe(
            res => {
                console.log(2, res);
            }
        );
    }
}
