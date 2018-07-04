import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/Operators';
import { Observable } from 'rxjs';

@Injectable()
export class RouterService {
    routes: Route[] = [];
    jsonObs: Observable<any> = new Observable();
    constructor(private http: HttpClient) { }
    getConfig() {
        this.routes = [];
        return this.http.get<any>('assets/jsons/routes.json').pipe(
            map(res => {
                res.routes.forEach(element => {
                    console.log(element);
                    this.routes.push({ path: element.path, loadChildren: element.loadChildren });
                });
                return this.routes;
            })
        );
    }
}
