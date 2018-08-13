import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map, tap, last } from 'rxjs/Operators';
import { CategoryModel, Type } from '../core/db.model';

@Injectable()
export class AdminService {
    constructor(private http: HttpClient) { }
    // getNavConfig() {
    //     return this.http.get<Type[]>('assets/jsons/urls.json', {});
    // }
    getCategories() {
        return this.http.get<any>('api/admin/getcategories', {});
    }
    blockCategory(id: number) {
        return this.http.post<any>('api/admin/blockcategory',  id );
    }
    deleteCategory(id: number) {
        return this.http.post<any>('api/admin/deleteCategory', id);
    }
    saveCategory(category: CategoryModel) {
        return this.http.post<any>('api/admin/savecategory', category);
    }
    uploadFiles(req: HttpRequest<FormData>) {
        return this.http.request(req).pipe(
            map(event => console.log(event)),
            tap(message => console.log(message)),
            last()
        ).subscribe(res => { console.log(res); });
        // return this.http.post<any>('api/admin/uploadfiles', {}, {});
    }
    handleUploadError() {

    }
}
