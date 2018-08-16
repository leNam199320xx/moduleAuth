import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Career, Social } from './statistics.model';

@Injectable()
export class StatisticsService {
    constructor(private http: HttpClient) { }

    getDataStatistics() {
        return this.http.get<Career[]>('assets/jsons/data.json');
    }

    getDataSocial() {
        return this.http.get<Social[]>('assets/jsons/socials.json');
    }

    getInfoPeople() {
        return this.http.post<any>('api/admin/GetDataOnePeople', {});
    }
}
