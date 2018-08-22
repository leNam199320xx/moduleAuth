import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Career, Social, PeopleSocials } from '../core/statistics.model';
import { ResponseModel } from '../core/response.model';

@Injectable()
export class StatisticsService {
    socials: Social[];
    constructor(private http: HttpClient) { }

    getAllPeoples($id: number = 0) {
        return this.http.get<ResponseModel>('api/statistics/getpeoples?socialId=' + $id);
    }

    getSocials() {
        return this.http.get<Social[]>('api/statistics/getSocials');
    }

    getSocialsWithPeoples() {
        return this.http.get<Social[]>('api/statistics/getSocialsWithPeoples');
    }

    getSocialByPeopleId($id: number) {
        return this.http.get<PeopleSocials[]>('api/statistics/GetSocialsByPeopleId?peopleId=' + $id);
    }


    GetDataFromFacebook($p: PeopleSocials) {
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
}
