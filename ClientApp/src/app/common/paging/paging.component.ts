import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PageModel } from './page.model';

@Component({
    selector: 'app-paging',
    templateUrl: 'paging.component.html'
})

export class PagingComponent implements OnInit {
    @Input() page: PageModel;
    @Input() sizePaging = 5;
    @Input() hasNumber = true;
    @Output() backClick = new EventEmitter<PagingComponent>();
    @Output() nextClick = new EventEmitter<PagingComponent>();
    @Output() gotoClick = new EventEmitter<PagingComponent>();
    @Output() loadMoreClick = new EventEmitter<PagingComponent>();
    indexPaging = 0;
    minIndexPaging = 0;
    maxIndexPaging = 0;
    hasPaging = true;
    pagings: number[] = [];
    ngOnInit() {
        this.maxIndexPaging = Math.floor(this.page.pageLength / this.sizePaging);
        this.setNumberPaging(0, true);
        this.hasPaging = this.page.pageLength <= 1 ? false : true;
    }

    btnBackClick() {
        this.page.back();
        this.setIndexPaging();
        this.backClick.emit(this);
    }

    btnNextClick() {
        this.page.next();
        this.setIndexPaging();
        if (!this.page.loadMore) {
            this.nextClick.emit(this);
        } else {
            this.loadMoreClick.emit(this);
        }
    }

    setIndexPaging() {
        this.indexPaging = Math.floor(this.page.pageIndex / this.sizePaging);
        this.setNumberPaging(0, true);
    }

    btnGotoClick(_index: number) {
        this.page.goto(_index);
        this.gotoClick.emit(this);
    }

    setIndex() {
        this.page.pageIndex = (this.page.pageIndex < this.page.maxPageIndex) ? 1
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
