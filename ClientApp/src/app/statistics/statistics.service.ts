import { Injectable } from '../../../node_modules/@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Career } from './statistics.model';

@Injectable()
export class StatisticsService {
    constructor(private http: HttpClient) { }

    getDataStatistics() {
        return this.http.get<Career[]>('assets/jsons/data.json');
    }
}
