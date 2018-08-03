import { Injectable } from '@angular/core';
import { NavModel } from './nav.model';
import { Subject } from 'rxjs';

@Injectable()
export class NavService {
    visibleLeft = false;
    visibleRight = false;
    sourceNavLeft: NavModel[] = [];
    sourceNavRight: NavModel[] = [];
    sourceNavTop: NavModel[] = [];

    sourceSubject: Subject<NavModel[]> = new Subject();
    constructor() {
        this.sourceSubject.subscribe(res => {
        });
    }
}
