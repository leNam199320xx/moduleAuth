import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { CategoryModel } from './category/category.model';
import { map, tap, last, catchError } from '../../../node_modules/rxjs/Operators';

@Injectable()
export class AdminService {
    constructor(private http: HttpClient) { }
    getCategories() {
        return this.http.get<any>('api/admin/getcategories', {});
    }
    blockCategory(id: number) {
        return this.http.post<any>('api/admin/blockcategory', {
            id
        });
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
