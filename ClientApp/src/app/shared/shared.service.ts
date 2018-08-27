import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CountryModel } from '../statistics/country/country.model';

@Injectable(
    { providedIn: 'root' }
)
export class SharedService {
    constructor(private http: HttpClient) {
        this.getCountry();
    }
    configValue: string;
    // countries use in any where
    countriesSub: BehaviorSubject<CountryModel[]> = new BehaviorSubject([]);
    getCountry() {
        this.http.get<CountryModel[]>('/assets/jsons/country.json').subscribe(res => {
            this.countriesSub.next(res);
        });
    }
}

export class SharedServiceConfig {
    configValue: string;
}
