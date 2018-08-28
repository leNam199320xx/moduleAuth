import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { CountryModel } from './country.model';

@Component({
    selector: 'app-country',
    templateUrl: 'country.html'
})
export class CountryComponent implements OnInit {
    constructor(private sharedService: SharedService) {
    }
    countries: CountryModel[] = [];
    continents: string[] = [];

    ngOnInit(): void {
        this.sharedService.countriesSub.subscribe(
            res => {
                this.countries = res;
                this.countries.forEach(flag => {
                    let isPush = true;
                    for (let i = 0, l = this.continents.length; i < l; i++) {
                        if (this.continents[i] === flag.Continent) {
                            isPush = false;
                        }
                    }
                    if (isPush) {
                        this.continents.push(flag.Continent);
                    }
                });
                this.continents.sort();
            }
        );
    }
}
