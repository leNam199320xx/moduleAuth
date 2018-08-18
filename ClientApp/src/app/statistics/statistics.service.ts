import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Career, Social } from '../core/statistics.model';
import { ResponseModel } from '../core/response.model';

@Injectable()
export class StatisticsService {
    constructor(private http: HttpClient) { }

    getAllPeoples() {
        return this.http.get<ResponseModel>('api/statistics/getpeoples');
    }

    getSocials() {
        return this.http.get<Social[]>('api/statistics/getSocials');
    }

    saveSocials($social: Social) {
        return this.http.post<any>('api/statistics/saveSocial', {
            name: $social.name
        });
    }
}
