import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Career } from '../../../core/statistics.model';

@Injectable()
export class AdminCareerService {
    constructor(private http: HttpClient) {
    }
    getCareers() {
        return this.http.get<Career[]>('api/statistics/getCareers');
    }
    saveCareer($career: Career) {
        return this.http.post<any>('api/statistics/saveCareer', $career);
    }
}
