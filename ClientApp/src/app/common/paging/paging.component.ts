import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PageModel } from './page.model';

@Component({
    selector: 'app-paging',
    templateUrl: 'paging.component.html'
})

export class PagingComponent implements OnInit {
    @Input() page: PageModel;
    @Output() backClick = new EventEmitter<any>();
    @Output() nextClick = new EventEmitter<any>();
    @Output() gotoClick = new EventEmitter<any>();
    @Input() sizePaging = 5;
    indexPaging = 0;
    minIndexPaging = 0;
    maxIndexPaging = 0;
    pagings: number[] = [];
    ngOnInit() {
        console.log(this.page);
        this.maxIndexPaging = Math.floor(this.page.pageLength / this.sizePaging);
        this.setNumberPaging(0, true);
    }

    btnBackClick() {
        this.backClick.emit();
        this.setIndexPaging();
    }

    btnNextClick() {
        this.nextClick.emit();
        this.setIndexPaging();
    }

    setIndexPaging() {
        this.indexPaging = Math.floor(this.page.pageIndex / this.sizePaging);
        this.setNumberPaging(0, true);
    }

    btnGotoClick(_index: number) {
        this.page.pageIndex = _index;
        this.gotoClick.emit(this.page.pageIndex);
    }

    setIndex() {
        this.page.pageIndex = (this.page.pageIndex < this.page.maxPageIndex) ? +1
            : (this.page.pageIndex > this.page.minPageIndex ? -1 : 0);
    }

    nextPaging() {
        this.setNumberPaging((this.maxIndexPaging > this.indexPaging && this.minIndexPaging <= this.indexPaging) ? 1 : 0);
    }

    backPaging() {
        this.setNumberPaging(this.maxIndexPaging >= this.indexPaging && this.minIndexPaging < this.indexPaging ? -1 : 0);
    }
    checkSelected(_index: number) {
        return _index === this.page.pageIndex;
    }
    setNumberPaging(_indexPaging, _started = false) {
        const results = [];
        let count = 0;
        this.indexPaging += _indexPaging;
        if (_indexPaging === 0 && !_started) {
            return;
        }
        for (let i = 0; i < this.page.pageLength; i++) {
            if (this.indexPaging * this.sizePaging <= i && (this.indexPaging + 1) * this.sizePaging > i) {
                results.push(i);
                count++;
                if (count === this.sizePaging) {
                    break;
                }
            }
        }
        this.pagings = results;
    }
}
