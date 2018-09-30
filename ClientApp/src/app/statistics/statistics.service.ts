import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Career, Social, PeopleSocials, People, PeopleSocialsByDate } from '../core/statistics.model';
import { ResponseModel } from '../core/response.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class StatisticsService {
    socials: Social[];
    socialsSubject: BehaviorSubject<Social[]>;
    peopleSelected: People;
    constructor(private http: HttpClient) { }

    getAllPeoples($id: number = 0) {
        return this.http.get<ResponseModel>('api/statistics/getpeoples?socialId=' + $id);
    }

    getSocials() {
        return this.http.get<Social[]>('api/statistics/getSocials');
    }

    getFullSocials() {
        return this.http.get<Social[]>('api/statistics/getFullSocials');
    }

    getSocialsWithPeoples() {
        return this.http.get<Social[]>('api/statistics/getSocialsWithPeoples');
    }

    getSocialByPeopleId($id: number) {
        return this.http.get<PeopleSocials[]>('api/statistics/GetSocialsByPeopleId?peopleId=' + $id);
    }


    getDataFromFacebook($p: PeopleSocials) {
        return this.http.post<any>('api/statistics/GetDataFromFacebook', $p);
    }

    saveSocialForPeople($p: PeopleSocials) {
        return this.http.post<ResponseModel>('api/statistics/SaveSocialForPeople', $p);
    }

    saveSocials($social: Social) {
        return this.http.post<any>('api/statistics/saveSocial', {
            name: $social.name
        });
    }

    updateSocial($social: Social) {
        return this.http.post<any>('api/statistics/updateSocial', $social);
    }

    deleteSocialOfPeople($p: PeopleSocials) {
        return this.http.post<ResponseModel>('api/statistics/deleteSocialOfPeople', $p);
    }

    getAllSocialInfoByPeopleId($peopleId: number) {
        return this.http.get<PeopleSocials[]>('api/statistics/getAllSocialInfoByPeopleId?peopleId=' + $peopleId);
    }

    runCrawler() {
        return this.http.post<any>('api/statistics/runCrawler', {});
    }
}
