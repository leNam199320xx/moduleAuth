import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { People } from '../../../core/statistics.model';

@Injectable()
export class AdminPeopleService {
    constructor(private http: HttpClient) {

    }

    savePeople(people: People) {
        return this.http.post<any>('api/statistics/savePeople', people);
    }

    saveUpdatedPeople(people: People) {
        return this.http.post<any>('api/statistics/saveUpdatedPeople', people);
    }
}
