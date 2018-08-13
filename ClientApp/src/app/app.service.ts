import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Type, CategoryModel } from './core/db.model';
import { Subject } from 'rxjs';

@Injectable()
export class AppService {
    navs: Type[];
    navsSub: Subject<Type[]> = new Subject();
    constructor(private http: HttpClient) {

    }

    getCategories(category: string) {
        return this.http.get<any>('api/admin/getcategories?category=' + category);
    }
    // getNavConfig() {
    //     return this.http.get<Type[]>('assets/jsons/urls.json', {});
    // }
}
