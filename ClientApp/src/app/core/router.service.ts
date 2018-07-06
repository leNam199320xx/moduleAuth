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

    }
}
