import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagingModel } from './paging.model';

@Injectable()
export class PagingService {

    paging: PagingModel = new PagingModel();

    nextObservable: Observable<any>;
    prevObservable: Observable<any>;
    gotoObservable: Observable<any>;
    constructor() {
    }
    reset() {
    }
    nextPage() {
        if (this.paging.pageIndex >= 0 && this.paging.pageIndex < this.paging.pageNumber - 1) {
            this.paging.pageIndex++;
        }
    }
    backPage() {
        if (this.paging.pageIndex > 0 && this.paging.pageIndex < this.paging.pageNumber) {
            this.paging.pageIndex--;
        }
    }
    gotoPage(_pageIndex: number) {
        if (_pageIndex >= 0 && _pageIndex < this.paging.pageNumber) {
            this.paging.pageIndex = _pageIndex;
        }
    }
}
